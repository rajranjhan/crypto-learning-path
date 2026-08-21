import type { Step } from "../../../types";

export const certificatesChainOfTrust: Step = {
  id: "certificates-chain-of-trust",
  title: "Binding a Key to an Identity — A Preview of Certificates",
  prose:
    "<p>Everything so far assumes you already have the right public key. Diffie-Hellman and ECDH assume the public value you received really came from the person you're talking to; RSA and ECDSA verification assume the public key you're checking a signature against really belongs to who it claims to. Neither assumption is automatic — a public key on its own is just a number, with no identity attached.</p>" +
    "<p>A <strong>certificate</strong> is the fix: a public key, an identity claim (\"this key belongs to example.com\"), and a signature over both from a <strong>Certificate Authority (CA)</strong> — a party your system already trusts. Verify the CA's signature on the certificate, using the CA's own public key (already trusted, often built into your OS or browser), and you've confirmed the binding between that specific public key and that specific identity, without ever having met the other side before.</p>" +
    "<p>The next lesson, PKI, covers exactly how that trust actually gets established at scale — chains of certificates, certificate authorities, and what happens when one needs to be revoked. The TLS lessons after it dissect a real certificate byte-for-byte: the Certificate step carries one, and CertificateVerify is the server proving it actually holds the private key that certificate names — the signature mechanism from this step, put to work.</p>",
  bullets: [
    "A public key alone carries no identity — a certificate binds one to the other",
    "A certificate is: a public key + an identity claim + a Certificate Authority's signature over both",
    "Verifying a certificate means checking the CA's signature using the CA's own, already-trusted public key",
    "The next lesson (PKI) covers this system in depth; the TLS lessons after it walk through a real certificate byte by byte",
  ],
};
