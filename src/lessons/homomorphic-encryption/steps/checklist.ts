import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — A Checklist",
  prose:
    "<p>Reach for the narrowest tool that solves the actual problem. A single aggregation or comparison usually only needs partially or somewhat homomorphic encryption — fast, mature, and well understood. Reserve fully homomorphic encryption for cases where the computation must run on genuinely untrusted infrastructure, the data is sensitive enough to justify a large performance cost, and no combination of MPC or a trusted execution environment is an acceptable alternative.</p>",
  bullets: [
    "Default to PHE/SHE (a single operation, or a small fixed circuit) unless the workload genuinely needs unlimited arbitrary computation",
    "Reserve FHE for genuinely untrusted infrastructure and data sensitive enough to justify the performance cost",
    "Consider MPC or a TEE as alternatives — or combine them — rather than assuming FHE is the only option",
    "The private key never leaves the data owner, at any point in the protocol",
    "Ciphertexts still need the same storage- and transit-level protections as any other secret — homomorphic encryption adds to TLS and encryption at rest, it doesn't replace them",
  ],
  callouts: [
    {
      requirementId: "At rest",
      title: "This isn't a replacement for encryption at rest",
      body: "Homomorphic encryption protects data during computation. The ciphertexts it produces and consumes still need the same storage- and transit-level protections covered in the earlier lessons — it's an addition to that stack, not a substitute for it.",
    },
    {
      requirementId: "Secrets",
      title: "The private key never leaves the data owner",
      body: "The entire security model collapses the moment the computing party gets access to the private key, even briefly. Key management here follows the same managed-KMS discipline as everywhere else in this series.",
    },
  ],
};
