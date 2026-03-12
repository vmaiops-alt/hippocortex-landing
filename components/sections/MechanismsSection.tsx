'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const mechanisms = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="12" r="3" />
        <path d="M11 12h2" />
        <path d="M12 6v3M12 15v3" />
      </svg>
    ),
    title: 'Memories That Self-Correct',
    description:
      'New evidence conflicts with existing knowledge? Hippocortex detects the contradiction, quarantines the conflicting entries, and resolves based on recency, frequency, and provenance strength. Your agent never operates on stale facts — it knows which version of the truth to trust.',
    accentColor: '#F43F5E',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="5" width="5" height="5" rx="1" />
        <rect x="10" y="5" width="5" height="5" rx="1" />
        <rect x="17" y="5" width="4" height="5" rx="1" />
        <path d="M5.5 10v4h13v-4" />
        <path d="M12 14v4" />
      </svg>
    ),
    title: 'Every Fact Has Receipts',
    description:
      'Every semantic fact, every graph relationship, every compiled playbook — traceable to the original episodic evidence that created it. Not just timestamps. Structural provenance across all six layers. Audit any piece of knowledge back to the interaction that produced it.',
    accentColor: '#06B6D4',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <path d="M11 8h4l-2 8h5" />
        <path d="M15 20l3-3-3-3" />
      </svg>
    ),
    title: 'Episodes Become Expertise',
    description:
      "Raw episodes alone aren't useful at scale. The Memory Compiler promotes patterns into reusable knowledge artifacts: task schemas from repeated procedures, failure playbooks from error patterns, causal chains from outcomes, decision policies from preferences. Your agent doesn't just remember — it develops expertise.",
    accentColor: '#8B5CF6',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 8h16M4 16h16" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
    title: 'Same Inputs. Same Outputs. Every Time.',
    description:
      'Zero LLM calls internally. Every operation — salience scoring, dedup, pattern mining, contradiction detection, context synthesis — runs on deterministic algorithms. Verifiable. Testable. Reproducible. No probabilistic surprises in your memory layer.',
    accentColor: '#00E5CC',
  },
]

export function MechanismsSection() {
  return (
    <section
      id="mechanisms"
      className="relative bg-bg-raised"
      aria-labelledby="mechanisms-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-text-tertiary tracking-[0.12em] uppercase">
            UNDER THE HOOD
          </span>
          <h2
            id="mechanisms-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Architectural Properties, Not Feature Checkboxes
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6"
          stagger={120}
          scale={0.95}
        >
          {mechanisms.map((mechanism) => (
            <Card
              key={mechanism.title}
              variant="accent"
              accentColor={mechanism.accentColor}
            >
              <div className="mb-4" style={{ color: mechanism.accentColor }}>
                {mechanism.icon}
              </div>
              <h3 className="text-[22px] font-semibold text-text-primary">
                {mechanism.title}
              </h3>
              <p className="mt-4 text-[17px] max-md:text-base text-text-secondary leading-relaxed">
                {mechanism.description}
              </p>
            </Card>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={200} className="mt-10 text-center">
          <Button
            href="https://docs.hippocortex.dev/architecture"
            variant="text"
            external
          >
            Read the architecture guide →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
