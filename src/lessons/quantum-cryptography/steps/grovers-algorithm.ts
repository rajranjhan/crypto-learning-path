import type { Step } from "../../../types";

export const groversAlgorithm: Step = {
  id: "grovers-algorithm-and-symmetric-crypto",
  title: "Grover's Algorithm — Symmetric Margins",
  prose:
    "<p>Now put the same locksmith in front of the shared-key vault dial from the Symmetric Primitives lesson — AES. His machine doesn't cut a key for this kind of lock at all; there's no shortcut math for it to exploit. All it does is let him try dial combinations somewhat faster than by hand. Add a couple more digits to the dial, and he's right back to where he started.</p>" +
    "<p>Symmetric primitives like AES and hash functions like SHA-2 don't rely on factoring or discrete logarithms at all — their security comes from brute-force search being infeasible, trying keys until one works. <strong>Grover's algorithm</strong> does speed up that search on a quantum computer, but only quadratically: searching a space of N possibilities classically takes roughly N attempts, and Grover's algorithm does it in roughly the square root of N.</p>" +
    "<p>Applied to AES, that quadratic speedup effectively halves the brute-force exponent in the simplified model: AES-128 under Grover's algorithm is often described as offering roughly a 64-bit brute-force margin, while AES-256 restores roughly the 128-bit margin designers wanted. That is a serious planning point, not a total break and not a magic \"fixed forever\" guarantee; implementation limits, parallelism, cost models, and future analysis still matter.</p>" +
    "<p>Hash functions need more nuance. Grover-like search affects preimage resistance: finding any input for a target SHA-256 digest drops from about 2^256 classical work to about 2^128 quantum queries in the idealized model. Collision resistance is already about 2^(n/2) classically because of the birthday bound, and quantum collision algorithms change that analysis differently. The practical takeaway is margin: use modern hash sizes with enough room for the security property you rely on, rather than assuming every hash property degrades the same way.</p>",
  bullets: [
    "The vault dial: the locksmith's machine cuts no shortcut key here — it only tries combinations somewhat faster, and a few extra digits undoes the advantage",
    "Symmetric crypto's security rests on brute-force search being infeasible, not on factoring or discrete logs",
    "Grover's algorithm gives a quadratic speedup to brute-force search — roughly the square root of the classical effort, not an efficient break",
    "AES-128 under Grover's algorithm is often modeled as roughly a 64-bit brute-force margin — weakened, not Shor-style broken",
    "AES-256 restores roughly a 128-bit brute-force margin in the simplified model",
    "Preimage and collision resistance are different hash properties and do not degrade in exactly the same way",
    "The practical rule is margin: choose symmetric keys and hash outputs large enough for the property and lifetime you need",
  ],
  takeaway: "The practical rule is margin: choose symmetric keys and hash outputs large enough for the property and lifetime you need.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">AES-128</div>
        <div class="node-sub">reduced brute-force margin in the simplified Grover model</div>
      </div>
      <div class="node equal trusted">
        <div class="node-title text-trusted">AES-256</div>
        <div class="node-sub">restores about a 128-bit brute-force margin in that model</div>
      </div>
    </div>
    <p class="diagram-note">
      Symmetric systems need more margin; RSA and ECC need different math.
    </p>
  `,
  },
};
