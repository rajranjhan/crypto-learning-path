import type { Lesson } from "../../types";
import { clientHello } from "./steps/client-hello";
import { serverHello } from "./steps/server-hello";
import { serverChangeCipherSpec } from "./steps/server-change-cipher-spec";
import { encryptedExtensions } from "./steps/encrypted-extensions";
import { serverCertificate } from "./steps/server-certificate";
import { serverCertificateVerify } from "./steps/server-certificate-verify";
import { serverFinished } from "./steps/server-finished";
import { clientChangeCipherSpec } from "./steps/client-change-cipher-spec";
import { clientFinished } from "./steps/client-finished";
import { applicationData } from "./steps/application-data";

export const tls13Lesson: Lesson = {
  slug: "tls13",
  title: "TLS 1.3: One-Round-Trip Handshake",
  status: "available",
  summary: "Shows how TLS 1.3 compresses and encrypts the handshake earlier than TLS 1.2.",
  whyItMatters:
    "Handshake design affects both latency and privacy. Comparing TLS versions shows how earlier encryption and fewer round trips improve a connection.",
  objectives: [
    "Compare TLS 1.3's handshake shape to TLS 1.2",
    "Identify which messages become encrypted earlier",
    "Explain the role of key_share and encrypted extensions",
    "Trace the transition to protected application data",
  ],
  prerequisites: ["tls12"],
  checkYourUnderstanding: [
    {
      question: "Why can TLS 1.3 encrypt handshake messages earlier than TLS 1.2?",
      answer: "The initial hello messages carry the key shares needed to derive handshake keys. Later authentication messages can therefore be encrypted.",
    },
    {
      question: "Why doesn't encrypting the server certificate replace certificate validation?",
      answer: "Encryption hides the certificate from observers; it does not establish that the peer is the intended server. The client still validates identity and proof of key possession.",
    },
    {
      question: "Why does a shorter handshake still need Finished messages?",
      answer: "Fewer round trips do not remove the need to authenticate the transcript and confirm possession of the derived secrets.",
    },
  ],
  keyTakeaways: [
    "TLS 1.3 establishes keys in the first round trip",
    "ClientHello and ServerHello stay visible; most server authentication details are encrypted after that",
    "Legacy handshake pieces are removed or minimized",
    "The protocol is faster and has a smaller attack surface than TLS 1.2",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "TLS authenticates servers by default. Mutual TLS extends the same certificate model so clients can authenticate too.",
  figure: {
    body: `
    <img class="diagram-img" src="diagrams/tls-mailroom.svg"
         alt="A sender (YOU) and recipient (BANK) on either side of a shared office mailroom. Inside the mailroom, an open envelope labeled 'confidential document' sits exposed with its contents visible, while a coworker peeks at it." />
    <p class="diagram-note">
      TLS 1.3 closes the envelope earlier, after ServerHello-derived keys exist.
    </p>
  `,
  },
  steps: [
    clientHello, serverHello, serverChangeCipherSpec, encryptedExtensions,
    serverCertificate, serverCertificateVerify, serverFinished,
    clientChangeCipherSpec, clientFinished, applicationData,
  ],
};
