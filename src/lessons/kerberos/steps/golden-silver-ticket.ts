import type { SequenceActor, Step } from "../../../types";

// Local to this step: the attacker doesn't check in through the normal flow,
// so KERBEROS_ACTORS' "You" column doesn't fit — this needs its own lifeline.
const FORGERY_ACTORS: SequenceActor[] = [
  { id: "attacker", label: "Attacker", icon: "🕵️" },
  { id: "door", label: "Backstage Door (Service)", icon: "🚪" },
];

export const goldenSilverTicket: Step = {
  id: "golden-silver-ticket",
  title: "Steal the Master Seal, Forge Any Badge — Golden & Silver Tickets",
  prose:
    "<p>Everything you've walked through so far is only as trustworthy as the secrets doing the sealing. Two of those secrets are worth singling out, because stealing either one skips the entire protocol rather than breaking it.</p>" +
    "<p>The Staff House's own master seal — the <code>krbtgt</code> key — is used to seal every single Day Badge, for every staff member, every day. Steal that one secret, and you don't need to check in at all: you can seal a Day Badge for anyone, with any name, any privileges, any expiry you like, entirely offline, without the Check-In Window ever seeing you. Real Kerberos deployments (this is the standard attack against Windows Active Directory) call this a <strong>Golden Ticket</strong>. Because it never touches the Check-In Window, there's no failed login to notice — the forged badge just works.</p>" +
    "<p>A narrower version targets one door instead of the whole Staff House: steal a single door's own secret (its service account key), and you can forge Door Passes for that one door only — no Day Badge required, no visit to the Backstage Desk. That's a <strong>Silver Ticket</strong>. It reaches less, but it's often harder to catch, because the Backstage Desk — the party that would normally log every pass it issues — is never involved at all.</p>" +
    "<p>This is the same shape of risk you saw with plain bearer tokens: the whole system's trust rests on a small number of long-lived secrets, and a leak of the right one undermines everything downstream of it, silently. It's why real deployments rotate the <code>krbtgt</code> key periodically and treat it as the single most sensitive secret in the realm.</p>",
  bullets: [
    "Golden Ticket — steal the Staff House's master seal (krbtgt key); forge a Day Badge for anyone, skipping the Check-In Window entirely",
    "Silver Ticket — steal one door's own secret; forge a Door Pass for just that door, skipping the Backstage Desk entirely",
    "Neither forgery touches the party that would normally log the issuance — that's what makes them hard to detect",
    "The whole system's trust concentrates in a few long-lived secrets; real deployments rotate the master seal for exactly this reason",
  ],
  sequence: {
    actors: FORGERY_ACTORS,
    messages: [
      { from: "attacker", to: "attacker", label: "⚠ Steals the door's own secret (no Staff House visit)", highlight: true },
      { from: "attacker", to: "attacker", label: "Forges a Door Pass + Authenticator, entirely offline", highlight: true },
      { from: "attacker", to: "door", label: "AP-REQ — forged pass, sealed correctly with the stolen secret", highlight: true },
      { from: "door", to: "attacker", label: "Accepted — the seal checks out; the door has no way to know it's forged" },
    ],
  },
};
