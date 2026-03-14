'use client'

import { Card } from '@/components/ui/Card'
import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16M4 14h16M9 4v16" />
      </svg>
    ),
    title: 'Massive Token Waste',
    description:
      'Agents dump entire conversation histories into context windows. 200k tokens of raw chat for a task that needs 2kb of reasoning. You\'re burning 99% of your token budget on noise.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: 'Catastrophic Forgetting',
    description:
      'Your agent solved this exact problem yesterday. Today it starts from scratch — no memory of what worked, what failed, or why decisions were made. Every session is day one.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Reasoning Instability',
    description:
      'Without structured memory, agents produce different outputs for the same inputs. No determinism, no provenance, no way to trace why a decision was made.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path d="M10 10l4 4" />
      </svg>
    ),
    title: 'Slow Context Assembly',
    description:
      'RAG retrieves similar text, not relevant knowledge. Vector similarity ≠ reasoning utility. Your agents spend more time searching than thinking.',
  },
]

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative bg-bg-base grid-pattern"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-rose tracking-[0.12em] uppercase">
            THE PROBLEM
          </span>
          <h2
            id="problem-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Why Your Agents Need Memory Infrastructure
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6"
          stagger={120}
        >
          {problems.map((problem) => (
            <Card key={problem.title} variant="glass">
              <div className="text-accent-cyan mb-4">{problem.icon}</div>
              <h3 className="text-[20px] font-semibold text-text-primary">
                {problem.title}
              </h3>
              <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </StaggerReveal>

        {/* Token comparison visual */}
        <ScrollReveal delay={200} className="mt-12">
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before: Raw history */}
              <div className="bg-bg-surface border border-accent-rose/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-rose/40 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-rose" />
                  <span className="text-xs font-mono text-accent-rose tracking-wider uppercase">Without Hippocortex</span>
                </div>
                <div className="font-mono text-[28px] md:text-[36px] font-bold text-text-primary">200k</div>
                <div className="text-sm text-text-muted mt-1">tokens of raw chat history</div>
                <div className="mt-4 space-y-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-accent-rose/10" style={{ width: `${95 - i * 5}%` }} />
                  ))}
                </div>
                <div className="mt-3 text-xs text-text-ghost">~99% noise, redundancy, and irrelevant context</div>
              </div>

              {/* After: Reasoning pack */}
              <div className="bg-bg-surface border border-accent-cyan/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                  <span className="text-xs font-mono text-accent-cyan tracking-wider uppercase">With Hippocortex</span>
                </div>
                <div className="font-mono text-[28px] md:text-[36px] font-bold text-accent-cyan">~2kb</div>
                <div className="text-sm text-text-muted mt-1">compressed reasoning pack</div>
                <div className="mt-4 space-y-1">
                  <div className="h-1.5 rounded-full bg-accent-cyan/30" style={{ width: '20%' }} />
                  <div className="h-1.5 rounded-full bg-accent-cyan/20" style={{ width: '15%' }} />
                </div>
                <div className="mt-3 text-xs text-text-tertiary">Procedures, facts, and provenance — nothing else</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Terminal pull-quote */}
        <ScrollReveal delay={300} className="mt-10">
          <div className="max-w-[700px] mx-auto bg-bg-surface border border-border-subtle rounded-xl p-6 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="text-text-muted text-sm">
              <span className="text-accent-cyan">{'>'} </span>
              <span className="text-text-secondary">
                agent.getContext(&quot;deploy to staging&quot;)
              </span>
            </div>
            <div className="text-text-muted text-sm mt-2">
              <span className="text-accent-rose">→ </span>
              <span className="text-text-tertiary">
                Returning 197,432 tokens of raw history... $0.59/query
              </span>
            </div>
            <div className="text-text-muted text-sm mt-3">
              <span className="text-accent-cyan">{'>'} </span>
              <span className="text-text-secondary">
                memory.synthesize(&quot;deploy to staging&quot;, {'{ budget: 4000 }'})
              </span>
            </div>
            <div className="text-text-muted text-sm mt-2">
              <span className="text-accent-cyan">→ </span>
              <span className="text-text-tertiary">
                Returning 1,847 tokens: 3 procedures, 2 failure warnings, 1 preference. $0.006/query
              </span>
            </div>
            <div className="inline-block w-2 h-4 bg-accent-cyan/60 mt-2 animate-[cursor-blink_1.06s_step-end_infinite]" />
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
