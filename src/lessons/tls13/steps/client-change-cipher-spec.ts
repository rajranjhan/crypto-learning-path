import type { Step } from "../../../types";

// A 6-byte ChangeCipherSpec record from the client: header "14 03 03 00 01" plus
// the single payload byte 0x01. As with the server's, this is a legacy no-op in
// TLS 1.3, sent only for middlebox compatibility. The record length 0x0001 = 1
// matches its single payload byte, and all six bytes are annotated with no gaps.
export const clientChangeCipherSpec: Step = {
  id: "client-change-cipher-spec",
  title: "Client ChangeCipherSpec",
  bytes: [0x14, 0x03, 0x03, 0x00, 0x01, 0x01],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x14 = ChangeCipherSpec, its own record content type distinct from Handshake (0x16).",
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
      description: "0x0001 = 1 byte of payload follows.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "CCS Payload",
      description: "0x01 = the ChangeCipherSpec message. As on the server side, this byte changes no cipher state in TLS 1.3.",
      colorClass: "c-hs",
    },
  ],
  prose:
    "The client sends its own ChangeCipherSpec for the same reason the server did: pure middlebox compatibility. In TLS 1.3 the client switched to encrypted records the moment it processed the server's key_share, so this byte triggers no state change. Emitting it keeps the client's flow looking like a familiar TLS 1.2 handshake to any firewall or proxy on the path. Both endpoints send this record once, and both ignore it on receipt.",
  bullets: [
    "A single-byte (0x01) ChangeCipherSpec record from the client",
    "A legacy no-op in TLS 1.3 — it changes no cipher state",
    "Sent only for middlebox compatibility, mirroring the server's record",
    "The client already switched to encrypted records after the ServerHello key_share",
  ],
};
