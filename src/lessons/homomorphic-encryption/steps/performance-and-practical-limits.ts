import type { Step } from "../../../types";

export const performanceAndPracticalLimits: Step = {
  id: "performance-and-practical-limits",
  title: "The Price of the Glovebox — Performance & Practical Limits",
  prose:
    "<p>None of this is free. Fully homomorphic encryption is dramatically slower than computing on plaintext directly — historically many orders of magnitude slower, though modern schemes and hardware acceleration have narrowed that gap considerably for specific workloads. Bootstrapping in particular is expensive, and ciphertexts themselves are far larger than the plaintexts they encrypt, so both computation time and data size balloon compared to an unencrypted equivalent.</p>" +
    "<p>That cost shapes how FHE actually gets used in production today: not as a general-purpose replacement for ordinary computation, but selectively, for specific, well-bounded operations on data sensitive enough, and infrastructure untrusted enough, to justify the overhead. Small, fixed circuits — a sum, a comparison, a small neural network's inference pass — are practical today. An entire general-purpose application running fully homomorphically, end to end, mostly isn't yet.</p>" +
    "<p>In practice, FHE is one tool among several in the broader field of confidential computing, often combined with the alternatives from the next step rather than used alone.</p>",
  bullets: [
    "FHE is many orders of magnitude slower than plaintext computation, though the gap narrows for narrow, well-optimized workloads",
    "Ciphertexts are far larger than the plaintexts they encrypt — both compute and storage/bandwidth costs balloon",
    "Bootstrapping is the single most expensive operation in most FHE schemes",
    "Used selectively today: small, well-bounded computations on data sensitive enough to justify the cost, not general-purpose application logic",
    "Real libraries exist and are improving fast: Microsoft SEAL, IBM HElib, Zama's TFHE/Concrete, Google's FHE transpiler",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Plaintext computation</div>
        <div class="node-sub">fast, cheap — but the computing party sees everything</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Homomorphic computation</div>
        <div class="node-sub">orders of magnitude slower — but the computing party sees nothing</div>
      </div>
    </div>
    <p class="diagram-note">
      The entire value proposition is trading raw performance for a computing
      party that can be fully untrusted. Whether that trade is worth it
      depends entirely on how sensitive the data is and how little you trust
      the infrastructure running the computation.
    </p>
  `,
};
