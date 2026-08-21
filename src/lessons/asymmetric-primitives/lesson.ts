import type { Lesson } from "../../types";
import { theKeyDistributionProblem } from "./steps/the-key-distribution-problem";
import { rsaTheMath } from "./steps/rsa-the-math";
import { rsaPadding } from "./steps/rsa-padding";
import { diffieHellmanWorkedExample } from "./steps/diffie-hellman-worked-example";
import { eccEllipticCurves } from "./steps/ecc-elliptic-curves";
import { digitalSignatures } from "./steps/digital-signatures";
import { certificatesChainOfTrust } from "./steps/certificates-chain-of-trust";
import { rsaVsEcc } from "./steps/rsa-vs-ecc";
import { checklist } from "./steps/checklist";

export const asymmetricPrimitivesLesson: Lesson = {
  slug: "asymmetric-primitives",
  title: "Asymmetric Primitives: RSA, ECC & Diffie-Hellman",
  status: "available",
  overview:
    "The previous lesson named the symmetric standards (AES, SHA, HMAC) this " +
    "series relies on. This one does the same for the asymmetric side: real " +
    "RSA math with a tiny worked example, a real Diffie-Hellman key exchange " +
    "computed by hand, elliptic curve cryptography as the modern, " +
    "smaller-key alternative, and digital signatures — encryption's private " +
    "and public keys, used in reverse. TLS 1.2's handshake literally uses " +
    "these primitives (RSA or ECDSA signatures, ECDHE key exchange) to " +
    "bootstrap the AES key the previous lesson covered — the PKI lesson " +
    "right after this one, and the TLS lessons following it, are where " +
    "that payoff becomes concrete.",
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">RSA</div>
        <div class="node-sub">the padlock — signs the Certificate &amp; CertificateVerify steps ahead</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Diffie-Hellman / ECC</div>
        <div class="node-sub">the paint-mixing — is exactly TLS's ServerKeyExchange &amp; key_share</div>
      </div>
    </div>
    <p class="diagram-note">
      Two families, one job: agree on a shared secret, or prove an identity,
      without ever transmitting the actual secret. The TLS lessons ahead use
      both by name.
    </p>
  `,
  steps: [
    theKeyDistributionProblem,
    rsaTheMath,
    rsaPadding,
    diffieHellmanWorkedExample,
    eccEllipticCurves,
    digitalSignatures,
    certificatesChainOfTrust,
    rsaVsEcc,
    checklist,
  ],
};
