import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Hippocortex',
  description: 'Privacy Policy for the Hippocortex platform. GDPR and UK GDPR compliant. Operated by OPENGATE TECHNOLOGY LTD.',
}

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-muted">Last updated: 14 March 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Introduction</h2>
        <p className="text-text-secondary leading-relaxed">
          OPENGATE TECHNOLOGY LTD. (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy
          and the privacy of data processed through the Hippocortex platform. This Privacy Policy explains
          how we collect, use, store, share, and protect personal data when you use our platform, APIs, SDKs,
          and related services (the &quot;Services&quot;).
        </p>
        <p className="text-text-secondary leading-relaxed">
          We comply with the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection
          Regulation (EU GDPR), the Data Protection Act 2018, and other applicable data protection laws.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Data Controller</h2>
        <p className="text-text-secondary leading-relaxed">
          The data controller for personal data processed through the Hippocortex platform is:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p className="font-medium text-text-primary">OPENGATE TECHNOLOGY LTD.</p>
          <p>15 Jamieson House, 4 Edgar Road</p>
          <p>Whitton, Hounslow, England, TW4 5QQ</p>
          <p>Company Number: 16645990</p>
          <p>
            Data Protection Contact:{' '}
            <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              privacy@hippocortex.dev
            </a>
          </p>
        </div>
        <p className="text-text-secondary leading-relaxed">
          When you use the Services to process personal data on behalf of your end users or through your
          AI agents, you act as the data controller and we act as a data processor. The terms of our data
          processing relationship are governed by our{' '}
          <a href="/legal/dpa" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Data Processing Agreement
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Information We Collect</h2>

        <h3 className="text-lg font-medium text-text-primary">3.1 Account Information</h3>
        <p className="text-text-secondary leading-relaxed">
          When you register for an account, we collect your email address, display name, and hashed password.
          If you subscribe to a paid plan, we collect billing information through our payment processor
          (Stripe), including payment method details, billing address, and transaction history. We do not
          store raw credit card numbers on our systems.
        </p>

        <h3 className="text-lg font-medium text-text-primary">3.2 Customer Data (Agent Events)</h3>
        <p className="text-text-secondary leading-relaxed">
          When you use the capture API, you submit agent interaction events that may contain personal data
          depending on your use case. These events include:
        </p>
        <ul className="space-y-1 text-text-secondary leading-relaxed text-sm">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Message events (user and assistant conversation content)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Tool call events (tool names and input parameters)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Tool result events (tool execution output)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            File edit, test run, command execution, browser action, and API result events
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          This data is processed through our capture pipeline (queued via Redis, persisted to PostgreSQL),
          optionally compiled into knowledge artifacts through the learn endpoint, and made available for
          retrieval through the synthesize endpoint. You control what data is submitted and are responsible
          for ensuring compliance with applicable data protection laws for any personal data included.
        </p>

        <h3 className="text-lg font-medium text-text-primary">3.3 Usage and Telemetry Data</h3>
        <p className="text-text-secondary leading-relaxed">
          We automatically collect data about how you interact with the Services, including: API call
          volumes and endpoint usage, event counts by type, compilation frequency, synthesis request
          patterns, error rates, and response times. This data is aggregated and used to improve service
          quality, capacity planning, and abuse detection.
        </p>

        <h3 className="text-lg font-medium text-text-primary">3.4 Technical Data</h3>
        <p className="text-text-secondary leading-relaxed">
          When you access the Services (including the website and dashboard), we collect: IP addresses,
          browser type and version, device information, operating system, referring URLs, and access
          timestamps. This data is collected through standard web server logs.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. How We Process Agent Event Data</h2>
        <p className="text-text-secondary leading-relaxed">
          Agent event data submitted through the capture API follows this processing flow:
        </p>
        <ol className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">1.</span>
            <span><strong className="text-text-primary">Ingestion:</strong> Events are received by the API, validated, and queued to Redis (BullMQ) for asynchronous processing.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">2.</span>
            <span><strong className="text-text-primary">Persistence:</strong> Background workers persist events to PostgreSQL with tenant-scoped isolation. Events are stored with their type, session ID, payload, and metadata.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">3.</span>
            <span><strong className="text-text-primary">Compilation:</strong> When you trigger the learn endpoint, a compilation worker analyses accumulated events and extracts patterns. Patterns are compiled into knowledge artifacts (task schemas, failure playbooks, causal patterns, decision policies).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">4.</span>
            <span><strong className="text-text-primary">Synthesis:</strong> The synthesize endpoint searches across memories and artifacts using semantic search (pgvector), assembles relevant context entries, and returns them within a token budget.</span>
          </li>
        </ol>
        <p className="text-text-secondary leading-relaxed">
          All processing occurs within your tenant&apos;s isolated scope. Cross-tenant data access is architecturally
          impossible due to tenant ID filtering at the database query level.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Legal Basis for Processing (GDPR)</h2>
        <p className="text-text-secondary leading-relaxed">We process personal data under the following legal bases:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Performance of contract (Article 6(1)(b)):</strong> Processing account information and
            Customer Data is necessary to provide the Services you have contracted for.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Legitimate interests (Article 6(1)(f)):</strong> Processing usage data for service
            improvement, security monitoring, and abuse prevention. Our legitimate interests do not override
            your fundamental rights and freedoms.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Consent (Article 6(1)(a)):</strong> Where we use non-essential cookies or process data
            for marketing purposes, we obtain your explicit consent. You may withdraw consent at any time.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Legal obligation (Article 6(1)(c)):</strong> Processing required to comply with tax,
            accounting, or regulatory obligations.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Data Retention</h2>
        <p className="text-text-secondary leading-relaxed">
          We retain data for the following periods:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Customer Data (events, memories, artifacts):</span>
            <span className="text-sm text-text-secondary ml-2">Retained for the duration of your subscription plus 30 days after termination.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Account information:</span>
            <span className="text-sm text-text-secondary ml-2">Retained for as long as your account is active. After account deletion, retained for up to 90 days for backup propagation.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Usage and telemetry data:</span>
            <span className="text-sm text-text-secondary ml-2">Retained in aggregated form for up to 24 months.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Technical logs:</span>
            <span className="text-sm text-text-secondary ml-2">Retained for up to 90 days for security and debugging purposes.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Billing records:</span>
            <span className="text-sm text-text-secondary ml-2">Retained for 7 years as required by tax and accounting regulations.</span>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Upon deletion, data is permanently removed from all active systems within 30 days and from
          all backup systems within 90 days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Sub-processors</h2>
        <p className="text-text-secondary leading-relaxed">
          We use the following third-party service providers (sub-processors) to deliver the Services.
          Each sub-processor is bound by data processing agreements that provide protection consistent
          with this Privacy Policy.
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Vercel Inc.</span>
            <span className="text-sm text-text-secondary ml-2">Website and dashboard hosting. Data location: Global CDN with EU region preference.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Neon Inc.</span>
            <span className="text-sm text-text-secondary ml-2">PostgreSQL database hosting for events, memories, artifacts, and account data.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Upstash Inc.</span>
            <span className="text-sm text-text-secondary ml-2">Redis hosting for job queues, rate limiting, and ephemeral caching.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Stripe Inc.</span>
            <span className="text-sm text-text-secondary ml-2">Payment processing and subscription management. Stripe is PCI DSS Level 1 certified.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Clerk Inc.</span>
            <span className="text-sm text-text-secondary ml-2">Authentication services for the website and dashboard.</span>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          We will notify you of changes to our sub-processor list at least 30 days before engaging a new
          sub-processor. You may object to a new sub-processor within 14 days of notification.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. International Transfers</h2>
        <p className="text-text-secondary leading-relaxed">
          OPENGATE TECHNOLOGY LTD. is based in England. Some of our sub-processors operate in the United
          States. Where personal data is transferred outside the United Kingdom or the European Economic
          Area, we ensure appropriate safeguards are in place, including:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            UK and EU adequacy decisions for the recipient country
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Standard Contractual Clauses (SCCs) as approved by the European Commission and the UK
            Information Commissioner&apos;s Office (ICO)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The EU-US Data Privacy Framework and UK Extension, where applicable
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          You may request a copy of the relevant transfer safeguards by contacting{' '}
          <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            privacy@hippocortex.dev
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Your Rights</h2>
        <p className="text-text-secondary leading-relaxed">
          Under the UK GDPR and EU GDPR, you have the following rights regarding your personal data:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right of access:</strong> Request a copy of the personal data we hold about you.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to rectification:</strong> Request correction of inaccurate or incomplete personal data.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;),
            subject to legal retention requirements.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to restriction:</strong> Request that we restrict processing of your personal data
            in certain circumstances.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to data portability:</strong> Request your personal data in a structured,
            commonly used, machine-readable format.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to object:</strong> Object to processing based on legitimate interests or for
            direct marketing purposes.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Right to withdraw consent:</strong> Where processing is based on consent, you may
            withdraw it at any time without affecting the lawfulness of prior processing.
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          To exercise these rights, contact{' '}
          <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            privacy@hippocortex.dev
          </a>.
          We will respond to your request within 30 days. We may need to verify your identity before
          processing your request. Complex or numerous requests may take up to 60 days, in which case
          we will notify you of the extension and the reasons.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Cookies</h2>
        <p className="text-text-secondary leading-relaxed">
          We use the following types of cookies:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Essential cookies:</strong> Required for authentication, session management, and security.
            These cannot be disabled as they are necessary for the Services to function.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Analytics cookies:</strong> Used to understand how visitors interact with the website.
            Only deployed with your explicit consent. We do not use analytics cookies on the API.
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          You can manage cookie preferences through your browser settings. Disabling essential cookies
          may affect the functionality of the dashboard.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Security</h2>
        <p className="text-text-secondary leading-relaxed">
          We implement appropriate technical and organisational measures to protect personal data, including:
        </p>
        <ul className="space-y-1 text-text-secondary leading-relaxed text-sm">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Encryption in transit (TLS 1.3) and at rest (AES-256)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Multi-tenant isolation at the database, cache, and application layers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            API key hashing (SHA-256) with scoped permissions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Password hashing with Argon2id
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Rate limiting per API key and per tenant
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Regular security assessments and monitoring
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          For full details, see our{' '}
          <a href="/legal/security" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Security Policy
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Children&apos;s Privacy</h2>
        <p className="text-text-secondary leading-relaxed">
          The Services are not directed to individuals under the age of 16. We do not knowingly collect
          personal data from children under 16. If you become aware that a child has provided us with
          personal data, please contact us at{' '}
          <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            privacy@hippocortex.dev
          </a>{' '}
          and we will take steps to delete such data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">13. Data Sharing</h2>
        <p className="text-text-secondary leading-relaxed">
          We do not sell personal data. We do not share personal data for advertising purposes.
          We may share personal data only in the following circumstances:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            With sub-processors as listed in Section 7, under appropriate data processing agreements
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            When required by valid legal process (court order, subpoena, or regulatory request)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            In connection with a merger, acquisition, or sale of assets, with prior notice to affected users
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            To protect the rights, property, or safety of our users, the public, or ourselves
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">14. Changes to This Policy</h2>
        <p className="text-text-secondary leading-relaxed">
          We may update this Privacy Policy periodically to reflect changes in our practices, technology,
          legal requirements, or other factors. Material changes will be communicated at least 30 days
          before they take effect via email to the address associated with your account or through a
          notice in the dashboard.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We encourage you to review this Privacy Policy periodically. The &quot;Last updated&quot; date at the
          top of this page indicates the most recent revision.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">15. Complaints and Supervisory Authority</h2>
        <p className="text-text-secondary leading-relaxed">
          If you are not satisfied with our response to a privacy concern, you have the right to lodge
          a complaint with a supervisory authority. For the United Kingdom, the relevant authority is:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p className="font-medium text-text-primary">Information Commissioner&apos;s Office (ICO)</p>
          <p>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
          <p>
            Website:{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              ico.org.uk
            </a>
          </p>
          <p>Helpline: 0303 123 1113</p>
        </div>
        <p className="text-text-secondary leading-relaxed">
          If you are located in the European Union, you may also contact your local data protection
          authority.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">16. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For privacy-related inquiries:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p className="font-medium text-text-primary">OPENGATE TECHNOLOGY LTD.</p>
          <p>15 Jamieson House, 4 Edgar Road, Whitton, Hounslow, England, TW4 5QQ</p>
          <p>
            Privacy inquiries:{' '}
            <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              privacy@hippocortex.dev
            </a>
          </p>
          <p>
            Data Protection Contact:{' '}
            <a href="mailto:dpo@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              dpo@hippocortex.dev
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
