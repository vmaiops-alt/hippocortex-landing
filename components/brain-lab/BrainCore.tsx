'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── GLSL Shaders ───────────────────────────────────────────────────

const vertexShader = /* glsl */ `
attribute float aCurvature;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vCurvature;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vCurvature = aCurvature;
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uColorDark;
uniform vec3 uColorMid;
uniform vec3 uRimColor;
uniform vec3 uSignalColor1;
uniform vec3 uSignalColor2;
uniform float uSignalStrength;
uniform float uTime;

// ── Hotspot convergence uniforms ───
uniform vec3  uHotspotPos;       // active hotspot position (model space)
uniform float uHotspotActive;    // 0 = none, 1 = active
uniform float uHotspotTime;      // time when hotspot was activated

// ── Cursor-reactive uniforms ───
uniform vec3  uCursorPos;        // cursor position on brain surface
uniform float uCursorActive;     // 0 = no cursor, 1 = cursor on brain
uniform float uCursorTriggerTime; // time of last cursor region trigger

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vCurvature;

// ── Value noise ────────────────────────────────────────────────────
float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise3D(vec3 x) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = p.x + p.y * 157.0 + 113.0 * p.z;
  return mix(
    mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
        mix(hash(n + 157.0), hash(n + 158.0), f.x), f.y),
    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
        mix(hash(n + 270.0), hash(n + 271.0), f.x), f.y),
    f.z
  );
}

// ── Main ───────────────────────────────────────────────────────────
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPosition);
  float NdotV = max(dot(N, V), 0.0);

  // ─── Fresnel — very subtle silhouette edge ───
  float fresnel = pow(1.0 - NdotV, 4.5);

  // ─── Sculptural lighting (baked, no scene lights) ───
  vec3 L1 = normalize(vec3(0.4, 1.0, 0.6));   // key: above-right
  vec3 L2 = normalize(vec3(-0.6, -0.3, 0.7));  // fill: below-left
  vec3 L3 = normalize(vec3(0.0, 0.2, -1.0));   // back rim

  float d1 = max(dot(N, L1), 0.0) * 0.55;
  float d2 = max(dot(N, L2), 0.0) * 0.12;
  float d3 = max(dot(N, L3), 0.0) * 0.12;
  float ambient = 0.25;
  float lighting = d1 + d2 + d3 + ambient;

  // ─── Surface roughness variation (polished obsidian feel) ───
  float roughnessNoise = noise3D(vWorldPosition * 30.0);
  float roughness = mix(0.3, 0.7, roughnessNoise);
  roughness = mix(roughness, 0.8, smoothstep(0.0, -0.4, vCurvature));
  roughness = mix(roughness, 0.2, smoothstep(0.2, 0.5, vCurvature));

  // ─── Base color with roughness-modulated lighting ───
  float roughLighting = lighting * mix(0.85, 1.15, 1.0 - roughness);
  vec3 baseColor = mix(uColorDark, uColorMid, roughLighting);

  // ─── Deep sulci AO ───
  float sulciDepth = smoothstep(0.0, -0.35, vCurvature);
  baseColor *= (1.0 - sulciDepth * 0.55);

  // ─── Micro contrast in folds ───
  float curvGrad = abs(vCurvature);
  float foldContrast = smoothstep(0.1, 0.4, curvGrad) * 0.08;
  baseColor += vec3(foldContrast) * lighting;

  // ─── Gyri edge catch light ───
  float gyriEdge = smoothstep(0.15, 0.45, vCurvature);
  float edgeCatch = gyriEdge * pow(max(dot(N, L1), 0.0), 2.0) * 0.12;
  baseColor += vec3(0.25, 0.27, 0.35) * edgeCatch;

  // ═══════════════════════════════════════════════════════════════
  // SIGNAL HIERARCHY — trunk → branches → capillaries
  // ═══════════════════════════════════════════════════════════════

  float ridge = smoothstep(0.05, 0.35, vCurvature);

  float regionNoise = noise3D(vWorldPosition * 1.5 + vec3(200.0));
  float regionMask = smoothstep(0.15, 0.50, regionNoise);

  // ── PRIMARY PATHWAYS ──
  float primaryNoise = noise3D(vWorldPosition * 4.5);
  float primaryDist = abs(primaryNoise - 0.5);
  float primaryLine = 1.0 - smoothstep(0.0, 0.04, primaryDist);

  // ── SECONDARY PATHWAYS ──
  float secondaryNoise = noise3D(vWorldPosition * 10.0 + vec3(47.0, 31.0, 73.0));
  float secondaryDist = abs(secondaryNoise - 0.5);
  float secondaryLine = 1.0 - smoothstep(0.0, 0.02, secondaryDist);
  float primaryProximity = smoothstep(0.18, 0.05, primaryDist);
  secondaryLine *= primaryProximity;

  // ── MICRO CONNECTIONS ──
  float microNoise = noise3D(vWorldPosition * 22.0 + vec3(100.0, 200.0, 300.0));
  float microDist = abs(microNoise - 0.5);
  float microLine = 1.0 - smoothstep(0.0, 0.008, microDist);
  float secondaryProximity = smoothstep(0.10, 0.025, secondaryDist);
  microLine *= secondaryProximity * 0.4;

  float pathMask = primaryLine * 1.0 + secondaryLine * 0.55 + microLine * 0.25;
  pathMask = clamp(pathMask, 0.0, 1.0);

  // ═══════════════════════════════════════════════════════════════
  // TRAVELING SIGNAL PULSES
  // ═══════════════════════════════════════════════════════════════

  vec3 dir1 = normalize(vec3(1.0, 0.3, 0.2));
  vec3 dir2 = normalize(vec3(-0.4, 1.0, 0.3));
  vec3 dir3 = normalize(vec3(0.2, -0.3, 1.0));

  float proj1 = dot(vWorldPosition, dir1);
  float proj2 = dot(vWorldPosition, dir2);
  float proj3 = dot(vWorldPosition, dir3);

  float sweepExtent = 2.0;
  float norm1 = (proj1 + sweepExtent * 0.5) / sweepExtent;
  float norm2 = (proj2 + sweepExtent * 0.5) / sweepExtent;
  float norm3 = (proj3 + sweepExtent * 0.5) / sweepExtent;

  float warp1 = noise3D(vWorldPosition * 2.5 + vec3(500.0)) * 0.15;
  float warp2 = noise3D(vWorldPosition * 2.5 + vec3(700.0, 300.0, 100.0)) * 0.15;
  float warp3 = noise3D(vWorldPosition * 2.5 + vec3(200.0, 800.0, 400.0)) * 0.15;
  norm1 += warp1;
  norm2 += warp2;
  norm3 += warp3;

  float cyc1 = fract(uTime / 4.0);
  float cyc2 = fract(uTime / 6.0 + 0.33);
  float cyc3 = fract(uTime / 8.0 + 0.66);

  float wf1 = norm1 - cyc1;  wf1 = wf1 - floor(wf1 + 0.5);
  float wf2 = norm2 - cyc2;  wf2 = wf2 - floor(wf2 + 0.5);
  float wf3 = norm3 - cyc3;  wf3 = wf3 - floor(wf3 + 0.5);

  float leadSharp = 1200.0;
  float trailDecay = 20.0;

  float s1 = exp(-leadSharp * wf1 * wf1);
  float t1 = exp(-trailDecay * wf1 * wf1);
  float pulse1 = mix(t1, s1, smoothstep(-0.03, 0.01, wf1));

  float s2 = exp(-leadSharp * wf2 * wf2);
  float t2 = exp(-trailDecay * wf2 * wf2);
  float pulse2 = mix(t2, s2, smoothstep(-0.03, 0.01, wf2));

  float s3 = exp(-leadSharp * wf3 * wf3);
  float t3 = exp(-trailDecay * wf3 * wf3);
  float pulse3 = mix(t3, s3, smoothstep(-0.03, 0.01, wf3));

  float travelingSignal = max(max(pulse1, pulse2), pulse3);

  // ═══════════════════════════════════════════════════════════════
  // HOTSPOT CONVERGENCE — signal converging toward active hotspot
  // ═══════════════════════════════════════════════════════════════

  float hotspotSignal = 0.0;

  if (uHotspotActive > 0.01) {
    float timeSinceActivation = uTime - uHotspotTime;
    float activeFade = smoothstep(0.0, 0.35, timeSinceActivation);

    // Distance from this fragment to the hotspot in world space
    float distToHotspot = length(vWorldPosition - uHotspotPos);

    // Converging ring: starts far, contracts to hotspot
    // Ring radius shrinks over a 2-second cycle, repeating
    float ringCycle = fract(timeSinceActivation / 2.5);
    float ringRadius = mix(0.8, 0.0, ringCycle);
    float ringDist = abs(distToHotspot - ringRadius);
    float ringPulse = exp(-80.0 * ringDist * ringDist);

    // Sustained glow near hotspot
    float proximityGlow = exp(-4.0 * distToHotspot * distToHotspot) * 0.6;

    // Only along pathways
    hotspotSignal = (ringPulse * 0.8 + proximityGlow) * ridge * pathMask * activeFade * uHotspotActive;
  }

  // ═══════════════════════════════════════════════════════════════
  // CURSOR-REACTIVE LOCAL GLOW
  // ═══════════════════════════════════════════════════════════════

  float cursorGlow = 0.0;

  if (uCursorActive > 0.01) {
    float distToCursor = length(vWorldPosition - uCursorPos);

    // Soft local glow around cursor position — radius ~0.2
    float proximity = exp(-12.0 * distToCursor * distToCursor);
    cursorGlow = proximity * ridge * pathMask * 0.4 * uCursorActive;

    // Cursor trigger pulse: expanding ring from trigger point
    float triggerAge = uTime - uCursorTriggerTime;
    if (triggerAge < 1.5 && triggerAge > 0.0) {
      float expandRadius = triggerAge * 0.5; // expands outward
      float expandDist = abs(distToCursor - expandRadius);
      float expandPulse = exp(-60.0 * expandDist * expandDist);
      float expandFade = 1.0 - smoothstep(0.0, 1.5, triggerAge);
      cursorGlow += expandPulse * ridge * pathMask * expandFade * 0.6;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SIGNAL COMPOSITING
  // ═══════════════════════════════════════════════════════════════

  float staticIntensity = ridge * pathMask * regionMask * uSignalStrength * 0.08;
  float pulseIntensity = ridge * pathMask * regionMask * travelingSignal * uSignalStrength * 1.2;
  float signalIntensity = staticIntensity + pulseIntensity + hotspotSignal + cursorGlow;

  float colorVar = noise3D(vWorldPosition * 2.0 + 50.0);
  vec3 signalColor = mix(uSignalColor1, uSignalColor2, colorVar);

  vec3 signal = signalColor * signalIntensity;

  // ─── Subsurface glow ───
  float subsurfaceDist = min(primaryDist, min(secondaryDist * 1.5, microDist * 3.0));
  float subsurface = exp(-10.0 * subsurfaceDist) * ridge * regionMask * 0.025;
  float subsurfacePulse = subsurface * (1.0 + travelingSignal * 4.0);
  vec3 subsurfaceColor = signalColor * subsurfacePulse;

  // ─── Fresnel rim glow ───
  vec3 rim = uRimColor * fresnel * 0.08;

  // ─── Specular ───
  vec3 H1 = normalize(L1 + V);
  float specPower = mix(32.0, 128.0, 1.0 - roughness);
  float spec1 = pow(max(dot(N, H1), 0.0), specPower) * mix(0.06, 0.18, 1.0 - roughness);
  vec3 specular = vec3(0.3, 0.35, 0.45) * spec1;

  vec3 H2 = normalize(L2 + V);
  float spec2 = pow(max(dot(N, H2), 0.0), 48.0) * 0.035;
  specular += vec3(0.2, 0.25, 0.3) * spec2;

  // ─── Compose ───
  vec3 finalColor = baseColor + signal + subsurfaceColor + rim + specular;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ── Component ──────────────────────────────────────────────────────

interface BrainCoreProps {
  geometry: THREE.BufferGeometry
  onPointerMove?: (e: THREE.Event & { point?: THREE.Vector3 }) => void
}

export function BrainCore({ geometry, onPointerMove }: BrainCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColorDark:         { value: new THREE.Color('#0A0A18') },
        uColorMid:          { value: new THREE.Color('#1A1A30') },
        uRimColor:          { value: new THREE.Color('#00E5CC') },
        uSignalColor1:      { value: new THREE.Color('#00E5CC') },
        uSignalColor2:      { value: new THREE.Color('#06B6D4') },
        uSignalStrength:    { value: 1.0 },
        uTime:              { value: 0.0 },
        // Hotspot convergence
        uHotspotPos:        { value: new THREE.Vector3(0, 0, 0) },
        uHotspotActive:     { value: 0.0 },
        uHotspotTime:       { value: 0.0 },
        // Cursor reactive
        uCursorPos:         { value: new THREE.Vector3(0, 0, 0) },
        uCursorActive:      { value: 0.0 },
        uCursorTriggerTime: { value: -10.0 },
      },
      side: THREE.FrontSide,
      transparent: false,
      depthWrite: true,
    })
    mat.toneMapped = false
    return mat
  }, [])

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      onPointerMove={onPointerMove as any}
    />
  )
}
