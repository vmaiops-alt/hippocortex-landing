# Hippocortex — Landing Page Specification

**URL:** hippocortex.dev  
**Date:** 2026-03-12  
**Goal:** Convert developers to sign up for the free tier. Secondary: explain what Hippocortex does and why it matters.

---

## Design Principles

- **Developer-first.** Code examples, not marketing fluff.
- **Dark mode default.** Tech aesthetic. Clean typography.
- **Fast.** Static site (Next.js or Astro). < 2s LCP.
- **One page.** Everything above or within easy scroll.

---

## Section 1: Hero

**Layout:** Full viewport height. Centered text. Dark gradient background (#0a0a0a → #1a1a2e).

**Headline:**
```
AI Agents That Learn From Experience
```

**Subhead:**
```
Hippocortex gives your agents persistent memory that captures experience,
compiles it into reusable knowledge, and synthesizes it into context
for every decision. Not RAG. Memory.
```

**CTA buttons:**
```
[Get Started — Free]  [View Docs]
```

**Below CTA:** Animated terminal showing the three primitives:

```
$ npm install @hippocortex/sdk

import { Hippocortex } from '@hippocortex/sdk';
const hx = new Hippocortex({ apiKey: 'hx_live_...' });

await hx.capture({ type: 'message', sessionId: 's1', payload: { role: 'user', content: 'Deploy to staging' } });
await hx.learn();
const ctx = await hx.synthesize('deploy to staging');
// → { entries: [{ section: 'procedures', content: 'Steps: 1) Check CI 2) Migrate 3) Deploy 4) Test' }] }
```

---

## Section 2: The Problem

**Headline:** `Your Agents Have Amnesia`

**Three columns:**

| Column 1 | Column 2 | Column 3 |
|-----------|----------|----------|
| **🔄 Every session starts from zero** | **📦 RAG is search, not memory** | **🚫 Mistakes repeat forever** |
| Your agent deployed a service yesterday. Today it has no idea how. Same questions, same failures, same wasted tokens. | Vector similarity finds text. It doesn't understand temporal context, contradictions, or cause-effect. Garbage in, garbage out. | Your agent crashed a deployment last week. Without memory, it'll crash it the same way again. No learning, no improvement. |

---

## Section 3: The Solution

**Headline:** `Memory That Actually Learns`

**Three feature cards with icons:**

### capture()
```
Record every interaction — messages, tool calls, results,
file edits, commands. Automatic salience scoring filters noise.
Dedup prevents redundancy. Zero configuration.
```

### learn()
```
The Memory Compiler extracts patterns from experience:
• Task schemas — recurring procedures
• Failure playbooks — error patterns and resolutions
• Causal patterns — cause-effect relationships
• Decision policies — preferences and rules

Every artifact backed by evidence. No hallucinated knowledge.
```

### synthesize()
```
Get compressed, provenance-tagged context for any query.
60%+ compression. Token-budget optimized.
Deterministic — same inputs, same outputs.
Provenance — every fact traceable to source.
```

---

## Section 4: Architecture

**Headline:** `Six Layers of Intelligence`

**Visual:** Stacked layer diagram (animated on scroll)

```
┌─────────────────────────────────────────────┐
│          Synthesized Context (output)         │
├─────────────────────────────────────────────┤
│          Compiled Knowledge                   │
│   Task schemas · Playbooks · Policies         │
├─────────────────────────────────────────────┤
│          Graph Memory                         │
│   Entities · Relations · Traversal            │
├─────────────────────────────────────────────┤
│          Semantic Memory                      │
│   Facts · Preferences · Procedures            │
├─────────────────────────────────────────────┤
│          Episodic Memory                      │
│   Raw traces · Time-ordered · Session-scoped  │
├─────────────────────────────────────────────┤
│          Event Capture (input)                │
│   8 adapters · Salience · Dedup · Ingestion   │
└─────────────────────────────────────────────┘
```

**Callout:** "Each layer builds on the one below. Episodic traces promote to semantic memories. Semantic memories link to graph entities. Graph patterns feed the compiler. Full provenance at every level."

---

## Section 5: Code Example

**Headline:** `10 Lines to Memory`

**Side-by-side tabs:** TypeScript | Python

**TypeScript:**
```typescript
import { Hippocortex } from '@hippocortex/sdk';

const hx = new Hippocortex({ apiKey: 'hx_live_...' });

// Your agent does something
await hx.capture({
  type: 'message',
  sessionId: 'sess-1',
  payload: { role: 'user', content: 'Deploy payments to staging' }
});

// Learn from accumulated experience
await hx.learn();

// Next time, get compressed context
const ctx = await hx.synthesize('deploy payments');
// → Procedures, failure warnings, preferences — all from real experience
```

**Python:**
```python
from hippocortex import Hippocortex

hx = Hippocortex(api_key="hx_live_...")

# Your agent does something
hx.capture(type="message", session_id="sess-1",
           payload={"role": "user", "content": "Deploy payments to staging"})

# Learn from accumulated experience
hx.learn()

# Next time, get compressed context
ctx = hx.synthesize("deploy payments")
# → Procedures, failure warnings, preferences — all from real experience
```

---

## Section 6: Why Not RAG?

**Headline:** `RAG Is Search. Hippocortex Is Memory.`

**Comparison table:**

| | RAG | Hippocortex |
|---|---|---|
| **Memory model** | Flat vector store | 6-layer architecture |
| **Learns from experience** | ❌ | ✓ Pattern mining, playbooks, policies |
| **Contradiction handling** | ❌ Conflicting vectors coexist | ✓ Detection, quarantine, resolution |
| **Provenance** | ❌ Embeddings are opaque | ✓ Every fact traceable to source |
| **Temporal awareness** | ❌ Timestamp metadata at best | ✓ First-class temporal ordering |
| **Context quality** | Nearest-neighbor retrieval | Budget-optimized synthesis, 60%+ compression |
| **Deterministic** | No guarantee | ✓ Same inputs → same outputs |

---

## Section 7: Pricing

**Headline:** `Start Free. Scale When Ready.`

**Four pricing cards:**

| Free | Developer | Pro | Enterprise |
|------|-----------|-----|------------|
| $0/mo | $49/mo | $299/mo | Custom |
| 50k events | 1M events | 10M events | Custom |
| Great for prototyping | For individual devs | For production workloads | For scale & compliance |
| [Get Started] | [Get Started] | [Get Started] | [Contact Sales] |

**Below:** "Events = capture() calls. learn() and synthesize() included. No hidden fees."

---

## Section 8: FAQ

**Headline:** `Frequently Asked Questions`

**Q: Do I need to change my agent framework?**  
A: No. Hippocortex works alongside any framework — OpenAI Agents, LangGraph, CrewAI, AutoGen, or custom. Just add three function calls.

**Q: Does Hippocortex call an LLM internally?**  
A: No. All internal operations (salience scoring, dedup, compilation, synthesis) are deterministic algorithms. No LLM API calls, no hallucination risk, no additional cost.

**Q: How is this different from Mem0 or Zep?**  
A: Hippocortex has a six-layer architecture (episodic → semantic → graph → compiled), learns from experience via pattern mining, handles contradictions, and provides full provenance. Others are key-value or session stores with basic retrieval.

**Q: What's the latency?**  
A: Capture: < 100ms p99. Synthesize: < 500ms p99. Learn: depends on volume (typically < 5 seconds for incremental).

**Q: Is my data isolated from other tenants?**  
A: Yes. Row-level security at minimum, dedicated schema for Pro, dedicated database for Enterprise. Zero data leakage.

**Q: Can I self-host?**  
A: Cloud-first for v1. Self-hosted and on-premise options planned for Enterprise customers.

---

## Section 9: CTA (Footer)

**Headline:** `Give Your Agents Memory`

**Subhead:** `Free tier. No credit card. 5 minutes to first capture.`

**CTA:**
```
[Get Started — Free]
```

**Links:** Docs · GitHub · API Reference · Status · Blog · Twitter

**Footer:** © 2026 Hippocortex · Privacy · Terms

---

## Technical Specs

- **Framework:** Next.js 15 (App Router) or Astro 4
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (scroll-triggered)
- **Analytics:** PostHog or Plausible (privacy-first)
- **Hosting:** Vercel or Cloudflare Pages
- **Performance targets:** LCP < 2s, CLS < 0.1, FID < 100ms
