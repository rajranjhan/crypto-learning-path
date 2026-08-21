import type { Step } from "../../../types";

const paillierLines = [
  "// Paillier is additively homomorphic: E(a) · E(b) mod n² = E(a + b)",
  "a = 7                        // Alice's secret number",
  "b = 3                        // Bob's secret number",
  "",
  "c_a = Encrypt(a) = 4569212…  // Alice's ciphertext — meaningless without the private key",
  "c_b = Encrypt(b) = 8823041…  // Bob's ciphertext",
  "",
  "c_sum = (c_a · c_b) mod n²   // multiply the CIPHERTEXTS — no key needed for this step",
  "",
  "Decrypt(c_sum) = 10          // = a + b, exactly. Nobody but the key holder ever saw 7, 3, or 10.",
];

export const workedExamplePaillier: Step = {
  id: "worked-example-paillier",
  title: "A Working Example — Adding Numbers You Can't See (Paillier)",
  prose:
    "<p>Abstract talk about a \"homomorphic property\" is easier to trust once you've seen one work. <strong>Paillier</strong>, published in 1999, is additively homomorphic: multiplying two Paillier ciphertexts together (modulo n², the scheme's own modulus) produces a new ciphertext that decrypts to the <em>sum</em> of the two original plaintexts — even though whoever performs that multiplication never sees either plaintext, or the sum, at any point.</p>" +
    "<p>The numbers below are shrunk down for illustration — real Paillier keys use numbers hundreds of digits long — but the relationship holds exactly the same way at full size. Alice encrypts 7. Bob encrypts 3. Someone with no key at all — the untrusted cloud from the previous step — multiplies the two ciphertexts together. Only the person holding the private key, decrypting that result, ever learns the sum is 10; at no point does anyone else see 7, 3, or any relationship between them.</p>",
  bullets: [
    "E(a) · E(b) mod n² = E(a + b) — the defining property of Paillier",
    "The party performing the multiplication needs no key at all, and learns nothing about a, b, or a + b",
    "Only the private-key holder, decrypting the final ciphertext, ever sees the actual sum",
    "Genuinely useful on its own for one narrow but common case: privately aggregating numbers (votes, totals, sensor readings) without any party seeing the individual inputs",
  ],
  textBlock: {
    lang: "text",
    lines: paillierLines,
    annotations: [
      { line: 1, label: "a", description: "Alice's secret input — never sent anywhere in this form.", colorClass: "c-rand" },
      { line: 2, label: "b", description: "Bob's secret input — same as above.", colorClass: "c-rand" },
      { line: 4, label: "c_a", description: "Alice's ciphertext. This is the only thing that ever leaves Alice's machine.", colorClass: "c-cipher" },
      { line: 5, label: "c_b", description: "Bob's ciphertext — the only thing that ever leaves Bob's machine.", colorClass: "c-cipher" },
      { line: 7, label: "c_sum", description: "The homomorphic operation itself: multiplying two ciphertexts, with no key, no decryption, and no visibility into a or b at any point.", colorClass: "c-hs" },
      { line: 9, label: "Decrypt(c_sum)", description: "The only step in this entire example that ever touches the private key — and the only point where a real number becomes visible to anyone.", colorClass: "c-ver" },
    ],
  },
};
