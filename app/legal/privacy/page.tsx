import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Hippocortex',
  description: 'Privacy Policy for the Hippocortex platform and services.',
}

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-muted">Last updated: March 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Introduction</h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, store, and protect information when you use our platform, APIs,
          and related services. We comply with the EU General Data Protection Regulation (GDPR) and
          applicable data protection laws.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Data Controller</h2>
        <p className="text-text-secondary leading-relaxed">
          The data controller for information processed through the Hippocortex platform is Hippocortex,
          with registered offices in Berlin, Germany. For data protection inquiries, contact our Data
          Protection Officer at{' '}
          <a href="mailto:dpo@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            dpo@hippocortex.dev
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Information We Collect</h2>
        <h3 className="text-lg font-medium text-text-primary">3.1 Account Information</h3>
        <p className="text-text-secondary leading-relaxed">
          Email address, name, organization name, and billing information provided during registration.
        </p>
        <h3 className="text-lg font-medium text-text-primary">3.2 Customer Data</h3>
        <p className="text-text-secondary leading-relaxed">
          Events, memory artifacts, and other data you submit through our APIs. This data is processed
          solely to provide the Services and is owned by you.
        </p>
        <h3 className="text-lg font-medium text-text-primary">3.3 Usage Data</h3>
        <p className="text-text-secondary leading-relaxed">
          API call volumes, feature usage patterns, error rates, and performance metrics. This data is
          aggregated and used to improve service quality.
        </p>
        <h3 className="text-lg font-medium text-text-primary">3.4 Technical Data</h3>
        <p className="text-text-secondary leading-relaxed">
          IP addresses, browser type, device information, and access timestamps collected through
          standard web server logs and analytics.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. How We Use Information</h2>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            To provide, maintain, and improve the Services
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            To process transactions and send billing information
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            To communicate service updates and security notices
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            To detect and prevent fraud, abuse, and security incidents
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">•</span>
            To comply with legal obligations
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Legal Basis for Processing (GDPR)</h2>
        <p className="text-text-secondary leading-relaxed">
          We process personal data under the following legal bases: (a) performance of our contract with you,
          (b) our legitimate interests in operating and improving the Services, (c) your consent where
          specifically requested, and (d) compliance with legal obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Data Retention</h2>
        <p className="text-text-secondary leading-relaxed">
          Customer Data is retained for the duration of your subscription and 30 days thereafter.
          Account information is retained for as long as your account is active. Usage and technical
          data is retained for up to 24 months. Upon deletion, data is permanently removed from all
          systems, including backups, within 90 days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Data Sharing and Transfers</h2>
        <p className="text-text-secondary leading-relaxed">
          We do not sell personal data. We may share data with: (a) service providers who process data
          on our behalf under Data Processing Agreements, (b) law enforcement when required by valid
          legal process, and (c) in connection with a merger or acquisition. For data transfers outside
          the EEA, we use Standard Contractual Clauses approved by the European Commission.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Your Rights</h2>
        <p className="text-text-secondary leading-relaxed">
          Under GDPR, you have the right to: access your data, rectify inaccurate data, erase your data
          (&quot;right to be forgotten&quot;), restrict processing, data portability, object to processing, and
          withdraw consent. To exercise these rights, contact{' '}
          <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            privacy@hippocortex.dev
          </a>.
          We will respond within 30 days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Security</h2>
        <p className="text-text-secondary leading-relaxed">
          We implement industry-standard security measures including TLS 1.3 encryption in transit,
          AES-256 encryption at rest, tenant isolation, access controls, and regular security audits.
          See our Security Policy for details.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Cookies</h2>
        <p className="text-text-secondary leading-relaxed">
          We use essential cookies for authentication and session management. We use analytics cookies
          only with your consent. You can manage cookie preferences through your browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Changes to This Policy</h2>
        <p className="text-text-secondary leading-relaxed">
          We may update this Privacy Policy periodically. We will notify you of material changes via
          email or through the Services at least 30 days before they take effect.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For privacy-related inquiries:{' '}
          <a href="mailto:privacy@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            privacy@hippocortex.dev
          </a>
          <br />
          Data Protection Officer:{' '}
          <a href="mailto:dpo@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            dpo@hippocortex.dev
          </a>
          <br />
          You have the right to lodge a complaint with a supervisory authority (Berliner Beauftragte
          für Datenschutz und Informationsfreiheit).
        </p>
      </section>
    </div>
  )
}
