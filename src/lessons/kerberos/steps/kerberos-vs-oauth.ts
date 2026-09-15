import type { Step } from "../../../types";

export const kerberosVsOauth: Step = {
  id: "kerberos-vs-oauth",
  title: "Kerberos vs OAuth — Authentication vs Authorization",
  prose:
    "<p>This carnival's security has two halves: guest tickets at the front gate (OAuth, covered next) and staff badges backstage (Kerberos, just covered). Kerberos is primarily an <strong>authentication</strong> protocol: prove this principal is really present and get a service ticket for a network service. OAuth is primarily an <strong>authorization</strong> framework: let a client call an API with delegated permission. They overlap in practice, but they answer different first questions.</p>" +
    "<p>Kerberos assumes one <strong>realm</strong>: a single trusted domain where every principal — staff and doors alike — already registered a secret with the same Staff House ahead of time. Every ticket is sealed with a shared secret (symmetric keys throughout), and there's no consent screen, because you <em>are</em> the principal being authenticated — nobody's delegating access to anybody else. That's exactly the shape of a corporate network or a university campus, which is why Kerberos underpins Windows Active Directory logins to this day.</p>" +
    "<p>OAuth assumes the opposite: the app, the authorization server, and the API can belong to three completely different companies that have never met. Tokens are usually bearer or signed rather than symmetric, everything rides over ordinary HTTPS instead of pre-shared secrets, and the user's explicit consent — \"this app may access your photos\" — is the center of the whole flow. That's the shape of the open web, where an app you installed yesterday needs to talk to an API it has no prior relationship with.</p>",
  bullets: [
    "Kerberos first question: who is this principal, and can they prove it right now?",
    "OAuth first question: what is this client allowed to do at this API?",
    "Kerberos: one trusted realm, symmetric shared secrets, no consent step, built for internal networks",
    "OAuth: many independent parties, bearer/signed tokens over HTTPS, explicit user consent, built for the open web",
    "Both lean on a trusted third party issuing short-lived credentials — they just disagree on how much the parties trust each other going in",
  ],
  diagram: `
    <p class="centered">
      <strong>
      Same goal: don't repeatedly expose your long-term secret
      </strong>
    </p>
    <div class="flow">
      <div class="node equal">
        <div class="node-title">Kerberos</div>
        <div class="node-sub left">
          Symmetric keys, shared in advance<br>
          One trusted realm<br>
          Authentication first: prove the principal is present<br>
          Built for internal networks (Windows domains, campus LANs)
        </div>
      </div>
      <div class="node equal">
        <div class="node-title">OAuth</div>
        <div class="node-sub left">
          Bearer / signed tokens over HTTPS<br>
          Many independent parties, no prior relationship<br>
          Authorization first: delegated API access<br>
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
