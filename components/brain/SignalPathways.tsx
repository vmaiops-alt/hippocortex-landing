'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBrainStore, BrainState } from '@/lib/store'

interface Pathway {
  id: string
  from: string
  to: string
  points: THREE.Vector3[]
  color: THREE.Color
  type: 'primary' | 'secondary'
}

// Seeded deterministic random for consistent results across mounts
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Generate procedural pathways inside brain volume (deterministic)
function generatePathways(): Pathway[] {
  const rand = seededRandom(42)
  const pathways: Pathway[] = []
  const regionCenters: Record<string, THREE.Vector3> = {
    capture: new THREE.Vector3(0, -0.8, 0),
    episodic: new THREE.Vector3(0.2, -0.3, 0.3),
    semantic: new THREE.Vector3(0.5, 0, 0.2),
    graph: new THREE.Vector3(0.3, 0.6, 0.5),
    compiler: new THREE.Vector3(0, -0.1, 0),
    synthesizer: new THREE.Vector3(0, 0.5, 0),
  }

  const connections = [
    { from: 'capture', to: 'episodic', type: 'primary' as const, color: '#00E5CC' },
    { from: 'capture', to: 'episodic', type: 'primary' as const, color: '#00E5CC' },
    { from: 'episodic', to: 'semantic', type: 'primary' as const, color: '#06B6D4' },
    { from: 'episodic', to: 'semantic', type: 'primary' as const, color: '#06B6D4' },
    { from: 'semantic', to: 'graph', type: 'primary' as const, color: '#8B5CF6' },
    { from: 'semantic', to: 'graph', type: 'primary' as const, color: '#8B5CF6' },
    { from: 'graph', to: 'compiler', type: 'primary' as const, color: '#A78BFA' },
    { from: 'compiler', to: 'synthesizer', type: 'primary' as const, color: '#F59E0B' },
    { from: 'episodic', to: 'compiler', type: 'secondary' as const, color: '#06B6D4' },
    { from: 'semantic', to: 'compiler', type: 'secondary' as const, color: '#8B5CF6' },
    { from: 'capture', to: 'compiler', type: 'secondary' as const, color: '#00E5CC' },
    { from: 'graph', to: 'synthesizer', type: 'secondary' as const, color: '#A78BFA' },
    { from: 'episodic', to: 'graph', type: 'secondary' as const, color: '#06B6D4' },
    { from: 'compiler', to: 'episodic', type: 'secondary' as const, color: '#F59E0B' },
  ]

  connections.forEach((conn, idx) => {
    const start = regionCenters[conn.from].clone()
    const end = regionCenters[conn.to].clone()

    const mid1 = start.clone().lerp(end, 0.33)
    const mid2 = start.clone().lerp(end, 0.66)

    const offset = 0.15 + rand() * 0.15
    mid1.x += (rand() - 0.5) * offset
    mid1.y += (rand() - 0.5) * offset
    mid1.z += (rand() - 0.5) * offset
    mid2.x += (rand() - 0.5) * offset
    mid2.y += (rand() - 0.5) * offset
    mid2.z += (rand() - 0.5) * offset

    pathways.push({
      id: `path-${idx}`,
      from: conn.from,
      to: conn.to,
      points: [start, mid1, mid2, end],
      color: new THREE.Color(conn.color),
      type: conn.type,
    })
  })

  return pathways
}

interface PulseState {
  pathwayIdx: number
  progress: number
  speed: number
  active: boolean
}

const STATE_ACTIVE_REGIONS: Record<BrainState, string[]> = {
  IDLE: [],
  EPISODIC: ['capture', 'episodic'],
  SEMANTIC: ['episodic', 'semantic'],
  GRAPH: ['semantic', 'graph'],
  COMPILER: ['graph', 'compiler'],
  SYNTHESIS: ['compiler', 'synthesizer'],
  DORMANT: [],
}

