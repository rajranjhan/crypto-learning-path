import type { Step } from "../../../types";

export const hashesChainBlocks: Step = {
  id: "hashes-chain-blocks",
  title: "Hash Chains — Tamper Evidence",
  prose:
    "<p>In the public notebook metaphor, a hash is the page's fingerprint. At the bottom of page 101, the writer copies the fingerprint of page 100. Page 102 copies the fingerprint of page 101, and so on. If someone edits page 100 later, page 100 gets a different fingerprint, so the fingerprint written on page 101 no longer matches.</p>" +
    "<p>That is the same one-way hash behavior from the Symmetric Primitives lesson: tiny input changes produce unrelated-looking output. This gives integrity, not secrecy. Everyone can read the notebook, but quiet rewriting is hard because every node can recompute the page fingerprints and see whether the chain still lines up.</p>",
  bullets: [
    "A block hash is like a page fingerprint",
    "Each new page writes down the previous page's fingerprint",
    "Editing an old page changes its fingerprint and breaks the later links",
    "Hashing proves tampering happened; it does not hide the page contents",
  ],
  takeaway: "Hashing proves tampering happened; it does not hide the page contents.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Page 100</div>
        <div class="node-sub">fingerprint = A91F...</div>
      </div>
      <div class="link">
        <div class="lock">copy</div>
        <div class="link-label">copied forward</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Page 101</div>
        <div class="node-sub">previous = A91F...</div>
      </div>
      <div class="link">
        <div class="lock">copy</div>
        <div class="link-label">copied forward</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node">
        <div class="node-title">Page 102</div>
        <div class="node-sub">previous = fingerprint(101)</div>
      </div>
    </div>
    <p class="diagram-note">
      Edit Page 100 and its fingerprint is no longer A91F..., so Page 101's
      copied fingerprint becomes false immediately.
    </p>
  `,
  },
};
