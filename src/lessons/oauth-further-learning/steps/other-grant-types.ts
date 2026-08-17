import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const otherGrantTypes: Step = {
  id: "other-grant-types",
  title: "Not Every Ticket Sale Involves a Person — Other Grant Types",
  prose:
    "<p>Picture the delivery truck that restocks the snack stands overnight. It doesn't buy a ride ticket — the carnival's own backend systems authenticate directly to each other with their own credentials and get a token scoped to \"restock the snack stand,\" with no user, no redirect, no consent screen involved at all. That's the <strong>Client Credentials</strong> grant: OAuth's answer for the case every other flow in this lesson has skipped — nobody standing at the booth, because no person is involved at all.</p>" +
    "<p>You'll also hear about two older grants that are now discouraged: the <strong>Implicit</strong> grant, which returned access tokens straight in the redirect URL fragment (easy to leak, no PKCE-equivalent protection), and the <strong>Resource Owner Password Credentials</strong> grant, which had the user hand their actual username and password straight to the app — exactly what OAuth exists to avoid.</p>" +
    "<p>Modern guidance (OAuth 2.1) drops both in favor of Authorization Code + PKCE for anything involving a user, and Client Credentials for anything that doesn't.</p>",
  bullets: [
    "Client Credentials: client authenticates as itself, no user involved — for service-to-service calls",
    "Implicit grant (deprecated): tokens returned directly in the redirect, no code exchange — avoid",
    "Resource Owner Password Credentials (deprecated): app collects the user's actual password — avoid",
    "Modern guidance (OAuth 2.1): Authorization Code + PKCE for user-facing apps, Client Credentials for machine-to-machine",
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
