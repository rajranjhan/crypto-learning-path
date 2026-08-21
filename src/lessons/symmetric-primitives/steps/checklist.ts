import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Reach for combined, vetted constructions rather than assembling cryptography by hand: AEAD modes (AES-GCM, ChaCha20-Poly1305) for confidentiality with built-in integrity, HMAC for authenticating data with a shared secret, and a dedicated password-hashing function — never a general-purpose hash — for anything a human chose. Retire DES, 3DES, MD5, SHA-1, and RC4 anywhere they still show up; every one of them has a documented, practical attack, not just a theoretical weakness.</p>",
  bullets: [
    "Default to AEAD modes (AES-GCM, ChaCha20-Poly1305) for encryption — never a bare cipher mode without authentication",
    "Use HMAC-SHA256 (or stronger) wherever a shared secret needs to prove authenticity",
    "Use Argon2/bcrypt/scrypt for passwords specifically — never SHA-2 or MD5",
    "Retire DES, 3DES, MD5, SHA-1, and RC4 wherever they're still configured — each has a documented, practical attack",
    "Use standard, audited library implementations; hand-rolled cryptography is one of the most common sources of real-world breaks",
  ],
  callouts: [
    {
      requirementId: "Versions",
      title: "Retire deprecated algorithms proactively",
      body: "DES, 3DES, MD5, SHA-1, and RC4 all have documented, practical attacks behind their deprecation. Configure allowed algorithm lists explicitly, and treat a deprecated algorithm still in use as a finding, not a footnote.",
    },
    {
      requirementId: "Secrets",
      title: "Keys for AES and HMAC belong in a managed KMS",
      body: "The same discipline from the Encryption at Rest lesson applies here: AES and HMAC keys are only as safe as where they're stored. Use a dedicated KMS or HSM, not application config or source.",
    },
  ],
};
