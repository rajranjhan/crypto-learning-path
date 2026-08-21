import type { Step } from "../../../types";

const dhLines = [
  "p = 23, g = 5                  // public: a modulus and a generator, both known to everyone",
  "",
  "a = 6                          // Alice's private number — never sent anywhere",
  "b = 15                         // Bob's private number — never sent anywhere",
  "",
  "A = g^a mod p = 8              // Alice's public value — sent to Bob in the open",
  "B = g^b mod p = 19             // Bob's public value — sent to Alice in the open",
  "",
  "Alice computes: B^a mod p = 2  // using Bob's public value + her own private number",
  "Bob computes:   A^b mod p = 2  // using Alice's public value + his own private number",
];

export const diffieHellmanWorkedExample: Step = {
  id: "diffie-hellman-worked-example",
  title: "Diffie-Hellman, in Real Numbers",
  prose:
    "<p>Encryption Basics covered Diffie-Hellman as paint mixing — a public base color, a private color each side mixes in, and a final shared color neither side ever transmits. Underneath, the real operation is modular exponentiation, and it's worth seeing with actual numbers to confirm the trick isn't magic.</p>" +
    "<p>Alice and Bob agree publicly on a prime modulus p and a generator g — both can be shouted across an open channel with no harm done. Each picks a private number, never shared with anyone: Alice picks 6, Bob picks 15. Each raises the shared generator g to their own private number, mod p, and sends that result — still not the secret, just a public value derived from it — to the other side.</p>" +
    "<p>Now the trick: Alice takes Bob's public value and raises it to her own private number. Bob takes Alice's public value and raises it to his own private number. Because of how exponents combine — (g^a)^b = (g^b)^a = g^(ab) — both land on the identical result, 2, without either one ever having sent their private number, or the shared value itself, across the wire. An eavesdropper who saw p, g, A, and B has everything except a and b, and recovering either one from a public value alone is the discrete logarithm problem — believed computationally infeasible at real key sizes.</p>",
  bullets: [
    "p and g are public — shared openly, safe for anyone to see",
    "a and b are private — generated locally, never transmitted in any form",
    "A = g^a mod p and B = g^b mod p are public values, sent openly, but don't reveal a or b directly",
    "Both sides compute the same shared secret from different starting points: B^a mod p = A^b mod p",
    "Recovering a or b from a public value alone is the discrete logarithm problem — the security guarantee this entire scheme rests on",
  ],
  textBlock: {
    lang: "text",
    lines: dhLines,
    annotations: [
      { line: 0, label: "p, g", description: "Public parameters — a prime modulus and a generator. Both sides, and any eavesdropper, know these.", colorClass: "c-ver" },
      { line: 2, label: "a", description: "Alice's private number. Never sent anywhere, in any form.", colorClass: "c-rand" },
      { line: 3, label: "b", description: "Bob's private number. Same as above.", colorClass: "c-rand" },
      { line: 5, label: "A", description: "Alice's public value — safe to send in the clear. Recovering a from A requires solving the discrete logarithm problem.", colorClass: "c-hs" },
      { line: 6, label: "B", description: "Bob's public value, sent in the clear the same way.", colorClass: "c-hs" },
      { line: 8, label: "Alice's result", description: "Alice combines Bob's public value with her own private number.", colorClass: "c-cipher" },
      { line: 9, label: "Bob's result", description: "Bob combines Alice's public value with his own private number — and lands on the exact same number, 2, as Alice.", colorClass: "c-cipher" },
    ],
  },
};
