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
  overview:
    "Ordinary TLS proves the server's identity to the client. Mutual TLS (mTLS) " +
    "adds the reverse: the client also proves its identity with a certificate, so " +
    "both ends know exactly who they are talking to. It's the same TLS handshake " +
    "you already know, plus a few extra client-authentication messages. Follow the " +
    "same sequence diagram across each step — the highlighted arrow is the message " +
    "mTLS adds at that point.",
  steps: [recap, certificateRequest, clientCertificate, certificateVerify, mutualAuthComplete],
};
