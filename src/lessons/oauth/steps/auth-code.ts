import type { SequenceActor, Step } from "../../../types";

// Local to this step: the general Ticket Booth / Ferris Wheel actors don't fit
// the ride-photo scenario, so this step names Guest Services and the photo
// kiosk directly rather than reusing OAUTH_ACTORS_WITH_USER's generic labels.
const RIDE_PHOTO_ACTORS: SequenceActor[] = [
  { id: "user", label: "You", icon: "🧑" },
  { id: "client", label: "Photo Dispenser", icon: "💻" },
  { id: "as", label: "Authorization Server (Guest Services)", icon: "🎫" },
  { id: "rs", label: "Resource Server (Photo Kiosk)", icon: "📸" },
];

export const authCode: Step = {
  id: "auth-code",
  title: "Claiming Your Ride Photo",
  prose:
    "<p>You ask the Photo Dispenser for your ride photo — the one the coaster's camera snapped of you mid-drop on the Thunderbolt. \"Pull up my photo from Thunderbolt.\" The Photo Dispenser can't just dispense that — it doesn't have a claim ticket for you yet. \"I can't get that without confirming it's really you,\" it displays. \"Go see Guest Services.\"</p>" +
    "<p>You walk up to the Guest Services booth — the authorization server — yourself. \"The Photo Dispenser sent me,\" you tell the attendant. \"I want to claim my ride photo.\" You scan your wristband and confirm your face against the ticket record, and you tell the attendant exactly what the Photo Dispenser's allowed to access on your behalf — just photos, not your whole visit history. That hand-off is the whole point of OAuth 2.0: the Photo Dispenser gets to act for you with the carnival's systems without ever knowing your wristband code itself.</p>" +
    "<p>The booth doesn't hand you the photo on the spot. Instead: \"You're confirmed,\" the attendant says, and hands you a claim stub — the <strong>authorization code</strong>. Good for one redemption, expired in a minute or two. You carry it back to the Photo Dispenser: \"I'm confirmed — here's the stub.\" The Photo Dispenser communicates with the booth through the back window — a private line the crowd never sees — and exchanges it for the real thing: a claim ticket good at the photo kiosk — this is the <strong>access token</strong>.</p>" +
    "<p>One problem: if someone snatched the stub out of your hand in line, could they walk up and claim your photo themselves? That's the gap <strong>PKCE</strong> closes — Proof Key for Code Exchange, pronounced \"pixie.\" Before sending you to Guest Services, the Photo Dispenser generates a secret word and keeps it to itself (the code_verifier), but sends the booth a scrambled version of it upfront (the code_challenge) — scrambled one-way, so the booth can't work backward to the original. During that back-window exchange, the Photo Dispenser has to provide the real word. The booth scrambles it the same way and checks it matches what it got earlier. A stolen stub alone gets a thief nowhere — they don't know the word.</p>" +
    "<p>With the claim ticket now in its possession, the Photo Dispenser presents it at the photo kiosk — the API — and finally pulls up your picture. How it retrieves your next photo without walking you back to Guest Services is its own step. Coming up.</p>",
  bullets: [
    "Client (the Photo Dispenser) — the app itself: asks on your behalf, but never has access to your wristband code",
    "Authorization server (Guest Services booth) — verifies your identity and what you're consenting to; issues codes and tickets",
    "Authorization code (the claim stub) — short-lived, single-use proof you were verified, not usable on its own",
    "code_verifier (the real secret word) — a random string the Photo Dispenser generates and never shares up front",
    "code_challenge (the scrambled word) — a one-way hash of the code_verifier, sent to the booth in advance",
    "PKCE, pronounced \"pixie\" (Proof Key for Code Exchange) — the word-check at the back window: proves whoever redeems the stub is the same party who started the check-in",
    "Access token (the claim ticket) — what the Photo Dispenser actually presents to get the real thing",
    "Resource server / API (the photo kiosk) — where the claim ticket gets redeemed for data",
  ],
  sequence: {
    actors: RIDE_PHOTO_ACTORS,
    messages: [
      { from: "client", to: "client", label: "Generate a secret word (code_verifier) and scramble it (code_challenge)" },
      { from: "client", to: "user", label: "\"I can't get that without confirming it's really you — go see Guest Services\" (carries the scrambled word)" },
      { from: "user", to: "as", label: "\"The Photo Dispenser sent me — I want to claim my ride photo\" + scrambled word", highlight: true },
      { from: "as", to: "user", label: "\"You're confirmed\" — authorization code (the claim stub)" },
      { from: "user", to: "client", label: "\"I'm confirmed. Here's the stub.\"" },
      { from: "client", to: "as", label: "Redeem stub: code + code_verifier (the real secret word)", highlight: true },
      { from: "as", to: "client", label: "access_token (the claim ticket)", note: "the code exchange", highlight: true },
      { from: "client", to: "rs", label: "Present the claim ticket at the photo kiosk (API call)" },
    ],
  },
};
