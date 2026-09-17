import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const asymmetric: Step = {
  id: "asymmetric",
  glossary: lessonTerms("private key", "public key"),
  title: "Asymmetric Encryption — Public Padlocks",
  prose:
    "Now picture an open padlock that Bob hands out freely. Alice can take Bob's " +
    "padlock, put a message in a box, and snap it shut — but once it clicks, only " +
    "Bob can reopen it, because only Bob holds the matching key. That's asymmetric " +
    "encryption: a pair of keys that belong together. The public key (the open " +
    "padlock) can be given to the whole world and is used to lock. The private key " +
    "(the one in Bob's pocket) is kept secret and is the only thing that unlocks. " +
    "Because the locking key and the unlocking key are different, you no longer " +
    "need to secretly share a single key first — Alice can send Bob something " +
    "only Bob can read. The trade-off is that this padlock is slow and clumsy for " +
    "large amounts of data, so it's used sparingly. It's also not the only trick " +
    "asymmetric math can do — the next step shows a stranger one: deriving a " +
    "shared secret without ever sending it.",
  bullets: [
    "For public-key encryption: a public key encrypts and its matching private key decrypts",
    "The public key can be shared with anyone — no secret handoff needed",
    "Only the private key can open what the public key locked",
    "Slower than symmetric, so it's used only for small, critical steps",
  ],
  takeaway: "Asymmetric cryptography solves stranger-to-stranger setup problems, but symmetric encryption still carries the bulk data.",
  subSteps: ["diffie-hellman"],
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Alice</div>
        <div class="node-sub">uses Bob's public padlock 🔓 to lock</div>
      </div>
      <div class="link">
        <div class="lock">🔒</div>
        <div class="link-label">locked, cannot be reopened by the sender</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Bob</div>
        <div class="node-sub">private key 🔑 is the only thing that opens it</div>
      </div>
    </div>
    <p class="diagram-note">
      Bob can publish the open padlock; only Bob keeps the unlocking key.
    </p>
  `,
  },
};
