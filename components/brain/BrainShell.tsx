'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Brain-Shaped Cortical Form ─────────────────────────────────────
// Two-hemisphere brain with central fissure, cortical folds, and
// glass-like transparency so internal nodes/pathways show through.

// ── Simplex 3D noise (compact, allocation-free) ────────────────────
const F3 = 1.0 / 3.0
const G3 = 1.0 / 6.0

const perm = new Uint8Array(512)
const grad3 = [
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]
{
  const p = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
  ]
  for (let i = 0; i < 256; i++) {
    perm[i] = p[i]
    perm[i + 256] = p[i]
  }
}

function simplex3(x: number, y: number, z: number): number {
  const s = (x + y + z) * F3
  const i = Math.floor(x + s)
  const j = Math.floor(y + s)
  const k = Math.floor(z + s)
  const t = (i + j + k) * G3
  const X0 = i - t, Y0 = j - t, Z0 = k - t
  const x0 = x - X0, y0 = y - Y0, z0 = z - Z0

  let i1: number, j1: number, k1: number
  let i2: number, j2: number, k2: number
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3
  const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3
  const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3

  const ii = i & 255, jj = j & 255, kk = k & 255

  let n0 = 0, n1 = 0, n2 = 0, n3 = 0
  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
  if (t0 > 0) {
    t0 *= t0
    const gi = (perm[ii + perm[jj + perm[kk]]] % 12) * 3
    n0 = t0 * t0 * (grad3[gi] * x0 + grad3[gi + 1] * y0 + grad3[gi + 2] * z0)
  }
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
  if (t1 > 0) {
    t1 *= t1
    const gi = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12) * 3
    n1 = t1 * t1 * (grad3[gi] * x1 + grad3[gi + 1] * y1 + grad3[gi + 2] * z1)
  }
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
  if (t2 > 0) {
    t2 *= t2
    const gi = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12) * 3
    n2 = t2 * t2 * (grad3[gi] * x2 + grad3[gi + 1] * y2 + grad3[gi + 2] * z2)
  }
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
  if (t3 > 0) {
    t3 *= t3
    const gi = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12) * 3
    n3 = t3 * t3 * (grad3[gi] * x3 + grad3[gi + 1] * y3 + grad3[gi + 2] * z3)
  }
  return 32.0 * (n0 + n1 + n2 + n3)
}

function fbm3(x: number, y: number, z: number, octaves: number, lacunarity: number, gain: number): number {
  let value = 0
  let amplitude = 1.0
  let frequency = 1.0
  let maxValue = 0
  for (let i = 0; i < octaves; i++) {
    value += amplitude * simplex3(x * frequency, y * frequency, z * frequency)
    maxValue += amplitude
    amplitude *= gain
    frequency *= lacunarity
  }
  return value / maxValue
}

