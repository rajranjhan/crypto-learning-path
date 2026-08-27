import type { Step } from "../../../types";

export const fiatShamirTransform: Step = {
  id: "fiat-shamir-transform",
  title: "Removing the Back-and-Forth — the Fiat-Shamir Transform",
  prose:
    "<p>Schnorr's protocol, as described, needs Victor online and participating — he has to actually send a fresh random challenge after seeing the commitment. That's fine for an interactive identity check, but useless for signing a document that needs to be verifiable by anyone, at any time, with no verifier present at all. The <strong>Fiat-Shamir transform</strong> removes the interaction entirely, with one substitution: instead of waiting for Victor to send a random challenge, Peggy computes it herself, as a hash of her own commitment — c = H(r), or c = H(r, message) if she's proving something about a specific message.</p>" +
    "<p>This works because a cryptographic hash function (from the Symmetric Primitives lesson) is unpredictable in exactly the way a real verifier's random challenge needs to be: Peggy can't know what H(r) will output before she's committed to r, so she still can't precompute a fake response the way she could if she chose the challenge freely herself. The proof — commitment, self-generated challenge, response — becomes one self-contained package Peggy can hand to anyone, who can verify it alone, with no back-and-forth at all.</p>" +
    "<p>This is precisely how a <strong>Schnorr signature</strong> works, and it's the same underlying idea behind ECDSA from the Digital Signatures step: a signature is, structurally, a non-interactive zero-knowledge proof that the signer knows the private key behind a public key — bound to a specific message by folding that message into the hash that produces the challenge.</p>",
  bullets: [
    "Interactive Schnorr needs the verifier online, generating a fresh random challenge in real time",
    "Fiat-Shamir replaces that live challenge with c = H(commitment) — or H(commitment, message) — computed by the prover alone",
    "A hash function is unpredictable enough to stand in for a real verifier's randomness, so a prover still can't precompute a fake proof",
    "The result is a single, self-contained proof anyone can verify later, with no interaction required",
    "A digital signature (Schnorr, and structurally ECDSA too) is a non-interactive zero-knowledge proof of knowing a private key, bound to a message",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Interactive</div>
        <div class="node-sub">Victor must be online to generate a live, random challenge</div>
      </div>
      <div class="node node-proxy" style="flex: 1;">
        <div class="node-title">Non-interactive (Fiat-Shamir)</div>
        <div class="node-sub">Peggy computes c = H(commitment) herself — verifiable by anyone, anytime</div>
      </div>
    </div>
    <p class="diagram-note">
      Same three-message structure underneath. The only change is who
      generates the unpredictable challenge — a live verifier, or a hash
      function standing in for one.
    </p>
  `,
};
