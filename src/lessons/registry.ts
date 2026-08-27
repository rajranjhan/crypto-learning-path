import type { RegistryEntry } from "../types";

export const registry: RegistryEntry[] = [
  { slug: "encryption-basics", title: "Encryption Basics: Symmetric & Asymmetric Keys", status: "available" },
  { slug: "symmetric-primitives", title: "Symmetric Primitives: AES, SHA & HMAC", status: "available" },
  { slug: "asymmetric-primitives", title: "Asymmetric Primitives: RSA, ECC & Diffie-Hellman", status: "available" },
  { slug: "pki", title: "PKI: Certificates, CAs & Trust Chains", status: "available" },
  { slug: "tls12", title: "TLS 1.2: Two-Round-Trip Handshake", status: "available", category: "TLS: Protecting Data in Motion" },
  { slug: "tls13", title: "TLS 1.3: One-Round-Trip Handshake", status: "available", category: "TLS: Protecting Data in Motion" },
  { slug: "mtls", title: "Mutual TLS: Client Authentication", status: "available", category: "TLS: Protecting Data in Motion" },
  { slug: "encryption-at-rest", title: "Encryption at Rest: Protecting Stored Data & Keys", status: "available" },
  { slug: "homomorphic-encryption", title: "Homomorphic Encryption: Computing on Encrypted Data", status: "available" },
  { slug: "zero-knowledge-proofs", title: "Zero-Knowledge Proofs: Proving Without Revealing", status: "available" },
  { slug: "kerberos", title: "Kerberos: Proving Who You Are with Tickets", status: "available" },
  { slug: "oauth", title: "Fundamentals", status: "available", category: "OAuth: Who's Allowed to Do What" },
  { slug: "oauth-further-learning", title: "Further Learning", status: "available", category: "OAuth: Who's Allowed to Do What" },
  { slug: "oauth-flows", title: "Flows & Federation", status: "available", category: "OAuth: Who's Allowed to Do What" },
  { slug: "quantum-cryptography", title: "Quantum Cryptography: Threats to Today's Encryption", status: "available" },
];
