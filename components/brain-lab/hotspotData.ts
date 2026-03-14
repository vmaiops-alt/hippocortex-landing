import * as THREE from 'three'

export interface HotspotDatum {
  id: string
  label: string
  tagline: string
  bullets: string[]
  codeSnippet?: string
  architectureRole?: string
  /** Model-space position on brain surface */
  position: THREE.Vector3
  /** Model-space surface normal at that vertex */
  normal: THREE.Vector3
  /** Preferred side for info card ('left' | 'right') */
  cardSide: 'left' | 'right'
}

/**
 * Six infrastructure nodes mapped to brain regions.
 * Positions tuned for default camera (position: [0, 0.15, 2.8], fov: 40).
 */
export const HOTSPOTS: HotspotDatum[] = [
  {
    id: 'capture',
    label: 'Capture',
    tagline: 'Ingest every agent event in real time',
    bullets: [
      'Messages, tool calls, file edits, API responses',
      '403 events/sec sustained ingestion',
      'Automatic dedup and salience scoring',
    ],
    codeSnippet: `memory.capture({
  type: "tool_call",
  agent: "deploy-bot",
  payload: { fn: "deploy", target: "staging" }
})`,
    architectureRole: 'Event Ingestion Layer',
    position: new THREE.Vector3(-0.35, 0.34, 0.72),
    normal: new THREE.Vector3(-0.37, 0.37, 0.77).normalize(),
    cardSide: 'left',
  },
  {
    id: 'learn',
    label: 'Learn',
    tagline: 'Extract patterns from accumulated experience',
    bullets: [
      'Promote recurring patterns to knowledge artifacts',
      'Detect contradictions and resolve conflicts',
      'Build task schemas from repeated procedures',
    ],
    codeSnippet: `await memory.learn({
  scope: "session",
  minConfidence: 0.7,
  extractors: ["procedures", "preferences"]
})`,
    architectureRole: 'Pattern Extraction Engine',
    position: new THREE.Vector3(-0.38, -0.15, 0.78),
    normal: new THREE.Vector3(-0.42, -0.17, 0.89).normalize(),
    cardSide: 'left',
  },
  {
    id: 'compile',
    label: 'Compile',
    tagline: 'Deterministic artifact compilation from raw memory',
    bullets: [
      'Procedures, failure playbooks, causal chains',
      'Decision policies with outcome tracking',
      'Same inputs → same artifacts, every time',
    ],
    codeSnippet: `const artifacts = await memory.compile({
  type: "procedure",
  topic: "deployment",
  sources: ["episodic", "semantic"]
})`,
    architectureRole: 'Memory Compiler',
    position: new THREE.Vector3(0.38, 0.42, 0.58),
    normal: new THREE.Vector3(0.47, 0.52, 0.71).normalize(),
    cardSide: 'right',
  },
  {
    id: 'predict',
    label: 'Predict',
    tagline: 'Anticipate context needs before queries arrive',
    bullets: [
      'Predictive cache warms relevant artifacts',
      'Pre-computed context packs for common patterns',
      'Adaptive learning from access patterns',
    ],
    codeSnippet: `memory.predict({
  agent: "deploy-bot",
  horizon: "next_action",
  warmCache: true
})`,
    architectureRole: 'Predictive Context Cache',
    position: new THREE.Vector3(0.02, 0.62, 0.48),
    normal: new THREE.Vector3(0.025, 0.79, 0.61).normalize(),
    cardSide: 'right',
  },
  {
    id: 'transfer',
    label: 'Transfer',
    tagline: 'Share compiled knowledge across agents',
    bullets: [
      'Cross-agent knowledge transfer via artifact packs',
      'Tenant-isolated sharing with access controls',
      'Version-tracked knowledge evolution',
    ],
    codeSnippet: `await memory.transfer({
  from: "deploy-bot",
  to: "monitor-bot",
  artifacts: ["deployment-procedures"],
  scope: "read-only"
})`,
    architectureRole: 'Knowledge Transfer Protocol',
    position: new THREE.Vector3(0.25, 0.10, 0.85),
    normal: new THREE.Vector3(0.28, 0.12, 0.95).normalize(),
    cardSide: 'right',
  },
  {
    id: 'synthesize',
    label: 'Synthesize',
    tagline: 'Assemble compressed reasoning context on demand',
    bullets: [
      '18ms context synthesis latency',
      'Token-budget-aware assembly with 60%+ compression',
      'Full provenance on every returned fact',
    ],
    codeSnippet: `const ctx = await memory.synthesize({
  query: "deploy payments to staging",
  budget: 4000,
  include: ["procedures", "failures"]
})`,
    architectureRole: 'Context Synthesizer',
    position: new THREE.Vector3(-0.06, -0.32, 0.72),
    normal: new THREE.Vector3(-0.07, -0.40, 0.88).normalize(),
    cardSide: 'right',
  },
]
