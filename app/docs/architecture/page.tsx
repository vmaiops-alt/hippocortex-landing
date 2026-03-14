import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Guide - Hippocortex Docs',
  description: 'Deep dive into the Hippocortex architecture: event capture pipeline, memory compilation, context synthesis, and infrastructure.',
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div>
      {title && (
        <div className="bg-bg-surface border border-border-subtle border-b-0 rounded-t-xl px-4 py-2">
          <span className="text-xs font-mono text-text-muted">{title}</span>
        </div>
      )}
      <pre className={`bg-bg-void border border-border-subtle ${title ? 'rounded-b-xl' : 'rounded-xl'} p-5 overflow-x-auto text-sm leading-relaxed`}>
        <code className="font-mono text-text-secondary">{children}</code>
      </pre>
    </div>
  )
}

function DiagramBlock({ children, title }: { children: string; title: string }) {
  return (
    <div>
      <div className="bg-bg-surface border border-accent-cyan/20 border-b-0 rounded-t-xl px-4 py-2">
        <span className="text-xs font-mono text-accent-cyan">{title}</span>
      </div>
      <pre className="bg-bg-void border border-accent-cyan/20 rounded-b-xl p-5 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-text-tertiary">{children}</code>
      </pre>
    </div>
  )
}

export default function ArchitecturePage() {
  return (
    <div className="space-y-14">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-3">Architecture Guide</h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[680px]">
          A comprehensive look at how Hippocortex captures, processes, stores, and retrieves
          agent memory. This guide covers the full system from event ingestion to context synthesis.
        </p>
      </div>

      {/* System Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">System Overview</h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex is a deterministic memory layer for AI agents. It operates on a three-phase cycle:
          <strong className="text-text-primary"> Capture</strong> raw agent events,
          <strong className="text-text-primary"> Compile</strong> them into reusable knowledge artifacts, and
          <strong className="text-text-primary"> Synthesize</strong> compressed context within token budgets.
        </p>

        <DiagramBlock title="High-Level Architecture">{`
  Agent / SDK                    Hippocortex Cloud
  +-----------+                  +------------------------------------------+
  |           |   POST /capture  |  +--------+    +---------+    +--------+ |
  |  capture  | ----------------->  | Hono   | -> | Redis   | -> | Worker | |
  |  events   |   202 Accepted   |  | API    |    | Queue   |    | (Bull) | |
  |           |                  |  +--------+    +---------+    +---+----+ |
  +-----------+                  |                                   |      |
                                 |                              +----v----+ |
  +-----------+                  |                              | Postgres| |
  |           |  POST /synthesize|  +--------+    +---------+  | Events  | |
  | synthesize| <---------------->  | Hono   | -> | Semantic|  | Memories| |
  |  context  |   200 OK        |  | API    |    | Search  |  | Artifacts|
  |           |                  |  +--------+    +---------+  +---------+ |
  +-----------+                  +------------------------------------------+
`}</DiagramBlock>
      </section>

      {/* Event Capture Pipeline */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Event Capture Pipeline</h2>
        <p className="text-text-secondary leading-relaxed">
          The capture pipeline is designed for high throughput and reliability. Events are accepted
          by the Hono API server, validated, and immediately queued to Redis via BullMQ. The API
          returns a <code className="text-accent-cyan text-sm">202 Accepted</code> response without waiting for processing,
          keeping agent latency minimal.
        </p>

        <DiagramBlock title="Capture Flow">{`
  SDK Client
     |
     | POST /v1/capture (or /v1/capture/batch)
     v
  +------------------+
  | Hono API Server  |
  |                  |
  | 1. Auth check    |  Bearer token -> tenant lookup
  | 2. Validate body |  type, sessionId, payload required
  | 3. Dedup check   |  idempotencyKey -> BullMQ job ID
  | 4. Queue event   |  BullMQ: captureQueue.add()
  | 5. Return 202    |  { jobId, status: "queued" }
  +--------+---------+
           |
           v
  +------------------+
  | Redis (BullMQ)   |
  |                  |
  | hx:bull:capture  |  Waiting -> Active -> Completed
  +--------+---------+
           |
           v
  +------------------+
  | Capture Worker   |
  |                  |
  | 1. Persist event |  -> PostgreSQL events table
  | 2. Salience score|  Assign relevance weight
  | 3. Metrics       |  Track capture throughput
  +------------------+
`}</DiagramBlock>

        <h3 className="text-lg font-medium text-text-primary">Event Types</h3>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex accepts eight event types, each representing a different kind of agent interaction.
          The event type determines how the payload is interpreted during compilation.
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">message</code>
            <span className="text-text-tertiary">Conversational messages between user and agent. Contains role and content.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">tool_call</code>
            <span className="text-text-tertiary">Tool invocations by the agent. Records tool name and input parameters.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">tool_result</code>
            <span className="text-text-tertiary">Results returned from tool execution. Captures output and status.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">file_edit</code>
            <span className="text-text-tertiary">File system modifications. Tracks path, diff, and action type.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">test_run</code>
            <span className="text-text-tertiary">Test suite execution results. Records pass/fail counts and suite name.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">command_exec</code>
            <span className="text-text-tertiary">Shell command executions. Captures command, exit code, and output.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">browser_action</code>
            <span className="text-text-tertiary">Browser automation actions. Records URL, action type, and selector.</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">api_result</code>
            <span className="text-text-tertiary">External API call results. Tracks endpoint, method, status, and response.</span>
          </div>
        </div>

        <h3 className="text-lg font-medium text-text-primary">Idempotency and Deduplication</h3>
        <p className="text-text-secondary leading-relaxed">
          Events can include an <code className="text-accent-cyan text-sm">idempotencyKey</code> field. This key is used
          as the BullMQ job ID, so submitting the same event twice with the same idempotency key is
          a no-op. The second submission returns the result from the first. This is essential for
          at-least-once delivery semantics in distributed agent systems.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Batch Processing</h3>
        <p className="text-text-secondary leading-relaxed">
          The batch endpoint accepts up to 1,000 events per request. Each event is validated independently.
          Valid events are queued even if some fail validation. The response includes per-event error
          details for any rejected events. A batch ID groups all events from the same request.
        </p>
      </section>

      {/* Memory Compilation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Memory Compilation</h2>
        <p className="text-text-secondary leading-relaxed">
          The Memory Compiler transforms raw events into structured knowledge. This is the core
          intelligence of Hippocortex. Compilation runs asynchronously, triggered
          by <code className="text-accent-cyan text-sm">POST /v1/learn</code> requests.
        </p>

        <DiagramBlock title="Compilation Pipeline">{`
  POST /v1/learn
       |
       v
  +--------------------+
  | Learn Queue (Bull) |
  +--------+-----------+
           |
           v
  +--------------------+
  | Compilation Worker |
  |                    |
  | Phase 1: COLLECT   |  Fetch unprocessed events from Postgres
  |   |                |  Group by session and agent
  |   v                |
  | Phase 2: ANALYZE   |  Pattern extraction
  |   |                |  - Sequence analysis (task schemas)
  |   |                |  - Failure correlation (playbooks)
  |   |                |  - Causal inference (patterns)
  |   |                |  - Decision extraction (policies)
  |   v                |
  | Phase 3: COMPILE   |  Transform patterns into artifacts
  |   |                |  - Merge with existing artifacts
  |   |                |  - Version tracking
  |   |                |  - Confidence scoring
  |   v                |
  | Phase 4: PERSIST   |  Write artifacts to Postgres
  |                    |  Update semantic memory index
  +--------------------+
`}</DiagramBlock>

        <h3 className="text-lg font-medium text-text-primary">Artifact Types</h3>
        <p className="text-text-secondary leading-relaxed">
          The compiler produces four types of knowledge artifacts, each serving a different purpose
          in agent reasoning:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2">
            <h4 className="text-base font-semibold text-accent-cyan">Task Schema</h4>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Learned procedures and step sequences for recurring tasks. Extracted by analyzing
              successful tool call chains across sessions. Contains ordered steps, preconditions,
              expected outputs, and common variations.
            </p>
          </div>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2">
            <h4 className="text-base font-semibold text-accent-cyan">Failure Playbook</h4>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Error patterns and recovery strategies compiled from past failures. Built by correlating
              error events with subsequent recovery actions. Contains error signatures, root causes,
              and proven remediation steps.
            </p>
          </div>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2">
            <h4 className="text-base font-semibold text-accent-cyan">Causal Pattern</h4>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Cause-and-effect relationships identified across sessions. Discovered through temporal
              and contextual analysis of event sequences. Captures triggers, conditions, and outcomes.
            </p>
          </div>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2">
            <h4 className="text-base font-semibold text-accent-cyan">Decision Policy</h4>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Decision criteria and preferences extracted from agent behavior. Identifies choice
              points where agents consistently select specific approaches. Contains decision
              contexts, options evaluated, and rationale.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-medium text-text-primary">Compilation Modes</h3>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Incremental (default)</h4>
            <p className="text-sm text-text-tertiary mt-1">
              Processes only events captured since the last compilation run. Efficient for regular
              updates. New patterns are merged with existing artifacts, updating confidence scores
              and evidence counts.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Full</h4>
            <p className="text-sm text-text-tertiary mt-1">
              Reprocesses all events from scratch. Useful after schema changes, major data imports,
              or when artifacts need complete reconstruction. More resource-intensive but produces
              the most accurate artifacts.
            </p>
          </div>
        </div>
      </section>

      {/* Context Synthesis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Context Synthesis</h2>
        <p className="text-text-secondary leading-relaxed">
          Context synthesis is the retrieval phase. Given a query (typically the current user message or task),
          the synthesizer searches across all memory layers, retrieves relevant entries, and packs them
          within a specified token budget. The result is a compressed context pack ready for injection
          into an LLM prompt.
        </p>

        <DiagramBlock title="Synthesis Pipeline">{`
  POST /v1/synthesize
  { query: "deploy payment service", maxTokens: 4000 }
       |
       v
  +---------------------+
  | Synthesis Engine     |
  |                      |
  | 1. SEARCH            |  Semantic search over memories
  |    - Vector search   |  pgvector similarity search
  |    - Keyword match   |  Full-text search fallback
  |    - Recent recall   |  Time-weighted recency
  |                      |
  | 2. RETRIEVE          |  Fetch matching artifacts
  |    - Active only     |  Filter by is_active flag
  |    - Relevance rank  |  Score by query similarity
  |    - Top-K selection |  Limit to most relevant
  |                      |
  | 3. PACK              |  Token-budgeted assembly
  |    - Priority sort   |  Highest confidence first
  |    - Token counting  |  ~4 chars per token estimate
  |    - Budget check    |  Stop when limit reached
  |    - Drop overflow   |  Track entriesDropped
  |                      |
  | 4. RETURN            |  Context pack response
  |    - sections[]      |  Array of context entries
  |    - totalTokens     |  Actual tokens consumed
  |    - contextPack     |  Budget summary
  +---------------------+
`}</DiagramBlock>

        <h3 className="text-lg font-medium text-text-primary">Reasoning Sections</h3>
        <p className="text-text-secondary leading-relaxed">
          Synthesized context is organized into reasoning sections, each serving a specific purpose
          in agent decision-making:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">procedures</code>
            <span className="text-text-tertiary">Known steps and workflows for the task at hand.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">failures</code>
            <span className="text-text-tertiary">Past failure patterns and how they were resolved.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">decisions</code>
            <span className="text-text-tertiary">Previous decision contexts and outcomes.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">facts</code>
            <span className="text-text-tertiary">Established facts and domain knowledge.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">causal</code>
            <span className="text-text-tertiary">Cause-and-effect relationships relevant to the query.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">context</code>
            <span className="text-text-tertiary">General contextual information from past sessions.</span>
          </div>
        </div>

        <h3 className="text-lg font-medium text-text-primary">Token Budget Management</h3>
        <p className="text-text-secondary leading-relaxed">
          The synthesizer uses a token estimation model (approximately 4 characters per token) to pack
          entries within the specified budget. Entries are prioritized by confidence score and relevance
          to the query. When the budget is exhausted, remaining entries are dropped and counted
          in <code className="text-accent-cyan text-sm">entriesDropped</code>. The compression ratio indicates how much
          source content was condensed into the output.
        </p>
      </section>

      {/* Knowledge Lifecycle */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Knowledge Lifecycle</h2>
        <p className="text-text-secondary leading-relaxed">
          Artifacts follow a lifecycle that reflects their relevance and usage over time. This ensures
          the knowledge base stays current while preserving historical context.
        </p>

        <DiagramBlock title="Artifact Lifecycle">{`
  +--------+     compilation      +--------+
  | Events | ------------------> | ACTIVE |
  +--------+                     +---+----+
                                     |
                     superseded by   |   no longer matches
                     newer version   |   current patterns
                                     |
                                +----v-------+
                                | DEPRECATED |
                                +----+-------+
                                     |
                                     |  retention period
                                     |  expires
                                     |
                                +----v-------+
                                | ARCHIVED   |
                                +------------+

  Status Meanings:
  ACTIVE       - Currently used in synthesis. Returned by queries.
  DEPRECATED   - Superseded or outdated. Not used in synthesis.
  ARCHIVED     - Retained for audit. Not queryable.
`}</DiagramBlock>

        <h3 className="text-lg font-medium text-text-primary">Versioning</h3>
        <p className="text-text-secondary leading-relaxed">
          Artifacts are versioned. Each compilation run can update existing artifacts by merging
          new evidence. The version counter increments on each update. When an artifact is fundamentally
          restructured (e.g., a task schema gains new steps), the old version is deprecated and a new
          artifact is created. Source events and memories are tracked for full provenance.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Confidence Scoring</h3>
        <p className="text-text-secondary leading-relaxed">
          Every artifact carries a confidence score between 0.0 and 1.0. Confidence is computed from
          the evidence count (how many source events support the pattern), consistency (how reliably
          the pattern appears), and recency (more recent evidence carries higher weight). The
          <code className="text-accent-cyan text-sm ml-1">minPatternStrength</code> parameter in the learn API
          controls the minimum confidence threshold for artifact creation.
        </p>
      </section>

      {/* Predictive Context Assembly */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Predictive Context Assembly</h2>
        <p className="text-text-secondary leading-relaxed">
          Beyond reactive retrieval, Hippocortex supports predictive context assembly. By analyzing
          the current session&apos;s event sequence, the system can anticipate what knowledge the agent
          will need next and pre-assemble relevant context. This reduces synthesis latency for
          common workflows.
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-tertiary">
            <strong className="text-text-primary">Example:</strong> If the agent is in the middle of a deployment workflow
            and has already executed steps 1-3 of a known task schema, the system can pre-load the
            failure playbooks for steps 4-5, so the agent has recovery strategies ready if something
            goes wrong.
          </p>
        </div>
      </section>

      {/* Memory Fingerprints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Memory Fingerprints</h2>
        <p className="text-text-secondary leading-relaxed">
          Memory fingerprints enable cross-agent knowledge transfer. When an artifact is compiled,
          a content-based fingerprint is generated. This fingerprint can be used to identify equivalent
          knowledge across different agent instances or tenants (with explicit permission).
        </p>
        <p className="text-text-secondary leading-relaxed">
          Use cases include: sharing best practices across a team of agents, bootstrapping a new agent
          with proven task schemas from an experienced agent, and detecting knowledge drift between
          agent versions.
        </p>
      </section>

      {/* Infrastructure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Infrastructure</h2>

        <DiagramBlock title="Infrastructure Stack">{`
  +------------------------------------------------------------------+
  |                        Load Balancer / CDN                        |
  +------+----------------------------+------------------------------+
         |                            |
  +------v------+              +------v------+
  |  Hono API   |              |  Hono API   |      Stateless API
  |  Instance 1 |              |  Instance 2 |      servers
  +------+------+              +------+------+
         |                            |
         +------------+---------------+
                      |
         +------------v---------------+
         |      Redis (Upstash)       |
         |                            |
         |  - BullMQ job queues       |     Job queuing and
         |  - Rate limit counters     |     rate limiting
         |  - Session cache           |
         +------------+---------------+
                      |
         +------------v---------------+
         |   PostgreSQL (Neon)        |
         |                            |
         |  - events table            |     Primary data store
         |  - semantic_memories       |     with pgvector
         |  - artifacts table         |     extension
         |  - tenants, users          |
         |  - api_keys, billing       |
         |  - pgvector indexes        |
         +----------------------------+
`}</DiagramBlock>

        <h3 className="text-lg font-medium text-text-primary">PostgreSQL (Neon)</h3>
        <p className="text-text-secondary leading-relaxed">
          The primary data store. All events, memories, artifacts, and tenant data are stored in
          PostgreSQL with the pgvector extension for semantic search. Neon provides serverless
          PostgreSQL with autoscaling, branching, and point-in-time recovery. Connection pooling
          is managed at the application level with configurable pool sizes.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Redis (Upstash)</h3>
        <p className="text-text-secondary leading-relaxed">
          Used for job queuing (BullMQ), rate limiting, and ephemeral caching. Upstash Redis provides
          a serverless Redis instance with built-in persistence. The health endpoint monitors Redis
          memory usage, persistence status (AOF), and maxmemory policy (should be noeviction for
          queue data safety).
        </p>

        <h3 className="text-lg font-medium text-text-primary">Hono API Server</h3>
        <p className="text-text-secondary leading-relaxed">
          The API layer is built on Hono, a lightweight web framework. Hono provides minimal overhead
          and runs on multiple runtimes (Node.js, Deno, Bun, Cloudflare Workers). The API is stateless
          with all state persisted in PostgreSQL and Redis, enabling horizontal scaling.
        </p>

        <h3 className="text-lg font-medium text-text-primary">BullMQ Workers</h3>
        <p className="text-text-secondary leading-relaxed">
          Background workers process capture and learn jobs from Redis queues. Workers run as
          separate processes and can be scaled independently. Two queue types exist:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
          <div className="grid grid-cols-[140px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">capture queue</code>
            <span className="text-text-tertiary">Processes individual and batch capture events. Persists to PostgreSQL, assigns salience scores.</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-3">
            <code className="font-mono text-accent-cyan">learn queue</code>
            <span className="text-text-tertiary">Runs compilation jobs. Analyzes events, extracts patterns, creates/updates artifacts.</span>
          </div>
        </div>
      </section>

      {/* Multi-Tenant Isolation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Multi-Tenant Isolation</h2>
        <p className="text-text-secondary leading-relaxed">
          Every API request is authenticated and scoped to a tenant. Tenant isolation is enforced at
          multiple levels to prevent cross-tenant data access:
        </p>
        <ul className="space-y-2 text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">API Layer:</strong> Bearer token authentication resolves to a tenant ID. All subsequent
            operations are scoped to this tenant.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Database Layer:</strong> All queries include a <code className="text-accent-cyan text-sm">tenant_id</code> WHERE clause.
            There are no admin endpoints that bypass tenant scoping.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Queue Layer:</strong> Job payloads include the tenant ID, ensuring workers process events
            in the correct tenant context.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            <strong className="text-text-primary">Search Layer:</strong> Semantic search is filtered by tenant ID before similarity matching,
            so results from other tenants are never returned.
          </li>
        </ul>
      </section>

      {/* Authentication */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Authentication Architecture</h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex supports two authentication methods:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">API Keys (Bearer Token)</h4>
            <p className="text-sm text-text-tertiary mt-1">
              Used for programmatic access. Keys are generated per-tenant with configurable permissions
              (read, write, admin). The raw key is shown once at creation. Server-side, keys are
              hashed with SHA-256 before storage. Keys come in two modes: <code className="text-accent-cyan">hx_live_*</code> for
              production and <code className="text-accent-amber">hx_test_*</code> for development.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">JWT (Dashboard)</h4>
            <p className="text-sm text-text-tertiary mt-1">
              Used for dashboard access. Access tokens (1 hour TTL) and refresh tokens (7 day TTL)
              are issued on login. Passwords are hashed with Argon2id. Rate limiting is applied
              per-email for login and registration attempts (5 attempts per 15 minutes).
            </p>
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Monitoring and Alerting</h2>
        <p className="text-text-secondary leading-relaxed">
          The system exposes comprehensive health and metrics endpoints. The health check reports
          subsystem status for PostgreSQL, Redis, and worker queues. Internal metrics collectors
          track capture throughput, synthesis latency, and queue backlog depth.
        </p>

        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
          <div className="grid grid-cols-[200px_1fr] gap-3">
            <span className="text-text-primary font-medium">Health endpoint</span>
            <span className="text-text-tertiary">GET /v1/health reports postgres, redis, worker, and alert status.</span>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-3">
            <span className="text-text-primary font-medium">Prometheus metrics</span>
            <span className="text-text-tertiary">Internal Prometheus endpoint for scraping capture rates and latencies.</span>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-3">
            <span className="text-text-primary font-medium">Alert engine</span>
            <span className="text-text-tertiary">Configurable alerting for queue backlog, error rates, and system degradation.</span>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-3">
            <span className="text-text-primary font-medium">Backpressure</span>
            <span className="text-text-tertiary">Queue depth monitoring with automatic worker scaling signals.</span>
          </div>
        </div>
      </section>

      {/* Data Flow Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">End-to-End Data Flow</h2>

        <DiagramBlock title="Complete Data Flow">{`
  1. CAPTURE
     Agent SDK ---> API ---> Redis Queue ---> Worker ---> PostgreSQL
                    202                                   (events table)

  2. LEARN
     API ---> Redis Queue ---> Compiler Worker
              202              |
                               +--> Analyze events
                               +--> Extract patterns
                               +--> Create/update artifacts ---> PostgreSQL
                               |                                 (artifacts)
                               +--> Update semantic memories --> PostgreSQL
                                                                 (memories)

  3. SYNTHESIZE
     API ---> Semantic Search (pgvector) ---> Artifact Lookup
     200      |                               |
              +--> Rank by relevance          +--> Filter active
              +--> Token budget packing       +--> Merge into sections
              |
              +--> Return context pack
                   { sections[], totalTokens, contextPack }

  4. USE
     Agent receives context pack
     +--> Inject into system prompt
     +--> LLM generates response with memory context
     +--> Capture response event (back to step 1)
`}</DiagramBlock>
      </section>
    </div>
  )
}
