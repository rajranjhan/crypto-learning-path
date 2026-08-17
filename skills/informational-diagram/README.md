# Informational Diagram Skill

A Claude Code skill that generates beautiful and practical Excalidraw diagrams from natural language descriptions, in one of seven named styles. Not just boxes-and-arrows — diagrams that **argue visually**.

## Core Styles

| Style | Use for | Roughness | Density |
|---|---|---|---|
| `whiteboard` | Live-explainer walkthroughs, educational content | hand-drawn | Loose |
| `infographic` | Data-rich technical content, published docs | clean | Dense |
| `presentation` | Slides, keynote-style single-concept diagrams | clean | Minimal |
| `diagram` | System architecture, protocol/API flows (default) | clean | Dense |
| `mindmap` | Exploratory brainstorms, concept maps | clean | Radial |
| `mindmap-structured` | Taxonomies, org charts, data-oriented breakdowns | clean | Tree |
| `mockup` | UI/UX wireframes, showing actual output | clean | Framed |

See `SKILL.md` → **Styles** for the full spec of each (canvas, layout, patterns, connections, typography, "overall feel").

## What Makes This Different

- **Diagrams that argue, not display.** Every shape/group of shapes mirrors the concept it represents — fan-outs for one-to-many, timelines for sequences, convergence for aggregation. No uniform card grids.
- **Seven named styles, one palette.** Style changes roughness, density, and layout strategy; it never changes color — every style pulls from the same `references/color-palette.md`.
- **Evidence artifacts.** Technical diagrams include real code snippets and actual JSON payloads.
- **Built-in visual validation.** A Playwright-based render pipeline lets Claude see its own output, catch layout issues (overlapping text, misaligned arrows, unbalanced spacing), and fix them in a loop before delivering.
- **Brand-customizable.** All colors and brand styles live in a single file (`references/color-palette.md`). Swap it out and every diagram, in every style, follows your palette.
- **No API key, no per-diagram cost.** Rendering happens locally via Playwright — there's no image-generation API bill to think about.

## Installation

This skill is already installed in the `skills/` directory of this repo. To use it, just ask Claude to create a diagram — no CLI invocation needed, it's a natural-language skill.

To install it into `~/.claude/skills/` (for use outside this repo) or into OpenClaw:

```bash
cd skills/informational-diagram
make install            # -> ~/.claude/skills/informational-diagram/
make openclaw-install   # -> ~/clawd/skills/informational-diagram/
```

Run `make help` for the full target list (`check`, `info`, `uninstall`, version bumping, `release`).

## Setup

The skill includes a render pipeline that lets Claude visually validate its diagrams. Set it up once:

**Ask Claude (easiest):**

Just tell Claude: *"Set up the informational-diagram skill renderer by following the instructions in SKILL.md."*

**Or manually:**

```bash
cd skills/informational-diagram/references
uv sync
uv run playwright install chromium
```

> If `references/render_excalidraw.py` isn't present in your checkout yet, the render/validate loop isn't wired up — Claude will still hand-craft and deliver the `.excalidraw` JSON, just without the automated visual check. See SKILL.md → Error Handling.

## Usage

Ask Claude to create a diagram, naming a style if you have one in mind:

> "Sketch out how DNS resolution works, whiteboard style"

> "Turn this API spec into an infographic"

> "Make a presentation-style slide showing the three pillars of our security model"

> "Diagram the authentication flow for this API" *(defaults to `diagram`)*

> "Give me a mindmap of the concepts in this doc"

> "Mock up the admin dashboard, desktop layout"

Claude will:
1. Pick a style (from your request, or infer the best default — see SKILL.md → Steps)
2. Assess whether this needs a simple or comprehensive diagram
3. Research actual specs/formats if technical
4. Map concepts to visual patterns (fan-out, convergence, timeline, etc.) filtered by the chosen style
5. Generate hand-crafted JSON with descriptive IDs
6. **Render to PNG and visually validate** (fixing any issues iteratively)
7. Deliver a polished diagram

## Customize Colors

Edit `references/color-palette.md` to match your brand. Every style pulls from this one file — none of them hardcode their own colors. Everything else in the skill is universal design methodology.

## File Structure

```
informational-diagram/
  SKILL.md                          # Design methodology, style directory, and workflow
  README.md                         # This file
  Makefile                          # Install/version/release automation
  metadata.json                     # Skill metadata (version, styles, dependencies)
  examples/                         # Example diagrams with explanations (add your own here)
  references/
    color-palette.md                # Brand colors (edit this to customize) — single source of truth
    element-templates.md            # JSON templates for each element type (optional, see below)
    json-schema.md                  # Excalidraw JSON format reference (optional, see below)
    render_excalidraw.py            # Render .excalidraw to PNG (optional, see below)
    render_template.html            # Browser template for rendering (optional, see below)
    pyproject.toml                  # Python dependencies (playwright) (optional, see below)
```

