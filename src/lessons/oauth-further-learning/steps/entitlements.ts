import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const entitlements: Step = {
  id: "entitlements",
  title: "The Ride Staff's Last Check — Entitlements",
  prose:
    "<p>The ride staff already confirmed your ticket is real and stamped for this gate. Now they check something else entirely: does it actually cover this specific ride? Does the scope include rides:premium? Are you tall enough — a business rule the token was never meant to carry?</p>" +
    "<p>That's an <strong>entitlement</strong> check, and it happens after token validation succeeds, not instead of it. Every step in this lesson has been about getting a trustworthy token into the resource server's hands: signed, unexpired, bound to the right client, stamped for the right audience. None of that answers a separate question: should this specific request actually be allowed?</p>" +
    "<p>In practice this is usually a role- or attribute-based access control (RBAC/ABAC) decision at the resource server: take the token's scopes and claims, combine them with whatever local policy applies (a user's role, a resource's owner, a tenant boundary), and produce a plain allow or deny for this one request.</p>" +
    "<p>It's worth keeping the two failure modes distinct when something goes wrong: a <strong>401</strong> means the token itself isn't trustworthy — missing, expired, bad signature, wrong audience. A <strong>403</strong> means the token is perfectly valid — it's just not entitled to do this.</p>",
  bullets: [
    "Token validation (signature, expiry, aud) answers \"is this token trustworthy?\"",
    "Entitlement / authorization decisions answer \"is this specific request allowed?\" — a separate step",
    "Usually implemented as RBAC (roles) or ABAC (attributes/policy) at the resource server",
    "401 = the token itself is the problem; 403 = the token is valid but doesn't entitle this action",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "rs", label: "API call: valid token, scope=rides:basic" },
      { from: "rs", to: "rs", label: "Token valid — now check entitlement for this request" },
      { from: "rs", to: "client", label: "403 — valid token, but rides:premium required", highlight: true },
    ],
  },
};
