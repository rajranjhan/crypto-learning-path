import type { Step } from "../../../types";

export const deprecatedAndWhy: Step = {
  id: "deprecated-and-why",
  title: "Deprecated Primitives — Retired Algorithms",
  prose:
    "<p>Every algorithm below was once a legitimate standard. Understanding why each one got retired is often more instructive than the current recommendations alone.</p>" +
    "<p><strong>DES</strong> (1977) uses a 56-bit key — trivially small by modern standards. A dedicated cracking machine demonstrated a real DES key recovery in under a day back in 1998; today it's within reach of commodity hardware in hours. <strong>3DES</strong> (Triple DES) patched this by running DES three times with different keys, but it inherits DES's tiny 64-bit block size, which leaks information through birthday-bound collisions on large amounts of traffic (the Sweet32 attack) — NIST formally deprecated it in 2023.</p>" +
    "<p><strong>MD5</strong> (1992) produces a 128-bit digest and was the default hash for years, until real collision attacks were demonstrated in 2004 — two different inputs producing the identical digest, defeating the entire point of a hash. That's not a theoretical concern: forged certificates exploiting MD5 collisions were demonstrated against real certificate authorities in 2008. <strong>SHA-1</strong> (1995) was meant to replace MD5, but suffered the same fate — Google and CWI Amsterdam publicly demonstrated a practical SHA-1 collision (\"SHAttered\") in 2017, and it's been formally deprecated since.</p>" +
    "<p><strong>RC4</strong>, a stream cipher once widely used in TLS and WEP, has statistical biases in its output that let an attacker recover plaintext from enough observed ciphertext — practical attacks were demonstrated against both. RFC 7465 (2015) formally prohibited RC4 in TLS entirely.</p>",
  bullets: [
    "DES: 56-bit key, broken by brute force since at least 1998 — trivial on modern hardware",
    "3DES: patched DES's key size but kept its 64-bit block size, vulnerable to the Sweet32 collision attack — deprecated by NIST in 2023",
    "MD5: practical collisions demonstrated in 2004; used to forge real CA-signed certificates in 2008",
    "SHA-1: practical collision ('SHAttered') publicly demonstrated in 2017 — formally deprecated since",
    "RC4: statistical biases allow plaintext recovery from enough ciphertext — formally prohibited in TLS by RFC 7465 (2015)",
    "None of these are theoretical concerns — every one has a documented, real-world attack behind its deprecation",
  ],
  takeaway: "None of these are theoretical concerns — every one has a documented, real-world attack behind its deprecation.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal attacker">
        <div class="node-title text-warning">❌ Retired</div>
        <div class="node-sub left">DES/3DES; MD5/SHA-1; RC4</div>
      </div>
      <div class="node equal trusted">
        <div class="node-title text-trusted">✅ Current standard</div>
        <div class="node-sub left">AEAD; SHA-2/SHA-3; modern ciphers</div>
      </div>
    </div>
    <p class="diagram-note">
      Cryptographic agility makes retiring broken algorithms survivable.
    </p>
  `,
  },
};
