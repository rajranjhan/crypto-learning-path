import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const fapiMtls: Step = {
  id: "fapi-mtls",
  title: "Locking a Ticket to One Person — Certificate Binding (FAPI)",
  prose:
    "This is the wristband from a moment ago, made real. The Financial-grade API " +
    "(FAPI) profiles asked OAuth for tokens that can't be used by whoever steals " +
    "them — 'sender-constrained' tokens. The first standard answer is RFC 8705: " +
    "OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access " +
    "Tokens. The client authenticates to the authorization server using mTLS — " +
    "the client certificate from the Mutual TLS lesson is the wristband — and the " +
    "authorization server binds the issued access token to that certificate by " +
    "recording a thumbprint of it, the same way the carnival recorded your " +
    "wristband's number on the ticket. When the client later calls the API, it " +
    "uses the same client certificate on the TLS connection; the resource server " +
    "checks that the certificate thumbprint matches the one bound to the token " +
    "— the same wristband check at the gate. A stolen token is now worthless " +
    "without the client's private key. It works well, but requires mTLS " +
    "everywhere — which, as the reference notes, 'is hard' to deploy.",
  bullets: [
    "FAPI wanted tokens bound to the client — 'sender-constrained' tokens",
    "RFC 8705: authenticate to the AS with mTLS; bind the token to the client cert thumbprint",
    "The API accepts the token only over a TLS connection using the matching client cert",
    "Strong, but requires mTLS infrastructure end-to-end — operationally heavy",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "as", label: "Token request over mTLS (client cert)", highlight: true },
      { from: "as", to: "client", label: "access_token bound to cert thumbprint", note: "certificate-bound", highlight: true },
      { from: "client", to: "rs", label: "API call over mTLS with same client cert" },
      { from: "rs", to: "client", label: "Verifies cert thumbprint matches token → OK" },
    ],
  },
};
