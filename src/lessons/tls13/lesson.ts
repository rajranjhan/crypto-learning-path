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
  title: "How TLS 1.3 Works",
  status: "available",
  overview:
    "Same mailroom, same problem: you want to send a confidential document to your " +
    "bank, and the mail still has to pass through a shared office mailroom where " +
    "anyone can peek. TLS 1.3 just gets the envelope sealed much faster — instead " +
    "of two round trips of visible back-and-forth before anything is protected, " +
    "you and the bank agree on a shared secret in the very first exchange, and " +
    "everything after that, including the bank's ID and its signature proving who " +
    "it is, travels already sealed inside an envelope no one in the mailroom can " +
    "open. Walk through each record byte by byte below.",
  diagram: `
    <img class="diagram-img" src="diagrams/tls-mailroom.svg"
         alt="A sender (YOU) and recipient (BANK) on either side of a shared office mailroom. Inside the mailroom, an open envelope labeled 'confidential document' sits exposed with its contents visible, while a coworker peeks at it." />
    <p class="diagram-note">
      Same risk as TLS 1.2: without encryption, every record here — and the real
      document after it — crosses the network exactly like that open envelope, in
      the clear, for any router or eavesdropper along the way to read. TLS 1.3's
      whole selling point is closing that envelope almost immediately, instead of
      leaving it open for most of the handshake the way TLS 1.2 does.
    </p>
  `,
  steps: [
    clientHello, serverHello, serverChangeCipherSpec, encryptedExtensions,
    serverCertificate, serverCertificateVerify, serverFinished,
    clientChangeCipherSpec, clientFinished, applicationData,
  ],
};
