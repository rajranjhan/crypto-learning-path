import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Zoom back out to the notary metaphor one last time: an ID card is only as trustworthy as the notary who stamped it, the government seal behind that notary, and how carefully that seal is guarded. Every recommendation below is really about protecting one of those three links.</p>" +
    "<p>Automate issuance and renewal wherever possible — short-lived, ACME-issued certificates (Let's Encrypt and similar) reduce both the manual-error surface and the blast radius of a leaked key, and sidestep most of the revocation problem outright. Enable OCSP stapling rather than plain OCSP. Monitor Certificate Transparency logs for your own domains. Reserve self-signed certificates for local development and fully internal systems, never a public-facing service. And treat any CA or intermediate private key with the same protection this series has emphasized for every other kind of key: an HSM or managed KMS, never a file on a filesystem.</p>",
  bullets: [
    "Prefer automated, short-lived certificate issuance (ACME/Let's Encrypt) over long-lived, manually managed certificates",
    "Enable OCSP stapling rather than relying on plain OCSP or CRLs",
    "Monitor Certificate Transparency logs for certificates issued against your own domains",
    "Reserve self-signed certificates for local development or fully internal systems — never a public-facing service",
    "CA and intermediate private keys belong in an HSM or managed KMS, with the same discipline as any other high-value key in this series",
  ],
  callouts: [
    {
      requirementId: "Secrets",
      title: "CA private keys are the highest-value secret in this whole series",
      body: "A compromised CA or intermediate key doesn't just expose one system — it can forge trusted certificates for anything. Protect it with an HSM, offline root storage, and the same managed-KMS discipline covered in the Encryption at Rest lesson.",
    },
    {
      requirementId: "Versions",
      title: "Expired or soon-to-expire certificates are a real outage risk",
      body: "An expired certificate breaks trust exactly like a revoked one. Monitor expiry proactively, and prefer automated renewal so it's never a manual, easy-to-forget step.",
    },
  ],
};
