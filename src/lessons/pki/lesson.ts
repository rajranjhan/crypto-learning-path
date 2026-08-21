import type { Lesson } from "../../types";
import { whyPki } from "./steps/why-pki";
import { anatomyOfACertificate } from "./steps/anatomy-of-a-certificate";
import { rootIntermediateLeaf } from "./steps/root-intermediate-leaf";
import { chainValidation } from "./steps/chain-validation";
import { trustStores } from "./steps/trust-stores";
import { revocation } from "./steps/revocation";
import { certificateTransparency } from "./steps/certificate-transparency";
import { whatGoesWrong } from "./steps/what-goes-wrong";
import { checklist } from "./steps/checklist";

export const pkiLesson: Lesson = {
  slug: "pki",
  title: "PKI: Certificates, CAs & Trust Chains",
  status: "available",
  overview:
    "The Asymmetric Primitives lesson ended on a preview: a public key alone " +
    "carries no identity. This lesson covers the system that fixes that — " +
    "Public Key Infrastructure. What's actually inside a certificate, why " +
    "certificates come in root/intermediate/leaf chains, how a client " +
    "validates one link by link, where trust stores come from, how a " +
    "certificate gets revoked before it expires, how Certificate " +
    "Transparency catches a CA behaving badly, and two real incidents where " +
    "this system broke. The TLS lessons immediately ahead dissect a real " +
    "certificate byte-for-byte — this lesson is the trust system those " +
    "bytes are part of.",
  diagram: `
    <div class="flow">
      <div class="node" style="border-color: var(--accent); box-shadow: 0 0 0 2px rgba(37,99,235,0.15);">
        <div class="node-title">Root CA</div>
        <div class="node-sub">already in your trust store</div>
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
        <div class="node-sub">what a TLS server actually presents</div>
      </div>
    </div>
    <p class="diagram-note">
      This chain is exactly what the Certificate step in the TLS lessons
      ahead sends over the wire — this lesson explains why a client trusts
      it at all.
    </p>
  `,
  steps: [
    whyPki,
    anatomyOfACertificate,
    rootIntermediateLeaf,
    chainValidation,
    trustStores,
    revocation,
    certificateTransparency,
    whatGoesWrong,
    checklist,
  ],
};
