'use client'

import { Card } from '@/components/ui/Card'
import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: 'Zero Continuity',
    description:
      'Your agent deployed a service yesterday. Today it starts from scratch — no memory of what worked, what failed, or why you made the choices you did. Every session is day one.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path d="M10 10l4 4" />
      </svg>
    ),
    title: "RAG Isn't Memory",
    description:
      "Vector search finds similar text. It doesn't understand temporal order, causal relationships, or which information contradicts what came before. Retrieval ≠ understanding.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Token Budgets Burned',
    description:
      "Without compression, agents dump entire conversation histories into the context window. 90% is noise. You're burning tokens on irrelevant context while missing the patterns that matter.",
  },
]

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative bg-bg-raised grid-pattern"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <h2
            id="problem-heading"
            className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Your Agents Have Amnesia
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8"
          stagger={120}
        >
          {problems.map((problem) => (
            <Card key={problem.title} variant="glass">
              <div className="text-accent-cyan mb-4">{problem.icon}</div>
              <h3 className="text-[22px] font-semibold text-text-primary">
                {problem.title}
              </h3>
              <p className="mt-4 text-[17px] max-md:text-base text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </StaggerReveal>

        {/* Terminal pull-quote */}
        <ScrollReveal delay={200} className="mt-12">
          <div className="max-w-[700px] mx-auto bg-bg-surface border border-border-subtle rounded-xl p-6 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="text-text-muted text-sm">
              <span className="text-accent-cyan">{'>'} </span>
              <span className="text-text-secondary">
                agent.recall(&quot;deploy to staging&quot;)
              </span>
            </div>
            <div className="text-text-muted text-sm mt-2">
              <span className="text-accent-rose">→ </span>
              <span className="text-text-tertiary">
                Error: no memory found. Starting from scratch.
              </span>
            </div>
            <div className="inline-block w-2 h-4 bg-accent-cyan/60 mt-2 animate-[cursor-blink_1.06s_step-end_infinite]" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
