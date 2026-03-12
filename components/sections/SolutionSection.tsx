'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const solutions = [
  {
    fn: 'capture()',
    tagline: 'Record Everything',
    description:
      'Messages, tool calls, file edits, commands — every interaction becomes a time-ordered episodic trace with full metadata. Automatic salience scoring filters noise. Dedup prevents redundancy. Zero configuration.',
    color: '#00E5CC',
    glowGradient:
      'linear-gradient(90deg, rgba(0,229,204,0.4) 0%, transparent 100%)',
  },
  {
    fn: 'learn()',
    tagline: 'Extract Knowledge',
    description:
      'The Memory Compiler mines episodes for patterns and promotes them across layers — task schemas from repeated procedures, failure playbooks from errors, causal chains from outcomes, decision policies from preferences. Every artifact backed by source evidence.',
    color: '#8B5CF6',
    glowGradient:
      'linear-gradient(90deg, rgba(139,92,246,0.4) 0%, transparent 100%)',
  },
  {
    fn: 'synthesize()',
    tagline: 'Assemble Context',
    description:
      'Query all six memory layers simultaneously. Get compressed, provenance-tagged context optimized for your token budget. 60%+ compression over raw retrieval. Deterministic — same inputs, same outputs, every time.',
    color: '#E8E8F0',
    glowGradient:
      'linear-gradient(90deg, rgba(232,232,240,0.3) 0%, transparent 100%)',
  },
]

export function SolutionSection() {
  return (
    <section
      id="solution"
      className="relative bg-bg-base"
      aria-labelledby="solution-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal>
          <h2
            id="solution-heading"
            className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary text-center"
          >
            Three Functions. Complete Memory.
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8 items-start"
          stagger={120}
          scale={0.95}
        >
          {solutions.map((solution, i) => (
            <div key={solution.fn} className="relative">
              <Card variant="glass" className="relative overflow-hidden">
                {/* Top edge glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: solution.glowGradient }}
                />

                <code
                  className="block text-2xl md:text-[28px] font-mono font-medium animate-[glow-pulse_4s_ease-in-out_infinite]"
                  style={{ color: solution.color }}
                >
                  {solution.fn}
                </code>

                <h3 className="mt-4 text-[22px] font-semibold text-text-primary">
                  {solution.tagline}
                </h3>

                <p className="mt-4 text-[17px] max-md:text-base text-text-secondary leading-relaxed">
                  {solution.description}
                </p>
              </Card>

              {/* Flow arrow (between cards, desktop only) */}
              {i < solutions.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <line
                      x1="0"
                      y1="8"
                      x2="28"
                      y2="8"
                      stroke="#00E5CC"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      strokeOpacity="0.4"
                    />
                    <circle cx="28" cy="8" r="3" fill="#00E5CC" fillOpacity="0.6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </StaggerReveal>

        {/* Vertical flow arrows for mobile */}
        <div className="lg:hidden flex flex-col items-center -mt-2 mb-2">
          {/* Already part of the card stack layout */}
        </div>

        <ScrollReveal delay={300} className="mt-10 text-center">
          <Button href="https://docs.hippocortex.dev/api" variant="text" external>
            See the full API →
          </Button>
        </ScrollReveal>
      </div>

      {/* Neural line divider */}
      <div className="neural-line" />
    </section>
  )
}
