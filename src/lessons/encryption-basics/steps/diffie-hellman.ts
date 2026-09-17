import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const diffieHellman: Step = {
  id: "diffie-hellman",
  glossary: lessonTerms("key exchange", "session key", "forward secrecy"),
  title: "Diffie-Hellman — Agreeing on a Secret",
  prose:
    "<p>The padlock is one flavor of asymmetric cryptography — locking a message so only one key can open it. There's a second, stranger flavor, and it's the one real TLS actually uses most: <strong>Diffie-Hellman key exchange</strong>, published by Whitfield Diffie and Martin Hellman in 1976. Neither side ever puts the shared secret in an envelope, locked or otherwise, and sends it across. Instead, both sides do their own private math and land on the <em>exact same secret independently</em> — without ever transmitting it in any form.</p>" +
    "<p>Picture paint instead of padlocks. Alice and Bob openly agree on one public color — say, yellow; anyone listening knows it too. Alice privately picks red and mixes it into the yellow, producing an orange she sends to Bob in the open. Bob privately picks blue, mixes it into the same yellow, and sends the resulting green to Alice, also in the open. Now each of them takes the color they just received and mixes in their own private color: Alice mixes her red into Bob's green; Bob mixes his blue into Alice's orange. Both end up holding the identical final color — because it's the same three colors combined either way.</p>" +
    "<p>An eavesdropper watched every color that crossed the wire — the public yellow, the orange, the green — but mixing paint doesn't reverse: there's no way to look at orange and recover \"red\" and \"yellow\" separately. Real Diffie-Hellman swaps paint for modular exponentiation (or points on an elliptic curve, in ECDH): easy to compute forward, computationally infeasible to invert. That one-wayness — the discrete logarithm problem — is the confidentiality guarantee.</p>" +
    "<p>One warning matters immediately: unauthenticated Diffie-Hellman does not prove who you mixed paint with. Mallory can stand in the middle, run one exchange with Alice and a separate exchange with Bob, and relay messages between them. Both sides get a secret, but not the same secret with each other. Real protocols authenticate the exchange with certificates and signatures — exactly what PKI and TLS add later.</p>",
  bullets: [
    "Both sides publicly agree on shared starting parameters (the paint's base color) — sent in the clear, safe for anyone to see",
    "Each side mixes in a private secret once and sends the public result across — never the secret itself",
    "Each side then mixes the other's public result with their own private secret; both land on the identical shared secret",
    "Security rests on the mixing step being easy to do but infeasible to reverse (the discrete logarithm problem)",
    "Unauthenticated Diffie-Hellman is vulnerable to man-in-the-middle attacks; real protocols authenticate the public values",
    "Ephemeral DH (the \"E\" in ECDHE) generates a fresh private secret for every handshake — the exact ServerKeyExchange / key_share messages in the TLS 1.2 and TLS 1.3 lessons ahead — so later long-term key compromise cannot unlock past sessions if ephemeral secrets were erased (forward secrecy)",
  ],
  takeaway: "Ephemeral Diffie-Hellman gives forward secrecy, but it still needs authentication to stop man-in-the-middle attacks.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Alice</div>
        <div class="node-sub">private 🔴 + public base 🟡 → sends 🟠</div>
      </div>
      <div class="link">
        <div class="lock">🔄</div>
        <div class="link-label">public values cross an open wire</div>
        <div class="arrow">⇄</div>
      </div>
      <div class="node">
        <div class="node-title">Bob</div>
        <div class="node-sub">private 🔵 + public base 🟡 → sends 🟢</div>
      </div>
    </div>
    <div class="flow spaced">
      <div class="node node-proxy">
        <div class="node-title">Alice</div>
        <div class="node-sub">receives 🟢, mixes in private 🔴 → 🟤</div>
      </div>
      <div class="link">
        <div class="lock">🤝</div>
        <div class="link-label">both land on the identical secret</div>
        <div class="arrow">=</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Bob</div>
        <div class="node-sub">receives 🟠, mixes in private 🔵 → 🟤</div>
      </div>
    </div>
    <p class="diagram-note">
      Both sides reach the same secret; observers see only public values.
    </p>
  `,
  },
  callouts: [
    {
      type: "security-warning",
      requirementId: "MITM",
      title: "Key agreement is not identity",
      body: "Diffie-Hellman gives you a shared secret with whoever answered. Certificates and signatures are what tell you that the answer came from the intended server rather than an active attacker.",
    },
  ],
};
