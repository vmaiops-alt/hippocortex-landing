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
  { end: 4587, label: 'tests passing', context: '0 failures', separator: true },
  { end: 60, suffix: '%+', label: 'context compression', context: 'vs. raw retrieval' },
  { end: 0, label: 'internal LLM calls', context: 'fully deterministic', noCount: true, displayValue: '0' },
  { end: 100, prefix: '< ', suffix: 'ms', label: 'capture latency', context: 'p99', separator: false },
]

const badges = [
  '100 tasks across 10 phases',
  'APIs frozen - no breaking changes',
  'GDPR-ready - hard deletion with tombstones',
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
        {/* Header */}
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-text-tertiary tracking-[0.12em] uppercase">
            THE NUMBERS
          </span>
          <h2
            id="performance-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Tested. Measured. Shipped.
          </h2>
        </ScrollReveal>

        {/* Metrics - 4-column responsive grid */}
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
                  <span
                    style={{ fontFeatureSettings: '"tnum"' }}
                    data-value={metric.displayValue}
                  >
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

        {/* Badges */}
        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {badges.map((badge, i) => (
              <span
                key={badge}
                className="px-3 py-1.5 text-xs font-medium text-text-tertiary bg-bg-overlay border border-border-medium rounded-full"
                style={{
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Credibility copy */}
        <ScrollReveal delay={200}>
          <p className="mt-8 text-sm text-text-tertiary text-center max-w-[680px] mx-auto">
            Built across 100 engineering tasks over 10 development phases. Every layer
            independently tested. Every API frozen before release. This isn&apos;t a prototype
            with a landing page - it&apos;s infrastructure that shipped.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
