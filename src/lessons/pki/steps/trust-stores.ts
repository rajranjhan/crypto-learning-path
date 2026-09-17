import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const trustStores: Step = {
  id: "trust-stores",
  glossary: lessonTerms("trust anchor"),
  title: "Trust Stores — Root Anchors",
  prose:
    "<p>You never verify the government printing office's seal itself, each time, from scratch — you just trust it by default because it's foundational, the same way you already carry, in your wallet, a small list of master seals accepted under your local trust policy. That list is your <strong>trust store</strong>: a curated set of root CA certificates, shipped with an operating system or browser. Each trusted root in that list acts as a <strong>trust anchor</strong>.</p>" +
    "<p>The previous step ended the chain by reaching a certificate already in that trust store. Getting a root added to a major trust store isn't automatic: it requires the CA to pass an independent, recurring audit against published standards (the CA/Browser Forum's Baseline Requirements are the industry standard), and any browser or OS vendor can remove a root that stops meeting the bar — which is exactly what happened to a real CA, covered in a later step.</p>" +
    "<p>A <strong>self-signed certificate</strong> — one that signs itself, with no CA in the chain at all — sits outside this entire system. It's not invalid math; the signature checks out fine. It's just that nobody independent is vouching for the identity claim, which means anyone can generate one claiming to be anyone. Self-signed certificates are legitimate for local development or an internal system where you control both ends and distribute trust manually, but presenting one on a public production service means every visitor either gets a trust warning or has to manually decide to trust an unverified claim — training users to click through exactly the warning that's supposed to protect them.</p>",
  bullets: [
    "A trust store is your wallet's small list of master seals — a curated set of root CA certificates, shipped with an OS or browser",
    "A trust anchor is locally accepted key and identity information, commonly stored as a root certificate",
    "Getting a root added requires passing an independent, recurring audit against published industry standards",
    "A browser or OS vendor can remove a root that stops meeting the bar, distrusting every certificate that chains to it",
    "A self-signed certificate has mathematically valid signatures but no independent party vouching for the identity claim",
    "Self-signed certs are fine for local dev or internal systems you fully control; on a public service they train users to click through trust warnings",
  ],
  takeaway: "Self-signed certs are fine for local dev or internal systems you fully control; on a public service they train users to click through trust warnings.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">CA-signed certificate</div>
        <div class="node-sub left">audited root; vetted identity</div>
      </div>
      <div class="node equal">
        <div class="node-title">Self-signed certificate</div>
        <div class="node-sub left">self-signed; manual trust</div>
      </div>
    </div>
    <p class="diagram-note">
      The math is identical in both cases. What differs is entirely who's
      willing to vouch for the identity — nobody, or an audited CA.
    </p>
  `,
  },
};
