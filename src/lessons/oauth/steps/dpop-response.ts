import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

// The token response uses token_type "DPoP", and the access token itself (or its
// introspection result) carries a cnf/jkt claim binding it to the client's key.
const responseLines = [
  "HTTP/1.1 200 OK",
  "{",
  '  "access_token": "Kz-8mXK1EalYznwH-LC-1fBAo...",',
  '  "token_type": "DPoP",',
  '  "expires_in": 2677,',
  '  "refresh_token": "Q..Zkm291exi8VnWg2zPW1x..."',
  "}",
  "",
  "Access token claims (decoded):",
  "{",
  '  "sub": "someone@example.com",',
  '  "iss": "https://server.example.com",',
  '  "cnf": { "jkt": "0ZcOCORZNYy-DWpqq30jZyJGHTN0d2Hg1..." }',
  "}",
];

export const dpopResponse: Step = {
  id: "dpop-response",
  title: "The Ticket Comes Stamped With Your Key (DPoP)",
  prose:
    "At the booth, the attendant doesn't just glance at your signature and wave " +
    "you through — they keep a record of it, so it can be checked again at the " +
    "gate. The authorization server returns a token whose token_type is 'DPoP' " +
    "rather than 'Bearer'. Crucially, it binds the access token to the client's " +
    "key: it computes a SHA-256 thumbprint of the public key from the proof and " +
    "stores it in a confirmation claim (cnf) as jkt — the record of your " +
    "signature. For a JWT access token the cnf claim is embedded directly; for an " +
    "opaque token the same binding is exposed via the introspection endpoint. From " +
    "now on, presenting the token alone is not enough — the caller must also prove " +
    "possession of the matching private key, the same way a ticket alone wasn't " +
    "enough once it carried a signature.",
  bullets: [
    'token_type is "DPoP" — this is a sender-constrained token, not a bearer token',
    "cnf.jkt = SHA-256 thumbprint of the client's public key, bound into the token",
    "JWT tokens embed cnf directly; opaque tokens expose it via introspection",
    "The token is now useless without the corresponding private key",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "as", label: "POST /token + DPoP proof" },
      { from: "as", to: "as", label: "Compute jkt = SHA-256(public key)" },
      { from: "as", to: "client", label: 'token_type: "DPoP", access_token bound via cnf/jkt', highlight: true },
    ],
  },
  textBlock: {
    lang: "json",
    lines: responseLines,
    annotations: [
      { line: 3, label: "token_type", description: '"DPoP" tells the client to present the token together with a DPoP proof on every call.', colorClass: "c-hs" },
      { line: 5, label: "refresh_token", description: "Refresh tokens are also DPoP-bound, so a leaked refresh token can't be used without the key either.", colorClass: "c-cipher" },
      { line: 12, label: "cnf / jkt", description: "Confirmation claim. jkt is the SHA-256 thumbprint of the client's public key — this is what binds the token to the key.", colorClass: "c-rand" },
    ],
  },
};
