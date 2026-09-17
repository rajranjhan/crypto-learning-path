import type { Lesson } from "../../types";
import { theKeyDistributionProblem } from "./steps/the-key-distribution-problem";
import { rsaTheMath } from "./steps/rsa-the-math";
import { rsaPadding } from "./steps/rsa-padding";
import { diffieHellmanWorkedExample } from "./steps/diffie-hellman-worked-example";
import { eccEllipticCurves } from "./steps/ecc-elliptic-curves";
import { digitalSignatures } from "./steps/digital-signatures";
import { certificatesChainOfTrust } from "./steps/certificates-chain-of-trust";
import { rsaVsEcc } from "./steps/rsa-vs-ecc";
import { checklist } from "./steps/checklist";

export const asymmetricPrimitivesLesson: Lesson = {
  slug: "asymmetric-primitives",
  title: "Asymmetric Cryptography: RSA, ECC & Diffie-Hellman",
  status: "available",
  summary: "Covers the public-key primitives behind key exchange, signatures, certificates, and modern secure channels.",
  whyItMatters:
    "Strangers need a way to establish keys and verify signatures without a shared secret. These building blocks underpin secure connections and digital identity.",
  objectives: [
    "Explain the key distribution problem",
    "Walk through RSA and Diffie-Hellman at a small scale",
    "Describe why ECC provides smaller modern keys",
    "Connect digital signatures to identity and protocol authentication",
  ],
  prerequisites: ["encryption-basics", "symmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why doesn't Diffie-Hellman by itself prove who you are talking to?",
      answer: "The exchange establishes a secret with whoever participates. Without authentication, an attacker can substitute key shares and establish separate secrets with each peer.",
    },
    {
      question: "What does verifying a signature tell you, and what does it leave unresolved?",
      answer: "It links the signed message to possession of the corresponding private key. You still need a trusted binding between that public key and the claimed identity.",
    },
    {
      question: "Why can't you compare RSA and ECC security by key length alone?",
      answer: "They rely on different mathematical problems and attacks. Equal bit lengths do not imply equal work to break them.",
    },
  ],
  keyTakeaways: [
    "Public-key cryptography solves coordination problems symmetric keys cannot",
    "Diffie-Hellman establishes shared secrets without sending them",
    "Digital signatures bind messages to keys; identity and permission need separate checks",
    "Certificates package public keys into a trust system",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "concept",
  transitionToNext: "Public keys are useful only if you know whose key you received. PKI addresses that trust problem.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">RSA</div>
        <div class="node-sub">the padlock — signs the Certificate &amp; CertificateVerify steps ahead</div>
      </div>
      <div class="node equal">
        <div class="node-title">Diffie-Hellman / ECC</div>
        <div class="node-sub">the paint-mixing — is exactly TLS's ServerKeyExchange &amp; key_share</div>
      </div>
    </div>
    <p class="diagram-note">Key exchange establishes a secret; signatures prove possession of a private key.</p>
  `,
  },
  steps: [
    theKeyDistributionProblem,
    rsaTheMath,
    rsaPadding,
    diffieHellmanWorkedExample,
    eccEllipticCurves,
    digitalSignatures,
    certificatesChainOfTrust,
    rsaVsEcc,
    checklist,
  ],
};
