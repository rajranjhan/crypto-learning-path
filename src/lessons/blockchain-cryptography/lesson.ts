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
    "Public verification does not remove every trust assumption. Separating cryptographic checks from consensus helps you evaluate what a blockchain actually guarantees.",
  objectives: [
    "Explain hash-linked blocks with a public notebook metaphor",
    "Describe Merkle inclusion proofs",
    "Connect wallet signatures to transaction authorization",
    "Distinguish cryptographic checks from consensus and incentive assumptions",
  ],
  prerequisites: ["symmetric-primitives", "asymmetric-primitives"],
  checkYourUnderstanding: [
    {
      question: "Why don't hash-linked blocks alone make a history impossible to rewrite?",
      answer: "An attacker can recompute hashes for a modified history. Consensus rules and their network or economic assumptions determine which history is accepted.",
    },
    {
      question: "What does a Merkle inclusion proof establish, and what does it not establish?",
      answer: "It shows that an item belongs under a particular root. It does not by itself establish that the root is trusted or that the item is valid.",
    },
    {
      question: "Why doesn't a valid transaction signature establish the signer's real-world identity?",
      answer: "It proves authorization by a private key. Linking that key to a person requires evidence outside the signature.",
    },
  ],
  keyTakeaways: [
    "Hashes make block history tamper-evident",
    "Merkle trees make inclusion proofs compact",
    "Signatures prove key control; ledger rules determine transaction authorization",
    "Consensus combines cryptography with network and economic assumptions",
    "Most blockchain data is public unless privacy is explicitly added",
  ],
  estimatedMinutes: 30,
  difficulty: "Intermediate",
  lessonType: "application",
  transitionToNext: "Blockchain security relies heavily on today's public-key cryptography, which is exactly what post-quantum migration must prepare to replace.",
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
      "Public checks make tampering detectable; they do not make the notebook private.",
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
