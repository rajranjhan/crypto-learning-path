import type { Lesson } from "../../types";
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
  overview:
    "The first two lessons stayed inside one triangle: you, one app, one booth. " +
    "Real carnivals — and real systems — are bigger than that. This lesson covers " +
    "what happens when there's no person in the loop at all (Client Credentials), " +
    "when the device asking can't even show a login screen (Device Authorization " +
    "Grant), when one booth's wristband needs to work at every ride in the " +
    "carnival (SSO), when one service needs to call a second service on your " +
    "behalf (Token Exchange), and when two entirely separate carnivals need to " +
    "trust each other through a shared identity office (Cross-App Access) — plus " +
    "two old shortcuts that got shut down along the way. If you haven't done " +
    "Fundamentals and Further Learning yet, start there — this lesson assumes " +
    "you already know what a ticket, a booth, and a scope are. By the time you " +
    "reach Cross-App Access at the end, you'll probably recognize the shape of " +
    "what's happening — see below.",
  diagram: `
    <img class="diagram-img" src="diagrams/standards-proliferate.svg"
         alt="A three-panel homage to xkcd 927, 'Standards.' Panel 1, SITUATION: there are 14 competing OAuth flows and extensions. Panel 2, PROPOSAL: '14 is ridiculous. We need one universal grant that covers every use case.' Panel 3, SOON: there are 15 competing OAuth flows and extensions." />
    <p class="diagram-note">
      This is the actual joke — go read
      <a href="https://xkcd.com/927/" target="_blank" rel="noopener">xkcd #927</a>
      if you haven't. Cross-App Access, the last step in this lesson, is a
      brand-new spec trying to unify how independent apps trust each other
      across OAuth's already-sprawling pile of flows and extensions. That's not
      a knock against it — sometimes the thing genuinely is worth unifying —
      just a reason to read the joke first.
    </p>
  `,
  steps: [
    clientCredentials,
    deviceCode,
    sso,
    onBehalfOf,
    crossAppAccess,
    deprecatedGrants,
  ],
};
