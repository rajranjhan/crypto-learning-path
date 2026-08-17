import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const clientCredentials: Step = {
  id: "client-credentials",
  title: "Not Every Ticket Sale Involves a Person — Client Credentials",
  prose:
    "<p>Picture the delivery truck that restocks the snack stands overnight. It doesn't buy a ride ticket — the carnival's own backend systems authenticate directly to each other with their own credentials and get a token scoped to \"restock the snack stand,\" with no user, no redirect, no consent screen involved at all. That's the <strong>Client Credentials</strong> grant: OAuth's answer for the case every other flow in this lesson has skipped — nobody standing at the booth, because no person is involved at all.</p>" +
    "<p>Because there's no user in the loop to notice if something's off, it's worth locking a Client Credentials token down deliberately rather than trusting the grant type alone to keep it safe.</p>" +
    "<p>Two older grants used to cover the cases Client Credentials and Authorization Code + PKCE handle today — Implicit and Resource Owner Password Credentials. Both are now retired, and it's worth knowing why: that's covered at the end of this lesson.</p>",
  bullets: [
    "Client Credentials: client authenticates as itself, no user involved — for service-to-service calls",
    "Scope tightly — request and grant only the minimum scopes needed (least privilege, from the Scopes step in Further Learning). Don't issue a token with broad access \"just in case\"",
    "Use audience restriction (the aud claim, from Further Learning) so a token issued for one service can't be replayed against a different one",
    "Consider sender-constrained tokens — DPoP or mTLS-bound, from the Fundamentals lesson — so a stolen access token can't be used from a different client or machine",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "as", label: "Client credentials + requested scope (no user, no redirect)", highlight: true },
      { from: "as", to: "client", label: "access_token (scoped to the service)" },
      { from: "client", to: "rs", label: "API call with access_token" },
    ],
  },
};
