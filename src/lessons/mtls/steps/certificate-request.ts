import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const certificateRequest: Step = {
  id: "certificate-request",
  title: "CertificateRequest — Asking for Client Identity",
  wireContext: {
    where: "The server also needs a certificate-based client identity.",
    now: "The server requests a client certificate and indicates acceptable parameters.",
    why: "The client must know which credential and signature scheme to use.",
  },
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
  takeaway: "CertificateRequest turns a normal TLS handshake into one where the client must authenticate with a certificate.",
  sequence: {
    actors: MTLS_ACTORS,
    progress: {
      goal: "Authenticate both sides of the TLS connection",
      already: ["ClientHello", "ServerHello", "Server Certificate"],
      now: "Server sends CertificateRequest",
      next: "Client sends its certificate chain",
    },
    messages: [
      { from: "client", to: "server", label: "ClientHello" },
      { from: "server", to: "client", label: "ServerHello" },
      { from: "server", to: "client", label: "Certificate", note: "server's cert" },
      { from: "server", to: "client", label: "CertificateRequest", note: "please authenticate", highlight: true },
      { from: "server", to: "client", label: "ServerHelloDone" },
    ],
  },
};
