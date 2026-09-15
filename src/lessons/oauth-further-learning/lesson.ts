import type { Lesson } from "../../types";
import { oauthActorMappingFigure, oauthSequenceFigure } from "../oauth-shared";
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
  summary: "OAuth 2 deepens token semantics and security: scopes, claims, audience, replay risk, sender-constrained tokens, mTLS, DPoP, confused deputy, and OAuth vs OIDC.",
  whyItMatters:
    "Most OAuth failures come from misunderstanding what a token says, who it is for, or which client is allowed to receive it. This lesson sharpens the boundaries between authorization, identity, audience, application-specific permissions, and replay resistance.",
  objectives: [
    "Explain scopes, claims, audiences, and entitlements",
    "Recognize bearer-token theft and replay risk",
    "Compare sender-constrained tokens with mTLS and DPoP",
    "Separate OAuth authorization from OIDC authentication",
  ],
  prerequisites: ["oauth"],
  keyTakeaways: [
    "A token is not the user's identity",
    "Scopes describe delegated access, but they are not the full entitlement model in every system",
    "Audience restrictions keep tokens from being replayed at the wrong API",
    "Bearer tokens can be replayed if stolen",
    "Sender-constrained tokens reduce replay risk by requiring proof of key possession",
    "OIDC adds identity claims on top of OAuth authorization",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "protocol",
  overview:
    "OAuth 2 — Tokens, Claims & Security picks up where OAuth 1 left off: same " +
    "Resource Owner, Client, Authorization Server, and Resource Server; same " +
    "carnival map. This lesson looks closely at what is printed on a ticket, which " +
    "gate it is meant for, why stolen bearer tickets are replayable, and how mTLS " +
    "or DPoP can bind a token to a key. It ends by separating OAuth authorization " +
    "from OpenID Connect authentication.",
  figure: oauthSequenceFigure,
  diagram: oauthActorMappingFigure.body,
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
