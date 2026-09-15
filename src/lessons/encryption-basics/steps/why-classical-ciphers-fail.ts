import type { Step } from "../../../types";

export const whyClassicalCiphersFail: Step = {
  id: "why-classical-ciphers-fail",
  title: "Why Classical Ciphers Fail",
  sidebarGroup: "Classical Ciphers",
  prose:
    "<p>Substitution and Caesar ciphers are useful teaching tools because they make the idea of a key visible. They fail because they preserve too much structure. Repeated letters stay repeated, common letters stay common, and a tiny keyspace can be brute-forced. A patient attacker does not need to know the key ahead of time; the language itself leaks clues.</p>" +
    "<p>Modern encryption has to hide both the content and the patterns in the content. That is why modern symmetric encryption works on bits and blocks, mixes data through many rounds, uses nonces or IVs through modes of operation, and authenticates the result. The metaphor stops here: a classical letter swap is not a smaller version of AES. It is a historical starting point that shows what modern designs had to fix.</p>",
  bullets: [
    "Classical ciphers preserve statistical patterns from the plaintext",
    "Small keyspaces can be brute-forced directly",
    "Modern ciphers must hide structure, not just replace symbols",
    "A cipher is only one part of a safe construction; modes and authentication matter too",
  ],
  callouts: [
    {
      type: "key-idea",
      requirementId: "Model",
      title: "Modern encryption hides patterns",
      body: "The shift from classical to modern ciphers is the shift from symbol swapping to designs that make ciphertext look patternless without the key.",
    },
  ],
};
