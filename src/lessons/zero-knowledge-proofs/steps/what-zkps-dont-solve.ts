import type { Step } from "../../../types";

export const whatZkpsDontSolve: Step = {
  id: "what-zkps-dont-solve",
  title: "ZKP Limits — What Proofs Do Not Solve",
  prose:
    "<p>A zero-knowledge proof proves a specific, precisely stated fact is true. It doesn't, on its own, establish who's asking, protect data at rest or in transit, or guarantee the statement being proven was the right one to check in the first place — those are exactly the jobs of the PKI, TLS, and Encryption at Rest lessons elsewhere in this series, and a ZKP doesn't replace any of them.</p>" +
    "<p>A proof is also only as trustworthy as three things underneath it. First, the underlying hardness assumption: Schnorr's protocol and many SNARK constructions rely on the discrete logarithm problem being hard, exactly the assumption Shor's algorithm threatens, from the Post-Quantum Cryptography lesson — a large enough quantum computer could let an attacker forge those proofs, the same way it breaks the signatures they're structurally related to. Second, the trusted setup, where one applies: if the \"toxic waste\" from a SNARK's setup ceremony ever leaks, every proof built on it becomes forgeable, the same single-point-of-failure risk the PKI lesson raised about a root CA's private key. Third, and easy to overlook: the circuit or program being proven has to correctly encode the actual statement someone cares about — a bug in that translation can produce a system that faithfully, correctly proves the wrong thing, passing every check while still being wrong in exactly the way that matters. Real deployed ZK systems have shipped circuit bugs; the cryptography being sound doesn't make the specification it's checking correct.</p>",
  bullets: [
    "A ZKP proves one specific, precisely stated fact — it doesn't provide authentication, transport security, or storage protection on its own",
    "Discrete-log-based proofs (Schnorr, many SNARKs) inherit the same quantum vulnerability as the signatures they're related to",
    "A SNARK's trusted setup is a single point of failure, the same category of risk as a compromised root CA private key in the PKI lesson",
    "The circuit/program being proven has to correctly encode the intended statement — a specification bug can produce valid-looking proofs of the wrong thing",
    "Sound cryptography doesn't make an incorrect circuit correct — both layers have to be right",
  ],
  takeaway: "Sound cryptography doesn't make an incorrect circuit correct — both layers have to be right.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal trusted">
        <div class="node-title text-trusted">What a ZKP proves</div>
        <div class="node-sub">exactly the fact the circuit encodes, and nothing more</div>
      </div>
      <div class="node equal attacker">
        <div class="node-title text-warning">What it doesn't guarantee</div>
        <div class="node-sub left">correct circuit; assumptions; setup</div>
      </div>
    </div>
    <p class="diagram-note">
      Every item on the right is a real, documented failure mode in
      production ZK systems — none of them are hypothetical.
    </p>
  `,
  },
};
