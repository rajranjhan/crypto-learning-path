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
    "Many service-to-service systems need stronger client identity than bearer tokens alone. mTLS uses the certificate machinery you already know to authenticate clients as well as servers.",
  objectives: [
    "Explain how mTLS differs from ordinary server-authenticated TLS",
    "Identify CertificateRequest and client certificate messages",
    "Describe how CertificateVerify proves possession of the client key",
    "Recognize common mTLS deployment tradeoffs",
  ],
  prerequisites: ["tls12", "tls13", "pki"],
  keyTakeaways: [
    "mTLS authenticates both ends of a connection",
    "The client proves possession of a certificate private key",
    "mTLS is common in service meshes and high-assurance APIs",
    "Certificate lifecycle management becomes a major operational concern",
  ],
  estimatedMinutes: 25,
  difficulty: "Intermediate",
  lessonType: "protocol",
  overview:
    "Ordinary TLS proves the server's identity to the client. Mutual TLS (mTLS) " +
    "adds the reverse: the client also proves its identity with a certificate, so " +
    "both ends know exactly who they are talking to. It's the same TLS handshake " +
    "you already know, plus a few extra client-authentication messages. Follow the " +
    "same sequence diagram across each step — the highlighted arrow is the message " +
    "mTLS adds at that point.",
  steps: [recap, certificateRequest, clientCertificate, certificateVerify, mutualAuthComplete],
};
