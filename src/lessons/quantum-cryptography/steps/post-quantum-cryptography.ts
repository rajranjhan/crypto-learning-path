import type { Step } from "../../../types";

export const postQuantumCryptography: Step = {
  id: "post-quantum-cryptography",
  title: "Post-Quantum Cryptography — New Math, Not Bigger Keys",
  prose:
    "<p>The locksmiths' guild can't out-cut a machine that reads a lock's mechanism directly — the only real answer is to design an entirely new kind of lock, built on a different physical principle the machine's trick doesn't apply to. Cautious shops don't rip out the old lock the day the new one ships, either: they install both locks on the same door, so a thief has to beat both mechanisms to get in, not just one.</p>" +
    "<p>Unlike the symmetric side's simple fix, protecting key exchange and signatures against Shor's algorithm requires genuinely new mathematical foundations — problems believed hard for quantum computers too, not just classical ones. In 2024, NIST standardized the first set: <strong>ML-KEM</strong> (based on the algorithm called Kyber) for key exchange, and <strong>ML-DSA</strong> (based on Dilithium) for digital signatures, both built on the presumed hardness of certain problems over mathematical lattices — a different structure from the factoring and discrete-log problems this series has covered, and not currently known to be efficiently solvable by Shor's algorithm or any other quantum algorithm.</p>" +
    "<p>The transition strategy nearly everyone recommends is <strong>hybrid</strong> key exchange: run a classical algorithm (ECDHE, from the Asymmetric Primitives lesson) and a post-quantum algorithm (ML-KEM) side by side, combining both results into the final shared secret. That way, breaking either one alone isn't enough — an attacker needs to break both the classical assumption and the post-quantum one to recover the key. Several major browsers and cloud providers have already deployed hybrid ML-KEM + ECDHE in production TLS connections, specifically to start closing the harvest-now-decrypt-later window from the previous step, years before large quantum computers are expected to exist.</p>",
  bullets: [
    "A new lock built on a different mechanism the skeleton-key machine can't read, with both old and new locks installed on the same door during the transition",
    "NIST standardized ML-KEM (Kyber) for key exchange and ML-DSA (Dilithium) for signatures in 2024 — the first official post-quantum standards",
    "Both are lattice-based: a different mathematical structure, not currently known to be broken by Shor's algorithm or any other quantum algorithm",
    "Hybrid key exchange runs a classical algorithm (ECDHE) and a post-quantum one (ML-KEM) together — breaking either alone isn't enough to recover the key",
    "Major browsers and cloud providers have already deployed hybrid post-quantum TLS in production, specifically to close the harvest-now-decrypt-later window",
    "This is a live, active migration already underway — not a hypothetical future project",
  ],
  diagram: `
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
      Hybrid key exchange needs an attacker to break both halves, not just
      one — a hedge against post-quantum cryptography itself turning out to
      have an undiscovered weakness, the same way trust in any new
      cryptographic scheme is earned gradually.
    </p>
  `,
};
