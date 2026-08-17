import type { Step } from "../../../types";

// Byte source: captured live on 2026-07-10 with
//   `openssl s_client -connect example.com:443 -tls1_2 -msg -state`
// These are the exact bytes of the real TLS 1.2 ClientHello record openssl emitted (the ">>> TLS
// 1.2, Handshake [length 00cc], ClientHello" block, prefixed with its 5-byte
// record header "16 03 01 00 cc"). Nothing here is fabricated: the record
// length (0x00cc = 204) matches the 204 handshake bytes that follow, and every
// annotation below tiles the record contiguously from offset 0 with no gaps or
// overlaps.
export const clientHello: Step = {
  id: "client-hello",
  title: "Introductions",
  bytes: [
    // -- Record header (5 bytes) --
    0x16, // record type: handshake
    0x03, 0x01, // record version: TLS 1.0 (legacy compat)
    0x00, 0xcc, // record length: 204
    // -- Handshake header --
    0x01, // handshake type: ClientHello
    0x00, 0x00, 0xc8, // handshake length: 200
    // -- ClientHello body --
    0x03, 0x03, // client version: TLS 1.2
    // client random (32 bytes)
    0x3e, 0xd0, 0x79, 0x08, 0x51, 0x14, 0x9f, 0x42, 0xcd, 0xe5, 0x29, 0x79,
    0x24, 0x65, 0x22, 0x59, 0x1a, 0x77, 0xad, 0x7d, 0x72, 0xd5, 0xf4, 0xd8,
    0x0f, 0xb1, 0x55, 0x51, 0xcc, 0x7b, 0x6a, 0x1d,
    0x00, // session id length: 0
    0x00, 0x36, // cipher suites length: 54 bytes (27 suites)
    // cipher suites (54 bytes)
    0xc0, 0x2c, 0xc0, 0x30, 0x00, 0x9f, 0xcc, 0xa9, 0xcc, 0xa8, 0xcc, 0xaa,
    0xc0, 0x2b, 0xc0, 0x2f, 0x00, 0x9e, 0xc0, 0x24, 0xc0, 0x28, 0x00, 0x6b,
    0xc0, 0x23, 0xc0, 0x27, 0x00, 0x67, 0xc0, 0x0a, 0xc0, 0x14, 0x00, 0x39,
    0xc0, 0x09, 0xc0, 0x13, 0x00, 0x33, 0x00, 0x9d, 0x00, 0x9c, 0x00, 0x3d,
    0x00, 0x3c, 0x00, 0x35, 0x00, 0x2f,
    0x01, // compression methods length: 1
    0x00, // compression method: null
    0x00, 0x69, // extensions length: 105 bytes
    // extensions (105 bytes)
    0xff, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x0e, 0x00,
    0x00, 0x0b, 0x65, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x63, 0x6f,
    0x6d, 0x00, 0x0b, 0x00, 0x02, 0x01, 0x00, 0x00, 0x0a, 0x00, 0x0c, 0x00,
    0x0a, 0x00, 0x1d, 0x00, 0x17, 0x00, 0x1e, 0x00, 0x18, 0x00, 0x19, 0x00,
    0x23, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00, 0x17, 0x00, 0x00, 0x00,
    0x0d, 0x00, 0x2a, 0x00, 0x28, 0x04, 0x03, 0x05, 0x03, 0x06, 0x03, 0x08,
    0x07, 0x08, 0x08, 0x08, 0x09, 0x08, 0x0a, 0x08, 0x0b, 0x08, 0x04, 0x08,
    0x05, 0x08, 0x06, 0x04, 0x01, 0x05, 0x01, 0x06, 0x01, 0x03, 0x03, 0x03,
    0x01, 0x03, 0x02, 0x04, 0x02, 0x05, 0x02, 0x06, 0x02,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x16 = Handshake. TLS wraps everything in records; this one carries handshake data.",
      colorClass: "c-rec",
    },
    {
      offset: 1,
      length: 2,
      label: "Record Version",
      description: "0x0301 = TLS 1.0. Clients pin the record-layer version low for middlebox compatibility; the real version is negotiated inside.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x00cc = 204 bytes of handshake payload follow this header.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x01 = ClientHello, the first message of the handshake.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x0000c8 = 200 bytes for the ClientHello body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 2,
      label: "Client Version",
      description: "0x0303 = TLS 1.2. This is the highest version the client offers at the handshake layer.",
      colorClass: "c-ver",
    },
    {
      offset: 11,
      length: 32,
      label: "Client Random",
      description: "32 bytes of client-generated entropy, mixed into key derivation to make each session's keys unique.",
      colorClass: "c-rand",
    },
    {
      offset: 43,
      length: 1,
      label: "Session ID Length",
      description: "0x00 = no session ID. The client is not attempting to resume a prior session.",
      colorClass: "c-len",
    },
    {
      offset: 44,
      length: 2,
      label: "Cipher Suites Length",
      description: "0x0036 = 54 bytes = 27 cipher suites offered.",
      colorClass: "c-len",
    },
    {
      offset: 46,
      length: 54,
      label: "Cipher Suites",
      description: "The ordered list of AEAD/CBC suites the client supports (e.g. 0xc02c ECDHE-ECDSA-AES256-GCM-SHA384, 0xc030 ECDHE-RSA-AES256-GCM-SHA384). The server picks one.",
      colorClass: "c-cipher",
    },
    {
      offset: 100,
      length: 1,
      label: "Compression Methods Length",
      description: "0x01 = one compression method listed.",
      colorClass: "c-len",
    },
    {
      offset: 101,
      length: 1,
      label: "Compression Method",
      description: "0x00 = null. TLS-level compression is disabled by default (CRIME attack mitigation).",
      colorClass: "c-hs",
    },
    {
      offset: 102,
      length: 2,
      label: "Extensions Length",
      description: "0x0069 = 105 bytes of extensions follow.",
      colorClass: "c-len",
    },
    {
      offset: 104,
      length: 105,
      label: "Extensions",
      description: "SNI (server_name = example.com), supported_groups, signature_algorithms, EC point formats, etc. Extensions carry the modern parameters TLS 1.2 needs.",
      colorClass: "c-hs",
    },
  ],
  prose:
    "<p>Think of TLS 1.2 like sending a confidential document to your bank, but the mail has to pass through a shared office mailroom where anyone could peek.</p>" +
    "<p>The conversation opens with your computer speaking first: \"I want to talk securely — here's what encryption methods I support.\"</p>" +
    "<p>On the wire that's a <strong>ClientHello</strong>: the highest protocol version it offers (TLS 1.2, offset 9), fresh random entropy, and the ordered list of cipher suites it's willing to use. The bank's server chooses from this menu next.</p>",
  bullets: [
    "The protocol version the client supports",
    "32 bytes of client random data (used later in the handshake)",
    "An optional session ID to resume a previous session",
    "The ordered list of cipher suites the client will accept",
    "The list of compression methods (none used)",
    "A list of extensions (SNI, signature algorithms, supported curves, etc.)",
  ],
  callouts: [
    {
      requirementId: "Versions",
      title: "TLS version policy",
      body: "Modern deployments require TLS 1.2 or higher and support TLS 1.3; connections below TLS 1.2 are rejected as insecure.",
    },
  ],
};
