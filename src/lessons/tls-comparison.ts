import type { Figure } from "../types";

export const tlsComparisonFigure: Figure = {
  variant: "wide",
  body: `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>TLS 1.2</th>
          <th>TLS 1.3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Round trips before app data</th>
          <td>Usually 2 round trips</td>
          <td>Usually 1 round trip</td>
        </tr>
        <tr>
          <th>Cipher suites</th>
          <td>Mix key exchange, authentication, cipher, and hash choices</td>
          <td>Simplified: cipher suite mainly names AEAD + hash; key exchange/signature move to extensions</td>
        </tr>
        <tr>
          <th>Key exchange expectation</th>
          <td>Can negotiate older patterns; ECDHE gives forward secrecy</td>
          <td>Ephemeral Diffie-Hellman is the normal path; static RSA key transport is gone</td>
        </tr>
        <tr>
          <th>Handshake visibility</th>
          <td>Most handshake messages are visible until ChangeCipherSpec/Finished</td>
          <td>ClientHello and ServerHello are visible; messages after ServerHello are encrypted with handshake traffic keys</td>
        </tr>
      </tbody>
    </table>
  `,
  caption:
    "TLS 1.3 is not just TLS 1.2 with fewer bytes. It moves key establishment earlier, simplifies negotiation, and encrypts more of the handshake.",
};
