'use client'

import dynamic from 'next/dynamic'

const BrainLabScene = dynamic(
  () => import('@/components/brain-lab/BrainLabScene').then((m) => m.BrainLabScene),
  { ssr: false, loading: () => <div className="w-full h-full" style={{ background: '#050507' }} /> },
)

export default function BrainLabPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden" style={{ background: '#050507' }}>
      <BrainLabScene />

      {/* Vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,7,0.6) 100%)',
        }}
      />

      {/* Lab label */}
      <div
        className="fixed top-6 left-6 z-20 font-mono text-xs tracking-widest select-none"
        style={{ color: '#4A4A5A' }}
      >
        BRAIN-LAB / PHASE E
      </div>
    </main>
  )
}
