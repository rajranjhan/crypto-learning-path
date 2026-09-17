import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const bearerWeakness: Step = {
  id: "bearer-weakness",
  glossary: lessonTerms("bearer token"),
  title: "Bearer Tokens — The Theft Problem",
  wireContext: {
    where: "The authorization server has issued a bearer access token.",
    now: "The sequence shows the token being leaked and replayed.",
    why: "An API accepting bearer tokens does not require a separate proof of the presenter’s key.",
  },
  prose:
    "You already know what a bearer token is, because it's exactly the plain ride " +
    "ticket from a few steps back: whoever's holding it gets to ride. By default, " +
    "that's what OAuth access tokens are. RFC 6750 defines a bearer token as one " +
    "where any party in possession of it can use it, the same way anyone holding " +
    "your ticket can walk up to the gate and ride. The gate (the API) doesn't " +
    "check who's presenting the ticket; it only checks that the ticket itself is " +
    "valid. That makes bearer tokens simple and fast, but it also means a stolen " +
    "or leaked ticket can be used by anyone — the gate has no way to confirm the " +
    "person holding it is the one it was sold to. High-assurance profiles (like " +
    "FAPI) consider this unacceptable, which motivates the sender-constrained " +
    "tickets coming up: the wristband and the signed ticket.",
  bullets: [
    "RFC 6750: whoever holds the token can use it — the same plain ride ticket from two steps back",
    "The gate (API) verifies the ticket is valid, not who is presenting it",
    "Intercepted or leaked tickets can be used by an attacker, same as a stolen ticket",
    "No holder binding — this is the weakness the wristband and signed ticket (FAPI and DPoP) set out to fix",
  ],
  takeaway: "A stolen bearer token can normally be replayed by whoever possesses it.",
  sequence: {
    actors: OAUTH_ACTORS,
    progress: {
      goal: "Understand why bearer-token possession is risky",
      already: ["Authorization server issued an access token"],
      now: "Anyone holding the bearer token can present it",
      next: "Constrain tokens to a sender with mTLS or DPoP",
    },
    messages: [
      { from: "as", to: "client", label: "access_token (bearer ride ticket)" },
      { from: "client", to: "rs", label: "Show ticket at the gate: Bearer <token>" },
      { from: "client", to: "as", label: "⚠ ticket leaks / is intercepted", highlight: true },
      { from: "client", to: "rs", label: "Attacker shows the same ticket at the gate — accepted", highlight: true },
    ],
  },
};
