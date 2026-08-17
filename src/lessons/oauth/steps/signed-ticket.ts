import type { Step } from "../../../types";

export const signedTicket: Step = {
  id: "signed-ticket",
  title: "The Same Ticket, Now Signed by Hand",
  prose:
    "Take the carnival ride ticket from earlier and change one thing: when you buy " +
    "it, you sign your name across it in your own handwriting, and at the gate the " +
    "attendant makes you sign again and checks the two signatures match. That single " +
    "habit is exactly what DPoP does for a token. The ticket is still the same paper " +
    "stub, but it is no longer a plain bearer token — holding it is no longer enough, " +
    "because whoever redeems it has to reproduce the signature. Run it through the " +
    "same six properties and you'll see three of them flip from weak to strong; the " +
    "next steps show how the real DPoP proof and key binding make this concrete.",
  bullets: [
    "What does it actually let you do? (Authorization) — Sender-constrained: holding the ticket isn't enough; only the matching hand rides (DPoP proof)",
    "Does holding it prove it's yours? (Proof of Possession) — Enforced: you sign at purchase and again at the gate; the two must match (public key ↔ fresh signature)",
    "How long does it work? (Validity Window) — Per ride: each fresh signature is good for this one gate, right now; old ones expire (htm/htu + iat)",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: unchanged; you still buy it at the booth",
    "One use, or reusable? (Redemption Model) — Scoped: unchanged; still one ticket, one ride",
    "Can it be cancelled early? (Revocation) — Still limited: no kill switch, but a stolen ticket is useless without your hand",
  ],
  diagram: `
    <img class="diagram-img" src="diagrams/signed-ticket.png"
         alt="The same carnival RIDE ticket (No. 5606, stub 02) as before, but now signed 'Sam Rivera' in red handwriting at purchase. The six token properties radiate out; three are now green — Authorization Sender-constrained, Proof of Possession Enforced, Validity Window Per ride — while Issuer Trust, Redemption Model, and Revocation are unchanged in blue." />
    <p class="diagram-note">
      Compare this to the plain ride ticket two steps back: the hub and layout are
      identical, but the buyer's <strong>handwritten signature</strong> turns three
      <em>None</em>/weak answers <span style="color:#047857">green</span>. That
      signature is the DPoP proof — a fresh, per-request signature only the real
      key-holder can produce. Revocation stays limited, which is why short-lived
      tokens still matter.
    </p>
  `,
};
