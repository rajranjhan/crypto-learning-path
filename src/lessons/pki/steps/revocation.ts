import type { Step } from "../../../types";
import { PKI_ACTORS } from "../../actors";

export const revocation: Step = {
  id: "revocation",
  title: "Taking a Certificate Back Before It Expires",
  prose:
    "<p>A certificate's Not After date isn't the only way it can stop being trustworthy — the private key behind it might leak, or the domain might change hands, long before that date arrives. <strong>Revocation</strong> is how a CA takes a certificate back early, and there are three real approaches, with a clear trend in which one's winning.</p>" +
    "<p>A <strong>CRL (Certificate Revocation List)</strong> is a CA-signed list of every revoked serial number, published periodically. A client downloads the whole list and checks whether the certificate it's validating appears on it — simple, but the list only grows, and downloading it for every connection doesn't scale. <strong>OCSP (Online Certificate Status Protocol)</strong> fixes the scaling problem by letting a client ask the CA about one specific certificate in real time, but that adds a live round trip to every connection, slows things down, and tells the CA exactly which sites you're visiting and when.</p>" +
    "<p><strong>OCSP stapling</strong> flips who does the asking: the server itself periodically fetches its own signed OCSP response from the CA ahead of time, then \"staples\" that pre-fetched proof directly into the TLS handshake it sends the client. The client gets the same freshness guarantee with no separate round trip and no privacy leak to the CA. The broader trend goes even further: <strong>short-lived certificates</strong> (Let's Encrypt popularized ~90-day certificates, with some CAs now issuing certificates valid for just days) sidestep revocation almost entirely — if something's wrong, the certificate simply expires soon anyway, on its own.</p>",
  bullets: [
    "CRL: a CA-signed list of revoked serial numbers, downloaded in full — simple, but doesn't scale well",
    "OCSP: a real-time, per-certificate check against the CA — scales better, but adds a round trip and leaks browsing activity to the CA",
    "OCSP stapling: the server pre-fetches its own signed OCSP response and includes it in the handshake — same freshness, no extra round trip, no privacy leak",
    "Short-lived certificates (days to ~90 days) sidestep revocation almost entirely — a compromised cert simply expires soon regardless",
  ],
  sequence: {
    actors: PKI_ACTORS,
    messages: [
      { from: "server", to: "ca", label: "Periodically: fetch a signed OCSP response for my own certificate", note: "happens ahead of time, not during a client's connection" },
      { from: "server", to: "client", label: "Certificate + stapled OCSP response", note: "the pre-fetched proof rides along in the handshake itself", highlight: true },
      { from: "client", to: "client", label: "Verify the stapled response is signed by the CA and still fresh", note: "no separate round trip to the CA, and the CA never learns the client visited this site", highlight: true },
    ],
  },
};
