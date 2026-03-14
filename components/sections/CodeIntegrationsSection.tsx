'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

const tabs = [
  {
    id: 'openai',
    label: 'OpenAI Agents',
    shortLabel: 'OpenAI',
    filename: 'openai-agents.ts',
    code: `import { AgentMemory } from "@hippocortex/sdk"
import { Agent } from "@openai/agents"

const memory = new AgentMemory({ apiKey: "hx_live_..." })

const agent = new Agent({
  name: "deploy-agent",
  async beforeRun(ctx) {
    const context = await memory.synthesize(ctx.input, { budget: 4000 })
    ctx.systemPrompt += \`\\n\\nMemory:\\n\${context.text}\`
  },
  async afterRun(ctx) {
    memory.capture({ type: "run", payload: ctx.result })
    await memory.learn()
  }
})`,
  },
  {
    id: 'langgraph',
    label: 'LangGraph',
    shortLabel: 'LGraph',
    filename: 'langgraph.py',
    code: `from hippocortex import AgentMemory
from langgraph.graph import StateGraph

memory = AgentMemory(api_key="hx_live_...")

def memory_node(state):
    ctx = memory.synthesize(state["input"], budget=4000)
    state["memory"] = ctx.text
    return state

def capture_node(state):
    memory.capture(type="message", payload={
        "input": state["input"],
        "output": state["output"]
    })
    memory.learn()
    return state

graph = StateGraph()
graph.add_node("memory", memory_node)
graph.add_node("agent", agent_node)
graph.add_node("capture", capture_node)`,
  },
  {
    id: 'crewai',
    label: 'CrewAI',
    shortLabel: 'Crew',
    filename: 'crewai-memory.py',
    code: `from hippocortex import AgentMemory
from crewai import Agent, Task, Crew

memory = AgentMemory(api_key="hx_live_...")

researcher = Agent(
    role="Researcher",
    backstory=memory.synthesize("researcher role").text,
    allow_delegation=False
)

task = Task(
    description="Research deployment best practices",
    agent=researcher,
    callback=lambda result: memory.capture(
        type="task_result", payload={"result": str(result)}
    )
)

crew = Crew(agents=[researcher], tasks=[task])
crew.kickoff()
memory.learn()`,
  },
  {
    id: 'openclaw',
    label: 'OpenClaw',
    shortLabel: 'OClaw',
    filename: 'openclaw-skill.ts',
    code: `import { AgentMemory } from "@hippocortex/sdk"

const memory = new AgentMemory({ apiKey: "hx_live_..." })

// Before agent processes a message
export async function beforeMessage(input: string) {
  const context = await memory.synthesize(input, { budget: 4000 })
  return { systemContext: context.text }
}

// After agent responds
export async function afterMessage(input: string, output: string) {
  memory.capture({
    type: "conversation",
    payload: { input, output, timestamp: Date.now() }
  })
  await memory.learn({ scope: "session" })
}`,
  },
  {
    id: 'autogen',
    label: 'AutoGen',
    shortLabel: 'AGen',
    filename: 'autogen-memory.py',
    code: `from hippocortex import AgentMemory
from autogen import AssistantAgent, UserProxyAgent

memory = AgentMemory(api_key="hx_live_...")

assistant = AssistantAgent(
    name="assistant",
    system_message=memory.synthesize("assistant role").text
)

user_proxy = UserProxyAgent(name="user_proxy")

def on_message(sender, message, recipient, **kwargs):
    memory.capture(
        type="message",
        payload={"sender": sender.name, "content": message}
    )
    return message

assistant.register_hook("process_message_before_send", on_message)
user_proxy.initiate_chat(assistant, message="Deploy to staging")
memory.learn()`,
  },
]

function CopyButton({ text, size = 'sm' }: { text: string; size?: 'sm' | 'md' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`transition-colors cursor-pointer ${
        copied ? 'text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
      } ${size === 'md' ? 'text-sm' : 'text-xs'}`}
      aria-label="Copy code"
    >
      {copied ? '✓ Copied' : '⎘'}
    </button>
  )
}

export function CodeIntegrationsSection() {
  const [activeTab, setActiveTab] = useState('openai')
  const [installCopied, setInstallCopied] = useState(false)

  const activeTabData = tabs.find((t) => t.id === activeTab)!

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @hippocortex/sdk')
    setInstallCopied(true)
    setTimeout(() => setInstallCopied(false), 2000)
  }

  return (
    <section
      id="integrations"
      className="relative bg-bg-raised"
      aria-labelledby="integrations-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            INTEGRATIONS
          </span>
          <h2
            id="integrations-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Works With Every Framework
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            Three function calls. Any language. Any framework.
            Drop in Hippocortex without rewriting your agent.
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
              <div className="flex overflow-x-auto border-b border-border-subtle" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
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
                <CopyButton text={activeTabData.code} size="sm" />
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
              {['OpenAI Agents SDK', 'LangGraph', 'CrewAI', 'OpenClaw', 'AutoGen', 'Custom Frameworks', 'Python', 'Node.js', 'REST API'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-xs font-medium text-text-tertiary bg-bg-overlay border border-border-medium rounded-full hover:border-border-strong hover:text-text-secondary transition-all"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="neural-line" />
    </section>
  )
}
