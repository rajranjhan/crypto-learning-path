# Authoring Guide

This course is intentionally structured: every lesson should feel like part of the same path, not a standalone article.

## Lesson Metadata

Every available lesson must provide:

- `summary`: exactly one concise sentence.
- `whyItMatters`: one to three short, practical sentences.
- `objectives`: three to five learner-facing goals.
- `keyTakeaways`: three to six durable points.
- `prerequisites`: only when the lesson genuinely depends on prior concepts.
- `estimatedMinutes`, `difficulty`, and `lessonType` when known.
- `references`: optional standards or further reading links, especially for standards-related claims.
- `checkYourUnderstanding`: two to four mental-model questions with concise answers learners can reveal after thinking.
- `transitionToNext`: explain why the next lesson follows; for the final lesson, suggest a practical application or review activity.

The summary and Why This Matters should communicate the lesson's purpose in roughly 15–20 seconds (aim for no more than 60 words combined). Follow with 3–5 concise objectives, one visual, and the linked lesson roadmap. Do not repeat introductory narrative in figure bodies.

The registry title and lesson title must match exactly.

## Lesson Endings

End every lesson in this order:

1. **What to Remember**: 3–6 concise, durable takeaways.
2. **Check Your Understanding**: prefer 2–4 questions testing reasoning, boundaries, or application rather than trivia. Include a short explanatory answer for each.
3. **Next**: explain the connection to the next lesson and link to it. At the end of the course, offer a practical next step without implying another lesson exists.
4. **Go Deeper**: optional authoritative references, such as standards, original papers, or official project documentation.

Ask “Why doesn't Diffie-Hellman by itself prove who you are talking to?” rather than asking for its publication year. Questions should be answerable from the lesson and expose likely misunderstandings.

## Step Structure

Prefer this progression:

1. What problem are we solving?
2. Plain-language mental model.
3. What is happening technically.
4. Key points.
5. Practical implication.
6. Takeaway.

Each step needs a stable `id`, a clear `title`, `prose`, and one concise `takeaway`. Use bullets for concise summaries, not for duplicating the prose.

Step titles should be short conceptual labels in Title Case. Prefer `Concept — Clarifier` when the second phrase explains the first, such as `Bearer Tokens — The Theft Problem` or `Certificate Chains — Establishing Trust`. Avoid questions, full sentences, commands, and colon-heavy descriptions.

Write steps with the same rhythm even when you do not show visible headings:

1. Context: where are we, and what problem are we solving?
2. Mental model: explain the concept in plain language.
3. Technical reality: connect the metaphor to the real cryptographic or protocol behavior.
4. Visual / bytes / sequence: show the relevant diagram, flow, JWT, HTTP exchange, or wire representation.
5. Why it matters: state the security consequence.
6. Takeaway: one concise sentence, rendered as `Takeaway: ...`.

Step IDs must be unique inside a lesson. Sub-step IDs must reference real steps in the same lesson.

## Technical Displays

Preserve hexdumps, byte annotations, annotated JWTs, HTTP messages, and protocol sequences. Improve orientation around these displays rather than replacing them with summaries.

Every step with `bytes`, `textBlock`, or `sequence` must provide `wireContext` with three short, specific statements:

- `where` — **Where we are**: what the participants have established so far.
- `now` — **What happens now**: the message, operation, or exchange shown below.
- `why` — **Why**: the purpose or security requirement it addresses.

The renderer places this context before the technical displays, following any introductory prose and figure. It replaces the older progress summary when both are present, while retaining the full sequence and its highlighted messages. Context should explain the current state accurately: receiving a certificate is distinct from validating it or proving possession of its private key. For a worked calculation, describe the setup, operation, and learning purpose without pretending it is a network capture.

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

Use the semantic visual language consistently:

- Blue: client/user.
- Purple: service/server.
- Green: trusted, validated, or successful.
- Amber: attention or intermediate state.
- Red: attacker, failure, or security risk.
- Gray: neutral infrastructure or public information.

Do not communicate meaning through color alone. Pair semantic color with text labels, icons, borders, dashed risk styling, captions, or explicit copy.

Use `figure` when possible. Authored HTML diagrams are allowed for complex examples, but they must:

- Avoid `style` attributes.
- Include meaningful `alt` text on images.
- Reference existing files under `public/diagrams/`.
- Not rely on color alone.
- Scale on mobile.
- Communicate structure at a glance. Prefer short labels such as `Authorization Server`, `Replay Risk`, or `Validated Chain`; put detailed explanation in the surrounding prose or a concise caption.

Lessons do not have a separate free-form `overview` body. Overview pages render from structured metadata (`summary`, `whyItMatters`, `objectives`, prerequisites, references, roadmap) plus exactly one primary lesson `figure`. A figure should contain one visual, not a stack of tables and diagrams. Keep captions to one short sentence; move detailed explanations into lesson steps.

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

Use the shared definitions in `src/lessons/terminology.ts` via `lessonTerms(...)` when a step introduces or contrasts terms. Keep definitions in step prose, diagrams, questions, and takeaways consistent with these meanings:

