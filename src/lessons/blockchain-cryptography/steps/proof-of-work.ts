import type { Step } from "../../../types";

export const proofOfWork: Step = {
  id: "proof-of-work",
  title: "Proof of Work — Hashing as Cost",
  prose:
    "<p>Proof of work is like saying: before you may add the next notebook page, solve a hard lottery puzzle printed on that page. Miners repeatedly change a nonce in the block header and hash the header until the result is below the network's target. There is no shortcut better than trying many candidates, but verification is cheap: one hash tells everyone whether the page really solved the puzzle.</p>" +
    "<p>The security idea is economic and network-based, not just mathematical. Rewriting history means replacing the old page and then catching up to the honest notebook, paying the same puzzle cost for each replacement page. The hashes make the work easy to verify; the consensus rule tells nodes which valid notebook to extend. Cryptography alone does not create consensus. It supplies verifiable evidence — signatures, hashes, commitments, work proofs — that a separate consensus protocol uses to choose one history.</p>",
  bullets: [
    "Mining searches for a page fingerprint below a target",
    "Finding the winning nonce is expensive; checking it is cheap",
    "Rewriting history requires redoing the puzzle for the changed page and its descendants",
    "Cryptography supplies verifiable evidence; the consensus protocol decides which valid history the network extends",
    "Consensus is not just cryptography; it combines checks with network, timing, and incentive assumptions",
  ],
  takeaway: "Consensus is not just cryptography; it combines checks with network, timing, and incentive assumptions.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Page + Nonce</div>
        <div class="node-sub">try another puzzle answer</div>
      </div>
      <div class="link">
        <div class="lock">SHA-256</div>
        <div class="link-label">repeat until winning</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Winning Fingerprint</div>
        <div class="node-sub">expensive to find, cheap to check</div>
      </div>
    </div>
    <p class="diagram-note">
      Proof of work uses a hash function as a public puzzle. A valid page
      proves someone spent computation searching.
    </p>
  `,
  },
};
