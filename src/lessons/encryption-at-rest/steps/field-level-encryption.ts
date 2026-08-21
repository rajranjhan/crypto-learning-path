import type { Step } from "../../../types";

export const fieldLevelEncryption: Step = {
  id: "field-level-encryption",
  title: "When the Filing Cabinet Isn't Enough — Field-Level Encryption & Tokenization",
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
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">TDE / Full-Disk</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Protects: a stolen disk, backup, snapshot<br>
          Doesn't protect: an ordinary DB query<br>
          Cost: none — fully transparent
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Field-Level Encryption</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Protects: the above, plus a compromised app account or over-privileged DBA<br>
          Doesn't protect: whatever holds the app's encryption key<br>
          Cost: breaks indexing/search on that column
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Tokenization</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Protects: the above — the real value never enters the main DB at all<br>
          Doesn't protect: the separate token vault itself<br>
          Cost: an extra network call to detokenize
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Read left to right as increasing protection against someone with a
      legitimate-looking connection to the database — at the cost of
      increasing complexity and narrower functionality on the protected field.
    </p>
  `,
};
