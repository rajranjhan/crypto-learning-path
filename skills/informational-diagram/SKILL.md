---
name: informational-diagram
description: Create Excalidraw diagram JSON files that make visual arguments, in one of seven named styles (whiteboard, infographic, presentation, diagram, mindmap, mindmap-structured, mockup). Use when the user wants to visualize workflows, architectures, or concepts — including requests that name a style directly ("sketch this on a whiteboard", "turn this into an infographic", "make a mindmap of...", "mock up the UI for...").
metadata:
  version: "1.0.0"
---

# Informational Diagram Generator

Generate `.excalidraw` JSON files that **argue visually**, not just display information — in the style the request calls for.

**Setup:** If the user asks you to set up this skill (renderer, dependencies, installing it elsewhere), see `README.md`.

## Customization

**All colors and brand-specific styles live in one file:** `references/color-palette.md`. Read it before generating any diagram and use it as the single source of truth for all color choices — shape fills, strokes, text colors, evidence artifact backgrounds, everything, in every style below.

To make this skill produce diagrams in your own brand style, edit `color-palette.md`. Everything else in this file is universal design methodology and Excalidraw best practices. **No style below invents a new color** — each one reuses the same palette, just with different emphasis (e.g. `presentation` leans on the palette's dark evidence-artifact background; `mindmap` spreads across the full semantic range; `mindmap-structured` stays inside one color family).

---

## Usage

There's no CLI — this is a natural-language skill. Say what you want and name a style if you have one in mind; if you don't, one is chosen for you (see Steps, below).

> "Sketch out how DNS resolution works, whiteboard style"

> "Turn this API spec into an infographic"

> "Make a presentation-style slide showing the three pillars of our security model"

> "Diagram the authentication flow for this API" *(defaults to `diagram`)*

> "Give me a mindmap of the concepts in this doc"

> "Structured mindmap of our test taxonomy, grouped by category"

> "Mock up the admin dashboard, desktop layout"

> "Storyboard the OAuth2 flow as a sequence of frames" *(→ `--mode multi-frame`)*

---

## Styles

Every diagram picks one style. The style sets roughness, density, layout strategy, and typographic tone — never the color values, which always come from `color-palette.md`.

| Style | Use for | Roughness | Density |
|---|---|---|---|
| `whiteboard` | Live-explainer walkthroughs, educational content | 1 (hand-drawn) | Loose |
| `infographic` | Data-rich technical content, published docs | 0 | Dense |
| `presentation` | Slides, keynote-style single-concept diagrams | 0 | Minimal |
| `diagram` | System architecture, protocol/API flows (default) | 0 | Dense |
| `mindmap` | Exploratory brainstorms, concept maps | 0 | Radial |
| `mindmap-structured` | Taxonomies, org charts, data-oriented breakdowns | 0 | Tree |
| `mockup` | UI/UX wireframes, showing actual output | 0 | Framed |

Each style below is broken into the same fields on purpose — CANVAS, LAYOUT, PATTERNS, CONNECTIONS, COLORS, TYPOGRAPHY, MARKERS, OVERALL FEEL — so you can compare them at a glance. "PATTERNS" points into the shared **Visual Pattern Library** and **Shape Meaning** sections further down; styles don't redefine those, they just favor certain patterns over others.

### whiteboard

- **CANVAS**: `viewBackgroundColor: "#ffffff"`. Loosely composed, asymmetric — like it was drawn live during an explanation, not laid out in a grid.
- **LAYOUT**: Single dominant flow (left→right or top→bottom). Generous, uneven whitespace rather than aligned grid spacing.
- **PATTERNS**: Favor Assembly Line, Fan-Out, and Spiral/Cycle — the patterns that read as "someone is walking you through this."
- **CONNECTIONS**: Freehand-feeling arrows (`roughness: 1`), can curve, don't need to be perfectly orthogonal.
- **COLORS**: Full semantic range from `color-palette.md`, used more playfully than `diagram` — it's fine for a Fan-Out's branches to each take a different palette color.
- **TYPOGRAPHY**: Slightly larger body text than other styles (18–20px) to read as "handwriting," `fontFamily: 1` (hand-drawn font) if available, else default.
- **MARKERS**: Small doodle-style dots and underlines using Marker dot colors from the palette.
- **OVERALL FEEL**: Casual, in-progress, teacherly. Never dense — if it's starting to feel like an `infographic`, split it into two diagrams instead.

### infographic

- **CANVAS**: `viewBackgroundColor: "#ffffff"`. Structured grid — sections align to a consistent baseline.
- **LAYOUT**: Full **Multi-Zoom Architecture** (see below): Level 1 summary flow at the top, Level 2 numbered sections, Level 3 evidence artifacts inside each.
- **PATTERNS**: Convergence and Assembly Line for data flow; numbered Section Boundaries throughout.
- **CONNECTIONS**: Clean orthogonal arrows, `roughness: 0`, `strokeWidth: 2`.
- **COLORS**: Evidence-artifact dark background (`#1e293b`) for data callouts, per `color-palette.md`; section fills stay in Primary/Secondary/Tertiary for a cohesive read.
- **TYPOGRAPHY**: Clear hierarchy — Title/Subtitle/Body tiers exactly as defined in Color as Meaning, below. Numbered section labels.
- **MARKERS**: Numbered circular badges (small `ellipse` + number) at the start of each section.
- **OVERALL FEEL**: Publication-quality, dense but organized. This is the style with the highest **Evidence Artifact** requirement — every section should show something concrete, not just a labeled box.

### presentation

- **CANVAS**: Can use the palette's dark evidence-artifact background (`#1e293b`) as `viewBackgroundColor` for a keynote look, with the "on dark fills" text color (`#ffffff`) throughout — or stay on white if the surrounding deck is light. Don't invent a new background color either way.
- **LAYOUT**: One hero element (300×150+), everything else is secondary. Whitespace is the point — 200px+ around the hero.
- **PATTERNS**: Whichever single pattern *is* the argument — a Convergence for "three inputs, one thesis," a Side-by-Side for "before vs after." Never more than one pattern per slide.
- **CONNECTIONS**: Minimal — at most 2-3 arrows, bold (`strokeWidth: 3`) since they carry the whole argument.
- **COLORS**: One dominant semantic color for the hero, everything else recedes to Neutral/Secondary.
- **TYPOGRAPHY**: Title tier at 28px+ (see Hierarchy Through Scale), almost no body text — this style leans hardest on "typography as hierarchy" (see Container vs. Free-Floating Text).
- **MARKERS**: None, or a single accent dot.
- **OVERALL FEEL**: Bold, minimal, built to be read from the back of a room in three seconds.

### diagram

This is the default style and the most fully specified — see **Core Philosophy** through **Multi-Zoom Architecture** below, which describe it in full. In short:

- **CANVAS**: `viewBackgroundColor: "#ffffff"`, precise and technical.
- **LAYOUT**: Multi-zoom (summary + sections + detail) for comprehensive diagrams; single flow for simple ones — see Depth Assessment.
- **PATTERNS**: Whatever the system's actual data flow calls for — see the full Visual Pattern Library.
- **CONNECTIONS**: Orthogonal, `roughness: 0`, labeled with real method/event names (see Research Mandate).
- **COLORS**: Full semantic table, used precisely — one meaning per color, consistently.
- **TYPOGRAPHY**: Standard hierarchy (Title/Subtitle/Body).
- **MARKERS**: Timeline dots, section badges as needed.
- **OVERALL FEEL**: Precise, technical, evidence-backed. Requires the Research Mandate for anything protocol/API/framework-shaped.

### mindmap

- **CANVAS**: `viewBackgroundColor: "#ffffff"`. Radial, centered composition.
- **LAYOUT**: One central node, branches radiating outward (see Fan-Out pattern), sub-branches off those. Organic, not gridded — branch lengths and angles vary.
- **PATTERNS**: Fan-Out from the center, repeated recursively for sub-branches.
- **CONNECTIONS**: Curved or angled lines from center outward, thinner toward the leaves (`strokeWidth: 2` near center, `1` at leaves).
- **COLORS**: Assign each top-level branch a distinct semantic color from the palette (Primary, Secondary, Tertiary, AI/LLM, etc.) so the eye can track a branch's descendants by color.
- **TYPOGRAPHY**: Central node largest (Title tier), branch labels shrink with each level (Subtitle → Body/Detail).
- **MARKERS**: Small branch-point dots where sub-branches split off.
- **OVERALL FEEL**: Vibrant, exploratory, non-linear — this is the one style where equal-looking branches are fine, because the fan-out *is* the argument (everything stems from one idea).

### mindmap-structured

- **CANVAS**: `viewBackgroundColor: "#ffffff"`. Vertical or horizontal tree, not radial.
- **LAYOUT**: Tree pattern per **Lines as Structure** — trunk line + branch lines, free-floating text labels, no boxes.
- **PATTERNS**: Tree (hierarchy), consistently — this style doesn't mix in Fan-Out or Convergence.
- **CONNECTIONS**: Straight lines (`type: "line"`, not arrows), `roughness: 0`.
- **COLORS**: Stay inside one color family (e.g. all Primary/Secondary shades) and use small colored marker dots as category "tags" next to each node instead of coloring the whole branch — this is what distinguishes it from `mindmap`'s per-branch coloring.
- **TYPOGRAPHY**: Flat hierarchy — most labels at Body/Detail size, only top-level category nodes at Subtitle size. No single node dominates like a mindmap's center does.
- **MARKERS**: Small category-tag dots (10px `ellipse`) beside each leaf, colored by category.
- **OVERALL FEEL**: Muted, data-oriented, like an outline rendered as a tree. Good for taxonomies where the *grouping* matters more than any one branch.

### mockup

- **CANVAS**: `viewBackgroundColor: "#ffffff"`. A device frame is the outermost container.
- **LAYOUT**: Nested rectangles mimicking real UI, inside a frame sized for the requested device:
  - `mobile`: 375×812
  - `tablet`: 768×1024
  - `desktop`: 1440×900
- **PATTERNS**: None from the pattern library — this style is literally representational, not metaphorical. It's the one place "boxes for everything" is correct, because the boxes *are* UI elements.
- **CONNECTIONS**: Rare — only if showing a UI-to-UI transition (e.g. click → screen 2). Otherwise no arrows inside the frame.
- **COLORS**: Neutral/light tones for chrome and containers, Primary color reserved for interactive elements (buttons, active states) so they read as clickable.
- **TYPOGRAPHY**: Match real UI scale, not diagram scale — 13–16px body text, not 16–20px.
- **MARKERS**: None.
- **OVERALL FEEL**: Should look like a screenshot of a real interface, not a diagram about one. If it starts looking like boxes-with-labels, tighten the nesting and add real UI copy (button text, field labels) instead of generic placeholders.

---

## Arguments (recognized request modifiers)

There's no flag syntax to parse — these are just the request modifiers to listen for in natural language. Defaults apply when the user doesn't specify.

| Modifier | Values | Default | Effect |
|---|---|---|---|
| style | `whiteboard`, `infographic`, `presentation`, `diagram`, `mindmap`, `mindmap-structured`, `mockup` | `diagram` | Sets roughness, layout strategy, and typographic tone per the Styles section above |
| complexity | `simple`, `moderate`, `detailed` | inferred from content (see Depth Assessment) | Roughly 3–4, 5–7, or 8–12 concepts/sections |
| draw-level | `sketch`, `normal`, `polished` | `normal` | Maps to `roughness: 1` (sketch), `roughness: 0` + `strokeWidth: 2` (normal), `roughness: 0` + `strokeWidth: 1` (polished) — overrides the style's default roughness if the user asks explicitly |
| device | `mobile`, `desktop`, `tablet` | `desktop` | Only meaningful for `mockup`; sets frame dimensions |
| mode | `single`, `multi-frame` | `single` | `multi-frame` produces a numbered sequence of separate `.excalidraw` files (e.g. `flow-1.excalidraw`, `flow-2.excalidraw`) telling a story step by step, instead of one file |

---

## Core Philosophy

**Diagrams should ARGUE, not DISPLAY.**

A diagram isn't formatted text. It's a visual argument that shows relationships, causality, and flow that words alone can't express. The shape should BE the meaning.

**The Isomorphism Test**: If you removed all text, would the structure alone communicate the concept? If not, redesign.

**The Education Test**: Could someone learn something concrete from this diagram, or does it just label boxes? A good diagram teaches—it shows actual formats, real event names, concrete examples.

---

## Depth Assessment (Do This First)

Before designing, determine what level of detail this diagram needs — this is the same judgment call as the `complexity` modifier above.

### Simple/Conceptual Diagrams (`complexity: simple`, 3–4 concepts)
Use abstract shapes when:
- Explaining a mental model or philosophy
- The audience doesn't need technical specifics
- The concept IS the abstraction (e.g., "separation of concerns")

### Comprehensive/Technical Diagrams (`complexity: moderate` or `detailed`, 5–12 concepts)
Use concrete examples when:
- Diagramming a real system, protocol, or architecture
- The diagram will be used to teach or explain (e.g., YouTube video)
- The audience needs to understand what things actually look like
- You're showing how multiple technologies integrate

**For technical diagrams, you MUST include evidence artifacts** (see below). This is required for `infographic` and `diagram` styles by default.

---

## Research Mandate (For Technical Diagrams)

**Before drawing anything technical, research the actual specifications.**

If you're diagramming a protocol, API, or framework:
1. Look up the actual JSON/data formats
2. Find the real event names, method names, or API endpoints
3. Understand how the pieces actually connect
4. Use real terminology, not generic placeholders

Bad: "Protocol" → "Frontend"
Good: "AG-UI streams events (RUN_STARTED, STATE_DELTA, A2UI_UPDATE)" → "CopilotKit renders via createA2UIMessageRenderer()"

**Research makes diagrams accurate AND educational.**

---

## Evidence Artifacts

Evidence artifacts are concrete examples that prove your diagram is accurate and help viewers learn. Include them in technical diagrams — required for `infographic` and `diagram`, optional elsewhere.

**Types of evidence artifacts** (choose what's relevant to your diagram):

| Artifact Type | When to Use | How to Render |
|---------------|-------------|---------------|
| **Code snippets** | APIs, integrations, implementation details | Dark rectangle + syntax-colored text (see color palette for evidence artifact colors) |
| **Data/JSON examples** | Data formats, schemas, payloads | Dark rectangle + colored text (see color palette) |
| **Event/step sequences** | Protocols, workflows, lifecycles | Timeline pattern (line + dots + labels) |
| **UI mockups** | Showing actual output/results | Nested rectangles mimicking real UI — this is the whole `mockup` style, above |
| **Real input content** | Showing what goes IN to a system | Rectangle with sample content visible |
| **API/method names** | Real function calls, endpoints | Use actual names from docs, not placeholders |

**Example**: For a diagram about a streaming protocol, you might show:
- The actual event names from the spec (not just "Event 1", "Event 2")
- A code snippet showing how to connect
- What the streamed data actually looks like

**Example**: For a diagram about a data transformation pipeline:
- Show sample input data (actual format, not "Input")
- Show sample output data (actual format, not "Output")
- Show intermediate states if relevant

The key principle: **show what things actually look like**, not just what they're called.

---

## Multi-Zoom Architecture

Comprehensive diagrams — especially `infographic` and `diagram` styles — operate at multiple zoom levels simultaneously. Think of it like a map that shows both the country borders AND the street names.

### Level 1: Summary Flow
A simplified overview showing the full pipeline or process at a glance. Often placed at the top or bottom of the diagram.

*Example*: `Input → Processing → Output` or `Client → Server → Database`

### Level 2: Section Boundaries
Labeled regions that group related components. These create visual "rooms" that help viewers understand what belongs together.

*Example*: Grouping by responsibility (Backend / Frontend), by phase (Setup / Execution / Cleanup), or by team (User / System / External)

### Level 3: Detail Inside Sections
Evidence artifacts, code snippets, and concrete examples within each section. This is where the educational value lives.

*Example*: Inside a "Backend" section, you might show the actual API response format, not just a box labeled "API Response"

**For comprehensive diagrams, aim to include all three levels.** The summary gives context, the sections organize, and the details teach.

### Bad vs Good

| Bad (Displaying) | Good (Arguing) |
|------------------|----------------|
| 5 equal boxes with labels | Each concept has a shape that mirrors its behavior |
| Card grid layout | Visual structure matches conceptual structure |
| Icons decorating text | Shapes that ARE the meaning |
| Same container for everything | Distinct visual vocabulary per concept |
| Everything in a box | Free-floating text with selective containers |

### Simple vs Comprehensive (Know Which You Need)

| Simple Diagram | Comprehensive Diagram |
|----------------|----------------------|
| Generic labels: "Input" → "Process" → "Output" | Specific: shows what the input/output actually looks like |
| Named boxes: "API", "Database", "Client" | Named boxes + examples of actual requests/responses |
| "Events" or "Messages" label | Timeline with real event/message names from the spec |
| "UI" or "Dashboard" rectangle | Mockup showing actual UI elements and content |
| ~30 seconds to explain | ~2-3 minutes of teaching content |
| Viewer learns the structure | Viewer learns the structure AND the details |

**Simple diagrams** are fine for abstract concepts, quick overviews, or when the audience already knows the details. **Comprehensive diagrams** are needed for technical architectures, tutorials, educational content, or when you want the diagram itself to teach.

---

## Container vs. Free-Floating Text

**Not every piece of text needs a shape around it.** Default to free-floating text. Add containers only when they serve a purpose.

| Use a Container When... | Use Free-Floating Text When... |
|------------------------|-------------------------------|
| It's the focal point of a section | It's a label or description |
| It needs visual grouping with other elements | It's supporting detail or metadata |
| Arrows need to connect to it | It describes something nearby |
| The shape itself carries meaning (decision diamond, etc.) | Typography alone creates sufficient hierarchy |
| It represents a distinct "thing" in the system | It's a section title, subtitle, or annotation |

**Typography as hierarchy**: Use font size, weight, and color to create visual hierarchy without boxes. A 28px title doesn't need a rectangle around it.

**The container test**: For each boxed element, ask "Would this work as free-floating text?" If yes, remove the container. (The `mockup` style is the deliberate exception — see above.)

---

## Steps

The end-to-end workflow, from request to delivered diagram.

1. **Pick the style.** Use an explicit style if the user named one; otherwise infer from the request (a system/protocol question defaults to `diagram`; "sketch"/"whiteboard" language → `whiteboard`; "mindmap"/"brainstorm" → `mindmap`; "mockup"/"wireframe"/"UI" → `mockup`; "slide"/"keynote" → `presentation`; "infographic"/"data" → `infographic`; taxonomy/org-chart language → `mindmap-structured`).
2. **Assess depth required.** Simple/Conceptual or Comprehensive/Technical (see Depth Assessment). This sets the `complexity` modifier if the user didn't specify one.
3. **Research, if technical.** Look up actual specs, formats, event names, APIs (see Research Mandate). Skip for `whiteboard`/`presentation`/`mindmap` styles unless the content demands it.
4. **Map concepts to patterns.** For each concept, find the visual pattern that mirrors its behavior (see Visual Pattern Library) — filtered by what the chosen style favors.
5. **Sketch the flow mentally.** Before JSON, trace how the eye moves through the diagram. There should be a clear visual story.
6. **Generate the JSON.** For comprehensive diagrams, build it section-by-section (see Large/Comprehensive Diagram Strategy). For `multi-frame` mode, generate each frame as its own file in sequence.
7. **Render, validate, and deliver.** Run the render-view-fix loop (see Render & Validate) until it's right, then hand off the file(s). If the render pipeline isn't available, see Error Handling.

---

## Large / Comprehensive Diagram Strategy

**For comprehensive or technical diagrams, you MUST build the JSON one section at a time.** Do NOT attempt to generate the entire file in a single pass. This is a hard constraint — Claude Code has a ~32,000 token output limit per response, and a comprehensive diagram easily exceeds that in one shot. Even if it didn't, generating everything at once leads to worse quality. Section-by-section is better in every way.

### The Section-by-Section Workflow

**Phase 1: Build each section**

1. **Create the base file** with the JSON wrapper (`type`, `version`, `appState`, `files`) and the first section of elements.
2. **Add one section per edit.** Each section gets its own dedicated pass — take your time with it. Think carefully about the layout, spacing, and how this section connects to what's already there.
3. **Use descriptive string IDs** (e.g., `"trigger_rect"`, `"arrow_fan_left"`) so cross-section references are readable.
4. **Namespace seeds by section** (e.g., section 1 uses 100xxx, section 2 uses 200xxx) to avoid collisions.
5. **Update cross-section bindings** as you go. When a new section's element needs to bind to an element from a previous section (e.g., an arrow connecting sections), edit the earlier element's `boundElements` array at the same time.

**Phase 2: Review the whole**

After all sections are in place, read through the complete JSON and check:
- Are cross-section arrows bound correctly on both ends?
- Is the overall spacing balanced, or are some sections cramped while others have too much whitespace?
- Do IDs and bindings all reference elements that actually exist?

Fix any alignment or binding issues before rendering.

**Phase 3: Render & validate**

Now run the render-view-fix loop from the Render & Validate section. This is where you'll catch visual issues that aren't obvious from JSON — overlaps, clipping, imbalanced composition.

### Section Boundaries

Plan your sections around natural visual groupings from the diagram plan. A typical large diagram might split into:

- **Section 1**: Entry point / trigger
- **Section 2**: First decision or routing
- **Section 3**: Main content (hero section — may be the largest single section)
- **Section 4-N**: Remaining phases, outputs, etc.

Each section should be independently understandable: its elements, internal arrows, and any cross-references to adjacent sections.

### What NOT to Do

- **Don't generate the entire diagram in one response.** You will hit the output token limit and produce truncated, broken JSON. Even if the diagram is small enough to fit, splitting into sections produces better results.
- **Don't use a coding agent** to generate the JSON. The agent won't have sufficient context about the skill's rules, and the coordination overhead negates any benefit.
- **Don't write a Python generator script.** The templating and coordinate math seem helpful but introduce a layer of indirection that makes debugging harder. Hand-crafted JSON with descriptive IDs is more maintainable.

---

## Visual Pattern Library

### Fan-Out (One-to-Many)
Central element with arrows radiating to multiple targets. Use for: sources, PRDs, root causes, central hubs. Core pattern for `mindmap`.
```
        ○
       ↗
  □ → ○
       ↘
        ○
```

### Convergence (Many-to-One)
Multiple inputs merging through arrows to single output. Use for: aggregation, funnels, synthesis.
```
  ○ ↘
  ○ → □
  ○ ↗
```

### Tree (Hierarchy)
Parent-child branching with connecting lines and free-floating text (no boxes needed). Use for: file systems, org charts, taxonomies. Core pattern for `mindmap-structured`.
```
  label
  ├── label
  │   ├── label
  │   └── label
  └── label
```
Use `line` elements for the trunk and branches, free-floating text for labels.

### Spiral/Cycle (Continuous Loop)
Elements in sequence with arrow returning to start. Use for: feedback loops, iterative processes, evolution.
```
  □ → □
  ↑     ↓
  □ ← □
```

### Cloud (Abstract State)
Overlapping ellipses with varied sizes. Use for: context, memory, conversations, mental states.

### Assembly Line (Transformation)
Input → Process Box → Output with clear before/after. Use for: transformations, processing, conversion.
```
  ○○○ → [PROCESS] → □□□
  chaos              order
```

### Side-by-Side (Comparison)
Two parallel structures with visual contrast. Use for: before/after, options, trade-offs.

### Gap/Break (Separation)
Visual whitespace or barrier between sections. Use for: phase changes, context resets, boundaries.

### Lines as Structure
Use lines (type: `line`, not arrows) as primary structural elements instead of boxes:
- **Timelines**: Vertical or horizontal line with small dots (10-20px ellipses) at intervals, free-floating labels beside each dot
- **Tree structures**: Vertical trunk line + horizontal branch lines, with free-floating text labels (no boxes needed)
- **Dividers**: Thin dashed lines to separate sections
- **Flow spines**: A central line that elements relate to, rather than connecting boxes

```
Timeline:           Tree:
  ●─── Label 1        │
  │                   ├── item
  ●─── Label 2        │   ├── sub
  │                   │   └── sub
  ●─── Label 3        └── item
```

Lines + free-floating text often creates a cleaner result than boxes + contained text.

---

## Shape Meaning

Choose shape based on what it represents—or use no shape at all:

| Concept Type | Shape | Why |
|--------------|-------|-----|
| Labels, descriptions, details | **none** (free-floating text) | Typography creates hierarchy |
| Section titles, annotations | **none** (free-floating text) | Font size/weight is enough |
| Markers on a timeline | small `ellipse` (10-20px) | Visual anchor, not container |
| Start, trigger, input | `ellipse` | Soft, origin-like |
| End, output, result | `ellipse` | Completion, destination |
| Decision, condition | `diamond` | Classic decision symbol |
| Process, action, step | `rectangle` | Contained action |
| Abstract state, context | overlapping `ellipse` | Fuzzy, cloud-like |
| Hierarchy node | lines + text (no boxes) | Structure through lines |
| UI element (`mockup` style only) | `rectangle` | Representational, not metaphorical |

**Rule**: Default to no container. Add shapes only when they carry meaning. Aim for <30% of text elements to be inside containers (this ratio doesn't apply to `mockup`, where containers ARE the UI).

---

## Color as Meaning

Colors encode information, not decoration. Every color choice — in every style — should come from `references/color-palette.md` — the semantic shape colors, text hierarchy colors, and evidence artifact colors are all defined there.

**Key principles:**
- Each semantic purpose (start, end, decision, AI, error, etc.) has a specific fill/stroke pair
- Free-floating text uses color for hierarchy (titles, subtitles, details — each at a different level)
- Evidence artifacts (code snippets, JSON examples) use their own dark background + colored text scheme
- Always pair a darker stroke with a lighter fill for contrast

**Do not invent new colors, in any style.** If a concept doesn't fit an existing semantic category, use Primary/Neutral or Secondary. Styles vary in which palette colors they emphasize (see each style's COLORS field above), never in which colors exist.

---

## Modern Aesthetics

For clean, professional diagrams:

### Roughness
- `roughness: 0` — Clean, crisp edges. Default for `infographic`, `presentation`, `diagram`, `mindmap`, `mindmap-structured`, `mockup`.
- `roughness: 1` — Hand-drawn, organic feel. Default for `whiteboard`; also used when the user explicitly asks for `draw-level: sketch`.

### Stroke Width
- `strokeWidth: 1` — Thin, elegant. Good for lines, dividers, subtle connections, and `draw-level: polished`.
- `strokeWidth: 2` — Standard. Good for shapes and primary arrows.
- `strokeWidth: 3` — Bold. Use sparingly for emphasis (main flow line, key connections, `presentation` style's hero arrows).

### Opacity
**Always use `opacity: 100` for all elements.** Use color, size, and stroke width to create hierarchy instead of transparency.

### Small Markers Instead of Shapes
Instead of full shapes, use small dots (10-20px ellipses) as:
- Timeline markers
- Bullet points
- Connection nodes
- Visual anchors for free-floating text
- Category tags (`mindmap-structured`)

---

## Layout Principles

### Hierarchy Through Scale
- **Hero**: 300×150 - visual anchor, most important
- **Primary**: 180×90
- **Secondary**: 120×60
- **Small**: 60×40

### Whitespace = Importance
The most important element has the most empty space around it (200px+). This is the entire layout strategy for `presentation`.

### Flow Direction
Guide the eye: typically left→right or top→bottom for sequences, radial for hub-and-spoke (`mindmap`).

### Connections Required
Position alone doesn't show relationships. If A relates to B, there must be an arrow or line (except `mockup`, where adjacency itself is the relationship).

---

## Text Rules

**CRITICAL**: The JSON `text` property contains ONLY readable words.

```json
{
  "id": "myElement1",
  "text": "Start",
  "originalText": "Start"
}
```

Settings: `fontSize: 16`, `fontFamily: 3`, `textAlign: "center"`, `verticalAlign: "middle"` (adjust `fontSize` per style's TYPOGRAPHY field above).

---

## JSON Structure

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [...],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": 20
  },
  "files": {}
}
```

## Element Templates

See `references/element-templates.md` for copy-paste JSON templates for each element type (text, line, dot, rectangle, arrow), if present. Pull colors from `references/color-palette.md` based on each element's semantic purpose. If `element-templates.md` doesn't exist in your checkout, hand-craft elements directly from the JSON Structure above and the color palette — see Error Handling.

---

## Render & Validate (MANDATORY when the renderer is available)

You cannot judge a diagram from JSON alone. After generating or editing the Excalidraw JSON, you MUST render it to PNG, view the image, and fix what you see — in a loop until it's right. This is a core part of the workflow, not a final check. If the renderer isn't set up in your checkout, see Error Handling instead of skipping this silently.

### How to Render

```bash
cd references && uv run python render_excalidraw.py <path-to-file.excalidraw>
```

This outputs a PNG next to the `.excalidraw` file. Then use the **Read tool** on the PNG to actually view it.

### The Loop

After generating the initial JSON, run this cycle:

**1. Render & View** — Run the render script, then Read the PNG.

**2. Audit against your original vision** — Before looking for bugs, compare the rendered result to what you designed in the Steps above. Ask:
- Does the visual structure match the conceptual structure you planned?
- Does it look like the style you picked (see the Styles section — a `whiteboard` that looks like a `diagram` missed the brief)?
- Does each section use the pattern you intended (fan-out, convergence, timeline, etc.)?
- Does the eye flow through the diagram in the order you designed?
- Is the visual hierarchy correct — hero elements dominant, supporting elements smaller?
- For technical diagrams: are the evidence artifacts (code snippets, data examples) readable and properly placed?

**3. Check for visual defects:**
- Text clipped by or overflowing its container
- Text or shapes overlapping other elements
- Arrows crossing through elements instead of routing around them
- Arrows landing on the wrong element or pointing into empty space
- Labels floating ambiguously (not clearly anchored to what they describe)
- Uneven spacing between elements that should be evenly spaced
- Sections with too much whitespace next to sections that are too cramped
- Text too small to read at the rendered size
- Overall composition feels lopsided or unbalanced

**4. Fix** — Edit the JSON to address everything you found. Common fixes:
- Widen containers when text is clipped
- Adjust `x`/`y` coordinates to fix spacing and alignment
- Add intermediate waypoints to arrow `points` arrays to route around elements
- Reposition labels closer to the element they describe
- Resize elements to rebalance visual weight across sections

**5. Re-render & re-view** — Run the render script again and Read the new PNG.

**6. Repeat** — Keep cycling until the diagram passes both the vision check (Step 2) and the defect check (Step 3). Typically takes 2-4 iterations. Don't stop after one pass just because there are no critical bugs — if the composition could be better, improve it.

### When to Stop

The loop is done when:
- The rendered diagram matches the conceptual design from your planning steps
- It reads as the style you picked
- No text is clipped, overlapping, or unreadable
- Arrows route cleanly and connect to the right elements
- Spacing is consistent and the composition is balanced
- You'd be comfortable showing it to someone without caveats

### First-Time Setup
If the render script hasn't been set up yet:
```bash
cd references
uv sync
uv run playwright install chromium
```

---

## Error Handling

Unlike an image-generation-backed skill, this one has no API keys to check — but it does have a local dependency chain that can be missing or incomplete. Handle these explicitly rather than failing silently or pretending a step happened when it didn't.

| Situation | What to do |
|---|---|
| `references/render_excalidraw.py` (or `pyproject.toml`) is missing | The render pipeline hasn't been set up in this checkout. Tell the user directly: you can still hand-craft and deliver the `.excalidraw` JSON, but the Render & Validate loop can't run, so extra care is warranted reviewing the JSON by hand (coordinates, bindings, overlaps). Offer to build the renderer if the user wants it. |
| `references/element-templates.md` is missing | Fall back to the JSON Structure section and `color-palette.md` directly — hand-craft elements rather than blocking on the missing file. |
| `uv` or `playwright` isn't installed | Run First-Time Setup once; if that's not possible in this environment, treat it the same as "render pipeline missing," above. |
| Requested style conflicts with the content (e.g. `mockup` for a non-UI concept) | Don't force it. Say so, and suggest the nearest fit (usually `diagram` or `infographic`), or ask which the user prefers. |
| Diagram is trending too large for one file/response | Switch to the Large/Comprehensive Diagram Strategy (section-by-section) rather than truncating output. |
| `.excalidraw` JSON fails to parse or has dangling `boundElements`/`startBinding`/`endBinding` references | Fix before rendering — a broken binding will silently misrender rather than error loudly, so check by hand during Phase 2 review, above. |
| User doesn't name a style and content doesn't clearly suggest one | Default to `diagram` (see Arguments table) rather than asking — it's the safest general-purpose choice. |

---

## Notes

- **Style selection is the highest-leverage decision.** Getting the style right up front (see Steps, step 1) matters more than any individual layout choice — a technically perfect `diagram`-style output still misses the brief if the user asked for a `whiteboard` sketch.
- **No per-render cost.** This skill renders locally via Playwright, not a paid image-generation API — iterate on the Render & Validate loop as many times as it takes to get right. There's no reason to stop early to save money.
- **Output is editable, not just a picture.** Because the deliverable is `.excalidraw` JSON, the user (or a future you) can open it in Excalidraw and keep editing — bias toward clean structure and descriptive IDs (see Large/Comprehensive Diagram Strategy) so that future edits are easy, not just toward how it looks in the current PNG.
- **Audience shapes complexity, not just style.** A `diagram` for an internal engineering audience can assume more context than one meant for a tutorial video — when in doubt, err toward the Comprehensive/Technical end of Depth Assessment, since evidence artifacts rarely hurt and missing context always does.
- **`multi-frame` mode is for stories, not variations.** Use it when the content is genuinely sequential (a protocol handshake, an onboarding flow) — not as a way to offer the user "three versions to pick from."

---

## Quality Checklist

### Style Fit (Check First)
1. **Style matches request**: Did you pick the style the user asked for, or the best-inferred default (`diagram`) if they didn't say?
2. **Style's own fields honored**: Does the diagram match its style's CANVAS/LAYOUT/CONNECTIONS/TYPOGRAPHY/OVERALL FEEL as specified above?

### Depth & Evidence (Check Next for Technical Diagrams)
3. **Research done**: Did you look up actual specs, formats, event names?
4. **Evidence artifacts**: Are there code snippets, JSON examples, or real data?
5. **Multi-zoom**: Does it have summary flow + section boundaries + detail?
6. **Concrete over abstract**: Real content shown, not just labeled boxes?
7. **Educational value**: Could someone learn something concrete from this diagram?

### Conceptual
8. **Isomorphism**: Does each visual structure mirror its concept's behavior?
9. **Argument**: Does the diagram SHOW something text alone couldn't?
10. **Variety**: Does each major concept use a different visual pattern (except `mockup`, which is deliberately representational)?
11. **No uniform containers**: Avoided card grids and equal boxes?

### Container Discipline
12. **Minimal containers**: Could any boxed element work as free-floating text instead?
13. **Lines as structure**: Are tree/timeline patterns using lines + text rather than boxes?
14. **Typography hierarchy**: Are font size and color creating visual hierarchy (reducing need for boxes)?

### Structural
15. **Connections**: Every relationship has an arrow or line
16. **Flow**: Clear visual path for the eye to follow
17. **Hierarchy**: Important elements are larger/more isolated

### Technical
18. **Text clean**: `text` contains only readable words
19. **Font**: `fontFamily: 3` (or the style's specified variant)
20. **Roughness**: Matches the style's default (see Modern Aesthetics), unless the user overrode `draw-level`
21. **Opacity**: `opacity: 100` for all elements (no transparency)
22. **Container ratio**: <30% of text elements should be inside containers (not applicable to `mockup`)

### Visual Validation (Render Required if the pipeline is available)
23. **Rendered to PNG**: Diagram has been rendered and visually inspected — or, if the renderer is missing, the JSON was hand-reviewed per Error Handling
24. **No text overflow**: All text fits within its container
25. **No overlapping elements**: Shapes and text don't overlap unintentionally
26. **Even spacing**: Similar elements have consistent spacing
27. **Arrows land correctly**: Arrows connect to intended elements without crossing others
28. **Readable at export size**: Text is legible in the rendered PNG
29. **Balanced composition**: No large empty voids or overcrowded regions
