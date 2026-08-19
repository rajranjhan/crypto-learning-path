import type { Step } from "../../../types";
import { TLS_ACTORS, TLS13_MESSAGES, buildSequence } from "../../actors";

// On the wire this record is content type 0x17 (application_data), AEAD-encrypted
// under the CLIENT's handshake traffic keys. What follows the 5-byte record
// header is the DECRYPTED inner content: a Finished handshake message (type
// 0x14). Lengths are self-consistent: record length 0x0034 = 52 inner bytes,
// handshake length 0x000030 = 48 bytes of verify_data. Annotations tile from
// offset 0 with no gaps or overlaps.
export const clientFinished: Step = {
  id: "client-finished",
  title: "Tamper-Proofing, Continued",
  bytes: [
    0x17, 0x03, 0x03, 0x00, 0x34, 0x14, 0x00, 0x00, 0x30, 0xd6, 0x60, 0xcf,
    0xcf, 0x61, 0xc1, 0xac, 0x1f, 0xd3, 0xdd, 0x38, 0xe6, 0x3d, 0xbf, 0x16,
    0x9a, 0x15, 0xcc, 0xa1, 0x4b, 0xda, 0xf9, 0x32, 0x33, 0x2b, 0xb5, 0xd7,
    0x6f, 0x3c, 0xd7, 0x56, 0xf2, 0xfb, 0x9a, 0x03, 0x03, 0xf8, 0x39, 0xa7,
    0xde, 0x6a, 0x30, 0x9d, 0xbd, 0x5f, 0x6a, 0x0f, 0x32,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x17 = application_data. The client's Finished message is encrypted on the wire.",
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
      description: "0x14 = Finished. Visible only after decrypting with the client's handshake traffic key.",
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
      description: "An HMAC over the handshake transcript, keyed by the CLIENT's handshake traffic secret. When the server verifies it, both ends have proven they derived identical keys and saw the same, untampered handshake.",
      colorClass: "c-cipher",
    },
  ],
  prose:
    "<p>You attach your own wax seal in reply.</p>" +
    "<p>This is your <strong>Finished</strong> message — encrypted, and covering a transcript that now includes the bank's Finished too. Once the bank checks it, both of you have proven the same thing from opposite ends: identical keys, an untampered conversation.</p>" +
    "<p>TLS 1.3 lets you send this — and even your first real document — in the very same return trip, which is why the whole handshake costs just one round trip instead of two.</p>",
  bullets: [
    "HMAC verify_data computed over the handshake transcript, including the server's Finished",
    "Encrypted under the client's handshake traffic secret",
    "Completes mutual confirmation that both ends derived identical keys",
    "Sent in the client's first return flight, enabling a one round-trip handshake",
  ],
  sequence: buildSequence(TLS_ACTORS, TLS13_MESSAGES, 9),
};
