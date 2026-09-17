import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const recap: Step = {
  id: "server-only-auth",
  title: "Server Authentication — Normal TLS Recap",
  wireContext: {
    where: "The TLS lessons established how a client authenticates a server.",
    now: "The sequence reviews server authentication before adding client certificates.",
    why: "Mutual authentication builds on the same certificate and key-possession checks.",
  },
  prose:
    "In an ordinary TLS handshake (the one you walked through in the TLS lessons) " +
    "only the server proves who it is. It sends a certificate, and the client " +
    "checks that certificate against a trusted CA. The client, however, stays " +
    "anonymous at the TLS layer — the server has no cryptographic proof of which " +
    "client is connecting. For public websites that's fine; you log in with a " +
    "password afterward. But for machine-to-machine and high-assurance APIs, the " +
    "server often needs to know the client is exactly who it claims to be, before " +
    "any application data flows. That gap is what mutual TLS (mTLS) closes.",
  bullets: [
    "Server sends a certificate; client verifies it against a trusted CA",
    "Client is not authenticated at the TLS layer — it stays anonymous",
    "Fine for browsers (you log in later), but not for high-assurance APIs",
  ],
  takeaway: "Ordinary TLS authenticates the server; mTLS adds client authentication during the TLS handshake itself.",
  sequence: {
    actors: MTLS_ACTORS,
    progress: {
      goal: "Understand what client authentication adds to TLS",
      already: ["ClientHello", "ServerHello"],
      now: "Server certificate binds a name to a key; the handshake proves key possession",
      next: "Server asks the client for its certificate",
    },
    messages: [
      { from: "client", to: "server", label: "ClientHello" },
      { from: "server", to: "client", label: "ServerHello" },
      { from: "server", to: "client", label: "Certificate", note: "server presents its name-to-key binding", highlight: true },
      { from: "server", to: "client", label: "ServerHelloDone" },
      { from: "client", to: "server", label: "Finished" },
      { from: "server", to: "client", label: "Finished" },
    ],
  },
};
