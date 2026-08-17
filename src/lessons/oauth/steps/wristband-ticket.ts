import type { Step } from "../../../types";

export const wristbandTicket: Step = {
  id: "wristband-ticket",
  title: "The Same Ticket, Now Tied to a Wristband",
  prose:
    "Take the same carnival ride ticket, but this time an official station clamps " +
    "a wristband on you when you buy it and prints the band's number onto the " +
    "ticket. At the gate the attendant checks that the band on your wrist matches " +
    "the number on the stub. You didn't make the band yourself — the carnival " +
    "issued it — and that's the key difference from signing by hand: the proof is " +
    "a credential you carry, tied to the ticket, checked when you physically show " +
    "up. This is the other way to stop a stolen ticket, and it's the one the " +
    "Financial-grade API (FAPI) profiles reached for first: certificate-bound " +
    "tokens work the same way. The token is locked to the client certificate you " +
    "already carry (the one from the mTLS lesson). Run it through the same six " +
    "properties and the same three flip from weak to strong — just by a different " +
    "mechanism than the handwritten signature.",
  bullets: [
    "What does it actually let you do? (Authorization) — Sender-constrained: only the wrist wearing the matching band rides; the ticket alone won't do (token bound to the client cert)",
    "Does holding it prove it's yours? (Proof of Possession) — Enforced: the gate checks your wristband against the ticket and the two must match (cert thumbprint on the token)",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Verified: the band comes from the carnival's official station, a real chain of trust (the certificate authority)",
    "One use, or reusable? (Redemption Model) — Scoped: unchanged; still one ticket, one ride",
    "How long does it work? (Validity Window) — Session-long: the band works all day while you wear it; there's no fresh per-ride proof like the signature",
    "Can it be cancelled early? (Revocation) — Still limited: no easy kill switch for one lost band; the station can only refuse a known-bad one",
  ],
  diagram: `
    <img class="diagram-img" src="/diagrams/wristband-ticket.png"
         alt="The same carnival RIDE ticket (No. 5606, stub 02) as before, but now locked to a wristband (BAND A7-5606) issued at purchase. The six token properties radiate out; three are now green — Issuer Trust Verified, Authorization Sender-constrained, Proof of Possession Enforced — while Redemption Model, Validity Window, and Revocation are unchanged in blue." />
    <p class="diagram-note">
      This is the FAPI / mTLS answer, the sibling of the signed ticket coming up
      next. Instead of a signature you make yourself, the carnival
      <strong>issues you a wristband</strong> and ties the ticket to it — a
      credential you carry, checked at the gate. Three
      <em>None</em>/weak answers turn <span style="color:#047857">green</span>,
      including <strong>Issuer Trust</strong>, because the band comes from a
      trusted station. The Validity Window stays session-long — the band works all
      day — which is the main way this differs from DPoP's per-ride signature.
    </p>
  `,
};
