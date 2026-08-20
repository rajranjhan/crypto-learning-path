import type { Step } from "../../../types";

export const diffieHellman: Step = {
  id: "diffie-hellman",
  title: "Diffie-Hellman — Deriving a Shared Secret Without Sending It",
  prose:
    "<p>The padlock is one flavor of asymmetric cryptography — locking a message so only one key can open it. There's a second, stranger flavor, and it's the one real TLS actually uses most: <strong>Diffie-Hellman key exchange</strong>, published by Whitfield Diffie and Martin Hellman in 1976. Neither side ever puts the shared secret in an envelope, locked or otherwise, and sends it across. Instead, both sides do their own private math and land on the <em>exact same secret independently</em> — without ever transmitting it in any form.</p>" +
    "<p>Picture paint instead of padlocks. Alice and Bob openly agree on one public color — say, yellow; anyone listening knows it too. Alice privately picks red and mixes it into the yellow, producing an orange she sends to Bob in the open. Bob privately picks blue, mixes it into the same yellow, and sends the resulting green to Alice, also in the open. Now each of them takes the color they just received and mixes in their own private color: Alice mixes her red into Bob's green; Bob mixes his blue into Alice's orange. Both end up holding the identical final color — because it's the same three colors combined either way.</p>" +
    "<p>An eavesdropper watched every color that crossed the wire — the public yellow, the orange, the green — but mixing paint doesn't reverse: there's no way to look at orange and recover \"red\" and \"yellow\" separately. Real Diffie-Hellman swaps paint for modular exponentiation (or points on an elliptic curve, in ECDH): easy to compute forward, computationally infeasible to invert. That one-wayness — the discrete logarithm problem — is the entire security guarantee.</p>",
  bullets: [
    "Both sides publicly agree on shared starting parameters (the paint's base color) — sent in the clear, safe for anyone to see",
    "Each side mixes in a private secret once and sends the public result across — never the secret itself",
    "Each side then mixes the other's public result with their own private secret; both land on the identical shared secret",
    "Security rests on the mixing step being easy to do but infeasible to reverse (the discrete logarithm problem)",
    "Ephemeral DH (the \"E\" in ECDHE) generates a fresh private secret for every handshake — the exact ServerKeyExchange / key_share messages in the TLS 1.2 and TLS 1.3 lessons ahead — so a key compromised later still can't unlock past sessions (forward secrecy)",
  ],
  diagram: `
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
    <div class="flow" style="margin-top: 16px;">
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
      Same final color 🟤 on both sides. An eavesdropper only ever saw 🟡, 🟠,
      and 🟢 cross the wire — and mixing is a one-way trip, so there's no
      un-mixing either of those back into 🔴 or 🔵, let alone reconstructing 🟤.
      The real math is modular exponentiation (or elliptic-curve points), but
      the shape of the trick — easy to combine, hard to reverse — is identical.
    </p>
  `,
};
