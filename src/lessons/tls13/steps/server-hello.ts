import type { Step } from "../../../types";

// These are the exact bytes of a real TLS 1.3 ServerHello record, prefixed with
// its 5-byte record header "16 03 03 00 9b". The record length (0x009b = 155)
// matches the 155 handshake bytes that follow, and every annotation tiles the
// record contiguously from offset 0 with no gaps or overlaps. As in the
// ClientHello, the legacy version field stays at 0x0303; the negotiated version
// (TLS 1.3) and the server's ephemeral key live in the extensions.
export const serverHello: Step = {
  id: "server-hello",
  title: "ServerHello",
  bytes: [
    // -- Record header (5 bytes) --
    0x16, // record type: handshake
    0x03, 0x03, // record version: TLS 1.2 (legacy compat)
    0x00, 0x9b, // record length: 155
    // -- Handshake header --
    0x02, // handshake type: ServerHello
    0x00, 0x00, 0x97, // handshake length: 151
    // -- ServerHello body --
    0x03, 0x03, // legacy_version: TLS 1.2
    // server random (32 bytes)
    0x6e, 0xf2, 0xbb, 0x1b, 0x06, 0x6a, 0x2f, 0x53, 0x53, 0xfb, 0x4d, 0x1a,
    0xe4, 0x71, 0xd6, 0xf6, 0xf0, 0xe5, 0xe3, 0xbb, 0x25, 0x6e, 0xcf, 0xed,
    0xa4, 0x60, 0xda, 0xa3, 0x1e, 0x63, 0xfc, 0x16,
    0x20, // session id length: 32
    // legacy session id echo (32 bytes)
    0x2a, 0x30, 0xb5, 0x60, 0x45, 0x24, 0xad, 0x65, 0x5c, 0xf4, 0x05, 0xec,
    0x9d, 0x84, 0xb9, 0x6f, 0x85, 0x95, 0x12, 0xf8, 0xe2, 0x59, 0xf3, 0x0e,
    0x7e, 0x43, 0xed, 0xbc, 0x4b, 0x50, 0x63, 0xde,
    0x13, 0x02, // cipher suite: TLS_AES_256_GCM_SHA384
    0x00, // compression method: null
    0x00, 0x4f, // extensions length: 79 bytes
    // extensions (79 bytes)
    0x00, 0x2b, 0x00, 0x02, 0x03, 0x04, 0x00, 0x33, 0x00, 0x45, 0x00, 0x17,
    0x00, 0x41, 0x04, 0xaf, 0x62, 0xb7, 0x8d, 0xb3, 0xe1, 0x12, 0x83, 0x1a,
    0xe5, 0x62, 0xe3, 0x7c, 0x81, 0x89, 0xa9, 0x41, 0x83, 0x14, 0x06, 0xaf,
    0x90, 0x8d, 0x58, 0x7c, 0x6f, 0x7a, 0xa6, 0xb1, 0x11, 0xc2, 0x8d, 0x7e,
    0xaa, 0x33, 0x1a, 0x3d, 0x73, 0x47, 0x8f, 0x90, 0x13, 0x28, 0x84, 0x31,
    0xed, 0x28, 0xad, 0x5a, 0x8e, 0x1a, 0x98, 0xde, 0x9b, 0xd1, 0x17, 0xe4,
    0xe2, 0xd5, 0x93, 0xfa, 0x2a, 0x0d, 0xd1,
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
      description: "0x0303 = TLS 1.2. The record layer stays at 1.2; the true version is confirmed in the supported_versions extension.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "Record Length",
      description: "0x009b = 155 bytes of handshake payload follow.",
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
      description: "0x000097 = 151 bytes for the ServerHello body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 2,
      label: "Legacy Version",
      description: "0x0303 = TLS 1.2. Frozen for compatibility; the server's real choice of TLS 1.3 is carried in supported_versions below.",
      colorClass: "c-ver",
    },
    {
      offset: 11,
      length: 32,
      label: "Server Random",
      description: "32 bytes of server-generated entropy, combined with the client random in the TLS 1.3 key schedule.",
      colorClass: "c-rand",
    },
    {
      offset: 43,
      length: 1,
      label: "Session ID Length",
      description: "0x20 = 32. The server echoes the client's legacy session ID length.",
      colorClass: "c-len",
    },
    {
      offset: 44,
      length: 32,
      label: "Legacy Session ID Echo",
      description: "The server echoes back the exact 32-byte legacy session ID the client sent. This echo has no cryptographic role in TLS 1.3; it only preserves the TLS 1.2 look on the wire.",
      colorClass: "c-hs",
    },
    {
      offset: 76,
      length: 2,
      label: "Cipher Suite",
      description: "0x1302 = TLS_AES_256_GCM_SHA384: AES-256-GCM AEAD with a SHA-384 key schedule. TLS 1.3 suites fix only the AEAD and hash — key exchange (ECDHE) and signatures are negotiated by extension. This is representative only; a typical policy mandates TLS versions but does not pin an exact suite.",
      colorClass: "c-cipher",
    },
    {
      offset: 78,
      length: 1,
      label: "Compression Method",
      description: "0x00 = null. Compression is not permitted in TLS 1.3.",
      colorClass: "c-hs",
    },
    {
      offset: 79,
      length: 2,
      label: "Extensions Length",
      description: "0x004f = 79 bytes of extensions follow.",
      colorClass: "c-len",
    },
    {
      offset: 81,
      length: 79,
      label: "Extensions",
      description: "Just two extensions in TLS 1.3: supported_versions (0x002b) confirming TLS 1.3 = 0x0304, and key_share (0x0033) carrying the server's ephemeral public key on secp256r1. With both key_shares exchanged, each side can now derive the shared secret and encrypt everything that follows.",
      colorClass: "c-rand",
    },
  ],
  prose:
    "The server answers with its selections. It picks one cipher suite (offset 76) and, in the extensions (offset 81), confirms TLS 1.3 via supported_versions and returns its own ephemeral public key in key_share. That single key_share completes the ECDHE agreement: from the very next message onward, both sides share a secret and the rest of the handshake is encrypted. This is the big shift from TLS 1.2, where the certificate and key exchange were still sent in the clear.",
  bullets: [
    "A legacy version of TLS 1.2, with the real choice of TLS 1.3 in supported_versions",
    "32 bytes of server random data (used in the key schedule)",
    "The client's legacy session ID echoed back verbatim",
    "The single cipher suite selected from the client's list",
    "The server's ephemeral public key in the key_share extension",
  ],
};
