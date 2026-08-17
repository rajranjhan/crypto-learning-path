import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const certificateRequest: Step = {
  id: "certificate-request",
  title: "The Server Asks the Client to Prove Who It Is",
  prose:
    "mTLS adds one message on the server's side of the handshake: after sending " +
    "its own certificate, the server sends a CertificateRequest. This tells the " +
    "client 'you must also present a certificate,' and lists which certificate " +
    "authorities the server trusts and which signature algorithms it accepts. " +
    "Everything else in the handshake is unchanged — mTLS is regular TLS plus a " +
    "few extra client-authentication messages, not a different protocol.",
  bullets: [
    "Sent by the server, right after its own Certificate message",
    "Lists the CAs the server trusts and the signature algorithms it accepts",
    "Signals that the client MUST present a certificate to continue",
  ],
  sequence: {
    actors: MTLS_ACTORS,
    messages: [
      { from: "client", to: "server", label: "ClientHello" },
      { from: "server", to: "client", label: "ServerHello" },
      { from: "server", to: "client", label: "Certificate", note: "server's cert" },
      { from: "server", to: "client", label: "CertificateRequest", note: "please authenticate", highlight: true },
      { from: "server", to: "client", label: "ServerHelloDone" },
    ],
  },
};
