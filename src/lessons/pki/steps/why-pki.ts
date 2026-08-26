import type { Step } from "../../../types";

export const whyPki: Step = {
  id: "why-pki",
  title: "A Public Key Alone Proves Nothing",
  prose:
    "<p>PKI is really about trusting a stranger's identity without ever having met them — like verifying someone's ID in a country where you don't personally know every notary. In the mailroom from the TLS lessons, the bank showed you an ID card (a certificate) to prove it was really \"the bank.\" But that just pushes the question back one level: how do you know that ID card itself isn't forged? A plastic card with a name printed on it proves nothing on its own — and neither does a public key.</p>" +
    "<p>The previous lesson ended on exactly that preview: a public key, on its own, carries no identity. Anyone can generate an RSA or ECC key pair in seconds and claim it belongs to your bank. Signature verification only proves a message was signed by <em>whoever holds the matching private key</em> — it says nothing about who that is, unless something else ties the key to an identity first.</p>" +
    "<p><strong>PKI (Public Key Infrastructure)</strong> is that something else: the whole system of certificates, certificate authorities, and trust stores that lets a stranger's public key be trusted for a specific purpose — usually, \"this key belongs to example.com.\" It's not one algorithm; it's an organizational and technical structure — a system of ID cards, notary stamps, and a government seal you already trust — built on top of the signatures the previous lesson covered.</p>" +
    "<p>This lesson stays one level above the wire. The TLS lessons right after this one dissect a real certificate byte-for-byte and show exactly where it sits in a handshake; this lesson explains the system those bytes are part of — how a certificate gets its authority, how a chain gets validated, what happens when one needs to be revoked before it expires, and where the whole model has actually broken in the real world.</p>",
  bullets: [
    "PKI's core problem, in one line: an ID card (certificate) only pushes the trust question back one level — how do you know the card itself isn't forged?",
    "A public key alone carries no identity — anyone can generate one and claim it belongs to anyone",
    "PKI ties a public key to an identity through a certificate, backed by a trusted third party's signature",
    "PKI is a system (certificates + CAs + trust stores), not a single algorithm — it's built on top of the signatures from the previous lesson",
    "The TLS lessons ahead show the wire-level bytes; this lesson explains the trust system behind them",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Bare public key</div>
        <div class="node-sub">just a number — no identity attached</div>
      </div>
      <div class="link">
        <div class="lock">📜</div>
        <div class="link-label">+ identity claim + a trusted signature</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Certificate</div>
        <div class="node-sub">a public key you can actually trust for a specific identity</div>
      </div>
    </div>
    <p class="diagram-note">
      Everything in this lesson is about how that arrow works: who's allowed
      to add that signature, how a client checks it, and what happens when
      it needs to be taken back.
    </p>
  `,
};
