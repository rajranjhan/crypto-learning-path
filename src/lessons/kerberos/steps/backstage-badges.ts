import type { Step } from "../../../types";

export const backstageBadges: Step = {
  id: "backstage-badges",
  title: "Backstage at the Carnival — Employee Badges, Not Guest Tickets",
  prose:
    "<p>You've already seen how the carnival hands a <strong>guest</strong> a ride ticket: they walk up, prove who they are, and walk away with something they can show at one gate. Kerberos solves a different problem — the one behind the scenes. The carnival's own <strong>staff</strong> — ride mechanics, payroll clerks, costume handlers — need to move between dozens of backstage doors all day: the rides control room, the payroll office, the costume vault. Nobody wants to retype their password at every single door, and the carnival really doesn't want that password crossing the wire that many times either.</p>" +
    "<p>Kerberos, invented at MIT in 1988 for a campus network, solves exactly that. It's named for Cerberus, the three-headed dog guarding the gates of the underworld — fitting, since almost every exchange in this protocol involves three parties: you, a trusted central authority, and the door you're trying to get through. Everyone who works this <strong>realm</strong> (Kerberos's word for one trusted domain — think of it as the carnival's own staff directory, <code>CARNIVAL.LOCAL</code>) already shares a secret with a central office before the day even starts: your password, or a key derived from it.</p>" +
    "<p>That central office is the <strong>Staff House</strong> — Kerberos calls it the <strong>KDC</strong>, the Key Distribution Center. It's one building, but it has two windows that do different jobs: the <strong>Check-In Window</strong> (the <strong>Authentication Server</strong>, or AS) is where you prove who you are, once, each morning. The <strong>Backstage Desk</strong> (the <strong>Ticket Granting Server</strong>, or TGS) is where you trade that morning check-in for a pass to any specific door, as many times as you need, without going back to the Check-In Window again. Each door — each backstage <strong>service</strong> — has already registered its own secret with the Staff House ahead of time, the way a locksmith might set up a master key system once, long before anyone needs to walk through a door.</p>",
  bullets: [
    "Realm — one trusted domain of staff and doors that all share secrets with the same Staff House (e.g. CARNIVAL.LOCAL)",
    "Principal — anyone (or anything) with an identity in the realm: you, a service, a door",
    "KDC (Key Distribution Center) — the Staff House: one building holding everyone's secrets",
    "AS (Authentication Server) — the Check-In Window: verifies who you are, once per day",
    "TGS (Ticket Granting Server) — the Backstage Desk: trades your morning check-in for a pass to a specific door, as many times as you need",
    "Service — a backstage door, already sharing its own secret with the Staff House",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">You</div>
        <div class="node-sub">carnival staff 🧑, hold a password only you and the Staff House know</div>
      </div>
      <div class="link">
        <div class="lock">🪪</div>
        <div class="link-label">check in once, each morning</div>
        <div class="arrow">→</div>
      </div>
      <div class="node" style="border-color: var(--accent); box-shadow: 0 0 0 2px rgba(37,99,235,0.15);">
        <div class="node-title">Staff House (KDC)</div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <div class="node" style="flex: 1; min-width: 0; padding: 8px;">
            <div class="node-title" style="font-size: 12px;">Check-In Window</div>
            <div class="node-sub">Authentication Server (AS)</div>
          </div>
          <div class="node" style="flex: 1; min-width: 0; padding: 8px;">
            <div class="node-title" style="font-size: 12px;">Backstage Desk</div>
            <div class="node-sub">Ticket Granting Server (TGS)</div>
          </div>
        </div>
      </div>
      <div class="link">
        <div class="lock">🎟️</div>
        <div class="link-label">a fresh pass per door, no password retyped</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Backstage Doors</div>
        <div class="node-sub">Rides Control · Payroll · Costume Vault — each already shares its own secret with the Staff House</div>
      </div>
    </div>
    <p class="diagram-note">
      One check-in, many doors. The next three steps walk this diagram left to
      right: first you badge in at the Check-In Window, then you trade that
      badge for a door-specific pass at the Backstage Desk, then you show that
      pass at the actual door — which never has to call the Staff House to let
      you in.
    </p>
  `,
};
