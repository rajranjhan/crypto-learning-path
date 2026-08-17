import type { Step } from "../../../types";
import { OAUTH_ACTORS } from "../../actors";

export const deprecatedGrants: Step = {
  id: "deprecated-grants",
  title: "Shortcuts the Carnival Shut Down — Deprecated Grants",
  prose:
    "<p>Two more ways to get a ticket used to exist. Both are retired now, and it's worth knowing why.</p>" +
    "<p>The <strong>Implicit</strong> grant skipped the private back-window redemption entirely: instead of handing you a voucher to carry back and trade quietly, the booth used to shout the actual ride ticket straight across the midway — tucked into the redirect URL, where your browser history, extensions, and anything else watching that address could read it. Skipping the back window also meant skipping the secret-word check from your first ticket purchase: whoever intercepted that shout got a fully usable ticket, no questions asked. It existed because early browser-only apps had no way to do a private exchange at all — <strong>PKCE</strong> closed that gap, so there's nothing left for Implicit to justify.</p>" +
    "<p>The <strong>Resource Owner Password Credentials</strong> grant skipped the booth altogether: the app itself would ask you for your actual membership password and carry it to the booth on your behalf. That's precisely the hand-off OAuth's whole design exists to prevent — the app was never supposed to see your credentials at all. It also trains you to type your password into any app that asks nicely, which is exactly the habit phishing depends on, and it gives the booth no way to tell a legitimate app from a convincing fake asking the same way.</p>" +
    "<p>Modern guidance (OAuth 2.1) formally removes both. Authorization Code + PKCE now covers every case Implicit used to justify — including plain browser apps — and there's no scenario where handing your password to an app instead of the booth is the right call.</p>",
  bullets: [
    "Implicit grant: returned the access token directly in the redirect URL fragment — no private exchange, no secret-word-equivalent proof of possession",
    "Implicit existed only because early public clients (single-page apps) couldn't do a back-channel exchange; PKCE removed that limitation",
    "Resource Owner Password Credentials (ROPC): the app collects your actual username and password directly — exactly what OAuth's booth hand-off exists to avoid",
    "ROPC trains users to trust password prompts inside random apps, and gives the authorization server no way to distinguish the real app from a phishing clone",
    "OAuth 2.1 formally removes both grants — use Authorization Code + PKCE for anything involving a user",
  ],
  sequence: {
    actors: OAUTH_ACTORS,
    messages: [
      { from: "client", to: "as", label: "Authorization request (Implicit grant, deprecated)" },
      { from: "as", to: "client", label: "⚠ access_token returned directly in the redirect URL fragment", highlight: true },
      { from: "client", to: "client", label: "Anything watching the URL — history, extensions, referrers — can read it", highlight: true },
    ],
  },
};
