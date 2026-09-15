import type { Lesson } from "../../types";
import { oauthActorMappingFigure, oauthSequenceFigure } from "../oauth-shared";
import { tokenProperties } from "./steps/token-properties";
import { carnivalTicket } from "./steps/carnival-ticket";
import { authCode } from "./steps/auth-code";
import { bearerWeakness } from "./steps/bearer-weakness";
import { refreshToken } from "./steps/refresh-token";

export const oauthLesson: Lesson = {
  slug: "oauth",
  title: "OAuth: Fundamentals",
  status: "available",
  summary: "OAuth 1 introduces delegated authorization, the canonical OAuth actors, access tokens, the authorization code flow, bearer-token risks, and refresh tokens.",
  whyItMatters:
    "OAuth is how modern applications delegate API access without sharing passwords. It is an authorization framework, not by itself an authentication protocol; OpenID Connect adds the identity layer when an app needs to know who the user is.",
  objectives: [
    "Distinguish authorization from authentication in OAuth",
    "Map Resource Owner, Client, Authorization Server, and Resource Server to the carnival metaphor",
    "Explain access tokens, authorization codes, bearer tokens, and refresh tokens",
    "Trace the authorization code flow with PKCE",
  ],
  prerequisites: ["tls12"],
  keyTakeaways: [
    "OAuth delegates authorization with tokens rather than passwords",
    "OAuth access tokens are not identity assertions",
    "Bearer tokens are powerful because possession is enough",
    "Refresh tokens extend sessions and need stronger protection",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "protocol",
  overview:
    "OAuth 1 — Fundamentals starts the OAuth mini-course. OAuth is an authorization " +
    "framework: it answers what an app may do at an API, not who the user is. " +
    "OpenID Connect adds the authentication and identity layer on top. This lesson " +
    "uses the carnival metaphor consistently: you are the Resource Owner, the app " +
    "is the Client, the ticket booth is the Authorization Server, and the ride gate " +
    "or kiosk is the Resource Server.",
  figure: oauthSequenceFigure,
  diagram: oauthActorMappingFigure.body,
  steps: [tokenProperties, carnivalTicket, authCode, bearerWeakness, refreshToken],
};
