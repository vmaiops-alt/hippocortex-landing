import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference - Hippocortex Docs',
  description: 'Complete REST API reference for Hippocortex. Every endpoint documented with request/response schemas and curl examples.',
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

function MethodBadge({ method }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' }) {
  const colors = {
    GET: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    POST: 'bg-accent-violet/10 text-accent-violet border-accent-violet/20',
    PUT: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
    DELETE: 'bg-accent-rose/10 text-accent-rose border-accent-rose/20',
  }
  return (
    <span className={`inline-block text-xs font-mono font-bold px-2 py-0.5 rounded border ${colors[method]}`}>
      {method}
    </span>
  )
}

function Endpoint({ method, path, children }: { method: 'GET' | 'POST'; path: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 pb-10 border-b border-border-subtle last:border-0">
      <div className="flex items-center gap-3">
        <MethodBadge method={method} />
        <code className="text-lg font-mono text-text-primary">{path}</code>
      </div>
      {children}
    </div>
  )
}

function StatusCode({ code, description }: { code: number; description: string }) {
  const color = code < 300 ? 'text-accent-cyan' : code < 400 ? 'text-accent-amber' : 'text-accent-rose'
  return (
    <div className="flex items-center gap-3 text-sm">
      <code className={`font-mono font-bold ${color}`}>{code}</code>
      <span className="text-text-tertiary">{description}</span>
    </div>
  )
}

