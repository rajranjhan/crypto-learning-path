import type { Step } from "../../../types";

export const harvestNowDecryptLater: Step = {
  id: "harvest-now-decrypt-later",
  title: "The Real Threat Isn't Tomorrow — It's Today's Recorded Traffic",
  prose:
    "<p>A patient thief doesn't wait around for the locksmith's machine to be built. He walks through the TLS lessons' mailroom today, photographs every locked box crossing the counter, and files the photographs away in a drawer. He can't open a single one of them right now — but the day the skeleton-key machine finally exists, he pulls out years of old photographs and opens every box he ever collected, all at once.</p>" +
    "<p>The most urgent quantum risk has nothing to do with a quantum computer existing yet. An adversary can record encrypted traffic today — a TLS session, a VPN tunnel, an archived backup — and simply store the ciphertext, waiting for a sufficiently powerful quantum computer to arrive years or decades from now, at which point Shor's algorithm decrypts the key exchange and unlocks everything that was ever recorded. This is called <strong>harvest now, decrypt later</strong>, and it's already a documented strategy for well-resourced adversaries, specifically because it works even without a working quantum computer today.</p>" +
    "<p>What makes this urgent right now rather than a future problem: it only matters for data whose confidentiality needs to outlive the time it takes to build a large quantum computer. A one-time password expiring in 30 seconds is irrelevant to this threat. A state secret, a medical record, or an intelligence source's identity that needs to stay confidential for 20+ years is exactly the kind of data being harvested today for tomorrow's decryption.</p>" +
    "<p>This is also why the fix can't wait for quantum computers to actually arrive: the ciphertext being harvested today is protected by whatever key exchange algorithm was in use at the time it was recorded. Migrating to quantum-resistant algorithms only protects data encrypted after the migration — it does nothing retroactively.</p>",
  bullets: [
    "The thief with a drawer full of photographs: he can't open any locked box today, but he can open all of them the day the skeleton-key machine exists",
    "Harvest now, decrypt later: an adversary records encrypted traffic today and decrypts it once a large quantum computer exists",
    "This requires no working quantum computer today — only patience and storage",
    "Only matters for data whose required confidentiality lifetime is longer than the time until large quantum computers arrive",
    "Migrating to quantum-resistant algorithms protects future traffic only — it can't retroactively protect data already harvested",
    "This is the reason quantum-resistant migration is treated as urgent today, not deferred until quantum computers actually exist",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Today</div>
        <div class="node-sub">adversary records your encrypted traffic</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node">
        <div class="node-title">Years / decades later</div>
        <div class="node-sub">a large quantum computer exists</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node node-proxy">
        <div class="node-title">Decrypted</div>
        <div class="node-sub">everything recorded today is now readable</div>
      </div>
    </div>
    <p class="diagram-note">
      The attack starts today, even though the decryption doesn't happen
      until much later — which is exactly why waiting to act isn't actually
      free.
    </p>
  `,
};
