'use client'

const metrics = [
  { number: '4,587', label: 'tests passing', context: '0 failures' },
  { number: '60%+', label: 'context compression', context: 'vs. raw retrieval' },
  { number: '0', label: 'internal LLM calls', context: 'fully deterministic' },
  { number: '< 100ms', label: 'capture latency', context: 'p99' },
]

const badges = [
  '100 tasks across 10 phases',
  'APIs frozen — no breaking changes',
  'GDPR-ready — hard deletion with tombstones',
  'Full provenance on every artifact',
]

export function ProofSection() {
  return (
    <section
      id="performance"
      className="relative bg-bg-base grid-pattern"
      aria-labelledby="performance-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <div className="text-center">
          <span className="text-xs font-medium text-text-tertiary tracking-[0.12em] uppercase">
            THE NUMBERS
          </span>
          <h2
            id="performance-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Tested. Measured. Shipped.
          </h2>
        </div>

        {/* Metrics */}
        <div className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div
                className="text-[48px] md:text-[64px] lg:text-[96px] font-mono font-medium text-text-primary leading-none"
                style={{ fontFeatureSettings: '"tnum"' }}
                data-value={metric.number}
              >
                {metric.number}
              </div>
              <div className="mt-2 text-sm font-medium text-text-tertiary">
                {metric.label}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                {metric.context}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 text-xs font-medium text-text-tertiary bg-bg-overlay border border-border-medium rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Credibility copy */}
        <p className="mt-8 text-sm text-text-tertiary text-center max-w-[680px] mx-auto">
          Built across 100 engineering tasks over 10 development phases. Every layer 
          independently tested. Every API frozen before release. This isn&apos;t a prototype 
          with a landing page — it&apos;s infrastructure that shipped.
        </p>
      </div>
    </section>
  )
}
