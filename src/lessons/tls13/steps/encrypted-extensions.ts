import type { Step } from "../../../types";

// On the wire this record's content type is 0x17 (application_data) and its body
// is AEAD-encrypted under the handshake traffic keys, so a capture shows only
// opaque ciphertext. What follows the 5-byte record header is the DECRYPTED
// inner content: an EncryptedExtensions handshake message (type 0x08). The
// record length here (0x0006 = 6) is kept self-consistent with the 6 decrypted
// inner bytes shown, and annotations tile from offset 0 with no gaps.
export const encryptedExtensions: Step = {
  id: "encrypted-extensions",
  title: "Locking the Documents",
  bytes: [
    // -- Record header (5 bytes, visible on the wire) --
    0x17, // record type: application_data (TLS 1.3 hides handshake messages)
    0x03, 0x03, // record version: TLS 1.2 (legacy compat)
    0x00, 0x06, // record length: 6 (decrypted inner content shown)
    // -- Decrypted inner handshake message --
    0x08, // handshake type: EncryptedExtensions
    0x00, 0x00, 0x02, // handshake length: 2
    0x00, 0x00, // extensions length: 0 (no extensions in this handshake)
  ],
  annotations: [
    {
      offset: 0,
      length: 1,
      label: "Record Type",
      description: "0x17 = application_data. TLS 1.3 disguises every post-ServerHello handshake message as application data so eavesdroppers cannot even tell handshake from traffic.",
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
      description: "0x0006 = 6 bytes. On the wire this covers AEAD ciphertext plus a tag; here it frames the 6 decrypted inner bytes shown below.",
      colorClass: "c-len",
    },
    {
      offset: 5,
      length: 1,
      label: "Handshake Type",
      description: "0x08 = EncryptedExtensions. This inner byte is only visible after decrypting with the handshake traffic key.",
      colorClass: "c-hs",
    },
    {
      offset: 6,
      length: 3,
      label: "Handshake Length",
      description: "0x000002 = 2 bytes for the EncryptedExtensions body.",
      colorClass: "c-len",
    },
    {
      offset: 9,
      length: 2,
      label: "Extensions Length",
      description: "0x0000 = 0. This connection carried no additional server extensions here (e.g. ALPN, max fragment length would appear if negotiated).",
      colorClass: "c-hs",
    },
  ],
  prose:
    "<p>This is the moment the envelope actually seals — and in TLS 1.3, it happens astonishingly early.</p>" +
    "<p>The instant both key_shares were exchanged, both sides derived a shared key. From here on, every message the bank sends travels inside a record that looks like ordinary mail (0x17, the same type as real application data) but whose contents are locked.</p>" +
    "<p>The first thing sent this way is <strong>EncryptedExtensions</strong> — bank-side details, like which follow-up format it'll use, that TLS 1.2 used to send in the open ServerHello. Nobody in the mailroom can read this one. Compare that to TLS 1.2, where the bank's actual ID and signature still traveled in the open for two more messages.</p>",
  bullets: [
    "Carries server extensions not needed for key negotiation (e.g. ALPN)",
    "The first handshake message encrypted with the handshake traffic keys",
    "On the wire it looks like application_data (0x17), hiding it from eavesdroppers and middleboxes",
    "In TLS 1.2 these parameters were sent in the clear ServerHello",
  ],
};
