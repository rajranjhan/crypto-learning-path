import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const clientCertificate: Step = {
  id: "client-certificate",
  title: "The Client Shows Its ID",
  prose:
    "Responding to the CertificateRequest, the client sends its own Certificate " +
    "message containing its certificate (and usually the chain up to a CA the " +
    "server trusts). This is the mirror image of what the server did earlier: now " +
    "both parties have put an identity on the table. But presenting a certificate " +
    "isn't enough on its own — a certificate is public, so anyone could copy it. " +
    "The client still has to prove it actually holds the matching private key, " +
    "which is the next message.",
  bullets: [
    "Client sends its certificate (plus chain) after the server's request",
    "Mirror image of the server's Certificate message",
    "A certificate is public — presenting one is not yet proof of ownership",
  ],
  sequence: {
    actors: MTLS_ACTORS,
    messages: [
      { from: "server", to: "client", label: "CertificateRequest" },
      { from: "server", to: "client", label: "ServerHelloDone" },
      { from: "client", to: "server", label: "Certificate", note: "client's cert + chain", highlight: true },
      { from: "client", to: "server", label: "ClientKeyExchange" },
    ],
  },
};
