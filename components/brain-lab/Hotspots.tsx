'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HOTSPOTS } from './hotspotData'

// ── Hotspot glow shader ────────────────────────────────────────────

const hotspotVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const hotspotFrag = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uHover;    // 0 → idle, 1 → hovered
uniform float uActive;   // 0 → idle, 1 → active (clicked)
uniform vec3  uColor;

varying vec2 vUv;

void main() {
  vec2 center = vUv - 0.5;
  float dist = length(center);

  // Core dot - bright center
  float core = smoothstep(0.18, 0.04, dist);

  // Ring - visible at idle
  float ring = smoothstep(0.34, 0.28, dist) - smoothstep(0.28, 0.20, dist);

  // Idle breathing pulse
  float breathe = sin(uTime * 2.0) * 0.5 + 0.5;
  float idlePulse = 1.0 + breathe * 0.12;

  // Hover/active pulse
  float activePulse = sin(uTime * 4.0) * 0.5 + 0.5;
  float hoverPulse = mix(idlePulse, 1.0 + activePulse * 0.2, max(uHover, uActive));

  // Outer glow - more visible
  float glow = exp(-6.0 * dist) * 0.6;

  float intensity = (core * 1.2 + ring * 0.5 + glow * 0.7) * hoverPulse;

  // Brighter when active
  float activeBoost = mix(1.0, 1.8, uActive);
  intensity *= activeBoost;

  // Idle: visible. Hover: strong
  float baseAlpha = mix(0.65, 1.0, max(uHover, uActive));
  float alpha = intensity * baseAlpha;

  gl_FragColor = vec4(uColor * intensity * 2.0, alpha);
}
`

// ── Single hotspot mesh ────────────────────────────────────────────

interface HotspotPointProps {
  position: THREE.Vector3
  normal: THREE.Vector3
  index: number
  isHovered: boolean
  isActive: boolean
  onPointerOver: () => void
  onPointerOut: () => void
  onClick: () => void
}

function HotspotPoint({
  position,
  normal,
  index,
  isHovered,
  isActive,
  onPointerOver,
  onPointerOut,
  onClick,
}: HotspotPointProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  // Orientation: billboard facing the normal direction, slightly offset from surface
  const { quaternion, offsetPos } = useMemo(() => {
    const n = normal.clone().normalize()
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n)
    // Offset slightly above surface along normal
    const op = position.clone().add(n.clone().multiplyScalar(0.008))
    return { quaternion: q, offsetPos: op }
  }, [position, normal])

  // Animate hover/active smoothly
  const hoverRef = useRef(0)
  const activeRef = useRef(0)

  useFrame((_, delta) => {
    if (!matRef.current) return
    const mat = matRef.current

    mat.uniforms.uTime.value += delta

    // Smooth interpolation toward target
    const hoverTarget = isHovered ? 1 : 0
    const activeTarget = isActive ? 1 : 0
    hoverRef.current += (hoverTarget - hoverRef.current) * Math.min(1, delta * 8)
    activeRef.current += (activeTarget - activeRef.current) * Math.min(1, delta * 8)

    mat.uniforms.uHover.value = hoverRef.current
    mat.uniforms.uActive.value = activeRef.current

    // Scale animation: pulse when hovered or active
    if (meshRef.current) {
      const baseScale = 0.065
      const pulseScale = isHovered || isActive
        ? baseScale * (1.0 + Math.sin(mat.uniforms.uTime.value * 4) * 0.25)
        : baseScale
      meshRef.current.scale.setScalar(pulseScale)
    }
  })

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: hotspotVert,
        fragmentShader: hotspotFrag,
        uniforms: {
          uTime: { value: index * 1.3 }, // phase offset per hotspot
          uHover: { value: 0 },
          uActive: { value: 0 },
          uColor: { value: new THREE.Color('#FFD700') },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [index],
  )

  return (
    <group position={offsetPos}>
      {/* Invisible hit area - larger sphere for easier interaction */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          onPointerOver()
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onPointerOut()
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visual hotspot glow */}
      <mesh
        ref={meshRef}
        quaternion={quaternion}
        scale={0.065}
        material={material}
      >
        <planeGeometry args={[1, 1]} />
        <primitive object={material} ref={matRef} />
      </mesh>
    </group>
  )
}

// ── Exported Hotspots group ────────────────────────────────────────

interface HotspotsProps {
  hoveredId: string | null
  activeId: string | null
  onHover: (id: string | null) => void
  onActivate: (id: string | null) => void
}

export function Hotspots({ hoveredId, activeId, onHover, onActivate }: HotspotsProps) {
  return (
    <group>
      {HOTSPOTS.map((hs, i) => (
        <HotspotPoint
          key={hs.id}
          position={hs.position}
          normal={hs.normal}
          index={i}
          isHovered={hoveredId === hs.id}
          isActive={activeId === hs.id}
          onPointerOver={() => onHover(hs.id)}
          onPointerOut={() => onHover(null)}
          onClick={() => onActivate(activeId === hs.id ? null : hs.id)}
        />
      ))}
    </group>
  )
}
