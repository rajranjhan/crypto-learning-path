import type { Step } from "../../../types";

const rsaLines = [
  "p = 61, q = 53              // two secret primes",
  "n = p × q = 3233            // the public modulus",
  "φ(n) = (p-1)(q-1) = 3120    // Euler's totient — stays secret",
  "e = 17                      // the public exponent (must be coprime to φ(n))",
  "d = e⁻¹ mod φ(n) = 2753     // the private exponent",
  "",
  "m = 65                      // the message, as a number",
  "c = m^e mod n = 2790        // ENCRYPT with the public key (e, n)",
  "m = c^d mod n = 65          // DECRYPT with the private key (d, n) — recovers 65",
];

export const rsaTheMath: Step = {
  id: "rsa-the-math",
  title: "Inside RSA — A Real, Tiny Worked Example",
  prose:
    "<p>RSA's security rests on one asymmetry: multiplying two large prime numbers together is fast, but factoring that product back into its two primes is, for large enough primes, computationally infeasible with any known algorithm. Key generation exploits that gap directly.</p>" +
    "<p>Pick two large secret primes, p and q, and multiply them to get the public modulus n = p × q. Compute Euler's totient, φ(n) = (p-1)(q-1) — a value that stays secret, since computing it requires knowing p and q individually. Choose a public exponent e (65537 is the near-universal real-world choice; this example uses a smaller number for readability) that shares no common factor with φ(n), then compute the private exponent d as e's modular inverse mod φ(n): the one number that makes e × d ≡ 1 (mod φ(n)).</p>" +
    "<p>The public key is the pair (e, n); the private key is (d, n). Encryption raises the message to the e-th power mod n; decryption raises the ciphertext to the d-th power mod n — and thanks to how modular exponentiation and the totient interact, that always recovers the original message exactly. The numbers below are real, computed values, deliberately tiny — production RSA uses primes hundreds of digits long, but the relationship holds identically at any size.</p>",
  bullets: [
    "n = p × q, where p and q are two large secret primes — n itself is public",
    "φ(n) = (p-1)(q-1) — Euler's totient, computable only if you know p and q, so it stays secret",
    "Public key: (e, n). Private key: (d, n), where d is e's modular inverse mod φ(n)",
    "Encrypt: c = m^e mod n. Decrypt: m = c^d mod n — always recovers the original message",
    "Security rests entirely on factoring n back into p and q being infeasible at real key sizes (2048+ bits)",
  ],
  textBlock: {
    lang: "text",
    lines: rsaLines,
    annotations: [
      { line: 0, label: "p, q", description: "The two secret primes. In production RSA these are hundreds of digits long; here they're tiny for readability.", colorClass: "c-rand" },
      { line: 1, label: "n", description: "The public modulus — part of the public key. Recovering p and q from n alone is the hard problem RSA leans on.", colorClass: "c-hs" },
      { line: 2, label: "φ(n)", description: "Euler's totient. Only computable if you know p and q individually, so an attacker who only has n can't derive it.", colorClass: "c-rand" },
      { line: 4, label: "d", description: "The private exponent — the actual secret. Deriving it from the public key alone requires factoring n first.", colorClass: "c-cipher" },
      { line: 7, label: "c = m^e mod n", description: "Encryption, using only the public key (e, n) — anyone can do this.", colorClass: "c-ver" },
      { line: 8, label: "m = c^d mod n", description: "Decryption, using the private key (d, n) — recovers 65 exactly, the original message.", colorClass: "c-len" },
    ],
  },
};
