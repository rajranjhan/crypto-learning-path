import type { Step } from "../../../types";

export const zkSnarks: Step = {
  id: "zk-snarks",
  title: "Proving an Entire Computation — zk-SNARKs",
  prose:
    "<p>Schnorr's protocol proves one narrow fact: knowledge of a discrete logarithm. A <strong>zk-SNARK</strong> — Zero-Knowledge Succinct Non-Interactive Argument of Knowledge — generalizes the same three ideas (commitment, unpredictable challenge via Fiat-Shamir, and a response that only checks out if the prover did the real work) to prove an <em>entire arbitrary computation</em> was performed correctly: \"I ran this program on some secret input and got this output,\" without revealing the input, and without the verifier re-running the program at all.</p>" +
    "<p>Two words in the name carry the real weight. <strong>Succinct</strong> means the proof stays tiny and fast to check regardless of how large or expensive the underlying computation was — verifying a proof that a thousand-step program ran correctly can take milliseconds, dramatically less time than actually running those thousand steps. <strong>Argument</strong> (rather than \"proof\") is a technical nod to the fact that soundness here relies on computational hardness assumptions, the same way RSA's security does, rather than being unconditionally true.</p>" +
    "<p>The catch with many SNARK constructions is a <strong>trusted setup</strong>: a one-time ceremony that generates public parameters the proof system depends on, using secret randomness that must be destroyed afterward. If that secret randomness — often called \"toxic waste\" — is ever leaked instead of destroyed, whoever holds it can forge convincing-looking proofs of false statements. Real-world setups mitigate this with multi-party computation ceremonies: dozens of independent participants each contribute randomness, and the setup stays secure as long as even one participant honestly destroyed their piece.</p>",
  bullets: [
    "zk-SNARK: a succinct, non-interactive proof that an entire computation was performed correctly, without revealing its secret input",
    "Succinct: the proof stays small and fast to verify, regardless of how large the underlying computation was",
    "Argument (not 'proof'): soundness rests on computational hardness assumptions, like RSA's, not unconditional mathematical certainty",
    "Many SNARK constructions require a trusted setup — public parameters generated from secret randomness that must be destroyed afterward",
    "Leaked trusted-setup randomness ('toxic waste') lets an attacker forge proofs of false statements — mitigated with multi-party ceremonies",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Expensive computation</div>
        <div class="node-sub">e.g. running a thousand-step program on a secret input</div>
      </div>
      <div class="link">
        <div class="lock">🗜️</div>
        <div class="link-label">compressed into one small proof</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Tiny SNARK proof</div>
        <div class="node-sub">verified in milliseconds — no re-running the computation</div>
      </div>
    </div>
    <p class="diagram-note">
      This succinctness is what makes SNARKs practical for blockchain
      scaling, covered a couple of steps ahead — verifying a proof is far
      cheaper than re-executing the transactions it represents.
    </p>
  `,
};
