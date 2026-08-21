import type { Step } from "../../../types";

export const theGloveboxProblem: Step = {
  id: "the-glovebox-problem",
  title: "The Sealed Glovebox — What Homomorphic Encryption Solves",
  prose:
    "<p>Picture a jeweler who needs to cut and polish a diamond, except the work has to happen in a city you don't trust. The solution real labs use for exactly this problem is a sealed glovebox: you lock your diamond inside a transparent box fitted with built-in gloves. The jeweler works the gloves from the outside — cutting, polishing, whatever the job requires — without the box ever opening and without their hands ever touching the diamond directly. When the work is done, the sealed box comes back to you, and only you hold the key to open it and see the result.</p>" +
    "<p>That's <strong>homomorphic encryption</strong> in one image. Every lesson so far has protected data either while it was moving (TLS — data in transit) or while it was sitting still (Encryption at Rest — data at rest). Homomorphic encryption protects a third, much stranger state: data <em>while someone else is actively computing on it</em> — data in use. A cloud provider can run a real computation on your ciphertext and hand back an encrypted result, all without ever being able to see the numbers it was actually working with.</p>" +
    "<p>Why would anyone need that? Outsourcing computation to infrastructure you don't fully trust: a cloud you don't want reading medical records while it runs an analysis, a machine learning service you don't want seeing raw patient data while it produces a diagnosis, an aggregator computing a shared statistic across several companies' private data without any of them exposing their inputs to each other, or to the aggregator itself.</p>",
  bullets: [
    "TLS protects data in transit; encryption at rest protects data sitting still; homomorphic encryption protects data while it's actively being computed on — 'data in use'",
    "The computing party works entirely on ciphertext and never has, or needs, the private key",
    "The result comes back still encrypted; only the data owner can decrypt it",
    "Real motivation: outsourcing computation to infrastructure — a cloud, a third-party ML service, a cross-organization aggregator — that shouldn't see the underlying data",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">You</div>
        <div class="node-sub">🔒 lock your data in the box, keep the only key</div>
      </div>
      <div class="link">
        <div class="lock">📦</div>
        <div class="link-label">sealed box, hands through the gloves</div>
        <div class="arrow">⇄</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Untrusted Cloud</div>
        <div class="node-sub">🧤 computes through the gloves — never opens the box</div>
      </div>
    </div>
    <p class="diagram-note">
      The cloud does real work — additions, comparisons, even a whole machine
      learning model's inference pass — using only the gloves. It never sees,
      and cryptographically cannot see, what's actually inside the box.
    </p>
  `,
};
