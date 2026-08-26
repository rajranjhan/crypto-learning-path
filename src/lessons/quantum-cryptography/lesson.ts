import type { Lesson } from "../../types";
import { whyQuantumMatters } from "./steps/why-quantum-matters";
import { shorsAlgorithm } from "./steps/shors-algorithm";
import { groversAlgorithm } from "./steps/grovers-algorithm";
import { harvestNowDecryptLater } from "./steps/harvest-now-decrypt-later";
import { postQuantumCryptography } from "./steps/post-quantum-cryptography";
import { checklist } from "./steps/checklist";

export const quantumCryptographyLesson: Lesson = {
  slug: "quantum-cryptography",
  title: "Quantum Cryptography: Threats to Today's Encryption",
  status: "available",
  overview:
    "Every lesson in this series rests on a hardness assumption — something " +
    "believed too slow to break on a classical computer. A large enough " +
    "quantum computer doesn't touch all of those assumptions equally: " +
    "Shor's algorithm breaks the Asymmetric Primitives lesson's RSA, ECC, " +
    "and Diffie-Hellman outright, while Grover's algorithm only weakens the " +
    "Symmetric Primitives lesson's AES, and a bigger key fixes that " +
    "completely. This short lesson covers both algorithms, the " +
    "harvest-now-decrypt-later threat that makes this an urgent problem " +
    "today rather than a future one, and the post-quantum algorithms " +
    "already being deployed to answer it.",
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">Asymmetric (RSA, ECC, DH)</div>
        <div class="node-sub">broken outright by Shor's algorithm</div>
      </div>
      <div class="node" style="flex: 1; border-color:#047857;">
        <div class="node-title" style="color:#047857;">Symmetric (AES, SHA)</div>
        <div class="node-sub">only weakened by Grover's algorithm — a bigger key fixes it</div>
      </div>
    </div>
    <p class="diagram-note">
      Two very different outcomes for the two halves of this series. The
      steps below explain why, and what's already being done about the
      broken half.
    </p>
  `,
  steps: [
    whyQuantumMatters,
    shorsAlgorithm,
    groversAlgorithm,
    harvestNowDecryptLater,
    postQuantumCryptography,
    checklist,
  ],
};
