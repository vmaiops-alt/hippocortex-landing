import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Policy — Hippocortex',
  description: 'Security practices and policies for the Hippocortex platform.',
}

export default function SecurityPolicyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Security Policy</h1>
        <p className="text-sm text-text-muted">Last updated: March 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Overview</h2>
        <p className="text-text-secondary leading-relaxed">
          Security is a foundational requirement of the Hippocortex platform. Agent memory contains sensitive
          operational data, and our infrastructure is designed with defense-in-depth principles to protect
          data confidentiality, integrity, and availability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Encryption</h2>
        <h3 className="text-lg font-medium text-text-primary">In Transit</h3>
        <p className="text-text-secondary leading-relaxed">
          All data transmitted between clients and Hippocortex services is encrypted using TLS 1.3.
          We enforce HSTS headers and do not support deprecated TLS versions.
        </p>
        <h3 className="text-lg font-medium text-text-primary">At Rest</h3>
        <p className="text-text-secondary leading-relaxed">
          All stored data, including Customer Data, metadata, and backups, is encrypted using AES-256.
          Encryption keys are managed per-tenant with regular rotation schedules.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. Tenant Isolation</h2>
        <p className="text-text-secondary leading-relaxed">
          Complete logical isolation between tenants at the database, cache, and application layers.
          Every API request is authenticated and scoped to the requesting tenant. Cross-tenant data
          access is architecturally impossible — isolation is enforced at the query level, not just
          application logic.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Authentication and Authorization</h2>
        <p className="text-text-secondary leading-relaxed">
          API access requires scoped API keys with configurable permissions. Keys support fine-grained
          access control (read-only, write-only, admin). Key rotation is supported without downtime.
          Dashboard access uses industry-standard authentication with MFA support.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Rate Limiting and Abuse Prevention</h2>
        <p className="text-text-secondary leading-relaxed">
          Per-key and per-tenant rate limits protect the platform from abuse and ensure fair resource
          allocation. Rate limits are configurable per plan tier. Requests exceeding limits receive
          429 responses with Retry-After headers. Persistent abuse results in automatic key suspension.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Input Validation and Request Hardening</h2>
        <p className="text-text-secondary leading-relaxed">
          All API inputs are validated against strict schemas. Payload size limits are enforced at the
          edge. Request signatures prevent tampering. SQL injection, XSS, and other injection attacks
          are mitigated through parameterized queries and output encoding.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Infrastructure Security</h2>
        <p className="text-text-secondary leading-relaxed">
          Production infrastructure runs on hardened, regularly patched systems. Network access is
          restricted through security groups and network policies. Administrative access requires
          MFA and is logged. Secrets are managed through dedicated secret management systems and
          never stored in code or configuration files.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Monitoring and Incident Response</h2>
        <p className="text-text-secondary leading-relaxed">
          Comprehensive logging and monitoring across all services. Anomaly detection alerts for
          unusual access patterns. Documented incident response procedures with defined escalation
          paths. Post-incident reviews and root cause analysis for all security events.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Data Deletion</h2>
        <p className="text-text-secondary leading-relaxed">
          GDPR-compliant hard deletion with tombstones and audit trails. Deletion requests are
          processed within 30 days and propagated to all storage layers, including backups,
          within 90 days. Deletion is cryptographically verified.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Vulnerability Disclosure</h2>
        <p className="text-text-secondary leading-relaxed">
          We maintain a responsible vulnerability disclosure program. Security researchers should
          report vulnerabilities to{' '}
          <a href="mailto:security@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            security@hippocortex.dev
          </a>.
          We acknowledge reports within 48 hours and provide status updates every 5 business days.
          We do not take legal action against researchers acting in good faith.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          Security team:{' '}
          <a href="mailto:security@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            security@hippocortex.dev
          </a>
        </p>
      </section>
    </div>
  )
}
