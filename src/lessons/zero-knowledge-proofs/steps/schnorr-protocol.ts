import type { Step } from "../../../types";
import { ZKP_ACTORS } from "../../actors";

const schnorrLines = [
  "p = 23, g = 5             // same public parameters as the Diffie-Hellman example",
  "x = 6                     // Peggy's secret (her discrete log — like a private key)",
  "y = g^x mod p = 8         // Peggy's public value — same as Alice's public value A earlier",
  "",
  "k = 3                     // a fresh random nonce, picked new for this proof",
  "r = g^k mod p = 10        // COMMITMENT — sent to Victor first",
  "c = 7                     // CHALLENGE — Victor's random number, chosen after seeing r",
  "s = (k + c·x) mod 22 = 1  // RESPONSE — Peggy's answer, using her secret x",
  "",
  "Victor checks: g^s mod p = 5",
  "               r · y^c mod p = 5   ✓ match — proof accepted",
];

export const schnorrProtocol: Step = {
  id: "schnorr-protocol",
  title: "A Real Proof — Schnorr's Protocol",
  prose:
    "<p>The cave is a story; Schnorr's protocol is the same idea built on real math — specifically, the exact discrete-logarithm setup from the Diffie-Hellman step in the Asymmetric Primitives lesson. Peggy's secret is a number x; her public value is y = g^x mod p, published the same way a DH public value or an ECC public key would be. She wants to prove she knows x without revealing it — proving she holds the private key behind a public key, with zero-knowledge.</p>" +
    "<p>Three messages, mirroring the cave exactly. <strong>Commitment</strong>: Peggy picks a fresh random nonce k and sends r = g^k mod p — this reveals nothing about x, since k is random and thrown away after one use. <strong>Challenge</strong>: Victor sends back a random number c, chosen after he's already seen r, so Peggy can't have prepared a fake response in advance. <strong>Response</strong>: Peggy computes s = k + c·x mod q using her actual secret, and sends it. Victor accepts only if g^s mod p equals r · y^c mod p — an equation that only balances if Peggy actually used the real x to compute s.</p>" +
    "<p>The numbers below are small and real, computed exactly, reusing the same p = 23, g = 5 from the Diffie-Hellman worked example — Peggy's secret x = 6 is literally Alice's old private DH number, and y = 8 is Alice's old public DH value, repurposed here to prove knowledge of that same secret instead of deriving a shared key from it.</p>",
  bullets: [
    "Public: p, g, and y = g^x mod p — the same shape as a Diffie-Hellman public value",
    "Commitment (r = g^k mod p): a fresh random nonce, revealing nothing about the secret x",
    "Challenge (c): Victor's random number, chosen only after seeing the commitment — prevents Peggy from precomputing a fake answer",
    "Response (s = k + c·x mod q): computed using the real secret — a cheating Peggy without x can't produce a valid s for an unpredictable c",
    "Verification: g^s mod p =? r · y^c mod p — balances only if s was genuinely derived from x",
  ],
  sequence: {
    actors: ZKP_ACTORS,
    messages: [
      { from: "prover", to: "verifier", label: "Commitment: r = g^k mod p", note: "a fresh random nonce k, thrown away after this proof", highlight: true },
      { from: "verifier", to: "prover", label: "Challenge: a random number c", note: "chosen only after seeing r — can't be predicted in advance" },
      { from: "prover", to: "verifier", label: "Response: s = k + c·x mod q", note: "computed using the real secret x", highlight: true },
      { from: "verifier", to: "verifier", label: "Check g^s mod p = r · y^c mod p", note: "accepts only if the equation balances" },
    ],
  },
  textBlock: {
    lang: "text",
    lines: schnorrLines,
    annotations: [
      { line: 1, label: "x", description: "Peggy's secret. Never sent anywhere, in any form.", colorClass: "c-rand" },
      { line: 2, label: "y", description: "Peggy's public value — safe to publish, same role as a public key.", colorClass: "c-hs" },
      { line: 5, label: "r (commitment)", description: "Sent first. Reveals nothing about x since k is random and single-use.", colorClass: "c-cipher" },
      { line: 6, label: "c (challenge)", description: "Victor's random number, chosen after r is already fixed — this is what makes cheating in advance impossible.", colorClass: "c-ver" },
      { line: 7, label: "s (response)", description: "The only message that uses x directly. A prover without x can't produce a valid s for an unpredictable c.", colorClass: "c-len" },
      { line: 9, label: "Verification", description: "Both sides of the equation compute to 5 — the proof checks out, and Victor never saw x.", colorClass: "c-hs" },
    ],
  },
};
