import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy - Hippocortex',
  description: 'Acceptable Use Policy for the Hippocortex platform, operated by OPENGATE TECHNOLOGY LTD.',
}

export default function AcceptableUsePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Acceptable Use Policy</h1>
        <p className="text-sm text-text-muted">Last updated: 14 March 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Purpose</h2>
        <p className="text-text-secondary leading-relaxed">
          This Acceptable Use Policy (&quot;AUP&quot;) defines the permitted and prohibited uses of the Hippocortex
          platform and services operated by OPENGATE TECHNOLOGY LTD. This policy supplements the{' '}
          <a href="/legal/terms" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Terms of Service
          </a>{' '}
          and applies to all users of the Services, including free and paid tiers.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We have established this AUP to ensure the security, reliability, and availability of the
          Services for all customers. Violations of this policy may result in suspension or termination
          of your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Permitted Use</h2>
        <p className="text-text-secondary leading-relaxed">
          The Services are designed for storing and processing agent memory data in legitimate AI agent
          applications. Permitted uses include:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Capturing agent interaction events (messages, tool calls, tool results, file edits, test runs,
            command executions, browser actions, and API results) for memory and learning purposes
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Compiling knowledge artifacts (task schemas, failure playbooks, causal patterns, decision policies)
            from agent experience data
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Synthesizing context for AI agent reasoning within configured token budgets
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Integrating with AI agent frameworks (OpenClaw, LangGraph, CrewAI, AutoGen, and others)
            for production applications
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Development, testing, and prototyping of agent memory systems using test API
            keys (<code className="text-accent-amber text-sm">hx_test_*</code>)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Using the SDK libraries, adapters, and documentation for building agent applications
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Prohibited Content</h2>
        <p className="text-text-secondary leading-relaxed">
          You shall not use the Services to store, process, or transmit data that:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Violates applicable laws, regulations, or third-party rights in any jurisdiction
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Contains child sexual abuse material (CSAM) or any content exploiting minors
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Promotes terrorism, extremist violence, or incitement to hatred
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Contains content that promotes harassment, bullying, discrimination, or threats against individuals or groups
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Includes malware, viruses, ransomware, or other malicious code
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Contains stolen credentials, financial data, or other data obtained through unauthorised access
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Includes personally identifiable information (PII) without an appropriate legal basis under GDPR
            and without adequate safeguards
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Contains regulated health data (PHI/HIPAA), payment card data (PCI DSS), or classified
            government information without a specific Enterprise agreement addressing such data types
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Prohibited Activities</h2>
        <p className="text-text-secondary leading-relaxed">You shall not:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Attempt to access other tenants&apos; data or circumvent tenant isolation through any means
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Conduct automated scanning, scraping, or penetration testing of the Services without written
            authorisation from OPENGATE TECHNOLOGY LTD.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Use the Services to develop a competing product by reverse engineering our systems, algorithms,
            or data structures
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Distribute, disclose, or share API keys with unauthorised parties
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Conduct denial-of-service attacks, packet flooding, or any form of network abuse against
            the Services or our infrastructure providers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Forge or manipulate API request headers, authentication tokens, or tenant identifiers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Use the Services for cryptocurrency mining, botnets, or as proxy/relay infrastructure
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Rate Limit and Quota Compliance</h2>
        <p className="text-text-secondary leading-relaxed">
          Each subscription tier has defined rate limits and usage quotas. You shall not attempt to
          circumvent these limits through any means, including:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Creating multiple accounts to aggregate quotas
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Cycling API keys to reset per-key rate limit counters
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Using distributed systems to circumvent per-IP or per-key throttling
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Ignoring HTTP 429 responses and continuing to send requests without respecting
            the <code className="text-accent-cyan text-sm">Retry-After</code> header
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          If your use case requires limits beyond your current plan, contact us at{' '}
          <a href="mailto:sales@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            sales@hippocortex.dev
          </a>{' '}
          to discuss Enterprise options with custom quotas.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Multi-Tenant Obligations</h2>
        <p className="text-text-secondary leading-relaxed">
          As a user of a multi-tenant platform, you have an obligation to use the Services in a manner
          that does not negatively impact other tenants. This includes:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Respecting rate limits and quota boundaries to ensure fair resource allocation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Avoiding burst patterns that could degrade shared infrastructure performance
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Reporting suspected security vulnerabilities rather than exploiting them
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Not attempting to access, inspect, or interfere with other tenants&apos; data or resources
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Enforcement</h2>
        <p className="text-text-secondary leading-relaxed">
          Violations of this AUP may result in one or more of the following actions, at our sole discretion:
        </p>
        <ol className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">1.</span>
            <span><strong className="text-text-primary">Warning:</strong> Written notice describing the violation and requesting corrective action within a specified timeframe.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">2.</span>
            <span><strong className="text-text-primary">Rate reduction:</strong> Temporary reduction of your API rate limits or quotas.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">3.</span>
            <span><strong className="text-text-primary">Temporary suspension:</strong> Suspension of API key(s) or account access pending investigation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">4.</span>
            <span><strong className="text-text-primary">Permanent termination:</strong> Permanent closure of your account and deletion of all data.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">5.</span>
            <span><strong className="text-text-primary">Legal action:</strong> Referral to law enforcement or initiation of legal proceedings where appropriate.</span>
          </li>
        </ol>
        <p className="text-text-secondary leading-relaxed">
          We will attempt to notify you before taking enforcement action, unless immediate action is
          required to protect the platform, other customers, or comply with legal requirements.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Reporting Violations</h2>
        <p className="text-text-secondary leading-relaxed">
          If you become aware of a violation of this AUP by another user, or if you have questions about
          whether a specific use case is permitted, please contact us:
        </p>
        <p className="text-text-secondary leading-relaxed">
          <a href="mailto:abuse@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            abuse@hippocortex.dev
          </a>
        </p>
        <p className="text-text-secondary leading-relaxed">
          We investigate all reports promptly and will take appropriate action as described in Section 7.
          Reports are treated confidentially.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Changes to This Policy</h2>
        <p className="text-text-secondary leading-relaxed">
          We may update this AUP from time to time. Material changes will be communicated at least 30 days
          before they take effect. Continued use of the Services after changes take effect constitutes
          acceptance of the updated policy.
        </p>
      </section>
    </div>
  )
}
