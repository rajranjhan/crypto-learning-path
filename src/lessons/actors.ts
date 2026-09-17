import type { Sequence, SequenceActor, SequenceMessage } from "../types";

// Shared actor sets so the lifelines line up identically across every step of a
// lesson. Steps import these instead of redeclaring actors inline — that keeps
// the diagrams consistent step-to-step (same columns, same icons, same order).

/** Client ↔ Server, used by every mTLS step. */
export const MTLS_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻", role: "client" },
  { id: "server", label: "Server", icon: "🖥️", role: "server" },
];

/** Client ↔ Server, used by every TLS 1.2 and TLS 1.3 step. */
export const TLS_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻", role: "client" },
  { id: "server", label: "Server", icon: "🖥️", role: "server" },
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
  goal = "Build an authenticated encrypted channel",
): Sequence {
  const visible = all.slice(0, through);
  const highlighted = visible.slice(Math.max(0, visible.length - highlightCount));
  const next = all[through];
  return {
    actors,
    progress: {
      goal,
      already: visible.slice(0, Math.max(0, visible.length - highlightCount)).map((m) => m.label),
      now: highlighted.map((m) => m.label).join(" + "),
      next: next?.label,
    },
    messages: visible.map((m, i) => ({
      ...m,
      highlight: i >= through - highlightCount,
    })),
  };
}

/** Full ordered message list for the TLS 1.2 handshake (9 messages across 8 steps). */
export const TLS12_MESSAGES: SequenceMessage[] = [
  { from: "client", to: "server", label: "ClientHello", note: "version, random, cipher suites, extensions" },
  { from: "server", to: "client", label: "ServerHello", note: "chosen version, random, cipher suite" },
  { from: "server", to: "client", label: "Certificate", note: "server certificate, plus the chain that vouches for it" },
  { from: "server", to: "client", label: "ServerKeyExchange", note: "ephemeral ECDH public key, signed" },
  { from: "server", to: "client", label: "ServerHelloDone", note: "\"your turn\"" },
  { from: "client", to: "server", label: "ClientKeyExchange", note: "your ephemeral ECDH public key" },
  { from: "client", to: "server", label: "ChangeCipherSpec + Finished", note: "\"from here on, I'm encrypting\"" },
  { from: "server", to: "client", label: "ChangeCipherSpec + Finished", note: "server switches to encrypted records too" },
  { from: "client", to: "server", label: "Application Data", note: "encrypted, sealed with the shared key" },
];

/** Full ordered message list for the TLS 1.3 handshake (10 messages across 10 steps). */
export const TLS13_MESSAGES: SequenceMessage[] = [
  { from: "client", to: "server", label: "ClientHello", note: "supported versions, random, cipher suites, key_share" },
  { from: "server", to: "client", label: "ServerHello", note: "chosen version, random, key_share" },
  { from: "server", to: "client", label: "ChangeCipherSpec", note: "compatibility no-op; keys already switched" },
  { from: "server", to: "client", label: "EncryptedExtensions", note: "already sealed — the envelope closed early" },
  { from: "server", to: "client", label: "Certificate", note: "server certificate, encrypted after ServerHello" },
  { from: "server", to: "client", label: "CertificateVerify", note: "proof the server holds the private key" },
  { from: "server", to: "client", label: "Finished", note: "server proof the handshake wasn't tampered with" },
  { from: "client", to: "server", label: "ChangeCipherSpec", note: "compatibility no-op; keys already switched" },
  { from: "client", to: "server", label: "Finished", note: "your proof the handshake wasn't tampered with" },
  { from: "client", to: "server", label: "Application Data", note: "your document, sealed with the shared key" },
];

/**
 * Client → Authorization Server → Resource Server, used by every OAuth step.
 * The carnival metaphor is mapped in lesson prose; the sequence lifelines keep
 * the protocol role names stable.
 */
export const OAUTH_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻", role: "client" },
  { id: "as", label: "Authorization Server", icon: "🎫", role: "trusted" },
  { id: "rs", label: "Resource Server", icon: "🖥️", role: "server" },
];

/**
 * Same three actors, plus the Resource Owner as a fourth, separate from the App.
 * Only used by steps that actually involve a human logging in and consenting —
 * once a step is purely app-to-server token plumbing, the plain OAUTH_ACTORS
 * three-actor set is accurate on its own and a fourth unused column would just
 * be clutter.
 */
export const OAUTH_ACTORS_WITH_USER: SequenceActor[] = [
  { id: "user", label: "Resource Owner", icon: "🧑", role: "client" },
  { id: "client", label: "Client", icon: "💻", role: "client" },
  { id: "as", label: "Authorization Server", icon: "🎫", role: "trusted" },
  { id: "rs", label: "Resource Server", icon: "🖥️", role: "server" },
];

/**
 * Client Principal → KDC/AS → KDC/TGS → Service Server, used by every Kerberos
 * step. The AS and TGS are usually part of one KDC but get separate lifelines
 * because they play distinct roles in the exchange.
 */
export const KERBEROS_ACTORS: SequenceActor[] = [
  { id: "user", label: "Client Principal", icon: "🧑", role: "client" },
  { id: "as", label: "KDC / AS", icon: "🪪", role: "trusted" },
  { id: "tgs", label: "KDC / TGS", icon: "🎟️", role: "trusted" },
  { id: "door", label: "Service Server", icon: "🖥️", role: "server" },
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

/**
 * Application ↔ Database/Storage Engine ↔ Key Management Service, used by the
 * Encryption at Rest lesson's sequence diagrams. Continues the TLS lessons'
 * bank metaphor one step further: TLS seals the document while it crosses the
 * mailroom, and these three actors are what protects it once it's filed away.
 */
export const REST_ACTORS: SequenceActor[] = [
  { id: "app", label: "Application", icon: "💻", role: "client" },
  { id: "db", label: "Database / Storage Engine", icon: "🗄️", role: "server" },
  { id: "kms", label: "Key Management Service", icon: "🔐", role: "trusted" },
];

/**
 * Data Owner ↔ Untrusted Cloud, used by the Homomorphic Encryption lesson.
 * Carries the lesson's own "sealed glovebox" metaphor: the owner locks data
 * inside, the cloud works it through the gloves, and the box never opens.
 */
export const HE_ACTORS: SequenceActor[] = [
  { id: "owner", label: "Data Owner", icon: "🧑", role: "client" },
  { id: "cloud", label: "Untrusted Cloud", icon: "☁️", role: "warning" },
];

/**
 * Peggy (Prover) ↔ Victor (Verifier), used by the Zero-Knowledge Proofs
 * lesson. Peggy/Victor is the standard naming convention in the ZKP
 * literature, going back to the "Ali Baba's cave" explanation this lesson
 * opens with.
 */
export const ZKP_ACTORS: SequenceActor[] = [
  { id: "prover", label: "Peggy (Prover)", icon: "🙋", role: "client" },
  { id: "verifier", label: "Victor (Verifier)", icon: "🕵️", role: "server" },
];

/**
 * Client ↔ Server ↔ Certificate Authority, used by the PKI lesson's sequence
 * diagrams. The notary metaphor is mapped in lesson prose, but lifelines keep
 * the protocol role names stable.
 */
export const PKI_ACTORS: SequenceActor[] = [
  { id: "client", label: "Client", icon: "💻", role: "client" },
  { id: "server", label: "Server", icon: "🖥️", role: "server" },
  { id: "ca", label: "Certificate Authority", icon: "🏛️", role: "trusted" },
];
