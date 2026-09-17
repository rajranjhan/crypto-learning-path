import type { Step } from "../../../types";

export const rootIntermediateLeaf: Step = {
  id: "root-intermediate-leaf",
  title: "Certificate Authorities — Roots and Intermediates",
  prose:
    "<p>What makes the bank's ID card trustworthy is a notary's stamp on the back — issued by an office that checked the required claim before stamping the card. For most public TLS certificates that claim is <strong>domain validation</strong>: the requester proved control of example.com, usually by responding to a DNS or HTTP challenge. Some certificate types include organization validation, but ordinary TLS trust should not be read as \"this company is safe\" or \"this business identity was deeply investigated.\" That notary office is a <strong>Certificate Authority (CA)</strong>. Now the card isn't just a claim; it's a claim backed by the CA's validation process and signature.</p>" +
    "<p>But why trust that notary? Because the notary's own stamp is itself certified — by a bigger authority, like a national government printing office. That's a <strong>root CA</strong>: self-signed, meaning it vouches for itself, and treated as trustworthy only because its seal is pre-installed in an operating system's or browser's trust store through an extensive, audited vetting process. Root CA private keys are some of the most tightly guarded secrets in the industry — often kept offline entirely, in a physically secured facility, used only a handful of times a year.</p>" +
    "<p>Because the root's seal is used so rarely, the government printing office doesn't personally stamp every ID card in the country — that's operationally risky; if their master seal were ever stolen, everything would be compromised. Instead, they delegate: they issue an authorization letter to <strong>regional notary branches</strong> — <strong>intermediate CAs</strong> — letting them stamp cards on the government's behalf. Each branch's authorization letter is itself signed by the root. If a branch's stamp is ever compromised, that one branch gets shut down and distrusted without the root's own seal ever being touched.</p>" +
    "<p>The certificate your server actually presents — the <strong>leaf</strong> (or end-entity) certificate — is signed by an intermediate, which was itself signed by a root already in the client's trust store. That's the whole <strong>chain of trust</strong>: leaf → intermediate → root, each link a stamp, the last link already trusted before the connection even started.</p>",
  bullets: [
    "CA (Certificate Authority) = a notary office that verifies the required claim before stamping a card",
    "Domain validation usually proves control of a DNS name, not broad real-world trust in the organization",
    "Root CA: self-signed, pre-installed in trust stores after an audited vetting process, kept offline and used rarely — the government printing office whose seal you already trust",
    "Intermediate CA: authorized by the root to do the actual day-to-day stamping — a regional notary branch",
    "Layering limits blast radius: a compromised intermediate can be revoked without ever touching the root",
    "Leaf (end-entity) certificate: the one an actual server presents, signed by an intermediate",
    "The chain: leaf → intermediate → root, each link a stamp, the root already trusted before the connection starts",
  ],
  takeaway: "The chain: leaf → intermediate → root, each link a stamp, the root already trusted before the connection starts.",
  figure: {
    body: `
    <div class="flow">
      <div class="node trusted">
        <div class="node-title">Root CA</div>
        <div class="node-sub">self-signed, offline, already in the trust store</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">authorizes</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node">
        <div class="node-title">Intermediate CA</div>
        <div class="node-sub">delegated issuer for day-to-day signing</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">stamps</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Server Certificate</div>
        <div class="node-sub">leaf certificate the server presents</div>
      </div>
    </div>
    <p class="diagram-note">
      The next step walks through exactly how a client turns this diagram
      into a yes/no trust decision.
    </p>
  `,
  },
};
