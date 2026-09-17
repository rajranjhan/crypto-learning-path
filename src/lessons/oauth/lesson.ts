import type { Lesson } from "../../types";
import { oauthSequenceFigure } from "../oauth-shared";
import { tokenProperties } from "./steps/token-properties";
import { carnivalTicket } from "./steps/carnival-ticket";
import { authCode } from "./steps/auth-code";
import { bearerWeakness } from "./steps/bearer-weakness";
import { refreshToken } from "./steps/refresh-token";

export const oauthLesson: Lesson = {
  slug: "oauth",
  title: "OAuth: Fundamentals",
  status: "available",
  summary: "Learn how OAuth 2.0 lets applications obtain delegated access using authorization codes, access tokens, refresh tokens, scopes, and bearer-token protections.",
  whyItMatters:
    "Apps need limited access to your data without receiving your password. OAuth delegates that access; OpenID Connect adds user authentication.",
  objectives: [
    "Distinguish authorization from authentication in OAuth",
    "Map Resource Owner, Client, Authorization Server, and Resource Server to the carnival metaphor",
    "Explain access tokens, authorization codes, bearer tokens, and refresh tokens",
    "Trace the authorization code flow with PKCE",
  ],
  prerequisites: ["tls12"],
  checkYourUnderstanding: [
    {
      question: "Why is an access token different from proof of who the user is?",
      answer: "An access token grants access to a resource under an authorization policy. User authentication requires an identity protocol such as OpenID Connect and its validation rules.",
    },
    {
      question: "Why can a stolen bearer token be used without the user's password?",
      answer: "Possession of the token is the credential. Unless additional constraints apply, the API does not require the user's password or a separate proof of key possession.",
    },
    {
      question: "Why does PKCE help when an authorization code is intercepted?",
      answer: "The token request must include a verifier matching the challenge used when requesting the code. The intercepted code alone is therefore insufficient.",
    },
  ],
  keyTakeaways: [
    "OAuth delegates authorization with tokens rather than passwords",
    "OAuth access tokens are not identity assertions",
    "Bearer tokens are powerful because possession is enough",
    "Refresh tokens extend sessions and need stronger protection",
  ],
  estimatedMinutes: 45,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "You can now trace how an app receives access. Next, examine what tokens mean and how audience checks and sender constraints limit misuse.",
  figure: oauthSequenceFigure,
  steps: [tokenProperties, carnivalTicket, authCode, bearerWeakness, refreshToken],
};
