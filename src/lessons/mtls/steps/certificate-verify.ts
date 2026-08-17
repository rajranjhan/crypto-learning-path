import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const certificateVerify: Step = {
  id: "certificate-verify",
  title: "The Client Proves the ID Is Really Its Own",
  prose:
    "To prove it truly owns the certificate it just sent, the client signs a " +
    "transcript of the handshake messages so far with its private key and sends " +
    "the result as a CertificateVerify message. The server verifies that signature " +
    "using the public key inside the client's certificate. Because only the holder " +
    "of the matching private key could produce a valid signature, this step turns " +
    "'here is a certificate' into 'and I can prove it is mine.' This is the same " +
    "public/private-key idea from the Encryption Basics lesson, used for " +
    "authentication rather than secrecy.",
  bullets: [
    "Client signs the handshake transcript with its private key",
    "Server verifies the signature with the public key in the client's certificate",
    "Only the real private-key holder can produce a valid signature — proof of possession",
  ],
  sequence: {
    actors: MTLS_ACTORS,
    messages: [
      { from: "client", to: "server", label: "Certificate", note: "client's cert" },
      { from: "client", to: "server", label: "ClientKeyExchange" },
      { from: "client", to: "server", label: "CertificateVerify", note: "signed with client private key", highlight: true },
      { from: "client", to: "server", label: "Finished" },
    ],
  },
};
