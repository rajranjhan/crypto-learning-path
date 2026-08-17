import type { Lesson } from "../../types";
import { tokenProperties } from "./steps/token-properties";
import { carnivalTicket } from "./steps/carnival-ticket";
import { authCode } from "./steps/auth-code";
import { bearerWeakness } from "./steps/bearer-weakness";
import { refreshToken } from "./steps/refresh-token";
import { wristbandTicket } from "./steps/wristband-ticket";
import { fapiMtls } from "./steps/fapi-mtls";
import { signedTicket } from "./steps/signed-ticket";
import { dpopRequest } from "./steps/dpop-request";
import { dpopResponse } from "./steps/dpop-response";
import { dpopValidation } from "./steps/dpop-validation";
import { dpopVsFapi } from "./steps/dpop-vs-fapi";

export const oauthLesson: Lesson = {
  slug: "oauth",
  title: "OAuth: Fundamentals",
  status: "available",
  overview:
    "OAuth 2.0 lets apps call APIs on a user's behalf using tokens instead of " +
    "passwords. This lesson starts from first principles — the six properties that " +
    "define any token, made concrete with a carnival ride ticket — then walks from " +
    "the basic access/refresh token exchange, through the weakness of bearer tokens, " +
    "to the two ways of locking a token to its rightful owner: certificate-bound " +
    "tokens (the FAPI approach) and DPoP. The same three actors appear in every " +
    "flow, and we keep the carnival metaphor going: the Client is you, the " +
    "Authorization Server is the ticket booth that sells you a ticket, and the " +
    "Resource Server is the Ferris wheel you redeem it at — so you can follow how " +
    "the flow changes as the security model tightens.",
  steps: [tokenProperties, carnivalTicket, authCode, bearerWeakness, refreshToken, wristbandTicket, fapiMtls, signedTicket, dpopRequest, dpopResponse, dpopValidation, dpopVsFapi],
};
