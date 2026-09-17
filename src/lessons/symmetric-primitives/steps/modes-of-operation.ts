import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const modesOfOperation: Step = {
  id: "modes-of-operation",
  glossary: lessonTerms("IV", "nonce"),
  title: "Modes of Operation — Safe AES Use",
  prose:
    "<p>AES on its own only knows how to scramble one fixed 16-byte block. Real messages are almost never exactly 16 bytes, so a <strong>mode of operation</strong> decides how to stitch many block operations together — and the choice of mode matters enormously, independent of how strong AES itself is.</p>" +
    "<p>The naive approach, <strong>ECB (Electronic Codebook)</strong>, encrypts every block independently with the same key: identical plaintext blocks always produce identical ciphertext blocks. That leaks structure — famously, encrypting an image in ECB still shows the outline of the original picture, because repeated colors become repeated ciphertext blocks. ECB is considered broken for anything but a single 16-byte block.</p>" +
    "<p><strong>CBC (Cipher Block Chaining)</strong> fixes the repetition by XORing each block with the previous block's ciphertext before encrypting, seeded by a random <strong>initialization vector (IV)</strong> — but CBC provides no authentication on its own; a tampered ciphertext can decrypt into corrupted-but-plausible-looking plaintext with no built-in way to detect it. <strong>CTR (Counter)</strong> mode turns AES into a stream cipher instead, encrypting a counter value and XORing the result with the plaintext — fast and parallelizable, but, like CBC, no authentication.</p>" +
    "<p><strong>GCM (Galois/Counter Mode)</strong> is the mode used by the AES-GCM suites in these TLS examples: it's CTR-mode encryption plus a built-in authentication tag, computed alongside the encryption in a single pass. That tag is exactly what catches a tampered TLS record — this is the \"AEAD\" (Authenticated Encryption with Associated Data) property behind every AES-GCM cipher suite in the TLS lessons.</p>",
  bullets: [
    "IV rules depend on the mode: CBC needs an unpredictable IV; CTR counters and GCM nonces must not repeat under a key",
    "ECB: encrypts each block independently — identical plaintext blocks produce identical ciphertext blocks, leaking structure. Broken for anything but one block",
    "CBC: XORs each block with the previous ciphertext block, seeded by a random IV — no repetition, but no built-in authentication either",
    "CTR: turns AES into a stream cipher by encrypting a counter and XORing with plaintext — fast and parallelizable, still no authentication",
    "GCM: CTR-mode encryption plus a built-in authentication tag in a single pass — this is what AES-GCM in a TLS cipher suite actually means",
    "AEAD (Authenticated Encryption with Associated Data): the general term for a mode like GCM that bundles confidentiality and integrity/authenticity together",
  ],
  takeaway: "AEAD (Authenticated Encryption with Associated Data): the general term for a mode like GCM that bundles confidentiality and integrity/authenticity together.",
  figure: {
    body: `
    <div class="flow">
      <div class="node attacker">
        <div class="node-title text-warning">❌ ECB</div>
        <div class="node-sub">identical blocks in → identical blocks out — leaks structure</div>
      </div>
      <div class="node">
        <div class="node-title">CBC / CTR</div>
        <div class="node-sub">no repeated patterns — but no built-in authentication</div>
      </div>
      <div class="node trusted">
        <div class="node-title text-trusted">✅ GCM</div>
        <div class="node-sub">CTR encryption + a built-in authentication tag — what TLS actually uses</div>
      </div>
    </div>
    <p class="diagram-note">
      Real cipher suites name a safe mode, not just AES.
    </p>
  `,
  },
};
