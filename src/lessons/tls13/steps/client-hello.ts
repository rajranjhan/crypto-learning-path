import type { Step } from "../../../types";

// These are the exact bytes of a real TLS 1.3 ClientHello record, prefixed with
// its 5-byte record header "16 03 03 01 15". The record length (0x0115 = 277)
// matches the 277 handshake bytes that follow, and every annotation below tiles
// the record contiguously from offset 0 with no gaps or overlaps. In TLS 1.3 the
// legacy record and client-version fields are pinned at 0x0303 (TLS 1.2) for
// middlebox compatibility; the real protocol version and the client's ephemeral
// key live inside the extensions block.
export const clientHello: Step = {
  id: "client-hello",
  title: "ClientHello",
  bytes: [
    // -- Record header (5 bytes) --
    0x16, // record type: handshake
    0x03, 0x03, // record version: TLS 1.2 (legacy compat)
    0x01, 0x15, // record length: 277
    // -- Handshake header --
    0x01, // handshake type: ClientHello
    0x00, 0x01, 0x11, // handshake length: 273
    // -- ClientHello body --
    0x03, 0x03, // legacy_version: TLS 1.2
    // client random (32 bytes)
    0xd4, 0xd2, 0x96, 0xe7, 0xb4, 0x86, 0x14, 0x6c, 0xfc, 0xc4, 0x40, 0xb9,
    0x70, 0x39, 0x8a, 0x23, 0x0d, 0x36, 0xd1, 0x43, 0x5e, 0xc4, 0x75, 0x93,
    0x08, 0xfb, 0xc0, 0xca, 0xf6, 0x6d, 0xce, 0x4f,
    0x20, // session id length: 32
    // legacy session id (32 bytes)
    0x2a, 0x30, 0xb5, 0x60, 0x45, 0x24, 0xad, 0x65, 0x5c, 0xf4, 0x05, 0xec,
    0x9d, 0x84, 0xb9, 0x6f, 0x85, 0x95, 0x12, 0xf8, 0xe2, 0x59, 0xf3, 0x0e,
    0x7e, 0x43, 0xed, 0xbc, 0x4b, 0x50, 0x63, 0xde,
    0x00, 0x06, // cipher suites length: 6 bytes (3 suites)
    // cipher suites (6 bytes)
    0x13, 0x02, 0x13, 0x03, 0x13, 0x01,
    0x01, // compression methods length: 1
    0x00, // compression method: null
    0x00, 0xc2, // extensions length: 194 bytes
    // extensions (194 bytes)
    0x00, 0x00, 0x00, 0x10, 0x00, 0x0e, 0x00, 0x00, 0x0b, 0x65, 0x78, 0x61,
    0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d, 0x00, 0x0b, 0x00, 0x02,
    0x01, 0x00, 0x00, 0x0a, 0x00, 0x12, 0x00, 0x10, 0x11, 0xec, 0x00, 0x1d,
    0x00, 0x17, 0x00, 0x1e, 0x00, 0x18, 0x00, 0x19, 0x01, 0x00, 0x01, 0x01,
    0x00, 0x23, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00, 0x17, 0x00, 0x00,
    0x00, 0x0d, 0x00, 0x2a, 0x00, 0x28, 0x09, 0x05, 0x09, 0x06, 0x09, 0x04,
    0x04, 0x03, 0x05, 0x03, 0x06, 0x03, 0x08, 0x07, 0x08, 0x08, 0x08, 0x1a,
    0x08, 0x1b, 0x08, 0x1c, 0x08, 0x09, 0x08, 0x0a, 0x08, 0x0b, 0x08, 0x04,
    0x08, 0x05, 0x08, 0x06, 0x04, 0x01, 0x05, 0x01, 0x06, 0x01, 0x00, 0x2b,
    0x00, 0x03, 0x02, 0x03, 0x04, 0x00, 0x2d, 0x00, 0x02, 0x01, 0x01, 0x00,
    0x33, 0x00, 0x47, 0x00, 0x45, 0x00, 0x17, 0x00, 0x41, 0x04, 0xb5, 0xd4,
    0xc4, 0x50, 0xd3, 0xdc, 0x62, 0x77, 0x83, 0x1e, 0xaa, 0xd8, 0xb5, 0xc3,
    0x7f, 0x4f, 0xd8, 0xdf, 0x2d, 0xd2, 0x16, 0xc8, 0xc8, 0x66, 0xd0, 0xdb,
    0x4d, 0xf5, 0x8b, 0x65, 0xe2, 0x8b, 0xba, 0x70, 0x74, 0x79, 0x6b, 0x83,
    0x72, 0x8a, 0xfd, 0x89, 0x67, 0x2a, 0x04, 0xfc, 0x85, 0x09, 0x6b, 0x95,
    0xa9, 0x76, 0x6d, 0x1d, 0xdc, 0x51, 0xf6, 0xc1, 0xa6, 0xdb, 0x29, 0x2a,
    0x7c, 0x0d,
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
      description: "0x0303 = TLS 1.2. TLS 1.3 keeps the record-layer version pinned at 1.2 so middleboxes accept the packet; the real version is signaled in the supported_versions extension.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x0115 = 277 bytes of handshake payload follow this header.",
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
      description: "0x000111 = 273 bytes for the ClientHello body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 2,
      label: "Legacy Version",
      description: "0x0303 = TLS 1.2. In TLS 1.3 this field is frozen at 1.2; the true offer (TLS 1.3) lives in the supported_versions extension.",
      colorClass: "c-ver",
    },
    {
      offset: 11,
      length: 32,
      label: "Client Random",
      description: "32 bytes of client-generated entropy, mixed into the key schedule so each session derives unique keys.",
      colorClass: "c-rand",
    },
    {
      offset: 43,
      length: 1,
      label: "Session ID Length",
      description: "0x20 = 32. TLS 1.3 has no real session resumption via session IDs, but the client sends a random 32-byte legacy ID so the exchange looks like a TLS 1.2 session to middleboxes.",
      colorClass: "c-len",
    },
    {
      offset: 44,
      length: 32,
      label: "Legacy Session ID",
      description: "A 32-byte value with no protocol meaning in TLS 1.3; it exists only for backwards-compatible appearance on the wire.",
      colorClass: "c-hs",
    },
    {
      offset: 76,
      length: 2,
      label: "Cipher Suites Length",
      description: "0x0006 = 6 bytes = 3 cipher suites offered.",
      colorClass: "c-len",
    },
    {
      offset: 78,
      length: 6,
      label: "Cipher Suites",
      description: "The TLS 1.3 AEAD suites the client supports: 0x1302 TLS_AES_256_GCM_SHA384, 0x1303 TLS_CHACHA20_POLY1305_SHA256, 0x1301 TLS_AES_128_GCM_SHA256. TLS 1.3 suites name only an AEAD cipher and a hash — the key exchange and signature are negotiated separately.",
      colorClass: "c-cipher",
    },
    {
      offset: 84,
      length: 1,
      label: "Compression Methods Length",
      description: "0x01 = one compression method listed.",
      colorClass: "c-len",
    },
    {
      offset: 85,
      length: 1,
      label: "Compression Method",
      description: "0x00 = null. TLS 1.3 forbids compression entirely; the single null entry is kept for legacy framing.",
      colorClass: "c-hs",
    },
    {
      offset: 86,
      length: 2,
      label: "Extensions Length",
      description: "0x00c2 = 194 bytes of extensions follow.",
      colorClass: "c-len",
    },
    {
      offset: 88,
      length: 194,
      label: "Extensions",
      description: "The heart of a TLS 1.3 ClientHello. Includes SNI (server_name = example.com), supported_groups, signature_algorithms, supported_versions (0x002b, announcing TLS 1.3 = 0x0304), and — critically — key_share (0x0033), which carries the client's ephemeral public key so key agreement can complete in one round trip.",
      colorClass: "c-rand",
    },
  ],
  prose:
    "The handshake opens with the client's proposal. On the wire the legacy version and session-id fields (offsets 9 and 44) still look like TLS 1.2 for middlebox compatibility, but the real work happens in the extensions (offset 88). There the client signals TLS 1.3 via supported_versions and, unlike TLS 1.2, already includes its ephemeral public key in the key_share extension. This lets the server compute the shared secret from the very first exchange, so key agreement finishes in one round trip.",
  bullets: [
    "A legacy version pinned at TLS 1.2, with the real TLS 1.3 offer in supported_versions",
    "32 bytes of client random data (used in the key schedule)",
    "A random legacy session ID kept only for middlebox compatibility",
    "The TLS 1.3 AEAD cipher suites the client will accept",
    "The key_share extension carrying the client's ephemeral public key",
  ],
  callouts: [
    {
      requirementId: "Versions",
      title: "TLS version policy",
      body: "Modern deployments require TLS 1.2 and support TLS 1.3. TLS 1.3 removes legacy ciphers and encrypts most of the handshake.",
    },
  ],
};
