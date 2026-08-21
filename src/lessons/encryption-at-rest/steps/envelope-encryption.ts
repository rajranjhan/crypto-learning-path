import type { Step } from "../../../types";
import { REST_ACTORS } from "../../actors";

const envelopeLines = [
  "{",
  '  "keyId": "arn:aws:kms:us-east-1:111122223333:key/abcd-1234",',
  '  "encryptedDataKey": "AQIDAHhz9k3F7q2m...==",',
  '  "ciphertext": "U2FsdGVkX1+3f8sPq9x...==",',
  '  "algorithm": "AES-256-GCM"',
  "}",
];

export const envelopeEncryption: Step = {
  id: "envelope-encryption",
  title: "Two Keys, Not One — Envelope Encryption & KMS",
  prose:
    "<p>TDE's wrapped-DEK trick isn't specific to databases — it's the standard pattern behind almost every serious encryption-at-rest system, usually under the name <strong>envelope encryption</strong>. AWS KMS, Google Cloud KMS, Azure Key Vault, and HashiCorp Vault all work the same way underneath their different names.</p>" +
    "<p>A <strong>Key Encryption Key (KEK)</strong> lives inside the KMS or a hardware security module and never leaves it in plaintext — not once, ever. To encrypt something, an application asks the KMS to mint a fresh <strong>Data Encryption Key (DEK)</strong>. The KMS hands back two things: a plaintext copy, used immediately to encrypt the actual data and then discarded from memory, and an encrypted copy, wrapped under the KEK, safe to write to disk right alongside the ciphertext it protects.</p>" +
    "<p>To decrypt later, the application sends that wrapped DEK back to the KMS. The KMS unwraps it — which is also where it checks whether the caller is even allowed to — and hands back a plaintext DEK just long enough to decrypt. The bulk data itself never passes through the KMS or the HSM at all; only tiny, ~32-byte keys ever do. That keeps the expensive, hardware-protected part of the system fast, and turns every unwrap request into a natural, centralized point to log, audit, and rate-limit.</p>",
  bullets: [
    "Key Encryption Key (KEK) — lives inside the KMS/HSM and never leaves it in plaintext, ever",
    "Data Encryption Key (DEK) — a fresh key minted per object, table, or tenant, used to encrypt the actual bulk data",
    "GenerateDataKey (or similar) returns two things: a plaintext DEK, used immediately then discarded, and an encrypted DEK, wrapped under the KEK and safe to store",
    "Only the wrapped DEK is ever persisted, right alongside the ciphertext it protects — losing the data file alone reveals nothing",
    "Decryption means sending the wrapped DEK back to the KMS to unwrap it — a natural chokepoint for access control, audit logging, and rate limiting",
    "This is the exact pattern behind AWS KMS, Google Cloud KMS, Azure Key Vault, HashiCorp Vault — and behind TDE's own master-key wrapping from the previous step",
  ],
  sequence: {
    actors: REST_ACTORS,
    messages: [
      { from: "app", to: "kms", label: "GenerateDataKey", note: "please mint a fresh DEK, wrapped under my KEK", highlight: true },
      { from: "kms", to: "app", label: "plaintext DEK + encrypted DEK", note: "the plaintext copy exists in memory only, briefly", highlight: true },
      { from: "app", to: "app", label: "Encrypt data with the plaintext DEK", note: "then discard the plaintext copy immediately" },
      { from: "app", to: "db", label: "store ciphertext + encrypted DEK", note: "only the wrapped DEK is ever written to disk" },
    ],
  },
  textBlock: {
    lang: "json",
    lines: envelopeLines,
    annotations: [
      { line: 1, label: "keyId", description: "Which KEK in the KMS wrapped this DEK — needed to know who to ask when it's time to unwrap it.", colorClass: "c-hs" },
      { line: 2, label: "encryptedDataKey", description: "The DEK, wrapped under that KEK. Useless on its own — decrypting it requires a call to the KMS.", colorClass: "c-rand" },
      { line: 3, label: "ciphertext", description: "The actual encrypted data, protected by the (now-discarded) plaintext DEK.", colorClass: "c-cipher" },
      { line: 4, label: "algorithm", description: "Which symmetric cipher the DEK was used with — needed to decrypt correctly once the DEK is unwrapped.", colorClass: "c-ver" },
    ],
  },
};
