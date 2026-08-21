import type { Step } from "../../../types";

export const rsaVsEcc: Step = {
  id: "rsa-vs-ecc",
  title: "RSA vs. ECC — And What to Avoid in Either",
  prose:
    "<p>Modern TLS defaults to ECDHE for key exchange and ECDSA (or RSA-PSS) for signatures, and it's worth being explicit about why: ECC's smaller keys mean less data in every handshake and faster math on both ends, for equivalent real-world security. RSA hasn't disappeared — it still shows up for signatures, especially where compatibility with older clients matters — but plain RSA key transport (encrypting a secret directly with the server's RSA public key, no Diffie-Hellman involved) has fallen out of favor for one specific reason: it provides no forward secrecy. If the server's private key is ever compromised, every past session recorded off the wire becomes decryptable retroactively. ECDHE (or plain DHE), by generating a fresh ephemeral key pair for every single handshake, means a compromised long-term key can't unlock sessions that already happened.</p>" +
    "<p>Within either family, the same kind of mistake keeps showing up: using parameters too small or too predictable to still be safe. RSA keys below 2048 bits are considered breakable with enough resources and are barred by current standards. Static (non-ephemeral) Diffie-Hellman groups, reused across many connections, lose the forward-secrecy benefit entirely — and some older, small, or non-standard DH groups are outright breakable (the Logjam attack targeted exactly this). Non-standard or poorly vetted elliptic curves carry their own risk of hidden weaknesses, which is why protocols standardize on a small, heavily analyzed set: P-256, P-384, and Curve25519.</p>",
  bullets: [
    "Modern TLS defaults to ECDHE (key exchange) + ECDSA or RSA-PSS (signatures) — smaller keys, faster math, same security",
    "Plain RSA key transport (no DH involved) provides no forward secrecy — a compromised server key retroactively decrypts every past session",
    "Ephemeral key exchange (ECDHE/DHE) generates a fresh key pair per handshake specifically to avoid that failure mode",
    "RSA keys below 2048 bits are considered breakable and excluded by current standards",
    "Static or weak/small Diffie-Hellman groups lose forward secrecy and, in some cases, are outright breakable (the Logjam attack)",
    "Stick to standardized, heavily analyzed curves — P-256, P-384, Curve25519 — rather than a non-standard or homegrown one",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Avoid</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Plain RSA key transport (no forward secrecy)<br>
          RSA keys under 2048 bits<br>
          Static or weak DH groups<br>
          Non-standard curves
        </div>
      </div>
      <div class="node" style="flex: 1; border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Prefer</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          ECDHE / DHE (ephemeral, forward-secret)<br>
          RSA-2048+ or ECDSA for signatures<br>
          Standard curves: P-256, P-384, Curve25519
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Almost every real-world weakness in this family comes from a
      parameter choice, not from RSA or ECC's underlying math being broken.
    </p>
  `,
};