> **Note:** the render pipeline (`render_excalidraw.py`, `render_template.html`, `pyproject.toml`) and the template references (`element-templates.md`, `json-schema.md`) are referenced throughout `SKILL.md` but are not bundled in every checkout. If they're missing in yours, Claude will hand-craft JSON directly from `SKILL.md` and `color-palette.md` and skip the automated render step — see SKILL.md → Error Handling. Ask Claude to build them if you want the full automated loop.

## Examples

Add real diagram samples to `examples/` as you generate them — pair each `.excalidraw` file with a short explanation of the style and pattern choices, the way `SKILL.md` → Styles describes them.

The skill generates diagrams that:
- Match the requested style's canvas, layout, and typographic tone (see SKILL.md → Styles)
- Show actual code snippets and data formats (not just "API" or "Data")
- Use shape to convey meaning (fan-outs for broadcasts, timelines for sequences)
- Include multiple zoom levels (overview + sections + detail) for dense styles
- Default to free-floating text with selective containers
- Follow a consistent color palette with semantic meaning, regardless of style

## Key Principles

1. **Diagrams should ARGUE, not DISPLAY** - visual structure mirrors conceptual structure
2. **Style sets tone, palette sets color** - the two never mix
3. **Research first** - use actual specs, real event names, concrete examples
4. **Evidence artifacts** - show what things actually look like
5. **Multi-zoom architecture** - summary + sections + detail
6. **Minimal containers** - default to free-floating text
7. **Render & validate** - visual inspection loop when the pipeline is available

## Philosophy

From SKILL.md:

> **The Isomorphism Test**: If you removed all text, would the structure alone communicate the concept? If not, redesign.

> **The Education Test**: Could someone learn something concrete from this diagram, or does it just label boxes?

## Visual Patterns

The skill uses semantic visual patterns, favored differently per style (see SKILL.md → Styles for which patterns each style leans on):
- **Fan-out**: One-to-many relationships (broadcasts, spawning) — core pattern for `mindmap`
- **Convergence**: Many-to-one aggregation (funnels, merging)
- **Timeline**: Sequential steps with line + dots + labels
- **Spiral/Cycle**: Feedback loops, iterative processes
- **Cloud**: Abstract states, context (overlapping ellipses)
- **Assembly Line**: Input → Process → Output transformations
- **Tree**: Hierarchies using lines + free-floating text — core pattern for `mindmap-structured`
- **Side-by-Side**: Comparisons, before/after

## Troubleshooting

**Renderer not working, or `render_excalidraw.py` missing?**
```bash
cd references
uv sync
uv run playwright install chromium
```
If the files themselves aren't present, ask Claude to build the render pipeline — it's not required for the skill to produce diagrams, only for the automated visual validation loop.

**Colors look wrong?**
Check `references/color-palette.md` — every style's colors should come from there, never hardcoded per-style.

**Diagram doesn't read as the style I asked for?**
Check the style's spec in `SKILL.md` → Styles — each one defines roughness, layout, and typographic tone explicitly. Ask Claude to regenerate against that spec.

**Diagram too crowded?**
The skill uses section-by-section generation for large diagrams. Ask Claude to rebuild it with clearer spacing, or check whether `infographic`/`diagram` density is actually what you wanted versus a sparser style like `presentation`.

## Contributing

To improve this skill:
1. Edit `SKILL.md` for methodology or style changes
2. Edit `references/color-palette.md` for color customization
3. Edit `metadata.json` when adding a style or bumping the version (or use `make bump-patch` / `make bump-minor` / `make bump-major`)

The skill deliberately avoids Python generator scripts for diagram JSON itself in favor of hand-crafted JSON with descriptive IDs for better maintainability. (The Python that does exist, `render_excalidraw.py`, is only for screenshotting — it doesn't generate diagram content.)

## Viewing Diagrams

1. Go to https://excalidraw.com
2. Click "Open" or drag-and-drop the `.excalidraw` file
3. View, edit, and export as PNG/SVG

## References

- **Excalidraw**: https://excalidraw.com/
- **Workflow/structure modeled on**: https://github.com/ericblue/visual-explainer-skill (style directory, Makefile, metadata.json conventions — adapted here for local Excalidraw rendering instead of hosted image generation)
- **Original diagram-methodology implementation**: https://github.com/coleam00/excalidraw-diagram-skill

---

**Happy diagramming!**
