import type { Step } from "../../../types";

export const kerberosVsOauth: Step = {
  id: "kerberos-vs-oauth",
  title: "Kerberos vs OAuth — Same Job, Different World",
  prose:
    "<p>You now know both halves of this carnival's security: guest tickets at the front gate (OAuth) and staff badges backstage (Kerberos). They chase the same underlying goal — let someone prove who they are and what they're allowed to do, over and over, without repeatedly exposing their one long-term secret — but they were built for different worlds, and it shows in almost every design choice.</p>" +
    "<p>Kerberos assumes one <strong>realm</strong>: a single trusted domain where every principal — staff and doors alike — already registered a secret with the same Staff House ahead of time. Every ticket is sealed with a shared secret (symmetric keys throughout), and there's no consent screen, because you <em>are</em> the principal being authenticated — nobody's delegating access to anybody else. That's exactly the shape of a corporate network or a university campus, which is why Kerberos underpins Windows Active Directory logins to this day.</p>" +
    "<p>OAuth assumes the opposite: the app, the authorization server, and the API can belong to three completely different companies that have never met. Tokens are usually bearer or signed rather than symmetric, everything rides over ordinary HTTPS instead of pre-shared secrets, and the user's explicit consent — \"this app may access your photos\" — is the center of the whole flow. That's the shape of the open web, where an app you installed yesterday needs to talk to an API it has no prior relationship with.</p>",
  bullets: [
    "Same goal — prove identity and authorization repeatedly without re-exposing your long-term secret",
    "Kerberos: one trusted realm, symmetric shared secrets, no consent step, built for internal networks",
    "OAuth: many independent parties, bearer/signed tokens over HTTPS, explicit user consent, built for the open web",
    "Both lean on a trusted third party issuing short-lived credentials — they just disagree on how much the parties trust each other going in",
  ],
  diagram: `
    <p style="text-align: center; font-weight: 700; margin: 0 0 12px;">
      Same goal: don't repeatedly expose your long-term secret
    </p>
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Kerberos</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Symmetric keys, shared in advance<br>
          One trusted realm<br>
          No consent step — you are the principal<br>
          Built for internal networks (Windows domains, campus LANs)
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">OAuth</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Bearer / signed tokens over HTTPS<br>
          Many independent parties, no prior relationship<br>
          Explicit user consent & delegation<br>
          Built for the open web (third-party apps, cross-org APIs)
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Read the two columns in parallel: both exist so you don't have to hand
      over your password on every single request. The difference is the trust
      model each one assumes going in — one trusted realm sharing secrets in
      advance, versus strangers on the open web who negotiate trust per request.
    </p>
  `,
};
