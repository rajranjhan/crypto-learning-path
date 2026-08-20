import type { Step } from "../../../types";
import { KERBEROS_ACTORS, KERBEROS_MESSAGES, buildSequence } from "../../actors";

export const tgsExchange: Step = {
  id: "tgs-exchange",
  title: "Trading Your Badge for a Door Pass — the TGS Exchange",
  prose:
    "<p>With your Day Badge in hand, you never go back to the Check-In Window again — not for the rest of the shift, no matter how many doors you need. Instead, every time you need a specific door, you walk to the Backstage Desk. You hand over two things: your Day Badge, still sealed — you're just the courier, carrying something the Staff House sealed for itself — and a freshly written <strong>Authenticator</strong>: a new timestamp slip, this one sealed with the shift code word from check-in. That's your proof you're the person who checked in this morning, right now, and not someone who found your badge sitting in a locker.</p>" +
    "<p>The Backstage Desk works for the same Staff House as the Check-In Window, so it holds the same master seal. It unseals your Day Badge, reads your name and the shift code word inside, then uses that code word to unseal your Authenticator and checks the timestamp is fresh. Satisfied on both counts — genuine badge, genuine right-now proof — it mints a fresh <strong>Door Pass</strong> for that specific door. This one is sealed with a secret only the Staff House and that door share, set up long before you ever asked. Inside: your name and a brand-new <strong>door code word</strong>, good only at that door.</p>" +
    "<p>It hands you the pass, plus a copy of that new door code word — sealed with your shift code word, not your password. That's the whole point of the badge: your password was spent once, at sunrise, and everything after runs on the code word it bought you.</p>",
  bullets: [
    "TGS-REQ — Day Badge (still sealed) + a fresh Authenticator (timestamp sealed with the shift code word)",
    "The Backstage Desk shares the Staff House's master seal, so it can unseal the Day Badge itself, without asking the Check-In Window anything",
    "TGS-REP — a Door Pass sealed with that specific door's own secret, plus a new door code word sealed with your shift code word",
    "One shift code word, many door passes — repeat this exchange for every door, all day, without touching your password again",
  ],
  sequence: buildSequence(KERBEROS_ACTORS, KERBEROS_MESSAGES, 4, 2),
};
