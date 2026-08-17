import type { Step } from "../../../types";

// A 6-byte ChangeCipherSpec record: header "14 03 03 00 01" plus the single
// payload byte 0x01. In TLS 1.3 this record carries no meaning — it is a legacy
// no-op sent only so that middleboxes expecting a TLS 1.2-style flow see the
// familiar "change cipher spec" marker. The record length 0x0001 = 1 matches
// its single payload byte, and all six bytes are annotated with no gaps.
export const serverChangeCipherSpec: Step = {
  id: "server-change-cipher-spec",
  title: "Server ChangeCipherSpec",
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
      description: "0x01 = the ChangeCipherSpec message. In TLS 1.3 this byte triggers no state change at all; the keys already switched right after the ServerHello key_share.",
      colorClass: "c-hs",
    },
  ],
  prose:
    "This tiny record is a fossil. In TLS 1.2 the ChangeCipherSpec message genuinely signaled the switch to encrypted records, but TLS 1.3 derives and activates its handshake keys immediately after the key_shares are exchanged. The record is retained purely for 'middlebox compatibility mode': many firewalls and proxies were built assuming a TLS 1.2 handshake shape, and would choke on a flow that never sent a ChangeCipherSpec. So both sides emit this harmless 0x01 and ignore it on receipt.",
  bullets: [
    "A single-byte (0x01) ChangeCipherSpec record",
    "A legacy no-op in TLS 1.3 — it changes no cipher state",
    "Sent only for middlebox compatibility, so the flow resembles TLS 1.2",
    "The real key switch already happened after the ServerHello key_share",
  ],
};
