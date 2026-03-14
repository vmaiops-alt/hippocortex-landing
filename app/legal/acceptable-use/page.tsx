import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy - Hippocortex',
  description: 'Acceptable Use Policy for the Hippocortex platform.',
}

export default function AcceptableUsePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Acceptable Use Policy</h1>
        <p className="text-sm text-text-muted">Last updated: March 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Purpose</h2>
        <p className="text-text-secondary leading-relaxed">
          This Acceptable Use Policy (&quot;AUP&quot;) defines the permitted and prohibited uses of the Hippocortex
          platform and services. This policy supplements our Terms of Service and applies to all users,
          including free and paid tiers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Permitted Use</h2>
        <p className="text-text-secondary leading-relaxed">
          The Services are designed for storing and processing agent memory data for legitimate AI agent
          applications. Permitted uses include:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Capturing agent interaction events for memory and learning purposes
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Compiling knowledge artifacts from agent experience data
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Synthesizing context for AI agent reasoning
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Integrating with AI agent frameworks for production applications
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Development, testing, and prototyping of agent memory systems
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Prohibited Use</h2>
        <p className="text-text-secondary leading-relaxed">You shall not use the Services to:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Store or process data that violates applicable laws or regulations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Store personally identifiable information (PII) without appropriate legal basis and safeguards
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Attempt to access other users&apos; data or circumvent tenant isolation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Conduct automated scanning, scraping, or penetration testing without written authorization
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Use the Services to develop competing products by reverse engineering our systems
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Intentionally circumvent rate limits, quotas, or usage restrictions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Distribute malware, conduct DDoS attacks, or engage in any form of network abuse
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">•</span>
            Store content that promotes violence, harassment, discrimination, or illegal activities
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Resource Limits</h2>
        <p className="text-text-secondary leading-relaxed">
          Each plan tier has defined resource limits. Users must not attempt to circumvent these limits
          through multiple accounts, API key cycling, or other means. If your use case requires limits
          beyond your current plan, contact us to discuss Enterprise options.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Enforcement</h2>
        <p className="text-text-secondary leading-relaxed">
          Violations of this AUP may result in: (a) warning and request for corrective action,
          (b) temporary suspension of access, (c) permanent termination of account, or
          (d) legal action where appropriate. We will attempt to notify users before taking action
          unless immediate action is required to protect the platform or other users.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Reporting Violations</h2>
        <p className="text-text-secondary leading-relaxed">
          To report AUP violations, contact{' '}
          <a href="mailto:abuse@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            abuse@hippocortex.dev
          </a>.
        </p>
      </section>
    </div>
  )
}
