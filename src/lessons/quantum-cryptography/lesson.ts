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
  summary: "Explains how quantum algorithms threaten current cryptography and how post-quantum migration addresses that risk.",
  whyItMatters:
    "Large quantum computers would break widely deployed RSA, ECC, and Diffie-Hellman systems. Migration takes years, and harvest-now-decrypt-later risk means long-lived secrets need planning before such computers exist.",
  objectives: [
    "Explain the impact of Shor's and Grover's algorithms",
    "Identify harvest-now-decrypt-later risk",
    "Describe post-quantum algorithms and hybrid migration",
    "Separate symmetric key-size adjustments from public-key replacement",
  ],
  prerequisites: ["symmetric-primitives", "asymmetric-primitives"],
  keyTakeaways: [
    "Shor's algorithm threatens RSA, ECC, and discrete-log-based key exchange and signatures",
    "Grover's algorithm gives a quadratic speedup against generic brute-force search",
    "Long-lived encrypted data is already exposed to future decryption risk",
    "Doubling symmetric key sizes can restore the desired brute-force margin in the simplified model",
    "Post-quantum migration is an active inventory, agility, and protocol-engineering problem",
  ],
  estimatedMinutes: 35,
  difficulty: "Advanced",
  lessonType: "concept",
  overview:
    "Every lesson in this series rests on a hardness assumption — something " +
    "believed too slow to break on a classical computer. A large enough " +
    "quantum computer doesn't touch all of those assumptions equally: " +
    "Shor's algorithm threatens the Asymmetric Primitives lesson's RSA, ECC, " +
    "and discrete-log-based key exchange and signatures, while Grover's algorithm " +
    "gives a quadratic speedup against generic brute-force search. Doubling a " +
    "symmetric key size can restore the intended brute-force security margin in " +
    "the simplified model, but migration still needs careful engineering. This short lesson covers both algorithms, the " +
    "harvest-now-decrypt-later threat that makes this an urgent problem " +
    "today rather than a future one, and the post-quantum algorithms " +
    "already being deployed to answer it.",
  diagram: `
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
    <p class="diagram-note">
      Two very different outcomes for the two halves of this series. The
      steps below explain why, and what's already being done about the
      broken half.
    </p>
  `,
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
