import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";
import { KERBEROS_ACTORS, KERBEROS_MESSAGES, buildSequence } from "../../actors";

export const asExchange: Step = {
  id: "as-exchange",
  glossary: lessonTerms("session key", "authentication"),
  title: "AS Exchange — Initial Login",
  wireContext: {
    where: "The client has a long-term credential but no ticket-granting ticket.",
    now: "The AS exchange obtains a TGT and a client–TGS session key.",
    why: "The client can later request service tickets without sending its password to each service.",
  },
  prose:
    "<p>You arrive at the Staff House once each morning and walk up to the Check-In Window. Here's the part that matters most: you never say your password out loud, and it never crosses the wire — not even in disguise. Instead, you write the current time on a slip of paper and seal it with a key derived from your password. That's the whole proof: only someone who knows the password could have sealed that slip. This is <strong>pre-authentication</strong>, but a captured password-based encrypted timestamp can still support offline guessing; pre-authentication is not a guarantee against weak passwords.</p>" +
    "<p>The Check-In Window has its own copy of that same password-derived key, so it unseals your slip and checks the timestamp is fresh. Satisfied, it doesn't hand your password back to you — it never had it in the clear to begin with. Instead it mints two things and seals them separately. First, a <strong>Day Badge</strong> — Kerberos calls it the <strong>Ticket Granting Ticket</strong>, or TGT — sealed with the Staff House's own <strong>master seal</strong>, a secret only the Staff House itself holds (Kerberos calls this the <code>krbtgt</code> key). You can't open your own Day Badge; it isn't sealed for you, it's sealed for the Staff House to read later. Inside it: your name, a freshly minted <strong>shift code word</strong> (the session key), and an expiry — good for your whole shift, typically around ten hours.</p>" +
    "<p>Second, that same shift code word again — but this copy is sealed with your own password-derived key, so you <em>can</em> open it. Now you and the Staff House share a secret for the rest of the day, without your password ever having traveled anywhere. You carry both away from the window: a badge you can't read, and a code word you can.</p>",
  bullets: [
    "AS-REQ — you send a timestamp sealed with a key derived from your password (pre-authentication); the password itself never crosses the wire",
    "AS-REP — the Check-In Window replies with two sealed items: a Day Badge and a shift code word",
    "Day Badge (TGT) — sealed with the Staff House's own master seal (krbtgt key); you carry it but can't open it",
    "Shift code word (session key) — sent to you twice: once inside the badge (for the Staff House to read later), once sealed with your own key (for you to read now)",
    "Expiry — the Day Badge is valid only for your shift, typically ~10 hours, not forever",
  ],
  takeaway: "The AS exchange turns a password-based login into a time-limited ticket-granting ticket, so the password is not reused for every service.",
  sequence: buildSequence(KERBEROS_ACTORS, KERBEROS_MESSAGES, 2, 2),
};
