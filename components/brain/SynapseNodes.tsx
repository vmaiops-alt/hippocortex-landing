'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBrainStore, BrainState } from '@/lib/store'

const NODE_COUNT = 100  // Reduced from 160 - cleaner scene, less visual noise
const BRAIN_RADIUS = 1.05  // Fit inside the brain ellipsoid (smallest semi-axis ~0.88)

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

// Synthesizer center position for compression convergence
const SYNTH_CENTER = new THREE.Vector3(0, 0.5, 0)

export function SynapseNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { positions, regionIds } = useMemo(() => generateNodes(), [])

  // Reusable objects - allocated once, never in the frame loop
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorsRef = useRef(new Float32Array(NODE_COUNT * 3))
  const opacitiesRef = useRef(new Float32Array(NODE_COUNT).fill(0.15))
  const burstTimerRef = useRef(0)
  const burstRng = useRef(seededRandom(99))

  // ── Compression sequence tracking ──
  const synthStartRef = useRef(0)
  const prevStateRef = useRef<BrainState>('IDLE')
  // Store original positions for compression lerp
  const originalPositions = useRef(new Float32Array(positions))

  // Track brain state via ref - with proper cleanup
  const stateRef = useRef<BrainState>('IDLE')
  useEffect(() => {
    const unsubscribe = useBrainStore.subscribe((s) => {
      stateRef.current = s.state
    })
    return unsubscribe
  }, [])

  // Prefers-reduced-motion
  const reducedMotion = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches
    }
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

    // ── Compression sequence detection ──
    if (state === 'SYNTHESIS' && prevStateRef.current !== 'SYNTHESIS') {
      synthStartRef.current = performance.now()
    }
    if (state !== 'SYNTHESIS') {
      synthStartRef.current = 0
    }
    prevStateRef.current = state

    const isSynthesis = state === 'SYNTHESIS' && synthStartRef.current > 0
    const synthElapsed = isSynthesis
      ? (performance.now() - synthStartRef.current) / 1000
      : 0

    for (let i = 0; i < NODE_COUNT; i++) {
      const origX = originalPositions.current[i * 3]
      const origY = originalPositions.current[i * 3 + 1]
      const origZ = originalPositions.current[i * 3 + 2]

      let x = origX
      let y = origY
      let z = origZ

      const isActive = activeRegions.includes(regionIds[i])
      const isSynthRegion = regionIds[i] === 5 // synthesizer region

      let targetOpacity: number
      let extraScale = 1.0

      if (isSynthesis) {
        // ── COMPRESSION SEQUENCE (per W4 §4.4) ──
        if (synthElapsed < 2.0) {
          // Phase 1: Signal activity rise - synthesizer brightens, others dim
          const ramp = Math.min(synthElapsed / 2.0, 1.0)
          if (isSynthRegion) {
            targetOpacity = 0.3 + ramp * 0.7
          } else {
            targetOpacity = 0.15 - ramp * 0.10
          }
        } else if (synthElapsed < 2.5) {
          // Phase 2: Node dimming - all except synthesizer cluster fade
          if (isSynthRegion) {
            targetOpacity = 1.0
          } else {
            targetOpacity = 0.02
          }
        } else if (synthElapsed < 3.3) {
          // Phase 3: Compression snap - synthesizer nodes converge to center
          const snapProgress = Math.min((synthElapsed - 2.5) / 0.8, 1.0)
          // Dramatic easing per W4: fast start, sharp decel
          const eased = 1.0 - Math.pow(1.0 - snapProgress, 3)

          if (isSynthRegion) {
            x = origX + (SYNTH_CENTER.x - origX) * eased
            y = origY + (SYNTH_CENTER.y - origY) * eased
            z = origZ + (SYNTH_CENTER.z - origZ) * eased
            targetOpacity = 1.0
            extraScale = 1.0 + snapProgress * 0.8
          } else {
            targetOpacity = 0.02
          }
        } else if (synthElapsed < 3.9) {
          // Phase 4: Single bright point + radial ping
          if (isSynthRegion) {
            x = SYNTH_CENTER.x
            y = SYNTH_CENTER.y
            z = SYNTH_CENTER.z
            targetOpacity = 1.0
            extraScale = 1.5
          } else {
            targetOpacity = 0.02
          }
        } else {
          // Phase 5: Hold - ease back to modest glow
          if (isSynthRegion) {
            const holdProgress = Math.min((synthElapsed - 3.9) / 0.4, 1.0)
            x = SYNTH_CENTER.x + (origX - SYNTH_CENTER.x) * holdProgress * 0.3
            y = SYNTH_CENTER.y + (origY - SYNTH_CENTER.y) * holdProgress * 0.3
            z = SYNTH_CENTER.z + (origZ - SYNTH_CENTER.z) * holdProgress * 0.3
            targetOpacity = 1.0 - holdProgress * 0.3
            extraScale = 1.5 - holdProgress * 0.5
          } else {
            targetOpacity = 0.05
          }
        }
      } else {
        // ── NORMAL STATE BEHAVIOR (per W4 §2.2) ──
        if (state === 'IDLE' || state === 'DORMANT') {
          // Idle: dim, barely visible - synapse sparks, not bubbles
          targetOpacity = 0.15
        } else if (isActive) {
          // Active region: moderate brightness (burst will push higher)
          targetOpacity = 0.7
        } else {
          // Inactive during active state: very dim
          targetOpacity = 0.08
        }

        // Idle burst effect - small cluster of 3-5 nodes every 3-5s
        if (state === 'IDLE' && burstTimerRef.current > 3.5) {
          if (burstRng.current() < 0.04) {
            targetOpacity = 1.0
          }
        }
      }

      // Skip animation if reduced motion
      if (reducedMotion.current) {
        opacitiesRef.current[i] = targetOpacity
      } else {
        const lerpSpeed = isSynthesis ? 5 : 3
        opacitiesRef.current[i] +=
          (targetOpacity - opacitiesRef.current[i]) * delta * lerpSpeed
      }

      dummy.position.set(x, y, z)
      // Node size: idle ~0.012 (tiny spark), burst ~0.025 (small flash)
      // Reduced to ~30% of original - nodes are secondary to signals
      const baseScale = 0.012 + opacitiesRef.current[i] * 0.013
      dummy.scale.setScalar(baseScale * extraScale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      const regionColor = REGION_COLORS[regionIds[i]]
      // HDR glow: idle barely visible, only bursts trigger bloom (>0.6 threshold)
      // At idle (0.15 opacity): intensity = 0.15 * 1.2 = 0.18 - below bloom threshold
      // At burst (1.0 opacity): intensity = 1.0 * 1.2 = 1.2 - triggers bloom
      const intensity = opacitiesRef.current[i] * 1.2
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
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
      <instancedBufferAttribute
        attach="instanceColor"
        args={[colorsRef.current, 3]}
      />
    </instancedMesh>
  )
}
