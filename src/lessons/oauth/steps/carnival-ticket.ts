import type { Step } from "../../../types";

export const carnivalTicket: Step = {
  id: "carnival-ticket",
  title: "A Token You Already Know — The Carnival Ride Ticket",
  prose:
    "You've held a bearer token in real life: the ride ticket you buy at a " +
    "carnival or festival. You pay at a booth, get a little paper stub, and later " +
    "hand it over for a ride. Run it through the same six properties and you'll see " +
    "it's a textbook bearer token — powerful because it's simple, but with almost " +
    "none of the safety guarantees a real security token needs. That gap is exactly " +
    "what the rest of this lesson closes.",
  bullets: [
    "One use, or reusable? (Redemption Model) — Scoped: good for one item; one ticket, one ride",
    "What does it actually let you do? (Authorization) — Bearer: whoever holds the ticket gets the ride",
    "Where'd it come from, and why do you believe that? (Issuer Trust) — Implicit: trust is based on proximity & context (you're at the booth)",
    "How long does it work? (Validity Window) — None: the ticket works for as long as it's accepted",
    "Can it be cancelled early? (Revocation) — None: no way to invalidate a lost/stolen ticket; the booth can only refuse service",
    "Does holding it prove it's yours? (Proof of Possession) — None: no enforced relationship between the buyer and whoever redeems it",
  ],
  diagram: `
    <img class="diagram-img" src="diagrams/carnival-ticket.png"
         alt="A carnival RIDE ticket (No. 5606, stub 02) with the same six token properties radiating out, each filled in with the ticket's weak answer: Issuer Trust Implicit, Authorization Bearer, Redemption Model Scoped, Validity Window None, Revocation None, Proof of Possession None." />
    <p class="diagram-note">
      The ticket sits where <strong>TOKEN</strong> sat in the previous diagram, and
      each property is in the same spot — so you can read the abstract idea and its
      carnival counterpart side by side. Notice how many answers are
      <em>None</em>: that's what makes a plain bearer token risky, and why the
      upcoming steps add proof of possession and revocation.
    </p>
  `,
};
