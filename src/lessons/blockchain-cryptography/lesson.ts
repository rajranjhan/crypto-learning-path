import type { Lesson } from "../../types";
import { hashesChainBlocks } from "./steps/hashes-chain-blocks";
import { merkleTrees } from "./steps/merkle-trees";
import { signaturesAndWallets } from "./steps/signatures-and-wallets";
import { proofOfWork } from "./steps/proof-of-work";
import { smartContractsAndZk } from "./steps/smart-contracts-and-zk";
import { checklist } from "./steps/checklist";

export const blockchainCryptographyLesson: Lesson = {
  slug: "blockchain-cryptography",
  title: "Blockchain Cryptography: Hashes, Signatures & Consensus",
  status: "available",
  summary: "Connects hashes, signatures, Merkle trees, and consensus rules to their jobs inside blockchains.",
  whyItMatters:
    "Blockchains are applied cryptography systems, not magic trust machines. Understanding which cryptographic checks provide integrity, authorization, and compact verification helps separate real guarantees from common overclaims.",
  objectives: [
    "Explain hash-linked blocks with a public notebook metaphor",
    "Describe Merkle inclusion proofs",
    "Connect wallet signatures to transaction authorization",
    "Distinguish cryptographic checks from consensus and incentive assumptions",
  ],
  prerequisites: ["symmetric-primitives", "asymmetric-primitives"],
  keyTakeaways: [
    "Hashes make block history tamper-evident",
    "Merkle trees make inclusion proofs compact",
    "Digital signatures authorize transactions",
    "Consensus combines cryptography with network and economic assumptions",
    "Most blockchain data is public unless privacy is explicitly added",
  ],
  estimatedMinutes: 30,
  difficulty: "Intermediate",
  lessonType: "application",
  overview:
    "Think of a blockchain as a public notebook that many people copy and " +
    "check. Each new page carries a fingerprint of the page before it, so " +
    "tearing out or editing an old page is obvious. Each payment is approved " +
    "with the spender's signature. Each page has a compact receipt folder " +
    "that proves which payments are on it. And the network's consensus rules " +
    "decide who gets to write the next accepted page. This lesson connects " +
    "those notebook jobs to hashes, Merkle trees, digital signatures, and " +
    "consensus.",
  references: [
    { title: "Bitcoin: A Peer-to-Peer Electronic Cash System", url: "https://bitcoin.org/bitcoin.pdf" },
    { title: "NIST FIPS 202: SHA-3 Standard", url: "https://csrc.nist.gov/pubs/fips/202/final" },
    { title: "NIST Digital Signatures Project", url: "https://csrc.nist.gov/projects/digital-signatures" },
  ],
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Signed Notes</div>
        <div class="node-sub">transactions approved by private keys</div>
      </div>
      <div class="link">
        <div class="lock">folder</div>
        <div class="link-label">summarized onto a page</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Notebook Page</div>
        <div class="node-sub">previous fingerprint + receipt root + consensus data</div>
      </div>
      <div class="link">
        <div class="lock">fingerprint</div>
        <div class="link-label">points to the prior page</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node">
        <div class="node-title">Shared Notebook</div>
        <div class="node-sub">editing a page changes every later fingerprint</div>
      </div>
    </div>
    `,
    caption:
      "The notebook is not private by default. Its safety comes from public, repeatable checks: anyone can recompute the fingerprints, signatures, receipt folders, and consensus evidence.",
  },
  steps: [
    hashesChainBlocks,
    merkleTrees,
    signaturesAndWallets,
    proofOfWork,
    smartContractsAndZk,
    checklist,
  ],
};
