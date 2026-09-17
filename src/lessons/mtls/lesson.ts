import type { Lesson } from "../../types";
import { recap } from "./steps/recap";
import { certificateRequest } from "./steps/certificate-request";
import { clientCertificate } from "./steps/client-certificate";
import { certificateVerify } from "./steps/certificate-verify";
import { mutualAuthComplete } from "./steps/mutual-auth-complete";

export const mtlsLesson: Lesson = {
  slug: "mtls",
  title: "Mutual TLS: Client Authentication",
  status: "available",
  summary: "Extends TLS with client certificates so both sides authenticate during the handshake.",
  whyItMatters:
    "Services often need to verify the client as well as the server. mTLS provides that identity check, with certificate management as an operational cost.",
  objectives: [
    "Explain how mTLS differs from ordinary server-authenticated TLS",
    "Identify CertificateRequest and client certificate messages",
    "Describe how CertificateVerify proves possession of the client key",
    "Recognize common mTLS deployment tradeoffs",
  ],
  prerequisites: ["tls12", "tls13", "pki"],
  checkYourUnderstanding: [
    {
      question: "Why isn't sending a client certificate enough to authenticate the client?",
      answer: "A certificate is public and can be copied. The client must also prove possession of its private key by signing handshake data.",
    },
    {
      question: "Does successful mTLS mean a client may call every API operation?",
      answer: "No. mTLS establishes a peer identity; application authorization still decides which actions that identity may perform.",
    },
    {
      question: "Why does deploying mTLS create more than a handshake configuration task?",
      answer: "Clients need certificate issuance, renewal, key protection, and a response to compromise. Those lifecycle controls must work across the deployment.",
    },
  ],
  keyTakeaways: [
    "mTLS authenticates both ends of a connection",
    "The client proves possession of a certificate private key",
    "mTLS is common in service meshes and high-assurance APIs",
    "Certificate lifecycle management becomes a major operational concern",
  ],
  estimatedMinutes: 25,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "TLS protects a connection. Encryption at rest protects data after it has been stored.",
  figure: {
    body: `
      <div class="flow">
        <div class="node client"><div class="node-title">Client</div><div class="node-sub">Verifies the server certificate and proof</div></div>
        <div class="link"><div class="link-label">Mutual authentication</div><div class="arrow">↔</div></div>
        <div class="node server"><div class="node-title">Server</div><div class="node-sub">Verifies the client certificate and proof</div></div>
      </div>
    `,
    caption: "Each peer proves possession of its certificate's private key.",
  },
  steps: [recap, certificateRequest, clientCertificate, certificateVerify, mutualAuthComplete],
};
