'use client'

import { Suspense, useMemo, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { BrainCore } from './BrainCore'
import { SynapticNodes } from './SynapticNodes'
import { Hotspots } from './Hotspots'
import { InfoCards } from './InfoCard'
import { HOTSPOTS } from './hotspotData'

// ── Curvature computation ──────────────────────────────────────────

function computeVertexCurvature(geometry: THREE.BufferGeometry): Float32Array {
  const pos = geometry.attributes.position
  const nor = geometry.attributes.normal
  const idx = geometry.index
  const count = pos.count

  const adj: Set<number>[] = Array.from({ length: count }, () => new Set())
  if (idx) {
    const arr = idx.array
    for (let i = 0; i < arr.length; i += 3) {
      const a = arr[i], b = arr[i + 1], c = arr[i + 2]
      adj[a].add(b); adj[a].add(c)
      adj[b].add(a); adj[b].add(c)
      adj[c].add(a); adj[c].add(b)
    }
  } else {
    for (let i = 0; i < count; i += 3) {
      adj[i].add(i + 1); adj[i].add(i + 2)
      adj[i + 1].add(i); adj[i + 1].add(i + 2)
      adj[i + 2].add(i); adj[i + 2].add(i + 1)
    }
  }

  const rawCurv = new Float32Array(count)
  const pi = new THREE.Vector3()
  const pj = new THREE.Vector3()
  const ni = new THREE.Vector3()
  const lap = new THREE.Vector3()

  for (let i = 0; i < count; i++) {
    const neighbors = adj[i]
    if (neighbors.size === 0) continue
    pi.fromBufferAttribute(pos, i)
    ni.fromBufferAttribute(nor, i)
    lap.set(0, 0, 0)
    for (const j of neighbors) {
      pj.fromBufferAttribute(pos, j)
      lap.add(pj)
    }
    lap.divideScalar(neighbors.size)
    lap.sub(pi)
    const dotN = lap.dot(ni)
    const mag = lap.length()
    rawCurv[i] = dotN < 0 ? mag : -mag
  }

  let current = rawCurv
  for (let pass = 0; pass < 3; pass++) {
    const next = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const neighbors = adj[i]
      if (neighbors.size === 0) { next[i] = current[i]; continue }
      let sum = current[i] * 2
      let weight = 2
      for (const j of neighbors) { sum += current[j]; weight++ }
      next[i] = sum / weight
    }
    current = next
  }

  let maxAbs = 0
  for (let i = 0; i < count; i++) {
    const abs = Math.abs(current[i])
    if (abs > maxAbs) maxAbs = abs
  }
  const result = new Float32Array(count)
  if (maxAbs > 0) {
    for (let i = 0; i < count; i++) result[i] = current[i] / maxAbs
  }
  return result
}

// ── Shared brain data hook ─────────────────────────────────────────

function useBrainData() {
  const gltf = useGLTF('/models/brain-base.glb')

  return useMemo(() => {
    let sourceMesh: THREE.Mesh | null = null
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !sourceMesh) {
        sourceMesh = child as THREE.Mesh
      }
    })
    if (!sourceMesh) throw new Error('No mesh found in brain-base.glb')

    const geometry = (sourceMesh as THREE.Mesh).geometry.clone()
    if (!geometry.attributes.normal) geometry.computeVertexNormals()

    const curvature = computeVertexCurvature(geometry)
    geometry.setAttribute('aCurvature', new THREE.BufferAttribute(curvature, 1))

    return { geometry, curvature }
  }, [gltf])
}

// ── Camera accessor for HTML overlay ───────────────────────────────

function CameraAccessor({ onCamera }: { onCamera: (cam: THREE.Camera) => void }) {
  const { camera } = useThree()
  useEffect(() => { onCamera(camera) }, [camera, onCamera])
  return null
}

// ── Group transform for 3D→2D projection ──────────────────────────

const GROUP_ROTATION = new THREE.Euler(0.08, -0.25, 0)
const GROUP_SCALE = 0.95
const GROUP_MATRIX = new THREE.Matrix4()
  .makeRotationFromEuler(GROUP_ROTATION)
  .scale(new THREE.Vector3(GROUP_SCALE, GROUP_SCALE, GROUP_SCALE))

// ── Cursor tracking for shader ─────────────────────────────────────

interface CursorState {
  position: THREE.Vector3
  active: boolean
  lastTriggerTime: number
  lastRegionId: string | null
}

// ── BrainCore wrapper that handles cursor + hotspot uniforms ───────

