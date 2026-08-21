import type { Step } from "../../../types";

export const partialVsFullyHomomorphic: Step = {
  id: "partial-vs-fully-homomorphic",
  title: "How Much Can You Do Inside the Box? — Partial, Somewhat & Fully Homomorphic",
  prose:
    "<p>Not every homomorphic scheme lets you do everything through the gloves. There's a real spectrum, and where a scheme sits on it decides what it's actually useful for.</p>" +
    "<p><strong>Partially Homomorphic Encryption (PHE)</strong> supports exactly one operation, but an unlimited number of times. RSA, unmodified, is multiplicatively homomorphic: multiply two RSA ciphertexts together and you get the ciphertext of the product of the two plaintexts. Paillier, in the next step, is additively homomorphic in exactly the same way, but for addition. Either one is fast and well understood, but genuinely limited — a scheme that only adds can't multiply, and vice versa.</p>" +
    "<p><strong>Somewhat Homomorphic Encryption (SHE)</strong> supports both addition and multiplication — enough, in principle, to compute anything, since AND/OR/NOT logic gates can all be built from addition and multiplication over the right structure. The catch is a budget: only a limited number of operations, especially multiplications, before the scheme stops decrypting correctly.</p>" +
    "<p><strong>Fully Homomorphic Encryption (FHE)</strong> removes that budget entirely — arbitrary computation, arbitrary depth, unlimited additions and multiplications, on encrypted data. It took until 2009 for anyone to construct one; the next two steps cover exactly why that budget existed, and how it finally got removed.</p>",
  bullets: [
    "Partially Homomorphic (PHE): one operation only (addition OR multiplication), unlimited times — RSA (×) and Paillier (+) are classic examples",
    "Somewhat Homomorphic (SHE): both addition and multiplication, but only a limited number of operations before it breaks",
    "Fully Homomorphic (FHE): both operations, unlimited depth — arbitrary computation on ciphertext",
    "Addition and multiplication together are enough to build any computation — the same reason logic gates (AND/OR/NOT) can be built from them",
    "The first FHE construction wasn't published until 2009 (Craig Gentry) — the gap between SHE and FHE was a genuinely open problem for decades",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Partial (PHE)</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          One operation, unlimited times<br>
          Fast, well understood<br>
          e.g. RSA (×), Paillier (+)
        </div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Somewhat (SHE)</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          + and × together, but a limited budget<br>
          Enough for small, fixed computations<br>
          Breaks past a depth limit
        </div>
      </div>
      <div class="node node-proxy" style="flex: 1;">
        <div class="node-title">Fully (FHE)</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          + and ×, unlimited depth<br>
          Arbitrary computation on ciphertext<br>
          First built in 2009
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Each tier to the right removes a limitation of the one before it, at
      the cost of more overhead — the same tradeoff curve this whole lesson
      keeps returning to.
    </p>
  `,
};
