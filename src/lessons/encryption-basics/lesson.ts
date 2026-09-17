import type { Lesson } from "../../types";
import { whatEncryptionSolves } from "./steps/what-encryption-solves";
import { symmetric } from "./steps/symmetric";
import { substitution } from "./steps/substitution";
import { caesar } from "./steps/caesar";
import { whyClassicalCiphersFail } from "./steps/why-classical-ciphers-fail";
import { block } from "./steps/block";
import { stream } from "./steps/stream";
import { asymmetric } from "./steps/asymmetric";
import { diffieHellman } from "./steps/diffie-hellman";
import { bridgeToTls } from "./steps/bridge-to-tls";

export const encryptionBasicsLesson: Lesson = {
  slug: "encryption-basics",
  title: "Encryption Basics: Symmetric & Asymmetric Keys",
  status: "available",
  summary: "Introduces the core mental models behind encryption: shared keys, public/private keys, and key exchange.",
  whyItMatters:
    "Secure protocols combine several tools with different jobs. Knowing which tool protects data, establishes keys, or proves identity makes the rest of the course easier to follow.",
  objectives: [
    "Distinguish symmetric and asymmetric encryption",
    "Separate encryption from hashing, MACs, signatures, and encoding",
    "Explain why key exchange is a separate problem from encryption",
    "Connect basic encryption concepts to TLS",
  ],
  checkYourUnderstanding: [
    {
      question: "Why doesn't Diffie-Hellman by itself prove who you are talking to?",
      answer: "It establishes a shared secret but does not authenticate the peer. An attacker can establish separate secrets with each side unless the exchange is authenticated.",
    },
    {
      question: "Why do secure protocols combine symmetric and asymmetric cryptography?",
      answer: "Public-key tools help establish keys and authenticate peers; symmetric encryption efficiently protects the data exchanged afterward.",
    },
    {
      question: "Why can't you recover a message by decrypting its hash?",
      answer: "Hashing is a one-way fingerprinting operation, not reversible encryption. There is no decryption key that recovers the original input.",
    },
  ],
  keyTakeaways: [
    "Symmetric encryption is fast but requires a shared secret",
    "Hashing and encoding are not encryption",
    "Asymmetric cryptography uses public/private key pairs",
    "Diffie-Hellman lets parties agree on a secret without sending it",
    "Modern protocols combine symmetric and asymmetric techniques",
  ],
  estimatedMinutes: 25,
  difficulty: "Beginner",
  lessonType: "concept",
  transitionToNext: "Now that you understand the two major key models, we'll examine the actual primitives used to implement them.",
  figure: {
    body: `
      <div class="flow">
        <div class="node equal"><div class="node-title">Shared Key</div><div class="node-sub">Symmetric encryption protects data</div></div>
        <div class="node equal"><div class="node-title">Public / Private Keys</div><div class="node-sub">Asymmetric tools establish keys or verify signatures</div></div>
      </div>
    `,
    caption: "Secure protocols combine both key models.",
  },
  steps: [
    whatEncryptionSolves,
    symmetric,
    substitution,
    caesar,
    whyClassicalCiphersFail,
    block,
    stream,
    asymmetric,
    diffieHellman,
    bridgeToTls,
  ],
};
