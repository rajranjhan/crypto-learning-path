import type { Lesson } from "../../types";
import { clientHello } from "./steps/client-hello";
import { serverHello } from "./steps/server-hello";
import { certificate } from "./steps/certificate";
import { serverKeyExchange } from "./steps/server-key-exchange";
import { serverHelloDone } from "./steps/server-hello-done";
import { clientKeyExchange } from "./steps/client-key-exchange";
import { changeCipherFinished } from "./steps/change-cipher-finished";
import { applicationData } from "./steps/application-data";

export const tls12Lesson: Lesson = {
  slug: "tls12",
  title: "TLS 1.2: Two-Round-Trip Handshake",
  status: "available",
  summary: "Learn how the TLS 1.2 handshake negotiates algorithms, authenticates a server with certificates, derives session keys, and protects application data.",
  whyItMatters:
    "Reading a handshake reveals how a connection establishes trust and encryption. That helps you understand packet captures and diagnose connection failures.",
  objectives: [
    "Follow the TLS 1.2 handshake message order",
    "Identify where certificates and key exchange appear",
    "Explain how the handshake derives keys before application data",
    "Read key fields from real TLS records",
  ],
  prerequisites: ["pki", "symmetric-primitives", "asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why does a certificate alone not establish an encrypted session?",
      answer: "It binds an identity to a public key. The handshake must also authenticate the exchange, establish fresh key material, and derive traffic keys.",
    },
    {
      question: "Why do Finished messages cover the handshake transcript?",
      answer: "They let peers detect changes to the negotiated handshake using the derived secrets. This binds the session keys to the exchange both peers observed.",
    },
    {
      question: "Why can ephemeral Diffie-Hellman protect old sessions after a certificate key is stolen?",
      answer: "Past traffic keys depend on ephemeral secrets, not just the certificate key. If those ephemeral secrets were erased, the stolen long-term key cannot reconstruct them.",
    },
  ],
  keyTakeaways: [
    "TLS 1.2 needs multiple visible handshake messages before encryption starts",
    "Certificates authenticate the server's public key",
    "ECDHE establishes fresh shared key material",
    "Finished messages prove both sides derived the same keys",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "TLS 1.2 shows the full handshake machinery; TLS 1.3 keeps the same security goals while making the handshake faster and more private.",
  figure: {
    body: `
    <img class="diagram-img" src="diagrams/tls-mailroom.svg" width="1400" height="580" loading="lazy" decoding="async"
         alt="A sender (YOU) and recipient (BANK) on either side of a shared office mailroom. Inside the mailroom, an open envelope labeled 'confidential document' sits exposed with its contents visible, while a coworker peeks at it." />
    <p class="diagram-note">
      TLS seals the envelope before confidential data crosses the network.
    </p>
  `,
  },
  steps: [
    clientHello, serverHello, certificate, serverKeyExchange, serverHelloDone,
    clientKeyExchange, changeCipherFinished, applicationData,
  ],
};
