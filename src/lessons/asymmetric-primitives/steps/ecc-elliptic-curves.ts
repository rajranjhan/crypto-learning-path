import type { Step } from "../../../types";

export const eccEllipticCurves: Step = {
  id: "ecc-elliptic-curves",
  title: "Same Trick, Smaller Keys — Elliptic Curve Cryptography",
  prose:
    "<p>ECC plays the exact same game as Diffie-Hellman — a public operation that's easy to run forward and infeasible to reverse — on a different mathematical structure: points on an elliptic curve, an equation of the shape y² = x³ + ax + b. Points on that curve have their own addition rule (draw a line through two points on the curve, find where it crosses the curve a third time, reflect that point over the x-axis), and \"adding\" a point to itself repeatedly — scalar multiplication — is the ECC equivalent of raising a number to a power.</p>" +
    "<p>Going forward — computing n · P for a known point P and a known number n — is fast. Going backward — given P and n · P, recovering n — is the <strong>elliptic curve discrete logarithm problem</strong>, and it's substantially harder to attack per bit of key size than factoring a large number is. That's the entire payoff: a 256-bit ECC key offers roughly the same real-world security as a 3072-bit RSA key, which means smaller keys, faster computation, and less data on the wire, for the same protection.</p>" +
    "<p><strong>ECDH</strong> (Elliptic Curve Diffie-Hellman) is exactly the previous step's protocol, run with curve points instead of modular exponentiation — this is precisely what's happening inside the key_share field in the TLS 1.3 lessons ahead, and the ECDHE in a TLS 1.2 cipher suite name. <strong>ECDSA</strong> is ECC's signature scheme, the elliptic-curve counterpart to RSA-PSS, covered next.</p>",
  bullets: [
    "Curve equation: y² = x³ + ax + b — points on this curve have their own addition rule",
    "Scalar multiplication (n · P) is the ECC equivalent of exponentiation — easy forward, infeasible to reverse",
    "The elliptic curve discrete logarithm problem is the security guarantee, the same role factoring plays for RSA",
    "256-bit ECC ≈ 3072-bit RSA in real-world security — smaller keys, faster computation, less data on the wire",
    "ECDH: Diffie-Hellman with curve points — exactly what TLS's key_share / ECDHE actually is",
    "ECDSA: ECC's signature scheme — the elliptic-curve counterpart to RSA-PSS",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">RSA</div>
        <div class="node-sub">security from factoring — needs ~3072-bit keys for strong security</div>
      </div>
      <div class="node node-proxy" style="flex: 1;">
        <div class="node-title">ECC</div>
        <div class="node-sub">security from the curve discrete log problem — ~256-bit keys, same strength</div>
      </div>
    </div>
    <p class="diagram-note">
      Same category of hardness assumption — easy forward, infeasible in
      reverse — on a structure that happens to pack more security per bit.
      That efficiency is why modern TLS defaults to ECDHE over plain RSA key
      exchange.
    </p>
  `,
};
