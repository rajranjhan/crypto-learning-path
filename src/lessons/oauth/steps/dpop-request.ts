import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

// The DPoP proof JWT (decoded) that the client attaches to the token request,
// per RFC 9449. Header carries the client's public key; payload binds the proof
// to this specific HTTP request and makes it single-use. Line indices below map
// to the annotations on the right.
const proofLines = [
  "Header:",
  "{",
  '  "typ": "dpop+jwt",',
  '  "alg": "ES256",',
  '  "jwk": { "kty": "EC", "crv": "P-256", "x": "...", "y": "..." }',
  "}",
  "Payload:",
  "{",
  '  "jti": "-BwC3ESc6acc2lTc",',
  '  "htm": "POST",',
  '  "htu": "https://server.example.com/token",',
  '  "iat": 1562262616',
  "}",
];

export const dpopRequest: Step = {
  id: "dpop-request",
  title: "Proving It's Your Ticket — The Proof on Each Request (DPoP)",
  prose:
    "Remember signing your name on the ride ticket, then signing again at the gate? " +
    "DPoP (Demonstrating Proof-of-Possession, RFC 9449) is that same signature, made " +
    "real. It achieves sender-constrained tokens at the application layer instead of " +
    "requiring mTLS everywhere. The client generates a public/private key pair and, " +
    "with every request, attaches a small signed JWT called a DPoP proof in a " +
    "'DPoP' header — this is the signature itself. The proof's header carries the " +
    "client's public key (jwk) and the payload binds the proof to this exact HTTP " +
    "request. Because the client signs it with its private key, the server can " +
    "verify possession of that key without ever seeing the private half. Hover " +
    "each line to see what it does.",
  bullets: [
    "Client holds a key pair; sends a signed DPoP proof JWT with each request",
    "Header carries the public key (jwk) and signing algorithm (must be asymmetric)",
    "Payload binds the proof to this method + URL and makes it single-use",
    "Works over ordinary TLS — no mTLS infrastructure required",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "client", label: "Generate key pair; build & sign DPoP proof" },
      { from: "client", to: "as", label: "POST /token  +  DPoP: <proof JWT>", highlight: true },
    ],
  },
  textBlock: {
    lang: "jwt",
    lines: proofLines,
    annotations: [
      { line: 2, label: "typ", description: '"dpop+jwt" declares this JWT is a DPoP proof — any token of this type is sender-constrained.', colorClass: "c-hs" },
      { line: 3, label: "alg", description: "The signing algorithm. Must be asymmetric (e.g. ES256) so the server can verify with the public key.", colorClass: "c-ver" },
      { line: 4, label: "jwk", description: "The client's PUBLIC key. Lets the server verify the signature without ever seeing the private key.", colorClass: "c-rand" },
      { line: 8, label: "jti", description: "Unique ID for this proof. The server remembers it to reject replays of the same proof.", colorClass: "c-cipher" },
      { line: 9, label: "htm", description: "HTTP method this proof is valid for. A proof for POST can't be reused on GET.", colorClass: "c-len" },
      { line: 10, label: "htu", description: "Exact target URI (no query/fragment). Binds the proof to this specific endpoint.", colorClass: "c-rec" },
      { line: 11, label: "iat", description: "Issued-at timestamp. Servers accept only fresh proofs (a few seconds) to limit replay.", colorClass: "c-hs" },
    ],
  },
};
