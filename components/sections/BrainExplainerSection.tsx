'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

interface NodeData {
  id: string
  label: string
  tagline: string
  description: string
  codeSnippet: string
  architectureRole: string
  color: string
}

const nodes: NodeData[] = [
  {
    id: 'capture',
    label: 'Capture',
    tagline: 'Ingest every agent event in real time',
    description:
      'Messages, tool calls, file edits, API responses — every interaction becomes a structured event with metadata, timestamps, and automatic salience scoring. Zero configuration required.',
    codeSnippet: `memory.capture({
  type: "tool_call",
  agent: "deploy-bot",
  payload: { fn: "deploy", target: "staging" }
})`,
    architectureRole: 'Event Ingestion Layer',
    color: '#00E5CC',
  },
  {
    id: 'learn',
    label: 'Learn',
    tagline: 'Extract patterns from accumulated experience',
    description:
      'The pattern extraction engine replays event traces, identifies recurring procedures, detects contradictions, and promotes high-confidence patterns to compiled knowledge artifacts.',
    codeSnippet: `await memory.learn({
  scope: "session",
  minConfidence: 0.7,
  extractors: ["procedures", "preferences"]
})`,
    architectureRole: 'Pattern Extraction Engine',
    color: '#8B5CF6',
  },
  {
    id: 'compile',
    label: 'Compile',
    tagline: 'Deterministic artifact compilation',
    description:
      'Turns raw patterns into typed artifacts — procedures, failure playbooks, causal chains, decision policies. Deterministic: same inputs produce identical artifacts every time.',
    codeSnippet: `const artifacts = await memory.compile({
  type: "procedure",
  topic: "deployment",
  sources: ["episodic", "semantic"]
})`,
    architectureRole: 'Memory Compiler',
    color: '#06B6D4',
  },
  {
    id: 'predict',
    label: 'Predict',
    tagline: 'Anticipate context needs proactively',
    description:
      'Predictive cache learns from agent access patterns and pre-warms relevant artifacts before queries arrive. Reduces synthesis latency for common reasoning paths.',
    codeSnippet: `memory.predict({
  agent: "deploy-bot",
  horizon: "next_action",
  warmCache: true
})`,
    architectureRole: 'Predictive Context Cache',
    color: '#F59E0B',
  },
  {
    id: 'transfer',
    label: 'Transfer',
    tagline: 'Share compiled knowledge across agents',
    description:
      'Cross-agent knowledge transfer via versioned artifact packs. Tenant-isolated with fine-grained access controls. One agent learns, all agents benefit.',
    codeSnippet: `await memory.transfer({
  from: "deploy-bot",
  to: "monitor-bot",
  artifacts: ["deployment-procedures"]
})`,
    architectureRole: 'Knowledge Transfer Protocol',
    color: '#A78BFA',
  },
  {
    id: 'synthesize',
    label: 'Synthesize',
    tagline: 'Assemble compressed reasoning context',
    description:
      'Queries all memory layers simultaneously, scores relevance, compresses aggressively, and assembles a provenance-tagged context packet optimized for your token budget.',
    codeSnippet: `const ctx = await memory.synthesize({
  query: "deploy payments to staging",
  budget: 4000,
  include: ["procedures", "failures"]
})`,
    architectureRole: 'Context Synthesizer',
    color: '#E8E8F0',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-[10px] text-text-muted hover:text-accent-cyan transition-colors cursor-pointer"
      aria-label="Copy code"
    >
      {copied ? '✓' : '⎘'}
    </button>
  )
}

function NodeCard({ node, isActive, onClick }: { node: NodeData; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left w-full rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-white/[0.05] border-white/[0.15] -translate-y-1 shadow-lg'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10]'
      }`}
      style={isActive ? { boxShadow: `0 0 32px ${node.color}15` } : undefined}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: node.color, boxShadow: `0 0 8px ${node.color}60` }}
        />
        <span className="text-[11px] font-mono tracking-[0.12em] uppercase" style={{ color: node.color }}>
          {node.label}
        </span>
        <span className="text-[10px] font-mono text-text-ghost ml-auto">
          {node.architectureRole}
        </span>
      </div>

      {/* Tagline */}
      <h3 className="text-[17px] font-semibold text-text-primary mb-2">{node.tagline}</h3>

      {/* Description */}
      <p className="text-sm text-text-tertiary leading-relaxed mb-4">{node.description}</p>

      {/* Code snippet */}
      <div className="relative bg-bg-void/80 rounded-lg px-4 py-3 overflow-x-auto">
        <div className="absolute top-2 right-2">
          <CopyButton text={node.codeSnippet} />
        </div>
        <pre className="text-[12px] font-mono leading-[1.6] text-accent-cyan whitespace-pre">
          {node.codeSnippet}
        </pre>
      </div>
    </button>
  )
}

export function BrainExplainerSection() {
  const [activeNode, setActiveNode] = useState<string>('capture')

  return (
    <section
      id="capabilities"
      className="relative bg-bg-raised"
      aria-labelledby="capabilities-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            THE MEMORY PIPELINE
          </span>
          <h2
            id="capabilities-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Six Stages of Agent Memory
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Each node in the brain represents a stage in the memory pipeline.
            Events flow through capture, learning, compilation, prediction, transfer, and synthesis.
          </p>
        </ScrollReveal>

        {/* Pipeline flow indicator */}
        <ScrollReveal delay={100}>
          <div className="hidden lg:flex items-center justify-center gap-2 mb-10">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveNode(node.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activeNode === node.id
                      ? 'bg-white/[0.08] border border-white/[0.15]'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                  style={activeNode === node.id ? { color: node.color } : undefined}
                >
                  {node.label}
                </button>
                {i < nodes.length - 1 && (
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="text-text-ghost">
                    <line x1="0" y1="4" x2="16" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                    <circle cx="18" cy="4" r="2" fill="currentColor" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Node cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {nodes.map((node, i) => (
            <ScrollReveal key={node.id} delay={i * 80}>
              <NodeCard
                node={node}
                isActive={activeNode === node.id}
                onClick={() => setActiveNode(node.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="neural-line" />
    </section>
  )
}
