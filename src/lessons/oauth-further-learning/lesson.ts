import type { Lesson } from "../../types";
import { oauthSequenceFigure } from "../oauth-shared";
import { bearerWeakness } from "../oauth/steps/bearer-weakness";
import { refreshToken } from "../oauth/steps/refresh-token";
import { wristbandTicket } from "../oauth/steps/wristband-ticket";
import { fapiMtls } from "../oauth/steps/fapi-mtls";
import { signedTicket } from "../oauth/steps/signed-ticket";
import { dpopRequest } from "../oauth/steps/dpop-request";
import { dpopResponse } from "../oauth/steps/dpop-response";
import { dpopValidation } from "../oauth/steps/dpop-validation";
import { dpopVsFapi } from "../oauth/steps/dpop-vs-fapi";
import { scopes } from "./steps/scopes";
import { claims } from "./steps/claims";
import { confusedDeputy } from "./steps/confused-deputy";
import { audienceRestriction } from "./steps/audience-restriction";
import { oauthVsOidc } from "./steps/oauth-vs-oidc";
import { entitlements } from "./steps/entitlements";

export const oauthFurtherLearningLesson: Lesson = {
  slug: "oauth-further-learning",
  title: "OAuth: Tokens, Claims & Security",
  status: "available",
  summary: "Learn how OAuth tokens use scopes, claims, audiences, sender constraints, mTLS, and DPoP to express and protect delegated API access.",
  whyItMatters:
    "A valid token can still be used at the wrong API or replayed after theft. Understanding token boundaries helps you spot those failures.",
  objectives: [
    "Explain scopes, claims, audiences, and entitlements",
    "Recognize bearer-token theft and replay risk",
    "Compare sender-constrained tokens with mTLS and DPoP",
    "Separate OAuth authorization from OIDC authentication",
  ],
  prerequisites: ["oauth"],
  checkYourUnderstanding: [
    {
      question: "Why should an API reject a validly signed token intended for another API?",
      answer: "The signature protects the token's contents but does not grant universal access. Audience validation ensures this API is an intended recipient.",
    },
    {
      question: "Why doesn't signing a bearer token prevent its replay after theft?",
      answer: "The signature prevents alteration, not copying. Sender constraints add a separate requirement to prove possession of a bound key.",
    },
    {
      question: "Why might a scope check still be insufficient to authorize a request?",
      answer: "A scope describes delegated access, but an application may also need ownership, tenant, role, or entitlement checks for the specific resource.",
    },
  ],
  keyTakeaways: [
    "A token is not the user's identity",
    "Scopes describe delegated access, not every application permission",
    "Audience restrictions keep tokens from being replayed at the wrong API",
    "Bearer tokens can be replayed if stolen",
    "Sender-constrained tokens require proof of a bound key",
    "OIDC adds identity claims on top of OAuth authorization",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "Once token meaning and replay risk are clear, the next question is which OAuth flow fits a particular client and trust boundary.",
  figure: oauthSequenceFigure,
  steps: [
    scopes,
    claims,
    audienceRestriction,
    bearerWeakness,
    refreshToken,
    wristbandTicket,
    fapiMtls,
    signedTicket,
    dpopRequest,
    dpopResponse,
    dpopValidation,
    dpopVsFapi,
    confusedDeputy,
    entitlements,
    oauthVsOidc,
  ],
};
