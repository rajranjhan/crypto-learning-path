import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const certificatesChainOfTrust: Step = {
  id: "certificates-chain-of-trust",
  glossary: lessonTerms("certificate"),
  title: "Certificates — Binding Keys to Identity",
  prose:
    "<p>Everything so far assumes you already have the right public key. Diffie-Hellman and ECDH assume the public value you received really came from the person you're talking to; RSA and ECDSA verification assume the public key you're checking a signature against really belongs to who it claims to. Neither assumption is automatic — a public key on its own is just a number, with no identity attached.</p>" +
    "<p>A <strong>certificate</strong> is the fix: a public key, an identity claim (\"this key belongs to example.com\"), and a signature over both from a <strong>Certificate Authority (CA)</strong> — a party your system already trusts. Validate the issuer chain to a local trust anchor, the intended name, validity, and permitted use before accepting that binding. The peer must separately prove possession of the private key. Domain validation does not establish corporate identity or trustworthiness.</p>" +
    "<p>The next lesson, PKI, covers exactly how that trust actually gets established at scale — chains of certificates, certificate authorities, and what happens when one needs to be revoked. The TLS lessons after it dissect a real certificate byte-for-byte: the Certificate step carries one, and CertificateVerify is the server proving it actually holds the private key that certificate names — the signature mechanism from this step, put to work.</p>",
  bullets: [
    "A public key alone carries no identity — a certificate binds one to the other",
    "A certificate is: a public key + an identity claim + a Certificate Authority's signature over both",
    "Certificate validation checks the issuer chain, intended name, validity, and permitted use",
    "The next lesson (PKI) covers this system in depth; the TLS lessons after it walk through a real certificate byte by byte",
  ],
  takeaway: "The next lesson (PKI) covers this system in depth; the TLS lessons after it walk through a real certificate byte by byte.",
};
