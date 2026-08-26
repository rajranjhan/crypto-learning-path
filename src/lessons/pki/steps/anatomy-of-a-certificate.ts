import type { Step } from "../../../types";

const certLines = [
  "Subject:        CN=example.com",
  "Issuer:         CN=Example Intermediate CA",
  "Serial Number:  03:AC:19:...",
  "Not Before:     2026-01-15",
  "Not After:      2026-04-15",
  "Public Key:     RSA-2048 (or ECDSA P-256)",
  "SAN:            DNS:example.com, DNS:www.example.com",
  "Key Usage:      Digital Signature, Key Encipherment",
  "Signature:      [issuer's signature over everything above]",
];

export const anatomyOfACertificate: Step = {
  id: "anatomy-of-a-certificate",
  title: "Certificates = ID Cards",
  prose:
    "<p>The bank's certificate is like a laminated ID card that says: \"This is First National Bank, and here's their public key.\" Anyone could print a fake laminated card claiming to be anyone — a plastic card by itself proves nothing. What actually matters is what's printed on it, and, as the next step covers, whose stamp is on the back.</p>" +
    "<p>The TLS lessons ahead show a certificate as raw DER bytes — a real one, annotated field by field. This step shows the same information the way it's meant to be read: as a structured set of claims on that ID card, all covered by one signature.</p>" +
    "<p>The standard format is <strong>X.509</strong>. A certificate's <strong>Subject</strong> is the name printed on the card — here, a hostname. Its <strong>Issuer</strong> names whoever stamped it. A <strong>serial number</strong> is the card's unique ID number, which matters enormously for revocation, covered later in this lesson. <strong>Not Before</strong> and <strong>Not After</strong> are the card's issue and expiry dates. The card carries the actual <strong>public key</strong> being vouched for, plus a set of <strong>extensions</strong> — the <strong>Subject Alternative Name (SAN)</strong> lists every hostname the card is actually valid for (the field browsers check, not the legacy Subject CN alone), and <strong>Key Usage</strong> restricts what the key is allowed to be used for.</p>" +
    "<p>Every one of those fields is covered by a single <strong>signature</strong> — the notary's stamp, in the metaphor — produced by the issuer's private key over everything else on the card. Change any field — the hostname, the expiry date, the public key — and the stamp no longer validates. That signature is the entire reason a client can trust any of this at all, and it's exactly the mechanism the previous lesson's digital-signatures step covered.</p>",
  bullets: [
    "A certificate is a laminated ID card: a name, a public key, and — as the next step covers — a notary's stamp on the back",
    "Subject: the identity being claimed (a hostname, for a TLS server certificate)",
    "Issuer: who signed this certificate — the certificate authority (or intermediate) that vouches for it",
    "Serial number: uniquely identifies this certificate — the key to revoking it later",
    "Not Before / Not After: the validity window",
    "SAN (Subject Alternative Name): every hostname this certificate is actually valid for — what browsers check",
    "Signature: the issuer's signature over every other field — the whole reason any of this can be trusted",
  ],
  textBlock: {
    lang: "text",
    lines: certLines,
    annotations: [
      { line: 0, label: "Subject", description: "The identity this certificate claims — checked against the hostname you're actually connecting to.", colorClass: "c-rand" },
      { line: 1, label: "Issuer", description: "Who signed this certificate. The next step covers why this is rarely a root CA directly.", colorClass: "c-hs" },
      { line: 2, label: "Serial Number", description: "Uniquely identifies this specific certificate — this is what a revocation list or lookup references.", colorClass: "c-len" },
      { line: 6, label: "SAN", description: "Every hostname this certificate actually covers. Modern clients check this field, not the legacy Subject CN.", colorClass: "c-ver" },
      { line: 8, label: "Signature", description: "The issuer's signature over every field above. Change any one of them and this signature stops validating.", colorClass: "c-cipher" },
    ],
  },
};
