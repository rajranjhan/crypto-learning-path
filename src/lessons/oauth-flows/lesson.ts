import type { Lesson } from "../../types";
import { oauthSequenceFigure } from "../oauth-shared";
import { authCode } from "../oauth/steps/auth-code";
import { clientTypes } from "../oauth-further-learning/steps/client-types";
import { stateAndRedirectUri } from "../oauth-further-learning/steps/state-and-redirect-uri";
import { clientCredentials } from "./steps/client-credentials";
import { deprecatedGrants } from "./steps/deprecated-grants";
import { deviceCode } from "./steps/device-code";
import { sso } from "./steps/sso";
import { onBehalfOf } from "./steps/on-behalf-of";
import { crossAppAccess } from "./steps/cross-app-access";

export const oauthFlowsLesson: Lesson = {
  slug: "oauth-flows",
  title: "OAuth: Flows & Federation",
  status: "available",
  summary: "Learn how to choose OAuth flows such as authorization code with PKCE, client credentials, device authorization, delegation, SSO, and federation.",
  whyItMatters:
    "Browser apps, background services, and limited-input devices need different flows. Choosing appropriately reduces credential exposure and unintended delegation.",
  objectives: [
    "Choose Authorization Code + PKCE for interactive app sign-in and consent",
    "Select flows for machine-to-machine and device-constrained scenarios",
    "Explain SSO and token exchange at a high level",
    "Recognize deprecated OAuth grants and why they were retired",
    "Describe federation trust boundaries",
  ],
  prerequisites: ["oauth", "oauth-further-learning"],
  checkYourUnderstanding: [
    {
      question: "Why is client credentials unsuitable for representing a user's delegated consent?",
      answer: "It authenticates the application acting on its own behalf. It does not represent a user's authorization grant.",
    },
    {
      question: "Why does device authorization move consent to another device?",
      answer: "The requesting device may lack a usable browser or keyboard. The user authorizes it through a separate browser while the device waits for the result.",
    },
    {
      question: "Why doesn't sharing an identity provider make tokens interchangeable across applications?",
      answer: "Each application and API has its own audience and authorization boundaries. Shared sign-in does not authorize arbitrary token forwarding.",
    },
  ],
  keyTakeaways: [
    "Different OAuth flows exist for different client and user constraints",
    "Client Credentials removes the human user from the flow",
    "Device Authorization handles limited-input devices",
    "Federation expands trust beyond one authorization server",
    "Deprecated grants usually failed by exposing passwords or tokens too broadly",
  ],
  estimatedMinutes: 40,
  difficulty: "Intermediate",
  lessonType: "protocol",
  transitionToNext: "OAuth controls delegated access. Zero-knowledge proofs ask a different question: how can someone prove a fact without revealing the underlying secret?",
  figure: oauthSequenceFigure,
  steps: [
    authCode,
    clientTypes,
    stateAndRedirectUri,
    clientCredentials,
    deviceCode,
    sso,
    onBehalfOf,
    crossAppAccess,
    deprecatedGrants,
  ],
};
