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
  summary: "Explains how certificates, certificate authorities, trust stores, revocation, and transparency make public keys trustworthy.",
  whyItMatters:
    "A public key is only useful if you know whose key it is. PKI is the system browsers, operating systems, and TLS clients use to decide whether a server certificate should be trusted.",
  objectives: [
    "Explain what a certificate binds together",
    "Trace a root-to-leaf certificate chain",
    "Describe trust stores and certificate revocation",
    "Recognize how Certificate Transparency reduces silent misissuance",
  ],
  prerequisites: ["asymmetric-primitives"],
  keyTakeaways: [
    "Certificates bind identities to public keys",
    "CAs delegate trust through signed chains",
    "Trust stores define which roots a client accepts",
    "Revocation and transparency handle failures in the trust system",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "concept",
  overview:
    "PKI is really about trusting a stranger's identity without ever having " +
    "met them — the cleanest way to picture it is a chain of notarized " +
    "introductions, like verifying someone's ID in a country where you " +
    "don't personally know every notary. The metaphor is useful, but it has " +
    "limits: most public TLS certificates prove control of a domain name, not " +
    "that a browser personally verified a company's real-world identity. The " +
    "server certificate is the laminated ID card for a name such as example.com; " +
    "a Certificate Authority is the notary office that checked the required " +
    "claim before stamping it; a root CA " +
    "is the government printing office whose master seal you already carry, " +
    "unquestioned, in your wallet; and the chain of trust is the paper " +
    "trail of stamped authorizations connecting one to the other. This " +
    "lesson walks that metaphor all the way through to real certificates, " +
    "real revocation, and two real incidents where the notary system itself " +
    "broke down. The TLS lessons right after this one dissect a real " +
    "certificate byte-for-byte — this lesson is the technical trust system those " +
    "bytes are part of.",
  diagram: `
    <div class="flow">
      <div class="node trusted">
        <div class="node-title">Government Printing Office</div>
        <div class="node-sub">Root CA — its seal is already in your wallet</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">authorizes</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node">
        <div class="node-title">Regional Notary Branch</div>
        <div class="node-sub">Intermediate CA — does the day-to-day stamping</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">stamps</div>
        <div class="arrow">↓</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">The Bank's ID Card</div>
        <div class="node-sub">Leaf certificate — what a TLS server actually presents</div>
      </div>
    </div>
    <p class="diagram-note">
      This chain of stamps is exactly what the Certificate step in the TLS
      lessons ahead sends over the wire — this lesson explains why a client
      trusts it at all.
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
