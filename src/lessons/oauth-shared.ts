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
          <td>Actors, delegated access, bearer tokens</td>
          <td>How does an app get limited API access?</td>
        </tr>
        <tr>
          <th>OAuth 2 — Tokens, Claims &amp; Security</th>
          <td>Scopes, claims, audience, replay resistance</td>
          <td>What does the token mean?</td>
        </tr>
        <tr>
          <th>OAuth 3 — Flows &amp; Federation</th>
          <td>PKCE, client credentials, device flow, federation</td>
          <td>Which flow fits?</td>
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
          <td>App, kiosk, or service</td>
          <td>Software requesting delegated access.</td>
        </tr>
        <tr>
          <th>Authorization Server</th>
          <td>Ticket booth or Guest Services</td>
          <td>Applies policy and issues tokens.</td>
        </tr>
        <tr>
          <th>Resource Server</th>
          <td>Ride gate, photo kiosk, or API</td>
          <td>Validates tokens for API requests.</td>
        </tr>
      </tbody>
    </table>
  `,
  caption: "The carnival labels stay friendly, but the protocol roles stay stable across all OAuth flows.",
};
