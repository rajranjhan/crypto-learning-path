import type { Lesson } from "../../types";
import { theCaveProblem } from "./steps/the-cave-problem";
import { threeProperties } from "./steps/three-properties";
import { schnorrProtocol } from "./steps/schnorr-protocol";
import { fiatShamirTransform } from "./steps/fiat-shamir-transform";
import { zkSnarks } from "./steps/zk-snarks";
import { zkStarks } from "./steps/zk-starks";
import { realWorldUses } from "./steps/real-world-uses";
import { whatZkpsDontSolve } from "./steps/what-zkps-dont-solve";
import { checklist } from "./steps/checklist";

export const zeroKnowledgeProofsLesson: Lesson = {
  slug: "zero-knowledge-proofs",
  title: "Zero-Knowledge Proofs: Proving Without Revealing",
  status: "available",
  summary: "Introduces proofs that convince a verifier a statement is true without revealing the underlying secret.",
  whyItMatters:
    "Zero-knowledge proofs are now used in privacy systems, identity checks, and blockchain scaling. They are powerful, but only when you understand exactly what statement is being proven and what remains outside the proof.",
  objectives: [
    "Explain completeness, soundness, and zero knowledge",
    "Follow the Schnorr protocol and Fiat-Shamir transform",
    "Compare SNARK and STARK tradeoffs",
    "Identify where ZKPs help and where they do not",
  ],
  prerequisites: ["asymmetric-primitives"],
  keyTakeaways: [
    "A ZKP proves a statement without revealing the witness",
    "Interactive proofs can become non-interactive with Fiat-Shamir",
    "SNARKs are small and fast to verify but may need setup assumptions",
    "STARKs avoid trusted setup but usually produce larger proofs",
  ],
  estimatedMinutes: 45,
  difficulty: "Advanced",
  lessonType: "concept",
  overview:
    "Homomorphic Encryption covered computing on data without exposing it. " +
    "This lesson covers a related but distinct idea: proving a fact about " +
    "secret data is true, without revealing the data itself — starting with " +
    "a classic cave story, then building up to a real, worked proof using " +
    "the exact discrete-logarithm math from the Diffie-Hellman lesson, the " +
    "trick that removes interaction entirely, and the succinct proof " +
    "systems (zk-SNARKs and zk-STARKs) behind private transactions and " +
    "blockchain scaling today.",
  references: [
    { title: "Schnorr Identification and Signatures (original paper)", url: "https://link.springer.com/chapter/10.1007/0-387-34805-0_22" },
    { title: "Fiat-Shamir Transform (original paper)", url: "https://link.springer.com/chapter/10.1007/3-540-47721-7_12" },
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Peggy</div>
        <div class="node-sub">🙋 knows a secret, wants to prove it</div>
      </div>
      <div class="link">
        <div class="lock">🔍</div>
        <div class="link-label">a proof that reveals nothing else</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Victor</div>
        <div class="node-sub">🕵️ learns only "yes, it's true" — nothing more</div>
      </div>
    </div>
    <p class="diagram-note">
      Every step below is a variation on this one exchange — from a story
      about a cave, to real math, to the proof systems running in
      production today.
    </p>
  `,
  steps: [
    theCaveProblem,
    threeProperties,
    schnorrProtocol,
    fiatShamirTransform,
    zkSnarks,
    zkStarks,
    realWorldUses,
    whatZkpsDontSolve,
    checklist,
  ],
};
