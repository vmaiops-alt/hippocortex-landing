import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement - Hippocortex',
  description: 'Data Processing Agreement for the Hippocortex platform.',
}

export default function DPAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Data Processing Agreement</h1>
        <p className="text-sm text-text-muted">Last updated: March 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Scope and Purpose</h2>
        <p className="text-text-secondary leading-relaxed">
          This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Service between Hippocortex
          (&quot;Processor&quot;) and the customer (&quot;Controller&quot;). It governs the processing of personal data
          by the Processor on behalf of the Controller in connection with the Hippocortex Services,
          in compliance with Article 28 of the EU General Data Protection Regulation (GDPR).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Definitions</h2>
        <p className="text-text-secondary leading-relaxed">
          &quot;Personal Data&quot;, &quot;Processing&quot;, &quot;Data Subject&quot;, &quot;Controller&quot;, &quot;Processor&quot;, and &quot;Sub-processor&quot;
          have the meanings given in the GDPR. &quot;Customer Data&quot; means all data submitted by the Controller
          to the Services, which may include Personal Data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Processing Details</h2>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Subject matter:</span>
            <span className="text-sm text-text-secondary ml-2">Provision of memory infrastructure services for AI agents</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Duration:</span>
            <span className="text-sm text-text-secondary ml-2">For the term of the Service agreement plus 30 days</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Nature and purpose:</span>
            <span className="text-sm text-text-secondary ml-2">Storage, indexing, compilation, and retrieval of agent event data</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Types of Personal Data:</span>
            <span className="text-sm text-text-secondary ml-2">As determined by the Controller&apos;s use of the Services</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Categories of Data Subjects:</span>
            <span className="text-sm text-text-secondary ml-2">As determined by the Controller&apos;s use of the Services</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Processor Obligations</h2>
        <p className="text-text-secondary leading-relaxed">The Processor shall:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Process Personal Data only on documented instructions from the Controller
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Ensure persons authorized to process Personal Data are bound by confidentiality obligations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Implement appropriate technical and organizational security measures
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Assist the Controller in responding to Data Subject requests
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Notify the Controller of Personal Data breaches without undue delay (within 72 hours)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Delete or return all Personal Data upon termination of the Services
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            Make available information necessary to demonstrate compliance with GDPR obligations
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Sub-processors</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor may engage Sub-processors to assist in providing the Services. The Processor
          maintains a list of current Sub-processors, available upon request. The Controller will be
          notified of new Sub-processors at least 30 days before engagement. The Controller may object
          to new Sub-processors within 14 days. Sub-processors are bound by data protection obligations
          no less protective than those in this DPA.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. International Transfers</h2>
        <p className="text-text-secondary leading-relaxed">
          Personal Data is primarily processed within the European Economic Area (EEA). Where transfers
          outside the EEA are necessary, we rely on: (a) European Commission adequacy decisions,
          (b) Standard Contractual Clauses (SCCs) as approved by the European Commission, or
          (c) other lawful transfer mechanisms under GDPR.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Security Measures</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor implements and maintains technical and organizational measures as described
          in our Security Policy, including: encryption in transit (TLS 1.3) and at rest (AES-256),
          tenant isolation, access controls, regular security assessments, and incident response procedures.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Audits</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor shall make available to the Controller information necessary to demonstrate
          compliance with this DPA and allow for and contribute to audits and inspections conducted
          by the Controller or an auditor mandated by the Controller. Audits are subject to reasonable
          notice (at least 30 days) and conducted during business hours no more than once per year.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Data Deletion</h2>
        <p className="text-text-secondary leading-relaxed">
          Upon termination of the Services or upon Controller request, the Processor shall delete all
          Personal Data within 30 days, unless retention is required by applicable law. Deletion is
          propagated to all storage systems, including backups, within 90 days. The Processor provides
          a deletion confirmation upon request.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For DPA-related inquiries:{' '}
          <a href="mailto:dpa@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            dpa@hippocortex.dev
          </a>
          <br />
          To request a signed copy of this DPA, email{' '}
          <a href="mailto:legal@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            legal@hippocortex.dev
          </a>.
        </p>
      </section>
    </div>
  )
}
