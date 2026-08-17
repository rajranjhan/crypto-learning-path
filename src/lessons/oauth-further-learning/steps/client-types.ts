import type { Step } from "../../../types";

export const clientTypes: Step = {
  id: "client-types",
  title: "Who's Asking? Confidential vs. Public Clients",
  prose:
    "<p>A booth employee wears a lanyard with a staff code only the carnival knows, kept behind the counter, never handed to a guest. You, using the ticket app on your own phone, are the opposite: anyone could take that app apart and read everything inside it. That's the real difference between a confidential client and a public client, and it's the first question every OAuth flow has to answer: can this app actually keep a secret?</p>" +
    "<p>A <strong>confidential client</strong> is the booth employee — a backend server you control, running somewhere only your team can reach. It can hold a real password (a client_secret) and use it to prove who it is.</p>" +
    "<p>A <strong>public client</strong> is you at the kiosk. Anyone can take that app apart — decompile it, read its source in dev tools — so it can never hold a real secret. Every value it ships with is public the moment it ships.</p>" +
    "<p>That's exactly why the Authorization Code flow used <strong>PKCE</strong> — the secret word from that step: it lets a public client prove it's the one that started the flow, using a fresh, one-time code_verifier it generates itself, without ever needing a long-lived secret.</p>",
  bullets: [
    "Confidential client: a backend server that can hold a client_secret (e.g. your API's own backend)",
    "Public client: a browser SPA or mobile app — anything a user could inspect or decompile",
    "The authorization server treats them differently: confidential clients authenticate with a secret (or mTLS / private_key_jwt); public clients can't",
    "PKCE exists specifically to give public clients a substitute for a client secret",
  ],
};
