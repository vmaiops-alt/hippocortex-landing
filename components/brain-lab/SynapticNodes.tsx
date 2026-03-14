'use client'

import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

// ── Seeded RNG for deterministic placement ─────────────────────────
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ── Sample surface points weighted by curvature ────────────────────
function sampleSurfacePoints(
  geometry: THREE.BufferGeometry,
  curvature: Float32Array,
  count: number,
  seed: number,
) {
  const rand = seededRandom(seed)
  const pos = geometry.attributes.position
  const nor = geometry.attributes.normal
  const vertCount = pos.count

  // Weight each vertex: higher curvature (ridges) → more likely to be sampled
  // Small base weight ensures some nodes appear in sulci too
  const weights = new Float32Array(vertCount)
  let totalWeight = 0
  for (let i = 0; i < vertCount; i++) {
    const w = Math.max(0, curvature[i]) * 3.0 + 0.03
    weights[i] = w
    totalWeight += w
  }

  // Weighted random sampling
  const selected: number[] = []
  const used = new Set<number>()
  let attempts = 0
  while (selected.length < count && attempts < count * 5) {
    attempts++
    let r = rand() * totalWeight
    for (let i = 0; i < vertCount; i++) {
      r -= weights[i]
      if (r <= 0) {
        if (!used.has(i)) {
          selected.push(i)
          used.add(i)
        }
        break
      }
    }
  }

  // Extract positions - flush with surface (barely offset, slightly embedded)
  const outPositions = new Float32Array(selected.length * 3)
  const outBrightness = new Float32Array(selected.length)

  for (let n = 0; n < selected.length; n++) {
    const i = selected[n]
    const nx = nor.getX(i)
    const ny = nor.getY(i)
    const nz = nor.getZ(i)
    // Embedded into surface: 0 to 0.001 offset (flush, not floating)
    const offset = rand() * 0.001

    outPositions[n * 3]     = pos.getX(i) + nx * offset
    outPositions[n * 3 + 1] = pos.getY(i) + ny * offset
    outPositions[n * 3 + 2] = pos.getZ(i) + nz * offset

    // 10% of nodes are "active" (slightly brighter), 90% are very dim
    outBrightness[n] = rand() < 0.10 ? 0.35 + rand() * 0.30 : 0.02 + rand() * 0.04
  }

  return { positions: outPositions, brightness: outBrightness, count: selected.length }
}

// ── Component ──────────────────────────────────────────────────────

const NODE_COUNT = 280

// Colors for nodes - restrained palette
const CYAN   = new THREE.Color('#00E5CC')
const TEAL   = new THREE.Color('#06B6D4')
const VIOLET = new THREE.Color('#8B5CF6')

interface SynapticNodesProps {
  geometry: THREE.BufferGeometry
  curvature: Float32Array
}

export function SynapticNodes({ geometry, curvature }: SynapticNodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const nodeData = useMemo(
    () => sampleSurfacePoints(geometry, curvature, NODE_COUNT, 73),
    [geometry, curvature],
  )

  // Set up instance matrices and colors after mount
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const rand = seededRandom(137)
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    const colors = new Float32Array(nodeData.count * 3)

    for (let i = 0; i < nodeData.count; i++) {
      const x = nodeData.positions[i * 3]
      const y = nodeData.positions[i * 3 + 1]
      const z = nodeData.positions[i * 3 + 2]

      dummy.position.set(x, y, z)

      // MUCH smaller: 0.0006 to 0.0014 radius (like distant stars)
      const brightness = nodeData.brightness[i]
      const scale = 0.0006 + brightness * 0.001
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Color: mix of cyan/teal/violet based on spatial noise
      const r = rand()
      if (r < 0.5) color.copy(CYAN)
      else if (r < 0.8) color.copy(TEAL)
      else color.copy(VIOLET)

      // Restrained intensity - barely visible, supporting role
      const intensity = brightness * 0.45
      colors[i * 3]     = color.r * intensity
      colors[i * 3 + 1] = color.g * intensity
      colors[i * 3 + 2] = color.b * intensity
    }

    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)
  }, [nodeData])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, nodeData.count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  )
}
