import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SDK Reference - Hippocortex Docs',
  description: 'Complete TypeScript and Python SDK reference for Hippocortex. Every method, parameter, and return type documented.',
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

function TypeDef({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
      <h4 className="text-base font-semibold text-accent-cyan font-mono">{name}</h4>
      {children}
    </div>
  )
}

function PropRow({ name, type, required, description }: { name: string; type: string; required?: boolean; description: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-border-subtle last:border-0">
      <div className="flex items-center gap-2 sm:w-[200px] shrink-0">
        <code className="text-sm font-mono text-text-primary">{name}</code>
        {required && <span className="text-[10px] font-medium text-accent-rose bg-accent-rose/10 px-1.5 py-0.5 rounded">required</span>}
      </div>
      <code className="text-xs font-mono text-accent-violet sm:w-[180px] shrink-0">{type}</code>
      <span className="text-sm text-text-tertiary">{description}</span>
    </div>
  )
}

export default function SDKPage() {
  return (
    <div className="space-y-14">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-3">SDK Reference</h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[680px]">
          Complete reference for the Hippocortex SDK. Available for TypeScript/JavaScript and Python.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Installation</h2>

        <h3 className="text-lg font-medium text-text-primary">TypeScript / JavaScript</h3>
        <CodeBlock>{`npm install @hippocortex/sdk
# or
yarn add @hippocortex/sdk
# or
pnpm add @hippocortex/sdk`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">Python</h3>
        <CodeBlock>{`pip install hippocortex
# or
poetry add hippocortex`}</CodeBlock>
      </section>

      {/* Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Configuration</h2>
        <p className="text-text-secondary leading-relaxed">
          The SDK client is configured through the <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">HippocortexConfig</code> object
          (TypeScript) or constructor arguments (Python).
        </p>

        <TypeDef name="HippocortexConfig">
          <PropRow name="apiKey" type="string" required description="Your API key. Starts with hx_live_ (production) or hx_test_ (development). Get one at dashboard.hippocortex.dev." />
          <PropRow name="baseUrl" type="string" description="API base URL. Defaults to https://api.hippocortex.dev/v1. Override for self-hosted deployments." />
          <PropRow name="timeoutMs" type="number" description="Request timeout in milliseconds. Defaults to 30000 (30 seconds)." />
        </TypeDef>

        <CodeBlock title="TypeScript">{`import { Hippocortex } from '@hippocortex/sdk';

const hx = new Hippocortex({
  apiKey: 'hx_live_abc123...',
  baseUrl: 'https://api.hippocortex.dev/v1', // optional
  timeoutMs: 30000,                           // optional
});`}</CodeBlock>

        <CodeBlock title="Python">{`from hippocortex import Hippocortex

hx = Hippocortex(
    api_key="hx_live_abc123...",
    base_url="https://api.hippocortex.dev/v1",  # optional
    timeout=30.0,                                # optional, seconds
)`}</CodeBlock>
      </section>

      {/* Hippocortex Class */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-text-primary">Hippocortex Class</h2>
        <p className="text-text-secondary leading-relaxed">
          The main client class. All methods are async. In Python, a synchronous wrapper is available
          via <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">SyncHippocortex</code>.
        </p>

        {/* capture */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">capture(event)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Capture a single agent event into Hippocortex memory. Events are queued asynchronously
            for processing. The API returns a <code className="text-accent-cyan text-sm">202</code> immediately after accepting the event.
          </p>
          <p className="text-text-secondary leading-relaxed">
            If an <code className="text-accent-cyan text-sm">idempotencyKey</code> is provided in the event metadata, duplicate
            submissions with the same key will be detected and skipped.
          </p>

          <TypeDef name="CaptureEvent">
            <PropRow name="type" type="CaptureEventType" required description="The event type. One of: message, tool_call, tool_result, file_edit, test_run, command_exec, browser_action, api_result." />
            <PropRow name="sessionId" type="string" required description="Session identifier grouping related events. Use a consistent ID for events that belong to the same agent conversation or task." />
            <PropRow name="payload" type="Record<string, unknown>" required description="Event-specific data. Structure depends on the event type (see event types below)." />
            <PropRow name="metadata" type="Record<string, unknown>" description="Optional metadata such as agentId, source, environment, or custom fields." />
          </TypeDef>

          <h4 className="text-base font-semibold text-text-primary">Event Types</h4>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">message</code>
              <span className="text-text-tertiary">User or assistant messages. Payload: <code className="text-accent-violet">{'{ role, content }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">tool_call</code>
              <span className="text-text-tertiary">Agent tool invocations. Payload: <code className="text-accent-violet">{'{ tool_name, input }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">tool_result</code>
              <span className="text-text-tertiary">Tool execution results. Payload: <code className="text-accent-violet">{'{ tool_name, output }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">file_edit</code>
              <span className="text-text-tertiary">File modifications. Payload: <code className="text-accent-violet">{'{ path, diff, action }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">test_run</code>
              <span className="text-text-tertiary">Test execution results. Payload: <code className="text-accent-violet">{'{ suite, passed, failed }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">command_exec</code>
              <span className="text-text-tertiary">Shell command executions. Payload: <code className="text-accent-violet">{'{ command, exitCode, output }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">browser_action</code>
              <span className="text-text-tertiary">Browser automation actions. Payload: <code className="text-accent-violet">{'{ url, action, selector }'}</code></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">api_result</code>
              <span className="text-text-tertiary">External API call results. Payload: <code className="text-accent-violet">{'{ url, method, status, body }'}</code></span>
            </div>
          </div>

          <TypeDef name="CaptureResult">
            <PropRow name="eventId" type="string" description="Unique identifier for the captured event." />
            <PropRow name="status" type="'ingested' | 'duplicate'" description="Whether the event was newly ingested or detected as a duplicate." />
            <PropRow name="salienceScore" type="number" description="Optional relevance score (0 to 1) assigned during ingestion." />
            <PropRow name="traceId" type="string" description="Optional trace identifier for request tracking." />
            <PropRow name="reason" type="string" description="Optional explanation when the event is flagged or deduplicated." />
          </TypeDef>

          <CodeBlock title="Example">{`const result = await hx.capture({
  type: 'message',
  sessionId: 'sess-42',
  payload: { role: 'user', content: 'Deploy to staging' },
  metadata: { agentId: 'deploy-bot' },
});
// => { eventId: 'evt_...', status: 'ingested' }`}</CodeBlock>
        </div>

        {/* captureBatch */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">captureBatch(events)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Capture multiple events in a single HTTP request. Accepts an array of <code className="text-accent-cyan text-sm">CaptureEvent</code> objects.
            Maximum batch size is <strong className="text-text-primary">1000 events</strong>. Events are validated individually; valid events
            are queued even if some fail validation.
          </p>

          <TypeDef name="BatchCaptureResult">
            <PropRow name="results" type="CaptureResult[]" description="Individual result for each successfully queued event." />
            <PropRow name="summary.total" type="number" description="Total number of events in the batch." />
            <PropRow name="summary.ingested" type="number" description="Number of events successfully ingested." />
            <PropRow name="summary.duplicates" type="number" description="Number of duplicate events detected." />
            <PropRow name="summary.errors" type="number" description="Number of events that failed validation." />
          </TypeDef>

          <CodeBlock title="Example">{`const result = await hx.captureBatch([
  { type: 'message', sessionId: 's1', payload: { role: 'user', content: 'Hello' } },
  { type: 'tool_call', sessionId: 's1', payload: { tool_name: 'search', input: 'query' } },
  { type: 'tool_result', sessionId: 's1', payload: { tool_name: 'search', output: 'results...' } },
]);
// => { results: [...], summary: { total: 3, ingested: 3, duplicates: 0, errors: 0 } }`}</CodeBlock>
        </div>

        {/* learn */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">learn(options?)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Trigger the Memory Compiler to process accumulated events into semantic memories and
            compile them into reusable knowledge artifacts. Returns a <code className="text-accent-cyan text-sm">202</code> with
            a job reference; compilation runs asynchronously.
          </p>

          <TypeDef name="LearnOptions">
            <PropRow name="scope" type="'full' | 'incremental'" description="Compilation scope. 'incremental' processes only events since the last run. 'full' recompiles everything from scratch. Defaults to 'incremental'." />
            <PropRow name="minPatternStrength" type="number" description="Minimum pattern strength threshold (0 to 1). Patterns below this confidence are discarded. Useful for filtering noise." />
            <PropRow name="artifactTypes" type="ArtifactType[]" description="Which artifact types to extract. Options: task_schema, failure_playbook, causal_pattern, decision_policy. Defaults to all types." />
          </TypeDef>

          <h4 className="text-base font-semibold text-text-primary">Artifact Types</h4>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
            <div className="grid grid-cols-[180px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">task_schema</code>
              <span className="text-text-tertiary">Learned procedures and step sequences for recurring tasks.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">failure_playbook</code>
              <span className="text-text-tertiary">Error patterns and recovery strategies compiled from past failures.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">causal_pattern</code>
              <span className="text-text-tertiary">Cause-and-effect relationships identified across sessions.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-2 text-sm">
              <code className="font-mono text-accent-cyan">decision_policy</code>
              <span className="text-text-tertiary">Decision criteria and preferences extracted from agent behavior.</span>
            </div>
          </div>

          <TypeDef name="LearnResult">
            <PropRow name="runId" type="string" description="Unique identifier for this compilation run." />
            <PropRow name="status" type="'completed' | 'partial' | 'failed'" description="Outcome of the compilation job." />
            <PropRow name="artifacts.created" type="number" description="Number of new artifacts created." />
            <PropRow name="artifacts.updated" type="number" description="Number of existing artifacts updated with new evidence." />
            <PropRow name="artifacts.unchanged" type="number" description="Number of artifacts that remained unchanged." />
            <PropRow name="artifacts.byType" type="Record<string, number>" description="Artifact counts grouped by type." />
            <PropRow name="stats.memoriesProcessed" type="number" description="Total memories processed during compilation." />
            <PropRow name="stats.patternsFound" type="number" description="Number of patterns identified." />
            <PropRow name="stats.compilationMs" type="number" description="Total compilation time in milliseconds." />
          </TypeDef>

          <CodeBlock title="Example">{`// Incremental compilation (default)
const result = await hx.learn();

// Full recompilation with filters
const result = await hx.learn({
  scope: 'full',
  minPatternStrength: 0.7,
  artifactTypes: ['task_schema', 'failure_playbook'],
});`}</CodeBlock>
        </div>

        {/* synthesize */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">synthesize(query, options?)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Synthesize compressed context from all memory layers for a given query. Returns relevant
            memories and artifacts packed within a token budget. This is the primary retrieval method
            for enriching agent prompts with experiential knowledge.
          </p>

          <TypeDef name="SynthesizeOptions">
            <PropRow name="maxTokens" type="number" description="Token budget for the output. Defaults to 4000. Entries are prioritized by relevance and packed until the budget is exhausted." />
            <PropRow name="sections" type="ReasoningSection[]" description="Which reasoning sections to include. Options: procedures, failures, decisions, facts, causal, context. Defaults to all." />
            <PropRow name="minConfidence" type="number" description="Minimum confidence threshold (0 to 1). Entries below this score are excluded. Defaults to 0.3." />
            <PropRow name="includeProvenance" type="boolean" description="Whether to attach source references to each entry. Defaults to true." />
          </TypeDef>

          <TypeDef name="SynthesizeResult">
            <PropRow name="packId" type="string" description="Unique identifier for this context pack." />
            <PropRow name="entries" type="SynthesisEntry[]" description="Array of context entries, sorted by relevance." />
            <PropRow name="budget.limit" type="number" description="Token budget that was requested." />
            <PropRow name="budget.used" type="number" description="Tokens actually consumed." />
            <PropRow name="budget.compressionRatio" type="number" description="Ratio of original content to compressed output." />
            <PropRow name="budget.entriesIncluded" type="number" description="Number of entries included in the pack." />
            <PropRow name="budget.entriesDropped" type="number" description="Number of entries dropped due to budget constraints." />
          </TypeDef>

          <TypeDef name="SynthesisEntry">
            <PropRow name="section" type="ReasoningSection" description="Which reasoning section this entry belongs to." />
            <PropRow name="content" type="string" description="The synthesized content text." />
            <PropRow name="confidence" type="number" description="Confidence score from 0.0 to 1.0." />
            <PropRow name="provenance" type="ProvenanceRef[]" description="Optional array of source references for traceability." />
          </TypeDef>

          <TypeDef name="ProvenanceRef">
            <PropRow name="sourceType" type="string" description="Type of the source (e.g. 'memory', 'artifact')." />
            <PropRow name="sourceId" type="string" description="ID of the source entity." />
            <PropRow name="artifactType" type="string" description="If source is an artifact, which type it is." />
            <PropRow name="evidenceCount" type="number" description="Number of evidence items supporting this reference." />
          </TypeDef>

          <CodeBlock title="Example">{`const ctx = await hx.synthesize('deploy payment service', {
  maxTokens: 4000,
  sections: ['procedures', 'failures'],
  minConfidence: 0.5,
  includeProvenance: true,
});

for (const entry of ctx.entries) {
  console.log(\`[\${entry.section}] (confidence: \${entry.confidence})\`);
  console.log(entry.content);
}`}</CodeBlock>
        </div>

        {/* listArtifacts */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">listArtifacts(options?)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            List compiled knowledge artifacts with filtering, sorting, and cursor-based pagination.
          </p>

          <TypeDef name="ArtifactListOptions">
            <PropRow name="type" type="ArtifactType" description="Filter by artifact type: task_schema, failure_playbook, causal_pattern, or decision_policy." />
            <PropRow name="status" type="ArtifactStatus" description="Filter by status: active, deprecated, or superseded." />
            <PropRow name="sort" type="ArtifactSortField" description="Sort field: createdAt, updatedAt, confidence, or evidenceCount." />
            <PropRow name="order" type="'asc' | 'desc'" description="Sort order. Defaults to descending." />
            <PropRow name="limit" type="number" description="Maximum number of artifacts to return (max 100). Defaults to 50." />
            <PropRow name="cursor" type="string" description="Pagination cursor from a previous response for fetching the next page." />
          </TypeDef>

          <TypeDef name="ArtifactListResult">
            <PropRow name="artifacts" type="Artifact[]" description="Array of artifact objects." />
            <PropRow name="pagination.hasMore" type="boolean" description="Whether more results are available." />
            <PropRow name="pagination.cursor" type="string" description="Cursor to pass for the next page of results." />
            <PropRow name="pagination.total" type="number" description="Total number of matching artifacts." />
          </TypeDef>

          <CodeBlock title="Example">{`// List all active failure playbooks
const result = await hx.listArtifacts({
  type: 'failure_playbook',
  status: 'active',
  sort: 'confidence',
  order: 'desc',
  limit: 10,
});

// Paginate through results
let cursor: string | undefined;
do {
  const page = await hx.listArtifacts({ cursor });
  for (const artifact of page.artifacts) {
    console.log(artifact.title);
  }
  cursor = page.pagination.cursor;
} while (cursor);`}</CodeBlock>
        </div>

        {/* getArtifact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">getArtifact(id)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Retrieve a single compiled artifact by its ID. Returns the full artifact with content, metadata,
            and source references.
          </p>

          <TypeDef name="Artifact">
            <PropRow name="id" type="string" description="Unique artifact identifier." />
            <PropRow name="type" type="ArtifactType" description="Artifact type: task_schema, failure_playbook, causal_pattern, or decision_policy." />
            <PropRow name="status" type="ArtifactStatus" description="Current status: active, deprecated, or superseded." />
            <PropRow name="title" type="string" description="Human-readable title describing the artifact." />
            <PropRow name="content" type="Record<string, unknown>" description="The compiled knowledge content. Structure varies by artifact type." />
            <PropRow name="confidence" type="number" description="Overall confidence score (0 to 1) based on evidence strength." />
            <PropRow name="evidenceCount" type="number" description="Number of source events supporting this artifact." />
            <PropRow name="createdAt" type="string" description="ISO 8601 creation timestamp." />
            <PropRow name="updatedAt" type="string" description="ISO 8601 last-updated timestamp." />
          </TypeDef>
        </div>

        {/* getMetrics */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
            <code className="font-mono text-accent-cyan">getMetrics(options?)</code>
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Retrieve usage and performance metrics for your account. Useful for monitoring event volumes,
            compilation activity, synthesis usage, and quota consumption.
          </p>

          <TypeDef name="MetricsOptions">
            <PropRow name="period" type="'1h' | '24h' | '7d' | '30d'" description="Time period to aggregate metrics over." />
            <PropRow name="granularity" type="'minute' | 'hour' | 'day'" description="Granularity of the time series data." />
          </TypeDef>

          <TypeDef name="MetricsResult">
            <PropRow name="period.start" type="string" description="ISO 8601 start of the metrics period." />
            <PropRow name="period.end" type="string" description="ISO 8601 end of the metrics period." />
            <PropRow name="usage.events" type="object" description="Event ingestion stats: total, ingested, duplicates, errors, byType." />
            <PropRow name="usage.compilations" type="object" description="Compilation stats: total, artifactsCreated, artifactsUpdated." />
            <PropRow name="usage.syntheses" type="object" description="Synthesis stats: total, avgTokensUsed, avgCompressionRatio." />
            <PropRow name="quota.plan" type="string" description="Current plan name." />
            <PropRow name="quota.eventsLimit" type="number" description="Maximum events allowed in the billing period." />
            <PropRow name="quota.eventsUsed" type="number" description="Events consumed so far." />
            <PropRow name="quota.eventsRemaining" type="number" description="Events remaining in the current period." />
            <PropRow name="quota.resetDate" type="string" description="ISO 8601 date when the quota resets." />
          </TypeDef>

          <CodeBlock title="Example">{`const metrics = await hx.getMetrics({ period: '24h' });
console.log(\`Events today: \${metrics.usage.events.total}\`);
console.log(\`Quota remaining: \${metrics.quota.eventsRemaining}\`);`}</CodeBlock>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Error Handling</h2>
        <p className="text-text-secondary leading-relaxed">
          All API errors throw a <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">HippocortexError</code> (TypeScript)
          or raise a <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">HippocortexError</code> exception (Python).
        </p>

        <TypeDef name="HippocortexError">
          <PropRow name="code" type="string" description="Machine-readable error code (e.g. validation_error, unauthorized, rate_limited, not_found)." />
          <PropRow name="message" type="string" description="Human-readable error message." />
          <PropRow name="statusCode" type="number" description="HTTP status code of the response." />
          <PropRow name="details" type="unknown[]" description="Optional array of additional error details, e.g. field-level validation errors." />
        </TypeDef>

        <CodeBlock title="Error Handling Example">{`import { Hippocortex, HippocortexError } from '@hippocortex/sdk';

try {
  await hx.capture(event);
} catch (err) {
  if (err instanceof HippocortexError) {
    console.error(\`API error: \${err.code} (HTTP \${err.statusCode})\`);
    console.error(err.message);

    if (err.code === 'rate_limited') {
      // Back off and retry
    }
    if (err.code === 'validation_error') {
      console.error('Details:', err.details);
    }
  }
}`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">Common Error Codes</h3>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">validation_error</code>
            <span className="text-text-muted">422</span>
            <span className="text-text-tertiary">Invalid request body or missing required fields.</span>
          </div>
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">unauthorized</code>
            <span className="text-text-muted">401</span>
            <span className="text-text-tertiary">Invalid or missing API key.</span>
          </div>
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">rate_limited</code>
            <span className="text-text-muted">429</span>
            <span className="text-text-tertiary">Too many requests. Check Retry-After header.</span>
          </div>
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">not_found</code>
            <span className="text-text-muted">404</span>
            <span className="text-text-tertiary">Requested resource does not exist.</span>
          </div>
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">conflict</code>
            <span className="text-text-muted">409</span>
            <span className="text-text-tertiary">Resource already exists (e.g. duplicate account).</span>
          </div>
          <div className="grid grid-cols-[180px_60px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-rose">internal_error</code>
            <span className="text-text-muted">500</span>
            <span className="text-text-tertiary">Server-side error. Retry with exponential backoff.</span>
          </div>
        </div>
      </section>

      {/* Framework Adapters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Framework Adapters</h2>
        <p className="text-text-secondary leading-relaxed">
          The SDK includes pre-built adapters that simplify integration with agent frameworks. Adapters handle
          event capture and context injection automatically with a fire-and-forget design: they never block
          the agent, and all errors are swallowed with warnings.
        </p>

        <h3 className="text-lg font-medium text-text-primary">OpenClaw Adapter (TypeScript)</h3>
        <p className="text-text-secondary leading-relaxed">
          The OpenClaw adapter provides a message-oriented API with automatic memory injection.
        </p>

        <CodeBlock title="OpenClaw Adapter">{`import { autoMemory } from '@hippocortex/sdk/adapters';

const memory = autoMemory({
  apiKey: process.env.HIPPOCORTEX_API_KEY!,
  injectMemory: true,     // auto-synthesize context on user messages
  captureMessages: true,  // capture message events
  captureTools: true,     // capture tool call/result events
  sessionId: 'custom-id', // optional custom session ID
  timeoutMs: 10000,       // adapter uses a lower timeout (10s default)
});

// Check if the adapter has a valid API key
if (memory.enabled) {
  console.log(\`Session: \${memory.sessionId}\`);
}

// Process user message: captures + returns context
const context = await memory.onMessage('Deploy to staging', 'user');

// Process assistant response: captures it
await memory.onResponse('Deploying to staging now...');

// Capture tool interactions
await memory.onToolCall('kubectl', { command: 'apply -f deploy.yaml' });
await memory.onToolResult('kubectl', 'deployment.apps/payments created');

// Inject context into a messages array (prepends system message)
const enrichedMessages = await memory.injectIntoMessages(messages, query);`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">Python Adapters</h3>
        <p className="text-text-secondary leading-relaxed">
          Python adapters are available for popular agent frameworks:
        </p>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-cyan">LangGraph</code>
            <span className="text-text-tertiary">Integration with LangGraph agent workflows.</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-cyan">CrewAI</code>
            <span className="text-text-tertiary">Memory adapter for CrewAI multi-agent systems.</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-2 text-sm">
            <code className="font-mono text-accent-cyan">AutoGen</code>
            <span className="text-text-tertiary">Memory integration for Microsoft AutoGen agents.</span>
          </div>
        </div>

        <CodeBlock title="Python LangGraph Example">{`from hippocortex.adapters import LangGraphMemory

memory = LangGraphMemory(api_key="hx_live_...")

# Use as a LangGraph tool or callback
# See adapter documentation for framework-specific integration`}</CodeBlock>
      </section>

      {/* Python SDK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Python SDK</h2>
        <p className="text-text-secondary leading-relaxed">
          The Python SDK mirrors the TypeScript SDK with Pythonic naming conventions. It is async-first
          with a synchronous wrapper available.
        </p>

        <CodeBlock title="Python Async Client">{`from hippocortex import Hippocortex, CaptureEvent

async with Hippocortex(api_key="hx_live_...") as hx:
    # Capture an event
    result = await hx.capture(CaptureEvent(
        type="message",
        session_id="sess-1",
        payload={"role": "user", "content": "Hello"},
    ))

    # Trigger learning
    learn_result = await hx.learn()

    # Synthesize context
    ctx = await hx.synthesize("deployment procedures")

    # List artifacts
    artifacts = await hx.list_artifacts(type="task_schema")

    # Get metrics
    metrics = await hx.get_metrics(period="24h")`}</CodeBlock>

        <CodeBlock title="Python Sync Client">{`from hippocortex import SyncHippocortex, CaptureEvent

with SyncHippocortex(api_key="hx_live_...") as hx:
    result = hx.capture(CaptureEvent(
        type="message",
        session_id="sess-1",
        payload={"role": "user", "content": "Hello"},
    ))
    ctx = hx.synthesize("deployment procedures")`}</CodeBlock>
      </section>
    </div>
  )
}
