import type { Step } from "../../../types";

export const shorsAlgorithm: Step = {
  id: "shors-algorithm-breaks-asymmetric",
  title: "Shor's Algorithm — Why RSA, ECC & Diffie-Hellman Don't Survive",
  prose:
    "<p>This is the lock the master locksmith's machine defeats instantly: the padlock (RSA) and the paint-mixing trick (Diffie-Hellman and ECC) from the Asymmetric Primitives lesson. He doesn't pick either one — he looks at the lock and the machine hands him a working key on the spot, no trial and error involved at all.</p>" +
    "<p>The Asymmetric Primitives lesson built RSA's entire security on one assumption: factoring the product of two large primes is infeasible for a classical computer. Diffie-Hellman and ECC lean on a close cousin, the discrete logarithm problem. <strong>Shor's algorithm</strong>, published in 1994, solves both efficiently on a quantum computer of sufficient size — not approximately, not with a modest speedup, but in polynomial time, the same complexity class as multiplying two numbers together in the first place.</p>" +
    "<p>That means a large enough quantum computer doesn't just weaken RSA-2048 or a 256-bit ECC key — it breaks them completely. Every certificate, every TLS handshake's ECDHE key exchange, every RSA or ECDSA signature covered in this entire series relies on exactly the math Shor's algorithm defeats. Unlike a classical brute-force attack, using a bigger key doesn't meaningfully help — the algorithm's advantage doesn't come from trying fewer guesses, it comes from solving the underlying problem in a fundamentally easier way.</p>" +
    "<p>The one piece of good news: nobody has built a quantum computer anywhere near large enough to run Shor's algorithm against real-world key sizes yet, and credible estimates put that day years to decades away, not tomorrow. But as the next-but-one step covers, \"not yet\" doesn't mean \"not a problem today.\"</p>",
  bullets: [
    "The locksmith's machine cuts a working key for the padlock and the paint-mixing trick instantly — no picking, no trial and error",
    "Shor's algorithm solves factoring (RSA) and the discrete logarithm problem (ECC, Diffie-Hellman) efficiently on a quantum computer",
    "This isn't a speedup — it moves these problems into a fundamentally easier complexity class",
    "Breaks, rather than merely weakens: a bigger key doesn't meaningfully rescue RSA or ECC against a large enough quantum computer",
    "Every certificate, TLS key exchange, and RSA/ECDSA signature in this series depends on exactly this math",
    "No quantum computer today is anywhere near large enough to run this against real key sizes — credible estimates are years to decades out",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ RSA-2048 / ECC P-256</div>
        <div class="node-sub">bigger keys don't help — Shor's algorithm breaks the underlying problem itself</div>
      </div>
    </div>
    <p class="diagram-note">
      Contrast this with the next step: AES doesn't have this problem.
    </p>
  `,
};