function BrainCoreWithEffects({
  geometry,
  activeHotspotId,
  isMobile,
}: {
  geometry: THREE.BufferGeometry
  activeHotspotId: string | null
  isMobile: boolean
}) {
  const cursorRef = useRef<CursorState>({
    position: new THREE.Vector3(),
    active: false,
    lastTriggerTime: -10,
    lastRegionId: null,
  })
  const cooldownRef = useRef(0) // timestamp of last cursor trigger
  const shaderTimeRef = useRef(0)

  // Find the BrainCore mesh and update its shader uniforms each frame
  const brainMeshRef = useRef<THREE.Mesh>(null)

  // Handle hotspot activation: update shader uniforms
  const prevActiveRef = useRef<string | null>(null)
  const hotspotActivationTimeRef = useRef(0)

  useFrame((state, delta) => {
    shaderTimeRef.current += delta

    // Find the brain mesh's material
    const scene = state.scene
    let mat: THREE.ShaderMaterial | null = null

    // The brain core mesh is inside a group — traverse to find it
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh && mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms?.uHotspotActive) {
        mat = mesh.material as THREE.ShaderMaterial
      }
    })

    if (!mat) return

    const m = mat as THREE.ShaderMaterial

    // ── Hotspot convergence ──
    if (activeHotspotId !== prevActiveRef.current) {
      prevActiveRef.current = activeHotspotId
      if (activeHotspotId) {
        const hs = HOTSPOTS.find((h) => h.id === activeHotspotId)
        if (hs) {
          // Transform hotspot position by group matrix
          const worldPos = hs.position.clone().applyMatrix4(GROUP_MATRIX)
          m.uniforms.uHotspotPos.value.copy(worldPos)
          m.uniforms.uHotspotTime.value = m.uniforms.uTime.value
          hotspotActivationTimeRef.current = shaderTimeRef.current
        }
      }
    }

    // Smooth hotspot active transition
    const hotspotTarget = activeHotspotId ? 1.0 : 0.0
    const currentActive = m.uniforms.uHotspotActive.value as number
    m.uniforms.uHotspotActive.value = currentActive + (hotspotTarget - currentActive) * Math.min(1, delta * 6)

    // ── Cursor reactive ──
    const cursor = cursorRef.current
    const cursorTarget = cursor.active && !isMobile ? 1.0 : 0.0
    const currentCursor = m.uniforms.uCursorActive.value as number
    m.uniforms.uCursorActive.value = currentCursor + (cursorTarget - currentCursor) * Math.min(1, delta * 8)

    if (cursor.active && !isMobile) {
      m.uniforms.uCursorPos.value.copy(cursor.position)
    }
  })

  // Cursor move handler
  const handlePointerMove = useCallback(
    (e: any) => {
      if (isMobile) return
      const point = e.point as THREE.Vector3 | undefined
      if (!point) return

      const cursor = cursorRef.current
      cursor.position.copy(point)
      cursor.active = true

      // Check if cursor is near a hotspot region → trigger pulse (with cooldown)
      const now = performance.now() / 1000
      if (now - cooldownRef.current > 1.5) {
        // Find nearest hotspot
        let nearest: string | null = null
        let nearestDist = Infinity
        for (const hs of HOTSPOTS) {
          const worldPos = hs.position.clone().applyMatrix4(GROUP_MATRIX)
          const d = point.distanceTo(worldPos)
          if (d < nearestDist) {
            nearestDist = d
            nearest = hs.id
          }
        }

        // If within ~0.35 of a hotspot and it's a different region → trigger
        if (nearest && nearestDist < 0.35 && nearest !== cursor.lastRegionId) {
          cursor.lastRegionId = nearest
          cooldownRef.current = now

          // Update trigger time in shader
          const scene = e.eventObject?.parent?.parent
          if (scene) {
            scene.traverse?.((obj: any) => {
              const mesh = obj as THREE.Mesh
              if (mesh.isMesh && (mesh.material as THREE.ShaderMaterial)?.uniforms?.uCursorTriggerTime) {
                const mat = mesh.material as THREE.ShaderMaterial
                mat.uniforms.uCursorTriggerTime.value = mat.uniforms.uTime.value
              }
            })
          }
        }
      }
    },
    [isMobile],
  )

  return <BrainCore geometry={geometry} onPointerMove={handlePointerMove} />
}

// ── Scene content (inside Canvas) ──────────────────────────────────

