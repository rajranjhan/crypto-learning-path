import type { Step } from "../../../types";

export const block: Step = {
  id: "block",
  title: "Block Ciphers — Scrambling a Fixed-Size Chunk at a Time",
  sidebarGroup: "Modern Symmetric Ciphers",
  prose:
    "Substitution and Caesar share one flaw that dooms them against a patient " +
    "attacker: they operate letter by letter, so whatever statistical pattern " +
    "exists in the plaintext survives into the ciphertext. Modern symmetric " +
    "ciphers close that gap by design. A <strong>block cipher</strong> doesn't " +
    "touch one letter at a time — it slices the message into fixed-size chunks " +
    "(AES uses 128-bit blocks, 16 bytes each) and runs the <em>entire block</em> " +
    "through many rounds of mixing with the key: 10 to 14 rounds for AES, " +
    "depending on key size. Each round is designed so that flipping a single " +
    "input bit flips roughly half the output bits — the <strong>avalanche " +
    "effect</strong>. There's no leftover \"E is common in English\" fingerprint " +
    "to go looking for; the block comes out looking like pure noise.",
  bullets: [
    "Key + algorithm (e.g. AES) transforms one fixed-size block (e.g. 128 bits) at a time, over many mixing rounds",
    "Avalanche effect: one changed input bit flips roughly half the output bits — no residual letter-frequency pattern survives",
    "A message that isn't an exact multiple of the block size needs padding for its last partial block",
    "Encrypting each block independently isn't enough on its own — a mode of operation is still needed to chain blocks safely",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Plaintext block</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace;">128 bits</div>
      </div>
      <div class="link">
        <div class="lock">🔐</div>
        <div class="link-label">AES + key, 10–14 rounds of mixing</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Ciphertext block</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace;">128 bits, ~50% of bits flipped</div>
      </div>
    </div>
    <div class="flow" style="margin-top: 16px;">
      <div class="node" style="border-color: #b91c1c;">
        <div class="node-title" style="color: #b91c1c;">⚠️ ECB mode</div>
        <div class="node-sub">same plaintext block in → same ciphertext block out, every time. Repeated structure in the message leaks straight through.</div>
      </div>
      <div class="node" style="border-color: #047857;">
        <div class="node-title" style="color: #047857;">✅ CBC / GCM mode</div>
        <div class="node-sub">each block is mixed with something that changes block to block (an IV or counter), so identical plaintext blocks produce different ciphertext.</div>
      </div>
    </div>
    <p class="diagram-note">
      The block transform alone isn't the whole story — encrypting every block
      the same independent way (ECB) still leaks the shape of the message, just
      one block at a time instead of one letter at a time. A mode of operation
      is what actually stops that; it's why "AES" alone is never the full name
      of a real cipher suite — it's always "AES-GCM" or similar.
    </p>
  `,
};