// ── Brain Geometry ─────────────────────────────────────────────────
function createBrainGeometry(): THREE.BufferGeometry {
  // Subdivision 5 = ~20K faces / ~40K tris — within W4 performance budget
  // (was 7 = 327K tris — way over budget)
  const geometry = new THREE.IcosahedronGeometry(1, 5)
  const positions = geometry.attributes.position
  const count = positions.count
  const colors = new Float32Array(count * 3)

  // Brain ellipsoid semi-axes (wider than tall, slightly elongated front-to-back)
  const semiX = 1.22  // width — widest dimension
  const semiY = 0.88  // height — shorter
  const semiZ = 1.04  // depth — slightly elongated

  for (let i = 0; i < count; i++) {
    const ox = positions.getX(i)
    const oy = positions.getY(i)
    const oz = positions.getZ(i)

    // Direction from center (icosahedron vertices are on unit sphere)
    const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
    const dx = ox / len
    const dy = oy / len
    const dz = oz / len

    // 1. Base ellipsoid radius in this direction
    let r = 1.0 / Math.sqrt(
      (dx * dx) / (semiX * semiX) +
      (dy * dy) / (semiY * semiY) +
      (dz * dz) / (semiZ * semiZ)
    )

    // 2. Longitudinal fissure — central groove at x≈0, dorsal surface (y>0)
    //    Runs anterior-posterior (along z-axis), deepest at crown
    const px = dx * r  // approximate x position
    const py = dy * r  // approximate y position
    const fissureWidth = 0.055
    const fissureGaussian = Math.exp(-(px * px) / (2 * fissureWidth * fissureWidth))
    const topWeight = Math.pow(Math.max(0, py / semiY), 0.6)
    const fissureDepth = 0.20
    r -= fissureGaussian * topWeight * fissureDepth

    // 3. Lateral sulcus hint (Sylvian fissure) — groove on each side
    const absX = Math.abs(dx * r)
    const sylvianZone = Math.exp(-((absX - 0.8) * (absX - 0.8)) / 0.04)
    const sylvianY = Math.exp(-((py + 0.1) * (py + 0.1)) / 0.06)
    r -= sylvianZone * sylvianY * 0.04

    // 4. Temporal lobe bulge (lower sides, below Sylvian fissure)
    const lowSide = Math.max(0, -dy - 0.15) * Math.abs(dx)
    r += lowSide * 0.10

    // 5. Frontal pole — slight forward prominence
    const frontal = Math.max(0, dz - 0.3) * Math.max(0, dy + 0.3)
    r += frontal * 0.05

    // 6. Occipital bump — back of head, slightly lower
    const occipital = Math.max(0, -dz - 0.5) * Math.max(0, -dy + 0.2)
    r += occipital * 0.035

    // 7. Flatten bottom (brain base / ventral surface)
    const bottom = Math.max(0, -dy - 0.55)
    r -= bottom * 0.20

    // 8. Cortical folds — anisotropic noise for elongated gyri/sulci
    //    Higher lateral frequency → more grooves perpendicular to midline
    //    Lower AP frequency → folds run primarily front-to-back (longitudinal)
    const fx = dx * r * 3.2
    const fy = dy * r * 2.6
    const fz = dz * r * 1.9

    const fold1 = fbm3(fx, fy, fz, 4, 2.0, 0.5) * 0.060          // primary gyri
    const fold2 = fbm3(fx * 2 + 7.3, fy * 1.5 + 3.1, fz * 2 + 11.7, 3, 2.2, 0.45) * 0.025  // secondary sulci
    const fold3 = fbm3(fx * 4 + 17, fy * 3 + 5, fz * 4 + 23, 2, 2.5, 0.4) * 0.010           // micro texture

    // Reduce folds inside fissure and at brain base
    const foldMask = 1.0 - fissureGaussian * topWeight * 0.5 - Math.max(0, -dy - 0.5) * 0.5
    r += (fold1 + fold2 + fold3) * Math.max(0.15, foldMask)

    // Set final vertex position
    positions.setXYZ(i, dx * r, dy * r, dz * r)

    // ── Vertex colors: sulci darker, gyri lighter — wider contrast range ──
    const foldDepth = fold1 / 0.060
    const t = foldDepth * 0.5 + 0.5

    // Color palette: dark graphite with visible contrast between folds
    // W4 spec base: #1A1A24 = (26, 26, 36)
    const cBase   = [26 / 255, 26 / 255, 36 / 255]
    const cRidge  = [52 / 255, 55 / 255, 78 / 255]  // brighter ridges — visible folds
    const cSulcus = [10 / 255, 10 / 255, 16 / 255]   // deeper sulci

    let cr: number, cg: number, cb: number
    if (t > 0.5) {
      const m = (t - 0.5) / 0.5
      cr = cBase[0] + (cRidge[0] - cBase[0]) * m
      cg = cBase[1] + (cRidge[1] - cBase[1]) * m
      cb = cBase[2] + (cRidge[2] - cBase[2]) * m
    } else {
      const m = (0.5 - t) / 0.5
      cr = cBase[0] + (cSulcus[0] - cBase[0]) * m
      cg = cBase[1] + (cSulcus[1] - cBase[1]) * m
      cb = cBase[2] + (cSulcus[2] - cBase[2]) * m
    }

    colors[i * 3]     = cr
    colors[i * 3 + 1] = cg
    colors[i * 3 + 2] = cb
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

export function BrainShell() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => createBrainGeometry(), [])

  // Respect prefers-reduced-motion
  const reducedMotion = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Slow continuous Y-axis rotation per W4 spec (~0.1 RPM counter-clockwise)
  // 0.1 RPM = 0.1 * 2π / 60 ≈ 0.01047 rad/s
  useFrame((_, delta) => {
    if (meshRef.current && !reducedMotion.current) {
      meshRef.current.rotation.y -= delta * 0.01047
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} renderOrder={-1}>
      <meshPhysicalMaterial
        vertexColors
        metalness={0.15}
        roughness={0.6}
        transmission={0.3}
        thickness={1.5}
        ior={1.45}
        transparent
        opacity={0.85}
        envMapIntensity={0.3}
        clearcoat={0.2}
        clearcoatRoughness={0.4}
        side={THREE.FrontSide}
        depthWrite={true}
      />
    </mesh>
  )
}
