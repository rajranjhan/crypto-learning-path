import type { Step } from "../../../types";

export const audienceRestriction: Step = {
  id: "audience-restriction",
  title: "Right Ticket, Wrong Gate — Audience Restriction",
  prose:
    "<p>A ticket stamped for the Ferris wheel is a perfectly valid, unexpired, correctly-signed ticket — and the roller coaster gate should still refuse it, because it wasn't issued for them.</p>" +
    "<p>That's what the <strong>aud</strong> (audience) claim controls: which API a token is meant for, which gate it's stamped for. It deserves its own step, because getting this check wrong is a real, recurring vulnerability.</p>" +
    "<p>Every resource server must check that its own identifier appears in the token's aud claim before trusting anything else about it. Skipping this check is how a token meant for one low-stakes API ends up being accepted by a completely different, more sensitive one — the token is \"valid,\" just not valid here.</p>" +
    "<p>This is sometimes called the confused deputy problem: a service does something on your behalf using authority it was never actually granted for that specific purpose.</p>",
  bullets: [
    "aud identifies which resource server(s) a token is valid for",
    "A resource server MUST reject tokens where its own identifier isn't in aud, even if the signature and expiry are otherwise fine",
    "Prevents a token issued for API A being replayed against API B",
    "Known as the \"confused deputy\" problem when this check is skipped",
  ],
};
