import type { Step } from "../../../types";

export const symmetric: Step = {
  id: "symmetric",
  title: "Symmetric Encryption — One Shared Key",
  prose:
    "Imagine a lockbox with a single key. You lock the box with that key, and " +
    "anyone who owns an identical copy of the same key can unlock it. Symmetric " +
    "encryption works exactly like this: the same secret key both scrambles " +
    "(encrypts) and unscrambles (decrypts) the message. It is fast and simple, " +
    "which is why it's used to protect the bulk of real data. The hard part isn't " +
    "the lock — it's the key handoff. Before you can talk securely, both sides " +
    "must somehow already share the identical secret key. If someone copies that " +
    "key while you're passing it along, they can open every box you send.",
  bullets: [
    "One shared secret key does both the locking and the unlocking",
    "Fast — well suited to encrypting large amounts of data",
    "The catch: how do two strangers agree on the same secret key without anyone overhearing?",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Alice</div>
        <div class="node-sub">holds key 🔑</div>
      </div>
      <div class="link">
        <div class="lock">🔒</div>
        <div class="link-label">same key locks &amp; unlocks</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Bob</div>
        <div class="node-sub">holds identical key 🔑</div>
      </div>
    </div>
    <p class="diagram-note">
      Both people own an exact copy of the same key. Whatever Alice locks, Bob
      can open — and vice versa. The whole scheme is only as safe as the moment
      they shared that key.
    </p>
  `,
  subSteps: ["substitution", "caesar", "block", "stream"],
};
