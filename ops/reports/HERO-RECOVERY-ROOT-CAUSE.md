# HERO RECOVERY — Root Cause Analysis

**Date:** 2026-03-12  
**Status:** Complete

---

## 1. Brain Looks Like a Blob (Not Intelligent Structure)

### Root Causes

**A. Shell material is too transparent/ghostly**  
- `BrainShell.tsx` line: `<meshPhysicalMaterial opacity={0.32} transmission={0.6}>`
- With 32% opacity and 60% transmission, the shell is nearly invisible
- Combined with `depthWrite={false}`, nothing properly occludes — shape is lost

**B. Vertex color contrast is too narrow**  
- `BrainShell.tsx` createBrainGeometry() color range:
  - Sulcus: `[12, 12, 20]` / Ridge: `[34, 37, 58]` — only 22-unit spread on 0-255 scale
  - Essentially invisible contrast between gyri and sulci

**C. No rim lighting implementation**  
- W4 spec requires Fresnel-based edge glow `rgba(200, 200, 210, 0.15)`
- Current code: NO Fresnel/rim shader, just `envMapIntensity: 0.15` which does nothing without an env map

**D. Rotation is oscillating sway, not slow continuous rotation**  
- Current: `rotation.y = Math.sin(t * 0.12) * 0.025` — tiny oscillation ±1.4°
- Spec: continuous Y-axis rotation ~0.08-0.12 RPM counter-clockwise
- The sway prevents showing 3D topology; brain looks flat/2D

**E. Lighting too weak to define silhouette**  
- `ambientLight intensity={0.25}` dominates, flattening everything
- Directional lights are dim (0.4, 0.2) and positioned badly for a brain shape
- No strong key/fill contrast to reveal hemisphere silhouette

---

## 2. Nodes Are Oversized and Dominate the Scene

### Root Causes

**A. Idle opacity far too high**  
- `SynapseNodes.tsx`: Idle opacity = 0.5 (spec: 0.3)
- 160 nodes at 50% opacity with AdditiveBlending = bright cloud

**B. Node scale is too large**  
- Base scale: `0.045 + opacity * 0.030` → at idle (0.5): 0.06 radius
- Group scale in BrainScene.tsx: `1.3` → effective radius: ~0.078
- This is ~8% of brain radius — spec says idle nodes should be 2-3px on screen

**C. Color intensity multiplier too aggressive**  
- `intensity = opacitiesRef.current[i] * 2.0` → idle nodes emit HDR color (1.0)
- Combined with bloom threshold 0.2, even idle nodes trigger bloom

**D. Bloom threshold too low**  
- `BrainScene.tsx`: `<Bloom luminanceThreshold={0.2}>` 
- Spec says threshold 0.6 — current catches everything, nodes glow massively
- `intensity={1.2}` further amplifies (spec: 0.8)

---

## 3. Signals Are Visually Weak

### Root Causes

**A. Pulse emissive intensity is 1/4 of spec**  
- `SignalPathways.tsx`: `pulseEmissive = ... * 1.0` (max 1.0)
- Spec: pulse intensity should be 4.0 emissive multiplier
- Pulse only affects opacity (0.30 → 1.30), not emissive color

**B. Signal materials don't use HDR output**  
- Nodes use `toneMapped: false` allowing HDR bloom trigger
- Pathways use `MeshBasicMaterial` with base color only — no `toneMapped: false`
- Signals never exceed luminance 1.0, so they NEVER trigger bloom

**C. Tube geometry is appropriately thin (0.018) but has no visual weight**  
- Without HDR color boost, thin tubes are invisible against bright nodes
- The visual hierarchy is inverted: nodes dominate, signals vanish

---

## 4. Scroll Glitches — Duplicate Renders & Layout Issues

### Root Causes

**A. TWO separate BrainScene instances render simultaneously**  
- `page.tsx` line: `<div className="hidden lg:block absolute..."><BrainScene /></div>` — Hero brain
- `BrainStickySection.tsx` renders its own `<BrainScene />` inside the sticky container
- TWO WebGL contexts, TWO animation loops, doubled GPU cost, visual overlap

**B. HeroSection has an empty mount point that does nothing**  
- `HeroSection.tsx`: `<div id="hero-brain-mount" className="w-full h-full" />` 
- This reserves space but the actual brain is placed via absolute positioning in page.tsx
- Layout confusion: empty 400-600px tall div in hero right column

**C. ScrollTrigger + CSS sticky + negative margin is fragile**  
- `BrainStickySection.tsx`: Uses `position: sticky` via CSS + negative margin overlay
- `marginTop: '-100vh'` on scroll content causes layout shift risks
- ScrollTrigger scrubs from 0→1 across the container but the container height 
  is `minHeight: 300vh` — panel content may not fill this, causing scroll speed inconsistencies

**D. No ScrollTrigger cleanup between route transitions**  
- ScrollTrigger.create() returns trigger but only killed on unmount
- If component remounts (React strict mode, hot reload), duplicate triggers stack

---

## 5. Visual Noise — Particle Chaos

### Root Cause  
- 160 nodes × 0.5 opacity × AdditiveBlending × 2.0 HDR intensity × low bloom threshold
- The entire brain interior is a bright glowing cloud
- Spec: idle nodes should be barely visible (opacity 0.3, 2-3px)

---

## 6. Labels/Cards Overlap Brain

### Root Cause
- Labels use fixed percentage positioning (e.g., `dotX: 60, dotY: 60`)
- These don't account for the actual brain position which varies with scroll
- Cards alternate left/right with no guarantee of avoiding the brain center zone
- The brain canvas fills 100% of the sticky viewport — cards overlap by design

---

## Summary: Fix Priority

| Issue | Severity | Fix Complexity |
|-------|----------|----------------|
| Duplicate BrainScene | Critical | Low — remove hero duplicate |
| Bloom threshold too low | Critical | Low — change 2 values |
| Node opacity/scale too high | Critical | Low — tune constants |
| Signal emissive too weak | High | Medium — add HDR output |
| Shell too transparent | High | Low — tune material |
| No rim lighting | Medium | Medium — add Fresnel |
| Rotation wrong | Low | Low — change to continuous |
| Label positioning | Medium | Low — adjust positions |
| Scroll structure | Medium | Medium — simplify layout |
