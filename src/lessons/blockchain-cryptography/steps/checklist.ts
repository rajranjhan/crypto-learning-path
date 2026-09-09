import type { Step } from "../../../types";

export const checklist: Step = {
  id: "checklist",
  title: "Putting It Together — What Crypto Does and Does Not Do",
  prose:
    "<p>The notebook metaphor keeps the boundaries clear. Cryptography lets everyone check that the pages still link together, payment notes were signed, receipts are inside a committed folder, and the next page satisfied the network's selection rule. That is a narrower claim than many blockchain descriptions imply. The cryptography does not guarantee good governance, bug-free contracts, stable economics, honest user interfaces, or privacy by default.</p>" +
    "<p>The practical reading habit is to ask what exact statement is being verified. Hashes answer: did this page's fingerprint change? Signatures answer: did this signing key approve this exact note? Merkle proofs answer: is this receipt in the committed folder? Consensus proofs answer: did this page satisfy the chain's selection rule? Anything outside those statements needs a separate security argument.</p>",
  bullets: [
    "Hashes are page fingerprints: they make history and commitments tamper-evident",
    "Digital signatures are approval marks: they authorize transactions without shared secrets",
    "Merkle trees are receipt folders: they make inclusion proofs small",
    "Consensus is the page-selection rule: it uses cryptography plus network and incentive assumptions",
    "Smart contracts are public rule boxes: they only check the statement they were written to check",
    "The public notebook is readable unless the protocol explicitly adds privacy mechanisms",
  ],
  callouts: [
    {
      requirementId: "Scope",
      title: "Do not confuse integrity with secrecy",
      body: "A normal blockchain transaction is signed and hash-linked, not encrypted. Everyone may be able to read it while still being unable to change it unnoticed.",
    },
    {
      requirementId: "Keys",
      title: "Private key loss is final by design",
      body: "Public verification removes the central password-reset desk. That is useful for censorship resistance, but it means key backup and transaction review become core security controls.",
    },
  ],
};
