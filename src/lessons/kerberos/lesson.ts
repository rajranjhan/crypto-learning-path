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
  summary: "Explains Kerberos ticket-based authentication for trusted internal networks.",
  whyItMatters:
    "Single sign-on should not send your password to every service. Kerberos shows how tickets enable access and why protecting their keys matters.",
  objectives: [
    "Trace the AS, TGS, and AP exchanges",
    "Explain ticket-granting tickets and service tickets",
    "Describe replay protection and ticket lifetimes",
    "Compare Kerberos's trust model with OAuth",
  ],
  prerequisites: ["symmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why doesn't each service need to receive the user's password?",
      answer: "The KDC issues a service ticket protected for that service. The client uses the associated session key to prove participation in the exchange.",
    },
    {
      question: "Why does a service need an authenticator as well as a ticket?",
      answer: "A ticket can be copied. A fresh authenticator proves possession of the session key, while time checks and replay detection limit reuse of captured exchanges.",
    },
    {
      question: "Why is a KDC key compromise broader than one service key compromise?",
      answer: "KDC keys support issuing tickets across the realm. A service key compromise generally affects tickets for that service, while KDC compromise can undermine the realm's authentication trust.",
    },
  ],
  keyTakeaways: [
    "Kerberos centralizes authentication in the KDC",
    "Services validate tickets instead of seeing user passwords",
    "Short-lived authenticators limit replay risk",
    "Golden and silver tickets represent high-impact key compromise",
  ],
  estimatedMinutes: 35,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "Kerberos proves who is present inside a realm. OAuth focuses on what an application is allowed to do across APIs.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Client Principal</div>
        <div class="node-sub">staff identity in the realm</div>
      </div>
      <div class="link">
        <div class="lock">🪪</div>
        <div class="link-label">check in once</div>
        <div class="arrow">→</div>
      </div>
      <div class="node trusted">
        <div class="node-title">KDC</div>
        <div class="node-sub">AS + TGS</div>
      </div>
      <div class="link">
        <div class="lock">🎟️</div>
        <div class="link-label">door pass, per door</div>
        <div class="arrow">→</div>
      </div>
      <div class="node">
        <div class="node-title">Service Server</div>
        <div class="node-sub">validates the service ticket locally</div>
      </div>
    </div>
    <p class="diagram-note">
      AS, TGS, and AP are separate trust steps in one Kerberos login.
    </p>
  `,
  },
  steps: [backstageBadges, asExchange, tgsExchange, apExchange, replayProtection, goldenSilverTicket, kerberosVsOauth],
};
