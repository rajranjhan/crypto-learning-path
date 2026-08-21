import type { Step } from "../../../types";

export const theNoiseProblem: Step = {
  id: "the-noise-problem",
  title: "Why This Took 30 Years — The Noise Problem",
  prose:
    "<p>If a purely additive scheme like Paillier already works, why did it take until 2009 to get addition <em>and</em> multiplication, unlimited, in the same scheme? The obstacle is <strong>noise</strong>.</p>" +
    "<p>Modern homomorphic schemes — almost all of them lattice-based today — don't encrypt a message cleanly. They deliberately hide it underneath a small amount of random error, because that error is exactly what makes the scheme hard to break. Decryption works by removing the noise and recovering the message underneath it, and that only works as long as the noise hasn't grown too large to tell apart from the message itself.</p>" +
    "<p>Every homomorphic operation grows that noise a little. Addition grows it modestly. Multiplication grows it multiplicatively — multiply two ciphertexts together and their noise terms multiply too, not add. Chain enough multiplications and the noise eventually overtakes the signal: decryption starts producing garbage, indistinguishable from a random wrong answer. That's the budget somewhat homomorphic encryption runs on — a fixed number of multiplications before the noise wins.</p>",
  bullets: [
    "Lattice-based schemes hide the message under a small amount of deliberate random noise — the noise is what makes the scheme hard to break",
    "Decryption works by removing that noise, as long as it hasn't grown too large to distinguish from the message",
    "Every homomorphic operation grows the noise; multiplication grows it far faster than addition",
    "Past a certain number of chained multiplications, the noise overtakes the message and decryption fails",
    "This budget is exactly what separates Somewhat Homomorphic Encryption from Fully Homomorphic Encryption",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Fresh ciphertext</div>
        <div class="node-sub">low noise — decrypts cleanly</div>
      </div>
      <div class="node">
        <div class="node-title">A few operations later</div>
        <div class="node-sub">noise growing — still decrypts, for now</div>
      </div>
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Too many multiplications</div>
        <div class="node-sub">noise overtakes the message — decryption fails</div>
      </div>
    </div>
    <p class="diagram-note">
      Somewhat homomorphic encryption has to stop before that third state.
      Fully homomorphic encryption needed a way to reset back to the first
      state without ever decrypting in the clear — that's bootstrapping, next.
    </p>
  `,
};
