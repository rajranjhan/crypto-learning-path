# Practical Cryptography, Byte by Byte

Visual explanations of encryption, TLS, PKI, OAuth and modern cryptographic protocols.

A static, single-page site that teaches applied cryptography and web security protocols by walking through the actual bytes on the wire — hex-dump breakdowns, annotated JWTs, and sequence diagrams, not just prose.

Built with plain TypeScript and [Vite](https://vitejs.dev/) — no UI framework, no runtime dependencies.

## Lessons

| Lesson | Slug |
|---|---|
| **Foundations** | |
| Encryption Basics: Symmetric & Asymmetric Keys | `encryption-basics` |
| Symmetric Cryptography: AES, SHA & HMAC | `symmetric-primitives` |
| Asymmetric Cryptography: RSA, ECC & Diffie-Hellman | `asymmetric-primitives` |
| **Identity and Trust** | |
| PKI: Certificates, CAs & Trust Chains | `pki` |
| TLS 1.2: Two-Round-Trip Handshake | `tls12` |
| TLS 1.3: One-Round-Trip Handshake | `tls13` |
| Mutual TLS: Client Authentication | `mtls` |
| **Data Protection** | |
| Encryption at Rest: Protecting Stored Data & Keys | `encryption-at-rest` |
| **Authentication and Authorization** | |
| Kerberos: Proving Who You Are with Tickets | `kerberos` |
| OAuth: Fundamentals | `oauth` |
| OAuth: Tokens, Claims & Security | `oauth-further-learning` |
| OAuth: Flows & Federation | `oauth-flows` |
| **Advanced Cryptography** | |
| Zero-Knowledge Proofs: Proving Without Revealing | `zero-knowledge-proofs` |
| Homomorphic Encryption: Computing on Encrypted Data | `homomorphic-encryption` |
| **Applied Cryptography** | |
| Blockchain Cryptography: Hashes, Signatures & Consensus | `blockchain-cryptography` |
| **Future of Cryptography** | |
| Post-Quantum Cryptography: Preparing for Quantum Threats | `quantum-cryptography` |

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
public/diagrams/            Static diagram exports referenced by lesson steps (served at /diagrams/*)
src/
  main.ts                   App bootstrap: routing (hash-based), top-level render loop
  types.ts                  Shared types (Lesson, Step, Annotation, Sequence, ...)
  search.ts                  In-memory search index + substring search over every lesson's overview/steps
  styles/main.css           All styling
  components/                Rendering for hexdumps, sequence diagrams, annotated text blocks, steppers, callouts, the search box (top-right of the content area, next to the stepper)
  layout/sidebar.ts          Lesson navigation sidebar
  lessons/
    index.ts                  Shared lesson module map used by the app and tests
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

See [AUTHORING.md](AUTHORING.md) for the full course authoring conventions: metadata, step structure, terminology, diagrams, accessibility, and validation rules.

1. Add step content under `src/lessons/<slug>/steps/`.
2. Assemble the steps into a lesson in `src/lessons/<slug>/lesson.ts`.
3. Register it in `src/lessons/registry.ts`.
4. Run `npm run dev` and check it in the sidebar; `npm test` runs the same authoring checks (`validateLesson`/`validateRegistry`) that the dev server surfaces to the console at runtime, so bad annotation offsets or duplicate slugs fail the test suite instead of shipping silently.

### Adding a diagram image

Prefer SVG for diagrams. When a raster export is necessary, optimize it as WebP, keep its intrinsic `width`/`height`, and add `loading="lazy" decoding="async"`; keep the editable source in `diagrams-src/`. Reference it from a step `figure.body` as `<img class="diagram-img" src="diagrams/your-file.webp" width="1800" height="700" loading="lazy" decoding="async" alt="Meaningful description." />` (see the OAuth diagram steps for examples).

## Testing

Tests run under [Vitest](https://vitest.dev/) with a jsdom environment. `tests/validate.test.ts` covers the authoring-validation rules directly; `tests/lessons.test.ts` runs those same rules against the real lesson content and registry, so a bad annotation offset or a duplicate slug fails CI instead of only logging a console warning in dev.

## Public metadata

`index.html` contains the search description, canonical URL, Open Graph fields, and Twitter/X large-image card metadata. The canonical deployment is `https://rajranjhan.github.io/crypto-learning-path/`. If the public domain changes, update the canonical, `og:url`, and both absolute social-image URLs together.

The social preview image is `public/social-card.webp` (1200 × 628). Vite copies it to the deployment root. Keep the image dimensions and alt text in `index.html` consistent with any replacement. Author metadata uses the repository's public author name, `rajranjhan`; no social account is inferred. Lesson entry pages receive their own title, description, canonical URL, and social metadata during the build. Individual hash-based steps use their parent lesson’s canonical URL.

## Static lesson URLs and indexing

`npm run build` generates the homepage and all 16 lesson overviews as HTML, plus `sitemap.xml` and `robots.txt`. The sitemap contains only the homepage and permanent lesson overview pages; individual transient step routes are intentionally excluded. Each lesson page also includes conservative JSON-LD for its `Course`/`LearningResource` description and breadcrumbs. The homepage includes a `WebSite` description. No ratings, reviews, provider, certification, or credential claims are generated. Each lesson has a real directory and `index.html`, so GitHub Pages can serve it without rewrite rules or a server runtime. The existing deployment workflow still uploads `dist/` unchanged.

Public paths are mapped to stable lesson slugs in `src/lesson-urls.ts`. Examples:

- `tls13` → `/tls-13/`
- `encryption-basics` → `/cryptography-basics/`
- `oauth-further-learning` → `/oauth-tokens-security/`

On the current GitHub Pages project, these paths live beneath `/crypto-learning-path/`, such as `https://rajranjhan.github.io/crypto-learning-path/tls-13/`. Relative base URLs let the same build run at a domain root or project subpath; canonical URLs use the configured production origin.

`scripts/static-pages.ts` renders the same overview and navigation components used by the browser. The initial HTML includes the lesson heading, summary, rationale, objectives, visual, prerequisites, roadmap, and crawlable links. JavaScript opens the matching interactive lesson. Existing `#/lesson/...` bookmarks and detailed step routes remain supported, including annotated bytes, JWTs, HTTP messages, and sequences. Individual steps are not separate static pages.

Run `npm run preview` after building to inspect the generated HTML. Clean lesson paths also work with `npm run dev`. If moving domains, update `siteUrl` in `src/lesson-urls.ts` and the site metadata in `index.html`. Submit the deployed `sitemap.xml` URL in your search engine tools; generation creates crawlable pages but does not guarantee indexing.
