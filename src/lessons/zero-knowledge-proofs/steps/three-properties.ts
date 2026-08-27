import type { Step } from "../../../types";

export const threeProperties: Step = {
  id: "three-properties",
  title: "The Three Properties That Make It a Real Proof",
  prose:
    "<p>The cave story isn't just a fun puzzle — it satisfies three precise properties, and any real zero-knowledge proof has to satisfy all three or it doesn't count as one.</p>" +
    "<p><strong>Completeness</strong>: if Peggy genuinely knows the secret word, she can always convince Victor — an honest prover with a true statement never fails to pass. <strong>Soundness</strong>: if Peggy doesn't know the word, she can only fool Victor with some bounded probability per round (50% in the cave), which shrinks toward zero as the protocol repeats — a cheating prover can't reliably convince a verifier of a false statement.</p>" +
    "<p><strong>Zero-knowledge</strong> is the subtle one: Victor learns nothing beyond the single bit \"Peggy knows the secret\" — not the word itself, not which path she originally chose, nothing else. The formal test for this is whether Victor (or anyone recording the exchange) could have produced an indistinguishable-looking transcript of the whole protocol <em>without</em> knowing the secret at all, just by simulating it — if a convincing fake transcript is just as easy to produce as a real one, then watching a real one couldn't have taught you anything you didn't already know how to fake.</p>",
  bullets: [
    "Completeness: an honest prover with a true statement always convinces the verifier",
    "Soundness: a dishonest prover without the secret can only succeed by chance, and that chance shrinks toward zero with repetition",
    "Zero-knowledge: the verifier learns nothing beyond the single fact that the statement is true — not the secret, not any part of it",
    "Test for zero-knowledge: could someone fake an indistinguishable transcript without knowing the secret? If yes, watching a real one taught the verifier nothing new",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">Completeness</div>
        <div class="node-sub">true statement + honest prover → always convinces</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Soundness</div>
        <div class="node-sub">false statement → cheating succeeds only by vanishing chance</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Zero-Knowledge</div>
        <div class="node-sub">verifier learns nothing beyond "it's true"</div>
      </div>
    </div>
    <p class="diagram-note">
      A protocol missing any one of these three isn't a zero-knowledge
      proof — it's just a proof, or just an obfuscation, but not both at once.
    </p>
  `,
};
