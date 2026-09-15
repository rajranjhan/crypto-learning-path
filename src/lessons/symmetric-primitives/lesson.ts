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
    "Protocol specs often assume you already know what AES-GCM, SHA-256, or HMAC means. This lesson makes those building blocks explicit so later TLS, OAuth, Kerberos, and blockchain lessons can focus on how the primitives are composed.",
  objectives: [
    "Explain the different jobs of AES, SHA, and HMAC",
    "Identify when password hashing needs a different tool",
    "Understand why older primitives were deprecated",
    "Choose the right symmetric primitive for common security goals",
  ],
  prerequisites: ["encryption-basics"],
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
  overview:
    "The Encryption Basics lesson covered symmetric encryption as a concept — " +
    "one shared key that locks and unlocks. This lesson names the actual " +
    "standards every protocol ahead relies on: AES as the symmetric cipher, " +
    "the SHA-2 family as the hash function, and HMAC as the construction " +
    "that combines a hash with a secret key for authenticity. It also " +
    "covers what these primitives are not for — a password needs a " +
    "different, deliberately slow tool — and closes with a look at DES, " +
    "3DES, MD5, SHA-1, and RC4: once-standard algorithms retired for " +
    "documented, practical reasons. The next lesson does the same for the " +
    "asymmetric side: RSA, ECC, and Diffie-Hellman.",
  diagram: `
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
      Three primitives, reused everywhere. Once you can name what each one
      actually does, the TLS, OAuth, and Kerberos lessons ahead stop treating
      "AES-GCM" and "HMAC" as unexplained jargon.
    </p>
  `,
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
