import type { Step } from "../../../types";

export const realWorldUses: Step = {
  id: "real-world-uses",
  title: "Where This Actually Gets Used",
  prose:
    "<p><strong>Privacy-preserving authentication</strong> is the most direct descendant of the cave story: prove you know a password or hold a credential without ever transmitting it, closing off an entire class of attack that password-based login can't avoid — there's simply nothing sent that a server breach could later leak.</p>" +
    "<p><strong>Anonymous credentials</strong> generalize that further: prove a specific fact about yourself — you're over 18, you're a verified employee, you hold a valid license — without revealing your exact birthdate, your name, or anything else on the underlying document. The verifier learns exactly one bit (\"yes, this holds\") and nothing more, exactly the zero-knowledge property from earlier in this lesson.</p>" +
    "<p><strong>Blockchain privacy</strong>: Zcash's shielded transactions use zk-SNARKs to prove a transaction is valid — the sender had sufficient balance, no coins were created out of thin air — without revealing the sender, receiver, or amount on the public ledger at all. <strong>Blockchain scaling</strong> uses the succinctness property from the zk-SNARKs step directly: a zk-rollup batches thousands of transactions off-chain, then publishes one small proof that all of them were processed correctly, so the main chain only has to verify that one proof instead of re-executing every transaction — a direct, large-scale application of \"succinct\" from two steps ago.</p>",
  bullets: [
    "Privacy-preserving authentication: prove knowledge of a password/credential without ever transmitting it",
    "Anonymous credentials: prove a specific fact (age, employment, license) without revealing the underlying document",
    "Zcash shielded transactions: prove a transaction is valid without revealing sender, receiver, or amount",
    "zk-rollups: batch thousands of blockchain transactions off-chain, then publish one succinct proof the main chain verifies instead of re-executing everything",
  ],
};
