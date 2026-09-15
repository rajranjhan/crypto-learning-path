import type { Step } from "../../../types";

export const shorsAlgorithm: Step = {
  id: "shors-algorithm-breaks-asymmetric",
  title: "Shor's Algorithm — Why RSA, ECC & Diffie-Hellman Don't Survive",
  prose:
    "<p>This is the lock the master locksmith's machine defeats instantly: the padlock (RSA) and the paint-mixing trick (Diffie-Hellman and ECC) from the Asymmetric Primitives lesson. He doesn't pick either one — he looks at the lock and the machine hands him a working key on the spot, no trial and error involved at all.</p>" +
    "<p>The Asymmetric Primitives lesson built RSA's entire security on one assumption: factoring the product of two large primes is infeasible for a classical computer. Diffie-Hellman and ECC lean on a close cousin, the discrete logarithm problem. <strong>Shor's algorithm</strong>, published in 1994, solves both efficiently on a quantum computer of sufficient size — not approximately, not with a modest speedup, but in polynomial time, the same complexity class as multiplying two numbers together in the first place.</p>" +
    "<p>That means a large enough quantum computer doesn't just weaken RSA-2048 or a 256-bit ECC key — it defeats the core assumption. Certificates, TLS handshakes using ECDHE, RSA signatures, ECDSA signatures, and other discrete-log-based key exchange or signature systems rely on exactly the math Shor's algorithm targets. Unlike a classical brute-force attack, using a bigger key is not a durable strategy — the algorithm's advantage comes from solving the underlying problem in a fundamentally easier way.</p>" +
    "<p>The one piece of good news: nobody has built a quantum computer anywhere near large enough to run Shor's algorithm against real-world key sizes yet. Timelines remain uncertain, which is why this lesson avoids pretending there is a known date. But as the next-but-one step covers, \"not yet\" doesn't mean \"not a problem today.\"</p>",
  bullets: [
    "The locksmith's machine cuts a working key for the padlock and the paint-mixing trick instantly — no picking, no trial and error",
    "Shor's algorithm solves factoring (RSA) and discrete logarithms (finite-field DH, ECDH, DSA/ECDSA-style signatures) efficiently on a sufficiently large quantum computer",
    "This isn't a speedup — it moves these problems into a fundamentally easier complexity class",
    "Breaks, rather than merely weakens: a bigger key doesn't meaningfully rescue RSA or ECC against a large enough quantum computer",
    "Many certificates, TLS key exchanges, and RSA/ECDSA signatures in this series depend on exactly this math",
    "No quantum computer today is anywhere near large enough to run this against real key sizes; credible timelines remain uncertain",
  ],
  diagram: `
    <div class="flow">
      <div class="node attacker">
        <div class="node-title text-warning">RSA-2048 / ECC P-256</div>
        <div class="node-sub">bigger keys don't help — Shor's algorithm breaks the underlying problem itself</div>
      </div>
    </div>
    <p class="diagram-note">
      Contrast this with the next step: AES doesn't have this problem.
    </p>
  `,
};
