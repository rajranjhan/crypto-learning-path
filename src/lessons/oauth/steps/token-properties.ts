import type { Step } from "../../../types";

export const tokenProperties: Step = {
  id: "token-properties",
  title: "Why OAuth Exists — Delegated Authorization",
  prose:
    "<p>OAuth exists because users should not have to give an app their password just so that app can call an API. Instead, the user authorizes limited access, the authorization server issues a token, and the app presents that token to the API.</p>" +
    "<p>That makes OAuth an <strong>authorization framework</strong>: it answers \"what may this client do?\" It is not, by itself, an authentication protocol that proves \"who is this user?\" OpenID Connect adds that identity layer with ID tokens and standard user claims.</p>" +
    "<p>Before OAuth flows and JWTs, it helps to ask what a token is. A token is not defined by what it looks like — random string, signed JWT, opaque handle — but by how it behaves. Six properties capture that behavior, and every token design is a different set of answers to these questions.</p>",
  bullets: [
    "OAuth is for delegated authorization: limited API access without sharing passwords",
    "OpenID Connect adds authentication and identity on top of OAuth",
    "Where'd it come from, and why do you believe that? (Issuer Trust)",
    "What does it actually let you do? (Authorization)",
    "One use, or reusable? (Redemption Model)",
    "Does holding it prove it's yours? (Proof of Possession)",
    "How long does it work? (Validity Window)",
    "Can it be cancelled early? (Revocation)",
  ],
  diagram: `
    <img class="diagram-img" src="diagrams/token-properties.png"
         alt="A central TOKEN with six properties radiating out: Issuer Trust, Authorization, Redemption Model, Proof of Possession, Validity Window, and Revocation." />
    <p class="diagram-note">
      These six properties are the lens for the whole lesson. As we move from
      bearer tokens to certificate-bound tokens to DPoP, watch how each design
      answers <em>Proof of Possession</em> and <em>Revocation</em> differently —
      that's where most of the security difference lives.
    </p>
  `,
};
