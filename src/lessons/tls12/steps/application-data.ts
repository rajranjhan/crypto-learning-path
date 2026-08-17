import type { Step } from "../../../types";

// Byte source: captured live on 2026-07-10 with a Python `ssl` memory-BIO
// client (TLS 1.2 pinned) against example.com:443. These are the exact on-wire
// bytes of the first Application Data record
// we wrote after the handshake (an encrypted "GET / HTTP/1.1" request). Length
// is self-consistent: record content type 0x17, version 0x0303, record length
// 0x0050 = 80, followed by exactly 80 bytes of AEAD ciphertext. Annotations
// tile from offset 0 with no gaps or overlaps.
export const applicationData: Step = {
  id: "application-data",
  title: "Tamper-Proofing",
  bytes: [
    0x17, 0x03, 0x03, 0x00, 0x50, 0xa3, 0xc2, 0x9f, 0x7f, 0x3e, 0xb4, 0xa2,
    0x8a, 0xa0, 0x1f, 0x77, 0x9b, 0x90, 0x1b, 0xae, 0x8a, 0x43, 0xb9, 0x9f,
    0x40, 0x0b, 0x34, 0x4d, 0xa3, 0xbf, 0xf6, 0x12, 0xbe, 0x8d, 0x0d, 0x12,
    0x94, 0xb6, 0xdc, 0xd5, 0xa5, 0xd1, 0xae, 0x17, 0xf0, 0x69, 0xad, 0x84,
    0xfe, 0x9a, 0xbd, 0x18, 0xb3, 0x6d, 0x1f, 0xd4, 0x56, 0xab, 0xde, 0x2d,
    0x8b, 0x7e, 0xf8, 0xd4, 0x78, 0xd7, 0x05, 0x28, 0x2c, 0x5c, 0xa6, 0xc2,
    0x7b, 0x2e, 0x50, 0xd5, 0x90, 0x5e, 0x14, 0x44, 0xd1, 0x45, 0x73, 0x33,
    0xd7,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x17 = Application Data. Once the handshake finishes, all real traffic rides in these records.",
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
      description: "0x0050 = 80 bytes of encrypted payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 80,
      label: "Encrypted Payload",
      description: "The AES-256-GCM-protected application bytes (here an HTTP GET request). It includes the GCM explicit nonce, the ciphertext, and the authentication tag. To anyone on the wire it is indistinguishable from random data — this is the confidentiality and integrity TLS exists to provide.",
      colorClass: "c-cipher",
    },
  ],
  prose:
    "<p>This is the payoff. Your computer sends something like \"transfer $500 to savings\" — and to anyone in the mailroom, it becomes unreadable gibberish, like a document locked in a briefcase only you and the bank have keys to.</p>" +
    "<p>TLS also attaches something like a wax seal to that document: an authentication tag proving nobody altered it in transit. If even one character were changed, the seal would break, and both sides would know immediately.</p>" +
    "<p>On the wire this is the first real <strong>Application Data</strong> record — an encrypted HTTP request. Every byte after the 5-byte record header (offset 5) is AES-256-GCM ciphertext with that authentication tag baked in.</p>" +
    "<p>From here the connection simply exchanges 0x17 records in both directions until one side closes. But TLS only protects data in transit — the moment it is decrypted and stored, other controls take over.</p>",
  bullets: [
    "A record type of 0x17 (Application Data)",
    "The AES-256-GCM-encrypted payload (here an HTTP request)",
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
      requirementId: "Rotation",
      title: "Key rotation",
      body: "Encryption keys should be rotated on a schedule — more frequently for highly sensitive data — so the blast radius of any compromised key stays small.",
    },
  ],
};
