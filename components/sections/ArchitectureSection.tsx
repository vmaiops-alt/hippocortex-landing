'use client'

import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

interface Component {
  name: string
  description: string
  tech: string
  color: string
}

const components: Component[] = [
  {
    name: 'Agent SDK',
    description: 'TypeScript and Python clients. Three function calls: capture(), learn(), synthesize(). Framework-agnostic with adapters for OpenAI Agents, LangGraph, CrewAI, and more.',
    tech: 'TypeScript / Python',
    color: '#00E5CC',
  },
  {
    name: 'Capture API',
    description: 'RESTful event ingestion endpoint. Accepts structured events with automatic dedup, salience scoring, and schema validation. Sustained 403 events/sec.',
    tech: 'REST / gRPC',
    color: '#06B6D4',
  },
  {
    name: 'Event Queue',
    description: 'Ordered event processing with at-least-once delivery. Idempotent workers ensure deterministic processing regardless of retries or failures.',
    tech: 'Redis Streams',
    color: '#F59E0B',
  },
  {
    name: 'Memory Compiler',
    description: 'Deterministic pattern extraction engine. Replays event traces, identifies procedures, detects contradictions, and produces versioned knowledge artifacts.',
    tech: 'Rust Core',
    color: '#8B5CF6',
  },
  {
    name: 'Artifacts Store',
    description: 'Persistent storage for compiled knowledge artifacts. Full-text search, temporal indexing, and provenance tracking. GDPR-ready with hard deletion.',
    tech: 'PostgreSQL',
    color: '#A78BFA',
  },
  {
    name: 'Context Synthesizer',
    description: 'Multi-signal ranking engine with token-budget-aware assembly. 18ms p50 latency. Predictive cache pre-warms common query patterns.',
    tech: 'Redis + Rust',
    color: '#E8E8F0',
  },
]

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="relative bg-bg-base"
      aria-labelledby="architecture-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            INFRASTRUCTURE
          </span>
          <h2
            id="architecture-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Built for Production
          </h2>
          <p className="mt-6 text-[17px] max-md:text-base text-text-secondary leading-relaxed max-w-[720px] mx-auto">
            Six infrastructure components that handle the full lifecycle of agent memory.
            Redis for speed. PostgreSQL for durability. Rust for determinism.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={100}
        >
          {components.map((component) => (
            <div
              key={component.name}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${component.color}30, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: component.color, boxShadow: `0 0 8px ${component.color}40` }}
                  />
                  <h3 className="text-[17px] font-semibold text-text-primary">{component.name}</h3>
                </div>
                <span className="text-[10px] font-mono text-text-ghost">{component.tech}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-tertiary leading-relaxed">
                {component.description}
              </p>
            </div>
          ))}
        </StaggerReveal>

        {/* Infrastructure stack summary */}
        <ScrollReveal delay={300} className="mt-12">
          <div className="max-w-[700px] mx-auto bg-bg-surface border border-border-subtle rounded-xl p-6">
            <div className="text-xs font-mono text-text-ghost tracking-wider uppercase mb-4">Infrastructure Stack</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Compute', value: 'Rust workers' },
                { label: 'Cache', value: 'Redis' },
                { label: 'Storage', value: 'PostgreSQL' },
                { label: 'Queue', value: 'Redis Streams' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-sm font-medium text-text-primary">{item.value}</div>
                  <div className="text-[11px] text-text-muted mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
