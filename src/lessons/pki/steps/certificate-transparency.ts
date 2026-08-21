import type { Step } from "../../../types";

export const certificateTransparency: Step = {
  id: "certificate-transparency",
  title: "Watching the Watchers — Certificate Transparency",
  prose:
    "<p>Every check covered so far assumes the CA itself behaves correctly. But a CA can make a mistake, get compromised, or — in the incident covered in the next step — get compromised badly enough to issue a fraudulent certificate for a domain it has no business certifying. Nothing in the chain-validation process a client runs would catch that on its own, since the fraudulent certificate would be signed by a perfectly legitimate, trusted CA.</p>" +
    "<p><strong>Certificate Transparency (CT)</strong> closes that gap by making CA behavior publicly auditable. Participating CAs submit every certificate they issue to public, append-only <strong>CT logs</strong> — cryptographically structured so that entries can't be quietly altered or removed after the fact. In exchange, the log returns a <strong>Signed Certificate Timestamp (SCT)</strong>, proof the certificate was logged, which the certificate (or the server) presents alongside it. Modern browsers require a valid SCT before they'll trust a certificate at all — one without it is treated the same as one that failed any other check.</p>" +
    "<p>The payoff: because every issued certificate is now public, a domain owner (or a service monitoring on their behalf) can watch the logs for any certificate issued for their own domain — including ones they never requested — and catch a fraudulent issuance quickly, rather than discovering it only after it's been actively exploited.</p>",
  bullets: [
    "CT logs are public, append-only, and cryptographically tamper-evident — a CA can't quietly remove an entry after the fact",
    "A Signed Certificate Timestamp (SCT) proves a certificate was logged — modern browsers require one before trusting a certificate",
    "This catches a scenario chain validation alone can't: a legitimate, trusted CA issuing a certificate it shouldn't have",
    "Domain owners can monitor CT logs for their own domain and catch fraudulent issuance quickly, rather than only after active exploitation",
  ],
};
