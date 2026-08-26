import type { Step } from "../../../types";
import { PKI_ACTORS } from "../../actors";

export const chainValidation: Step = {
  id: "chain-validation",
  title: "The Trust Chain = Following the Paper Trail",
  prose:
    "<p>When you receive the bank's ID card, you're not just looking at one stamp — you're following a chain of stamped authorizations: the bank's card, stamped by a regional notary branch, whose own authority was stamped by the root government, whose seal is already sitting in your trusted list. If every link in that paper trail checks out, you trust the card — even though you've never met the bank, the regional notary, or verified the root government yourself today. That unbroken links-in-a-chain structure is exactly what \"chain of trust\" means.</p>" +
    "<p>The server sends its leaf certificate and, typically, the intermediate that signed it — the client usually already has the root, so it doesn't need to be sent. Validation walks the chain from the leaf upward, checking several things at every single link, not just the signatures.</p>" +
    "<p>First, the signature check: does the issuer's public key correctly verify the signature on the certificate below it? Second, the hostname check: does the leaf certificate's SAN field actually list the hostname the client is trying to reach — a perfectly valid, correctly signed certificate for the wrong domain is still a failure. Third, the validity window: is today's date within every certificate's Not Before / Not After range, all the way up the chain — an expired intermediate breaks the whole chain even if the leaf itself hasn't expired. Finally, the client keeps walking up, verifying each signature against the next certificate's public key, until it reaches a certificate already present in its own trust store — at that point, and only at that point, the chain is trusted.</p>" +
    "<p>If any single link fails — a bad signature, a hostname mismatch, an expired certificate anywhere in the chain, or reaching a root that isn't in the trust store — the whole chain is rejected. This is exactly what produces the certificate warning a browser shows: it's reporting precisely which of these checks failed.</p>",
  bullets: [
    "Chain of trust = a paper trail of stamped authorizations, followed from the card in hand up to a seal already in your trusted list",
    "The server sends its leaf certificate plus (usually) the intermediate that signed it — the root is assumed already present locally",
    "Signature check: does each issuer's public key correctly verify the certificate below it, all the way up the chain?",
    "Hostname check: does the leaf's SAN field list the hostname actually being requested?",
    "Validity check: is today's date within every certificate's window, at every link — not just the leaf",
    "The chain is trusted only once it reaches a certificate already present in the client's own trust store",
    "Any single failed check anywhere in the chain rejects the whole thing — this is what a browser's certificate warning is reporting",
  ],
  sequence: {
    actors: PKI_ACTORS,
    messages: [
      { from: "server", to: "client", label: "Leaf certificate + intermediate certificate", note: "sent during the handshake — the root is not sent" },
      { from: "client", to: "client", label: "Verify signatures up the chain, hostname, and validity dates", note: "walks leaf → intermediate → root, checking every link", highlight: true },
      { from: "client", to: "client", label: "Root already present in the local trust store?", note: "if yes, the chain is trusted; if any check fails anywhere, it's rejected", highlight: true },
    ],
  },
};
