import type { Step } from "../../../types";

export const rsaPadding: Step = {
  id: "rsa-padding",
  title: "Why 'Textbook' RSA Is Never Used Directly",
  prose:
    "<p>The raw RSA math from the previous step is never used exactly as shown — encrypting a message straight through as c = m^e mod n is called \"textbook RSA,\" and it has serious problems. It's deterministic: the same message always produces the same ciphertext, so an attacker who guesses a small set of likely messages (a yes/no answer, a short PIN) can just encrypt each guess and compare. Textbook RSA is also multiplicatively malleable in exactly the way the homomorphic encryption lesson highlighted as a feature: multiplying two ciphertexts together produces the ciphertext of the product of the two original messages — useful when that's the point, dangerous when it isn't, since it lets an attacker manipulate a ciphertext into a related one without ever decrypting it.</p>" +
    "<p>Real implementations wrap the message in a padding scheme before the RSA math ever runs. <strong>OAEP</strong> (Optimal Asymmetric Encryption Padding) mixes in fresh randomness before encrypting, so the same message never produces the same ciphertext twice, and destroys the clean mathematical structure malleability depends on. For signatures — a different job, covered in an upcoming step — <strong>PSS</strong> (Probabilistic Signature Scheme) plays the equivalent role; the older PKCS#1 v1.5 padding still appears in legacy systems but has known weaknesses OAEP and PSS were designed to avoid.</p>" +
    "<p>The practical rule: never call raw RSA encrypt/decrypt directly. Every real library defaults to OAEP for encryption and PSS for signing — and if a library or protocol only offers PKCS#1 v1.5, that's a sign it predates current best practice.</p>",
  bullets: [
    "Textbook RSA (c = m^e mod n, no padding) is deterministic — the same message always encrypts to the same ciphertext",
    "Textbook RSA is multiplicatively malleable — the same homomorphic property the previous lesson covered as a feature is a vulnerability here",
    "OAEP mixes in fresh randomness before encrypting, so identical messages produce different ciphertexts and malleability is destroyed",
    "PSS is OAEP's counterpart for signatures — both replace the older, weaker PKCS#1 v1.5 padding",
    "Practical rule: never call raw RSA directly — every modern library defaults to OAEP (encryption) and PSS (signing)",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ Textbook RSA</div>
        <div class="node-sub">deterministic &amp; malleable — c = m^e mod n, nothing else</div>
      </div>
      <div class="node" style="border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ RSA-OAEP</div>
        <div class="node-sub">randomness mixed in first — same message, different ciphertext every time</div>
      </div>
    </div>
    <p class="diagram-note">
      Same underlying math, wrapped differently. The math was never the weak
      point — using it without padding was.
    </p>
  `,
};
