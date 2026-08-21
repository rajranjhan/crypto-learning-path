import type { Step } from "../../../types";

export const choosingTheRightPrimitive: Step = {
  id: "choosing-the-right-primitive",
  title: "Choosing the Right Tool for the Job",
  prose:
    "<p>With all the pieces on the table, the actual decision is usually short. Need to keep data confidential and reversible for the key holder? AES-GCM (or ChaCha20-Poly1305, the modern non-AES alternative TLS 1.3 also supports) — an AEAD mode, never a bare cipher without authentication. Need to fingerprint data or detect tampering, with no secret involved? SHA-256 or SHA-384. Need to prove a message came from someone holding a specific shared secret? HMAC-SHA256. Need to protect a human-chosen password specifically? Argon2, not a general-purpose hash at all.</p>" +
    "<p>Two things do more for real-world security than any single algorithm choice: use a vetted, standard library implementation rather than writing your own, and prefer combined constructions (AEAD modes, HMAC) over hand-assembling a cipher and a hash yourself — most real-world cryptographic breaks come from misuse or a bad combination, not from breaking the underlying math.</p>",
  bullets: [
    "Confidentiality, reversible by the key holder: AES-GCM or ChaCha20-Poly1305 — an AEAD mode, never a bare unauthenticated cipher",
    "Fingerprinting / change detection, no secret involved: SHA-256 or SHA-384",
    "Proving a message came from a specific shared secret: HMAC-SHA256",
    "Protecting a human-chosen password: Argon2 (or bcrypt/scrypt) — never a general-purpose hash",
    "Use vetted standard library implementations, not homegrown code — most real-world breaks come from misuse, not from broken math",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Confidentiality</div>
        <div class="node-sub">AES-GCM / ChaCha20-Poly1305</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Fingerprinting</div>
        <div class="node-sub">SHA-256 / SHA-384</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Authenticity</div>
        <div class="node-sub">HMAC-SHA256</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Passwords</div>
        <div class="node-sub">Argon2 / bcrypt / scrypt</div>
      </div>
    </div>
    <p class="diagram-note">
      Four different jobs, four different tools. The TLS, OAuth, and
      Kerberos lessons in this series use the first three constantly — the
      fourth almost never comes up in a wire protocol, but it's the one
      beginners reach for the wrong tool on most often.
    </p>
  `,
};
