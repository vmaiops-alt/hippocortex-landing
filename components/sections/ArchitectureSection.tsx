'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'

interface BrainRegion {
  id: string
  title: string
  shortDesc: string
  description: string
  bullets: string[]
  connections: string
  code: string
  color: string
  position: { top: string; left: string }
}

const regions: BrainRegion[] = [
  {
    id: 'capture',
    title: 'Event Capture',
    shortDesc: 'Ingests interactions through 8 adapters. Salience scoring and dedup at the gate.',
    description: 'The entry point. Every agent interaction passes through Event Capture, where salience scoring filters noise and deduplication prevents redundancy before anything enters memory.',
    bullets: [
      '8 built-in adapters (messages, tool calls, file edits, commands, and more)',
      'Automatic salience scoring — not everything is worth remembering',
      'Content deduplication at ingestion',
    ],
    connections: 'Feeds → Episodic Memory',
    code: `await hx.capture({
  type: 'tool_call',
  sessionId: 'sess-1',
  payload: { tool: 'deploy', args: { env: 'staging' } }
});`,
    color: '#00E5CC',
    position: { top: '75%', left: '30%' },
  },
  {
    id: 'episodic',
    title: 'Episodic Memory',
    shortDesc: 'Raw experience traces. Time-ordered, session-scoped, fully indexed.',
    description: 'Time-ordered traces of everything that happened. Like a detailed event log, but structured for pattern extraction. Each episode maintains its temporal position and session context.',
    bullets: [
      'Time-ordered by default — no manual timestamp management',
      'Session-scoped with cross-session linking',
      'Foundation layer for all higher-order memory',
    ],
    connections: 'Fed by → Event Capture | Feeds → Semantic Memory, Graph Memory',
    code: `// Episodes are created automatically from captured events
// Query recent episodes:
const episodes = await hx.query({ layer: 'episodic', limit: 10 });`,
    color: '#06B6D4',
    position: { top: '60%', left: '60%' },
  },
  {
    id: 'semantic',
    title: 'Semantic Memory',
    shortDesc: 'Extracted facts, preferences, and procedures. Promoted from episodic evidence.',
    description: 'Extracted facts, learned preferences, and documented procedures — promoted from recurring episodic evidence. This is knowledge your agent has earned through experience, not retrieved from a document store.',
    bullets: [
      'Facts: "Staging deployments require CI check first"',
      'Preferences: "User prefers verbose logging in development"',
      'Procedures: Step-by-step sequences extracted from repeated behavior',
    ],
    connections: 'Fed by → Episodic Memory | Feeds → Graph Memory, Memory Compiler',
    code: `// Semantic entries are created by learn()
await hx.learn();
// → Extracts procedures, facts, preferences from episodes`,
    color: '#8B5CF6',
    position: { top: '40%', left: '25%' },
  },
  {
    id: 'graph',
    title: 'Graph Memory',
    shortDesc: 'Entities, relationships, and causal chains. Traversable knowledge structure.',
    description: 'Entities and relationships as a traversable knowledge graph. When your agent learns that Service A depends on Database B, and Database B was migrated last Tuesday, that relationship is explicit — not buried in a vector embedding.',
    bullets: [
      'Named entities with typed relationships',
      'Causal chains: cause → effect, explicitly modeled',
      'Traversal queries: "What depends on this service?"',
    ],
    connections: 'Fed by → Semantic Memory, Episodic Memory | Feeds → Memory Compiler, Context Synthesis',
    code: `// Graph relationships are built automatically during learn()
const deps = await hx.query({ layer: 'graph', entity: 'payments-service' });`,
    color: '#A78BFA',
    position: { top: '25%', left: '55%' },
  },
  {
    id: 'compiler',
    title: 'Replay & Consolidation',
    shortDesc: 'Strengthens important patterns, decays noise. Memory that sharpens over time.',
    description: 'Inspired by how biological memory works during sleep. Replay reviews episodic traces, strengthens patterns that prove important, and lets noise decay naturally. Memory that gets sharper with use, not duller.',
    bullets: [
      'Importance-weighted strengthening',
      'Natural decay of low-value memories',
      'Contradiction detection and quarantine during replay',
    ],
    connections: 'Processes → Episodic Memory, Semantic Memory | Feeds back → all layers',
    code: `// Consolidation runs as part of learn()
await hx.learn(); // Triggers replay & consolidation automatically`,
    color: '#F59E0B',
    position: { top: '45%', left: '45%' },
  },
  {
    id: 'synthesizer',
    title: 'Context Synthesis',
    shortDesc: 'Assembles relevant context from all layers within token budgets. The output.',
    description: 'The output layer. Queries all six layers simultaneously, scores relevance, compresses aggressively, and assembles a provenance-tagged context packet that fits within your specified token budget. What your agent actually receives.',
    bullets: [
      '60%+ compression over raw retrieval',
      'Token-budget aware — specify your limit, get optimal context',
      'Every fact in the output traceable to source evidence',
    ],
    connections: 'Reads from → all layers | Outputs → your agent',
    code: `const ctx = await hx.synthesize('deploy payments', { budget: 4000 });
// → { entries: [...], tokens: 3847, compression: 0.64 }`,
    color: '#E8E8F0',
    position: { top: '15%', left: '40%' },
  },
]

