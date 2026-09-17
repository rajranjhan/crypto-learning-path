import type { RegistryEntry } from "../types";

export const registry: RegistryEntry[] = [
  { slug: "encryption-basics", title: "Encryption Basics: Symmetric & Asymmetric Keys", shortTitle: "Encryption Basics", status: "available", category: "Foundations" },
  { slug: "symmetric-primitives", title: "Symmetric Cryptography: AES, SHA & HMAC", shortTitle: "Symmetric Cryptography", status: "available", category: "Foundations" },
  { slug: "asymmetric-primitives", title: "Asymmetric Cryptography: RSA, ECC & Diffie-Hellman", shortTitle: "Asymmetric Cryptography", status: "available", category: "Foundations" },
  { slug: "pki", title: "PKI: Certificates, CAs & Trust Chains", shortTitle: "PKI", status: "available", category: "Identity and Trust" },
  { slug: "tls12", title: "TLS 1.2: Two-Round-Trip Handshake", shortTitle: "TLS 1.2", status: "available", category: "Identity and Trust" },
  { slug: "tls13", title: "TLS 1.3: One-Round-Trip Handshake", shortTitle: "TLS 1.3", status: "available", category: "Identity and Trust" },
  { slug: "mtls", title: "Mutual TLS: Client Authentication", shortTitle: "Mutual TLS", status: "available", category: "Identity and Trust" },
  { slug: "encryption-at-rest", title: "Encryption at Rest: Protecting Stored Data & Keys", shortTitle: "Encryption at Rest", status: "available", category: "Data Protection" },
  { slug: "kerberos", title: "Kerberos: Proving Who You Are with Tickets", shortTitle: "Kerberos", status: "available", category: "Authentication and Authorization" },
  { slug: "oauth", title: "OAuth: Fundamentals", status: "available", category: "Authentication and Authorization" },
  { slug: "oauth-further-learning", title: "OAuth: Tokens, Claims & Security", shortTitle: "OAuth: Tokens & Security", status: "available", category: "Authentication and Authorization" },
  { slug: "oauth-flows", title: "OAuth: Flows & Federation", shortTitle: "OAuth: Flows", status: "available", category: "Authentication and Authorization" },
  { slug: "zero-knowledge-proofs", title: "Zero-Knowledge Proofs: Proving Without Revealing", shortTitle: "Zero-Knowledge Proofs", status: "available", category: "Advanced Cryptography" },
  { slug: "homomorphic-encryption", title: "Homomorphic Encryption: Computing on Encrypted Data", shortTitle: "Homomorphic Encryption", status: "available", category: "Advanced Cryptography" },
  { slug: "blockchain-cryptography", title: "Blockchain Cryptography: Hashes, Signatures & Consensus", shortTitle: "Blockchain Cryptography", status: "available", category: "Applied Cryptography" },
  { slug: "quantum-cryptography", title: "Post-Quantum Cryptography: Preparing for Quantum Threats", shortTitle: "Post-Quantum Cryptography", status: "available", category: "Future of Cryptography" },
];
