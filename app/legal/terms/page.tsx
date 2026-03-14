import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Hippocortex',
  description: 'Terms of Service for the Hippocortex platform and services, operated by OPENGATE TECHNOLOGY LTD.',
}

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Terms of Service</h1>
        <p className="text-sm text-text-muted">Last updated: 14 March 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Agreement to Terms</h2>
        <p className="text-text-secondary leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Customer&quot;,
          &quot;you&quot;, &quot;your&quot;) and OPENGATE TECHNOLOGY LTD., a private limited company registered in England and
          Wales under company number 16645990, with its registered office at 15 Jamieson House, 4 Edgar Road,
          Whitton, Hounslow, England, TW4 5QQ (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
        </p>
        <p className="text-text-secondary leading-relaxed">
          By accessing or using the Hippocortex platform, APIs, SDKs, documentation, dashboard, and related
          services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms. If you are using
          the Services on behalf of an organisation, you represent and warrant that you have the authority
          to bind that organisation to these Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Description of Services</h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex provides memory infrastructure for AI agents. The Services include:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Event Capture:</strong> API endpoints for ingesting agent interaction events (messages,
            tool calls, tool results, file edits, test runs, command executions, browser actions, and API results)
            into a managed event store.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Memory Compilation:</strong> Automated processing of captured events into structured
            knowledge artifacts, including task schemas, failure playbooks, causal patterns, and decision policies.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Context Synthesis:</strong> Retrieval and assembly of relevant context from memory layers,
            packed within configurable token budgets for injection into LLM prompts.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">SDK Libraries:</strong> TypeScript and Python client libraries for integrating the Services
            into agent applications.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Dashboard:</strong> Web-based management interface for account configuration, API key
            management, usage monitoring, and artifact exploration.
          </li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          The Services are provided as a cloud-hosted platform. Enterprise customers may negotiate
          self-hosted deployment options under a separate agreement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Account Registration</h2>
        <p className="text-text-secondary leading-relaxed">
          To use the Services, you must create an account by providing a valid email address, password
          (minimum 8 characters), and display name. You agree to provide accurate, current, and complete
          information during registration and to keep this information up to date.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Upon registration, you receive a tenant account and a default API key. You are solely responsible
          for maintaining the confidentiality of your account credentials, including all API keys
          (both <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">hx_live_*</code> production
          and <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">hx_test_*</code> test keys).
          You must notify us immediately at{' '}
          <a href="mailto:support@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            support@hippocortex.dev
          </a>{' '}
          of any unauthorised use of your account or any security breach.
        </p>
        <p className="text-text-secondary leading-relaxed">
          You are responsible for all activity that occurs under your account, whether or not authorised
          by you. We are not liable for any loss arising from unauthorised use of your credentials.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Acceptable Use</h2>
        <p className="text-text-secondary leading-relaxed">
          You agree to use the Services only for lawful purposes and in accordance with these Terms
          and our{' '}
          <a href="/legal/acceptable-use" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Acceptable Use Policy
          </a>. You shall not:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Use the Services to store or process data that violates applicable laws or regulations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Attempt to access other tenants&apos; data or circumvent tenant isolation mechanisms
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Intentionally circumvent rate limits, quotas, or usage restrictions through any means,
            including multiple accounts or API key cycling
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Use the Services to develop a competing product through reverse engineering
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Distribute malware, conduct denial-of-service attacks, or engage in network abuse
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-rose mt-1">&#8226;</span>
            Store content that promotes violence, harassment, discrimination, or illegal activities
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Data Processing and Storage</h2>
        <p className="text-text-secondary leading-relaxed">
          When you submit events through the capture API, your data follows this processing pipeline:
          events are queued asynchronously via Redis, persisted to PostgreSQL, optionally compiled into
          knowledge artifacts through the learn endpoint, and made available for retrieval through
          the synthesize endpoint. Full details of our data processing practices are described in
          our{' '}
          <a href="/legal/privacy" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/legal/dpa" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Data Processing Agreement
          </a>.
        </p>
        <p className="text-text-secondary leading-relaxed">
          You acknowledge that Customer Data submitted through the Services may include information generated
          by AI agents operating on your behalf. You are responsible for ensuring that any personal data
          included in Customer Data is processed in compliance with applicable data protection laws,
          including obtaining necessary consents or establishing appropriate legal bases.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Intellectual Property</h2>
        <h3 className="text-lg font-medium text-text-primary">Your Data</h3>
        <p className="text-text-secondary leading-relaxed">
          You retain all rights, title, and interest in and to data you submit to the Services
          (&quot;Customer Data&quot;). We do not claim ownership of Customer Data. Compiled artifacts derived
          from your data (task schemas, failure playbooks, causal patterns, decision policies) are
          part of your Customer Data and belong to you.
        </p>
        <h3 className="text-lg font-medium text-text-primary">Our Services</h3>
        <p className="text-text-secondary leading-relaxed">
          The Services, including all software, APIs, algorithms, documentation, branding, trademarks,
          and visual design, are owned by OPENGATE TECHNOLOGY LTD. and protected by intellectual
          property laws. These Terms do not grant you any rights to our trademarks, service marks,
          or trade names. Open-source components (including the Hippocortex SDK) are governed by
          their respective open-source licences.
        </p>
        <h3 className="text-lg font-medium text-text-primary">Feedback</h3>
        <p className="text-text-secondary leading-relaxed">
          If you provide suggestions, ideas, or feedback about the Services, we may use them without
          restriction or obligation to you.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Pricing and Payment</h2>
        <p className="text-text-secondary leading-relaxed">
          The Services are available under the following subscription tiers:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Free:</span>
            <span className="text-sm text-text-secondary ml-2">Limited usage with restricted quotas. No payment required.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Developer ($49/month):</span>
            <span className="text-sm text-text-secondary ml-2">Expanded quotas suitable for individual developers and small projects.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Pro ($299/month):</span>
            <span className="text-sm text-text-secondary ml-2">Production-grade quotas with priority support and advanced features.</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Enterprise (custom pricing):</span>
            <span className="text-sm text-text-secondary ml-2">Custom quotas, SLA guarantees, dedicated support, and optional self-hosted deployment.</span>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Paid subscriptions are billed monthly or annually as selected at the time of purchase.
          All fees are quoted in US Dollars and are exclusive of applicable taxes. Payment is processed
          through Stripe. All fees are non-refundable except as required by applicable law.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We may change pricing with at least 30 days&apos; prior written notice. Price changes take effect
          at the start of your next billing cycle. Continued use of the Services after a price change
          constitutes acceptance of the new pricing. If you do not agree, you may cancel your subscription
          before the change takes effect.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. API Usage and Rate Limits</h2>
        <p className="text-text-secondary leading-relaxed">
          API usage is subject to rate limits and quotas determined by your subscription tier. Rate limits
          are applied per API key and per tenant. When rate limits are exceeded, the API responds with
          HTTP 429 and a Retry-After header. We reserve the right to throttle or suspend access if usage
          patterns impact service availability for other customers.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Batch capture requests are limited to 1,000 events per request. Individual event payloads must
          conform to the documented schema. Events that fail validation are rejected with detailed error
          responses.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Service Level and Availability</h2>
        <p className="text-text-secondary leading-relaxed">
          We use commercially reasonable efforts to maintain high availability of the Services. However,
          we do not guarantee uninterrupted or error-free service. Planned maintenance windows will be
          communicated at least 48 hours in advance via email or the dashboard.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Enterprise customers may negotiate specific Service Level Agreements (SLAs) with defined
          uptime commitments and service credits. Such SLAs are documented separately and take
          precedence over this section where they apply.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We are not liable for service interruptions caused by factors outside our reasonable control,
          including but not limited to: natural disasters, acts of government, internet outages,
          third-party service provider failures, or force majeure events.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Warranties and Disclaimers</h2>
        <p className="text-text-secondary leading-relaxed">
          THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES
          WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The quality of compiled artifacts depends on the volume, diversity, and quality of events
          you capture. We do not guarantee specific accuracy, completeness, or usefulness of compiled
          knowledge artifacts or synthesized context.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Limitation of Liability</h2>
        <p className="text-text-secondary leading-relaxed">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OPENGATE TECHNOLOGY LTD. SHALL NOT BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
          BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF BUSINESS, OR LOSS OF GOODWILL,
          ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY.
        </p>
        <p className="text-text-secondary leading-relaxed">
          OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS SHALL NOT EXCEED
          THE GREATER OF: (A) THE AMOUNT PAID BY YOU TO US IN THE TWELVE (12) MONTHS PRECEDING THE
          EVENT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED POUNDS STERLING (&#163;100).
        </p>
        <p className="text-text-secondary leading-relaxed">
          Nothing in these Terms excludes or limits liability for: (a) death or personal injury
          caused by negligence, (b) fraud or fraudulent misrepresentation, or (c) any other liability
          that cannot be excluded or limited under applicable law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Indemnification</h2>
        <p className="text-text-secondary leading-relaxed">
          You agree to indemnify, defend, and hold harmless OPENGATE TECHNOLOGY LTD. and its officers,
          directors, employees, and agents from and against any claims, liabilities, damages, losses,
          and expenses (including reasonable legal fees) arising out of or related to: (a) your use of
          the Services, (b) your violation of these Terms, (c) your violation of any third-party rights,
          or (d) Customer Data you submit to the Services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">13. Termination</h2>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">By you:</strong> You may terminate your account at any time through the dashboard or
          by contacting{' '}
          <a href="mailto:support@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            support@hippocortex.dev
          </a>. Termination takes effect at the end of your current billing period. No refunds are issued
          for partial billing periods.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">By us:</strong> We may suspend or terminate your access to the Services immediately
          if you: (a) violate these Terms or the Acceptable Use Policy, (b) fail to pay fees when due,
          (c) engage in activity that threatens the security or integrity of the Services, or
          (d) become subject to insolvency proceedings.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Data export:</strong> Upon termination, we will retain your Customer Data for 30 days,
          during which you may export your data via the API. After this retention period, all Customer
          Data will be permanently deleted from our systems, including backups, within 90 days.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Sections 6 (Intellectual Property), 10 (Warranties), 11 (Limitation of Liability),
          12 (Indemnification), and 15 (Governing Law) survive termination.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">14. Confidentiality</h2>
        <p className="text-text-secondary leading-relaxed">
          Each party agrees to protect the confidential information of the other party with at least the
          same degree of care it uses to protect its own confidential information, and in no event less
          than reasonable care. Confidential information does not include information that: (a) is or
          becomes publicly available through no fault of the receiving party, (b) was rightfully in the
          receiving party&apos;s possession before disclosure, (c) is independently developed without use
          of confidential information, or (d) is rightfully received from a third party without
          restriction on disclosure.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">15. Governing Law and Dispute Resolution</h2>
        <p className="text-text-secondary leading-relaxed">
          These Terms are governed by and construed in accordance with the laws of England and Wales.
          Any disputes arising out of or in connection with these Terms shall be subject to the exclusive
          jurisdiction of the courts of England and Wales.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Before initiating legal proceedings, the parties agree to attempt to resolve disputes through
          good-faith negotiation for a period of at least 30 days. Written notice of the dispute must
          be provided to the other party, including a description of the dispute and the relief sought.
        </p>
        <p className="text-text-secondary leading-relaxed">
          If you are a consumer within the European Union or the United Kingdom, you retain the benefit
          of any mandatory consumer protection provisions of your country of residence that cannot be
          waived by contract.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">16. Changes to Terms</h2>
        <p className="text-text-secondary leading-relaxed">
          We may update these Terms from time to time. Material changes will be communicated at least
          30 days before they take effect via email to the address associated with your account or
          through a notice in the dashboard. The &quot;Last updated&quot; date at the top of this page reflects
          the most recent revision.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Continued use of the Services after the effective date of updated Terms constitutes acceptance
          of the changes. If you do not agree to the updated Terms, you must stop using the Services
          and terminate your account before the changes take effect.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">17. General Provisions</h2>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Entire Agreement:</strong> These Terms, together with the Privacy Policy, Acceptable
          Use Policy, DPA, and any Enterprise agreement, constitute the entire agreement between the
          parties regarding the subject matter hereof.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Severability:</strong> If any provision of these Terms is found to be unenforceable,
          the remaining provisions shall continue in full force and effect.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Waiver:</strong> Failure to enforce any provision of these Terms does not constitute
          a waiver of that provision or any other provision.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Assignment:</strong> You may not assign or transfer these Terms without our prior
          written consent. We may assign these Terms in connection with a merger, acquisition,
          or sale of all or substantially all of our assets.
        </p>
        <p className="text-text-secondary leading-relaxed">
          <strong className="text-text-primary">Notices:</strong> Notices to you will be sent to the email address associated with your
          account. Notices to us should be sent to{' '}
          <a href="mailto:legal@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            legal@hippocortex.dev
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">18. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For questions about these Terms, contact us at:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p className="font-medium text-text-primary">OPENGATE TECHNOLOGY LTD.</p>
          <p>15 Jamieson House, 4 Edgar Road</p>
          <p>Whitton, Hounslow, England, TW4 5QQ</p>
          <p>
            Email:{' '}
            <a href="mailto:legal@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              legal@hippocortex.dev
            </a>
          </p>
          <p>Company Number: 16645990</p>
        </div>
      </section>
    </div>
  )
}
