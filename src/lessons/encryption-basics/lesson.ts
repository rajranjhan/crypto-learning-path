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
  title: "Encryption Basics: Symmetric & Asymmetric",
  status: "available",
  overview:
    "Before diving into TLS, it helps to understand the two kinds of encryption " +
    "it relies on. Think in terms of locks and keys: symmetric encryption is one " +
    "shared key that both locks and unlocks, while asymmetric encryption is a " +
    "public padlock anyone can snap shut but only your private key can open. TLS " +
    "combines the two. Walk through the three short steps below.",
  steps: [symmetric, substitution, caesar, block, stream, asymmetric, diffieHellman, bridgeToTls],
};
