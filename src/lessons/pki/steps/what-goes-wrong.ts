import type { Step } from "../../../types";

export const whatGoesWrong: Step = {
  id: "what-goes-wrong",
  title: "When Trust Breaks — Real PKI Failures",
  prose:
    "<p>Every safeguard in this lesson exists because something like this actually happened. In 2011, the Dutch CA <strong>DigiNotar</strong> was compromised by an attacker who used the breach to issue fraudulent certificates for domains including google.com — certificates that chained to a perfectly legitimate, trusted root, and were used in real, active surveillance against users in Iran. Once discovered, every major browser distrusted DigiNotar's root entirely; the company was bankrupt within months. It's the clearest real-world demonstration of exactly the gap Certificate Transparency, the previous step, was built to close — CT logging became a widely deployed requirement largely because of incidents like this one.</p>" +
    "<p>A different kind of failure: in 2015, a laptop manufacturer was found to have pre-installed a piece of adware called <strong>Superfish</strong> that shipped its own private root CA certificate — <em>and its matching private key</em> — identically on every affected device. Anyone who extracted that one key (trivial, since it was the same key on every laptop) could forge a trusted certificate for literally any website, on any of those machines. It's a vivid illustration of why root CA private keys are supposed to be some of the most tightly protected secrets in the industry, not something bundled into consumer software.</p>" +
    "<p>A quieter, ongoing failure is habit: users who repeatedly encounter self-signed certificates or expired-cert warnings — often for legitimate internal systems — learn to click through the warning without reading it. That habit doesn't distinguish a familiar internal tool from a genuine attack, which is exactly why the earlier trust-stores step draws a hard line between self-signed certificates on internal systems and on anything public-facing.</p>",
  bullets: [
    "DigiNotar (2011): a compromised CA issued fraudulent certificates for domains including google.com, used in real surveillance — the CA was distrusted industry-wide and went bankrupt",
    "DigiNotar is a large part of why Certificate Transparency exists and is now required by major browsers",
    "Superfish (2015): a pre-installed root CA with an identical private key on every affected device let anyone extract that key and forge a trusted certificate for any site",
    "Root and intermediate CA private keys are meant to be among the most tightly protected secrets in the industry — never bundled into shipped software",
    "Warning fatigue from repeated self-signed/expired-certificate warnings trains users to click through real ones too",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">DigiNotar (2011)</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          CA compromised, issued fraudulent certs<br>
          Used in real surveillance<br>
          Root distrusted industry-wide
        </div>
      </div>
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">Superfish (2015)</div>
        <div class="node-sub" style="text-align: left; margin-top: 8px;">
          Same private root key shipped on every device<br>
          Trivially extractable<br>
          Forgeable certs for any site
        </div>
      </div>
    </div>
    <p class="diagram-note">
      Both incidents broke the same assumption — that a root CA's private
      key stays exclusively controlled and never exposed — from opposite
      directions: one an external attacker, one built into the product itself.
    </p>
  `,
};
