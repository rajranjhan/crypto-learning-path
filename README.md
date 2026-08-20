# Crypto Learning Path

A static, single-page site that teaches applied cryptography and web security protocols by walking through the actual bytes on the wire — hex-dump breakdowns, annotated JWTs, and sequence diagrams, not just prose.

Built with plain TypeScript and [Vite](https://vitejs.dev/) — no UI framework, no runtime dependencies.

## Lessons

| Lesson | Slug |
|---|---|
| Encryption Basics: Symmetric & Asymmetric | `encryption-basics` |
| How TLS 1.2 Works | `tls12` |
| How TLS 1.3 Works | `tls13` |
| Mutual TLS: Client Authentication | `mtls` |
| OAuth 2.0: Tokens, FAPI & DPoP | `oauth` |
| Kerberos: Ticket-Based Authentication | `kerberos` |

Each lesson is a sequence of steps. A step either dissects a real wire record byte-by-byte (hexdump + hover-linked annotations) or explains a concept via prose, bullets, a sequence diagram, or an authored diagram.

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. The dev server hot-reloads on save.

### Other commands

```bash
npm run build      # Type-check (tsc) and build a production bundle to dist/
npm run preview    # Serve the production build locally, to sanity-check it before deploying
npm test           # Run the test suite once
npm run test:watch # Run the test suite in watch mode
```

`npm run build` fails on type errors, so it doubles as a type-check — no separate `typecheck` script is needed.

## Project Structure

```
index.html                  Vite entry point, loads src/main.ts
public/diagrams/            Static PNG diagrams referenced by lesson steps (served at /diagrams/*.png)
src/
  main.ts                   App bootstrap: routing (hash-based), top-level render loop
  types.ts                  Shared types (Lesson, Step, Annotation, Sequence, ...)
  styles/main.css           All styling
  components/                Rendering for hexdumps, sequence diagrams, annotated text blocks, steppers, callouts
  layout/sidebar.ts          Lesson navigation sidebar
  lessons/
    registry.ts               The list of lessons shown in the sidebar (slug, title, status)
    validate.ts                Dev-time authoring checks (bad annotation offsets, duplicate slugs, ...)
    <lesson>/lesson.ts          Each lesson's step sequence
    <lesson>/steps/*.ts         Individual step content
tests/                      Vitest unit tests (validation logic + lesson content integrity)
diagrams-src/                Editable .excalidraw sources for the PNGs in public/diagrams/ (not served directly)
```

### Routing

Navigation is hash-based: `#/lesson/<slug>` (overview) or `#/lesson/<slug>/<step-index>`. There's no server-side routing to configure — it all resolves client-side in `main.ts`.

### Adding or editing a lesson

1. Add step content under `src/lessons/<slug>/steps/`.
2. Assemble the steps into a lesson in `src/lessons/<slug>/lesson.ts`.
3. Register it in `src/lessons/registry.ts`.
4. Run `npm run dev` and check it in the sidebar; `npm test` runs the same authoring checks (`validateLesson`/`validateRegistry`) that the dev server surfaces to the console at runtime, so bad annotation offsets or duplicate slugs fail the test suite instead of shipping silently.

### Adding a diagram image

Export the PNG from Excalidraw into `public/diagrams/`, keep the `.excalidraw` source in `diagrams-src/` for future edits, and reference it from a step as `<img src="/diagrams/your-file.png" />` (see `src/lessons/oauth/steps/carnival-ticket.ts` for an example).

## Testing

Tests run under [Vitest](https://vitest.dev/) with a jsdom environment. `tests/validate.test.ts` covers the authoring-validation rules directly; `tests/lessons.test.ts` runs those same rules against the real lesson content and registry, so a bad annotation offset or a duplicate slug fails CI instead of only logging a console warning in dev.
