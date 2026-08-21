import type { Step } from "../../../types";

export const trustStores: Step = {
  id: "trust-stores",
  title: "Where 'Already Trusted' Actually Comes From",
  prose:
    "<p>The previous step ended the chain by reaching a certificate already in the client's <strong>trust store</strong> — a curated set of root CA certificates, shipped with an operating system or browser. Getting a root added to a major trust store isn't automatic: it requires the CA to pass an independent, recurring audit against published standards (the CA/Browser Forum's Baseline Requirements are the industry standard), and any browser or OS vendor can remove a root that stops meeting the bar — which is exactly what happened to a real CA, covered in a later step.</p>" +
    "<p>A <strong>self-signed certificate</strong> — one that signs itself, with no CA in the chain at all — sits outside this entire system. It's not invalid math; the signature checks out fine. It's just that nobody independent is vouching for the identity claim, which means anyone can generate one claiming to be anyone. Self-signed certificates are legitimate for local development or an internal system where you control both ends and distribute trust manually, but presenting one on a public production service means every visitor either gets a trust warning or has to manually decide to trust an unverified claim — training users to click through exactly the warning that's supposed to protect them.</p>",
  bullets: [
    "A trust store is a curated set of root CA certificates, shipped with an OS or browser",
    "Getting a root added requires passing an independent, recurring audit against published industry standards",
    "A browser or OS vendor can remove a root that stops meeting the bar, distrusting every certificate that chains to it",
    "A self-signed certificate has mathematically valid signatures but no independent party vouching for the identity claim",
    "Self-signed certs are fine for local dev or internal systems you fully control; on a public service they train users to click through trust warnings",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">CA-signed certificate</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Chains to an audited, pre-installed root<br>
          Identity claim independently vetted<br>
          No trust warning
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Self-signed certificate</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Signs itself — mathematically valid<br>
          No independent vetting of the identity claim<br>
          Trust warning, or manual trust decision required
        </div>
      </div>
    </div>
    <p class="diagram-note">
      The math is identical in both cases. What differs is entirely who's
      willing to vouch for the identity — nobody, or an audited CA.
    </p>
  `,
};
