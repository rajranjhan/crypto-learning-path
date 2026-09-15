import type { Step } from "../../../types";

export const digitalSignatures: Step = {
  id: "digital-signatures",
  title: "Proving Who Sent It, With Math Instead of a Shared Secret",
  prose:
    "<p>The symmetric-primitives lesson covered HMAC: proving a message's authenticity using a hash and a secret both sides already share. Signatures solve the same problem — prove who sent something, and that it wasn't altered — without any shared secret at all, which is exactly what's needed when the verifier is a stranger the sender has never coordinated a key with.</p>" +
    "<p>A common beginner shortcut says a signature is \"encryption with the private key.\" That is a useful memory hook, but it is not precise enough for implementation. To sign safely, the algorithm hashes the message, applies a signature scheme such as RSA-PSS or ECDSA, and produces a signature value. Anyone with the corresponding public key can verify that signature against the message. Only the private key holder could have produced a signature that verifies for that message.</p>" +
    "<p>This is precisely what's happening inside the TLS lessons' CertificateVerify step — the server signs a value derived from the handshake transcript with its certificate's private key, and the client verifies it with the public key from that same certificate. It's also what RS256 and ES256 mean as JWT signing algorithms: RSA-with-SHA256 and ECDSA-with-SHA256, the asymmetric counterparts to HMAC's HS256.</p>",
  bullets: [
    "Signing: hash the message and run a signature algorithm with the private key",
    "Verifying: use the public key to check the signature against an independently recomputed hash",
    "Only the private key holder could have produced a signature that verifies for that message",
    "RSA signatures use PSS padding; ECC signatures use ECDSA — same idea, different underlying math",
    "This is exactly what TLS's CertificateVerify step does, and what RS256/ES256 mean as JWT signing algorithms — the asymmetric counterparts to HMAC's HS256",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Sign</div>
        <div class="node-sub">hash the message, sign with the PRIVATE key</div>
      </div>
      <div class="link">
        <div class="lock">✍️</div>
        <div class="link-label">signature travels with the message</div>
        <div class="arrow">→</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Verify</div>
        <div class="node-sub">verify with the PUBLIC key against an independently recomputed hash</div>
      </div>
    </div>
    <p class="diagram-note">
      The direction is opposite from encryption at the trust level: anyone can
      verify, but only the private key holder could have signed. Real signature
      algorithms are not raw RSA run backward.
    </p>
  `,
};
