import type { Step } from "../../../types";

export const whatEncryptionSolves: Step = {
  id: "what-encryption-solves",
  title: "What Problem Are We Solving?",
  prose:
    "<p>Encryption is trying to solve a simple problem: two people want to communicate over a place they do not fully control. A network, disk, log file, backup, or database may be visible to someone else. Encryption turns readable data, called <strong>plaintext</strong>, into unreadable data, called <strong>ciphertext</strong>, so only someone with the right key can turn it back.</p>" +
    "<p>This lesson is about confidentiality first: keeping content secret from people who can see the storage or network path. Later lessons add the other jobs that are easy to mix up with encryption: hashing detects change, HMAC proves a shared-secret holder produced a message, digital signatures prove a private-key holder approved a message, and encoding such as Base64 only changes representation. Encoding is reversible by anyone and is not security.</p>",
  bullets: [
    "Encryption protects confidentiality: plaintext becomes ciphertext and can be decrypted only with the right key",
    "Hashing is not encryption; it creates a one-way fingerprint, not a reversible secret",
    "HMAC/MAC is not encryption; it proves integrity and authenticity using a shared secret",
    "Digital signatures are not encryption; they prove a private-key holder approved a message",
    "Base64 and other encodings are not security; anyone can decode them",
  ],
  callouts: [
    {
      type: "dont-confuse",
      requirementId: "Terms",
      title: "Encoding is not encryption",
      body: "Base64, hex, and URL encoding make bytes easier to transport or display. They do not hide anything from an attacker.",
    },
  ],
};
