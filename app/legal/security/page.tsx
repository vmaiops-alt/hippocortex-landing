import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Policy - Hippocortex',
  description: 'Security practices and infrastructure protection for the Hippocortex platform, operated by OPENGATE TECHNOLOGY LTD.',
}

export default function SecurityPolicyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Security Policy</h1>
        <p className="text-sm text-text-muted">Last updated: 14 March 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">1. Overview</h2>
        <p className="text-text-secondary leading-relaxed">
          Security is foundational to the Hippocortex platform. Agent memory contains sensitive operational
          data, including conversation history, tool interactions, and compiled knowledge. Our infrastructure
          is designed with defence-in-depth principles to protect the confidentiality, integrity, and
          availability of all data processed through the Services.
        </p>
        <p className="text-text-secondary leading-relaxed">
          This Security Policy describes the technical and organisational measures implemented by
          OPENGATE TECHNOLOGY LTD. to protect the Hippocortex platform and Customer Data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">2. Infrastructure Security</h2>

        <h3 className="text-lg font-medium text-text-primary">2.1 Tenant Isolation</h3>
        <p className="text-text-secondary leading-relaxed">
          Complete logical isolation is enforced between tenants at every layer of the stack:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">API layer:</strong> Every request is authenticated via Bearer token and resolved to a
            specific tenant ID. All subsequent operations are scoped to that tenant.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Database layer:</strong> All PostgreSQL queries include a <code className="text-accent-cyan text-sm">tenant_id</code> filter.
            There are no administrative endpoints or queries that bypass tenant scoping. Cross-tenant data access is
            architecturally impossible.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Queue layer:</strong> BullMQ job payloads include the tenant ID. Workers validate tenant
            context before processing any job.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Search layer:</strong> Semantic vector search is pre-filtered by tenant ID, ensuring
            results from other tenants are never included in similarity matches.
          </li>
        </ul>

        <h3 className="text-lg font-medium text-text-primary">2.2 Encryption</h3>
        <h4 className="text-base font-medium text-text-secondary">In Transit</h4>
        <p className="text-text-secondary leading-relaxed">
          All data transmitted between clients and Hippocortex services is encrypted using TLS 1.3.
          We enforce HTTP Strict Transport Security (HSTS) headers. Deprecated TLS versions (1.0, 1.1)
          are not supported. Internal service-to-service communication (API to Redis, API to PostgreSQL)
          also uses TLS encryption.
        </p>
        <h4 className="text-base font-medium text-text-secondary">At Rest</h4>
        <p className="text-text-secondary leading-relaxed">
          All stored data, including Customer Data, metadata, and backups, is encrypted using AES-256.
          Database encryption is managed by our infrastructure provider (Neon) with automatic key rotation.
          Redis data is encrypted at rest by our provider (Upstash).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">3. API Key Security</h2>
        <p className="text-text-secondary leading-relaxed">
          API keys are the primary authentication mechanism for programmatic access to the Services.
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Hashing:</strong> API keys are hashed with SHA-256 before storage. The plaintext key
            is displayed only once at creation and cannot be retrieved afterwards.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Scoped permissions:</strong> Keys support fine-grained permissions (read, write, admin).
            We recommend creating keys with the minimum required permissions for each use case.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Key rotation:</strong> You can rotate API keys without downtime by creating a new key
            before revoking the old one. We recommend rotating keys regularly.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Environment separation:</strong> Production keys (<code className="text-accent-cyan text-sm">hx_live_*</code>)
            and test keys (<code className="text-accent-amber text-sm">hx_test_*</code>) operate in separate
            environments to prevent accidental cross-contamination.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">4. Authentication and Access Control</h2>
        <p className="text-text-secondary leading-relaxed">
          Dashboard access uses JWT-based authentication with the following security measures:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Passwords hashed with Argon2id (memory cost: 64 MB, time cost: 3 iterations, parallelism: 4)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Access tokens with 1-hour expiry, refresh tokens with 7-day expiry
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Rate limiting on authentication endpoints: 5 attempts per email per 15-minute window
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Email verification required for full account activation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Password reset tokens with limited validity and single-use enforcement
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">5. Network Security</h2>
        <p className="text-text-secondary leading-relaxed">
          Production infrastructure is deployed behind load balancers with the following protections:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            DDoS protection at the edge through our CDN provider (Vercel)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Database connections restricted to application-level network access only
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Redis access secured with authentication tokens and TLS
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            No direct public access to database or queue infrastructure
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Secrets managed through environment variables and secret management systems, never stored in code
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">6. Rate Limiting and Abuse Prevention</h2>
        <p className="text-text-secondary leading-relaxed">
          Per-key and per-tenant rate limits protect the platform from abuse and ensure fair resource
          allocation across all customers. Rate limits are enforced via Redis counters. When limits are
          exceeded, the API returns HTTP 429 with a <code className="text-accent-cyan text-sm">Retry-After</code> header indicating
          the wait time in seconds.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Persistent abuse patterns (repeated rate limit violations, anomalous request patterns, attempts
          to circumvent quotas) result in automatic key suspension. Severe violations may lead to account
          termination.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">7. Input Validation and Request Hardening</h2>
        <p className="text-text-secondary leading-relaxed">
          All API inputs are validated against strict schemas before processing:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Required fields (type, sessionId, payload) are validated on every capture request
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Batch requests are limited to 1,000 events maximum
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            SQL injection mitigated through parameterised queries (no string concatenation in database operations)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            XSS protection through output encoding and Content Security Policy headers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Request body size limits enforced at the edge
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">8. Monitoring and Alerting</h2>
        <p className="text-text-secondary leading-relaxed">
          The platform includes comprehensive monitoring across all subsystems:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Health checks:</strong> Continuous monitoring of PostgreSQL, Redis, and worker queue health
            via the <code className="text-accent-cyan text-sm">/v1/health</code> endpoint
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Prometheus metrics:</strong> Internal metrics collection for capture throughput,
            synthesis latency, queue depths, and error rates
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Alert engine:</strong> Configurable alerting for queue backlog growth, failed job
            accumulation, database connection pool exhaustion, and Redis memory pressure
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Anomaly detection:</strong> Monitoring for unusual access patterns, unexpected traffic
            spikes, and authentication failures
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">9. Incident Response</h2>
        <p className="text-text-secondary leading-relaxed">
          We maintain a documented incident response procedure that includes:
        </p>
        <ol className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">1.</span>
            <span><strong className="text-text-primary">Detection:</strong> Automated alerting and monitoring systems identify potential security events.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">2.</span>
            <span><strong className="text-text-primary">Triage:</strong> Security team assesses severity and scope within 1 hour of detection.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">3.</span>
            <span><strong className="text-text-primary">Containment:</strong> Immediate measures to limit impact, including key revocation, access restriction, or service isolation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">4.</span>
            <span><strong className="text-text-primary">Notification:</strong> Affected customers notified within 72 hours of confirmed data breach, as required by GDPR.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">5.</span>
            <span><strong className="text-text-primary">Remediation:</strong> Root cause analysis and implementation of corrective measures.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono text-sm mt-0.5 shrink-0">6.</span>
            <span><strong className="text-text-primary">Post-mortem:</strong> Documented review of the incident with lessons learned and preventive actions.</span>
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">10. Data Deletion and Retention</h2>
        <p className="text-text-secondary leading-relaxed">
          We support GDPR-compliant hard deletion with the following guarantees:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Deletion requests processed within 30 days of receipt
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Deletion propagated to all storage layers, including database replicas and backups, within 90 days
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Audit trails maintained for deletion operations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Deletion confirmation available upon request
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">11. Vulnerability Disclosure</h2>
        <p className="text-text-secondary leading-relaxed">
          We maintain a responsible vulnerability disclosure programme. Security researchers and users
          who discover potential security issues should report them to:
        </p>
        <p className="text-text-secondary leading-relaxed">
          <a href="mailto:security@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            security@hippocortex.dev
          </a>
        </p>
        <p className="text-text-secondary leading-relaxed">
          Our disclosure commitments:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Acknowledge reports within 48 hours
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Provide status updates every 5 business days during investigation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            We will not take legal action against researchers acting in good faith
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            We request that you do not publicly disclose the vulnerability until we have had an opportunity to address it
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            We request that you avoid accessing or modifying other users&apos; data during testing
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">12. Compliance</h2>
        <p className="text-text-secondary leading-relaxed">
          Our security practices are aligned with the following standards and regulations:
        </p>
        <ul className="space-y-2 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">UK GDPR and EU GDPR:</strong> Full compliance with data protection regulations,
            including data minimisation, purpose limitation, and data subject rights.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">SOC 2 readiness:</strong> Controls aligned with SOC 2 Type II trust service criteria
            for security, availability, and confidentiality. Formal audit planned.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Penetration testing:</strong> Regular third-party penetration testing of the API and
            infrastructure. Results and remediation plans available to Enterprise customers under NDA.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">13. Contact</h2>
        <p className="text-text-secondary leading-relaxed">
          For security-related inquiries or to report a vulnerability:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-1 text-sm text-text-secondary">
          <p>
            Security team:{' '}
            <a href="mailto:security@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              security@hippocortex.dev
            </a>
          </p>
          <p>
            General support:{' '}
            <a href="mailto:support@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              support@hippocortex.dev
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
