import type { SequenceActor, Step } from "../../../types";

const OBO_ACTORS: SequenceActor[] = [
  { id: "user", label: "You", icon: "🧑" },
  { id: "kiosk", label: "Photo Kiosk", icon: "📸" },
  { id: "as", label: "Authorization Server (Ticket Booth)", icon: "🎫" },
  { id: "printshop", label: "Print Shop", icon: "🖨️" },
];

export const onBehalfOf: Step = {
  id: "on-behalf-of",
  title: "The Kiosk Needs Backup — Token Exchange & On-Behalf-Of",
  prose:
    "<p>The Photo Kiosk has your ticket — scoped to fetch your ride photo, stamped for the Photo Kiosk specifically. But it turns out the actual photo isn't stored at the kiosk at all. It's filed at the Print Shop, a completely separate counter across the grounds.</p>" +
    "<p>Here's the problem: the kiosk can't just hand your ticket to the Print Shop. Remember audience restriction, from Further Learning — the Print Shop checks that a ticket is actually stamped for it, and yours says Photo Kiosk. A copy-pasted ticket gets rejected on sight.</p>" +
    "<p>So the kiosk goes back to the booth itself and trades: \"I'm the Photo Kiosk. I'm holding a valid ticket for this guest. Give me a new one, stamped for the Print Shop, that still says it's for them — not for me.\" The booth issues a fresh ticket for the Print Shop that names the guest as who it's <em>for</em> and the kiosk as who's <em>acting</em>.</p>" +
    "<p>That's <strong>Token Exchange</strong> (RFC 8693) — a client swaps a token it holds for a new one with a different audience or narrower scope, without ever needing your credentials again. The new ticket carries an <strong>act</strong> claim recording who's actually acting: the guest is still the subject, but the Photo Kiosk is named as the actor. Chains can nest — a request that passed through three services on the way can show all three in order.</p>" +
    "<p>This is the mechanism behind \"on-behalf-of\": any time one service needs to call a second service while preserving who the original request was really for, this is how it's done — trading tokens forward, one hop at a time, instead of ever forwarding your original ticket somewhere it was never stamped for.</p>",
  bullets: [
    "Token Exchange (RFC 8693): a service trades a token it holds for a new one with a different audience or scope",
    "grant_type: urn:ietf:params:oauth:grant-type:token-exchange, with the held token as the subject_token",
    "act claim: names who's acting on the subject's behalf — the user stays the subject even as the token changes hands",
    "act claims can nest — a request relayed through multiple services can show the whole chain",
    "Solves the confused-deputy risk of one service just forwarding the original token somewhere it was never audience-restricted for",
  ],
  sequence: {
    actors: OBO_ACTORS,
    messages: [
      { from: "user", to: "kiosk", label: "Present ticket, request ride photo" },
      { from: "kiosk", to: "as", label: "Token Exchange: I hold this ticket for the guest — give me one for the Print Shop", highlight: true },
      { from: "as", to: "kiosk", label: "New ticket: audience = Print Shop, act = Photo Kiosk", highlight: true },
      { from: "kiosk", to: "printshop", label: "Present new ticket (audience: Print Shop, acting for guest)" },
      { from: "printshop", to: "kiosk", label: "Photo file" },
      { from: "kiosk", to: "user", label: "Here's your photo" },
    ],
  },
};