export function SignalPathways() {
  const pathways = useMemo(() => generatePathways(), [])
  const curves = useMemo(() =>
    pathways.map(p => new THREE.CatmullRomCurve3(p.points)),
    [pathways]
  )
  const tubeGeometries = useMemo(() =>
    curves.map(curve => new THREE.TubeGeometry(curve, 32, 0.006, 6, false)),
    [curves]
  )

  // Pulse management via ref (no allocation per frame)
  const pulsesRef = useRef<PulseState[]>([
    { pathwayIdx: 0, progress: 0, speed: 0.8, active: false },
    { pathwayIdx: 1, progress: 0, speed: 0.7, active: false },
    { pathwayIdx: 2, progress: 0, speed: 0.9, active: false },
  ])
  const pulseTimerRef = useRef(0)

  // Track state via ref — with proper cleanup
  const stateRef = useRef<BrainState>('IDLE')
  useEffect(() => {
    const unsubscribe = useBrainStore.subscribe((s) => { stateRef.current = s.state })
    return unsubscribe
  }, [])

  // Seeded random for pulse selection (no Math.random in frame loop)
  const pulseRng = useRef(seededRandom(137))

  // Prefers-reduced-motion
  const reducedMotion = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Materials for pathways — stable refs
  const materialsRef = useRef(
    pathways.map(p => {
      const mat = new THREE.MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.15,
      })
      return mat
    })
  )

  // Cleanup materials on unmount
  useEffect(() => {
    return () => {
      materialsRef.current.forEach(m => m.dispose())
    }
  }, [])

  useFrame((_, delta) => {
    if (reducedMotion.current) return

    const state = stateRef.current
    const activeRegions = STATE_ACTIVE_REGIONS[state]
    pulseTimerRef.current += delta

    // Update pathway opacities based on active state
    pathways.forEach((p, idx) => {
      const mat = materialsRef.current[idx]
      const isRelevant = activeRegions.includes(p.from) || activeRegions.includes(p.to)

      let targetOpacity: number
      if (state === 'IDLE' || state === 'DORMANT') {
        targetOpacity = 0.15
      } else if (isRelevant) {
        targetOpacity = 0.4
      } else {
        targetOpacity = 0.08
      }

      mat.opacity += (targetOpacity - mat.opacity) * delta * 3
    })

    // Manage pulses
    const pulses = pulsesRef.current
    const idleInterval = state === 'IDLE' ? 5 : 2

    if (pulseTimerRef.current > idleInterval) {
      pulseTimerRef.current = 0

      const inactivePulse = pulses.find(p => !p.active)
      if (inactivePulse) {
        let candidateIdx: number
        if (state === 'IDLE' || state === 'DORMANT') {
          candidateIdx = Math.floor(pulseRng.current() * pathways.length)
        } else {
          const relevant = pathways
            .map((p, i) => ({ p, i }))
            .filter(({ p }) => activeRegions.includes(p.from) || activeRegions.includes(p.to))
          if (relevant.length > 0) {
            candidateIdx = relevant[Math.floor(pulseRng.current() * relevant.length)].i
          } else {
            candidateIdx = Math.floor(pulseRng.current() * pathways.length)
          }
        }

        inactivePulse.pathwayIdx = candidateIdx
        inactivePulse.progress = 0
        inactivePulse.speed = 0.6 + pulseRng.current() * 0.4
        inactivePulse.active = true
      }
    }

    // Update active pulses
    pulses.forEach(pulse => {
      if (!pulse.active) return

      pulse.progress += delta * pulse.speed

      const mat = materialsRef.current[pulse.pathwayIdx]
      const pulseEmissive = Math.max(0, 1.0 - Math.abs(pulse.progress - 0.5) * 4) * 0.6
      mat.opacity = Math.max(mat.opacity, 0.15 + pulseEmissive)

      if (pulse.progress >= 1) {
        pulse.active = false
      }
    })
  })

  return (
    <group>
      {tubeGeometries.map((geo, idx) => (
        <mesh key={pathways[idx].id} geometry={geo} material={materialsRef.current[idx]} />
      ))}
    </group>
  )
}
