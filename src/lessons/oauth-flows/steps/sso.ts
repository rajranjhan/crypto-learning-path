import type { SequenceActor, Step } from "../../../types";

const SSO_ACTORS: SequenceActor[] = [
  { id: "user", label: "You", icon: "🧑" },
  { id: "app1", label: "Ferris Wheel App", icon: "🎡" },
  { id: "idp", label: "Identity Office (OIDC Provider)", icon: "🪪" },
  { id: "app2", label: "Roller Coaster App", icon: "🎢" },
];

export const sso: Step = {
  id: "sso",
  title: "One Wristband, Every Ride — Single Sign-On",
  prose:
    "<p>Every step so far has had you show ID at one booth for one ride. A real carnival has a dozen rides, and nobody wants to show ID a dozen times.</p>" +
    "<p>Here's the trick: it's still the same one office, run by the carnival, that every ride trusts. The first time you check in, the office remembers you're logged in — it keeps a little chit at its own counter, a session, not just the wristband it hands you. Walk up to the roller coaster, and its own check-in redirects you to that same office; the office notices you're already checked in and waves you through without asking for ID again, issuing a fresh, ride-specific wristband on the spot.</p>" +
    "<p>That's <strong>Single Sign-On</strong>: not a new grant type, but the same OIDC login (from the OAuth vs. OIDC step in Further Learning) reused across many apps that all trust one identity office. You log in once; every app that trusts that same office gets its own token for you without making you log in again, as long as your session with the office is still active.</p>" +
    "<p>The office's session is the load-bearing piece: log out of it, or let it expire, and every ride stops recognizing you the next time you need a fresh wristband — even though the ride itself never saw you log out.</p>",
  bullets: [
    "SSO isn't a separate OAuth grant — it's OIDC login reused across multiple apps that trust the same identity provider",
    "The identity provider keeps its own session (e.g. a cookie); each app redirects there and gets silently re-authenticated if that session is still valid",
    "Each app still gets its own tokens, scoped to itself — SSO shares the login, not the token",
    "Logging out of the identity provider's session is what actually ends SSO; an individual app can't do that on its own",
  ],
  sequence: {
    actors: SSO_ACTORS,
    messages: [
      { from: "user", to: "app1", label: "Visit the Ferris Wheel app" },
      { from: "app1", to: "idp", label: "Redirect to log in" },
      { from: "user", to: "idp", label: "Log in (first time)", highlight: true },
      { from: "idp", to: "app1", label: "ID token + access token for App 1" },
      { from: "user", to: "app2", label: "Later, visit the Roller Coaster app" },
      { from: "app2", to: "idp", label: "Redirect to log in" },
      { from: "idp", to: "app2", label: "Already logged in — issue tokens for App 2, no prompt", highlight: true },
    ],
  },
};
