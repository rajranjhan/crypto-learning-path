import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const recap: Step = {
  id: "server-only-auth",
  title: "Recap — Normal TLS Only Checks the Server",
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
  sequence: {
    actors: MTLS_ACTORS,
    messages: [
      { from: "client", to: "server", label: "ClientHello" },
      { from: "server", to: "client", label: "ServerHello" },
      { from: "server", to: "client", label: "Certificate", note: "server proves its identity", highlight: true },
      { from: "server", to: "client", label: "ServerHelloDone" },
      { from: "client", to: "server", label: "Finished" },
      { from: "server", to: "client", label: "Finished" },
    ],
  },
};
