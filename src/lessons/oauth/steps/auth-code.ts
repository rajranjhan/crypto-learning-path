import type { Step } from "../../../types";
import { OAUTH_ACTORS_WITH_USER } from "../../actors";

export const authCode: Step = {
  id: "auth-code",
  title: "Buying Your First Ticket",
  prose:
    "<p>You ask the app for your data: \"Get me my balance.\" The app can't just hand that over — it doesn't have a ride ticket for you yet. \"I can't get that without you proving who you are first,\" it says. \"Go log in at the booth.\"</p>" +
    "<p>So you walk up to the booth — the authorization server — yourself. \"The app sent me,\" you tell the attendant. \"I'd like to log in.\" You show your ID and consent to what the app can do for you. That's OAuth 2.0 in miniature: it lets an app act on your behalf at an API without ever seeing your password.</p>" +
    "<p>The booth doesn't hand you the actual ride ticket right there in the open. \"You're checked in,\" the attendant says, and hands you a <strong>voucher</strong> instead — that's the authorization code, good for one redemption and only for a minute or two. You carry it back to the app: \"I'm checked in. Here's the voucher.\" The app takes it around to the booth's back window (a direct, private call the crowd never sees) and trades it for the real ride ticket: the access token.</p>" +
    "<p>One problem: if someone snatched the voucher out of your hand in the crowd, could they redeem it themselves? That's what <strong>PKCE</strong> closes. Before sending you to the booth, the app whispers a secret word to the booth (the code_challenge) and keeps the original word to itself (the code_verifier). At the back window, it has to repeat that exact word before the booth hands over the ticket — so a stolen voucher alone is worthless to anyone else.</p>" +
    "<p>With the ride ticket in hand, the app shows it at the Ferris wheel gate and finally gets you your data. How you get a new ticket later, without walking you back to the booth again, is its own step, coming up.</p>",
  bullets: [
    "You ask the app for something; it doesn't have a ticket for you yet, so it sends you to log in at the booth",
    "Authorization code (the voucher) — the booth hands it to you, not the app, and you carry it back",
    "PKCE (the secret word) — a code_verifier/code_challenge pair proving that whoever redeems the voucher is the one that sent you to the booth",
    "Access token (the ride ticket) — what the app presents at the API; getting a new one without a fresh login is its own step, coming up",
  ],
  sequence: {
    actors: OAUTH_ACTORS_WITH_USER,
    messages: [
      { from: "client", to: "user", label: "\"I can't get that without you proving who you are — go log in at the booth\"" },
      { from: "client", to: "as", label: "Authorization request + code_challenge (secret word, scrambled)" },
      { from: "user", to: "as", label: "\"The app sent me — I'd like to log in\"", highlight: true },
      { from: "as", to: "user", label: "\"You're checked in\" — authorization code (the voucher)" },
      { from: "user", to: "client", label: "\"I'm checked in. Here's the voucher.\"" },
      { from: "client", to: "as", label: "Redeem voucher: code + code_verifier (repeat the secret word)", highlight: true },
      { from: "as", to: "client", label: "access_token (the ride ticket)", note: "the code exchange", highlight: true },
      { from: "client", to: "rs", label: "Show the ride ticket at the gate (API call)" },
    ],
  },
};
