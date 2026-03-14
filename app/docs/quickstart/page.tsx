import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quickstart - Hippocortex Docs',
  description: 'Get started with Hippocortex in 5 minutes. Install the SDK, capture events, and synthesize context for your AI agents.',
}

function CodeBlock({ children, language = 'typescript' }: { children: string; language?: string }) {
  return (
    <pre className="bg-bg-void border border-border-subtle rounded-xl p-5 overflow-x-auto text-sm leading-relaxed">
      <code className="font-mono text-text-secondary">{children}</code>
    </pre>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-semibold border border-accent-cyan/20 mr-3">
      {n}
    </span>
  )
}

export default function QuickstartPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-3">Quickstart</h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[680px]">
          Get Hippocortex running in under 5 minutes. By the end of this guide, your agent will be
          capturing events, compiling knowledge, and synthesizing context.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Prerequisites</h2>
        <ul className="space-y-2 text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            Node.js 18+ or Python 3.9+
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-1">&#8226;</span>
            A Hippocortex account (sign up at{' '}
            <a href="https://dashboard.hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              dashboard.hippocortex.dev
            </a>)
          </li>
        </ul>
      </section>

      {/* Step 1 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={1} />
          Create Your Account and API Key
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Head to{' '}
          <a href="https://dashboard.hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            dashboard.hippocortex.dev
          </a>{' '}
          and create an account. Once registered, navigate to <strong className="text-text-primary">Settings &gt; API Keys</strong> and
          generate a new key. You will receive a key in the format <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">hx_live_...</code> for
          production or <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">hx_test_...</code> for development.
        </p>
        <div className="bg-bg-surface border border-accent-amber/20 rounded-lg p-4">
          <p className="text-sm text-accent-amber">
            <strong>Important:</strong> Store your API key securely. It will only be shown once. Use environment variables,
            never hardcode keys in source files.
          </p>
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={2} />
          Install the SDK
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Install the Hippocortex SDK in your project:
        </p>

        <h3 className="text-lg font-medium text-text-primary">TypeScript / JavaScript</h3>
        <CodeBlock language="bash">{`npm install @hippocortex/sdk`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">Python</h3>
        <CodeBlock language="bash">{`pip install hippocortex`}</CodeBlock>
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={3} />
          Initialize the Client
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Create a client instance with your API key. We recommend setting the key via the
          <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm ml-1">HIPPOCORTEX_API_KEY</code> environment variable.
        </p>

        <h3 className="text-lg font-medium text-text-primary">TypeScript</h3>
        <CodeBlock>{`import { Hippocortex } from '@hippocortex/sdk';

const hx = new Hippocortex({
  apiKey: process.env.HIPPOCORTEX_API_KEY!,
  // baseUrl defaults to https://api.hippocortex.dev/v1
  // timeoutMs defaults to 30000
});`}</CodeBlock>

        <h3 className="text-lg font-medium text-text-primary">Python</h3>
        <CodeBlock language="python">{`from hippocortex import Hippocortex

hx = Hippocortex(api_key="hx_live_...")

# Or use the sync client for non-async contexts:
from hippocortex import SyncHippocortex
hx = SyncHippocortex(api_key="hx_live_...")`}</CodeBlock>
      </section>

      {/* Step 4 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={4} />
          Capture Your First Event
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Events are the raw input to Hippocortex. Every agent interaction (messages, tool calls,
          file edits, command executions) can be captured as an event. The API queues events
          asynchronously and returns a <code className="text-accent-cyan bg-bg-surface px-1.5 py-0.5 rounded text-sm">202</code> response immediately.
        </p>

        <CodeBlock>{`// Capture a user message
const result = await hx.capture({
  type: 'message',
  sessionId: 'session-001',
  payload: {
    role: 'user',
    content: 'Deploy the payment service to staging',
  },
});

console.log(result);
// { eventId: 'evt_...', status: 'ingested' }`}</CodeBlock>

        <CodeBlock>{`// Capture a tool call
await hx.capture({
  type: 'tool_call',
  sessionId: 'session-001',
  payload: {
    tool_name: 'deploy',
    input: '{"service": "payments", "env": "staging"}',
  },
  metadata: {
    agentId: 'ops-agent-1',
  },
});`}</CodeBlock>
      </section>

      {/* Step 5 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={5} />
          Trigger Learning
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Once you have captured enough events, trigger the Memory Compiler. This processes raw
          events into semantic memories and compiles them into reusable knowledge artifacts such as
          task schemas, failure playbooks, causal patterns, and decision policies.
        </p>

        <CodeBlock>{`const learnResult = await hx.learn({
  scope: 'incremental', // or 'full' for complete recompilation
});

console.log(learnResult);
// {
//   runId: 'run_...',
//   status: 'completed',
//   artifacts: { created: 3, updated: 1, unchanged: 12 },
//   stats: { memoriesProcessed: 47, patternsFound: 8, compilationMs: 1250 }
// }`}</CodeBlock>

        <div className="bg-bg-surface border border-border-subtle rounded-lg p-4">
          <p className="text-sm text-text-secondary">
            <strong className="text-text-primary">Tip:</strong> Use <code className="text-accent-cyan">incremental</code> scope
            for regular updates (processes only new events since the last run).
            Use <code className="text-accent-cyan">full</code> for complete recompilation when you want to rebuild all artifacts from scratch.
          </p>
        </div>
      </section>

      {/* Step 6 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={6} />
          Synthesize Context
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Synthesize retrieves relevant memories and artifacts for a given query, packed within
          a token budget. Use the result to enrich your agent&apos;s system prompt with experience-based context.
        </p>

        <CodeBlock>{`const context = await hx.synthesize('deploy payment service', {
  maxTokens: 4000,
  sections: ['procedures', 'failures', 'decisions'],
  minConfidence: 0.5,
  includeProvenance: true,
});

console.log(context.entries.length);   // Number of context entries
console.log(context.budget.used);      // Tokens consumed
console.log(context.budget.compressionRatio); // Compression achieved

// Each entry has:
// - section: 'procedures' | 'failures' | 'decisions' | ...
// - content: the synthesized text
// - confidence: 0.0 to 1.0
// - provenance: source references (optional)`}</CodeBlock>
      </section>

      {/* Step 7 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <StepNumber n={7} />
          Use in Your Agent Loop
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Integrate Hippocortex into your agent&apos;s message loop. Capture events as they happen,
          and synthesize context before each LLM call to give your agent experiential knowledge.
        </p>

        <CodeBlock>{`async function agentLoop(userMessage: string) {
  const sessionId = 'session-' + Date.now();

  // 1. Capture the user message
  await hx.capture({
    type: 'message',
    sessionId,
    payload: { role: 'user', content: userMessage },
  });

  // 2. Synthesize relevant context from past experience
  const context = await hx.synthesize(userMessage, {
    maxTokens: 4000,
  });

  // 3. Build system prompt with memory context
  const memoryBlock = context.entries
    .map(e => \`[\${e.section}] \${e.content}\`)
    .join('\\n\\n');

  const systemPrompt = [
    'You are a helpful agent.',
    '',
    '# Memory Context',
    memoryBlock,
  ].join('\\n');

  // 4. Call your LLM with enriched context
  const response = await callLLM(systemPrompt, userMessage);

  // 5. Capture the response
  await hx.capture({
    type: 'message',
    sessionId,
    payload: { role: 'assistant', content: response },
  });

  return response;
}`}</CodeBlock>
      </section>

      {/* Auto-memory adapter */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Using the Auto-Memory Adapter</h2>
        <p className="text-text-secondary leading-relaxed">
          For a simpler integration, use the OpenClaw adapter. It handles capture and synthesis
          automatically with a clean message-oriented API.
        </p>

        <CodeBlock>{`import { autoMemory } from '@hippocortex/sdk/adapters';

const memory = autoMemory({
  apiKey: process.env.HIPPOCORTEX_API_KEY!,
  injectMemory: true,
  captureMessages: true,
  captureTools: true,
});

// On user message: captures + returns context string
const context = await memory.onMessage(userMessage, 'user');
if (context) {
  systemPrompt = context + '\\n\\n' + systemPrompt;
}

// After generating response: captures it
await memory.onResponse(assistantResponse);

// On tool calls and results:
await memory.onToolCall('deploy', { service: 'payments' });
await memory.onToolResult('deploy', 'Deployed successfully');`}</CodeBlock>
      </section>

      {/* Next steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/docs/sdk"
            className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-accent-cyan/20 transition-all"
          >
            <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
              SDK Reference <span className="opacity-0 group-hover:opacity-100 transition-opacity">&#8594;</span>
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">Full TypeScript and Python SDK documentation with all methods and types.</p>
          </a>
          <a
            href="/docs/api"
            className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-accent-cyan/20 transition-all"
          >
            <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
              API Reference <span className="opacity-0 group-hover:opacity-100 transition-opacity">&#8594;</span>
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">REST API docs with request schemas, response formats, and curl examples.</p>
          </a>
          <a
            href="/docs/architecture"
            className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-accent-cyan/20 transition-all"
          >
            <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
              Architecture Guide <span className="opacity-0 group-hover:opacity-100 transition-opacity">&#8594;</span>
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">Deep dive into the memory pipeline, compilation engine, and infrastructure.</p>
          </a>
          <a
            href="https://github.com/hippocortex/hippocortex-os"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-accent-cyan/20 transition-all"
          >
            <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
              GitHub <span className="opacity-0 group-hover:opacity-100 transition-opacity">&#8594;</span>
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">Open-source SDK clients, example integrations, and community contributions.</p>
          </a>
        </div>
      </section>
    </div>
  )
}
