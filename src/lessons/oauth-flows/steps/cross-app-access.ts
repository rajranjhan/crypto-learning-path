import type { SequenceActor, Step } from "../../../types";

const XAA_ACTORS: SequenceActor[] = [
  { id: "user", label: "You", icon: "🧑" },
  { id: "appA", label: "Carnival A's App", icon: "🎠" },
  { id: "idp", label: "Shared Identity Office", icon: "🪪" },
  { id: "appB", label: "Carnival B's App", icon: "🎡" },
];

export const crossAppAccess: Step = {
  id: "cross-app-access",
  title: "Two Carnivals, One Trusted Office — Cross-App Access",
  prose:
    "<p>So far every ticket and every trade has stayed inside one carnival. What if you need into a completely different carnival next door — a different company, a different booth, a different Ferris wheel — one you've never registered with directly?</p>" +
    "<p>Say both carnivals, despite being separate businesses, contract with the same regional identity office to vouch for season-pass holders. You're already recognized there because Carnival A's booth already checked you in. Walk up to Carnival B's gate, and instead of registering from scratch, Carnival B's booth can ask that same shared office directly: \"this guest is vouched for by you at Carnival A — assert that to me, and I'll issue my own scoped pass.\"</p>" +
    "<p>That's <strong>Cross-App Access (XAA)</strong>, formally the Identity Assertion Authorization Grant — an emerging spec, still an IETF draft as of this writing, that extends the shared office's job from just handling logins (SSO) to also brokering API access between apps that never had a direct relationship with each other. The office issues Carnival A's app a signed identity assertion naming Carnival B; Carnival A's app hands that assertion to Carnival B's own booth, which trades it — using the same Token Exchange machinery from the previous step — for a real, scoped access token.</p>" +
    "<p>The two carnivals still never talk to each other directly, and neither one had to register the other as a known client. All either one needs is the same shared trust in the identity office — which is exactly what makes this practical for the newest use case driving it: an AI agent or app that needs to reach into a dozen different SaaS tools on your behalf, without a dozen separate one-off OAuth relationships to set up first.</p>",
  bullets: [
    "Cross-App Access (XAA) / Identity Assertion Authorization Grant (ID-JAG): a still-in-draft IETF spec, not yet a finished RFC",
    "Extends a shared identity provider's role from just SSO to also brokering API access between independent apps",
    "App A requests a signed identity assertion (ID-JAG) from the shared identity provider, naming App B as the target",
    "App A presents that assertion to App B's authorization server (RFC 7523-style) and trades it for a real access token (via RFC 8693 Token Exchange)",
    "Neither app registers the other directly — both only need to trust the same identity provider",
    "Built for the AI-agent case: reaching into many independent SaaS apps on a user's behalf without a combinatorial explosion of direct integrations",
  ],
  sequence: {
    actors: XAA_ACTORS,
    messages: [
      { from: "user", to: "appA", label: "Already recognized here via SSO" },
      { from: "appA", to: "idp", label: "Request identity assertion for Carnival B", highlight: true },
      { from: "idp", to: "appA", label: "Identity assertion (ID-JAG): signed, names Carnival B" },
      { from: "appA", to: "appB", label: "Present the identity assertion" },
      { from: "appB", to: "idp", label: "Token Exchange: trade this assertion for a real token", highlight: true },
      { from: "idp", to: "appB", label: "access_token, scoped to Carnival B" },
      { from: "appB", to: "appA", label: "Access granted — no direct registration needed" },
    ],
  },
};
