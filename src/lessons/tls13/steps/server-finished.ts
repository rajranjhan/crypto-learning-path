import type { Step } from "../../../types";

// On the wire this record is content type 0x17 (application_data), AEAD-encrypted
// under the handshake traffic keys. What follows the 5-byte record header is the
// DECRYPTED inner content: a Finished handshake message (type 0x14). Lengths are
// self-consistent: record length 0x0034 = 52 inner bytes, handshake length
// 0x000030 = 48 bytes of verify_data (an HMAC sized to the SHA-384 hash).
// Annotations tile from offset 0 with no gaps or overlaps.
export const serverFinished: Step = {
  id: "server-finished",
  title: "Server Finished",
  bytes: [
    0x17, 0x03, 0x03, 0x00, 0x34, 0x14, 0x00, 0x00, 0x30, 0x23, 0x12, 0x5d,
    0xf0, 0xd4, 0x16, 0x06, 0xb8, 0x2e, 0x10, 0xb6, 0xfd, 0xf2, 0x28, 0xcc,
    0xbc, 0x0f, 0x4f, 0x9b, 0x50, 0xf0, 0x51, 0xa7, 0xf6, 0x38, 0x02, 0x68,
    0xda, 0x10, 0x6a, 0xce, 0x5b, 0xd8, 0xd9, 0x06, 0xe8, 0x98, 0xd2, 0x77,
    0xa6, 0xc2, 0x58, 0xa1, 0x57, 0x2d, 0xd7, 0x9f, 0x34,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x17 = application_data. The Finished message is encrypted on the wire.",
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
      description: "0x0034 = 52 bytes. On the wire this covers AEAD ciphertext plus a tag; here it frames the 52 decrypted inner bytes.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x14 = Finished. Visible only after decrypting with the handshake traffic key.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x000030 = 48 bytes of verify_data follow.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 48,
      label: "Verify Data",
      description: "An HMAC over the entire handshake transcript, keyed by the server's handshake traffic secret. Its 48-byte size matches the SHA-384 output of the negotiated cipher suite. If the client recomputes the same value, the whole handshake is proven untampered.",
      colorClass: "c-cipher",
    },
  ],
  prose:
    "The server closes its half of the handshake with Finished. The verify_data (offset 9) is an HMAC computed over the full handshake transcript using a key derived from the server's handshake traffic secret. Because that secret comes from the shared ECDHE key, only a peer that derived the identical keys can produce or verify this value — so it simultaneously confirms handshake integrity (nothing was altered) and that both sides really share the same keys. It is itself encrypted under the handshake traffic keys.",
  bullets: [
    "HMAC verify_data computed over the handshake transcript",
    "Confirms handshake integrity using the server's handshake traffic secret",
    "Only a peer with identical derived keys can produce or verify it",
    "Encrypted under the handshake traffic keys",
  ],
};
