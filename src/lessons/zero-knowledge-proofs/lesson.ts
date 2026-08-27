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
  overview:
    "Homomorphic Encryption covered computing on data without exposing it. " +
    "This lesson covers a related but distinct idea: proving a fact about " +
    "secret data is true, without revealing the data itself — starting with " +
    "a classic cave story, then building up to a real, worked proof using " +
    "the exact discrete-logarithm math from the Diffie-Hellman lesson, the " +
    "trick that removes interaction entirely, and the succinct proof " +
    "systems (zk-SNARKs and zk-STARKs) behind private transactions and " +
    "blockchain scaling today.",
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
