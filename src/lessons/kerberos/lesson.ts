import type { Lesson } from "../../types";
import { backstageBadges } from "./steps/backstage-badges";
import { asExchange } from "./steps/as-exchange";
import { tgsExchange } from "./steps/tgs-exchange";
import { apExchange } from "./steps/ap-exchange";
import { replayProtection } from "./steps/replay-protection";
import { goldenSilverTicket } from "./steps/golden-silver-ticket";
import { kerberosVsOauth } from "./steps/kerberos-vs-oauth";

export const kerberosLesson: Lesson = {
  slug: "kerberos",
  title: "Kerberos: Proving Who You Are with Tickets",
  status: "available",
  overview:
    "Kerberos is how staff on a trusted internal network — a Windows domain, a " +
    "university campus — prove who they are to dozens of internal systems without " +
    "retyping a password at every one of them, and without that password ever " +
    "crossing the wire. This lesson sets its metaphor in the same carnival the " +
    "OAuth lessons use later in this series, but from the other side of the gate: " +
    "instead of a guest buying a ride ticket at the front gate, you're staff " +
    "badging through backstage doors. One check-in " +
    "each morning at the Staff House, then a fresh door-specific pass for every " +
    "backstage door you need, all day, without ever going back to say your " +
    "password again. Follow the same three lifelines — you, the Staff House's two " +
    "windows, and a door — as they build up the full exchange step by step.",
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">You</div>
        <div class="node-sub">carnival staff 🧑</div>
      </div>
      <div class="link">
        <div class="lock">🪪</div>
        <div class="link-label">check in once</div>
        <div class="arrow">→</div>
      </div>
      <div class="node" style="border-color: var(--accent); box-shadow: 0 0 0 2px rgba(37,99,235,0.15);">
        <div class="node-title">Staff House (KDC)</div>
        <div class="node-sub">Check-In Window + Backstage Desk</div>
      </div>
      <div class="link">
        <div class="lock">🎟️</div>
        <div class="link-label">door pass, per door</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Backstage Door</div>
        <div class="node-sub">checks the pass itself — no call home</div>
      </div>
    </div>
    <p class="diagram-note">
      Three exchanges, three lifelines: AS (checking in), TGS (trading the
      badge for a door pass), and AP (showing the pass at the door). Each step
      below builds this same diagram one exchange at a time.
    </p>
  `,
  steps: [backstageBadges, asExchange, tgsExchange, apExchange, replayProtection, goldenSilverTicket, kerberosVsOauth],
};
