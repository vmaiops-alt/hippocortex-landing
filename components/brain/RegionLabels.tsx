'use client'

import { useEffect, useState } from 'react'
import { useBrainStore, BrainState } from '@/lib/store'

// ── Label Configuration ────────────────────────────────────────────
interface LabelConfig {
  id: string
  title: string
  subtitle: string
  color: string
  // Position of the dot (brain surface point) as % of container
  dotX: number
  dotY: number
  // Direction the label extends from the dot
  direction: 'left' | 'right'
  // Connector line length in px
  lineLength: number
}

// Labels positioned at brain edges with clear separation from center
// Left-side regions → labels to the left, right-side and top → right
const LABELS: LabelConfig[] = [
  {
    id: 'episodic',
    title: 'Episodic Memory',
    subtitle: 'Time-ordered experience traces',
    color: '#06B6D4',
    dotX: 62,
    dotY: 62,
    direction: 'right',
    lineLength: 80,
  },
  {
    id: 'semantic',
    title: 'Semantic Memory',
    subtitle: 'Learned facts and preferences',
    color: '#8B5CF6',
    dotX: 66,
    dotY: 44,
    direction: 'right',
    lineLength: 90,
  },
  {
    id: 'graph',
    title: 'Graph Memory',
    subtitle: 'Entities and relationships',
    color: '#A78BFA',
    dotX: 62,
    dotY: 26,
    direction: 'right',
    lineLength: 85,
  },
  {
    id: 'compiler',
    title: 'Memory Compiler',
    subtitle: 'Pattern extraction engine',
    color: '#F59E0B',
    dotX: 38,
    dotY: 54,
    direction: 'left',
    lineLength: 90,
  },
  {
    id: 'synthesizer',
    title: 'Context Synthesis',
    subtitle: 'Compressed reasoning output',
    color: '#E8E8F0',
    dotX: 52,
    dotY: 18,
    direction: 'right',
    lineLength: 80,
  },
]

// Map brain state to active label IDs (max 2-3)
const STATE_LABELS: Record<BrainState, string[]> = {
  IDLE: [],
  EPISODIC: ['episodic'],
  SEMANTIC: ['semantic', 'episodic'],
  GRAPH: ['graph'],
  COMPILER: ['compiler'],
  SYNTHESIS: ['synthesizer'],
  DORMANT: [],
}

// ── Label Item ─────────────────────────────────────────────────────
function LabelItem({
  label,
  isVisible,
}: {
  label: LabelConfig
  isVisible: boolean
}) {
  const isLeft = label.direction === 'left'

  return (
    <div
      className="absolute flex items-center"
      style={{
        left: `${label.dotX}%`,
        top: `${label.dotY}%`,
        transform: 'translate(-2px, -50%)',
        flexDirection: isLeft ? 'row-reverse' : 'row',
        pointerEvents: 'none',
      }}
    >
      {/* Dot at brain surface */}
      <div
        className="w-1 h-1 rounded-full flex-shrink-0 transition-opacity"
        style={{
          backgroundColor: label.color,
          opacity: isVisible ? 0.6 : 0,
          boxShadow: isVisible ? `0 0 6px ${label.color}40` : 'none',
          transitionDuration: isVisible ? '200ms' : '100ms',
        }}
      />

      {/* Connector line */}
      <div
        className="flex-shrink-0"
        style={{
          width: `${label.lineLength}px`,
          height: '1px',
          background: `${label.color}66`,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isLeft ? 'right' : 'left',
          transition: `transform 300ms cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '50ms' : '0ms'}`,
        }}
      />

      {/* Label box */}
      <div
        className="flex-shrink-0 rounded-lg"
        style={{
          padding: '8px 12px',
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${label.color}4D`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : `translateX(${isLeft ? '8px' : '-8px'})`,
          transition: `opacity 200ms ease-out ${isVisible ? '150ms' : '0ms'}, transform 200ms ease-out ${isVisible ? '150ms' : '0ms'}`,
          marginLeft: isLeft ? 0 : '4px',
          marginRight: isLeft ? '4px' : 0,
        }}
      >
        <div
          className="text-[13px] font-semibold leading-tight whitespace-nowrap"
          style={{ color: label.color }}
        >
          {label.title}
        </div>
        <div className="text-[11px] leading-snug mt-0.5 max-w-[180px]" style={{ color: '#8888A0' }}>
          {label.subtitle}
        </div>
      </div>
    </div>
  )
}

// ── RegionLabels Component ─────────────────────────────────────────
export function RegionLabels() {
  const state = useBrainStore((s) => s.state)
  const [visible, setVisible] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767)
  }, [])

  // Smooth transitions: slight delay for state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(STATE_LABELS[state] || [])
      return
    }

    const activeLabels = STATE_LABELS[state] || []
    const timeout = setTimeout(() => {
      setVisible(activeLabels)
    }, 80)
    return () => clearTimeout(timeout)
  }, [state])

  if (isMobile) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {LABELS.map((label) => (
        <LabelItem
          key={label.id}
          label={label}
          isVisible={visible.includes(label.id)}
        />
      ))}
    </div>
  )
}