export default function APIPage() {
  return (
    <div className="space-y-14">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-3">API Reference</h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[680px]">
          Complete REST API documentation for Hippocortex. All endpoints require authentication and
          return JSON responses.
        </p>
      </div>

      {/* Base URL and Auth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Base URL</h2>
        <CodeBlock>{`https://api.hippocortex.dev/v1`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Authentication</h2>
        <p className="text-text-secondary leading-relaxed">
          All API requests require a Bearer token in the <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">Authorization</code> header.
          Use your API key directly as the Bearer token.
        </p>

        <CodeBlock title="Authorization Header">{`Authorization: Bearer hx_live_abc123...`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">API Key Formats</h3>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-cyan">hx_live_*</code>
            <span className="text-text-tertiary">Production keys. Use for live applications. Events are persisted and processed.</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-amber">hx_test_*</code>
            <span className="text-text-tertiary">Test keys. Use for development and testing. Events are processed but may have separate quotas.</span>
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed">
          API keys support scoped permissions (read, write, admin) configured at creation time.
          Keys are hashed server-side and cannot be retrieved after initial generation. Rotation is
          supported without downtime by creating a new key before revoking the old one.
        </p>
      </section>

      {/* Response Format */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Response Format</h2>
        <p className="text-text-secondary leading-relaxed">
          All responses follow a consistent envelope format. Successful responses have <code className="text-accent-cyan text-sm">ok: true</code> with
          data in the <code className="text-accent-cyan text-sm">data</code> field. Error responses have <code className="text-accent-cyan text-sm">ok: false</code> with
          error details. Every response includes a <code className="text-accent-cyan text-sm">meta</code> object with request tracking information.
        </p>

        <CodeBlock title="Success Response">{`{
  "ok": true,
  "data": { ... },
  "meta": {
    "requestId": "req_abc123",
    "tenantId": "ten_xyz789",
    "durationMs": 42
  }
}`}</CodeBlock>

        <CodeBlock title="Error Response">{`{
  "ok": false,
  "error": {
    "code": "validation_error",
    "message": "type is required and must be a string",
    "details": [
      { "field": "type" }
    ]
  },
  "meta": {
    "requestId": "req_abc123",
    "tenantId": "ten_xyz789",
    "durationMs": 5
  }
}`}</CodeBlock>
      </section>

      {/* Rate Limiting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Rate Limiting</h2>
        <p className="text-text-secondary leading-relaxed">
          API requests are rate-limited per API key and per tenant. When you exceed the rate limit,
          the API responds with HTTP <code className="text-accent-cyan text-sm">429</code> and
          a <code className="text-accent-cyan text-sm">Retry-After</code> header indicating how many seconds to wait before retrying.
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-[160px_1fr] gap-2 text-sm">
            <span className="text-text-primary font-medium">Free tier</span>
            <span className="text-text-tertiary">60 requests per minute per key</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-2 text-sm">
            <span className="text-text-primary font-medium">Developer tier</span>
            <span className="text-text-tertiary">300 requests per minute per key</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-2 text-sm">
            <span className="text-text-primary font-medium">Pro tier</span>
            <span className="text-text-tertiary">1,000 requests per minute per key</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-2 text-sm">
            <span className="text-text-primary font-medium">Enterprise</span>
            <span className="text-text-tertiary">Custom limits, configurable per key</span>
          </div>
        </div>
      </section>

      {/* Idempotency */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Idempotency</h2>
        <p className="text-text-secondary leading-relaxed">
          The <code className="text-accent-cyan text-sm">POST /v1/capture</code> and <code className="text-accent-cyan text-sm">POST /v1/capture/batch</code> endpoints
          support idempotency keys. Include an <code className="text-accent-cyan text-sm">idempotencyKey</code> field in your event payload
          to prevent duplicate processing. If a request with the same idempotency key has already been
          processed, the API returns the original result without re-processing.
        </p>
      </section>

      {/* Endpoints */}
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold text-text-primary">Endpoints</h2>

        {/* POST /v1/capture */}
        <Endpoint method="POST" path="/v1/capture">
          <p className="text-text-secondary leading-relaxed">
            Capture a single agent event. The event is validated and queued for asynchronous processing
            via Redis/BullMQ workers. Returns immediately with a <code className="text-accent-cyan text-sm">202</code> status and a job reference.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Request Headers</h4>
          <CodeBlock>{`Authorization: Bearer hx_live_...
Content-Type: application/json`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Request Body</h4>
          <CodeBlock title="application/json">{`{
  "type": "message",
  "sessionId": "sess-001",
  "payload": {
    "role": "user",
    "content": "Deploy the payment service"
  },
  "metadata": {
    "agentId": "deploy-bot",
    "source": "api"
  },
  "idempotencyKey": "idem-abc123"
}`}</CodeBlock>

          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">type</span>
              <span className="text-accent-rose text-xs">required</span>
              <span className="text-text-tertiary">Event type: message, tool_call, tool_result, file_edit, test_run, command_exec, browser_action, api_result</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">sessionId</span>
              <span className="text-accent-rose text-xs">required</span>
              <span className="text-text-tertiary">Session identifier grouping related events</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">payload</span>
              <span className="text-accent-rose text-xs">required</span>
              <span className="text-text-tertiary">Event-specific data object</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">metadata</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Arbitrary metadata (agentId, source, etc.)</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">idempotencyKey</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Unique key for deduplication</span>
            </div>
          </div>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="202 Accepted">{`{
  "ok": true,
  "data": {
    "jobId": "job_abc123",
    "status": "queued",
    "idempotencyKey": "idem-abc123"
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 12
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={202} description="Event accepted and queued for processing." />
            <StatusCode code={401} description="Invalid or missing API key." />
            <StatusCode code={422} description="Invalid request body or missing required fields." />
            <StatusCode code={429} description="Rate limit exceeded." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl -X POST https://api.hippocortex.dev/v1/capture \\
  -H "Authorization: Bearer hx_live_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "message",
    "sessionId": "sess-001",
    "payload": {"role": "user", "content": "Deploy to staging"}
  }'`}</CodeBlock>
        </Endpoint>

        {/* POST /v1/capture/batch */}
        <Endpoint method="POST" path="/v1/capture/batch">
          <p className="text-text-secondary leading-relaxed">
            Capture multiple events in a single request. Maximum batch size is <strong className="text-text-primary">1,000 events</strong>.
            Events are validated individually. Valid events are queued even if some fail validation.
            Returns a <code className="text-accent-cyan text-sm">202</code> with a batch summary.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Request Body</h4>
          <CodeBlock title="application/json">{`{
  "events": [
    {
      "type": "message",
      "sessionId": "sess-001",
      "payload": {"role": "user", "content": "Hello"}
    },
    {
      "type": "tool_call",
      "sessionId": "sess-001",
      "payload": {"tool_name": "search", "input": "query string"}
    }
  ]
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="202 Accepted">{`{
  "ok": true,
  "data": {
    "batchId": "batch_xyz",
    "queued": 2,
    "errors": 0,
    "total": 2
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 28
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={202} description="Batch accepted. Check response for per-event errors." />
            <StatusCode code={401} description="Invalid or missing API key." />
            <StatusCode code={422} description="events field missing or not an array, or batch exceeds 1,000 events." />
            <StatusCode code={429} description="Rate limit exceeded." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl -X POST https://api.hippocortex.dev/v1/capture/batch \\
  -H "Authorization: Bearer hx_live_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "events": [
      {"type": "message", "sessionId": "s1", "payload": {"role": "user", "content": "Hi"}},
      {"type": "message", "sessionId": "s1", "payload": {"role": "assistant", "content": "Hello!"}}
    ]
  }'`}</CodeBlock>
        </Endpoint>

        {/* POST /v1/synthesize */}
        <Endpoint method="POST" path="/v1/synthesize">
          <p className="text-text-secondary leading-relaxed">
            Synthesize compressed context from semantic memories and compiled artifacts. This is a synchronous
            endpoint that returns results immediately. The response contains context entries packed within the
            specified token budget, prioritized by relevance to the query.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Request Body</h4>
          <CodeBlock title="application/json">{`{
  "query": "deploy payment service",
  "agentId": "ops-agent",
  "maxTokens": 4000,
  "includeArtifacts": true,
  "includeMemories": true,
  "tags": ["deployment", "payments"]
}`}</CodeBlock>

          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">query</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Semantic search query. If omitted, returns the most recent memories and artifacts.</span>
            </div>
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">agentId</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Filter to a specific agent&apos;s memory.</span>
            </div>
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">maxTokens</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Token budget for the response. Defaults to 4000.</span>
            </div>
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">includeArtifacts</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Include compiled artifacts. Defaults to true.</span>
            </div>
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">includeMemories</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Include raw semantic memories. Defaults to true.</span>
            </div>
            <div className="grid grid-cols-[170px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">tags</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Filter memories by tags (array of strings).</span>
            </div>
          </div>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="200 OK">{`{
  "ok": true,
  "data": {
    "sections": [
      {
        "type": "memory",
        "content": "Payment service deployment requires staging validation...",
        "source": "mem_abc123",
        "confidence": 0.87
      },
      {
        "type": "artifact",
        "content": "Task schema: deploy-payment-service...",
        "source": "art_xyz789"
      }
    ],
    "totalTokens": 1842,
    "query": "deploy payment service",
    "contextPack": {
      "entries": 5,
      "estimatedTokens": 1842,
      "maxTokens": 4000
    }
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 156
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={200} description="Context synthesized successfully." />
            <StatusCode code={401} description="Invalid or missing API key." />
            <StatusCode code={429} description="Rate limit exceeded." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl -X POST https://api.hippocortex.dev/v1/synthesize \\
  -H "Authorization: Bearer hx_live_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "deploy payment service", "maxTokens": 4000}'`}</CodeBlock>
        </Endpoint>

        {/* POST /v1/learn */}
        <Endpoint method="POST" path="/v1/learn">
          <p className="text-text-secondary leading-relaxed">
            Trigger an asynchronous compilation job that processes captured events into semantic memories
            and compiled knowledge artifacts. The job runs in the background via BullMQ workers.
            Returns immediately with a <code className="text-accent-cyan text-sm">202</code> and a job reference.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Request Body</h4>
          <CodeBlock title="application/json">{`{
  "agentId": "ops-agent",
  "sessionId": "sess-001",
  "eventIds": ["evt_1", "evt_2"],
  "options": {
    "maxEvents": 500,
    "artifactType": "task_schema"
  }
}`}</CodeBlock>

          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">agentId</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Scope compilation to a specific agent.</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">sessionId</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Scope compilation to a specific session.</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">eventIds</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Compile only specific events by ID.</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">options.maxEvents</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Maximum number of events to process in this run.</span>
            </div>
            <div className="grid grid-cols-[150px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">options.artifactType</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Restrict output to a specific artifact type.</span>
            </div>
          </div>

          <p className="text-sm text-text-tertiary">
            All fields are optional. An empty request body processes all unprocessed events for the tenant.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="202 Accepted">{`{
  "ok": true,
  "data": {
    "jobId": "job_learn_abc123",
    "status": "queued"
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 8
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={202} description="Compilation job queued successfully." />
            <StatusCode code={401} description="Invalid or missing API key." />
            <StatusCode code={429} description="Rate limit exceeded." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl -X POST https://api.hippocortex.dev/v1/learn \\
  -H "Authorization: Bearer hx_live_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{}'`}</CodeBlock>
        </Endpoint>

        {/* GET /v1/artifacts */}
        <Endpoint method="GET" path="/v1/artifacts">
          <p className="text-text-secondary leading-relaxed">
            List compiled knowledge artifacts for the authenticated tenant. Supports filtering by type,
            offset-based pagination, and a configurable page size (max 100).
          </p>

          <h4 className="text-base font-semibold text-text-primary">Query Parameters</h4>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-2 text-sm">
            <div className="grid grid-cols-[120px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">type</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Filter by artifact type: task_schema, failure_playbook, causal_pattern, decision_policy</span>
            </div>
            <div className="grid grid-cols-[120px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">limit</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Page size (1 to 100). Defaults to 50.</span>
            </div>
            <div className="grid grid-cols-[120px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">offset</span>
              <span className="text-text-muted text-xs">optional</span>
              <span className="text-text-tertiary">Number of items to skip. Defaults to 0.</span>
            </div>
          </div>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="200 OK">{`{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "art_abc123",
        "type": "task_schema",
        "title": "Payment Service Deployment",
        "version": 3,
        "tokenCount": 450,
        "isActive": true,
        "compiledAt": "2026-03-14T10:30:00Z",
        "createdAt": "2026-03-10T08:00:00Z"
      }
    ],
    "total": 42,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 35
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={200} description="Artifacts listed successfully." />
            <StatusCode code={401} description="Invalid or missing API key." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl https://api.hippocortex.dev/v1/artifacts?type=task_schema&limit=10 \\
  -H "Authorization: Bearer hx_live_abc123"`}</CodeBlock>
        </Endpoint>

        {/* GET /v1/artifacts/:id */}
        <Endpoint method="GET" path="/v1/artifacts/:id">
          <p className="text-text-secondary leading-relaxed">
            Retrieve a single compiled artifact by its ID. Returns the full artifact including content,
            source references, and metadata.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Path Parameters</h4>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 text-sm">
            <div className="grid grid-cols-[80px_100px_1fr] gap-2">
              <span className="font-mono text-text-primary">id</span>
              <span className="text-accent-rose text-xs">required</span>
              <span className="text-text-tertiary">The artifact ID (e.g. art_abc123)</span>
            </div>
          </div>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="200 OK">{`{
  "ok": true,
  "data": {
    "id": "art_abc123",
    "type": "task_schema",
    "title": "Payment Service Deployment",
    "content": { "steps": [...], "preconditions": [...] },
    "version": 3,
    "tokenCount": 450,
    "sourceEvents": ["evt_1", "evt_2", "evt_3"],
    "sourceMemories": ["mem_1", "mem_2"],
    "metadata": { "compiledBy": "compiler-v2" },
    "isActive": true,
    "compiledAt": "2026-03-14T10:30:00Z",
    "createdAt": "2026-03-10T08:00:00Z",
    "updatedAt": "2026-03-14T10:30:00Z"
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 18
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={200} description="Artifact retrieved successfully." />
            <StatusCode code={401} description="Invalid or missing API key." />
            <StatusCode code={404} description="Artifact not found." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl https://api.hippocortex.dev/v1/artifacts/art_abc123 \\
  -H "Authorization: Bearer hx_live_abc123"`}</CodeBlock>
        </Endpoint>

        {/* GET /v1/usage-metrics */}
        <Endpoint method="GET" path="/v1/usage-metrics">
          <p className="text-text-secondary leading-relaxed">
            Retrieve usage statistics and quota information for the authenticated tenant. Includes event counts,
            compilation activity, synthesis usage, and remaining quota.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="200 OK">{`{
  "ok": true,
  "data": {
    "plan": "developer",
    "period": {
      "month": "2026-03",
      "day": "2026-03-14"
    },
    "usage": {
      "eventsThisMonth": 12450,
      "synthesesToday": 84,
      "compilationsToday": 3,
      "requestsThisMinute": 12
    },
    "totals": {
      "events": 45230,
      "memories": 8120,
      "artifacts": 156
    }
  },
  "meta": {
    "requestId": "req_xyz",
    "tenantId": "ten_123",
    "durationMs": 45
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={200} description="Metrics retrieved successfully." />
            <StatusCode code={401} description="Invalid or missing API key." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl https://api.hippocortex.dev/v1/usage-metrics \\
  -H "Authorization: Bearer hx_live_abc123"`}</CodeBlock>
        </Endpoint>

        {/* GET /v1/health */}
        <Endpoint method="GET" path="/v1/health">
          <p className="text-text-secondary leading-relaxed">
            System health check endpoint. Returns the status of all subsystems including PostgreSQL,
            Redis, worker queues, and active alerts. Does not require authentication.
          </p>

          <h4 className="text-base font-semibold text-text-primary">Response</h4>
          <CodeBlock title="200 OK">{`{
  "ok": true,
  "data": {
    "status": "healthy",
    "version": "1.1.0",
    "uptime": 86400,
    "timestamp": "2026-03-14T10:00:00Z",
    "subsystems": {
      "postgres": {
        "status": "healthy",
        "connections": {
          "total": 5,
          "idle": 3,
          "waiting": 0,
          "max": 20,
          "utilizationPercent": 25
        }
      },
      "redis": {
        "status": "healthy",
        "latencyMs": 1,
        "persistence": {
          "aof_enabled": true,
          "rdb_last_save_time": 1710410400
        },
        "memory": {
          "used_memory_mb": 128,
          "maxmemory_mb": 512,
          "maxmemory_policy": "noeviction"
        }
      },
      "workers": {
        "status": "healthy",
        "queues": {
          "capture": { "waiting": 0, "active": 2, "failed": 0 },
          "learn": { "waiting": 0, "active": 0, "failed": 0 }
        },
        "totalBacklog": 0
      }
    },
    "alerts": {
      "firing": 0
    }
  }
}`}</CodeBlock>

          <h4 className="text-base font-semibold text-text-primary">Status Codes</h4>
          <div className="space-y-1">
            <StatusCode code={200} description="All systems healthy." />
            <StatusCode code={503} description="One or more subsystems are degraded or unhealthy." />
          </div>

          <h4 className="text-base font-semibold text-text-primary">curl Example</h4>
          <CodeBlock title="curl">{`curl https://api.hippocortex.dev/v1/health`}</CodeBlock>
        </Endpoint>
      </section>
    </div>
  )
}
