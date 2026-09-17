import type { Step } from "../../../types";

export const wristbandTicket: Step = {
  id: "wristband-ticket",
  title: "mTLS-Bound Tokens — Wristband Model",
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
    "What does it actually let you do? (Authorization) — The token's permissions decide which rides; certificate binding constrains the presenter",
    "Must the presenter prove control of a bound key? (Proof of Possession) — Enforced: TLS proves private-key possession and the API checks the token binding to that certificate",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Verified: the band comes from the carnival's official station, a real chain of trust (the certificate authority)",
    "One use, or reusable? (Redemption Model) — Single-use in this metaphor: unchanged; still one ticket, one ride",
    "How long does it work? (Validity Window) — Session-long: the band works all day while you wear it; there's no fresh per-ride proof like the signature",
    "Can it be cancelled early? (Revocation) — Still limited: no easy kill switch for one lost band; the station can only refuse a known-bad one",
  ],
  takeaway: "Can it be cancelled early? (Revocation) — Still limited: no easy kill switch for one lost band; the station can only refuse a known-bad one.",
  figure: {
    body: `
    <div class="flow"><div class="node equal client"><div class="node-title">Authorization: granted API permissions</div></div><div class="node equal server"><div class="node-title">Presentation: token plus TLS proof of the bound certificate key</div></div></div>
    <p class="diagram-note">A certificate is public; TLS proves possession of its private key.</p>
  `,
  },
};
