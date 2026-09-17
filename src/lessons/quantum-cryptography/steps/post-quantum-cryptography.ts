import type { Step } from "../../../types";

export const postQuantumCryptography: Step = {
  id: "post-quantum-cryptography",
  title: "Post-Quantum Cryptography — New Math",
  prose:
    "<p>The locksmiths' guild can't out-cut a machine that reads a lock's mechanism directly — the only real answer is to design an entirely new kind of lock, built on a different physical principle the machine's trick doesn't apply to. Cautious shops don't rip out the old lock the day the new one ships, either: they install both locks on the same door, so a thief has to beat both mechanisms to get in, not just one.</p>" +
    "<p>Unlike the symmetric side's key-size-margin story, protecting key exchange and signatures against Shor's algorithm requires genuinely new mathematical foundations — problems believed hard for quantum computers too, not just classical ones. NIST's first post-quantum standards include <strong>ML-KEM</strong> for key establishment, <strong>ML-DSA</strong> for signatures, and <strong>SLH-DSA</strong> as a stateless hash-based signature option. They are designed around assumptions different from factoring and discrete logarithms, and they are not currently known to be efficiently solvable by Shor's algorithm or another quantum algorithm.</p>" +
    "<p>Migration is not just \"swap a library.\" It starts with inventory: where do you use RSA, finite-field DH, ECDH, DSA/ECDSA, certificate chains, device identities, firmware signatures, VPNs, backups, and archived encrypted data? Then comes <strong>algorithm agility</strong>: protocols, file formats, databases, and hardware need a way to negotiate or store new algorithm identifiers without a redesign. Finally comes phased migration: test interoperability, prioritize systems with long-lived confidentiality, and monitor standards and vendor support.</p>" +
    "<p>Hybrid key exchange is one practical bridge: run a classical algorithm such as ECDHE and a post-quantum KEM such as ML-KEM side by side, then combine both results into the final shared secret. Breaking either one alone is not enough. Hybrids are useful during a transition because classical algorithms are battle-tested while post-quantum algorithms are newer, but they are still engineering choices with protocol and operational costs.</p>",
  bullets: [
    "A new lock built on a different mechanism the skeleton-key machine can't read, with both old and new locks installed on the same door during the transition",
    "NIST standardized ML-KEM for key establishment, ML-DSA for signatures, and SLH-DSA as a stateless hash-based signature option",
    "Post-quantum algorithms use assumptions different from factoring and discrete logarithms",
    "Inventory comes first: find vulnerable public-key algorithms in protocols, certificates, firmware, backups, and stored data",
    "Algorithm agility matters: systems need to negotiate or store new algorithms without a redesign",
    "Hybrid key exchange runs a classical algorithm (ECDHE) and a post-quantum one (ML-KEM) together — breaking either alone isn't enough to recover the key",
    "Prioritize long-lived confidentiality and harvest-now-decrypt-later exposure before short-lived traffic",
  ],
  takeaway: "Prioritize long-lived confidentiality and harvest-now-decrypt-later exposure before short-lived traffic.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">ECDHE</div>
        <div class="node-sub">classical — breaks under a large quantum computer</div>
      </div>
      <div class="link">
        <div class="lock">+</div>
        <div class="link-label">combined into one shared secret</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">ML-KEM</div>
        <div class="node-sub">post-quantum — not known to break under Shor's algorithm</div>
      </div>
    </div>
    <p class="diagram-note">
      Hybrid exchange requires both halves to fail.
    </p>
  `,
  },
};
