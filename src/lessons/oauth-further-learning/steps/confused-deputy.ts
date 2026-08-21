import type { SequenceActor, Step } from "../../../types";

// Local to this step: it's making a protocol-agnostic point before narrowing
// to OAuth, so the usual OAUTH_ACTORS (Client/AS/RS) don't fit — this needs
// its own generic deputy/target/outsider lifeline.
const DEPUTY_ACTORS: SequenceActor[] = [
  { id: "vendor", label: "Vendor (outsider)", icon: "🚚" },
  { id: "attendant", label: "Gate Attendant (the deputy)", icon: "🗝️" },
  { id: "vault", label: "Vault (the real target)", icon: "🔐" },
];

export const confusedDeputy: Step = {
  id: "confused-deputy",
  title: "The Confused Deputy Problem — Valid Credentials, Wrong Purpose",
  prose:
    "<p>Picture a gate attendant at the carnival holding a master key that opens every door on the lot. A vendor hands over a delivery pass — completely genuine, properly issued, meant only for the supply entrance. If the attendant doesn't check which door that specific pass was actually issued for, and just reaches for the master key because a plausible-looking pass was shown, the vendor can walk it right up to the vault instead. The pass wasn't forged. The attendant wasn't lied to. Nobody checked <em>which door this was for</em>.</p>" +
    "<p>That's the <strong>confused deputy problem</strong>: any time a service (the \"deputy\") holds more authority than whoever is asking it to act, and the service can't tell whether this specific request was actually meant to use that authority, an attacker can borrow it — without stealing a single thing.</p>" +
    "<p>It's not just a cute analogy — it's a named, real-world class of bug. In 1988, Norm Hardy coined the term after seeing a shared compiler service overwrite a protected billing log. The compiler had its own private authority to write output files, separate from the much narrower authority of whoever asked it to compile something. A user simply asked it to write its output to a file — and named that file the billing log. The compiler, using <em>its own</em> broad authority rather than the caller's narrow one, dutifully overwrote it. Nothing was stolen. No credential was forged. The compiler was just never asked to check whose authority it was actually supposed to be using — exactly the attendant reaching for the master key.</p>" +
    "<p>OAuth has the identical shape of risk, with the resource server playing the attendant. A resource server's job is to accept any request bearing a validly-signed access token — that check <em>is</em> its master key, and it applies the same way no matter who's asking. An access token is the delivery pass: genuine, properly issued by the authorization server, correctly signed, not expired — but minted for one specific API, not every API in the realm. If a resource server checks only that the signature is valid and skips checking which API the token was actually issued for, a token minted for one low-stakes API works just as well against a completely different, more sensitive one. Nothing was stolen; the token is entirely real — the resource server just never checked whether it was the door this pass was meant for. Closing that exact gap has a name: audience restriction — up next.</p>",
  bullets: [
    "A gate attendant holding a master key doesn't check which door a genuine, properly-issued pass was meant for — and lets it open the vault instead",
    "The confused deputy problem: a service (the \"deputy\") with more authority than its caller, acting without checking whether this request was meant to use that authority",
    "Coined 1988 (Norm Hardy): a compiler service's own file-write authority — not the caller's — overwrote a file the caller had no right to touch",
    "In OAuth: the resource server is the deputy, an access token is the pass — a valid signature is checked, but not always which API the token was actually meant for",
    "Nothing is stolen or forged either way — every credential involved is completely legitimate; the deputy is just confused about scope",
    "That's what separates it from bearer-token theft: theft requires stealing something, a confused deputy attack only requires an authority check nobody added",
  ],
  sequence: {
    actors: DEPUTY_ACTORS,
    messages: [
      { from: "vendor", to: "attendant", label: "Shows a genuine delivery pass — issued only for the supply entrance" },
      { from: "attendant", to: "attendant", label: "Doesn't check which door the pass was actually issued for", note: "reaches for the master key — its own broad authority, not the pass's narrow one", highlight: true },
      { from: "attendant", to: "vault", label: "Opens the vault with the master key", highlight: true },
      { from: "vault", to: "vendor", label: "Access granted — nothing here was stolen or forged" },
    ],
  },
};
