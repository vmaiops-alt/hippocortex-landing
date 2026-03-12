'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { updateBrainState } from './RegionController'
import { RegionLabels } from './RegionLabels'
import { useBrainStore } from '@/lib/store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Dynamic import for Brain scene (Three.js - client-only)
const BrainScene = dynamic(
  () =>
    import('@/components/brain/BrainScene').then((mod) => ({
      default: mod.BrainScene,
    })),
  { ssr: false }
)

// ── Panel Data ─────────────────────────────────────────────────────
interface PanelData {
  id: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  color: string
}

const panels: PanelData[] = [
  {
    id: 'episodic',
    title: 'Episodic Memory',
    subtitle: 'Time-ordered experience traces',
    description:
      'Every agent interaction becomes a time-ordered episodic trace. Session-scoped with cross-session linking. The foundation layer for all higher-order memory.',
    bullets: [
      'Time-ordered by default — no manual timestamp management',
      'Session-scoped with cross-session linking',
      'Foundation layer for all higher-order memory',
    ],
    color: '#06B6D4',
  },
  {
    id: 'semantic',
    title: 'Semantic Memory',
    subtitle: 'Learned facts and preferences',
    description:
      'Extracted facts, learned preferences, and documented procedures — promoted from recurring episodic evidence. Knowledge your agent earned through experience.',
    bullets: [
      'Facts: "Staging deployments require CI check first"',
      'Preferences: "User prefers verbose logging in development"',
      'Procedures extracted from repeated behavior patterns',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'graph',
    title: 'Graph Memory',
    subtitle: 'Entities and relationships',
    description:
      'Named entities and typed relationships as a traversable knowledge graph. When Service A depends on Database B, that relationship is explicit — not buried in vectors.',
    bullets: [
      'Named entities with typed relationships',
      'Causal chains: cause → effect, explicitly modeled',
      'Traversal queries: "What depends on this service?"',
    ],
    color: '#A78BFA',
  },
  {
    id: 'compiler',
    title: 'Memory Compiler',
    subtitle: 'Pattern extraction engine',
    description:
      'Replays episodic traces, strengthens important patterns, and lets noise decay naturally. Contradiction detection and quarantine during replay. Memory that sharpens with use.',
    bullets: [
      'Importance-weighted pattern strengthening',
      'Natural decay of low-value memories',
      'Contradiction detection and quarantine',
    ],
    color: '#F59E0B',
  },
  {
    id: 'synthesizer',
    title: 'Context Synthesis',
    subtitle: 'Compressed reasoning output',
    description:
      'Queries all six layers simultaneously, scores relevance, compresses aggressively, and assembles a provenance-tagged context packet within your token budget.',
    bullets: [
      '60%+ compression over raw retrieval',
      'Token-budget aware — specify your limit, get optimal context',
      'Every fact traceable to source evidence',
    ],
    color: '#E8E8F0',
  },
]

// ── Scroll Panel Component ─────────────────────────────────────────
function ScrollPanel({ panel, index }: { panel: PanelData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition =
            'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        } else {
          el.style.transition =
            'opacity 400ms cubic-bezier(0.4, 0, 1, 1), transform 400ms cubic-bezier(0.4, 0, 1, 1)'
          el.style.opacity = '0'
          el.style.transform = 'translateY(-20px)'
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Alternate left/right positioning
  const isRight = index % 2 === 0

  return (
    <div
      className={`min-h-[45vh] flex items-center px-6 md:px-12 lg:px-20 py-8 ${
        isRight ? 'justify-end' : 'justify-start'
      }`}
    >
      <div ref={ref} className="max-w-[420px] pointer-events-auto">
        <div
          className="rounded-2xl px-7 py-6 border"
          style={{
            background: 'rgba(9,9,11,0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: `${panel.color}20`,
          }}
        >
          {/* Accent top bar */}
          <div
            className="h-px w-12 mb-4 rounded-full"
            style={{ background: panel.color, opacity: 0.6 }}
          />

          <h3
            className="text-[22px] font-semibold leading-tight"
            style={{ color: panel.color }}
          >
            {panel.title}
          </h3>
          <p className="text-[13px] mt-1" style={{ color: `${panel.color}99` }}>
            {panel.subtitle}
          </p>
          <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
            {panel.description}
          </p>
          <ul className="mt-4 space-y-2">
            {panel.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[13px] text-text-tertiary"
              >
                <span className="mt-0.5 shrink-0" style={{ color: panel.color }}>
                  •
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Mobile Fallback ────────────────────────────────────────────────
function MobileBrainSection() {
  return (
    <div className="space-y-6 px-4">
      {panels.map((panel) => (
        <div
          key={panel.id}
          className="rounded-xl p-6 border"
          style={{
            background: 'rgba(9,9,11,0.9)',
            borderColor: `${panel.color}20`,
          }}
        >
          <h3
            className="text-lg font-semibold"
            style={{ color: panel.color }}
          >
            {panel.title}
          </h3>
          <p className="text-xs mt-1" style={{ color: `${panel.color}99` }}>
            {panel.subtitle}
          </p>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            {panel.description}
          </p>
        </div>
      ))}
    </div>
  )
}

// ── Main Sticky Section ────────────────────────────────────────────
export function BrainStickySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !containerRef.current) return

    // Track scroll progress through the sticky section
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        updateBrainState(self.progress)
      },
      onLeave: () => {
        // Brain exits → go dormant
        useBrainStore.getState().setState('DORMANT')
      },
      onLeaveBack: () => {
        // Scrolling back up above the section
        useBrainStore.getState().setState('IDLE')
      },
    })

    return () => trigger.kill()
  }, [isMobile])

  if (isMobile) {
    return <MobileBrainSection />
  }

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '300vh' }}>
      {/* Sticky brain canvas — fills viewport, sticks to top */}
      <div className="sticky top-0 h-screen w-full z-0">
        <BrainScene />
        <RegionLabels />
      </div>

      {/* Scroll panels — overlap the brain via negative margin */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ marginTop: '-100vh' }}
      >
        {/* Initial spacer: brain shows alone */}
        <div className="h-[50vh]" />

        {panels.map((panel, i) => (
          <ScrollPanel key={panel.id} panel={panel} index={i} />
        ))}

        {/* End spacer: brain shows alone after last panel */}
        <div className="h-[30vh]" />
      </div>
    </div>
  )
}
