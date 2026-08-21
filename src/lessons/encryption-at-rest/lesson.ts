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
  diagram: `
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
