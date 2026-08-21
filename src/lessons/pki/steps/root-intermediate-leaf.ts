import type { Step } from "../../../types";

export const rootIntermediateLeaf: Step = {
  id: "root-intermediate-leaf",
  title: "Why Certificates Come in Chains",
  prose:
    "<p>A certificate almost never sits alone — it's part of a chain. At the top is a <strong>root CA</strong> certificate: self-signed, meaning it vouches for itself, and treated as trustworthy only because it's been pre-installed in an operating system's or browser's trust store through an extensive, audited vetting process. Root CA private keys are some of the most tightly guarded secrets in the industry — often kept offline entirely, in a physically secured facility, used only a handful of times a year.</p>" +
    "<p>Because the root key is used so rarely, it doesn't sign ordinary server certificates directly. Instead, it signs one or more <strong>intermediate CA</strong> certificates, which do the actual day-to-day work of signing real server certificates. This layering exists specifically to limit blast radius: if an intermediate's key is ever compromised, that one intermediate gets revoked and distrusted without ever touching the root — the root stays offline and safe throughout.</p>" +
    "<p>The certificate your server actually presents — the <strong>leaf</strong> (or end-entity) certificate — is signed by an intermediate, which was itself signed by a root already in the client's trust store. That's the whole <strong>chain of trust</strong>: leaf → intermediate → root, each link a signature, the last link already trusted before the connection even started.</p>",
  bullets: [
    "Root CA: self-signed, pre-installed in trust stores after an audited vetting process, kept offline and used rarely",
    "Intermediate CA: signed by the root, does the actual day-to-day signing of real certificates",
    "Layering limits blast radius: a compromised intermediate can be revoked without ever touching the root",
    "Leaf (end-entity) certificate: the one an actual server presents, signed by an intermediate",
    "The chain: leaf → intermediate → root, each link a signature, the root already trusted before the connection starts",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color: var(--accent); box-shadow: 0 0 0 2px rgba(37,99,235,0.15);">
        <div class="node-title">Root CA</div>
        <div class="node-sub">self-signed, offline, already in the trust store</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">signs</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node">
        <div class="node-title">Intermediate CA</div>
        <div class="node-sub">does the day-to-day signing</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">signs</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Leaf Certificate</div>
        <div class="node-sub">example.com — what the server actually presents</div>
      </div>
    </div>
    <p class="diagram-note">
      The next step walks through exactly how a client turns this diagram
      into a yes/no trust decision.
    </p>
  `,
};
