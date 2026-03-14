'use client'

import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'
import { CountUp } from '@/components/motion/CountUp'

interface Metric {
  end: number
  prefix?: string
  suffix?: string
  label: string
  context: string
  separator?: boolean
  noCount?: boolean
  displayValue?: string
}

const metrics: Metric[] = [
  { end: 403, suffix: '/sec', label: 'Event ingestion', context: 'sustained throughput', separator: false },
  { end: 18, suffix: 'ms', label: 'Context synthesis', context: 'p50 latency', separator: false },
  { end: 60, suffix: '%+', label: 'Compression ratio', context: 'vs. raw retrieval', separator: false },
  { end: 0, label: 'Internal LLM calls', context: 'fully deterministic', noCount: true, displayValue: '0' },
]

const capabilities = [
  { label: 'Deterministic compilation', detail: 'Same inputs → same artifacts. Always.' },
  { label: 'Predictive context cache', detail: 'Pre-warms artifacts before queries arrive.' },
  { label: 'Token-budget optimization', detail: 'Specify your limit, get optimal context.' },
  { label: 'Full provenance tracking', detail: 'Every fact traceable to source evidence.' },
  { label: 'GDPR-ready deletion', detail: 'Hard deletion with tombstones and audit trail.' },
  { label: 'Idempotent processing', detail: 'Safe retries — no duplicate side effects.' },
]

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative bg-bg-base grid-pattern"
      aria-labelledby="performance-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-text-tertiary tracking-[0.12em] uppercase">
            PERFORMANCE
          </span>
          <h2
            id="performance-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Numbers, Not Promises
          </h2>
        </ScrollReveal>

        {/* Metrics — 4-column grid */}
        <StaggerReveal
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          stagger={150}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center px-2 lg:px-4 lg:border-r lg:border-border-subtle lg:last:border-r-0"
            >
              <div className="text-[36px] md:text-[44px] lg:text-[52px] font-mono font-medium text-text-primary leading-none">
                {metric.noCount ? (
                  <span style={{ fontFeatureSettings: '"tnum"' }}>
                    {metric.displayValue}
                  </span>
                ) : (
                  <CountUp
                    end={metric.end}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={1500}
                    separator={metric.separator}
                  />
                )}
              </div>
              <div className="mt-3 text-sm font-medium text-text-tertiary">
                {metric.label}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                {metric.context}
              </div>
            </div>
          ))}
        </StaggerReveal>

        {/* Capabilities grid */}
        <ScrollReveal delay={300}>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="flex items-start gap-3 bg-bg-surface/40 border border-border-subtle rounded-lg px-4 py-3"
              >
                <svg
                  className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-text-primary">{cap.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{cap.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
