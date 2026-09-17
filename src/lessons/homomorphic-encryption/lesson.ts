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
  summary: "Explains how some encryption schemes allow computation directly on ciphertext.",
  whyItMatters:
    "Outsourcing computation can expose sensitive inputs. Homomorphic encryption keeps them encrypted during computation, but performance and supported operations constrain its use.",
  objectives: [
    "Distinguish partial and fully homomorphic encryption",
    "Follow a small Paillier-style worked example",
    "Explain noise growth and bootstrapping",
    "Compare HE with MPC and TEEs",
  ],
  prerequisites: ["symmetric-primitives", "asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why doesn't ordinary encryption at rest protect inputs during outsourced computation?",
      answer: "Ordinary computation generally requires decrypting them first. Homomorphic encryption supports selected operations directly on ciphertext.",
    },
    {
      question: "Why must a computation plan account for noise growth?",
      answer: "In many homomorphic schemes, operations increase ciphertext noise. Exceeding the supported budget can prevent correct decryption, so parameters and refresh operations must match the computation.",
    },
    {
      question: "Does hiding inputs guarantee that a server computed the requested result correctly?",
      answer: "No. Confidentiality alone does not prove correct execution. Verifying an untrusted computation may require an additional mechanism.",
    },
  ],
  keyTakeaways: [
    "Homomorphic encryption enables computation over encrypted data",
    "Partial schemes support limited operations",
    "Fully homomorphic encryption requires managing noise",
    "Performance limits still shape real-world adoption",
  ],
  estimatedMinutes: 50,
  difficulty: "Advanced",
  lessonType: "concept",
  transitionToNext: "Advanced privacy tools still depend on primitives like hashes and signatures; blockchain systems combine those primitives in public, replicated systems.",
  references: [
    { title: "HomomorphicEncryption.org Security Standard", url: "https://homomorphicencryption.org/standard/" },
    { title: "Microsoft SEAL Homomorphic Encryption Library", url: "https://github.com/microsoft/SEAL" },
  ],
  figure: {
    body: `
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
      Three states, three different sets of locks.
    </p>
  `,
  },
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
