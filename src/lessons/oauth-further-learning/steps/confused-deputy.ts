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
    "<p>Not every break-in involves stealing anything. In 1988, Norm Hardy named a pattern he'd seen in real systems: a shared compiler service had its own private authority to write to a protected billing log, separate from the much narrower authority of whoever asked it to compile something. A user simply asked the compiler to write its output to a file — and named that file the billing log. The compiler, using <em>its own</em> broad authority rather than the caller's narrow one, dutifully overwrote it. Nothing was stolen. No credential was forged. The compiler was just never asked to check whose authority it was actually supposed to be using.</p>" +
    "<p>That's the <strong>confused deputy problem</strong>: any time a service (the \"deputy\") holds more authority than whoever is asking it to act, and the service can't tell whether this specific request was actually meant to use that authority, an attacker can borrow it — without stealing a single thing.</p>" +
    "<p>Picture a gate attendant at the carnival holding a master key that opens every door on the lot. A vendor hands over a delivery pass — completely genuine, properly issued, meant only for the supply entrance. If the attendant doesn't check which door that specific pass was actually issued for, and just reaches for the master key because a plausible-looking pass was shown, the vendor can walk it right up to the vault instead. The pass wasn't forged. The attendant wasn't lied to. Nobody checked <em>which door this was for</em>.</p>" +
    "<p>OAuth has exactly this shape of risk built into it, and it has a name for the fix: audience restriction — up next.</p>",
  bullets: [
    "Coined 1988 (Norm Hardy): a compiler service's own file-write authority — not the caller's — overwrote a file the caller had no right to touch",
    "The deputy acts using its own broader authority on someone else's behalf, without checking whether this specific request was meant to use it",
    "Nothing is stolen or forged — every credential involved is completely legitimate; the deputy is just confused about scope",
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
