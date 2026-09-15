import type { Lesson } from "../../types";
import { tlsComparisonFigure } from "../tls-comparison";
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
    "TLS 1.3 is the modern secure-channel default. Comparing it to TLS 1.2 makes the design improvements concrete: fewer round trips, less legacy negotiation, and earlier protection for handshake details.",
  objectives: [
    "Compare TLS 1.3's handshake shape to TLS 1.2",
    "Identify which messages become encrypted earlier",
    "Explain the role of key_share and encrypted extensions",
    "Trace the transition to protected application data",
  ],
  prerequisites: ["tls12"],
  keyTakeaways: [
    "TLS 1.3 establishes keys in the first round trip",
    "ClientHello and ServerHello stay visible; most server authentication details are encrypted after that",
    "Legacy handshake pieces are removed or minimized",
    "The protocol is faster and has a smaller attack surface than TLS 1.2",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "protocol",
  overview:
    "Same mailroom, same problem: you want to send a confidential document to your " +
    "bank, and the mail still has to pass through a shared office mailroom where " +
    "anyone can peek. TLS 1.3 gets the envelope sealed much faster, but not instantly: " +
    "ClientHello and ServerHello are still visible because both sides need them to " +
    "derive the first handshake traffic keys. After ServerHello, the bank's encrypted " +
    "extensions, certificate, CertificateVerify, and Finished messages travel under " +
    "those handshake keys. Walk through each record byte by byte below.",
  figure: tlsComparisonFigure,
  diagram: `
    <img class="diagram-img" src="diagrams/tls-mailroom.svg"
         alt="A sender (YOU) and recipient (BANK) on either side of a shared office mailroom. Inside the mailroom, an open envelope labeled 'confidential document' sits exposed with its contents visible, while a coworker peeks at it." />
    <p class="diagram-note">
      Same risk as TLS 1.2: without encryption, every record here — and the real
      document after it — crosses the network exactly like that open envelope, in
      the clear, for any router or eavesdropper along the way to read. TLS 1.3
      closes that envelope after ServerHello-derived keys exist; ServerHello
      itself remains visible.
    </p>
  `,
  steps: [
    clientHello, serverHello, serverChangeCipherSpec, encryptedExtensions,
    serverCertificate, serverCertificateVerify, serverFinished,
    clientChangeCipherSpec, clientFinished, applicationData,
  ],
};
