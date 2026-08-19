import type { Step } from "../../../types";
import { TLS_ACTORS, TLS12_MESSAGES, buildSequence } from "../../actors";

// Byte source: captured live on 2026-07-10 via
//   `openssl s_client -connect example.com:443 -tls1_2 -msg -state`
// ("<<< TLS 1.2, Handshake [length 0004],
// ServerHelloDone", record header "16 03 03 00 04"). ServerHelloDone has an
// empty body, so the whole record is exactly 9 bytes and is shown in full.
// Record length 0x0004 = 4 = the 4-byte handshake header that follows.
export const serverHelloDone: Step = {
  id: "server-hello-done",
  title: "Your Turn",
  bytes: [0x16, 0x03, 0x03, 0x00, 0x04, 0x0e, 0x00, 0x00, 0x00],
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
      description: "0x0004 = 4 bytes of handshake payload follow.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x0e = ServerHelloDone. It signals the server is finished sending its half of the handshake and it is now the client's turn.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x000000 = 0. ServerHelloDone carries no body; it is a pure marker.",
      colorClass: "c-len",
    },
  ],
  prose:
    "<p>A tiny but important message — the full 9-byte record is shown.</p>" +
    "<p><strong>ServerHelloDone</strong> has an empty body (handshake length 0 at offset 6); its only job is to say \"I've sent everything from my side — hello, ID, and my half of the combination lock. Now it's your turn.\"</p>",
  bullets: [
    "A zero-length message indicating the server has finished its handshake messages",
    "Signals that it is now the client's turn to respond",
  ],
  sequence: buildSequence(TLS_ACTORS, TLS12_MESSAGES, 5),
};
