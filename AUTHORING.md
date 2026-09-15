# Authoring Guide

This course is intentionally structured: every lesson should feel like part of the same path, not a standalone article.

## Lesson Metadata

Every available lesson must provide:

- `summary`: one or two concise sentences.
- `whyItMatters`: two to four practical sentences.
- `objectives`: three to five learner-facing goals.
- `keyTakeaways`: three to six durable points.
- `prerequisites`: only when the lesson genuinely depends on prior concepts.
- `estimatedMinutes`, `difficulty`, and `lessonType` when known.
- `references`: optional standards or further reading links, especially for standards-related claims.

The registry title and lesson title must match exactly.

## Step Structure

Prefer this progression:

1. What problem are we solving?
2. Plain-language mental model.
3. What is happening technically.
4. Key points.
5. Practical implication.
6. Takeaway.

Each step needs a stable `id`, a clear `title`, and `prose`. Use bullets for concise summaries, not for duplicating the prose.

Step IDs must be unique inside a lesson. Sub-step IDs must reference real steps in the same lesson.

## Diagrams

Use reusable semantic classes instead of inline styles:

- `client`
- `server`
- `trusted`
- `warning`
- `attacker`
- `neutral`
- `encrypted`
- `public-information`

Use `figure` when possible. Authored HTML diagrams are allowed for complex examples, but they must:

- Avoid `style` attributes.
- Include meaningful `alt` text on images.
- Reference existing files under `public/diagrams/`.
- Not rely on color alone.
- Scale on mobile.

Prefer SVG/native diagrams over raster images when practical. Keep raster images only when the source is already image-based or hard to reproduce cleanly in HTML/SVG.

## Callouts

Use typed callouts consistently:

- `key-idea`
- `security-warning`
- `dont-confuse`
- `real-world`
- `under-the-hood`
- `legacy`

Callouts should add emphasis or risk framing, not become a second lesson body.

## Terminology

Use these meanings consistently:

- Encryption protects confidentiality by transforming plaintext into ciphertext with a key.
- Hashing is one-way fingerprinting, not encryption.
- HMAC/MAC proves integrity and authenticity with a shared secret.
- Digital signatures prove private-key authorization with public verification.
- Certificates bind public keys to names or claims through an issuer.
- Authentication asks who is present.
- Authorization asks what action is allowed.
- OAuth access tokens are authorization artifacts, not identity by themselves.
- Claims are facts in or about a token.
- Scopes describe delegated access requested/granted by OAuth.
- Audience identifies the intended resource server for a token.
- Nonces and IVs must follow the rule required by the cipher or protocol; do not use them interchangeably with salts.
- A salt is public randomness used to make repeated password/hash inputs distinct.
- A session key is a short-lived key derived for one connection or exchange.
- Forward secrecy means later long-term key compromise does not decrypt past sessions.

## Accessibility

Every authored lesson should remain usable with keyboard and screen readers:

- Images need meaningful alt text.
- Interactive annotations need keyboard focus.
- Do not communicate meaning by color alone.
- Keep focus states visible.
- Keep screen-reader order aligned with visual reading order.
- Avoid oversized paragraphs and dense walls of bold text.

## Testing

Before finishing a lesson change, run:

```bash
npm test
npm run build
```

Validation checks cover metadata, registry drift, duplicate slugs, duplicate step IDs, invalid sub-steps, broken internal lesson links, missing diagram assets, missing image alt text, and inline styles in authored lesson markup.
