import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Hippocortex',
  description: 'Terms of Service for the Hippocortex platform and services.',
}

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Terms of Service</h1>
        <p className="text-sm text-text-muted">Last updated: March 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Agreement to Terms</h2>
        <p className="text-text-secondary leading-relaxed">
          By accessing or using the Hippocortex platform, APIs, SDKs, documentation, and related services
          (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
          If you are using the Services on behalf of an organization, you represent that you have the authority
          to bind that organization to these Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Description of Services</h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex provides memory infrastructure for AI agents, including event capture, knowledge compilation,
          context synthesis, and related APIs. The Services are provided as a cloud-hosted platform with optional
          self-hosted deployment for Enterprise customers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Account Registration</h2>
        <p className="text-text-secondary leading-relaxed">
          To use the Services, you must create an account and provide accurate, complete information. You are
          responsible for maintaining the security of your account credentials, including API keys. You must
          notify us immediately of any unauthorized use of your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Acceptable Use</h2>
        <p className="text-text-secondary leading-relaxed">
          You agree to use the Services only for lawful purposes and in accordance with these Terms and our
          Acceptable Use Policy. You shall not use the Services to store or process data that violates applicable
          laws, infringes on third-party rights, or contains malicious content.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. API Usage and Rate Limits</h2>
        <p className="text-text-secondary leading-relaxed">
          API usage is subject to rate limits and quotas as specified in your subscription plan. We reserve the
          right to throttle or suspend access if usage exceeds reasonable limits or impacts service availability
          for other users. Abuse of API endpoints may result in immediate suspension.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Data Ownership</h2>
        <p className="text-text-secondary leading-relaxed">
          You retain all rights to data you submit to the Services (&quot;Customer Data&quot;). We do not claim ownership
          of Customer Data. We process Customer Data solely to provide the Services and as described in our
          Privacy Policy. Compiled artifacts derived from your data are part of your Customer Data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Pricing and Payment</h2>
        <p className="text-text-secondary leading-relaxed">
          Free tier usage is subject to the limits specified on our pricing page. Paid subscriptions are billed
          monthly or annually as selected. All fees are non-refundable except as required by law. We may change
          pricing with 30 days&apos; notice. Continued use after price changes constitutes acceptance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Service Level and Availability</h2>
        <p className="text-text-secondary leading-relaxed">
          We strive to maintain high availability but do not guarantee uninterrupted service. Planned maintenance
          windows will be communicated in advance. Enterprise customers may negotiate specific SLA terms.
          We are not liable for service interruptions caused by factors outside our reasonable control.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Intellectual Property</h2>
        <p className="text-text-secondary leading-relaxed">
          The Services, including all software, APIs, documentation, and branding, are owned by Hippocortex
          and protected by intellectual property laws. These Terms do not grant you any rights to our
          trademarks, service marks, or trade names. Open-source components are governed by their respective licenses.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Limitation of Liability</h2>
        <p className="text-text-secondary leading-relaxed">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, HIPPOCORTEX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY
          SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE TWELVE MONTHS PRECEDING THE CLAIM.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Termination</h2>
        <p className="text-text-secondary leading-relaxed">
          Either party may terminate these Terms at any time. Upon termination, your right to use the Services
          ceases immediately. We will retain Customer Data for 30 days after termination, during which you may
          export your data. After this period, Customer Data will be permanently deleted.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Governing Law</h2>
        <p className="text-text-secondary leading-relaxed">
          These Terms are governed by the laws of the Federal Republic of Germany. Any disputes shall be
          resolved in the courts of Berlin, Germany. If you are a consumer within the European Union,
          you retain the benefit of any mandatory consumer protection provisions of your country of residence.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">13. Changes to Terms</h2>
        <p className="text-text-secondary leading-relaxed">
          We may update these Terms from time to time. We will notify you of material changes via email
          or through the Services. Continued use after changes take effect constitutes acceptance of the
          updated Terms. If you do not agree, you may terminate your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">14. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For questions about these Terms, contact us at{' '}
          <a href="mailto:legal@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            legal@hippocortex.dev
          </a>.
        </p>
      </section>
    </div>
  )
}
