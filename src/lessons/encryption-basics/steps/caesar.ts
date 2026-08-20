import type { Step } from "../../../types";

export const caesar: Step = {
  id: "caesar",
  title: "The Caesar Cipher — A Substitution Cipher with One Number for a Key",
  sidebarGroup: "Classical Ciphers",
  prose:
    "The <strong>Caesar cipher</strong>, said to be used by Julius Caesar for " +
    "military messages, is a substitution cipher with a twist: instead of a " +
    "randomly reordered alphabet, every letter shifts forward by the same fixed " +
    "amount. Caesar reportedly used a shift of 3, so A becomes D, B becomes E, " +
    "and — wrapping back around the end of the alphabet — X becomes A. The key " +
    "collapses from an entire mapping down to a single number, and decrypting is " +
    "just shifting backward by that same number. It's still symmetric — one key, " +
    "run in reverse to undo what it did — but now the key is small enough to " +
    "remember in your head.",
  bullets: [
    "Key = one number, the shift amount (1 through 25)",
    "Encrypt by shifting each letter forward that many places, wrapping Z back to A; decrypt by shifting backward the same amount",
    "A special case of the substitution cipher: the mapping is just \"add N,\" not an arbitrary reordering",
    "Shrinking the key this far shrinks the keyspace too: only 25 possible shifts exist",
    "That's small enough to try every single one by hand in minutes — a brute-force attack that doesn't even need frequency analysis",
  ],
  diagram: `
    <div style="font-family: ui-monospace, monospace; background: var(--hex-bg); color: var(--hex-fg); padding: 14px; border-radius: 8px; font-size: 14px; line-height: 2; overflow-x: auto; white-space: pre;">
Plain:      A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Shift +3:   D E F G H I J K L M N O P Q R S T U V W X Y Z A B C</div>
    <div class="flow" style="margin-top: 16px;">
      <div class="node">
        <div class="node-title">Plaintext</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace; font-size: 16px;">HELLO</div>
      </div>
      <div class="link">
        <div class="lock">🔢</div>
        <div class="link-label">shift every letter forward by 3</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Ciphertext</div>
        <div class="node-sub" style="font-family: ui-monospace, monospace; font-size: 16px;">KHOOR</div>
      </div>
    </div>
    <p class="diagram-note">
      The whole key is the number 3 — decrypting KHOOR just shifts every letter
      back by 3. Because there are only 25 possible shifts to try (0 does
      nothing), an attacker doesn't even need frequency analysis: they can just
      try all 25 and read off the one that makes sense, by hand, faster than you
      can finish reading this sentence.
    </p>
  `,
};
