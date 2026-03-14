'use client'

import { ScrollReveal, StaggerReveal } from '@/components/motion/ScrollReveal'

const securityFeatures = [
  {
    title: 'Tenant Isolation',
    description: 'Complete data isolation between tenants. Every query is scoped. No cross-tenant data leakage by design.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: 'API Key Authentication',
    description: 'Scoped API keys with fine-grained permissions. Key rotation without downtime. Full audit trail on every request.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
  },
  {
    title: 'Rate Limiting',
    description: 'Per-key and per-tenant rate limits. Configurable burst and sustained thresholds. Graceful degradation under load.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Idempotent Workers',
    description: 'Every processing step is idempotent. Safe retries, no duplicate side effects. Deterministic output regardless of failures.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Request Hardening',
    description: 'Input validation, payload size limits, schema enforcement, and request signing. Defense in depth at every layer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Data Encryption',
    description: 'TLS 1.3 in transit. AES-256 at rest. Encryption keys managed per-tenant with regular rotation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

export function SecuritySection() {
  return (
    <section
      id="security"
      className="relative bg-bg-void"
      aria-labelledby="security-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            SECURITY
          </span>
          <h2
            id="security-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Enterprise-Grade Security
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Agent memory contains sensitive operational data. Every layer of
            Hippocortex is built with security as a first-class constraint.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={100}
        >
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300"
            >
              <div className="text-accent-cyan mb-4">{feature.icon}</div>
              <h3 className="text-[17px] font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-tertiary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
