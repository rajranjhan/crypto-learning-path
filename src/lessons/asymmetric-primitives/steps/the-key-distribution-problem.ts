import type { Step } from "../../../types";

export const theKeyDistributionProblem: Step = {
  id: "the-key-distribution-problem",
  title: "The Problem Only a Different Kind of Math Can Solve",
  prose:
    "<p>The previous lesson covered AES, SHA, and HMAC — fast, well-understood tools, all built around one assumption: both sides already share a secret key. That assumption is the entire problem. Handing a symmetric key to someone over a channel an attacker might be watching defeats the point of encrypting anything with it afterward.</p>" +
    "<p>Encryption Basics introduced the two metaphors for solving this without ever transmitting the secret directly: a padlock anyone can snap shut but only one key opens, and paint mixed together in a way that can't be un-mixed. This lesson gets concrete. The padlock is <strong>RSA</strong>, built on how hard it is to factor the product of two large primes. The paint-mixing is <strong>Diffie-Hellman</strong> and its modern variant, <strong>ECC (Elliptic Curve Cryptography)</strong>, built on how hard it is to reverse a specific kind of repeated multiplication. Both show up by name in the TLS lessons ahead — RSA and ECDSA sign the Certificate and CertificateVerify messages; ECDHE derives the shared secret itself.</p>" +
    "<p>One more idea earns its own step here: signatures work by running the padlock in reverse. Encryption uses the public key to lock and the private key to unlock, keeping something secret. A signature uses the private key to lock and the public key to unlock, proving who produced it — anyone can check a signature, but only the key holder could have made one.</p>",
  bullets: [
    "Symmetric encryption (the previous lesson) is fast but assumes a shared key already exists — asymmetric cryptography solves how to get one there safely",
    "RSA: a padlock built on how hard it is to factor the product of two large primes",
    "Diffie-Hellman / ECC: paint-mixing built on how hard it is to reverse a specific repeated operation",
    "Signatures flip the padlock: the private key locks (signs), the public key unlocks (verifies) — proving origin instead of hiding content",
    "RSA, ECDHE, and ECDSA all appear by name in the TLS lessons ahead",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Encryption</div>
        <div class="node-sub">public key locks 🔒, private key unlocks 🔓 — keeps a message secret</div>
      </div>
      <div class="node node-proxy" style="flex: 1;">
        <div class="node-title">Signing</div>
        <div class="node-sub">private key locks ✍️, public key unlocks ✅ — proves who sent it</div>
      </div>
    </div>
    <p class="diagram-note">
      Same key pair, opposite direction. Keep this distinction in mind for
      the rest of the lesson — RSA and ECC both do each job, but never at
      the same time with the same operation.
    </p>
  `,
};
