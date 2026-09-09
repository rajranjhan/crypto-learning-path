import type { Step } from "../../../types";

export const merkleTrees: Step = {
  id: "merkle-trees",
  title: "Merkle Trees Prove a Transaction Is Included",
  prose:
    "<p>A notebook page can list thousands of payments, but the page header has room for one compact receipt-folder summary: the Merkle root. Build it by fingerprinting each receipt, pairing those fingerprints, fingerprinting the pairs, and repeating until one final fingerprint remains. If any receipt changes, the path from that receipt to the final fingerprint changes too.</p>" +
    "<p>The useful trick is proof size. To prove receipt C is on a page, a verifier does not need the whole folder. It only needs receipt C plus the neighboring fingerprints along C's path to the root. That is why lightweight clients can verify inclusion without downloading full blocks: they check a short receipt trail against the root already committed in the block header.</p>",
  bullets: [
    "A Merkle root is one fingerprint for the whole receipt folder",
    "A proof contains one receipt plus the neighboring fingerprints needed to climb to the root",
    "The verifier recomputes the path and checks whether it matches the page header",
    "The proof stays small even when the page holds many transactions",
  ],
  diagram: `
    <div class="flow" style="align-items: center;">
      <div class="node">
        <div class="node-title">Receipt C</div>
        <div class="node-sub">the payment being proved</div>
      </div>
      <div class="link">
        <div class="lock">+ neighbors</div>
        <div class="link-label">fingerprint upward</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Folder Fingerprint</div>
        <div class="node-sub">must match the page header</div>
      </div>
    </div>
    <p class="diagram-note">
      The verifier learns that receipt C is on this page without needing
      every other receipt in the folder.
    </p>
  `,
};