- **plaintext**: Data before encryption or after decryption; it can be binary data, not just readable text.
- **ciphertext**: The encrypted representation of plaintext, recoverable by decryption with the appropriate key.
- **symmetric key**: A secret key shared by parties using a symmetric algorithm; encryption and decryption use the same key.
- **private key**: The secret member of an asymmetric key pair, used to sign, decrypt, or contribute to key agreement, depending on the algorithm.
- **public key**: The shareable member of an asymmetric key pair, used to verify signatures, encrypt, or contribute to key agreement; it does not establish identity by itself.
- **session key**: A symmetric key generated or derived for a limited session or exchange. A protocol can use separate keys for each direction and purpose.
- **key exchange**: A process for establishing shared key material. Key agreement, such as Diffie-Hellman, derives it jointly; key exchange alone does not authenticate the peer.
- **encryption**: A keyed transformation from plaintext to ciphertext for confidentiality. Encryption alone does not necessarily detect tampering or authenticate a peer.
- **encoding**: A reversible change of representation, such as Base64 or hex, that needs no secret to decode. Encoding is not encryption.
- **hashing**: Computing a digest from data with a hash function. Cryptographic hashing is designed to resist inversion, but guessable inputs can be tested; hashing is not encryption.
- **digest**: The output of a hash function: a data fingerprint, not ciphertext or proof of who supplied the data.
- **MAC**: A message authentication code: a keyed tag used to check message integrity and authenticity among shared-key holders. Any holder can generate tags.
- **HMAC**: A MAC construction that combines a cryptographic hash function with a shared secret key. It neither encrypts data nor provides a public-key signature.
- **signature**: A digital signature is generated with a private key and verified with its public key. It binds a message to that key, not automatically to a person or permission.
- **nonce**: A value whose reuse is restricted within a specified protocol or key context. Uniqueness, unpredictability, and secrecy requirements depend on its role; a nonce is not a salt.
- **IV**: An initialization vector: an input that initializes an encryption mode. Requirements vary: CBC needs an unpredictable IV; GCM requires nonce uniqueness for each key.
- **salt**: A normally public, per-input value used in password hashing or key derivation. Password salts separate repeated passwords and frustrate precomputation; they do not make guessing slow by themselves.
- **certificate**: An issuer-signed binding between a public key and names or other attributes. Trust requires validation; a domain-validated certificate is not automatic proof of corporate identity or trustworthiness.
- **trust anchor**: A public key and associated information accepted through local trust configuration as the starting point for certificate validation, commonly represented by a root CA certificate.
- **authentication**: Verifying a claimed identity or message origin. Message authentication with a shared key does not distinguish individual holders of that key.
- **authorization**: Deciding which actions a principal or client may perform on a resource. Successful authentication does not grant every permission.
- **access token**: A credential representing granted access, presented to a resource server and validated under its policy. It may be opaque or structured; it is not an ID token.
- **refresh token**: A credential presented to the authorization server to obtain new access tokens within the grant. It is not sent to the resource server as an access token.
- **scope**: A named extent of access requested or granted in OAuth. Granted scopes limit token use but do not replace resource-specific authorization checks.
- **claim**: An assertion about a subject or token, such as issuer, expiry, or audience. A claim is not a verified fact merely because it appears in a token.
- **audience**: The intended recipient or recipients of a token. For an access token this is generally the resource server; for an OIDC ID token it includes the client.
- **bearer token**: A token usable by whoever possesses it, without a separate proof of a bound key. Its validity and authorization limits still apply.
- **proof of possession**: Cryptographic evidence that a party controls a particular key. Possessing a token or certificate alone is not proof of its associated private key.
- **forward secrecy**: Protection of past session secrets against later compromise of long-term keys, assuming ephemeral secrets were erased and the protocol was used securely.

Reinforce these boundaries explicitly: encoding ≠ encryption; hashing ≠ encryption; authentication ≠ authorization; OAuth ≠ user authentication; certificate ≠ automatic proof of corporate identity; key exchange ≠ authentication. OAuth is an authorization framework; OpenID Connect adds the user authentication layer. Use “private key” for asymmetric keys and “shared secret” or “symmetric key” for symmetric keys. A JWT MAC may be called a signature in JOSE terminology, but HS256 is HMAC, not an asymmetric digital signature.

Reference definitions: [OAuth 2.0 (RFC 6749)](https://www.rfc-editor.org/rfc/rfc6749), [JWT (RFC 7519)](https://www.rfc-editor.org/rfc/rfc7519), and [PKIX (RFC 5280)](https://www.rfc-editor.org/rfc/rfc5280).

Use actor names consistently:

- Introductory cryptography examples use Alice, Bob, and Mallory.
- Protocol lessons use protocol roles: Client, Server, Authorization Server, Resource Server, Identity Provider, Certificate Authority, and KDC / AS / TGS where appropriate.
- If a metaphor uses simpler labels such as bank, ticket booth, ride gate, staff house, or you, map them explicitly to the protocol role before switching vocabulary.
- Do not alternate between You, Browser, Alice, and Client in the same flow unless the relationship is stated.

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
