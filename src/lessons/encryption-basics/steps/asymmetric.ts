import type { Step } from "../../../types";

export const asymmetric: Step = {
  id: "asymmetric",
  title: "Asymmetric Encryption — A Public Padlock",
  prose:
    "Now picture an open padlock that you hand out freely. Anyone can take your " +
    "padlock, put a message in a box, and snap it shut — but once it clicks, only " +
    "you can reopen it, because only you hold the matching key. That's asymmetric " +
    "encryption: a pair of keys that belong together. The public key (the open " +
    "padlock) can be given to the whole world and is used to lock. The private key " +
    "(the one in your pocket) is kept secret and is the only thing that unlocks. " +
    "Because the locking key and the unlocking key are different, you no longer " +
    "need to secretly share a single key first — anyone can send you something " +
    "only you can read. The trade-off is that this padlock is slow and clumsy for " +
    "large amounts of data, so it's used sparingly. It's also not the only trick " +
    "asymmetric math can do — the next step shows a stranger one: deriving a " +
    "shared secret without ever sending it.",
  bullets: [
    "Two matching keys: a public one (locks) and a private one (unlocks)",
    "The public key can be shared with anyone — no secret handoff needed",
    "Only the private key can open what the public key locked",
    "Slower than symmetric, so it's used only for small, critical steps",
  ],
  subSteps: ["diffie-hellman"],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Anyone</div>
        <div class="node-sub">uses public padlock 🔓 to lock</div>
      </div>
      <div class="link">
        <div class="lock">🔒</div>
        <div class="link-label">locked, cannot be reopened by the sender</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">You</div>
        <div class="node-sub">private key 🔑 is the only thing that opens it</div>
      </div>
    </div>
    <p class="diagram-note">
      You can print your open padlock on a billboard — that's fine. Snapping it
      shut is easy for anyone; reopening it requires the private key that never
      leaves your pocket.
    </p>
  `,
};
