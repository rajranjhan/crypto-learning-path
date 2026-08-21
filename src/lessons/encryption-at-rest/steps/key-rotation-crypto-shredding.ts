import type { Step } from "../../../types";

export const keyRotationCryptoShredding: Step = {
  id: "key-rotation-crypto-shredding",
  title: "Rewrapping, Not Re-Encrypting — Key Rotation & Crypto-Shredding",
  prose:
    "<p>Envelope encryption's two-tier structure makes key rotation cheap in a way a single flat key never could. Rotating the KEK means unwrapping every DEK with the old KEK and rewrapping it with the new one — a fast operation on a tiny, ~32-byte key, regardless of how many gigabytes of data that DEK protects. The underlying data is never touched, read, or re-encrypted at all. Rotating a DEK itself is a different story: that does mean re-encrypting the actual data it protects, which is exactly the expensive operation envelope encryption exists to keep rare.</p>" +
    "<p>Push the same idea one step further and it solves a much harder problem: <strong>crypto-shredding</strong>. Give each tenant or customer their own DEK, and \"deleting\" their data can be done instantly and provably by deleting only that one DEK. Every copy of their ciphertext — in production, in last night's backup, in a snapshot nobody remembers taking three years ago — becomes permanently unrecoverable in a single operation, without ever having to go find and overwrite each of those copies individually.</p>" +
    "<p>That sidesteps a genuinely hard problem: proving you've erased something that might be scattered across years of backups and replicas is often close to impossible directly. Deleting a 32-byte key that everything else depends on is not — and it's a large part of why \"right to erasure\" requests under regulations like GDPR are practical to honor at all.</p>",
  bullets: [
    "Rotating the KEK: unwrap every DEK with the old KEK, rewrap with the new one — fast, because DEKs are tiny, regardless of how much data they protect",
    "Rotating a DEK itself means re-encrypting the actual data it protects — the expensive operation envelope encryption exists to avoid doing routinely",
    "Crypto-shredding: give each tenant or customer their own DEK, then 'delete' their data by deleting only that DEK",
    "Every copy of that tenant's ciphertext, anywhere — production, backups, forgotten snapshots — becomes permanently unrecoverable in one operation",
    "Crypto-shredding sidesteps a real problem: finding and overwriting every backup, replica, and snapshot a piece of data might have been copied into over the years",
    "Per-tenant DEKs also bound the blast radius of a single leaked key to one tenant, not the whole dataset",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Rotate the KEK</div>
        <div class="node-sub">unwrap + rewrap every DEK — seconds, regardless of data size</div>
      </div>
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Rotate a DEK</div>
        <div class="node-sub">re-encrypt every byte it protects — slow, scales with data size</div>
      </div>
    </div>
    <p class="diagram-note">
      Envelope encryption's whole appeal is keeping the expensive operation
      (touching the actual data) rare, and the cheap one (rewrapping a tiny
      key) frequent. Crypto-shredding pushes that one step further: delete a
      single DEK, and every copy of the data it protected becomes permanently
      unrecoverable in one operation.
    </p>
  `,
};
