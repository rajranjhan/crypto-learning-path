import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const oauthVsOidc: Step = {
  id: "oauth-vs-oidc",
  title: "Two Different Questions — OAuth vs. OpenID Connect",
  prose:
    "<p>A ride ticket (the access token) gets you on rides — that's permission. A name badge, checked once at the front gate, tells staff who you actually are — that's authentication. Everything in this lesson so far has been pure OAuth, and OAuth only ever answers the ride-ticket question: what is this app allowed to do? It was never designed to answer who is this user.</p>" +
    "<p>That second question is what <strong>OpenID Connect (OIDC)</strong> adds: the name badge. An <strong>ID token</strong> is a JWT whose entire job is proving identity, delivered alongside the access token from the very same token endpoint. It carries claims like sub (a stable user identifier) and is meant to be read by the app itself, never sent to an API.</p>" +
    "<p>The giveaway that a flow is using OIDC is a scope that includes openid, plus an optional call to the /userinfo endpoint — using the access token — to fetch more profile details than fit in the ID token.</p>",
  bullets: [
    "OAuth answers \"what can this app do\" (authorization) — that's the access token",
    "OIDC answers \"who is this user\" (authentication) — that's the ID token",
    "Request OIDC by including the \"openid\" scope in the authorization request",
    "ID tokens are for the app to read (prove identity); access tokens are for the API to check (grant permission) — never swap their jobs",
    "/userinfo endpoint: call it with the access token to fetch additional profile claims",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "as", label: "Authorization request: scope=openid profile rides:basic" },
      { from: "as", to: "client", label: "ID token (who you are) + access_token (what you can do)", highlight: true },
      { from: "client", to: "client", label: "App reads the ID token locally — never sent to an API" },
      { from: "client", to: "rs", label: "API call with access_token only" },
    ],
  },
};
