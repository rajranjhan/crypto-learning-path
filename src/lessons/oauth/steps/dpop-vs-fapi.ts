import type { Step } from "../../../types";

export const dpopVsFapi: Step = {
  id: "dpop-vs-fapi",
  title: "DPoP vs mTLS — Same Goal, Different Layer",
  prose:
    "Two ways to keep a stolen ticket useless: clamp a wristband on the rider, or " +
    "make them sign their name at the gate. You've now met both, so it's worth " +
    "putting them side by side. FAPI's certificate-bound tokens (mTLS, RFC 8705) " +
    "and DPoP (RFC 9449) chase the exact same goal: make a stolen token useless on " +
    "its own by binding it to something only the rightful client holds. The " +
    "difference is where the binding lives. mTLS works down at the transport layer " +
    "— it binds the token to a client certificate on the TLS connection itself, " +
    "which is strong but means every party needs certificates in place. DPoP works " +
    "up at the application layer — the client attaches a small signed proof in an " +
    "HTTP header, so it rides over ordinary TLS with no certificate infrastructure. " +
    "Both record a thumbprint in the token and both demand proof of the matching " +
    "key at the API; they simply pay for it in different ways.",
  bullets: [
    "Same goal — bind the token to its owner so a stolen token alone is worthless",
    "mTLS binds at the transport layer using a client certificate (needs certs everywhere)",
    "DPoP binds at the application layer using a signed proof JWT (works over ordinary TLS)",
    "Either way, the API checks a thumbprint and demands proof you hold the bound key",
  ],
  diagram: `
    <img class="diagram-img" src="/diagrams/dpop-vs-fapi.png"
         alt="A comparison diagram. A single hub, 'Bind the token to its owner,' forks into two columns. Left: mTLS, the FAPI way (RFC 8705), at the transport layer — credential is a client certificate, binding is the certificate's thumbprint, cost is client certs everywhere. Right: DPoP, the app-layer way (RFC 9449), at the application layer — credential is a signed proof JWT, binding is the public key's thumbprint, cost is none extra beyond ordinary TLS. A shared footer reads: either way, holding the token isn't enough; you must prove you hold the bound key." />
    <p class="diagram-note">
      Read the two columns in parallel, row by row: both start from the same goal
      and both end at the same guarantee — <em>holding the token isn't enough</em>.
      The only real trade-off is the layer, and with it the deployment cost: mTLS
      asks for certificates everywhere, DPoP asks for nothing beyond ordinary TLS.
    </p>
  `,
};
