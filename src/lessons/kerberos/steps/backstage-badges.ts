import type { Step } from "../../../types";

export const backstageBadges: Step = {
  id: "backstage-badges",
  title: "Kerberos Roles — Backstage Badges",
  prose:
    "<p>Picture the carnival from a <strong>guest's</strong> side for a moment: they walk up to the front gate, prove who they are, and walk away with a ride ticket they can show at one gate — that's the world the OAuth lessons cover later in this series. Kerberos solves a different problem — the one behind the scenes. The carnival's own <strong>staff</strong> — ride mechanics, payroll clerks, costume handlers — need to move between dozens of backstage doors all day: the rides control room, the payroll office, the costume vault. Nobody wants to retype their password at every single door, and the carnival really doesn't want that password crossing the wire that many times either.</p>" +
    "<p>Kerberos, invented at MIT in 1988 for a campus network, solves exactly that. It's named for Cerberus, the three-headed dog guarding the gates of the underworld — fitting, since almost every exchange in this protocol involves three parties: the <strong>Client Principal</strong>, a trusted central authority, and the <strong>Service Server</strong> you're trying to reach. Everyone who works this <strong>realm</strong> (Kerberos's word for one trusted domain — think of it as the carnival's own staff directory, <code>CARNIVAL.LOCAL</code>) already shares a secret with a central office before the day even starts: your password, or a key derived from it.</p>" +
    "<p>That central office is the <strong>Staff House</strong> — Kerberos calls it the <strong>KDC</strong>, the Key Distribution Center. It's one building, but it has two windows that do different jobs: the <strong>Check-In Window</strong> (the <strong>Authentication Server</strong>, or AS) is where you prove who you are, once, each morning. The <strong>Backstage Desk</strong> (the <strong>Ticket Granting Server</strong>, or TGS) is where you trade that morning check-in for a pass to any specific door, as many times as you need, without going back to the Check-In Window again. Each door — each backstage <strong>service</strong> — has already registered its own secret with the Staff House ahead of time, the way a locksmith might set up a master key system once, long before anyone needs to walk through a door.</p>",
  bullets: [
    "Realm — one trusted domain of staff and doors that all share secrets with the same Staff House (e.g. CARNIVAL.LOCAL)",
    "Principal — anyone (or anything) with an identity in the realm: you, a service, a door",
    "KDC (Key Distribution Center) — the Staff House: one building holding everyone's secrets",
    "AS (Authentication Server) — the Check-In Window: verifies who you are, once per day",
    "TGS (Ticket Granting Server) — the Backstage Desk: trades your morning check-in for a pass to a specific door, as many times as you need",
    "TGT / Day Badge — a ticket sealed for the KDC, carried by you but readable by the Staff House",
    "Service ticket / Door Pass — a ticket sealed for one service, readable by that service",
    "Session key / Code word — the fresh symmetric key two parties use after each exchange",
    "Authenticator / Timestamp slip — fresh proof that this request is happening now",
    "Service — a backstage door, already sharing its own secret with the Staff House",
  ],
  takeaway: "Kerberos works because every party already shares trust material with the KDC, not because tickets are self-validating magic.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Client Principal</div>
        <div class="node-sub">staff identity with a password-derived key</div>
      </div>
      <div class="link">
        <div class="lock">🪪</div>
        <div class="link-label">check in once, each morning</div>
        <div class="arrow">→</div>
      </div>
      <div class="node trusted">
        <div class="node-title">KDC</div>
        <div class="flow spaced">
          <div class="node compact compact-padding">
            <div class="node-title small">Authentication Server</div>
            <div class="node-sub">AS</div>
          </div>
          <div class="node compact compact-padding">
            <div class="node-title small">Ticket Granting Server</div>
            <div class="node-sub">TGS</div>
          </div>
        </div>
      </div>
      <div class="link">
        <div class="lock">🎟️</div>
        <div class="link-label">a fresh pass per door, no password retyped</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Service Servers</div>
        <div class="node-sub">services with shared KDC secrets</div>
      </div>
    </div>
    <p class="diagram-note">
      One login can produce many door-specific service tickets.
    </p>
  `,
  },
};
