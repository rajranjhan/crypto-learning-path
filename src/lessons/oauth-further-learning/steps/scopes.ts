import type { Step } from "../../../types";

export const scopes: Step = {
  id: "scopes",
  title: "What the Ticket Actually Lets You Do — Scopes",
  prose:
    "<p>Look at a real ride ticket and it doesn't just say yes or no to the carnival — it says which rides. That's a <strong>scope</strong>: a named permission printed right on the ticket. rides:basic gets you on the carousel, rides:premium adds the roller coaster, food:discount adds a snack coupon. The app requests the scopes it needs, the user (or policy) approves some subset, and only those end up on the ticket.</p>" +
    "<p>This is what makes least-privilege possible: an app that only needs to read your profile should request profile:read, not profile:write or account:delete — even if the authorization server would technically allow it.</p>" +
    "<p>Scopes can also be requested incrementally: ask for the minimum up front, then request additional scopes later only when the user actually tries to use a feature that needs them, rather than front-loading every permission on day one.</p>",
  bullets: [
    "scope is a space-delimited list of permission strings requested at authorization time (e.g. \"openid profile rides:basic\")",
    "Granted scopes may be a subset of requested scopes — the user or policy can deny some",
    "The resource server checks the token's scopes before allowing an action, not just whether the token is valid",
    "Incremental authorization: request more scopes later, only when actually needed",
  ],
};
