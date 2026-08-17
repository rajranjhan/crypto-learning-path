import type { Step } from "../../../types";

export const bridgeToTls: Step = {
  id: "bridge-to-tls",
  title: "Best of Both — How TLS Uses Them Together",
  prose:
    "Each approach solves the other's weakness. Symmetric is fast but needs a " +
    "shared secret key that's dangerous to hand over. Asymmetric solves the " +
    "handover but is too slow for real traffic. So TLS combines them: it uses the " +
    "slow public-padlock (asymmetric) step just once, at the start, purely to " +
    "agree on a fresh shared secret key that no eavesdropper can learn. From then " +
    "on, both sides switch to the fast shared-key lockbox (symmetric) to protect " +
    "every message. Think of it as using the padlock only to safely pass over a " +
    "brand-new key, then locking the actual conversation with that key. The TLS " +
    "lessons that follow show this happening byte by byte on the wire.",
  bullets: [
    "Asymmetric first: safely agree on a shared secret without a risky handoff",
    "Symmetric after: use that shared key for fast bulk encryption",
    "This handshake-then-transfer pattern is exactly what the TLS lessons walk through",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">1. Agree on a key</div>
        <div class="node-sub">asymmetric 🔓 — slow, used once</div>
      </div>
      <div class="link">
        <div class="lock">🔑</div>
        <div class="link-label">shared secret established</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">2. Exchange data</div>
        <div class="node-sub">symmetric 🔒 — fast, used for everything after</div>
      </div>
    </div>
    <p class="diagram-note">
      The expensive padlock does one job: get a shared key into both hands
      safely. Everything after rides on the fast symmetric lockbox — which is
      precisely the flow you'll see dissected in the TLS 1.2 and TLS 1.3 lessons.
    </p>
  `,
};
