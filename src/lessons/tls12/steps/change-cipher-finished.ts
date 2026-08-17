import type { Step } from "../../../types";

// Byte source: captured live on 2026-07-10 with a Python `ssl` memory-BIO
// client (TLS 1.2 pinned) against example.com:443,
// reading the raw outbound records we wrote. Two back-to-back records
// are shown: the 6-byte ChangeCipherSpec (">>> ChangeCipherSpec [length
// 0001]", header "14 03 03 00 01", payload 0x01) and the Finished record
// (">>> TLS 1.2, RecordHeader [length 0028]", header "16 03 03 00 28"). The
// Finished record's 5-byte header is real; its 40-byte payload is the actual
// AEAD-encrypted Finished handshake message on the wire (opaque ciphertext).
// Lengths are self-consistent: CCS length 0x0001 = 1, Finished record length
// 0x0028 = 40. Annotations tile from offset 0 with no gaps or overlaps.
export const changeCipherFinished: Step = {
  id: "change-cipher-finished",
  title: "Locking the Documents",
  bytes: [
    0x14, 0x03, 0x03, 0x00, 0x01, 0x01, 0x16, 0x03, 0x03, 0x00, 0x28, 0x27,
    0xec, 0xc0, 0x0d, 0xcb, 0xdb, 0x28, 0xe4, 0x82, 0xee, 0x7c, 0xc3, 0xb7,
    0xf1, 0xd4, 0x59, 0xe4, 0xa2, 0x97, 0xd7, 0x9f, 0x29, 0x0c, 0x20, 0x76,
    0xed, 0x6b, 0xbd, 0x2e, 0x5d, 0xc9, 0xfa, 0x32, 0x35, 0xb2, 0x7c, 0x06,
    0x26, 0xa7, 0x44,
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "CCS Record Type",
      description: "0x14 = ChangeCipherSpec. This is its own record content type, distinct from Handshake (0x16).",
      colorClass: "c-hs",
    },
    {
      offset: 1,
      length: 2,
      label: "CCS Record Version",
      description: "0x0303 = TLS 1.2.",
      colorClass: "c-ver",
    },
    {
      offset: 3,
      length: 2,
      label: "CCS Record Length",
      description: "0x0001 = 1 byte of payload follows.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "CCS Payload",
      description: "0x01 = the single ChangeCipherSpec message. From the very next record onward, this sender's traffic is encrypted with the newly negotiated keys.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 1,
      label: "Finished Record Type",
      description: "0x16 = Handshake. The Finished message is still a handshake message — but it is the first one sent under the new cipher.",
      colorClass: "c-rec",
    },
    {
      offset: 7,
      length: 2,
      label: "Finished Record Version",
      description: "0x0303 = TLS 1.2.",
      colorClass: "c-ver",
    },
    {
      offset: 9,
      length: 2,
      label: "Finished Record Length",
      description: "0x0028 = 40 bytes of encrypted payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 11,
      length: 40,
      label: "Encrypted Finished",
      description: "The Finished handshake message, now AEAD-encrypted (AES-256-GCM). Its plaintext is a verify_data hash over the entire handshake transcript; because these bytes are ciphertext they look random. If the peer can decrypt and verify it, both sides have proven they derived identical keys and that no message was tampered with.",
      colorClass: "c-cipher",
    },
  ],
  prose:
    "<p>Both sides now say, in effect: \"From here on, everything I send is locked with our shared key.\"</p>" +
    "<p>First the tiny <strong>ChangeCipherSpec</strong> record (offsets 0-5) announces that out loud on the wire.</p>" +
    "<p>Immediately after, the <strong>Finished</strong> record (offset 6 onward) is the first message actually sealed with the new AES-256-GCM keys (offset 11) — a hash of the entire handshake so far, now unreadable gibberish to anyone in the mailroom.</p>" +
    "<p>Each side sends its own ChangeCipherSpec + Finished; only someone holding the shared key can open either one.</p>",
  bullets: [
    "ChangeCipherSpec: a single byte (0x01) signaling the switch to encrypted communication",
    "Finished: verify data derived from a hash of all previous handshake messages",
    "The Finished body is the first message encrypted with the new keys, so it is opaque ciphertext",
    "Each side sends its own pair; verifying the peer's Finished proves both agreed on keys and nobody altered the negotiation",
  ],
};
