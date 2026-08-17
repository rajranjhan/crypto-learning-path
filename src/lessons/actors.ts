import type { SequenceActor } from "../types";

// Shared actor sets so the lifelines line up identically across every step of a
// lesson. Steps import these instead of redeclaring actors inline — that keeps
// the diagrams consistent step-to-step (same columns, same icons, same order).

/** Client ↔ Server, used by every mTLS step. */
export const MTLS_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻" },
  { id: "server", label: "Server", icon: "🖥️" },
];

/**
 * Client (App) → Authorization Server → Resource Server, used by every OAuth step.
 * The parentheticals carry the carnival-ride metaphor from the opening steps all
 * the way through the flows: the Authorization Server is the ticket booth that
 * sells you a ticket, and the Resource Server is the Ferris wheel you redeem it at.
 */
export const OAUTH_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client (App)", icon: "💻" },
  { id: "as", label: "Authorization Server (Ticket Booth)", icon: "🎫" },
  { id: "rs", label: "Resource Server (Ferris Wheel)", icon: "🎡" },
];

/**
 * Same three actors, plus You (the human) as a fourth, separate from the App.
 * Only used by steps that actually involve a human logging in and consenting —
 * once a step is purely app-to-server token plumbing, the plain OAUTH_ACTORS
 * three-actor set is accurate on its own and a fourth unused column would just
 * be clutter.
 */
export const OAUTH_ACTORS_WITH_USER: SequenceActor[] = [
  { id: "user", label: "You", icon: "🧑" },
  { id: "client", label: "App", icon: "💻" },
  { id: "as", label: "Authorization Server (Ticket Booth)", icon: "🎫" },
  { id: "rs", label: "Resource Server (Ferris Wheel)", icon: "🎡" },
];
