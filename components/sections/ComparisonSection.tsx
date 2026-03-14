'use client'

import { ScrollReveal } from '@/components/motion/ScrollReveal'

interface ComparisonRow {
  dimension: string
  langchain: string
  mem0: string
  zep: string
  hippocortex: string
}

const comparisons: ComparisonRow[] = [
  {
    dimension: 'Artifact Compilation',
    langchain: 'None',
    mem0: 'None',
    zep: 'Basic summaries',
    hippocortex: 'Deterministic typed artifacts',
  },
  {
    dimension: 'Predictive Context',
    langchain: 'None',
    mem0: 'None',
    zep: 'None',
    hippocortex: 'Pre-warmed cache from patterns',
  },
  {
    dimension: 'Adaptive Learning',
    langchain: 'Static after indexing',
    mem0: 'Manual updates',
    zep: 'Session summaries',
    hippocortex: 'Continuous pattern mining',
  },
  {
    dimension: 'Memory Compression',
    langchain: 'None',
    mem0: 'Basic',
    zep: 'Summarization',
    hippocortex: '60%+ deterministic compression',
  },
  {
    dimension: 'Provenance',
    langchain: 'Embeddings opaque',
    mem0: 'Partial',
    zep: 'Session-level',
    hippocortex: 'Full chain to source',
  },
  {
    dimension: 'LLM Dependency',
    langchain: 'Embedding model required',
    mem0: 'LLM for extraction',
    zep: 'LLM for summaries',
    hippocortex: 'Zero internal LLM calls',
  },
  {
    dimension: 'Determinism',
    langchain: 'Probabilistic',
    mem0: 'Non-deterministic',
    zep: 'Non-deterministic',
    hippocortex: 'Same inputs → same outputs',
  },
  {
    dimension: 'Token Budgets',
    langchain: 'Manual truncation',
    mem0: 'Not supported',
    zep: 'Not supported',
    hippocortex: 'Budget-aware synthesis',
  },
]

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-accent-cyan shrink-0 inline-block"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function DashIcon() {
  return (
    <span className="text-text-ghost shrink-0 inline-block">─</span>
  )
}

export function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="relative bg-bg-base"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            COMPARISON
          </span>
          <h2
            id="comparison-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            How Hippocortex Compares
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Not a wrapper around vector search. Infrastructure-grade memory compilation
            that no existing tool provides.
          </p>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={200} className="mt-12">
          <div className="overflow-x-auto" role="table" aria-label="Feature comparison table">
            {/* Header */}
            <div
              className="grid grid-cols-[minmax(140px,1.2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(160px,1.3fr)] min-w-[700px] border-b border-border-subtle"
              role="row"
            >
              <div className="py-4 px-3 text-sm font-medium text-text-tertiary" role="columnheader">
                Feature
              </div>
              <div className="py-4 px-3 text-sm font-medium text-text-muted" role="columnheader">
                LangChain Memory
              </div>
              <div className="py-4 px-3 text-sm font-medium text-text-muted" role="columnheader">
                Mem0
              </div>
              <div className="py-4 px-3 text-sm font-medium text-text-muted" role="columnheader">
                Zep
              </div>
              <div className="py-4 px-3 text-sm font-medium text-accent-cyan" role="columnheader">
                Hippocortex
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <ScrollReveal key={row.dimension} delay={100 + i * 60} y={0}>
                <div
                  className="grid grid-cols-[minmax(140px,1.2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(160px,1.3fr)] min-w-[700px] border-b border-border-subtle hover:bg-bg-raised transition-colors"
                  role="row"
                >
                  <div className="py-3 px-3 text-sm font-medium text-text-tertiary" role="cell">
                    {row.dimension}
                  </div>
                  <div className="py-3 px-3 text-sm text-text-muted flex items-start gap-1.5" role="cell">
                    <DashIcon /> {row.langchain}
                  </div>
                  <div className="py-3 px-3 text-sm text-text-muted flex items-start gap-1.5" role="cell">
                    <DashIcon /> {row.mem0}
                  </div>
                  <div className="py-3 px-3 text-sm text-text-muted flex items-start gap-1.5" role="cell">
                    <DashIcon /> {row.zep}
                  </div>
                  <div className="py-3 px-3 text-sm text-text-primary flex items-start gap-1.5" role="cell">
                    <CheckIcon /> {row.hippocortex}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
