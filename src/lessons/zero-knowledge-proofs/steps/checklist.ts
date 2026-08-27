import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Reach for a zero-knowledge proof when the actual requirement is proving a fact without revealing the data behind it — an identity check, a compliance attestation, a batch of transactions — not as a default privacy mechanism for everything. Match the construction to the constraint: interactive Schnorr-style proofs for a live identity check, Fiat-Shamir-based signatures when no verifier is online, a SNARK when proof size matters most and a trusted setup is acceptable, a STARK when transparency or quantum resistance matters more than proof size.</p>",
  bullets: [
    "Use a ZKP when the requirement is genuinely 'prove this fact without revealing the data behind it' — not as a default for every privacy problem",
    "Interactive Schnorr-style proofs fit a live identity check; Fiat-Shamir-based signatures fit anything verified later, with no verifier online",
    "Prefer a SNARK when proof size and verification speed matter most and a trusted setup (ideally a multi-party ceremony) is acceptable",
    "Prefer a STARK when avoiding a trusted setup, or quantum resistance, matters more than minimizing proof size",
    "Audit the circuit or program being proven as carefully as the cryptography itself — a correct proof of the wrong statement is still wrong",
  ],
  callouts: [
    {
      requirementId: "Secrets",
      title: "Trusted setup randomness is a high-value secret",
      body: "If a SNARK's setup ceremony is used, its 'toxic waste' must be destroyed, not merely stored securely — the same category of risk this series has flagged for CA private keys and KMS-held keys.",
    },
    {
      requirementId: "Versions",
      title: "Track which hardness assumption a proof system relies on",
      body: "Discrete-log-based ZK constructions inherit the same quantum exposure as the signatures covered in the Quantum Cryptography lesson. Favor hash-based (STARK) constructions for anything that needs to remain secure long-term.",
    },
  ],
};
