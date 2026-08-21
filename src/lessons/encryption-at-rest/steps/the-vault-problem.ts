import type { Step } from "../../../types";

export const theVaultProblem: Step = {
  id: "the-vault-problem",
  title: "Filed Away, Not Just Delivered — Why Encryption at Rest",
  prose:
    "<p>The TLS lessons ended the moment your document was delivered: the bank received it, decrypted it, and TLS's job was done. But the document doesn't vanish after that — it gets <strong>filed away</strong>. Written to a database, backed up overnight, copied into a snapshot before a migration. Every one of those copies is <strong>data at rest</strong>: sitting still, not moving over a wire, and TLS has nothing to say about any of it.</p>" +
    "<p>The threat model here is different too. TLS defends against someone listening in on the wire. Encryption at rest defends against someone who gets their hands on the storage medium itself — a stolen laptop, a decommissioned drive sold on secondhand hardware, a leaked backup tape, a cloud storage bucket left publicly readable by mistake. In every one of those cases, the attacker isn't intercepting a live, authenticated connection to the running system — they simply have the disk, or a copy of what was on it.</p>" +
    "<p>That distinction matters for the rest of this lesson: every control below protects against <em>that specific</em> kind of attacker. None of them, on their own, protect against someone who already has a normal, working connection to the running system — that's a different problem, and the lesson closes by drawing that line explicitly.</p>",
  bullets: [
    "Encryption in transit (TLS) protects the document while it's crossing the wire; encryption at rest protects the same document once it's filed away",
    "Threat model: a stolen or decommissioned disk, a leaked backup or snapshot, a misconfigured public storage bucket",
    "The attacker in this threat model has the storage medium itself — not a live, authenticated connection to the running system",
    "Every disk, database, backup, and snapshot in a system counts as 'at rest' data, not just the primary production database",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Crossing the mailroom</div>
        <div class="node-sub">🔒 protected by TLS — the previous lessons</div>
      </div>
      <div class="link">
        <div class="lock">📥</div>
        <div class="link-label">delivered and filed</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Sitting in the vault</div>
        <div class="node-sub">🔓 unless something else locks it — this lesson</div>
      </div>
    </div>
    <p class="diagram-note">
      TLS's job ends the instant the document is delivered. What happens to it
      next — filed on disk, backed up, copied into a snapshot — is a
      completely separate set of locks, and it's easy to build a system that
      nails the first half and forgets the second.
    </p>
  `,
};
