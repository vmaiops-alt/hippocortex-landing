'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

const tabs = [
  {
    id: 'quickstart',
    label: 'Quick Start',
    shortLabel: 'QStart',
    filename: 'quick-start.ts',
    code: `import { Hippocortex } from '@hippocortex/sdk';

const hx = new Hippocortex({ apiKey: 'hx_live_...' });

// Your agent does something
await hx.capture({
  type: 'message',
  sessionId: 'sess-1',
  payload: { role: 'user', content: 'Deploy payments to staging' }
});

// Learn from accumulated experience
await hx.learn();

// Next time: compressed context from real experience
const ctx = await hx.synthesize('deploy payments');
// → Procedures, failure warnings, preferences`,
  },
  {
    id: 'openai',
    label: 'OpenAI Agents',
    shortLabel: 'AI',
    filename: 'openai-agents.ts',
    code: `import { Hippocortex } from '@hippocortex/sdk';
import { Agent } from '@openai/agents';

const hx = new Hippocortex({ apiKey: 'hx_live_...' });

const agent = new Agent({
  name: 'deploy-agent',
  async beforeRun(ctx) {
    // Synthesize relevant memory before each run
    const memory = await hx.synthesize(ctx.input, { budget: 4000 });
    ctx.systemPrompt += \`\\n\\nMemory:\\n\${memory.text}\`;
  },
  async afterRun(ctx) {
    // Capture what happened
    await hx.capture({ type: 'run', sessionId: ctx.sessionId, payload: ctx.result });
    await hx.learn();
  }
});`,
  },
  {
    id: 'langgraph',
    label: 'LangGraph',
    shortLabel: 'LG',
    filename: 'langgraph.py',
    code: `from hippocortex import Hippocortex
from langgraph.graph import StateGraph

hx = Hippocortex(api_key="hx_live_...")

def memory_node(state):
    # Synthesize context from past experience
    ctx = hx.synthesize(state["input"], budget=4000)
    state["memory"] = ctx.text
    return state

def capture_node(state):
    # Capture the interaction
    hx.capture(type="message", session_id=state["session_id"],
               payload={"input": state["input"], "output": state["output"]})
    hx.learn()
    return state

graph = StateGraph()
graph.add_node("memory", memory_node)
graph.add_node("agent", agent_node)
graph.add_node("capture", capture_node)`,
  },
]

const frameworkBadges = [
  'OpenAI Agents SDK',
  'LangGraph',
  'CrewAI',
  'AutoGen',
  'Custom Frameworks',
  'Python',
  'Node.js',
]

export function DeveloperSection() {
  const [activeTab, setActiveTab] = useState('quickstart')
  const [installCopied, setInstallCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  const activeTabData = tabs.find((t) => t.id === activeTab)!

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @hippocortex/sdk')
    setInstallCopied(true)
    setTimeout(() => setInstallCopied(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeTabData.code)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  return (
    <section
      id="developer"
      className="relative bg-bg-raised"
      aria-labelledby="developer-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            INTEGRATION
          </span>
          <h2
            id="developer-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Working Memory in 10 Minutes
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Install the SDK. Add three function calls. Your agent has persistent memory
            that learns from every session. Works with any framework — no rewrites required.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 max-w-[1000px] mx-auto">
            {/* Install command */}
            <button
              onClick={handleCopyInstall}
              className="w-full text-left bg-bg-surface border border-border-subtle rounded-[10px] px-5 py-3.5 font-mono text-[15px] cursor-pointer hover:border-border-medium transition-colors group relative"
              aria-label="Copy install command"
            >
              <span className="text-accent-cyan">$ </span>
              <span className="text-text-primary">npm install @hippocortex/sdk</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-cyan transition-colors text-sm">
                {installCopied ? '✓ Copied' : '⎘'}
              </span>
            </button>

            {/* Code block with tabs */}
            <div className="mt-8 border border-border-subtle rounded-xl overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-border-subtle" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'text-text-primary border-accent-cyan'
                        : 'text-text-muted border-transparent hover:text-text-secondary'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </button>
                ))}
              </div>

              {/* File header */}
              <div className="flex items-center justify-between bg-bg-raised px-6 py-2.5 border-b border-border-subtle">
                <span className="text-xs font-mono text-text-muted">
                  {activeTabData.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className={`text-xs transition-colors cursor-pointer ${
                    codeCopied
                      ? 'text-accent-cyan'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                  aria-label="Copy code"
                >
                  {codeCopied ? '✓' : '⎘'}
                </button>
              </div>

              {/* Code content */}
              <div className="bg-bg-surface p-6 overflow-x-auto" role="tabpanel">
                <pre className="text-[14px] md:text-[15px] font-mono text-text-secondary leading-[1.65]">
                  <code>{activeTabData.code}</code>
                </pre>
              </div>
            </div>

            {/* Framework badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {frameworkBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-xs font-medium text-text-tertiary bg-bg-overlay border border-border-medium rounded-full hover:border-border-strong hover:text-text-secondary hover:shadow-[0_0_12px_rgba(0,229,204,0.06)] transition-all"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={300} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="https://dashboard.hippocortex.dev" variant="primary">
            Get Started — Free
          </Button>
          <Button href="https://docs.hippocortex.dev/api" variant="text" external>
            Full SDK Reference →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
