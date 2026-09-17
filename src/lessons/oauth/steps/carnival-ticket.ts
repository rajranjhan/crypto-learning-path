import type { Step } from "../../../types";
import { oauthActorMappingFigure } from "../../oauth-shared";

export const carnivalTicket: Step = {
  id: "carnival-ticket",
  title: "OAuth Actors — Resource Owner, Client, Servers",
  prose:
    "<p>Now map the OAuth actors onto the carnival. You are the <strong>Resource Owner</strong>: the person who can approve access. The app is the <strong>Client</strong>: it wants to act with limited permission. The ticket booth is the <strong>Authorization Server</strong>: it applies policy and issues tokens. The ride gate is the <strong>Resource Server</strong>: the API that accepts or rejects the token.</p>" +
    "<p>You've held a bearer token in real life: the ride ticket you buy at a carnival or festival. You pay at a booth, get a little paper stub, and later hand it over for a ride. Run it through the same six properties and you'll see it's a textbook bearer token — powerful because it's simple, but with almost none of the safety guarantees a real security token needs.</p>",
  bullets: [
    "Resource Owner — you, the guest who can approve access",
    "Client — the app asking for delegated access",
    "Authorization Server — the ticket booth that issues tokens",
    "Resource Server — the ride gate or API that validates tokens",
    "One use, or reusable? (Redemption Model) — Single-use in this metaphor: good for one item; one ticket, one ride",
    "What does it actually let you do? (Authorization) — Grants access to the specified ride; bearer describes how the token is presented",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: trust is based on proximity & context (you're at the booth)",
    "How long does it work? (Validity Window) — None: the ticket works for as long as it's accepted",
    "Can it be cancelled early? (Revocation) — None: no way to invalidate a lost/stolen ticket; the booth can only refuse service",
    "Must the presenter prove control of a bound key? (Proof of Possession) — None: no enforced relationship between the buyer and whoever redeems it",
  ],
  takeaway: "A plain bearer token is convenient because possession is enough, and risky for exactly the same reason.",
  figure: {
    body: `
    ${oauthActorMappingFigure.body}
    <div class="flow"><div class="node equal client"><div class="node-title">Authorization: access to a specified ride</div></div><div class="node equal server"><div class="node-title">Presentation: possession of the bearer token</div></div></div>
    <p class="diagram-note">Bearer describes presentation; scope describes access.</p>
  `,
  },
};
