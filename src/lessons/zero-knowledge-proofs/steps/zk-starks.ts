import type { Step } from "../../../types";

export const zkStarks: Step = {
  id: "zk-starks",
  title: "No Trusted Setup — zk-STARKs",
  prose:
    "<p>A <strong>zk-STARK</strong> — Zero-Knowledge Scalable Transparent Argument of Knowledge — solves the exact weak point the previous step ended on. \"Transparent\" is the key word: STARKs need no trusted setup at all, no secret randomness that has to be generated once and then destroyed. Every public parameter is derived from something plainly public, like a fixed hash function, so there's no toxic waste to worry about and no ceremony to trust in the first place.</p>" +
    "<p>The mechanism behind that transparency is also what ties this back to the rest of this series: STARKs build their proofs entirely out of hash functions (from the Symmetric Primitives lesson) rather than elliptic-curve or discrete-logarithm math. That has a second, unplanned benefit covered in the Quantum Cryptography lesson: Shor's algorithm breaks discrete logarithms and factoring, but it doesn't break well-designed hash functions — so STARKs are, by construction, quantum-resistant, while SNARKs built on elliptic-curve pairings generally are not.</p>" +
    "<p>The tradeoff is size: STARK proofs are typically larger than SNARK proofs, and were historically slower to verify, though both gaps have narrowed considerably with newer constructions. Choosing between them is the same kind of tradeoff as choosing between RSA/ECC and post-quantum algorithms — a different balance of proof size, setup trust, and long-term cryptographic assumptions, not a strictly better-or-worse choice.</p>",
  bullets: [
    "zk-STARK: transparent — no trusted setup, no secret randomness to generate or destroy",
    "Built entirely from hash functions rather than elliptic-curve or discrete-log math",
    "As a side effect, STARKs are quantum-resistant against Shor's algorithm, unlike most elliptic-curve-based SNARK constructions",
    "Tradeoff: STARK proofs are typically larger than SNARK proofs, though the gap has narrowed with newer constructions",
    "Choosing SNARK vs. STARK is a tradeoff between proof size, setup trust, and long-term cryptographic assumptions — not a strict upgrade either way",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">zk-SNARK</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Smaller proofs<br>
          Often needs a trusted setup<br>
          Usually elliptic-curve based — not quantum-resistant
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">zk-STARK</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Larger proofs<br>
          No trusted setup — fully transparent<br>
          Hash-based — quantum-resistant
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Same succinctness idea from the previous step, built on a different
      mathematical foundation — with a different set of tradeoffs to show
      for it.
    </p>
  `,
};
