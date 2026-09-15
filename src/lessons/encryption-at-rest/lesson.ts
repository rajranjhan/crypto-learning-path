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
    "Data usually spends more time stored than in transit. Encryption at rest helps reduce breach impact, meet compliance needs, and control key access, but it only works when matched to the threat model.",
  objectives: [
    "Compare full-disk, database, envelope, and field-level encryption",
    "Explain the role of DEKs, KEKs, and KMS systems",
    "Describe key rotation and crypto-shredding",
    "Identify what encryption at rest does not protect against",
  ],
  prerequisites: ["symmetric-primitives"],
  keyTakeaways: [
    "Different storage layers protect against different threats",
    "Envelope encryption separates data keys from key-encryption keys",
    "KMS access control is as important as the cipher choice",
    "Encryption at rest does not stop misuse by authorized application paths",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "application",
  overview:
    "Even after TLS seals a document crossing the wire (the previous lessons), it " +
    "doesn't stay in transit forever — it gets filed away: written to a database, " +
    "backed up overnight, copied into a snapshot. Encryption at rest is the set of " +
    "locks that protect it once it's sitting still. This lesson walks from the " +
    "cheapest, broadest control (full-disk encryption) through the pattern " +
    "underneath almost every serious implementation (Transparent Data Encryption " +
    "and envelope encryption with a KMS) to the narrowest, most targeted one " +
    "(field-level encryption and tokenization) — then closes with the threat " +
    "model none of them cover on their own.",
  references: [
    { title: "NIST SP 800-57 Part 1 Rev. 5: Recommendation for Key Management", url: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final" },
    { title: "NIST Key Management Guidelines", url: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
    { title: "NIST SP 800-130: Framework for Designing Cryptographic Key Management Systems", url: "https://csrc.nist.gov/pubs/sp/800/130/final" },
  ],
  diagram: `
    <table class="comparison-table">
      <thead>
        <tr><th>Layer</th><th>Protects</th><th>Typical limit</th></tr>
      </thead>
      <tbody>
        <tr><th>Disk / volume encryption</th><td>Lost, stolen, or decommissioned drives</td><td>Invisible once the machine is running and mounted</td></tr>
        <tr><th>Database encryption / TDE</th><td>Database files, logs, snapshots, and backups outside the running engine</td><td>Plaintext is returned through normal database access</td></tr>
        <tr><th>Object-storage encryption</th><td>Objects at the storage layer, often with provider or customer-managed keys</td><td>Does not fix public or overbroad bucket/API access</td></tr>
        <tr><th>Field-level encryption</th><td>Specific high-risk fields before they reach the database</td><td>Higher application complexity and search/query limits</td></tr>
        <tr><th>Envelope encryption</th><td>Key hierarchy: DEKs protect data, KEKs in a KMS protect DEKs</td><td>KMS policy and application access become critical</td></tr>
      </tbody>
    </table>
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
      Each layer answers a narrower threat than the one before it, at a higher
      cost. The lesson below builds from the cheapest, broadest control to the
      narrowest, most targeted one — then closes with exactly what none of
      them protect against.
    </p>
  `,
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
