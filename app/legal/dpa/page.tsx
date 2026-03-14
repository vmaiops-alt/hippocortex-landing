import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement - Hippocortex',
  description: 'Data Processing Agreement for the Hippocortex platform, operated by OPENGATE TECHNOLOGY LTD. GDPR Article 28 compliant.',
}

export default function DPAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Data Processing Agreement</h1>
        <p className="text-sm text-text-muted">Last updated: 14 March 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Parties and Scope</h2>
        <p className="text-text-secondary leading-relaxed">
          This Data Processing Agreement (&quot;DPA&quot;) forms part of the{' '}
          <a href="/legal/terms" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">Terms of Service</a> between:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Data Controller (&quot;Controller&quot;):</strong> The customer who uses the Hippocortex
            Services and determines the purposes and means of processing personal data through the Services.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Data Processor (&quot;Processor&quot;):</strong> OPENGATE TECHNOLOGY LTD., a private
            limited company registered in England and Wales (company number 16645990), with its registered office
            at 15 Jamieson House, 4 Edgar Road, Whitton, Hounslow, England, TW4 5QQ.
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          This DPA governs the processing of personal data by the Processor on behalf of the Controller
          in connection with the Hippocortex Services, in compliance with Article 28 of the UK General
          Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR),
          and the Data Protection Act 2018.
        </p>
        <p className="text-text-secondary leading-relaxed">
          This DPA applies automatically to all customers who use the Services to process personal data.
          Enterprise customers may request a separately executed version of this DPA.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Definitions</h2>
        <p className="text-text-secondary leading-relaxed">
          In this DPA, the following terms have the meanings given below. Terms not defined here have
          the meanings given in the GDPR or the Terms of Service:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Personal Data&quot;</span>
            <span className="text-sm text-text-secondary ml-2">has the meaning given in Article 4(1) of the GDPR: any information relating to an identified or identifiable natural person.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Processing&quot;</span>
            <span className="text-sm text-text-secondary ml-2">has the meaning given in Article 4(2) of the GDPR: any operation performed on personal data, including collection, recording, storage, retrieval, use, disclosure, and erasure.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Data Subject&quot;</span>
            <span className="text-sm text-text-secondary ml-2">an identified or identifiable natural person whose personal data is processed.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Sub-processor&quot;</span>
            <span className="text-sm text-text-secondary ml-2">a third party engaged by the Processor to carry out specific processing activities on behalf of the Controller.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Customer Data&quot;</span>
            <span className="text-sm text-text-secondary ml-2">all data submitted by the Controller to the Services, including events, memories, artifacts, and any metadata, which may include Personal Data.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">&quot;Data Breach&quot;</span>
            <span className="text-sm text-text-secondary ml-2">a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to Personal Data.</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Processing Details</h2>
        <p className="text-text-secondary leading-relaxed">
          The details of the processing carried out under this DPA are as follows:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Subject matter:</span>
            <span className="text-sm text-text-secondary ml-2">Provision of memory infrastructure services for AI agents, including event capture, knowledge compilation, and context synthesis.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Duration:</span>
            <span className="text-sm text-text-secondary ml-2">For the term of the Service agreement plus 30 days for data export, plus up to 90 days for complete deletion from backups.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Nature and purpose:</span>
            <span className="text-sm text-text-secondary ml-2">Receiving, validating, queuing (via Redis), persisting (to PostgreSQL), indexing, compiling into knowledge artifacts, and retrieving agent event data to provide memory and context synthesis capabilities.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Types of Personal Data:</span>
            <span className="text-sm text-text-secondary ml-2">As determined by the Controller&apos;s use of the Services. May include: names, contact information, identifiers, or any other personal data included in agent event payloads by the Controller.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Categories of Data Subjects:</span>
            <span className="text-sm text-text-secondary ml-2">As determined by the Controller&apos;s use of the Services. May include: end users interacting with the Controller&apos;s AI agents, employees, contractors, or other individuals whose data is processed through agent interactions.</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Processor Obligations</h2>
        <p className="text-text-secondary leading-relaxed">The Processor shall:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Process Personal Data only on documented instructions from the Controller, unless required to do
            so by applicable law. The Terms of Service and the Controller&apos;s use of the API constitute
            the Controller&apos;s instructions for processing.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Ensure that persons authorised to process Personal Data have committed themselves to
            confidentiality or are under an appropriate statutory obligation of confidentiality.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Implement appropriate technical and organisational security measures as described in Section 7
            of this DPA and our{' '}
            <a href="/legal/security" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">Security Policy</a>.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Not engage another processor (sub-processor) without prior specific or general written
            authorisation of the Controller. In the case of general authorisation, the Processor shall
            inform the Controller of any intended changes and provide the opportunity to object.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Assist the Controller in responding to requests from Data Subjects exercising their rights
            under the GDPR (access, rectification, erasure, restriction, portability, objection).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Assist the Controller in ensuring compliance with the obligations relating to security of
            processing, notification of data breaches, data protection impact assessments, and prior
            consultation with supervisory authorities (Articles 32 to 36 of the GDPR).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            At the choice of the Controller, delete or return all Personal Data upon termination of
            the Services, and delete existing copies unless retention is required by applicable law.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Make available to the Controller all information necessary to demonstrate compliance with
            the obligations laid down in Article 28 of the GDPR.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Controller Obligations</h2>
        <p className="text-text-secondary leading-relaxed">The Controller shall:</p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Ensure that there is a lawful basis for each category of Personal Data submitted to the Services.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Provide all necessary notices to Data Subjects regarding the processing of their data through
            the Services.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Be responsible for the accuracy, quality, and legality of all Customer Data submitted to the Services.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Comply with all applicable data protection laws in relation to the processing of Personal Data
            and the use of the Services.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Sub-processors</h2>
        <p className="text-text-secondary leading-relaxed">
          The Controller provides general authorisation for the Processor to engage sub-processors,
          subject to the following conditions:
        </p>
        <p className="text-text-secondary leading-relaxed">
          The Processor currently uses the following sub-processors:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div className="grid grid-cols-[140px_120px_1fr] gap-2 text-sm">
            <span className="font-medium text-text-primary">Neon Inc.</span>
            <span className="text-text-muted">USA</span>
            <span className="text-text-tertiary">PostgreSQL database hosting (events, memories, artifacts, account data)</span>
          </div>
          <div className="grid grid-cols-[140px_120px_1fr] gap-2 text-sm">
            <span className="font-medium text-text-primary">Upstash Inc.</span>
            <span className="text-text-muted">USA / EU</span>
            <span className="text-text-tertiary">Redis hosting (job queues, rate limiting, ephemeral caching)</span>
          </div>
          <div className="grid grid-cols-[140px_120px_1fr] gap-2 text-sm">
            <span className="font-medium text-text-primary">Vercel Inc.</span>
            <span className="text-text-muted">USA / Global</span>
            <span className="text-text-tertiary">Website and dashboard hosting, CDN</span>
          </div>
          <div className="grid grid-cols-[140px_120px_1fr] gap-2 text-sm">
            <span className="font-medium text-text-primary">Stripe Inc.</span>
            <span className="text-text-muted">USA</span>
            <span className="text-text-tertiary">Payment processing and subscription management</span>
          </div>
          <div className="grid grid-cols-[140px_120px_1fr] gap-2 text-sm">
            <span className="font-medium text-text-primary">Clerk Inc.</span>
            <span className="text-text-muted">USA</span>
            <span className="text-text-tertiary">Authentication services for website and dashboard</span>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          The Processor shall notify the Controller of any intended changes to the sub-processor list
          at least 30 days before engagement. The Controller may object to a new sub-processor within
          14 days of notification. If the Controller objects and the parties cannot reach agreement,
          the Controller may terminate the affected Services.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Sub-processors are bound by written agreements that impose data protection obligations no
          less protective than those set out in this DPA. The Processor remains fully liable to the
          Controller for the performance of the sub-processor&apos;s obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Technical and Organisational Measures</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor implements and maintains the following technical and organisational measures
          to ensure a level of security appropriate to the risk:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Encryption in transit:</strong> TLS 1.3 for all client-to-server and service-to-service communication.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Encryption at rest:</strong> AES-256 encryption for all stored data, including databases and backups.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Tenant isolation:</strong> Logical isolation at database, cache, queue, and application layers.
            Cross-tenant data access is prevented architecturally through tenant-scoped queries.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Access control:</strong> API key authentication with scoped permissions (read, write, admin).
            Keys hashed with SHA-256. Dashboard access secured with JWT and Argon2id password hashing.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Rate limiting:</strong> Per-key and per-tenant rate limits to prevent abuse and ensure availability.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Input validation:</strong> Strict schema validation on all API inputs. Parameterised database queries
            to prevent injection attacks.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Monitoring:</strong> Continuous health monitoring of all subsystems (PostgreSQL, Redis, workers).
            Prometheus metrics collection. Configurable alerting for anomalies and degradation.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Incident response:</strong> Documented incident response procedures with detection, triage,
            containment, notification, and post-mortem phases.
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          Full details are available in our{' '}
          <a href="/legal/security" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">Security Policy</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Data Breach Notification</h2>
        <p className="text-text-secondary leading-relaxed">
          In the event of a Data Breach involving Customer Data, the Processor shall:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Notify the Controller without undue delay and no later than <strong className="text-text-primary">72 hours</strong> after
            becoming aware of the breach, providing:
          </li>
        </ul>
        <div className="ml-6 space-y-1 text-text-secondary leading-relaxed text-sm">
          <p>(a) A description of the nature of the breach, including categories and approximate numbers of Data Subjects and records affected</p>
          <p>(b) The name and contact details of the Processor&apos;s contact point for further information</p>
          <p>(c) A description of the likely consequences of the breach</p>
          <p>(d) A description of the measures taken or proposed to address the breach, including measures to mitigate its adverse effects</p>
        </div>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Cooperate with the Controller in investigating and remediating the breach
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Take immediate steps to contain the breach and minimise ongoing risk
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Not notify Data Subjects directly without the Controller&apos;s prior written approval, unless
            required by applicable law
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Audit Rights</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor shall make available to the Controller all information necessary to demonstrate
          compliance with Article 28 of the GDPR and allow for and contribute to audits and inspections.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Audits are subject to the following conditions:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The Controller must provide at least 30 days&apos; written notice before an audit
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Audits shall be conducted during normal business hours (Monday to Friday, 9:00 to 17:00 GMT)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The Controller may conduct no more than one audit per 12-month period, unless a Data Breach
            has occurred or a supervisory authority requires an audit
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The auditor must sign a confidentiality agreement before gaining access to any information
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The Processor may satisfy audit requests by providing relevant third-party audit reports
            (e.g., SOC 2 reports) or certifications where available
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Cross-Border Transfers</h2>
        <p className="text-text-secondary leading-relaxed">
          The Processor is based in England. Some sub-processors operate in the United States. Where
          Personal Data is transferred outside the United Kingdom or the European Economic Area, the
          Processor ensures appropriate safeguards are in place:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            UK and EU adequacy decisions for the recipient country
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Standard Contractual Clauses (SCCs) approved by the European Commission (Commission Implementing
            Decision 2021/914) and the UK International Data Transfer Agreement (IDTA) or UK Addendum to
            the EU SCCs, as applicable
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The EU-US Data Privacy Framework and UK Extension, where the sub-processor is certified
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          The Processor conducts transfer impact assessments for each sub-processor located outside the
          UK/EEA to verify that the safeguards provide an essentially equivalent level of protection.
          Copies of the relevant transfer safeguards are available upon request.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Return and Deletion of Data</h2>
        <p className="text-text-secondary leading-relaxed">
          Upon termination of the Services or upon the Controller&apos;s written request:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The Processor shall make Customer Data available for export through the API for a period
            of 30 days following termination.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            After the 30-day export period, the Processor shall delete all Customer Data from active
            systems within 30 days.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Deletion is propagated to all backup and disaster recovery systems within 90 days.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            The Processor shall provide written confirmation of deletion upon the Controller&apos;s request.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Data may be retained beyond these periods only where required by applicable law (e.g., tax
            records, legal holds). The Controller will be informed of such retention and its legal basis.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Liability</h2>
        <p className="text-text-secondary leading-relaxed">
          Each party&apos;s liability under this DPA is subject to the limitations and exclusions set out
          in the Terms of Service. The Processor is liable to the Controller for damages caused by
          processing that does not comply with the GDPR or this DPA. The Processor is exempt from
          liability if it proves it is not in any way responsible for the event giving rise to the damage.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">13. Term and Termination</h2>
        <p className="text-text-secondary leading-relaxed">
          This DPA takes effect when the Controller begins using the Services and remains in effect
          for the duration of the Controller&apos;s use of the Services. The obligations of the Processor
          regarding data deletion and return survive termination as described in Section 11.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">14. Governing Law</h2>
        <p className="text-text-secondary leading-relaxed">
          This DPA is governed by the laws of England and Wales, consistent with the governing law
          provisions of the Terms of Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">15. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For DPA-related inquiries, sub-processor list requests, or to request a separately executed
          copy of this DPA:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p className="font-medium text-text-primary">OPENGATE TECHNOLOGY LTD.</p>
          <p>15 Jamieson House, 4 Edgar Road, Whitton, Hounslow, England, TW4 5QQ</p>
          <p>
            DPA inquiries:{' '}
            <a href="mailto:dpa@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              dpa@hippocortex.dev
            </a>
          </p>
          <p>
            Legal:{' '}
            <a href="mailto:legal@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              legal@hippocortex.dev
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
