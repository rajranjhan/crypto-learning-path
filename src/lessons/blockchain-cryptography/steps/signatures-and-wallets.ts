import { lessonTerms } from "../../terminology";
import type { Step } from "../../../types";

export const signaturesAndWallets: Step = {
  id: "signatures-and-wallets",
  glossary: lessonTerms("signature", "private key"),
  title: "Wallet Signatures — Verifying Spending",
  prose:
    "<p>In the notebook, a wallet is not a purse full of coins. It is a key manager: a pen that can make your unique signature. The coins or assets are entries in the shared ledger, not objects stored inside the wallet. When you spend, you write a payment note and sign that exact note with the relevant private key. Other nodes check the signature with the corresponding public key or address-derived commitment, then check the ledger rules: the input exists, it has not already been spent, and the transaction satisfies the spending conditions.</p>" +
    "<p>This is why blockchains use digital signatures rather than shared-secret MACs. The people checking the notebook are strangers across the internet; they cannot all share a secret with every spender. A signature lets anyone verify control of the signing key; ledger rules determine whether that key may authorize the transaction. Lose the pen, and you lose the ability to sign future spends. Let someone copy it, and they can sign as you.</p>",
  bullets: [
    "Wallets manage signing keys; assets live as ledger state, not inside the wallet",
    "A signature is like a unique approval mark on one exact payment note",
    "Nodes still enforce ledger rules such as no double-spending",
    "Public verification is why signatures fit blockchains better than HMAC-style shared secrets",
  ],
  takeaway: "Public verification is why signatures fit blockchains better than HMAC-style shared secrets.",
  figure: {
    body: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Signing Pen</div>
        <div class="node-sub">the wallet's private key</div>
      </div>
      <div class="link">
        <div class="lock">sign</div>
        <div class="link-label">marks one payment note</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Signed Payment</div>
        <div class="node-sub">broadcast to the network</div>
      </div>
      <div class="link">
        <div class="lock">verify</div>
        <div class="link-label">public-key check</div>
        <div class="arrow">-&gt;</div>
      </div>
      <div class="node">
        <div class="node-title">Node</div>
        <div class="node-sub">accepts only if signature and ledger rules pass</div>
      </div>
    </div>
  `,
  },
};
