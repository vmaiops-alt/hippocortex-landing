'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BrainShell } from './BrainShell'
import { SignalPathways } from './SignalPathways'

function BrainContent() {
  return (
    <>
      {/* Lighting — strong key/fill for hemisphere silhouette definition */}
      <ambientLight intensity={0.12} />
      {/* Key light — above-right, cool white for top-lit feel */}
      <directionalLight position={[3, 4, 5]} intensity={0.6} color="#C8C8D0" />
      {/* Fill light — opposite side, dim, slight cyan tint */}
      <directionalLight position={[-4, -1, 3]} intensity={0.15} color="#06B6D4" />
      {/* Back rim — edge definition from behind */}
      <directionalLight position={[0, 2, -4]} intensity={0.35} color="#A0A0B0" />
      {/* Subtle bottom fill for brain stem visibility */}
      <pointLight position={[0, -2, 2]} intensity={0.1} color="#8B5CF6" />

      {/* Brain layers — slight 3/4 angle for better topology readability */}
      <group position={[0, 0, 0]} scale={0.65} rotation={[0.10, -0.30, 0]}>
        <BrainShell />
        <SignalPathways />
      </group>

      {/* Post-processing — bloom tuned per W4: threshold 0.6, strength 0.8 */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export function BrainScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Mobile fallback: static CSS-only brain representation
  if (isMobile) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Brain glow background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,229,204,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          }}
        />

        {/* CSS glow dots for regions */}
        {[
          { top: '75%', left: '30%', color: '#00E5CC', delay: '0s' },
          { top: '60%', left: '60%', color: '#06B6D4', delay: '0.5s' },
          { top: '40%', left: '25%', color: '#8B5CF6', delay: '1s' },
          { top: '25%', left: '55%', color: '#A78BFA', delay: '1.5s' },
          { top: '45%', left: '45%', color: '#F59E0B', delay: '2s' },
          { top: '15%', left: '40%', color: '#E8E8F0', delay: '2.5s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-[dot-pulse_3s_ease-in-out_infinite]"
            style={{
              top: dot.top,
              left: dot.left,
              backgroundColor: dot.color,
              boxShadow: `0 0 16px ${dot.color}60, 0 0 32px ${dot.color}30`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>
    )
  }

  // Reduced motion: show static 3D scene without animations
  // (useFrame in child components already check reducedMotion)

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        // Limit pixel ratio on high-DPI displays
        ...(typeof window !== 'undefined' && window.devicePixelRatio > 2
          ? { pixelRatio: 2 }
          : {}),
      }}
      style={{ background: 'transparent' }}
      frameloop={isReducedMotion ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <BrainContent />
      </Suspense>
    </Canvas>
  )
}
