import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const dpopValidation: Step = {
  id: "dpop-validation",
  title: "At the Ride — Checking the Ticket and Stopping Copies",
  prose:
    "This is the gate check from the title: the attendant compares the signature " +
    "you make right now against the one on file from the booth. When the client " +
    "calls the API, it sends both the DPoP-bound access token and a fresh DPoP " +
    "proof for that exact request — a brand-new signature, made on the spot. The " +
    "resource server ties everything together: it confirms the token is DPoP-bound " +
    "(has a cnf claim), verifies the proof's signature with the public key in the " +
    "proof's jwk header, and checks that the SHA-256 thumbprint of that key equals " +
    "the token's jkt — the signature matches the one on file. It also checks the " +
    "proof's htm/htu match the actual request and that iat is recent with an " +
    "unseen jti. The remaining risk is proof replay — a stolen, still-fresh proof " +
    "(a photocopied signature) being reused. Short proof lifetimes, jti tracking, " +
    "and an authorization-server or resource-server supplied nonce close that " +
    "window. The net result: even a fully intercepted token cannot be used without " +
    "the client's private key — a photocopy of your signature doesn't let a " +
    "stranger write a new one.",
  bullets: [
    "Confirm the token is DPoP-bound (cnf claim present)",
    "Verify the proof signature with the jwk, and check SHA-256(jwk) == token jkt",
    "Check htm/htu match the request and iat is fresh with an unseen jti",
    "Mitigate proof replay with short lifetimes, jti tracking, and a server nonce",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "rs", label: "API call: DPoP-bound token + fresh DPoP proof", highlight: true },
      { from: "rs", to: "rs", label: "Verify sig, jkt==SHA-256(jwk), htm/htu, iat/jti" },
      { from: "rs", to: "client", label: "200 OK — proof of possession confirmed" },
      { from: "client", to: "rs", label: "⚠ attacker replays token WITHOUT the private key" },
      { from: "rs", to: "client", label: "401 — cannot forge a valid proof", highlight: true },
    ],
  },
};
