import type { Step } from "../../../types";

// These are the exact on-wire bytes of the first Application Data record sent
// after the handshake (an encrypted "GET / HTTP/1.1" request), protected with
// the APPLICATION traffic keys. Length is self-consistent: record content type
// 0x17, version 0x0303, record length 0x0049 = 73, followed by exactly 73 bytes
// of AEAD ciphertext (including the internal content-type byte and the
// authentication tag). Annotations tile from offset 0 with no gaps or overlaps.
export const applicationData: Step = {
  id: "application-data",
  title: "Application Data",
  bytes: [
    0x17, 0x03, 0x03, 0x00, 0x49, 0xe2, 0x65, 0x2a, 0x8d, 0xa9, 0x5f, 0x1a,
    0x25, 0xb8, 0x3f, 0x7f, 0xd6, 0x5e, 0xc9, 0x71, 0x68, 0xb5, 0xd7, 0xbd,
    0x0a, 0x78, 0x98, 0x89, 0x48, 0x80, 0x20, 0x4d, 0x2f, 0x7e, 0xae, 0x1b,
    0xd3, 0x10, 0x67, 0xe0, 0x78, 0x48, 0x48, 0x8a, 0x93, 0xaf, 0x2e, 0xd3,
    0xc6, 0x18, 0x4a, 0x74, 0xa3, 0x9a, 0x02, 0xb0, 0x2c, 0xad, 0x8f, 0xd8,
    0x04, 0x68, 0xf8, 0x7e, 0xce, 0xf4, 0x6a, 0x0f, 0xd4, 0x00, 0x47, 0x38,
    0x38, 0x42, 0x02, 0xd4, 0xb9, 0xef,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x17 = Application Data. Once the handshake finishes, all real traffic rides in these records — the same content type TLS 1.3 also used to disguise the handshake.",
      colorClass: "c-rec",
    },
    {
      offset: 1,
      length: 2,
      label: "Record Version",
      description: "0x0303 = TLS 1.2, the pinned legacy record version.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x0049 = 73 bytes of encrypted payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 73,
      label: "Encrypted Payload",
      description: "The AEAD-protected application bytes (here an HTTP GET request), sealed with the application traffic keys. It contains the ciphertext, a hidden inner content-type byte, and the authentication tag. To anyone on the wire it is indistinguishable from random data — this is the confidentiality and integrity TLS exists to provide.",
      colorClass: "c-cipher",
    },
  ],
  prose:
    "The payoff. This is the first Application Data record — an encrypted HTTP request protected with the application traffic keys derived after the handshake. Every byte after the 5-byte record header (offset 5) is AEAD ciphertext with an authentication tag: confidential and tamper-evident. TLS 1.3 even hides the true record type inside the encrypted payload, so on the wire it is just an opaque 0x17 blob. From here the connection simply exchanges 0x17 records in both directions until one side closes. But TLS only protects data in transit — the moment it is decrypted and stored, other controls take over.",
  bullets: [
    "A record type of 0x17 (Application Data)",
    "The AEAD-encrypted payload (here an HTTP request) under the application traffic keys",
    "An authentication tag making the record tamper-evident",
    "To anyone on the wire it is indistinguishable from random data",
  ],
  callouts: [
    {
      requirementId: "At rest",
      title: "Encryption in transit vs. at rest",
      body: "TLS protects data in transit. A complete design also encrypts data at rest, ideally with per-tenant keys so a single leaked key exposes only one tenant.",
    },
    {
      requirementId: "Secrets",
      title: "Managed secrets",
      body: "Keys and secrets are best held in a dedicated secrets manager or KMS rather than embedded in application config or source.",
    },
  ],
};
