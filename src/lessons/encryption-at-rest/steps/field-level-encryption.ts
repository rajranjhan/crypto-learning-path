import type { Step } from "../../../types";

export const fieldLevelEncryption: Step = {
  id: "field-level-encryption",
  title: "Field-Level Encryption — Sensitive Fields",
  prose:
    "<p>TDE and full-disk encryption share a blind spot: anyone with a normal, authenticated connection to the running system — a compromised application service account, a curious or over-privileged DBA, an analyst granted read access to the wrong table — sees ordinary plaintext, because decryption happens transparently below the query layer, for everyone equally.</p>" +
    "<p><strong>Field-level encryption</strong> (also called application-level or client-side encryption) closes that gap by encrypting specific sensitive columns — SSNs, card numbers, health records — inside the application, before the value ever reaches the database. Now even someone with full database access, TDE and all, only ever sees ciphertext for that field.</p>" +
    "<p>The cost is real: ordinary, semantically-secure encryption produces different ciphertext for the same plaintext every time, which breaks equality lookups, sorting, and indexing on that column entirely. <strong>Deterministic encryption</strong> trades some of that security back — same plaintext always produces the same ciphertext, so equality lookups still work — but that same property leaks which rows happen to share a value. <strong>Format-preserving encryption</strong> keeps the ciphertext the same shape as the original (still 16 digits, still email-shaped) purely so legacy systems that validate format don't choke on it.</p>" +
    "<p><strong>Tokenization</strong> sidesteps the tradeoff differently: instead of encrypting the value in place, swap it for a random reference token and store the real value in a separate, tightly access-controlled vault. The main database and every one of its backups never contain the sensitive value in any form at all — only a token that's meaningless anywhere else.</p>",
  bullets: [
    "TDE/FDE protect against a stolen disk; they do nothing against a compromised app credential or an over-privileged DBA — both see plaintext through an ordinary query",
    "Field-level encryption: specific sensitive columns are encrypted in the application, before the value ever reaches the database",
    "Cost: randomized (semantically secure) encryption breaks equality lookups, sorting, and indexing on that column entirely",
    "Deterministic encryption trades some of that security back for equality lookups — but the same property leaks which rows share a value",
    "Format-preserving encryption keeps ciphertext the same shape as the original, for legacy systems that validate format",
    "Tokenization sidesteps the tradeoff: a random reference token lives in the main database, the real value lives in a separate, tightly access-controlled vault",
  ],
  takeaway: "Tokenization sidesteps the tradeoff: a random reference token lives in the main database, the real value lives in a separate, tightly access-controlled vault.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">TDE / Full-Disk</div>
        <div class="node-sub left">disk theft; backups; snapshots</div>
      </div>
      <div class="node equal">
        <div class="node-title">Field-Level Encryption</div>
        <div class="node-sub left">sensitive column isolation</div>
      </div>
      <div class="node equal">
        <div class="node-title">Tokenization</div>
        <div class="node-sub left">real value outside main DB</div>
      </div>
    </div>
    <p class="diagram-note">
      Protection increases left to right; query flexibility decreases.
    </p>
  `,
  },
};
