import type { Step } from "../../../types";
import { OAUTH_ACTORS_WITH_USER } from "../../actors";

export const stateAndRedirectUri: Step = {
  id: "state-and-redirect-uri",
  title: "Making Sure the Reply Is Really for You",
  prose:
    "<p>You leave for the booth and come back a minute later. That round trip — the Authorization Code flow's redirect out and back — opens two ways for an attacker to slip in.</p>" +
    "<p>Before you leave, the app hands you a claim-check number: the <strong>state</strong> parameter, a random value it remembers. When the booth sends you back, the app checks the returned state matches the one it handed out. If it doesn't, this isn't a reply to your visit — it's discarded. That's what stops an attacker from tricking you into finishing their trip to the booth instead of yours (CSRF).</p>" +
    "<p>The booth also only ever mails your voucher back to an address you registered with it in advance: the <strong>redirect_uri</strong>. It has to match exactly — not \"close enough\" — or the booth refuses to send anything there. Otherwise an attacker could register a lookalike address and have your voucher — the authorization code — delivered straight to them.</p>" +
    "<p>Both checks are boring, mandatory plumbing — and both are exactly the kind of check that's catastrophic to skip.</p>",
  bullets: [
    "state: a random value the app generates before redirecting, and verifies matches on return — stops CSRF",
    "redirect_uri: must match a pre-registered value exactly — stops the voucher (authorization code) being delivered somewhere else",
    "Skipping either turns 'send the user to log in' into an open-redirect / hijack vector",
    "state and PKCE solve different problems: PKCE binds the code to the client that requested it, state binds the response to the request that triggered it",
  ],
  sequence: {
    actors: OAUTH_ACTORS_WITH_USER,
    messages: [
      { from: "client", to: "client", label: "Generate state; remember it" },
      { from: "client", to: "as", label: "Authorization request + state + redirect_uri" },
      { from: "client", to: "user", label: "Send you to the booth to log in and consent" },
      { from: "user", to: "as", label: "Log in, review, and consent" },
      { from: "as", to: "client", label: "Redirect back with voucher (code) + state" },
      { from: "client", to: "client", label: "Check state matches — reject if not", highlight: true },
    ],
  },
};
