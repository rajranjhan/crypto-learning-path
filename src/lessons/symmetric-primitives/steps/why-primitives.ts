import type { Step } from "../../../types";

export const whyPrimitives: Step = {
  id: "why-primitives",
  title: "The Building Blocks Behind Every Protocol in This Series",
  prose:
    "<p>Every protocol covered so far leans on a small set of standardized cryptographic primitives without ever spelling them out. The TLS lessons annotate an HMAC verify_data and negotiate a cipher suite named AES-GCM. The OAuth lessons sign tokens with an algorithm called HS256. Even Kerberos's \"sealed with a key\" language is really encryption under the hood. This lesson opens up the three primitives doing almost all of that work: <strong>AES</strong>, a symmetric cipher for confidentiality; the <strong>SHA-2</strong> family, a hash function for fingerprinting data; and <strong>HMAC</strong>, which combines a hash function with a secret key for authenticity.</p>" +
    "<p>Three different jobs, easy to keep straight once you separate them: encryption keeps data secret and reversible — only the key holder can undo it. Hashing produces a fixed-size fingerprint that's irreversible and used to detect any change, not to hide anything. A MAC (HMAC being the standard one) proves a message came from someone holding a specific secret, and wasn't altered in transit — authenticity and integrity, not secrecy.</p>" +
    "<p>Real protocols almost never use just one. A TLS cipher suite name spells the combination out directly — something like <code>TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</code> packs a key exchange (ECDHE), a signature algorithm (RSA), a cipher (AES-128-GCM), and a hash (SHA256) into one name. This lesson explains each ingredient on its own before you see them combined again.</p>",
  bullets: [
    "AES — symmetric cipher, keeps data confidential and reversible for whoever holds the key",
    "SHA-2 (SHA-256/384/512) — hash function, produces a fixed-size fingerprint; irreversible, used to detect change rather than hide data",
    "HMAC — a keyed hash; proves a message came from someone holding a specific secret and wasn't altered (authenticity + integrity, not secrecy)",
    "A TLS cipher suite name like TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 is literally a list of these primitives glued together",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1;">
        <div class="node-title">AES</div>
        <div class="node-sub">🔒 confidentiality — reversible with the key</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">SHA-2</div>
        <div class="node-sub">🔍 fingerprinting — irreversible, detects change</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">HMAC</div>
        <div class="node-sub">✍️ authenticity — proves who, using a shared secret</div>
      </div>
    </div>
    <p class="diagram-note">
      TLS's own cipher suite names are just these ingredients listed out —
      AES_128_GCM_SHA256 is AES doing the encrypting and SHA-256 doing the
      fingerprinting, inside GCM's own built-in authentication.
    </p>
  `,
};