export function ArchitectureSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const activeData = regions.find(r => r.id === activeRegion)

  const handleClose = useCallback(() => setActiveRegion(null), [])

  return (
    <section
      id="architecture"
      className="relative bg-bg-void"
      aria-labelledby="architecture-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            THE ARCHITECTURE
          </span>
          <h2
            id="architecture-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Six Layers of Intelligence
          </h2>
          <p className="mt-6 text-[17px] max-md:text-base text-text-secondary leading-relaxed max-w-[720px] mx-auto">
            Not a flat store. A living memory system where each layer builds on the one 
            below it. Episodic traces promote to semantic knowledge. Semantic facts link 
            into graph structures. Graph patterns feed the compiler. Full provenance 
            at every level.
          </p>
        </div>

        {/* Brain region interactive area */}
        <div className="mt-12 relative">
          {/* Brain visual representation */}
          <div className="relative mx-auto max-w-[700px] aspect-square">
            {/* Procedural brain background - concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full border border-border-subtle/30" />
              <div className="absolute w-[60%] h-[60%] rounded-full border border-border-subtle/20" />
              <div className="absolute w-[40%] h-[40%] rounded-full border border-border-subtle/15" />
              <div className="absolute w-[20%] h-[20%] rounded-full border border-border-subtle/10" />
            </div>

            {/* Region dots / tap targets */}
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                className="absolute z-10 group cursor-pointer"
                style={{
                  top: region.position.top,
                  left: region.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`View ${region.title} details`}
              >
                {/* Glow dot */}
                <div
                  className="w-4 h-4 rounded-full transition-all duration-300 animate-[dot-pulse_3s_ease-in-out_infinite]"
                  style={{
                    backgroundColor: region.color,
                    boxShadow: `0 0 16px ${region.color}60, 0 0 32px ${region.color}30`,
                    animationDelay: `${Math.random() * 3}s`,
                    transform: activeRegion === region.id ? 'scale(1.5)' : 'scale(1)',
                    opacity: activeRegion && activeRegion !== region.id ? 0.3 : 1,
                  }}
                />
                {/* Label */}
                <div
                  className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-bg-base/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/[0.08] transition-opacity duration-200 ${
                    activeRegion && activeRegion !== region.id ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <span className="text-[13px] font-semibold block" style={{ color: region.color }}>
                    {region.title}
                  </span>
                  <span className="text-[11px] text-text-tertiary block max-w-[200px]">
                    {region.shortDesc}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Info panel (slides in on click) */}
          {activeData && (
            <div
              className="fixed md:absolute inset-x-0 bottom-0 md:inset-auto md:right-0 md:top-0 md:w-[400px] md:h-full z-50 md:z-20"
            >
              {/* Backdrop (mobile) */}
              <div
                className="fixed inset-0 bg-black/40 md:hidden"
                onClick={handleClose}
              />

              <div className="relative bg-bg-base/95 backdrop-blur-xl border-t md:border-l border-white/[0.08] p-6 md:p-8 max-h-[80vh] md:max-h-full overflow-y-auto rounded-t-2xl md:rounded-none">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-xl cursor-pointer"
                  aria-label="Close panel"
                >
                  ✕
                </button>

                <h3 className="text-[28px] font-semibold" style={{ color: activeData.color }}>
                  {activeData.title}
                </h3>

                <p className="mt-4 text-text-secondary leading-relaxed">
                  {activeData.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {activeData.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-secondary">
                      <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-text-tertiary">
                  {activeData.connections}
                </p>

                <div className="mt-6 bg-bg-surface border border-border-subtle rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[14px] font-mono text-text-secondary leading-relaxed">
                    <code>{activeData.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button href="https://docs.hippocortex.dev/architecture" variant="text" external>
            Explore the architecture guide →
          </Button>
        </div>
      </div>
    </section>
  )
}
