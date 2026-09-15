import type { Figure } from "../types";

export const oauthSequenceFigure: Figure = {
  variant: "wide",
  body: `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Course step</th>
          <th>Focus</th>
          <th>Core question</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>OAuth 1 — Fundamentals</th>
          <td>Actors, delegated authorization, access tokens, authorization code + PKCE, bearer tokens, refresh tokens</td>
          <td>How does an app get permission to call an API without receiving the user's password?</td>
        </tr>
        <tr>
          <th>OAuth 2 — Tokens, Claims &amp; Security</th>
          <td>Scopes, claims, audience, token theft, sender-constrained tokens, mTLS, DPoP, confused deputy, OAuth vs OIDC</td>
          <td>What exactly does a token say, who is it for, and how do we stop replay?</td>
        </tr>
        <tr>
          <th>OAuth 3 — Flows &amp; Federation</th>
          <td>Authorization code + PKCE, client credentials, device authorization, delegation, SSO/federation, deprecated grants</td>
          <td>Which flow fits this client, user, and trust boundary?</td>
        </tr>
      </tbody>
    </table>
  `,
  caption: "The three OAuth lessons build one mini-course: fundamentals first, token security second, flow selection and federation third.",
};

export const oauthActorMappingFigure: Figure = {
  variant: "wide",
  body: `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Protocol role</th>
          <th>Carnival label</th>
          <th>What it means</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Resource Owner</th>
          <td>You, the guest</td>
          <td>The person or entity that can grant access to a protected resource.</td>
        </tr>
        <tr>
          <th>Client</th>
          <td>The app, dispenser, kiosk, or service asking for a ticket</td>
          <td>The software requesting delegated access. It may act for a user or for itself.</td>
        </tr>
        <tr>
          <th>Authorization Server</th>
          <td>Ticket booth or Guest Services</td>
          <td>The system that authenticates as needed, asks for consent or applies policy, and issues tokens.</td>
        </tr>
        <tr>
          <th>Resource Server</th>
          <td>Ride gate, photo kiosk, or API</td>
          <td>The API that validates the token and decides whether a specific request is allowed.</td>
        </tr>
      </tbody>
    </table>
  `,
  caption: "The carnival labels stay friendly, but the protocol roles stay stable across all OAuth flows.",
};
