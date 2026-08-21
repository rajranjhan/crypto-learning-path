import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Layer these controls rather than picking one: full-disk encryption as a cheap, broad baseline against lost or stolen hardware; TDE for database-level defense in depth that costs nothing in application code; envelope encryption and a KMS as the pattern underneath both, and underneath object storage too; and field-level encryption or tokenization reserved for the handful of fields sensitive enough to justify their extra cost and complexity. Close every design with the same question the previous step raised: what does this actually protect against, and what does it very deliberately not?</p>",
  bullets: [
    "Full-disk encryption: the cheap baseline, on by default wherever it's offered",
    "TDE: database-level defense in depth, transparent to every query",
    "Envelope encryption / KMS: the pattern underneath TDE, object storage, and most serious encryption-at-rest systems",
    "Field-level encryption / tokenization: reserved for the fields sensitive enough to justify the cost",
    "State the threat model explicitly — encryption at rest is not a substitute for access control",
  ],
  callouts: [
    {
      requirementId: "At rest",
      title: "Encrypt at more than one layer",
      body: "Full-disk encryption is a cheap baseline against a stolen drive. TDE adds database-level protection with no application changes. Neither one protects against a compromised app credential — that's what field-level encryption and access control are for.",
    },
    {
      requirementId: "Secrets",
      title: "Managed KMS, not homegrown key storage",
      body: "Key Encryption Keys belong in a dedicated KMS or HSM — AWS KMS, Google Cloud KMS, Azure Key Vault, HashiCorp Vault — never embedded in application config, source, or a database column next to the data they protect.",
    },
    {
      requirementId: "Rotation",
      title: "Rotate KEKs, not just passwords",
      body: "Envelope encryption makes key rotation cheap: rewrap DEKs under a new KEK without ever touching the underlying data. Rotate on a schedule, and immediately on suspected compromise.",
    },
  ],
};
