import type { Step } from "../../../types";

export const tokenProperties: Step = {
  id: "token-properties",
  title: "What Is a Token, Really? Six Properties",
  prose:
    "Hand someone a coat-check stub and they instantly know the rules: this piece " +
    "of paper gets your coat back, and only this piece of paper. That instinct is " +
    "exactly what a token is, stripped down to its behavior. Before OAuth flows and " +
    "JWTs, it helps to step back and ask what a token even is. A token isn't " +
    "defined by what it looks like — a random string, a signed JWT, an opaque " +
    "handle — but by how it behaves. Six properties capture that behavior, and " +
    "every token design (bearer tokens, certificate-bound tokens, DPoP) is really " +
    "just a different set of answers to these six questions. Keep them in mind: " +
    "the rest of this lesson tightens each one, one at a time.",
  bullets: [
    "Where'd it come from, and why do you believe that? (Issuer Trust)",
    "What does it actually let you do? (Authorization)",
    "One use, or reusable? (Redemption Model)",
    "Does holding it prove it's yours? (Proof of Possession)",
    "How long does it work? (Validity Window)",
    "Can it be cancelled early? (Revocation)",
  ],
  diagram: `
    <img class="diagram-img" src="diagrams/token-properties.png"
         alt="A central TOKEN with six properties radiating out: Issuer Trust, Authorization, Redemption Model, Proof of Possession, Validity Window, and Revocation." />
    <p class="diagram-note">
      These six properties are the lens for the whole lesson. As we move from
      bearer tokens to certificate-bound tokens to DPoP, watch how each design
      answers <em>Proof of Possession</em> and <em>Revocation</em> differently —
      that's where most of the security difference lives.
    </p>
  `,
};
