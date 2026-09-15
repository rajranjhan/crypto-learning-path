import type { Step } from "../../../types";

export const zkStarks: Step = {
  id: "zk-starks",
  title: "No Trusted Setup — zk-STARKs",
  prose:
    "<p>A <strong>zk-STARK</strong> — Zero-Knowledge Scalable Transparent Argument of Knowledge — solves the exact weak point the previous step ended on. \"Transparent\" is the key word: STARKs need no trusted setup at all, no secret randomness that has to be generated once and then destroyed. Every public parameter is derived from something plainly public, like a fixed hash function, so there's no toxic waste to worry about and no ceremony to trust in the first place.</p>" +
    "<p>The mechanism behind that transparency is also what ties this back to the rest of this series: STARKs build their proofs from hash functions and polynomial checks rather than elliptic-curve pairings or discrete-logarithm math. That avoids the specific Shor's-algorithm break that threatens many pairing-based SNARKs. It does not mean hash sizes can be ignored; as the Post-Quantum lesson explains, hash-based systems still need parameters with enough quantum-era margin.</p>" +
    "<p>The tradeoff is size: STARK proofs are typically larger than SNARK proofs, and were historically slower to verify, though both gaps have narrowed considerably with newer constructions. Choosing between them is the same kind of tradeoff as choosing between RSA/ECC and post-quantum algorithms — a different balance of proof size, setup trust, and long-term cryptographic assumptions, not a strictly better-or-worse choice.</p>",
  bullets: [
    "zk-STARK: transparent — no trusted setup, no secret randomness to generate or destroy",
    "Avoids elliptic-curve pairings and discrete-log assumptions used by many SNARK constructions",
    "Avoids Shor's discrete-log break, while still depending on hash parameters with adequate security margins",
    "Tradeoff: STARK proofs are typically larger than SNARK proofs, though the gap has narrowed with newer constructions",
    "Choosing SNARK vs. STARK is a tradeoff between proof size, setup trust, and long-term cryptographic assumptions — not a strict upgrade either way",
  ],
  diagram: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">zk-SNARK</div>
        <div class="node-sub left">
          Smaller proofs<br>
          Often needs a trusted setup<br>
          Often pairing-based — vulnerable to Shor if discrete-log assumptions fail
        </div>
      </div>
      <div class="node equal">
        <div class="node-title">zk-STARK</div>
        <div class="node-sub left">
          Larger proofs<br>
          No trusted setup — fully transparent<br>
          Avoids Shor's discrete-log break; still needs hash margin
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
