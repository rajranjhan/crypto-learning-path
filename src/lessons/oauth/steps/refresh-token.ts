import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const refreshToken: Step = {
  id: "refresh-token",
  glossary: lessonTerms("refresh token"),
  title: "Refresh Tokens — Long-Lived Delegation",
  prose:
    "The access token you just got is deliberately short-lived — like a ride " +
    "ticket that's only good for this visit. So how do you keep riding without " +
    "sending the user back to the booth every few minutes? That's the refresh token, " +
    "and it behaves like a season pass. You never ride with it; instead you take it " +
    "back to the booth (the authorization server) and trade it for a fresh ride " +
    "ticket whenever the old one expires. Run the season pass through the same six " +
    "properties and one of them finally turns strong: because the booth keeps a " +
    "record of every pass it issued, it can cancel yours — the first real " +
    "revocation we've seen. In return the pass is long-lived and valuable, so it's " +
    "kept in the back-channel, never sent to the ride, and often rotated (swapped " +
    "for a new one) on every use so a stolen pass is quickly outdated.",
  bullets: [
    "One use, or reusable? (Redemption Model) — Renewable: you don't ride with it; you trade it at the booth for a fresh access token, again and again",
    "Can it be cancelled early? (Revocation) — Supported: the booth keeps a record and can cancel your pass anytime — the big upgrade over a plain ride ticket",
    "How long does it work? (Validity Window) — Long-lived: lasts days or weeks, far longer than the short-lived access token",
    "What does it actually let you do? (Authorization) — Permits requesting new access tokens within the existing grant; client authentication or key binding may also be required",
    "Must the presenter prove control of a bound key? (Proof of Possession) — None by default: like the ride ticket, it can be bound (DPoP / mTLS) for more safety",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: unchanged; you got it from the booth alongside your first access token",
  ],
  takeaway: "Refresh tokens reduce repeated sign-in, but they become high-value credentials that need stronger protection than short-lived access tokens.",
  figure: {
    body: `
    <div class="flow"><div class="node equal client"><div class="node-title">Authorization server: accepts refresh token</div></div><div class="node equal server"><div class="node-title">Resource server: accepts access token</div></div></div>
    <p class="diagram-note">A refresh token requests new access tokens within the existing grant.</p>
  `,
  },
};
