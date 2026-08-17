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
    "TLS 1.3 collapses the handshake into a single round trip: the client guesses a " +
    "key-exchange group and sends its key share right in ClientHello, so the server " +
    "can derive keys and reply already encrypted — Certificate, CertificateVerify, " +
    "and even the extensions negotiated in EncryptedExtensions all travel under " +
    "encryption from ServerHello onward. The ChangeCipherSpec records that remain are " +
    "just a harmless compatibility signal for middleboxes expecting TLS 1.2's shape, " +
    "not a real state change. Walk through each record byte by byte below.",
  steps: [
    clientHello, serverHello, serverChangeCipherSpec, encryptedExtensions,
    serverCertificate, serverCertificateVerify, serverFinished,
    clientChangeCipherSpec, clientFinished, applicationData,
  ],
};
