import type { Step } from "../../../types";

export const smartContractsAndZk: Step = {
  id: "smart-contracts-and-zk",
  title: "Smart Contracts Add Hashes, Commitments & Proofs",
  prose:
    "<p>A smart contract is like a public rule box attached to the notebook. Anyone can put a note into the box, and every node can run the same rule check. The box can check a signature before allowing an action, store a fingerprint commitment instead of the original data, verify a receipt-folder path, or verify a zero-knowledge proof that some off-chain work followed the rules.</p>" +
    "<p>These checks are powerful because they are deterministic and public: every node can run the same contract code and arrive at the same result. But the cryptography only proves the statement it was designed to prove. A valid signature does not prove the signer understood the transaction. A valid Merkle proof does not prove the underlying bridge is economically safe. A valid zero-knowledge proof does not prove the contract's rules were the right rules.</p>",
  bullets: [
    "A smart contract is a public rule box that every node runs the same way",
    "Contracts commonly verify signatures, hashes, Merkle proofs, and zero-knowledge proofs",
    "Hash commitments let the rule box compare against a secret or large value revealed later",
    "Merkle proofs let the rule box check membership without storing every item on-chain",
    "ZK proofs can move expensive computation off-chain while keeping verification on-chain",
    "Correct cryptography cannot rescue incorrect contract logic or bad incentives",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Outside Work</div>
        <div class="node-sub">large, private, or expensive to compute</div>
      </div>
      <div class="link">
        <div class="lock">proof</div>
        <div class="link-label">compact receipt</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Rule Box</div>
        <div class="node-sub">verifies the proof under public rules</div>
      </div>
    </div>
  `,
};
