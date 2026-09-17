import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Post-Quantum Migration Checklist",
  prose:
    "<p>Back to the locksmith one last time: the vault dial (AES) just needs a couple more digits and the machine's advantage disappears. The padlock and the paint-mixing trick (RSA, ECC, Diffie-Hellman) need an entirely new lock, installed alongside the old one during the transition. And the drawer full of photographs already taken in the mailroom is the one thing no future lock upgrade can undo — which is exactly why it's the priority below.</p>" +
    "<p>Quantum computing doesn't invalidate this entire series, but it changes the migration plan for public-key cryptography and the security-margin plan for symmetric cryptography. Prioritize protecting whatever data needs confidentiality for the longest: that's the harvest-now-decrypt-later exposure, and it's the thing worth acting on before large quantum computers exist, not after.</p>",
  bullets: [
    "Symmetric side (AES, SHA): use parameter sizes with enough quantum-era margin for the property you need",
    "Asymmetric side (RSA, ECC, Diffie-Hellman): inventory and migrate to post-quantum or hybrid algorithms — the underlying math will not survive a large quantum computer",
    "Prioritize data with long required confidentiality lifetimes — that's what's being harvested today for future decryption",
    "Favor hybrid (classical + post-quantum) key exchange during the transition, not a hard cutover to post-quantum alone",
    "Build algorithm agility into protocols, certificates, file formats, and hardware before the emergency",
    "Track NIST's standards (ML-KEM, ML-DSA, SLH-DSA) and your vendors' rollout — this is an active migration, not a future hypothetical",
  ],
  takeaway: "Track NIST's standards (ML-KEM, ML-DSA, SLH-DSA) and your vendors' rollout — this is an active migration, not a future hypothetical.",
  callouts: [
    {
      requirementId: "Versions",
      title: "Crypto agility matters more than ever",
      body: "Systems that can swap algorithms without a full redesign — the same principle that let TLS retire RC4 and MD5 — are what make a post-quantum migration survivable. Avoid hardcoding a single key-exchange or signature algorithm anywhere.",
    },
    {
      requirementId: "At rest",
      title: "Long-lived encrypted data is the priority",
      body: "Data encrypted today with classical key exchange and needed confidential for 10+ years is exactly what harvest-now-decrypt-later targets. Prioritize it over short-lived traffic when planning a migration.",
    },
  ],
};
