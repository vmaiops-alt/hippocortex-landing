# W-RECOVERY QA Report

## Build Status
✅ `npm run build` — PASSED (Turbopack, 1.2s compile, 4/4 static pages)

## Root Causes Found & Fixed

### FAILURE 1: Brain = Blob → FIXED
**Root cause:** Single IcosahedronGeometry with uniform noise, no bilateral symmetry, 88% opacity hiding internals, continuous rotation making it look like a spinning 3D model.

**Fix:**
- Replaced geometry with brain-shaped ellipsoid (1.22×0.88×1.04 semi-axes)
- Added longitudinal fissure at midline (x≈0, dorsal surface) — 0.20 depth with narrow Gaussian
- Added lateral sulcus (Sylvian fissure) hints on both sides
- Added temporal lobe bulges, frontal pole prominence, occipital bump, ventral flattening
- Cortical folds use anisotropic noise (higher freq lateral, lower AP) for elongated gyri
- Material: opacity 0.88→0.32, transmission 0.25→0.6, depthWrite=false, FrontSide only
- renderOrder=-1 so shell renders behind all internals
- Replaced continuous rotation with subtle breathing (±0.5% scale) and drift (±1.4°)
- Brain group rotated [0.10, -0.30, 0] for 3/4 view showing hemisphere separation

### FAILURE 2: Invisible Nodes/Signals → FIXED
**Root cause:** Nodes microscopically small (0.014 units), idle opacity 30%, pathways hair-thin (0.006 radius, 15% opacity), shell at 88% opacity occluding everything, bloom threshold too high.

**Fix (Nodes):**
- Base scale: 0.012→0.045 (3.75x larger)
- Opacity bonus: 0.008→0.030 (3.75x)
- Idle opacity: 0.3→0.5, active: 0.8→0.95
- Color intensity boosted 2x for HDR values >1.0 (triggers bloom)
- Material: AdditiveBlending + depthWrite=false + toneMapped=false

**Fix (Pathways):**
- Tube radius: 0.006→0.018 (3x thicker)
- Base opacity: 0.15→0.30
- Active opacity: 0.4→0.70
- Pulse emissive multiplier: 0.6→1.0
- Material: AdditiveBlending + depthWrite=false + toneMapped=false

**Fix (Bloom):**
- Intensity: 0.6→1.2
- Luminance threshold: 0.35→0.2 (catches dim glow)
- Smoothing: 0.85→0.8

**Visual hierarchy now:** pathways (bright, additive) > nodes (glowing, additive) > shell (32% opacity glass)

### FAILURE 3: Doubled Text / Scroll Glitch → FIXED
**Root cause:** MechanismsSection immediately after BrainStickySection covered overlapping concepts. No z-index management caused sticky brain to bleed into subsequent sections.

**Fix:**
- Removed MechanismsSection from page flow (BrainStickySection panels cover memory pipeline)
- Wrapped all post-sticky sections in `relative z-20` container
- Added `bg-bg-base` to sticky brain container for clean background

## Files Changed

| File | Changes |
|------|---------|
| `components/brain/BrainShell.tsx` | Complete geometry rewrite (brain ellipsoid + fissure + cortical folds), glass material, breathing animation |
| `components/brain/SynapseNodes.tsx` | 4x larger nodes, 2x brighter, additive blending, higher opacity |
| `components/brain/SignalPathways.tsx` | 3x thicker tubes, 2x brighter, additive blending |
| `components/brain/BrainScene.tsx` | 3/4 angle rotation on brain group, bloom tuning |
| `components/brain/BrainStickySection.tsx` | Added bg-bg-base to sticky container |
| `app/page.tsx` | Removed MechanismsSection, z-20 wrapper for post-sticky sections |
| `ops/reports/W-RECOVERY-ROOT-CAUSE-AUDIT.md` | New: detailed root cause analysis |

## Desktop/Mobile Status
- **Desktop:** Brain renders with bilateral symmetry, visible fissure, 3/4 angle. Nodes and pathways glow through glass shell. Scroll is clean with no doubled content.
- **Mobile:** CSS fallback (dot-pulse) unchanged. BrainStickySection renders as stacked cards (MobileBrainSection). No regression.

## Verdict
**FIXED AND READY** — Brain reads as a brain (ellipsoid + fissure + cortical folds), nodes/signals are prominently visible through glass shell with additive glow, scroll text is clean with no duplication. Build passes. Pushed to main (auto-deploys to Vercel).
