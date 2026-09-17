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
  summary: "Learn how zero-knowledge proofs convince a verifier that a statement is true without revealing the secret evidence, from Schnorr to SNARKs and STARKs.",
  whyItMatters:
    "Sometimes a verifier needs proof without the private evidence behind it. Understanding the proven statement helps you judge what a proof actually guarantees.",
  objectives: [
    "Explain completeness, soundness, and zero knowledge",
    "Follow the Schnorr protocol and Fiat-Shamir transform",
    "Compare SNARK and STARK tradeoffs",
    "Identify where ZKPs help and where they do not",
  ],
  prerequisites: ["asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why can a valid proof still fail to establish the fact your application needs?",
      answer: "A proof establishes only the encoded statement under its assumptions. An incorrect or incomplete statement can omit the application's actual requirement.",
    },
    {
      question: "How can a verifier gain confidence without learning the secret?",
      answer: "The protocol makes false claims difficult to prove while revealing no additional information about the witness beyond the statement being true.",
    },
    {
      question: "Why isn't the smallest proof automatically the best proof system?",
      answer: "Setup assumptions, prover cost, verification cost, and security assumptions also matter. The right tradeoff depends on the application.",
    },
  ],
  keyTakeaways: [
    "A ZKP proves a statement without revealing the witness",
    "Interactive proofs can become non-interactive with Fiat-Shamir",
    "SNARKs offer compact proofs; some require trusted setup",
    "STARKs avoid trusted setup but usually produce larger proofs",
  ],
  estimatedMinutes: 45,
  difficulty: "Advanced",
  lessonType: "concept",
  transitionToNext: "Zero-knowledge proofs establish facts without revealing private evidence. Next, homomorphic encryption tackles a different privacy task: computing on encrypted inputs.",
  references: [
    { title: "Schnorr Identification and Signatures (original paper)", url: "https://link.springer.com/chapter/10.1007/0-387-34805-0_22" },
    { title: "Fiat-Shamir Transform (original paper)", url: "https://link.springer.com/chapter/10.1007/3-540-47721-7_12" },
  ],
  figure: {
    body: `
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
    <p class="diagram-note">The verifier checks the proof without learning the secret.</p>
  `,
  },
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
