import type { Sequence, SequenceActor, SequenceMessage } from "../types";

// Shared actor sets so the lifelines line up identically across every step of a
// lesson. Steps import these instead of redeclaring actors inline — that keeps
// the diagrams consistent step-to-step (same columns, same icons, same order).

/** Client ↔ Server, used by every mTLS step. */
export const MTLS_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻" },
  { id: "server", label: "Server", icon: "🖥️" },
];

/**
 * Browser/client ↔ The Bank, used by every TLS 1.2 and TLS 1.3 step. Matches
 * the "BANK" label in the tls-mailroom diagram so the per-step swim lanes and
 * the lesson's opening metaphor stay visually consistent.
 */
export const TLS_ACTORS: SequenceActor[] = [
  { id: "client", label: "Browser/client", icon: "💻" },
  { id: "server", label: "The Bank", icon: "🏦" },
];

/**
 * Builds the sequence diagram for a given step of a handshake: every message
 * up through `through` (1-indexed, inclusive) from the lesson's full message
 * list, with the last `highlightCount` of them emphasized as this step's
 * contribution. This is what makes the diagrams "build up" step by step —
 * each step shows the whole conversation so far, not just its own message.
 */
export function buildSequence(
  actors: SequenceActor[],
  all: SequenceMessage[],
  through: number,
  highlightCount = 1,
): Sequence {
  return {
    actors,
    messages: all.slice(0, through).map((m, i) => ({
      ...m,
      highlight: i >= through - highlightCount,
    })),
  };
}

/** Full ordered message list for the TLS 1.2 handshake (9 messages across 8 steps). */
export const TLS12_MESSAGES: SequenceMessage[] = [
  { from: "client", to: "server", label: "ClientHello", note: "version, random, cipher suites, extensions" },
  { from: "server", to: "client", label: "ServerHello", note: "chosen version, random, cipher suite" },
  { from: "server", to: "client", label: "Certificate", note: "the bank's ID, plus the chain that vouches for it" },
  { from: "server", to: "client", label: "ServerKeyExchange", note: "ephemeral ECDH public key, signed" },
  { from: "server", to: "client", label: "ServerHelloDone", note: "\"your turn\"" },
  { from: "client", to: "server", label: "ClientKeyExchange", note: "your ephemeral ECDH public key" },
  { from: "client", to: "server", label: "ChangeCipherSpec + Finished", note: "\"from here on, I'm encrypting\"" },
  { from: "server", to: "client", label: "ChangeCipherSpec + Finished", note: "the bank locks up too" },
  { from: "client", to: "server", label: "Application Data", note: "encrypted, sealed with the shared key" },
];

/** Full ordered message list for the TLS 1.3 handshake (10 messages across 10 steps). */
export const TLS13_MESSAGES: SequenceMessage[] = [
  { from: "client", to: "server", label: "ClientHello", note: "supported versions, random, cipher suites, key_share" },
  { from: "server", to: "client", label: "ServerHello", note: "chosen version, random, key_share" },
  { from: "server", to: "client", label: "ChangeCipherSpec", note: "compatibility no-op; keys already switched" },
  { from: "server", to: "client", label: "EncryptedExtensions", note: "already sealed — the envelope closed early" },
  { from: "server", to: "client", label: "Certificate", note: "the bank's ID, sealed inside the envelope" },
  { from: "server", to: "client", label: "CertificateVerify", note: "proof the bank holds the private key" },
  { from: "server", to: "client", label: "Finished", note: "the bank's proof the handshake wasn't tampered with" },
  { from: "client", to: "server", label: "ChangeCipherSpec", note: "compatibility no-op; keys already switched" },
  { from: "client", to: "server", label: "Finished", note: "your proof the handshake wasn't tampered with" },
  { from: "client", to: "server", label: "Application Data", note: "your document, sealed with the shared key" },
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

/**
 * You → the Staff House's two windows → a backstage door, used by every
 * Kerberos step. The AS and TGS are physically one building (the KDC) but get
 * separate lifelines because they play distinct roles in the exchange — the
 * same way real Kerberos message flows are drawn. Carries the lesson's
 * "backstage badge, not guest ticket" metaphor: OAuth's actors sell guests a
 * ride ticket; these actors badge staff through backstage doors.
 */
export const KERBEROS_ACTORS: SequenceActor[] = [
  { id: "user", label: "You (staff)", icon: "🧑" },
  { id: "as", label: "Staff House — Check-In (AS)", icon: "🪪" },
  { id: "tgs", label: "Staff House — Backstage Desk (TGS)", icon: "🎟️" },
  { id: "door", label: "Backstage Door (Service)", icon: "🚪" },
];

/**
 * Full ordered message list for one day's Kerberos exchange (AS, then TGS,
 * then AP) — 6 messages across the 3 exchange steps. Built once and sliced
 * with `buildSequence` (below) so each step shows the whole conversation so
 * far with only its own messages highlighted, the same cumulative pattern
 * TLS12_MESSAGES/TLS13_MESSAGES use.
 */
export const KERBEROS_MESSAGES: SequenceMessage[] = [
  { from: "user", to: "as", label: "AS-REQ — \"It's me, right now\"", note: "a timestamp sealed with a key derived from your password (pre-authentication)" },
  { from: "as", to: "user", label: "AS-REP — Day Badge + shift code word", note: "badge sealed with the Staff House's own master seal; code word sealed with your key" },
  { from: "user", to: "tgs", label: "TGS-REQ — Day Badge + Authenticator", note: "authenticator: a fresh timestamp sealed with the shift code word" },
  { from: "tgs", to: "user", label: "TGS-REP — Door Pass + door code word", note: "pass sealed with that door's own secret; code word sealed with your shift code word" },
  { from: "user", to: "door", label: "AP-REQ — Door Pass + Authenticator", note: "authenticator: a fresh timestamp sealed with the door code word" },
  { from: "door", to: "user", label: "AP-REP — timestamp + 1, sealed with the door code word", note: "optional: proves the door itself is genuine (mutual authentication)" },
];
