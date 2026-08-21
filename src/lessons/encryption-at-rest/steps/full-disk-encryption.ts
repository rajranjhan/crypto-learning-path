import type { Step } from "../../../types";

export const fullDiskEncryption: Step = {
  id: "full-disk-encryption",
  title: "Locking the Whole Filing Room — Full-Disk Encryption",
  prose:
    "<p>The cheapest, broadest control in this whole lesson is also usually the first one turned on: encrypt the entire disk, or volume, with a single key. BitLocker on Windows, LUKS/dm-crypt on Linux, FileVault on macOS, and the \"encrypted volume\" checkbox on every major cloud provider (AWS EBS, Google Persistent Disk) all do the same basic thing — every byte written to that block device is encrypted before it hits physical storage, and decrypted on the way back out.</p>" +
    "<p>The key gets unlocked once, typically at boot, either from something the machine holds locally (a TPM chip, a passphrase) or from a cloud provider's own key management service. From that point on, encryption is completely invisible to everything above the disk layer — the OS, every process, every application sees ordinary files, exactly as if the disk weren't encrypted at all.</p>" +
    "<p>That invisibility is the whole point, and also the whole limit. If the machine is powered off and the disk is stolen or the drive is decommissioned and resold, it's unreadable ciphertext without the key — a clean, complete win against a very common, very mundane threat. But once the volume is mounted and the machine is running, full-disk encryption offers nothing beyond what an unencrypted disk would: a live process, a root shell, or an attacker with valid application credentials sees exactly the same plaintext either way.</p>",
  bullets: [
    "Whole block device (or volume) encrypted with one key — BitLocker (Windows), LUKS/dm-crypt (Linux), FileVault (macOS), cloud 'encrypted volume' flags (AWS EBS, Google Persistent Disk)",
    "Unlocked once at boot — everything above it, OS and applications alike, sees ordinary plaintext files from then on",
    "Stops the 'stolen or decommissioned drive' attack cleanly: without the key, the disk is unreadable ciphertext",
    "Stops nothing once the machine is running and mounted: a live process, a root shell, or valid application credentials all see exactly what an unencrypted disk would show",
    "Usually a single checkbox to enable — real protection against a common threat, for close to zero engineering cost",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Powered off / disk removed</div>
        <div class="node-sub">unreadable ciphertext without the key</div>
      </div>
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Running &amp; mounted</div>
        <div class="node-sub">every process sees ordinary plaintext — encryption is invisible above the disk layer</div>
      </div>
    </div>
    <p class="diagram-note">
      Full-disk encryption's entire protection lives in that first state. The
      moment the volume is mounted and the OS is running, it offers nothing
      beyond what an unencrypted disk would — exactly the gap the database-
      and application-level controls in the rest of this lesson exist to close.
    </p>
  `,
};
