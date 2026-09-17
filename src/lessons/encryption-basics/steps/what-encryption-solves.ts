import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const whatEncryptionSolves: Step = {
  id: "what-encryption-solves",
  glossary: lessonTerms("plaintext", "ciphertext", "encryption", "encoding"),
  title: "Encryption — Confidentiality and Boundaries",
  prose:
    "<p>Encryption is trying to solve a simple problem: two people want to communicate over a place they do not fully control. A network, disk, log file, backup, or database may be visible to someone else. Encryption turns input data, called <strong>plaintext</strong>, into an encrypted representation, called <strong>ciphertext</strong>, so only someone with the right key can turn it back.</p>" +
    "<p>This lesson is about confidentiality first: keeping content secret from people who can see the storage or network path. Later lessons add the other jobs that are easy to mix up with encryption: hashing supports change detection when the reference digest is trusted, HMAC authenticates a message among shared-key holders, digital signatures bind a message to a private key, and encoding such as Base64 only changes representation. Encoding is reversible by anyone and is not security.</p>",
  bullets: [
    "Encryption protects confidentiality: plaintext becomes ciphertext and can be decrypted only with the right key",
    "Hashing is not encryption; it creates a one-way fingerprint, not a reversible secret",
    "HMAC/MAC is not encryption; it proves integrity and authenticity using a shared secret",
    "Digital signatures are not encryption; they bind a message to a private key, with identity and permission checked separately",
    "Base64 and other encodings are not security; anyone can decode them",
  ],
  takeaway: "Base64 and other encodings are not security; anyone can decode them.",
  callouts: [
    {
      type: "dont-confuse",
      requirementId: "Terms",
      title: "Encoding is not encryption",
      body: "Base64, hex, and URL encoding make bytes easier to transport or display. They do not hide anything from an attacker.",
    },
  ],
};
