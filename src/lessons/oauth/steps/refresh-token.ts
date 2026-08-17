import type { Step } from "../../../types";

export const refreshToken: Step = {
  id: "refresh-token",
  title: "Getting a New Ticket Without Queuing Again — The Season Pass",
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
    "What does it actually let you do? (Authorization) — Bearer: whoever holds it can still trade it, which is why rotation swaps it on each use",
    "Does holding it prove it's yours? (Proof of Possession) — None by default: like the ride ticket, it can be bound (DPoP / mTLS) for more safety",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: unchanged; you got it from the booth alongside your first access token",
  ],
  diagram: `
    <img class="diagram-img" src="diagrams/refresh-token.png"
         alt="A carnival SEASON PASS labelled REFRESH (Pass No. 88-231, 'trade at booth for a ride ticket') with the same six token properties radiating out. Revocation is green — Supported: the booth keeps a record and can cancel the pass — while Issuer Trust Implicit, Redemption Model Renewable, Validity Window Long-lived, Authorization Bearer, and Proof of Possession None stay blue." />
    <p class="diagram-note">
      Same layout as the plain ride ticket two steps back, so you can compare them
      directly. The pass sits where the ride ticket sat, but its job is different:
      you <strong>trade it for ride tickets</strong> rather than ride with it. The
      one property that turns <span style="color:#047857">green</span> is
      <strong>Revocation</strong> — because the booth records every pass, it can
      cancel a lost one, something a plain bearer ticket could never offer.
    </p>
  `,
};
