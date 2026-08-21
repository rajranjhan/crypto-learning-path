import type { Step } from "../../../types";

export const whatEncryptionAtRestDoesntStop: Step = {
  id: "what-encryption-at-rest-doesnt-stop",
  title: "What the Vault Doesn't Protect Against",
  prose:
    "<p>Every control in this lesson shares one boundary, worth stating plainly because it's such a common design mistake: encryption at rest protects against someone who obtains the storage medium — a disk, a backup tape, a snapshot, an exported file — <em>outside</em> the running, access-controlled system. It is not a control against someone who has a legitimate-looking path <em>into</em> the running system.</p>" +
    "<p>A compromised application credential, a SQL injection vulnerability, an over-privileged or malicious insider, an attacker who dumps the memory of a live, decrypting process — none of these are stopped by anything above. In every one of those cases, the data gets decrypted for the very purpose of being used, by a system that's doing exactly what it was built to do. The encryption already finished its job by the time the request arrived.</p>" +
    "<p>Most real-world data breaches — stolen credentials, SQL injection, a leaked API key — walk straight through that front door. \"We encrypt data at rest\" is not, on its own, a complete answer to a data-breach threat model; it's one layer in a defense-in-depth stack that still needs access control, least privilege, input validation, and monitoring doing their own separate jobs.</p>",
  bullets: [
    "Protects against: a stolen or decommissioned physical disk, a leaked backup or snapshot, a copied database export, a storage bucket read directly off the storage layer",
    "Does not protect against: a compromised application credential — the app is supposed to see decrypted data, and so does whoever is using its credentials",
    "Does not protect against: SQL injection or any other exploit against the running, authenticated service",
    "Does not protect against: an over-privileged or malicious insider with legitimate query access",
    "Does not protect against: a memory dump of a live process that's actively decrypting data to serve a request",
    "Encryption at rest is one control in a defense-in-depth stack, not a substitute for access control, least privilege, input validation, or monitoring",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1; border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Protects against</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          A stolen or decommissioned disk<br>
          A leaked backup or snapshot<br>
          A copied database export<br>
          A storage bucket read directly, outside the app
        </div>
      </div>
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Doesn't protect against</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          A compromised app credential<br>
          SQL injection or another live exploit<br>
          An over-privileged or malicious insider<br>
          A memory dump of a running, decrypting process
        </div>
      </div>
    </div>
    <p class="diagram-note">
      The line is the storage medium itself. Anything that reads the raw disk,
      backup, or snapshot hits ciphertext. Anything that talks to the running,
      authenticated system — legitimately or not — sees exactly what that
      system is designed to show it: plaintext.
    </p>
  `,
};
