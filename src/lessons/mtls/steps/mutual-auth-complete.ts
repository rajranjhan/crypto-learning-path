import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const mutualAuthComplete: Step = {
  id: "mutual-auth-complete",
  title: "Both Sides Trust Each Other — and Where It's Used",
  prose:
    "Once the server verifies the client's CertificateVerify signature, both sides " +
    "have cryptographically proven their identities and the handshake finishes " +
    "exactly as ordinary TLS does. From here, encrypted application data flows over " +
    "a channel where each end knows precisely who the other is. Enterprises use " +
    "mTLS for service-to-service calls, API gateways, and zero-trust networks. " +
    "Most importantly for the next lesson: mTLS lets an OAuth authorization server " +
    "bind an access token to the client's certificate (RFC 8705), so a stolen token " +
    "is useless without the client's private key. That idea — a token tied to a key " +
    "— is exactly where the OAuth lesson picks up.",
  bullets: [
    "Both parties are now authenticated; the handshake completes like normal TLS",
    "Used for service-to-service auth, API gateways, and zero-trust networks",
    "Bridge to OAuth: mTLS can bind an access token to the client cert (RFC 8705)",
  ],
  sequence: {
    actors: MTLS_ACTORS,
    messages: [
      { from: "client", to: "server", label: "CertificateVerify" },
      { from: "client", to: "server", label: "Finished" },
      { from: "server", to: "client", label: "Finished" },
      { from: "client", to: "server", label: "Application Data", note: "both ends authenticated", highlight: true },
      { from: "server", to: "client", label: "Application Data" },
    ],
  },
  callouts: [
    {
      requirementId: "Versions",
      title: "mTLS still requires TLS ≥ 1.2",
      body: "Mutual TLS is regular TLS with client authentication added; the transport still negotiates TLS 1.2 or higher.",
    },
  ],
};
