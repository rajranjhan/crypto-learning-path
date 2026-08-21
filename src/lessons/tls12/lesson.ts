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
  overview:
    "You want to send a confidential document to your bank, but the mail has to " +
    "pass through a shared office mailroom where anyone can peek. TLS is what seals " +
    "that envelope: a handshake that lets you and the bank agree on a shared secret " +
    "in full view of that mailroom, then use it to encrypt everything that follows. " +
    "Walk through each record byte by byte below.",
  diagram: `
    <img class="diagram-img" src="diagrams/tls-mailroom.svg"
         alt="A sender (YOU) and recipient (BANK) on either side of a shared office mailroom. Inside the mailroom, an open envelope labeled 'confidential document' sits exposed with its contents visible, while a coworker peeks at it." />
    <p class="diagram-note">
      Without TLS, every record in this handshake — and the application data after
      it — crosses the network exactly like that open envelope: in the clear, for
      any router or eavesdropper along the way to read. The steps below show how
      the handshake negotiates a key that seals the envelope before anything
      confidential goes in it.
    </p>
  `,
  steps: [
    clientHello, serverHello, certificate, serverKeyExchange, serverHelloDone,
    clientKeyExchange, changeCipherFinished, applicationData,
  ],
};
