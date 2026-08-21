import type { Step } from "../../../types";

export const digitalSignatures: Step = {
  id: "digital-signatures",
  title: "Proving Who Sent It, With Math Instead of a Shared Secret",
  prose:
    "<p>The symmetric-primitives lesson covered HMAC: proving a message's authenticity using a hash and a secret both sides already share. Signatures solve the same problem — prove who sent something, and that it wasn't altered — without any shared secret at all, which is exactly what's needed when the verifier is a stranger the sender has never coordinated a key with.</p>" +
    "<p>The mechanism runs the encryption pattern in reverse. To sign, hash the message first (SHA-256 or similar, from the previous lesson), then encrypt that hash with the private key — anyone holding the corresponding public key can decrypt it back to the hash, recompute the hash of the message themselves, and confirm the two match. Only the private key holder could have produced a signature that decrypts to the correct hash; RSA does this with PSS padding, ECC does it with ECDSA, using the same curve math from the previous step instead of modular exponentiation.</p>" +
    "<p>This is precisely what's happening inside the TLS lessons' CertificateVerify step — the server signs a value derived from the handshake transcript with its certificate's private key, and the client verifies it with the public key from that same certificate. It's also what RS256 and ES256 mean as JWT signing algorithms: RSA-with-SHA256 and ECDSA-with-SHA256, the asymmetric counterparts to HMAC's HS256.</p>",
  bullets: [
    "Signing: hash the message, then encrypt the hash with the private key",
    "Verifying: decrypt the signature with the public key, recompute the hash independently, and compare",
    "Only the private key holder could have produced a signature that decrypts to the correct hash",
    "RSA signatures use PSS padding; ECC signatures use ECDSA — same idea, different underlying math",
    "This is exactly what TLS's CertificateVerify step does, and what RS256/ES256 mean as JWT signing algorithms — the asymmetric counterparts to HMAC's HS256",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Sign</div>
        <div class="node-sub">hash the message, encrypt the hash with the PRIVATE key</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">signature travels with the message</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Verify</div>
        <div class="node-sub">decrypt with the PUBLIC key, compare to an independently recomputed hash</div>
      </div>
    </div>
    <p class="diagram-note">
      The exact reverse of encryption's key usage — and that reversal is the
      whole point: anyone can verify, but only the private key holder could
      have signed.
    </p>
  `,
};
