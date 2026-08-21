import type { Step } from "../../../types";

const avalancheLines = [
  'Message A: "Transfer $100"',
  "SHA-256(A) = 1aab7a32 7cf10dae e4c290ae 2c96d6c3 21e082d3 18de8f30 17391043 0de917e1",
  "",
  'Message B: "Transfer $900"   ← one digit changed',
  "SHA-256(B) = 7d7ba836 4b1a4f1d 54096e3f 1200cacc 8a2843f9 0af06f0c 1891ad4f ef9c2e95",
];

export const hashFunctions: Step = {
  id: "hash-functions",
  title: "Fingerprinting Data — SHA-2 & Hash Functions",
  prose:
    "<p>A cryptographic hash function takes an input of any size and produces a fixed-size output — 256 bits for SHA-256, 384 for SHA-384, 512 for SHA-512 — called a <strong>digest</strong>. Unlike encryption, hashing is one-way by design: there's no key, and no way to recover the input from the digest. Its job isn't secrecy; it's producing a compact fingerprint that changes completely if the input changes even slightly.</p>" +
    "<p>Three properties make that fingerprint trustworthy. <strong>Pre-image resistance</strong>: given a digest, you can't feasibly find an input that produces it. <strong>Collision resistance</strong>: you can't feasibly find two different inputs that produce the same digest. And the <strong>avalanche effect</strong>: flipping a single input bit changes roughly half the output bits, unpredictably — so similar inputs never produce similar-looking digests, which is exactly what makes a hash useful for detecting even the tiniest tampering. The two real SHA-256 digests below, for two messages differing by a single character, show that last property directly — not a single byte of the output lines up.</p>" +
    "<p>SHA-2 (the family standardized in 2001, distinct from the broken SHA-1 covered later in this lesson) is the default choice nearly everywhere in this series: TLS hashes the entire handshake transcript with it before computing a Finished message's verify_data, and Kerberos's own key derivation leans on the same kind of one-way construction.</p>",
  bullets: [
    "Fixed-size output regardless of input size — 256/384/512 bits for SHA-256/384/512",
    "One-way: no key, and no way to recover the input from the digest — the goal is fingerprinting, not secrecy",
    "Pre-image resistance: can't feasibly reverse a digest back to an input",
    "Collision resistance: can't feasibly find two different inputs sharing a digest",
    "Avalanche effect: one changed input bit flips roughly half the output bits — similar inputs never produce similar digests",
  ],
  textBlock: {
    lang: "text",
    lines: avalancheLines,
    annotations: [
      { line: 0, label: "Message A", description: "The original message, before any change.", colorClass: "c-rand" },
      { line: 1, label: "SHA-256(A)", description: "A's real, computed digest — 32 bytes, shown in 8 groups of 4 for readability.", colorClass: "c-cipher" },
      { line: 3, label: "Message B", description: "The same message with a single character changed.", colorClass: "c-rand" },
      { line: 4, label: "SHA-256(B)", description: "B's digest. Compare it to A's directly above — not one group of hex digits matches, despite the tiny input change.", colorClass: "c-hs" },
    ],
  },
};
