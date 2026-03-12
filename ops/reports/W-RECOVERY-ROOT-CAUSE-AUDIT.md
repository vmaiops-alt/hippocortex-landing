# W-RECOVERY Root Cause Audit

## FAILURE 1: Brain Looks Like a Rotating Blob

### Root Causes:

1. **Single icosahedron, no bilateral symmetry** (`BrainShell.tsx` L113)
   - Uses `IcosahedronGeometry(1.15, 7)` — a single sphere
   - No central fissure separating left/right hemispheres
   - No brain-like ellipsoid proportions (wider than tall)
   - Result: reads as a bumpy ball, not a brain

2. **Noise displacement is uniform/isotropic** (`BrainShell.tsx` L123-L137)
   - `fbm3()` applied with same frequency in all directions
   - No directional bias for cortical fold patterns (should be elongated front-to-back)
   - Displacement amounts are small (0.10, 0.045, 0.018) — barely visible surface variation

3. **Material is too opaque** (`BrainShell.tsx` L168-L178)
   - `opacity: 0.88` — nearly solid
   - `transmission: 0.25` — barely transparent
   - `side: THREE.DoubleSide` — shows inner faces too, making it denser
   - Result: looks like a dark solid object, not a glass housing

4. **Continuous rotation** (`BrainShell.tsx` L163-L165)
   - `rotation.y -= delta * 0.00087 * 60` ≈ 0.05 rad/s continuous spin
   - Makes it look like a rotating 3D model, not an organic form
   - Disrupts any sense of brain orientation

5. **Camera is dead-on frontal** (`BrainScene.tsx` L98)
   - `camera={{ position: [0, 0, 3.5] }}` — straight-on view
   - No angle to show brain topology or hemisphere separation

## FAILURE 2: Nodes and Signal Pathways Invisible

### Root Causes:

1. **Nodes are microscopically small** (`SynapseNodes.tsx` L148)
   - `const baseScale = 0.012 + opacitiesRef.current[i] * 0.008`
   - At idle (opacity 0.3): scale = 0.0144 units
   - Inside a 1.3x scaled group: visible size ≈ 0.019 units ≈ 7 pixels on 1080p
   - Barely visible even if you're looking for them

2. **Node idle opacity too low** (`SynapseNodes.tsx` L120, L134)
   - Default idle opacity: `0.3`
   - Color multiplied by intensity: `regionColor.r * 0.3` = 30% brightness
   - Nodes are dark dots on a dark background

3. **Signal pathway tubes are hair-thin** (`SignalPathways.tsx` L68)
   - `new THREE.TubeGeometry(curve, 32, 0.006, 6, false)`
   - Radius 0.006 → diameter 0.012 units → ~4.5 pixels visible
   - Essentially invisible lines

4. **Pathway opacity too low** (`SignalPathways.tsx` L96)
   - Base material opacity: `0.15`
   - Active state only reaches `0.4`
   - Against a dark background, barely registers

5. **Shell occludes internal elements** (`BrainShell.tsx` L168-L178)
   - Shell at 88% opacity renders IN FRONT of nodes/pathways
   - No `depthWrite: false` on shell — it writes to depth buffer, blocking interior
   - No `renderOrder` management — everything at default order
   - Visual hierarchy is INVERTED: shell (88%) > nodes (30%) > pathways (15%)

6. **Bloom threshold too high** (`BrainScene.tsx` L19-L24)
   - `luminanceThreshold: 0.35` — dim nodes/pathways never reach threshold
   - `intensity: 0.6` — modest even if threshold is met
   - No glow effect on the elements that need it most

## FAILURE 3: Text Doubled, Overlapping, Scroll Glitchy

### Root Causes:

1. **Content redundancy** (`page.tsx` L53-L55)
   - `<BrainStickySection />` contains 5 panels: Episodic Memory, Semantic Memory, Graph Memory, Memory Compiler, Context Synthesis
   - `<MechanismsSection />` follows immediately with 4 cards on related topics
   - Users see "Episodic Memory" in sticky panels then "Episodes Become Expertise" in mechanisms — feels like doubled content

2. **No z-index management between sections** (`page.tsx`)
   - BrainStickySection's sticky brain sits at `z-0` inside the section
   - Sections after BrainStickySection have no `position: relative` or `z-index`
   - The sticky brain canvas can visually bleed through into subsequent sections

3. **Sticky-to-normal transition is abrupt** (`BrainStickySection.tsx` L197-L210)
   - Container is `minHeight: 300vh`
   - Scroll panels use `marginTop: -100vh` to overlap sticky brain
   - When sticky section ends, brain canvas suddenly disappears
   - No smooth transition to the next section
