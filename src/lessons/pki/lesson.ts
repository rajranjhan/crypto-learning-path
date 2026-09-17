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
  summary: "Learn how certificates, certificate authorities, trust stores, and certificate chains allow clients to authenticate public keys for specific names.",
  whyItMatters:
    "An attacker can hand you a public key too. Certificate validation helps you decide whether that key belongs to the server you intended to reach.",
  objectives: [
    "Explain what a certificate binds together",
    "Trace a root-to-leaf certificate chain",
    "Describe trust stores and certificate revocation",
    "Recognize how Certificate Transparency reduces silent misissuance",
  ],
  prerequisites: ["asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why isn't a correctly signed certificate enough to trust a server?",
      answer: "The client also checks the intended hostname, validity, permitted use, and a chain to a trusted root, along with applicable certificate status policy.",
    },
    {
      question: "Why does a root certificate's self-signature not establish trust?",
      answer: "Anyone can self-sign a certificate. Trust comes from accepting the root through a trust store or another trusted distribution process.",
    },
    {
      question: "Why do revocation and Certificate Transparency solve different problems?",
      answer: "Revocation signals that a certificate should no longer be accepted. Transparency makes issuance visible so unexpected certificates can be detected.",
    },
  ],
  keyTakeaways: [
    "Certificates bind identities to public keys",
    "CAs delegate trust through signed chains",
    "Trust stores define which roots a client accepts",
    "Revocation and transparency handle failures in the trust system",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "concept",
  transitionToNext: "TLS uses this certificate trust model to authenticate servers while establishing secure connections.",
  figure: {
    body: `
    <div class="flow">
      <div class="node trusted">
        <div class="node-title">Root CA</div>
        <div class="node-sub">trust anchor already in the trust store</div>
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
        <div class="node-sub">leaf certificate presented by the server</div>
      </div>
    </div>
    <p class="diagram-note">The client checks the certificate chain back to a trusted root.</p>
  `,
  },
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
