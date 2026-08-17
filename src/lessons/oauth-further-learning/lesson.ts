import type { Lesson } from "../../types";
import { clientTypes } from "./steps/client-types";
import { stateAndRedirectUri } from "./steps/state-and-redirect-uri";
import { scopes } from "./steps/scopes";
import { claims } from "./steps/claims";
import { audienceRestriction } from "./steps/audience-restriction";
import { oauthVsOidc } from "./steps/oauth-vs-oidc";
import { entitlements } from "./steps/entitlements";

export const oauthFurtherLearningLesson: Lesson = {
  slug: "oauth-further-learning",
  title: "OAuth: Further Learning",
  status: "available",
  overview:
    "This lesson picks up where OAuth: Fundamentals left off — same carnival, same " +
    "three actors (the Client is you, the Authorization Server is the ticket booth, " +
    "the Resource Server is the Ferris wheel) — and fills in the parts a first pass " +
    "usually skips: who's actually allowed to ask for a ticket, what a ticket lets " +
    "you do versus who it says you are, and what's really printed in the small " +
    "print. If you haven't done the fundamentals lesson yet, start there first — " +
    "this one assumes you already know what a bearer token is and why DPoP exists.",
  steps: [
    clientTypes,
    stateAndRedirectUri,
    scopes,
    entitlements,
    claims,
    audienceRestriction,
    oauthVsOidc,
  ],
};
