'use client'

import { Card } from '@/components/ui/Card'

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-accent-cyan">
        <circle cx="12" cy="12" r="9" strokeDasharray="4 3" />
        <path d="M12 8v4" />
      </svg>
    ),
    title: 'Zero Continuity',
    description: 'Your agent deployed a service yesterday. Today it has no idea how. Same questions, same failures, same wasted tokens — every session starts from absolute zero.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-accent-cyan">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4-4" />
        <path d="M8 8l6 6M14 8l-6 6" />
      </svg>
    ),
    title: 'RAG Isn\'t Memory',
    description: 'Vector search finds similar text. It doesn\'t learn patterns, detect contradictions, or understand cause and effect. Retrieval isn\'t remembering.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-accent-cyan">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 14h16" />
        <path d="M8 14v6M12 14v6M16 14v6" />
        <path d="M12 4v4" />
      </svg>
    ),
    title: 'Token Budgets Burned',
    description: 'Without compression, agents dump entire retrieval sets into context windows. 60% of what they retrieve is noise. You\'re paying for tokens that add nothing.',
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
        <h2
          id="problem-heading"
          className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary text-center"
        >
          Your Agents Have Amnesia
        </h2>

        <div className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8">
          {problems.map((problem) => (
            <Card key={problem.title} variant="outlined" className="md:last:col-span-2 lg:last:col-span-1">
              <div className="mb-4">{problem.icon}</div>
              <h3 className="text-[22px] font-semibold text-text-primary">{problem.title}</h3>
              <p className="mt-4 text-[17px] text-text-secondary leading-relaxed max-md:text-base">{problem.description}</p>
            </Card>
          ))}
        </div>

        {/* Terminal pull-quote */}
        <div className="mt-12 md:mt-10 lg:mt-12">
          <div className="border-l-4 border-accent-cyan bg-bg-surface/50 rounded-r-lg p-6 md:p-8">
            <code className="block font-mono text-lg md:text-[22px] text-text-secondary leading-relaxed">
              <span className="text-text-muted">&gt; </span>
              <span>agent.recall(&quot;deploy to staging&quot;)</span>
              <br />
              <span className="text-text-muted">  → </span>
              <span>Error: no memory found. Starting from scratch.</span>
              <span className="inline-block w-2.5 h-5 bg-text-secondary ml-1 animate-[cursor-blink_1.06s_infinite]" />
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
