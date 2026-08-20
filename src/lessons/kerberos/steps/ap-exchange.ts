import type { Step } from "../../../types";
import { KERBEROS_ACTORS, KERBEROS_MESSAGES, buildSequence } from "../../actors";

export const apExchange: Step = {
  id: "ap-exchange",
  title: "Showing Your Pass at the Door — the AP Exchange",
  prose:
    "<p>Now you actually walk up to the door. You show the Door Pass, plus one more Authenticator — a fresh timestamp, this time sealed with the door code word from the Backstage Desk. And here's the detail that makes Kerberos scale to a whole carnival's worth of doors: <strong>the door never calls the Staff House.</strong> It already has its own secret on file, set up once, long ago — so it unseals the Door Pass itself, right there, entirely offline from both the Check-In Window and the Backstage Desk. It reads the door code word inside, uses it to check your Authenticator's timestamp, and lets you through.</p>" +
    "<p>Compare that to a design where every door has to phone a central office on every single entry — that office becomes a bottleneck and a single point of failure the instant traffic picks up. Kerberos avoids it entirely: the trust was established once, when the door and the Staff House first shared a secret, and every access after that is a local, offline check.</p>" +
    "<p>One more step is optional but common: <strong>mutual authentication</strong>. If you ask for it, the door proves itself back to you — it takes the timestamp you just handed it, adds one second, and seals that with the same door code word. Only the real door, holding the real secret, could produce that reply. Get it, and you know you're not standing in front of an impostor door someone set up to harvest passes.</p>",
  bullets: [
    "AP-REQ — Door Pass + a fresh Authenticator (timestamp sealed with the door code word)",
    "The door unseals the pass with its own long-standing secret — no live call back to the Staff House, at check-in time or ever",
    "That's the scalability win: trust is set up once per door, then every entry is a local, offline check",
    "AP-REP (optional) — mutual authentication: the door echoes timestamp + 1, sealed with the door code word, proving it's genuine",
  ],
  sequence: buildSequence(KERBEROS_ACTORS, KERBEROS_MESSAGES, 6, 2),
};
