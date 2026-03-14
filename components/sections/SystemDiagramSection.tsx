'use client'

import { ScrollReveal } from '@/components/motion/ScrollReveal'

interface FlowNode {
  label: string
  sublabel?: string
  color: string
  icon?: string
}

const highLevelFlow: FlowNode[] = [
  { label: 'Agent', sublabel: 'Your AI agent', color: '#8B5CF6' },
  { label: 'Hippocortex', sublabel: 'Memory layer', color: '#00E5CC' },
  { label: 'LLM', sublabel: 'Any model', color: '#F59E0B' },
]

const detailedFlow: FlowNode[] = [
  { label: 'Capture', sublabel: 'Event ingestion', color: '#00E5CC' },
  { label: 'Compile', sublabel: 'Artifact builder', color: '#06B6D4' },
  { label: 'Artifacts', sublabel: 'Knowledge store', color: '#8B5CF6' },
  { label: 'Context Pack', sublabel: 'Compressed output', color: '#A78BFA' },
  { label: 'Agent Reasoning', sublabel: 'Enhanced output', color: '#E8E8F0' },
]

function FlowArrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center mx-1 md:mx-2">
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
        <line x1="0" y1="6" x2="24" y2="6" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.5" />
        <polygon points="24,2 32,6 24,10" fill={color} fillOpacity="0.6" />
      </svg>
    </div>
  )
}

function FlowBox({ node }: { node: FlowNode }) {
  return (
    <div
      className="flex flex-col items-center text-center px-4 py-3 md:px-6 md:py-4 rounded-xl border bg-bg-surface/60"
      style={{ borderColor: `${node.color}25` }}
    >
      <div
        className="w-2 h-2 rounded-full mb-2"
        style={{ background: node.color, boxShadow: `0 0 8px ${node.color}50` }}
      />
      <div className="text-sm md:text-base font-semibold text-text-primary">{node.label}</div>
      {node.sublabel && (
        <div className="text-[11px] text-text-muted mt-0.5">{node.sublabel}</div>
      )}
    </div>
  )
}

export function SystemDiagramSection() {
  return (
    <section
      id="system"
      className="relative bg-bg-void"
      aria-labelledby="system-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            SYSTEM ARCHITECTURE
          </span>
          <h2
            id="system-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            How It Fits Together
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Hippocortex sits between your agent and the LLM. Events flow in, compressed
            reasoning context flows out.
          </p>
        </ScrollReveal>

        {/* High-level flow: Agent → Hippocortex → LLM */}
        <ScrollReveal delay={150} className="mt-12">
          <div className="max-w-[600px] mx-auto">
            <div className="text-xs font-mono text-text-ghost text-center mb-4 tracking-wider uppercase">
              High-Level Flow
            </div>
            <div className="flex items-center justify-center flex-wrap gap-y-3">
              {highLevelFlow.map((node, i) => (
                <div key={node.label} className="flex items-center">
                  <FlowBox node={node} />
                  {i < highLevelFlow.length - 1 && <FlowArrow color={node.color} />}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Expanded flow */}
        <ScrollReveal delay={250} className="mt-14">
          <div className="max-w-[900px] mx-auto">
            <div className="text-xs font-mono text-text-ghost text-center mb-4 tracking-wider uppercase">
              Expanded Pipeline
            </div>
            <div className="flex items-center justify-center flex-wrap gap-y-3">
              {detailedFlow.map((node, i) => (
                <div key={node.label} className="flex items-center">
                  <FlowBox node={node} />
                  {i < detailedFlow.length - 1 && <FlowArrow color={node.color} />}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Data flow details */}
        <ScrollReveal delay={350} className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[900px] mx-auto">
            <div className="bg-bg-surface/60 border border-border-subtle rounded-xl p-5">
              <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-3">Input</div>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan mt-0.5">→</span>
                  Agent events (messages, tool calls)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan mt-0.5">→</span>
                  Session metadata and timestamps
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan mt-0.5">→</span>
                  Structured payloads with schemas
                </li>
              </ul>
            </div>

            <div className="bg-bg-surface/60 border border-border-subtle rounded-xl p-5">
              <div className="text-xs font-mono text-accent-violet tracking-wider uppercase mb-3">Processing</div>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent-violet mt-0.5">→</span>
                  Event queue with ordered processing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-violet mt-0.5">→</span>
                  Deterministic compilation pipeline
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-violet mt-0.5">→</span>
                  Redis-backed predictive cache
                </li>
              </ul>
            </div>

            <div className="bg-bg-surface/60 border border-border-subtle rounded-xl p-5">
              <div className="text-xs font-mono text-accent-white tracking-wider uppercase mb-3">Output</div>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-text-primary mt-0.5">→</span>
                  Compressed reasoning context
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-primary mt-0.5">→</span>
                  Provenance-tagged artifacts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-primary mt-0.5">→</span>
                  Token-budget-optimized packs
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
