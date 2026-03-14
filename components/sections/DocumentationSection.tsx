'use client'

import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const docs = [
  {
    title: 'Quickstart',
    description: 'Get running in 5 minutes. Install the SDK, capture your first event, synthesize context.',
    href: 'https://docs.hippocortex.dev/quickstart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'SDK Documentation',
    description: 'Full TypeScript and Python SDK reference. Every method, parameter, and return type documented.',
    href: 'https://docs.hippocortex.dev/sdk',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    title: 'API Reference',
    description: 'REST API documentation with request/response schemas, error codes, and rate limit details.',
    href: 'https://docs.hippocortex.dev/api',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    description: 'Open-source SDK clients, example integrations, and community contributions.',
    href: 'https://github.com/hippocortex/hippocortex-os',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    title: 'Architecture Guide',
    description: 'Deep dive into the six-layer memory system, compilation pipeline, and infrastructure design.',
    href: 'https://docs.hippocortex.dev/architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

export function DocumentationSection() {
  return (
    <section
      id="docs"
      className="relative bg-bg-base"
      aria-labelledby="docs-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            DOCUMENTATION
          </span>
          <h2
            id="docs-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Everything You Need to Ship
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Comprehensive docs, SDK references, and working examples.
            From first install to production in hours.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[900px] mx-auto"
          stagger={100}
        >
          {docs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-accent-cyan/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-accent-cyan mb-4 group-hover:text-accent-cyan-bright transition-colors">{doc.icon}</div>
              <h3 className="text-[17px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                {doc.title}
                <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </h3>
              <p className="mt-2 text-sm text-text-tertiary leading-relaxed">{doc.description}</p>
            </a>
          ))}
        </StaggerReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
