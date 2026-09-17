import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";
import { MTLS_ACTORS } from "../../actors";

export const mutualAuthComplete: Step = {
  id: "mutual-auth-complete",
  glossary: lessonTerms("authentication", "authorization"),
  title: "Mutual Authentication — Where mTLS Fits",
  wireContext: {
    where: "Both peers have provided their certificate authentication evidence.",
    now: "The handshake completes and protected application traffic begins.",
    why: "The application can use the authenticated identities when applying its separate authorization rules.",
  },
  prose:
    "Once the server verifies the client's CertificateVerify signature, both sides " +
    "have cryptographically proven their identities and the handshake finishes " +
    "exactly as ordinary TLS does. From here, encrypted application data flows over " +
    "a channel where each end knows precisely who the other is. Enterprises use " +
    "mTLS for service-to-service calls, API gateways, and zero-trust networks. " +
    "Most importantly, looking ahead to the OAuth lessons later in this series: " +
    "mTLS lets an OAuth authorization server bind an access token to the client's " +
    "certificate (RFC 8705), so a stolen token is useless without the client's " +
    "private key. That idea — a token tied to a key — is exactly where the OAuth " +
    "lessons pick up the thread. Recap: ordinary TLS authenticates the server; " +
    "mTLS keeps that server authentication and adds client certificate authentication " +
    "before application data is accepted.",
  bullets: [
    "Both parties are now authenticated; the handshake completes like normal TLS",
    "Used for service-to-service auth, API gateways, and zero-trust networks",
    "Bridge to OAuth: mTLS can bind an access token to the client cert (RFC 8705)",
  ],
  takeaway: "mTLS gives the server a cryptographic client identity that higher-level authorization can use, but certificate lifecycle becomes operationally important.",
  sequence: {
    actors: MTLS_ACTORS,
    progress: {
      goal: "Authenticate both sides of the TLS connection",
      already: ["Client Certificate", "CertificateVerify", "Finished"],
      now: "Both sides exchange encrypted application data",
      next: "Use certificate-bound identity in systems such as OAuth",
    },
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
      type: "key-idea",
      requirementId: "mTLS recap",
      title: "What mTLS adds",
      body: "mTLS is not a separate transport protocol. It is TLS with client certificate authentication added, so both sides prove possession of private keys tied to trusted certificates.",
    },
    {
      requirementId: "Versions",
      title: "mTLS still requires TLS ≥ 1.2",
      body: "Mutual TLS is regular TLS with client authentication added; the transport still negotiates TLS 1.2 or higher.",
    },
  ],
};
