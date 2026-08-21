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
  title: "Symmetric Primitives: AES, SHA & HMAC",
  status: "available",
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
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">AES</div>
        <div class="node-sub">the cipher behind AES-GCM in every TLS cipher suite ahead</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">SHA-2</div>
        <div class="node-sub">the hash behind every transcript and digest in this series</div>
      </div>
      <div class="node" style="flex: 1;">
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
