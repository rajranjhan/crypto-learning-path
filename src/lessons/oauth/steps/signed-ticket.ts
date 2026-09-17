import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const signedTicket: Step = {
  id: "signed-ticket",
  glossary: lessonTerms("proof of possession"),
  title: "DPoP Signed Tickets — Proof of Possession",
  prose:
    "<p>Imagine a ride ticket that names a verification key. At the gate, the holder signs a fresh request with the matching private key. The attendant verifies that signature against the bound public key rather than comparing it with an old signature.</p>" +
    "<p>DPoP applies this idea to OAuth tokens: the client proves control of the bound key for a request. It does not establish the user's identity or add permissions; the API still checks the token's audience, scope, and other authorization rules.</p>",
  bullets: [
    "What does it actually let you do? (Authorization) — The token's granted permissions still apply; DPoP does not add access",
    "Must the presenter prove control of a bound key? (Proof of Possession) — Enforced: verify a fresh proof using the public key bound to the token",
    "How long does it work? (Validity Window) — Per ride: each fresh signature is good for this one gate, right now; old ones expire (htm/htu + iat)",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: unchanged; you still buy it at the booth",
    "One use, or reusable? (Redemption Model) — Token reuse follows its policy; each request needs a fresh proof",
    "Can it be cancelled early? (Revocation) — Still limited: no kill switch, but a stolen ticket is useless without your hand",
  ],
  takeaway: "DPoP requires a fresh proof of the bound key; it does not establish user identity or expand authorization.",
  figure: {
    body: `
    <div class="flow"><div class="node equal client"><div class="node-title">Authorization: granted API permissions</div></div><div class="node equal server"><div class="node-title">Presentation: token plus fresh proof of the bound key</div></div></div>
    <p class="diagram-note">Verify the proof with the bound public key, not by matching signature bytes.</p>
  `,
  },
};
