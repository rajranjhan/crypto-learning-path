import type { Lesson } from "../../types";
import { symmetric } from "./steps/symmetric";
import { substitution } from "./steps/substitution";
import { caesar } from "./steps/caesar";
import { block } from "./steps/block";
import { stream } from "./steps/stream";
import { asymmetric } from "./steps/asymmetric";
import { diffieHellman } from "./steps/diffie-hellman";
import { bridgeToTls } from "./steps/bridge-to-tls";

export const encryptionBasicsLesson: Lesson = {
  slug: "encryption-basics",
  title: "Encryption Basics: Symmetric & Asymmetric Keys",
  status: "available",
  overview:
    "Start with the simplest version of the problem: how do you scramble a " +
    "message so only the right person can read it? This lesson begins with " +
    "the shared-key idea, uses classical ciphers to make it concrete, then " +
    "moves to modern symmetric encryption, asymmetric public/private keys, " +
    "and Diffie-Hellman. By the end, you'll have the mental model the rest " +
    "of the learning path builds on: fast shared-key encryption for data, " +
    "asymmetric math for safely agreeing on keys and proving identity.",
  steps: [symmetric, substitution, caesar, block, stream, asymmetric, diffieHellman, bridgeToTls],
};
