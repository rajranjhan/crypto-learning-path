import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Prefer ephemeral key exchange over static: ECDHE (or DHE) for forward secrecy, never plain RSA key transport. Use PSS padding for RSA signatures and OAEP for RSA encryption — never textbook RSA. Stick to standardized curves for ECC, and RSA keys of at least 2048 bits. Bind every public key to an identity through a certificate, verified against a trusted CA, rather than trusting a bare key. The PKI lesson right after this one covers that certificate-and-CA system in depth, and the TLS lessons after it put every one of these pieces to work in a real handshake, byte by byte.</p>",
  bullets: [
    "Key exchange: ECDHE (or DHE) for forward secrecy — avoid plain RSA key transport",
    "RSA encryption: always OAEP padding; RSA signing: always PSS padding — never textbook RSA",
    "Minimum sizes: RSA ≥ 2048 bits; ECC on a standard curve (P-256, P-384, Curve25519)",
    "Never trust a bare public key — verify it through a certificate signed by a trusted CA",
    "Signatures (RSA-PSS, ECDSA) prove origin without a shared secret; HMAC (previous lesson) proves origin with one — pick based on whether the verifier already shares a key with the sender",
  ],
  callouts: [
    {
      requirementId: "Versions",
      title: "Forward secrecy is not optional",
      body: "Any key-exchange configuration that allows plain RSA key transport should be disabled. A single compromised long-term key should never be able to decrypt previously recorded traffic.",
    },
    {
      requirementId: "Secrets",
      title: "Private keys belong in a managed KMS or HSM",
      body: "RSA and ECC private keys — whether they sign certificates or terminate TLS — deserve the same managed-KMS discipline as the symmetric keys from the Encryption at Rest lesson.",
    },
  ],
};
