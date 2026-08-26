import type { Step } from "../../../types";

export const groversAlgorithm: Step = {
  id: "grovers-algorithm-and-symmetric-crypto",
  title: "Grover's Algorithm — Why AES Just Needs a Bigger Key",
  prose:
    "<p>Now put the same locksmith in front of the shared-key vault dial from the Symmetric Primitives lesson — AES. His machine doesn't cut a key for this kind of lock at all; there's no shortcut math for it to exploit. All it does is let him try dial combinations somewhat faster than by hand. Add a couple more digits to the dial, and he's right back to where he started.</p>" +
    "<p>Symmetric primitives like AES and hash functions like SHA-2 don't rely on factoring or discrete logarithms at all — their security comes from brute-force search being infeasible, trying keys until one works. <strong>Grover's algorithm</strong> does speed up that search on a quantum computer, but only quadratically: searching a space of N possibilities classically takes roughly N attempts, and Grover's algorithm does it in roughly the square root of N.</p>" +
    "<p>Applied to AES, that quadratic speedup effectively halves the key size's exponent: AES-128 under Grover's algorithm offers roughly the security AES-64 would against a classical computer — a real weakening, but nowhere near broken. AES-256 under the same attack still offers roughly AES-128-equivalent security, which remains entirely out of reach of any computer, quantum or classical, for the foreseeable future. The fix is almost embarrassingly simple compared to the asymmetric side: use AES-256 instead of AES-128, and the quantum threat to symmetric cryptography is handled.</p>" +
    "<p>The same logic applies to hash functions: SHA-256's collision resistance takes a smaller hit than its pre-image resistance under quantum attacks, and SHA-384/512 have enough margin that this isn't a practical concern at all.</p>",
  bullets: [
    "The vault dial: the locksmith's machine cuts no shortcut key here — it only tries combinations somewhat faster, and a few extra digits undoes the advantage",
    "Symmetric crypto's security rests on brute-force search being infeasible, not on factoring or discrete logs",
    "Grover's algorithm gives a quadratic speedup to brute-force search — roughly the square root of the classical effort, not an efficient break",
    "AES-128 under Grover's algorithm is roughly as strong as AES-64 classically — weakened, not broken",
    "AES-256 under the same attack still offers roughly AES-128-equivalent security — comfortably out of reach",
    "The fix: use AES-256 (and SHA-384/512) instead of smaller variants — no new algorithm required",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">AES-128</div>
        <div class="node-sub">≈ AES-64-equivalent under Grover's algorithm — weakened</div>
      </div>
      <div class="node" style="flex: 1; border-color:#047857;">
        <div class="node-title" style="color:#047857;">AES-256</div>
        <div class="node-sub">≈ AES-128-equivalent under Grover's algorithm — still comfortably safe</div>
      </div>
    </div>
    <p class="diagram-note">
      Compare this to the previous step: no key size rescues RSA or ECC from
      Shor's algorithm, but a larger key fully rescues AES from Grover's.
    </p>
  `,
};
