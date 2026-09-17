import type { Lesson } from "../../types";
import { whyQuantumMatters } from "./steps/why-quantum-matters";
import { shorsAlgorithm } from "./steps/shors-algorithm";
import { groversAlgorithm } from "./steps/grovers-algorithm";
import { harvestNowDecryptLater } from "./steps/harvest-now-decrypt-later";
import { postQuantumCryptography } from "./steps/post-quantum-cryptography";
import { checklist } from "./steps/checklist";

export const quantumCryptographyLesson: Lesson = {
  slug: "quantum-cryptography",
  title: "Post-Quantum Cryptography: Preparing for Quantum Threats",
  status: "available",
  summary: "Learn how Shor’s and Grover’s algorithms affect current cryptography, why harvest-now-decrypt-later matters, and how post-quantum migration responds.",
  whyItMatters:
    "Data collected today may need to stay secret for years. Understanding quantum threats helps explain why public-key migration requires advance planning.",
  objectives: [
    "Explain the impact of Shor's and Grover's algorithms",
    "Identify harvest-now-decrypt-later risk",
    "Describe post-quantum algorithms and hybrid migration",
    "Separate symmetric key-size adjustments from public-key replacement",
  ],
  prerequisites: ["symmetric-primitives", "asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why can long-lived data need migration planning before a cryptographically capable quantum computer exists?",
      answer: "An adversary can store encrypted traffic now and attempt decryption later. The required secrecy lifetime can exceed the time available to migrate.",
    },
    {
      question: "Why isn't increasing RSA key size equivalent to increasing an AES key size against quantum threats?",
      answer: "Shor's algorithm changes the difficulty of the mathematical problem behind RSA. Grover's generic search speedup has a different impact, which larger symmetric keys can help offset.",
    },
    {
      question: "Why is post-quantum migration more than replacing one algorithm name?",
      answer: "Keys, signatures, protocols, libraries, certificates, and operational systems must interoperate with new constructions. Inventory and testing identify dependencies that a simple substitution misses.",
    },
  ],
  keyTakeaways: [
    "Shor's algorithm threatens RSA and discrete-log-based cryptography",
    "Grover's algorithm speeds up generic brute-force search quadratically",
    "Long-lived encrypted data is already exposed to future decryption risk",
    "Larger symmetric keys help offset quantum brute-force speedups",
    "Migration requires inventory, algorithm agility, and protocol changes",
  ],
  transitionToNext: "You have reached the end of the course. Apply the path by mapping a system you know: identify its keys, trust boundaries, and long-lived secrets, then revisit the lessons behind its weakest assumptions.",
  estimatedMinutes: 35,
  difficulty: "Advanced",
  lessonType: "concept",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal attacker">
        <div class="node-title text-warning">Asymmetric (RSA, ECC, DH)</div>
        <div class="node-sub">threatened by Shor's algorithm</div>
      </div>
      <div class="node equal trusted">
        <div class="node-title text-trusted">Symmetric (AES, SHA)</div>
        <div class="node-sub">weakened differently; key and digest sizes need margin</div>
      </div>
    </div>
    <p class="diagram-note">Public-key replacement and symmetric security margins require different responses.</p>
  `,
  },
  references: [
    { title: "NIST Post-Quantum Cryptography Project", url: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
    { title: "NIST FIPS 203: ML-KEM", url: "https://csrc.nist.gov/pubs/fips/203/final" },
    { title: "NIST FIPS 204: ML-DSA", url: "https://csrc.nist.gov/pubs/fips/204/final" },
    { title: "NIST FIPS 205: SLH-DSA", url: "https://csrc.nist.gov/pubs/fips/205/final" },
    { title: "NIST NCCoE Migration to Post-Quantum Cryptography", url: "https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/" },
  ],
  steps: [
    whyQuantumMatters,
    shorsAlgorithm,
    groversAlgorithm,
    harvestNowDecryptLater,
    postQuantumCryptography,
    checklist,
  ],
};
