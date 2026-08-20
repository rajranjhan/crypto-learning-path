import type { Step } from "../../../types";

export const substitution: Step = {
  id: "substitution",
  title: "Substitution Ciphers — The Earliest Shared-Key Lockbox",
  sidebarGroup: "Classical Ciphers",
  prose:
    "Long before computers, people were already doing symmetric encryption by " +
    "hand. A <strong>substitution cipher</strong> replaces every letter of the " +
    "message with a different letter, according to a fixed rule agreed on in " +
    "advance: A always becomes Q, B always becomes W, and so on, for every letter " +
    "in the alphabet. That fixed reassignment — the mapping itself — is the key. " +
    "It's symmetric encryption in its oldest form: the same key both locks the " +
    "message (apply the mapping forward) and unlocks it (look up each cipher " +
    "letter's position to reverse it). Whoever has the mapping can do both.",
  bullets: [
    "Key = a fixed reordering of the alphabet, agreed on by both sides in advance",
    "Encrypt by substituting each plaintext letter for its mapped letter; decrypt by reversing the lookup",
    "Same key runs both directions — the defining trait of a symmetric cipher",
    "The keyspace is enormous (26! ≈ 4×10²⁶ possible alphabets) — and yet these ciphers are broken almost every time",
    "Weakness: the substitution preserves the shape of the underlying message — repeated letters stay repeated, and common letters stay common. That statistical fingerprint is what frequency analysis reads",
  ],
  diagram: `
    <div style="font-family: ui-monospace, monospace; background: var(--hex-bg); color: var(--hex-fg); padding: 14px; border-radius: 8px; font-size: 14px; line-height: 2; overflow-x: auto; white-space: pre;">
Plain:   A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Cipher:  Q W E R T Y U I O P A S D F G H J K L Z X C V B N M</div>
    <div class="flow" style="margin-top: 16px;">
      <div class="node">
        <div class="node-title">Plaintext</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace; font-size: 16px;">HELLO</div>
      </div>
      <div class="link">
        <div class="lock">🔑</div>
        <div class="link-label">same key, applied letter by letter</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Ciphertext</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace; font-size: 16px;">ITSSG</div>
      </div>
    </div>
    <p class="diagram-note">
      This particular key is easy to memorize without writing it down: it's just
      the top three rows of a QWERTY keyboard, read left to right
      (<code>QWERTYUIOP</code>, <code>ASDFGHJKL</code>, <code>ZXCVBNM</code>).
      Look what happens to the double L in HELLO — it becomes a double S in
      ITSSG. The key hid the letters, but it couldn't hide the <em>pattern</em>
      of repetition. That leftover structure is exactly what frequency analysis
      exploits, no matter how large the keyspace is.
    </p>
  `,
};
