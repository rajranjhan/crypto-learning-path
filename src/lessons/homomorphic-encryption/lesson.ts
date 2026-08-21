import type { Lesson } from "../../types";
import { theGloveboxProblem } from "./steps/the-glovebox-problem";
import { partialVsFullyHomomorphic } from "./steps/partial-vs-fully-homomorphic";
import { workedExamplePaillier } from "./steps/worked-example-paillier";
import { theNoiseProblem } from "./steps/the-noise-problem";
import { bootstrapping } from "./steps/bootstrapping";
import { computingOnCiphertext } from "./steps/computing-on-ciphertext";
import { performanceAndPracticalLimits } from "./steps/performance-and-practical-limits";
import { heVsMpcVsTee } from "./steps/he-vs-mpc-vs-tee";
import { checklist } from "./steps/checklist";

export const homomorphicEncryptionLesson: Lesson = {
  slug: "homomorphic-encryption",
  title: "Homomorphic Encryption: Computing on Encrypted Data",
  status: "available",
  overview:
    "TLS protects data in transit. Encryption at Rest protects data sitting " +
    "still. This lesson covers the third, stranger state: data in use — " +
    "protected even while someone else is actively computing on it. " +
    "Homomorphic encryption lets an untrusted party run real computations on " +
    "ciphertext and hand back an encrypted result, without ever being able to " +
    "see what it was actually working with. Walk through what that takes: " +
    "the spectrum from partial to fully homomorphic, a worked numeric " +
    "example, the noise problem that stalled progress for decades, the " +
    "bootstrapping trick that finally solved it, and where this is — and " +
    "isn't — practical today.",
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">In Transit</div>
        <div class="node-sub">🔒 TLS — the earlier lessons</div>
      </div>
      <div class="link">
        <div class="lock">📥</div>
        <div class="link-label">delivered, then filed</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">At Rest</div>
        <div class="node-sub">🗄️ TDE &amp; envelope encryption — Encryption at Rest</div>
      </div>
      <div class="link">
        <div class="lock">🧤</div>
        <div class="link-label">computed on, still sealed</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">In Use</div>
        <div class="node-sub">🔐 homomorphic encryption — this lesson</div>
      </div>
    </div>
    <p class="diagram-note">
      Three states, three different sets of locks. Homomorphic encryption is
      the newest and strangest: it protects data even while someone else is
      actively computing on it.
    </p>
  `,
  steps: [
    theGloveboxProblem,
    partialVsFullyHomomorphic,
    workedExamplePaillier,
    theNoiseProblem,
    bootstrapping,
    computingOnCiphertext,
    performanceAndPracticalLimits,
    heVsMpcVsTee,
    checklist,
  ],
};
