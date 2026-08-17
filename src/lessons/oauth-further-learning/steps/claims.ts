import type { Step } from "../../../types";

const claimLines = [
  "{",
  '  "sub": "user_8f2c1a",',
  '  "iss": "https://as.example.com",',
  '  "aud": "https://api.example.com",',
  '  "iat": 1735689600,',
  '  "nbf": 1735689600,',
  '  "exp": 1735693200,',
  '  "scope": "profile:read rides:basic"',
  "}",
];

export const claims: Step = {
  id: "claims",
  title: "What's Printed on the Ticket — Claims",
  prose:
    "<p>Think of the ticket stub's printed fields: whose name is on it, which carnival issued it, which gate it's valid at, when it was printed, and when it expires. Each of those is a <strong>claim</strong> — a single fact — and the whole ticket is trustworthy only because the carnival's seal (the signature) covers every field at once. Change one digit and the seal breaks.</p>" +
    "<p>You've already seen a couple of claims up close — cnf/jkt binding a token to a key, back in the DPoP steps. Generalize that, and a JWT is really just a signed bag of claims like the ones on that ticket stub — almost everything interesting about a token lives in them.</p>" +
    "<p>A handful of claims show up almost everywhere and have standardized meanings: sub (subject — who this token is about), iss (issuer — who signed it), aud (audience — who it's meant for, next step), iat (issued at), nbf (not valid before), and exp (expires at).</p>" +
    "<p>Beyond those, an authorization server can add whatever custom claims a deployment needs — scopes, roles, tenant IDs — the same way this lesson's cnf claim added key-binding information.</p>",
  bullets: [
    "sub — who the token is about (a user ID, or a client ID for machine-to-machine tokens)",
    "iss — who issued/signed the token, so the recipient knows whose key to check it against",
    "aud — who the token is meant for (next step)",
    "iat / nbf / exp — issued-at, not-valid-before, and expiry timestamps",
    "Custom claims (scope, roles, cnf, ...) extend the standard set for whatever a deployment needs",
  ],
  textBlock: {
    lang: "json",
    lines: claimLines,
    annotations: [
      { line: 1, label: "sub", description: "Subject — who this token is about. Here, the user's ID.", colorClass: "c-rand" },
      { line: 2, label: "iss", description: "Issuer — the authorization server that signed this token.", colorClass: "c-hs" },
      { line: 3, label: "aud", description: "Audience — which API this token is meant for. Getting this check wrong is common enough to deserve its own step, next.", colorClass: "c-rec" },
      { line: 4, label: "iat", description: "Issued At — a Unix timestamp for when the token was minted.", colorClass: "c-len" },
      { line: 5, label: "nbf", description: "Not Before — the token isn't valid until this timestamp, even if presented earlier.", colorClass: "c-len" },
      { line: 6, label: "exp", description: "Expires — the token stops being valid at this timestamp.", colorClass: "c-ver" },
      { line: 7, label: "scope", description: "The granted scopes from the previous step, carried right in the token.", colorClass: "c-cipher" },
    ],
  },
};
