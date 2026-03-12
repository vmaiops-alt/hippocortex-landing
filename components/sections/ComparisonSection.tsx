'use client'

import { Button } from '@/components/ui/Button'

const comparisons = [
  {
    dimension: 'Architecture',
    rag: 'Flat vector store',
    hippocortex: 'Six-layer: episodic → semantic → graph → compiled',
  },
  {
    dimension: 'Learning',
    rag: 'None — static after indexing',
    hippocortex: 'Continuous pattern mining from live experience',
  },
  {
    dimension: 'Contradictions',
    rag: 'Conflicting chunks coexist silently',
    hippocortex: 'Detection, quarantine, resolution',
  },
  {
    dimension: 'Provenance',
    rag: 'Embeddings are opaque',
    hippocortex: 'Every fact traceable to source evidence',
  },
  {
    dimension: 'Temporal Awareness',
    rag: 'Timestamp metadata at best',
    hippocortex: 'First-class temporal ordering across all layers',
  },
  {
    dimension: 'Context Quality',
    rag: 'Nearest-neighbor retrieval dumps',
    hippocortex: 'Budget-optimized synthesis, 60%+ compression',
  },
  {
    dimension: 'Determinism',
    rag: 'Probabilistic similarity scores',
    hippocortex: 'Same inputs → same outputs. Always.',
  },
  {
    dimension: 'LLM Dependency',
    rag: 'Requires embedding model',
    hippocortex: 'Zero internal LLM calls',
  },
]

export function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="relative bg-bg-base"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <div className="text-center">
          <h2
            id="comparison-heading"
            className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold"
          >
            <span className="text-accent-cyan">Memory</span>
            <span className="text-text-primary">, Not </span>
            <span className="text-text-muted line-through decoration-text-muted">Search</span>
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            RAG retrieves documents. Hippocortex learns from experience. 
            Here&apos;s what that difference looks like in practice.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="mt-12 overflow-x-auto" role="table" aria-label="Comparison table">
          {/* Header */}
          <div className="grid grid-cols-[minmax(140px,1fr)_minmax(200px,1.5fr)_minmax(200px,1.5fr)] min-w-[600px] border-b border-border-subtle" role="row">
            <div className="py-4 px-4 text-sm font-medium text-text-tertiary" role="columnheader">Dimension</div>
            <div className="py-4 px-4 text-sm font-medium text-text-muted" role="columnheader">RAG / Vector DB</div>
            <div className="py-4 px-4 text-sm font-medium text-text-primary" role="columnheader">Hippocortex</div>
          </div>

          {/* Rows */}
          {comparisons.map((row) => (
            <div
              key={row.dimension}
              className="grid grid-cols-[minmax(140px,1fr)_minmax(200px,1.5fr)_minmax(200px,1.5fr)] min-w-[600px] border-b border-border-subtle hover:bg-bg-raised transition-colors"
              role="row"
            >
              <div className="py-4 px-4 text-sm font-medium text-text-tertiary" role="cell">
                {row.dimension}
              </div>
              <div className="py-4 px-4 text-[17px] max-md:text-sm text-text-muted flex items-start gap-2" role="cell">
                <span className="text-text-ghost shrink-0 mt-1">─</span>
                {row.rag}
              </div>
              <div className="py-4 px-4 text-[17px] max-md:text-sm text-text-primary flex items-start gap-2" role="cell">
                <svg className="w-4 h-4 text-accent-cyan shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {row.hippocortex}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="https://docs.hippocortex.dev/comparison" variant="ghost">
            See how it works →
          </Button>
        </div>
      </div>

      {/* Neural line divider */}
      <div className="neural-line" />
    </section>
  )
}
