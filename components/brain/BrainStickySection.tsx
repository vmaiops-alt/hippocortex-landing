'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const BrainScene = dynamic(
  () => import('@/components/brain/BrainScene').then((mod) => ({ default: mod.BrainScene })),
  { ssr: false }
)

interface FeatureCard {
  title: string
  subtitle: string
  description: string
  bullets: string[]
  color: string
}

const features: FeatureCard[] = [
  {
    title: 'Episodic Memory',
    subtitle: 'Time-ordered experience traces',
    description:
      'Every agent interaction becomes a time-ordered episodic trace. Session-scoped with cross-session linking. The foundation layer for all higher-order memory.',
    bullets: [
      'Time-ordered by default - no manual timestamp management',
      'Session-scoped with cross-session linking',
      'Foundation layer for all higher-order memory',
    ],
    color: '#06B6D4',
  },
  {
    title: 'Semantic Memory',
    subtitle: 'Learned facts and preferences',
    description:
      'Extracted facts, learned preferences, and documented procedures - promoted from recurring episodic evidence.',
    bullets: [
      'Facts: "Staging deployments require CI check first"',
      'Preferences: "User prefers verbose logging in development"',
      'Procedures extracted from repeated behavior patterns',
    ],
    color: '#8B5CF6',
  },
  {
    title: 'Graph Memory',
    subtitle: 'Entities and relationships',
    description:
      'Named entities and typed relationships as a traversable knowledge graph. Relationships are explicit - not buried in vectors.',
    bullets: [
      'Named entities with typed relationships',
      'Causal chains: cause → effect, explicitly modeled',
      'Traversal queries: "What depends on this service?"',
    ],
    color: '#A78BFA',
  },
  {
    title: 'Memory Compiler',
    subtitle: 'Pattern extraction engine',
    description:
      'Replays episodic traces, strengthens important patterns, and lets noise decay naturally. Memory that sharpens with use.',
    bullets: [
      'Importance-weighted pattern strengthening',
      'Natural decay of low-value memories',
      'Contradiction detection and quarantine',
    ],
    color: '#F59E0B',
  },
  {
    title: 'Context Synthesis',
    subtitle: 'Compressed reasoning output',
    description:
      'Queries all layers simultaneously, scores relevance, compresses aggressively, and assembles a provenance-tagged context packet.',
    bullets: [
      '60%+ compression over raw retrieval',
      'Token-budget aware - specify your limit, get optimal context',
      'Every fact traceable to source evidence',
    ],
    color: '#E8E8F0',
  },
]

function FeatureCardEl({ card }: { card: FeatureCard }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      return
    }
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 600ms ease, transform 600ms ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-xl p-6 border"
      style={{
        background: 'rgba(9,9,11,0.85)',
        borderColor: `${card.color}18`,
      }}
    >
      <div
        className="h-px w-10 mb-4 rounded-full"
        style={{ background: card.color, opacity: 0.5 }}
      />
      <h3
        className="text-lg font-semibold leading-tight"
        style={{ color: card.color }}
      >
        {card.title}
      </h3>
      <p className="text-xs mt-1" style={{ color: `${card.color}88` }}>
        {card.subtitle}
      </p>
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
        {card.description}
      </p>
      <ul className="mt-3 space-y-1.5">
        {card.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-xs text-neutral-500">
            <span className="mt-0.5 shrink-0" style={{ color: card.color }}>•</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BrainStickySection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="relative">
      {/* Brain visualization - contained, centered */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: isMobile ? '300px' : '500px' }}
      >
        <BrainScene />
      </div>

      {/* Feature cards - clean grid below the brain */}
      <div className="max-w-5xl mx-auto px-6 pb-20 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCardEl key={f.title} card={f} />
          ))}
        </div>
      </div>
    </section>
  )
}
