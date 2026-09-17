import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const certificateVerify: Step = {
  id: "certificate-verify",
  title: "CertificateVerify — Proving Key Possession",
  wireContext: {
    where: "The client has presented a certificate that anyone could copy.",
    now: "The client signs the handshake context with the matching private key.",
    why: "The server needs evidence of private-key possession, not just a certificate.",
  },
  prose:
    "To prove it truly owns the certificate it just sent, the client signs a " +
    "transcript of the handshake messages so far with its private key and sends " +
    "the result as a CertificateVerify message. The server verifies that signature " +
    "using the public key inside the client's certificate. Because only the holder " +
    "of the matching private key could produce a valid signature, this step turns " +
    "'here is a certificate' into 'and I can prove control of its matching private key.' This is the same " +
    "public/private-key idea from the Encryption Basics lesson, used for " +
    "authentication rather than secrecy.",
  bullets: [
    "Client signs the handshake transcript with its private key",
    "Server verifies the signature with the public key in the client's certificate",
    "Only the real private-key holder can produce a valid signature — proof of possession",
  ],
  takeaway: "mTLS security depends on proving possession of the client certificate private key, not merely presenting the public certificate.",
  sequence: {
    actors: MTLS_ACTORS,
    progress: {
      goal: "Authenticate both sides of the TLS connection",
      already: ["Client Certificate", "ClientKeyExchange"],
      now: "Client signs the handshake transcript",
      next: "Handshake finishes and encrypted application data flows",
    },
    messages: [
      { from: "client", to: "server", label: "Certificate", note: "client's cert" },
      { from: "client", to: "server", label: "ClientKeyExchange" },
      { from: "client", to: "server", label: "CertificateVerify", note: "signed with client private key", highlight: true },
      { from: "client", to: "server", label: "Finished" },
    ],
  },
};