function BrainLabContent({
  hoveredId,
  activeId,
  onHover,
  onActivate,
  onCamera,
  isMobile,
}: {
  hoveredId: string | null
  activeId: string | null
  onHover: (id: string | null) => void
  onActivate: (id: string | null) => void
  onCamera: (cam: THREE.Camera) => void
  isMobile: boolean
}) {
  const { geometry, curvature } = useBrainData()

  return (
    <>
      <CameraAccessor onCamera={onCamera} />

      <group
        rotation={[0.08, -0.25, 0]}
        scale={0.95}
        onPointerLeave={() => {
          // Clear cursor when pointer leaves the brain
        }}
      >
        <BrainCoreWithEffects
          geometry={geometry}
          activeHotspotId={activeId}
          isMobile={isMobile}
        />
        <SynapticNodes geometry={geometry} curvature={curvature} />
        <Hotspots
          hoveredId={hoveredId}
          activeId={activeId}
          onHover={onHover}
          onActivate={onActivate}
        />
      </group>

      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

// ── Auto-cycle constants ───────────────────────────────────────────

const AUTO_CYCLE_INTERVAL = 4000 // ms between hotspot transitions
const RESUME_DELAY = 8000        // ms of idle before resuming auto-cycle

// ── Exported scene ─────────────────────────────────────────────────

interface BrainLabSceneProps {
  onActiveChange?: (id: string | null) => void
}

export function BrainLabScene({ onActiveChange }: BrainLabSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [manualActiveId, setManualActiveId] = useState<string | null>(null)
  const [autoCycleIndex, setAutoCycleIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [camera, setCamera] = useState<THREE.Camera | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  // Detect large screen (lg breakpoint = 1024px)
  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Effective active ID: user selection takes priority, otherwise auto-cycle
  const activeId = userPaused
    ? (manualActiveId || hoveredId)
    : HOTSPOTS[autoCycleIndex]?.id ?? null

  // ── Auto-cycle timer ──
  useEffect(() => {
    if (userPaused) return
    const interval = setInterval(() => {
      setAutoCycleIndex((prev) => (prev + 1) % HOTSPOTS.length)
    }, AUTO_CYCLE_INTERVAL)
    return () => clearInterval(interval)
  }, [userPaused])

  // ── Pause auto-cycle on user interaction ──
  const pauseAutoCycle = useCallback(() => {
    setUserPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      setUserPaused(false)
      setManualActiveId(null)
    }, RESUME_DELAY)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  // Detect mobile/touch device
  useEffect(() => {
    const check = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const narrow = window.innerWidth < 768
      setIsMobile(touch || narrow)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Keyboard shortcuts: 1-6 toggle hotspots, Escape closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = parseInt(e.key, 10)
      if (idx >= 1 && idx <= 6) {
        const id = HOTSPOTS[idx - 1]?.id
        if (id) {
          setManualActiveId((prev) => (prev === id ? null : id))
          pauseAutoCycle()
        }
      }
      if (e.key === 'Escape') {
        setManualActiveId(null)
        setUserPaused(false)
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [pauseAutoCycle])

  // ── Wrapped handlers for hotspot interaction ──
  const handleHover = useCallback(
    (id: string | null) => {
      setHoveredId(id)
      if (id) pauseAutoCycle()
    },
    [pauseAutoCycle],
  )

  const handleActivate = useCallback(
    (id: string | null) => {
      setManualActiveId(id)
      if (id) {
        pauseAutoCycle()
      } else {
        // User clicked to deactivate — resume auto-cycle
        setUserPaused(false)
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      }
    },
    [pauseAutoCycle],
  )

  const handleCamera = useCallback((cam: THREE.Camera) => setCamera(cam), [])

  // Report active hotspot changes to parent
  useEffect(() => {
    onActiveChange?.(activeId)
  }, [activeId, onActiveChange])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0.15, 2.8], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        raycaster={{ params: { Points: { threshold: 0.1 } } as any }}
      >
        <Suspense fallback={null}>
          <BrainLabContent
            hoveredId={hoveredId}
            activeId={activeId}
            onHover={handleHover}
            onActivate={handleActivate}
            onCamera={handleCamera}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* HTML overlay: info cards (large screens only) */}
      {isLargeScreen && (
        <InfoCards
          activeId={activeId}
          hoveredId={hoveredId}
          camera={camera}
          containerRef={containerRef}
          groupTransform={GROUP_MATRIX}
        />
      )}
    </div>
  )
}

useGLTF.preload('/models/brain-base.glb')
