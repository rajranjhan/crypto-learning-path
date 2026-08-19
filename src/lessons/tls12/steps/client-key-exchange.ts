import type { Step } from "../../../types";
import { TLS_ACTORS, TLS12_MESSAGES, buildSequence } from "../../actors";

// Byte source: captured live on 2026-07-10 with a Python `ssl` memory-BIO
// client (TLS 1.2 pinned) against example.com:443, reading the raw outbound
// record we wrote (">>> TLS 1.2, Handshake
// [length 0046], ClientKeyExchange"). These are the exact on-wire bytes.
// Length fields are self-consistent: record length 0x0046 = 70, handshake
// length 0x000042 = 66, ECDH public key length 0x41 = 65. Annotations tile
// from offset 0 with no gaps or overlaps.
export const clientKeyExchange: Step = {
  id: "client-key-exchange",
  title: "Agreeing on a Shared Key, Continued",
  bytes: [
    0x16, 0x03, 0x03, 0x00, 0x46, 0x10, 0x00, 0x00, 0x42, 0x41, 0x04, 0x4f,
    0x51, 0xbe, 0x70, 0x68, 0x6f, 0x36, 0x37, 0x81, 0x0c, 0xac, 0x7d, 0x9f,
    0xea, 0x46, 0x86, 0x7d, 0xc4, 0x00, 0x1f, 0x7a, 0x78, 0x38, 0xa6, 0xf7,
    0x99, 0xb1, 0x6f, 0xdc, 0x7c, 0xc6, 0xab, 0x6f, 0xad, 0x52, 0x44, 0x9c,
    0x4a, 0x07, 0x31, 0x32, 0x44, 0x98, 0xd7, 0xc1, 0x05, 0x60, 0x36, 0x13,
    0x97, 0x9c, 0xc0, 0x38, 0xfd, 0x7a, 0x37, 0x25, 0xd7, 0xc4, 0xc6, 0xce,
    0x4f, 0x34, 0xe9,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x16 = Handshake.",
      colorClass: "c-rec",
    },
    {
      offset: 1,
      length: 2,
      label: "Record Version",
      description: "0x0303 = TLS 1.2.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x0046 = 70 bytes of handshake payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x10 = ClientKeyExchange, the client's half of the ECDHE key exchange.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x000042 = 66 bytes for the ClientKeyExchange body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 1,
      label: "Public Key Length",
      description: "0x41 = 65 bytes: the length of the client's ephemeral ECDH public point.",
      colorClass: "c-len",
    },
    {
      offset: 10,
      length: 65,
      label: "ECDH Public Key",
      description: "The client's ephemeral ECDH public point (0x04 uncompressed prefix, then 32-byte X and 32-byte Y). Combined with the server's ephemeral key from the ServerKeyExchange, both sides now derive the same pre-master secret via ECDH — without ever transmitting it.",
      colorClass: "c-rand",
    },
  ],
  prose:
    "<p>Your computer replies in kind: \"Here's my half of the combination.\"</p>" +
    "<p>On the wire that's the <strong>ClientKeyExchange</strong>: an ephemeral ECDH public key (offset 10).</p>" +
    "<p>Each side now has the other's public point and its own private scalar, so both independently land on the identical shared secret — without either of you ever putting that secret in the mailroom.</p>" +
    "<p>That secret becomes the pre-master secret; mixed with the client and server randoms through the PRF, it yields the symmetric keys that lock everything from here on.</p>",
  bullets: [
    "The client's ephemeral ECDH public key (65 bytes)",
    "Lets both parties independently compute the identical pre-master secret",
    "No secret key material is ever sent on the wire",
  ],
  sequence: buildSequence(TLS_ACTORS, TLS12_MESSAGES, 6),
  callouts: [
    {
      requirementId: "mTLS",
      title: "Internal service mTLS",
      body: "Mutual TLS between internal services segregates clients and limits lateral movement if one service is compromised.",
    },
  ],
};
