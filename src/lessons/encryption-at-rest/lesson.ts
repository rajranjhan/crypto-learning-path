import type { Lesson } from "../../types";
import { theVaultProblem } from "./steps/the-vault-problem";
import { fullDiskEncryption } from "./steps/full-disk-encryption";
import { transparentDataEncryption } from "./steps/transparent-data-encryption";
import { envelopeEncryption } from "./steps/envelope-encryption";
import { keyRotationCryptoShredding } from "./steps/key-rotation-crypto-shredding";
import { fieldLevelEncryption } from "./steps/field-level-encryption";
import { objectStorageEncryption } from "./steps/object-storage-encryption";
import { whatEncryptionAtRestDoesntStop } from "./steps/what-encryption-at-rest-doesnt-stop";
import { checklist } from "./steps/checklist";

export const encryptionAtRestLesson: Lesson = {
  slug: "encryption-at-rest",
  title: "Encryption at Rest: Protecting Stored Data & Keys",
  status: "available",
  summary: "Surveys the controls that protect stored data, from disk encryption to envelope encryption and field-level protection.",
  whyItMatters:
    "A stolen disk and a compromised application pose different threats. Matching encryption to the storage layer helps you understand what remains exposed.",
  objectives: [
    "Compare full-disk, database, envelope, and field-level encryption",
    "Explain the role of DEKs, KEKs, and KMS systems",
    "Describe key rotation and crypto-shredding",
    "Identify what encryption at rest does not protect against",
  ],
  prerequisites: ["symmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why doesn't disk encryption stop an attacker using an authorized application session?",
      answer: "The running system decrypts data for authorized reads. Disk encryption primarily protects storage outside that normal access path.",
    },
    {
      question: "Why wrap data keys instead of encrypting all data directly with one master key?",
      answer: "Separate data keys limit key reuse and let a key-encryption key protect many keys. Rewrapping those keys can avoid re-encrypting all the underlying data.",
    },
    {
      question: "When could deleting an encryption key fail to erase access to data?",
      answer: "Access remains possible if recoverable key copies, plaintext copies, caches, or backups still exist. Crypto-shredding depends on eliminating every usable recovery path.",
    },
  ],
  keyTakeaways: [
    "Different storage layers protect against different threats",
    "Envelope encryption separates data keys from key-encryption keys",
    "KMS access control is as important as the cipher choice",
    "Encryption at rest does not stop misuse by authorized application paths",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "application",
  transitionToNext: "Stored-data encryption protects files and databases; Kerberos shifts back to live authentication inside a trusted organization.",
  references: [
    { title: "NIST SP 800-57 Part 1 Rev. 5: Recommendation for Key Management", url: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final" },
    { title: "NIST Key Management Guidelines", url: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
    { title: "NIST SP 800-130: Framework for Designing Cryptographic Key Management Systems", url: "https://csrc.nist.gov/pubs/sp/800/130/final" },
  ],
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Full-Disk Encryption</div>
        <div class="node-sub">the cheap baseline 💾</div>
      </div>
      <div class="link">
        <div class="lock">🗄️</div>
        <div class="link-label">database-level defense in depth</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">TDE + Envelope Encryption</div>
        <div class="node-sub">a DEK wrapped by a KMS-held KEK 🔐</div>
      </div>
      <div class="link">
        <div class="lock">🎯</div>
        <div class="link-label">only for the fields that need it</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Field-Level Encryption</div>
        <div class="node-sub">& tokenization 🔑</div>
      </div>
    </div>
    <p class="diagram-note">
      Protection gets narrower and more targeted from left to right.
    </p>
  `,
  },
  steps: [
    theVaultProblem,
    fullDiskEncryption,
    transparentDataEncryption,
    envelopeEncryption,
    keyRotationCryptoShredding,
    fieldLevelEncryption,
    objectStorageEncryption,
    whatEncryptionAtRestDoesntStop,
    checklist,
  ],
};
