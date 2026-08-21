import type { Step } from "../../../types";

export const hmac: Step = {
  id: "hmac",
  title: "Proving Who Sent It — HMAC",
  prose:
    "<p>A plain hash proves a message wasn't altered, but not who sent it — anyone can compute SHA-256 of any message, including an attacker who intercepts and modifies one in transit, then recomputes a matching hash for the tampered version. What's missing is a secret only the real sender holds.</p>" +
    "<p>The obvious fix — just hash the secret and the message together, like SHA256(key + message) — turns out to be exploitable for some hash constructions via a length-extension attack: an attacker who knows a hash of key+message can sometimes compute a valid hash for key+message+extra, without ever knowing the key. <strong>HMAC</strong> avoids that by hashing twice, mixing the key in differently each time: HMAC(key, message) = H((key XOR opad) || H((key XOR ipad) || message)), where opad and ipad are fixed padding constants and H is the underlying hash function (HMAC-SHA256 uses SHA-256 for H).</p>" +
    "<p>Only someone holding the key can produce a valid HMAC for a given message, and changing even one byte of the message invalidates it — exactly the authenticity and integrity guarantee a plain hash can't provide on its own. This is precisely what the TLS Finished message's verify_data is: an HMAC-style construction over the entire handshake transcript, keyed by a secret only the two endpoints derived. It's also what \"HS256\" means as a JWT signing algorithm — HMAC-SHA256 over the token, keyed by a secret the authorization server and API share.</p>",
  bullets: [
    "A plain hash proves a message wasn't altered, but anyone can compute one — it doesn't prove who sent it",
    "Naively hashing key + message together is vulnerable to length-extension attacks against some hash constructions",
    "HMAC hashes twice, mixing the key in differently each pass — HMAC(key, message) = H((key⊕opad) || H((key⊕ipad) || message))",
    "Only someone holding the key can produce a valid HMAC; changing even one byte of the message invalidates it",
    "This is what TLS's Finished/verify_data actually is, and what 'HS256' means as a JWT signing algorithm",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Inner hash</div>
        <div class="node-sub">H((key ⊕ ipad) || message)</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node node-proxy">
        <div class="node-title">Outer hash</div>
        <div class="node-sub">H((key ⊕ opad) || inner result) = the HMAC</div>
      </div>
    </div>
    <p class="diagram-note">
      Two nested hash calls, both keyed. Neither the message nor a single
      hash of it alone is enough to forge — only someone holding the actual
      key can produce a value that survives both passes.
    </p>
  `,
};
