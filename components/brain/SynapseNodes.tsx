'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBrainStore, BrainState } from '@/lib/store'

const NODE_COUNT = 160
const BRAIN_RADIUS = 1.2

// Seeded random for deterministic node positions
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateNodes(): { positions: Float32Array; regionIds: number[] } {
  const rand = seededRandom(73)
  const positions = new Float32Array(NODE_COUNT * 3)
  const regionIds: number[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    let x: number, y: number, z: number
    do {
      x = (rand() - 0.5) * 2.4
      y = (rand() - 0.5) * 2.4
      z = (rand() - 0.5) * 2.4
    } while (Math.sqrt(x * x + y * y + z * z) > BRAIN_RADIUS * 0.95)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    if (y < -0.5) regionIds.push(0)
    else if (y < -0.1 && z > 0) regionIds.push(1)
    else if (x > 0.3) regionIds.push(2)
    else if (y > 0.3 && x > -0.2) regionIds.push(3)
    else if (Math.abs(x) < 0.3 && Math.abs(y) < 0.3) regionIds.push(4)
    else regionIds.push(5)
  }

  return { positions, regionIds }
}

const REGION_COLORS = [
  new THREE.Color('#00E5CC'),
  new THREE.Color('#06B6D4'),
  new THREE.Color('#8B5CF6'),
  new THREE.Color('#A78BFA'),
  new THREE.Color('#F59E0B'),
  new THREE.Color('#E8E8F0'),
]

const STATE_REGION_MAP: Record<BrainState, number[]> = {
  IDLE: [],
  EPISODIC: [1],
  SEMANTIC: [2],
  GRAPH: [3],
  COMPILER: [4],
  SYNTHESIS: [5],
  DORMANT: [],
}

export function SynapseNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { positions, regionIds } = useMemo(() => generateNodes(), [])

  // Reusable objects — allocated once, never in the frame loop
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorsRef = useRef(new Float32Array(NODE_COUNT * 3))
  const opacitiesRef = useRef(new Float32Array(NODE_COUNT).fill(0.3))
  const burstTimerRef = useRef(0)
  const burstRng = useRef(seededRandom(99))

  // Track brain state via ref — with proper cleanup
  const stateRef = useRef<BrainState>('IDLE')
  useEffect(() => {
    const unsubscribe = useBrainStore.subscribe((s) => { stateRef.current = s.state })
    return unsubscribe
  }, [])

  // Prefers-reduced-motion
  const reducedMotion = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Initialize instance colors
  useMemo(() => {
    const colors = colorsRef.current
    for (let i = 0; i < NODE_COUNT; i++) {
      const regionColor = REGION_COLORS[regionIds[i]]
      colors[i * 3] = regionColor.r
      colors[i * 3 + 1] = regionColor.g
      colors[i * 3 + 2] = regionColor.b
    }
  }, [regionIds])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const state = stateRef.current
    const activeRegions = STATE_REGION_MAP[state]
    burstTimerRef.current += delta

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      dummy.position.set(x, y, z)

      const isActive = activeRegions.includes(regionIds[i])

      let targetOpacity: number
      if (state === 'IDLE' || state === 'DORMANT') {
        targetOpacity = 0.3
      } else if (isActive) {
        targetOpacity = 0.8
      } else {
        targetOpacity = 0.15
      }

      // Idle burst effect (using seeded rng, not Math.random)
      if (state === 'IDLE' && burstTimerRef.current > 3.5) {
        if (burstRng.current() < 0.03) {
          targetOpacity = 1.0
        }
      }

      // Skip animation if reduced motion (snap to target)
      if (reducedMotion.current) {
        opacitiesRef.current[i] = targetOpacity
      } else {
        opacitiesRef.current[i] += (targetOpacity - opacitiesRef.current[i]) * delta * 3
      }

      const scale = 0.012 + opacitiesRef.current[i] * 0.008
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      const regionColor = REGION_COLORS[regionIds[i]]
      const intensity = opacitiesRef.current[i]
      colorsRef.current[i * 3] = regionColor.r * intensity
      colorsRef.current[i * 3 + 1] = regionColor.g * intensity
      colorsRef.current[i * 3 + 2] = regionColor.b * intensity
    }

    if (burstTimerRef.current > 5) burstTimerRef.current = 0

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, NODE_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      <instancedBufferAttribute
        attach="instanceColor"
        args={[colorsRef.current, 3]}
      />
    </instancedMesh>
  )
}
