import type { Step } from "../../../types";

export const rsaVsEcc: Step = {
  id: "rsa-vs-ecc",
  title: "RSA vs. ECC — Tradeoffs",
  prose:
    "<p>Modern TLS defaults to ECDHE for key exchange and ECDSA (or RSA-PSS) for signatures, and it's worth being explicit about why: ECC's smaller keys mean less data in every handshake and faster math on both ends, for equivalent real-world security. RSA hasn't disappeared — it still shows up for signatures, especially where compatibility with older clients matters — but plain RSA key transport (encrypting a secret directly with the server's RSA public key, no Diffie-Hellman involved) has fallen out of favor for one specific reason: it provides no forward secrecy. If the server's private key is ever compromised, every past session recorded off the wire becomes decryptable retroactively. ECDHE (or plain DHE), by generating a fresh ephemeral key pair for every single handshake, means a compromised long-term key can't unlock sessions that already happened.</p>" +
    "<p>Within either family, the same kind of mistake keeps showing up: using parameters too small or too predictable to still be safe. RSA keys below 2048 bits are considered breakable with enough resources and are barred by current standards. Reusing static Diffie-Hellman private keys across connections loses the forward-secrecy benefit; reusing vetted public group parameters does not — and some older, small, or non-standard DH groups are outright breakable (the Logjam attack targeted exactly this). Non-standard or poorly vetted elliptic curves carry their own risk of hidden weaknesses, which is why protocols standardize on a small, heavily analyzed set: P-256, P-384, and Curve25519.</p>",
  bullets: [
    "Modern TLS defaults to ECDHE (key exchange) + ECDSA or RSA-PSS (signatures) — smaller keys, faster math, same security",
    "Plain RSA key transport (no DH involved) provides no forward secrecy — a compromised server key retroactively decrypts every past session",
    "Ephemeral key exchange (ECDHE/DHE) generates a fresh key pair per handshake specifically to avoid that failure mode",
    "RSA keys below 2048 bits are considered breakable and excluded by current standards",
    "Static DH private keys lose forward secrecy; weak public groups pose a separate attack risk",
    "Stick to standardized, heavily analyzed curves — P-256, P-384, Curve25519 — rather than a non-standard or homegrown one",
  ],
  takeaway: "Stick to standardized, heavily analyzed curves — P-256, P-384, Curve25519 — rather than a non-standard or homegrown one.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal attacker">
        <div class="node-title text-warning">❌ Avoid</div>
        <div class="node-sub left">plain RSA; weak keys; static DH; custom curves</div>
      </div>
      <div class="node equal trusted">
        <div class="node-title text-trusted">✅ Prefer</div>
        <div class="node-sub left">ECDHE/DHE; RSA-2048+; standard curves</div>
      </div>
    </div>
    <p class="diagram-note">
      Almost every real-world weakness in this family comes from a
      parameter choice, not from RSA or ECC's underlying math being broken.
    </p>
  `,
  },
};
