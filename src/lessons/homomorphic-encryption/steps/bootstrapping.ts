import type { Step } from "../../../types";

export const bootstrapping: Step = {
  id: "bootstrapping",
  title: "Cleaning the Ciphertext — Gentry's Bootstrapping",
  prose:
    "<p>Craig Gentry's 2009 breakthrough was a way to reset a noisy ciphertext back to something close to fresh — without ever decrypting it in the clear, which would defeat the entire point. The trick, called <strong>bootstrapping</strong>, sounds almost circular: encrypt the secret key itself, and use that encrypted key to homomorphically evaluate the scheme's own decryption function, on the ciphertext.</p>" +
    "<p>Walk through what that produces. Run the decryption circuit homomorphically — using the encrypted key as an input — on a noisy ciphertext, and the output is a brand-new ciphertext, encrypted under the same public key, that decrypts to the exact same underlying message, but with the noise reset back down to a fresh, low level. Nothing was ever decrypted in the clear along the way; the entire decryption process itself ran inside the homomorphic scheme.</p>" +
    "<p>Bootstrap often enough — after every multiplication, or every few — and there's no longer a hard ceiling on how many operations a computation can chain together. That's the difference between \"somewhat\" and \"fully\" homomorphic in one sentence: FHE is SHE plus the ability to bootstrap whenever the noise budget runs low.</p>",
  bullets: [
    "Bootstrapping: homomorphically evaluate the scheme's own decryption function, using an encrypted copy of the secret key, on a noisy ciphertext",
    "The output is a new ciphertext, still encrypted, that decrypts to the same message but with noise reset to a fresh, low level",
    "Nothing is ever decrypted in the clear during bootstrapping — the decryption itself runs entirely inside the encrypted domain",
    "Bootstrap often enough (typically after every multiplication) and a computation is no longer limited by a fixed noise budget",
    "This one idea is what turned Somewhat Homomorphic Encryption into genuinely Fully Homomorphic Encryption — and it's also the most computationally expensive step in the whole scheme, a large part of why FHE is so slow (next steps)",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Noisy ciphertext</div>
        <div class="node-sub">too many operations chained — near the noise ceiling</div>
      </div>
      <div class="link">
        <div class="lock">🔁</div>
        <div class="link-label">homomorphically evaluate Decrypt(), using an encrypted key</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Fresh ciphertext</div>
        <div class="node-sub">same plaintext underneath, noise reset — never decrypted in the clear</div>
      </div>
    </div>
    <p class="diagram-note">
      Bootstrapping is expensive, but it removes the hard ceiling somewhat
      homomorphic encryption runs into — the computation can keep going
      indefinitely, refreshing the ciphertext whenever it needs to.
    </p>
  `,
};
