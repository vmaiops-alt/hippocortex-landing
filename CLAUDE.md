# Hippocortex Landing Page — Implementation (W9)

## YOUR TASK
Build the full Hippocortex landing page. Follow the planning docs EXACTLY.

## PLANNING DOCS (read ALL before coding)
These are in ../docs/web/:
- W1-BRAND-STRATEGY.md (brand identity)
- W1-SITE-GOALS.md (audience, conversions)
- W2-PAGE-STRUCTURE.md (section structure)
- W3-VISUAL-SYSTEM.md (spacing, grid, cards, UI)
- W3-COLOR-TYPOGRAPHY.md (colors hex, fonts, sizes)
- W4-BRAIN-ASSET-PLAN.md (3D brain spec — CRITICAL)
- W5-ASSET-GENERATION-PIPELINE.md (assets)
- W6-COPY.md (ALL copy text)
- W7-WIREFRAMES.md (layouts)
- W7-SECTION-SPECS.md (per-section specs)
- W8-MOTION-SYSTEM.md (all animation)

## TECH STACK
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- React Three Fiber + Three.js (ONLY for brain scene)
- GSAP + ScrollTrigger (scroll logic)
- Framer Motion (UI interactions only)

## PROJECT STRUCTURE
```
app/page.tsx
app/layout.tsx
app/globals.css

components/
  brain/
    BrainScene.tsx
    BrainShell.tsx
    SynapseNodes.tsx
    SignalPathways.tsx
    RegionController.ts
    PulseController.ts
  sections/
    HeroSection.tsx
    ProblemSection.tsx
    ArchitectureSection.tsx
    BrainSection.tsx
    MechanismsSection.tsx
    ProofSection.tsx
    DeveloperSection.tsx
    PricingSection.tsx
    CTASection.tsx
  ui/
    Button.tsx
    Card.tsx
    Nav.tsx

public/assets/
  brain/
  ui/
  backgrounds/
```

## BRAIN SCENE (Three.js via R3F)

### 3-Layer Architecture
1. **BrainShell** — GLB mesh, translucent graphite, rim light, minimal rotation (~0.1 RPM)
2. **SynapseNodes** — 120-220 instanced nodes, dim idle, burst per section
3. **SignalPathways** — spline network, emissive pulse shader, MAX 2-3 simultaneous pulses

### CRITICAL RENDER RULES
- ALL animation in useFrame() — NEVER bind animation to React state
- React must NOT re-render during animation
- Scroll updates animation state only (via refs/stores, not setState)
- Use Zustand or plain refs for shared state between GSAP and R3F

### Brain Regions
- episodic (hippocampus area)
- semantic (temporal cortex)
- graph (prefrontal)
- compiler (thalamus)
- synthesizer (corpus callosum)

### RegionController
Controls which region is active based on scroll. Updates shared state that useFrame reads.

### PulseController
Manages traveling emissive pulses on pathways. Enforces max 2-3 simultaneous.

### Scroll-Lock Brain Section
- Brain canvas becomes position:sticky for ~200vh
- Content panels scroll past
- ScrollTrigger updates RegionController
- 5 panels (episodic, semantic, graph, compiler, synthesizer)

### Compression Finale (4.3s)
1. Signal increase (convergence wave, 2.5s)
2. Node dimming
3. Pathway synchronization
4. Convergence to single point
5. Compression snap (800ms)
6. Single bright node
7. Radial ping (0.6s + 0.4s hold)

## PAGE SECTIONS
Implement ALL sections from W7. Copy from W6-COPY.md.

## MOTION
Follow W8-MOTION-SYSTEM.md exactly:
- GSAP ScrollTrigger for scroll
- Framer Motion for UI hover/press
- Default reveal: translateY(24px), 700ms, cubic-bezier(0.16,1,0.3,1)
- 60fps target

## MOBILE FALLBACK
- Disable Three.js on mobile (≤767px)
- Static WebP brain image
- CSS glow dots for region indicators
- Simplified animations

## PERFORMANCE
- ≤12 GPU layers
- ≤8 GSAP tweens active
- ≤45KB animation bundle
- 60fps

## SETUP STEPS
1. npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
2. Install: three @react-three/fiber @react-three/drei @react-three/postprocessing gsap framer-motion zustand
3. Create all components
4. Wire up brain scene + scroll
5. Implement all sections with real copy
6. Test local build

## BRAIN MESH
Since we don't have a real GLB yet, create a procedural brain-like geometry:
- Use a sphere with vertex displacement (noise) to approximate cortical folds
- Apply the material spec from W4 (translucent, graphite, rim light)
- This is a placeholder that matches the visual intent until the real Blender asset arrives

## IMPORTANT
- Read the planning docs BEFORE coding
- Use exact colors/spacing from W3
- Use exact copy from W6
- Follow wireframe layouts from W7
- The brain is the hero — make it look premium
- No placeholder "Lorem ipsum" anywhere
- Build must pass (no TS errors)

When done, run `npm run build` to verify. Then report what was built.

When completely finished, run this command to notify:
openclaw system event --text "Done: W9 Hippocortex landing page implementation complete" --mode now
