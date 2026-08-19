import type { Step } from "../../../types";
import { TLS_ACTORS, TLS12_MESSAGES, buildSequence } from "../../actors";

// Byte source: captured live on 2026-07-10 with
//   `openssl s_client -connect example.com:443 -tls1_2 -msg -state`
// These are the exact bytes of the real TLS 1.2 ServerHello record openssl
// received (the "<<< TLS
// 1.2, Handshake [length 005d], ServerHello" block, prefixed with its 5-byte
// record header "16 03 03 00 5d"). The record length (0x005d = 93) matches the
// 93 handshake bytes that follow, and every annotation tiles the record
// contiguously from offset 0 with no gaps or overlaps.
export const serverHello: Step = {
  id: "server-hello",
  title: "Introductions, Continued",
  bytes: [
    // -- Record header (5 bytes) --
    0x16, // record type: handshake
    0x03, 0x03, // record version: TLS 1.2
    0x00, 0x5d, // record length: 93
    // -- Handshake header --
    0x02, // handshake type: ServerHello
    0x00, 0x00, 0x59, // handshake length: 89
    // -- ServerHello body --
    0x03, 0x03, // server version: TLS 1.2
    // server random (32 bytes)
    0xed, 0x46, 0x83, 0x13, 0xa5, 0x0f, 0xfe, 0xf3, 0x74, 0x6d, 0x2c, 0x33,
    0x61, 0x17, 0xd5, 0x4d, 0xb9, 0x43, 0x66, 0xc8, 0xb6, 0xeb, 0x30, 0x9f,
    0x44, 0x4f, 0x57, 0x4e, 0x47, 0x52, 0x44, 0x01,
    0x20, // session id length: 32
    // session id (32 bytes)
    0x29, 0x63, 0x81, 0xb7, 0x0b, 0xfc, 0xe0, 0x36, 0xc9, 0xa5, 0xd7, 0xbd,
    0x2a, 0x92, 0x8f, 0xf7, 0x90, 0xa2, 0x11, 0xf7, 0xb6, 0xef, 0xa5, 0x85,
    0x37, 0x02, 0xe6, 0x09, 0xb1, 0xe2, 0xd3, 0x2f,
    0xc0, 0x30, // cipher suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
    0x00, // compression method: null
    0x00, 0x11, // extensions length: 17 bytes
    // extensions (17 bytes)
    0xff, 0x01, 0x00, 0x01, 0x00, 0x00, 0x0b, 0x00, 0x04, 0x03, 0x00, 0x01,
    0x02, 0x00, 0x17, 0x00, 0x00,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x16 = Handshake, same record type as the ClientHello.",
      colorClass: "c-rec",
    },
    {
      offset: 1,
      length: 2,
      label: "Record Version",
      description: "0x0303 = TLS 1.2. The server now uses the negotiated version at the record layer.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x005d = 93 bytes of handshake payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x02 = ServerHello, the server's response to the ClientHello.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x000059 = 89 bytes for the ServerHello body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 2,
      label: "Server Version",
      description: "0x0303 = TLS 1.2. This is the version the server selected for the connection.",
      colorClass: "c-ver",
    },
    {
      offset: 11,
      length: 32,
      label: "Server Random",
      description: "32 bytes of server-generated entropy. Combined with the client random, it seeds the session keys.",
      colorClass: "c-rand",
    },
    {
      offset: 43,
      length: 1,
      label: "Session ID Length",
      description: "0x20 = 32. The server returns a 32-byte session ID that the client may present later to resume.",
      colorClass: "c-len",
    },
    {
      offset: 44,
      length: 32,
      label: "Session ID",
      description: "The 32-byte session identifier assigned to this connection.",
      colorClass: "c-hs",
    },
    {
      offset: 76,
      length: 2,
      label: "Cipher Suite",
      description: "0xc030 = TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384: ECDHE key exchange, RSA authentication, AES-256-GCM AEAD, SHA-384 PRF. This is the single suite the server chose from the client's list. It is representative only — a typical policy mandates TLS versions but does not pin an exact cipher suite.",
      colorClass: "c-cipher",
    },
    {
      offset: 78,
      length: 1,
      label: "Compression Method",
      description: "0x00 = null. Compression stays disabled.",
      colorClass: "c-hs",
    },
    {
      offset: 79,
      length: 2,
      label: "Extensions Length",
      description: "0x0011 = 17 bytes of extensions follow.",
      colorClass: "c-len",
    },
    {
      offset: 81,
      length: 17,
      label: "Extensions",
      description: "Server's chosen extensions: renegotiation_info (0xff01), EC point formats (0x000b), and extended_master_secret (0x0017).",
      colorClass: "c-hs",
    },
  ],
  prose:
    "<p>The bank's server replies: \"Let's use this method.\"</p>" +
    "<p>That's the <strong>ServerHello</strong> — it confirms the negotiated version (TLS 1.2, offset 9), supplies its own random, and narrows your cipher-suite menu down to exactly one choice (offset 76). From here both sides know which cryptographic algorithms the rest of the handshake will use.</p>" +
    "<p>The bank still owes you its notarized ID, which arrives next.</p>",
  bullets: [
    "The chosen protocol version (TLS 1.2)",
    "32 bytes of server random data (used later in the handshake)",
    "A session ID for this session",
    "The single cipher suite selected from the client's list",
    "The selected compression method",
    "The subset of extensions the server will use",
  ],
  sequence: buildSequence(TLS_ACTORS, TLS12_MESSAGES, 2),
};
