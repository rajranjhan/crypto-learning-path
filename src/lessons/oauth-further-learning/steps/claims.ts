import { lessonTerms } from "../../terminology";
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
  glossary: lessonTerms("claim", "encoding"),
  title: "Claims — Token Assertions",
  wireContext: {
    where: "A recipient has a structured token whose contents still require validation.",
    now: "The annotated JSON identifies issuer, subject, audience, times, and scope.",
    why: "These assertions tell the recipient which checks to perform; decoding them does not establish trust.",
  },
  prose:
    "<p>Think of the ticket stub's printed fields: whose name is on it, which carnival issued it, which gate it's valid at, when it was printed, and when it expires. Each of those is a <strong>claim</strong> — an assertion, not automatically a verified fact. A valid signature protects the asserted fields from alteration; the receiver must still validate the issuer, audience, lifetime, and applicable policy.</p>" +
    "<p>You've already seen a couple of claims up close — cnf/jkt binding a token to a key, back in the DPoP steps. Generalize that, and the signed JWT in this example carries assertions like those on the ticket stub; JWTs can also use MAC protection or encryption — almost everything interesting about a token lives in them.</p>" +
    "<p>A handful of claims show up almost everywhere and have standardized meanings: sub (subject — who this token is about), iss (issuer — who signed it), aud (audience — who it's meant for, next step), iat (issued at), nbf (not valid before), and exp (expires at).</p>" +
    "<p>Beyond those, an authorization server can add whatever custom claims a deployment needs — scopes, roles, tenant IDs — the same way this lesson's cnf claim added key-binding information.</p>",
  bullets: [
    "sub — who the token is about (a user ID, or a client ID for machine-to-machine tokens)",
    "iss — who issued/signed the token, so the recipient knows whose key to check it against",
    "aud — who the token is meant for (next step)",
    "iat / nbf / exp — issued-at, not-valid-before, and expiry timestamps",
    "Custom claims (scope, roles, cnf, ...) extend the standard set for whatever a deployment needs",
  ],
  takeaway: "Claims are useful only when the receiver understands who issued them, who they are for, and whether they are authorization assertions or identity assertions.",
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
