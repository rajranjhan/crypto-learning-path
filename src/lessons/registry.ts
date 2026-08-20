import type { RegistryEntry } from "../types";

export const registry: RegistryEntry[] = [
  { slug: "encryption-basics", title: "Encryption Basics: Symmetric & Asymmetric", status: "available" },
  { slug: "tls12", title: "TLS 1.2", status: "available", category: "TLS" },
  { slug: "tls13", title: "TLS 1.3", status: "available", category: "TLS" },
  { slug: "mtls", title: "Mutual TLS", status: "available", category: "TLS" },
  { slug: "oauth", title: "Fundamentals", status: "available", category: "OAuth" },
  { slug: "oauth-further-learning", title: "Further Learning", status: "available", category: "OAuth" },
  { slug: "oauth-flows", title: "Flows & Federation", status: "available", category: "OAuth" },
  { slug: "kerberos", title: "Kerberos: Ticket-Based Authentication", status: "available" },
];
