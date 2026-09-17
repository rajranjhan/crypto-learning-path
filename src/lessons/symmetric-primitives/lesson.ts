import type { Lesson } from "../../types";
import { whyPrimitives } from "./steps/why-primitives";
import { aesTheCipher } from "./steps/aes-the-cipher";
import { modesOfOperation } from "./steps/modes-of-operation";
import { hashFunctions } from "./steps/hash-functions";
import { hmac } from "./steps/hmac";
import { passwordHashing } from "./steps/password-hashing";
import { deprecatedAndWhy } from "./steps/deprecated-and-why";
import { choosingTheRightPrimitive } from "./steps/choosing-the-right-primitive";
import { checklist } from "./steps/checklist";

export const symmetricPrimitivesLesson: Lesson = {
  slug: "symmetric-primitives",
  title: "Symmetric Cryptography: AES, SHA & HMAC",
  status: "available",
  summary: "Names the symmetric primitives that appear throughout modern protocols: AES, SHA, HMAC, and password hashing.",
  whyItMatters:
    "Choosing the wrong primitive can leave data exposed. Learn which tools provide confidentiality, integrity, and password protection before combining them in protocols.",
  objectives: [
    "Explain the different jobs of AES, SHA, and HMAC",
    "Identify when password hashing needs a different tool",
    "Understand why older primitives were deprecated",
    "Choose the right symmetric primitive for common security goals",
  ],
  prerequisites: ["encryption-basics"],
  checkYourUnderstanding: [
    {
      question: "Why doesn't sending a file with its hash prove who sent it?",
      answer: "An attacker who can replace the file can also replace its unkeyed hash. A MAC or signature adds an authenticity check.",
    },
    {
      question: "Why is a fast general-purpose hash a poor choice for storing passwords?",
      answer: "Speed makes offline password guessing cheaper. Password hashing uses a unique salt and deliberate computational cost to make guesses harder.",
    },
    {
      question: "Why can a secure cipher still fail when used incorrectly?",
      answer: "Security depends on the construction around the cipher, including authentication and nonce handling. For example, reusing a nonce with AES-GCM can undermine confidentiality and integrity.",
    },
  ],
  keyTakeaways: [
    "AES encrypts data with a shared key",
    "Hash functions provide deterministic fingerprints, not secrecy",
    "HMAC adds authenticity using a shared secret",
    "Password hashing must be deliberately slow and salted",
    "Deprecated primitives fail for concrete, practical reasons",
  ],
  estimatedMinutes: 35,
  difficulty: "Beginner",
  lessonType: "concept",
  transitionToNext: "Symmetric cryptography protects data efficiently; next we solve the key-distribution and identity problem.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">AES</div>
        <div class="node-sub">the cipher behind AES-GCM in every TLS cipher suite ahead</div>
      </div>
      <div class="node equal">
        <div class="node-title">SHA-2</div>
        <div class="node-sub">the hash behind every transcript and digest in this series</div>
      </div>
      <div class="node equal">
        <div class="node-title">HMAC</div>
        <div class="node-sub">the construction behind TLS's Finished and OAuth's HS256</div>
      </div>
    </div>
    <p class="diagram-note">
      Three primitives, reused everywhere.
    </p>
  `,
  },
  steps: [
    whyPrimitives,
    aesTheCipher,
    modesOfOperation,
    hashFunctions,
    hmac,
    passwordHashing,
    deprecatedAndWhy,
    choosingTheRightPrimitive,
    checklist,
  ],
};
