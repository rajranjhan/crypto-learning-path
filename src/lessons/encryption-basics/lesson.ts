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
    "Every later protocol in this course depends on knowing which problem each kind of encryption solves. This lesson gives the vocabulary for understanding why fast symmetric encryption protects data, while asymmetric cryptography helps strangers agree on keys and prove identity.",
  objectives: [
    "Distinguish symmetric and asymmetric encryption",
    "Separate encryption from hashing, MACs, signatures, and encoding",
    "Explain why key exchange is a separate problem from encryption",
    "Connect basic encryption concepts to TLS",
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
  overview:
    "Start with the simplest version of the problem: how do you scramble a " +
    "message so only the right person can read it? This lesson begins with " +
    "the shared-key idea, uses classical ciphers to make it concrete, then " +
    "moves to modern symmetric encryption, asymmetric public/private keys, " +
    "and Diffie-Hellman. By the end, you'll have the mental model the rest " +
    "of the learning path builds on: fast shared-key encryption for data, " +
    "asymmetric math for safely agreeing on keys and proving identity.",
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
