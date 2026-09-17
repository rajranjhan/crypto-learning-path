import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const stream: Step = {
  id: "stream",
  glossary: lessonTerms("nonce"),
  title: "Stream Ciphers — Non-Repeating Keystreams",
  sidebarGroup: "Modern Symmetric Ciphers",
  prose:
    "A <strong>stream cipher</strong> is, mechanically, closer to the Caesar " +
    "cipher than to a block cipher: it still combines the message with key " +
    "material one small piece at a time, rather than transforming a whole chunk " +
    "at once. What changes is where that key material comes from. Caesar reused " +
    "the same shift for every letter, which is exactly what made it breakable. A " +
    "stream cipher instead feeds a secret key and a one-time number (a " +
    "<strong>nonce</strong>) into an algorithm that generates an effectively " +
    "unpredictable sequence of bits within the cipher's message-length limit — the <strong>keystream</strong> — " +
    "that must not be reused by repeating the key/nonce pair. Encrypting is just <code>XOR</code>: " +
    "combine each plaintext byte with the next keystream byte. Decrypting runs " +
    "the identical operation again, because XOR-ing the same value twice cancels " +
    "it out — which is also exactly why the same key material can never be " +
    "reused. ChaCha20, used throughout TLS 1.3, is a widely deployed example.",
  bullets: [
    "Key + nonce feed an algorithm that produces an unpredictable keystream, one byte at a time, for as long as the message runs",
    "Encrypt = plaintext XOR keystream; decrypt = ciphertext XOR that same keystream — XOR undoes itself",
    "The same move as a Caesar shift (combine plaintext with key material, position by position) — only the \"shift\" is now unpredictable and never repeats",
    "Reusing a key/nonce pair is catastrophic: XOR-ing two ciphertexts that share a keystream cancels the keystream out and exposes a relationship between the two plaintexts",
    "ChaCha20 (TLS 1.3) and AES-CTR (which turns a block cipher into a stream cipher) are common modern examples",
  ],
  takeaway: "ChaCha20 (TLS 1.3) and AES-CTR (which turns a block cipher into a stream cipher) are common modern examples.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Key + nonce</div>
        <div class="node-sub">feeds the algorithm</div>
      </div>
      <div class="link">
        <div class="lock">🌊</div>
        <div class="link-label">generates an endless keystream</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Plaintext ⊕ Keystream</div>
        <div class="node-sub">byte by byte, for the length of the message</div>
      </div>
    </div>
    <div class="flow spaced">
      <div class="node trusted">
        <div class="node-title text-trusted">✅ Fresh nonce, every message</div>
        <div class="node-sub">a brand-new, never-repeating keystream each time — safe</div>
      </div>
      <div class="node attacker">
        <div class="node-title text-warning">❌ Reused nonce</div>
        <div class="node-sub">reused keystream leaks plaintext</div>
      </div>
    </div>
    <p class="diagram-note">
      A stream cipher is safe only when the keystream never repeats.
    </p>
  `,
  },
};
