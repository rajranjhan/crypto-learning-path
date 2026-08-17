import type { Step } from "../../../types";

// A 6-byte ChangeCipherSpec record: header "14 03 03 00 01" plus the single
// payload byte 0x01. In TLS 1.3 this record carries no meaning — it is a legacy
// no-op sent only so that middleboxes expecting a TLS 1.2-style flow see the
// familiar "change cipher spec" marker. The record length 0x0001 = 1 matches
// its single payload byte, and all six bytes are annotated with no gaps.
export const serverChangeCipherSpec: Step = {
  id: "server-change-cipher-spec",
  title: "Keeping Up Appearances",
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
    "<p>Here's a strange little envelope that does nothing at all.</p>" +
    "<p>The keys are already locked in — they were ready the moment the bank's key_share arrived. But some old equipment in the mailroom only knows how to handle mail shaped like TLS 1.2, and would jam if a delivery never included this specific slip.</p>" +
    "<p>So the bank sends a <strong>ChangeCipherSpec</strong> record anyway: one byte, 0x01, meaning nothing. Nobody reads it. Nobody's cipher state changes. It's purely a costume, so old mailroom sorting machines see the shape they expect and wave the real mail through.</p>",
  bullets: [
    "A single-byte (0x01) ChangeCipherSpec record",
    "A legacy no-op in TLS 1.3 — it changes no cipher state",
    "Sent only for middlebox compatibility, so the flow resembles TLS 1.2",
    "The real key switch already happened after the ServerHello key_share",
  ],
};
