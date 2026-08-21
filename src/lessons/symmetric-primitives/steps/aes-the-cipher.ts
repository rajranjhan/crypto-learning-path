import type { Step } from "../../../types";

export const aesTheCipher: Step = {
  id: "aes-the-cipher",
  title: "Inside AES — The Standard Block Cipher",
  prose:
    "<p>The Advanced Encryption Standard, selected by NIST in 2001 after a public, multi-year competition, is the block cipher nearly every modern protocol defaults to. It encrypts data 128 bits (16 bytes) at a time, using a key of 128, 192, or 256 bits — AES-256 is simply AES run with the longest of the three key options, not a different algorithm.</p>" +
    "<p>Each block passes through several rounds of mixing — 10 rounds for a 128-bit key, 14 for a 256-bit key — and every round repeats the same four operations. <strong>SubBytes</strong> swaps each byte for another value using a fixed lookup table, scrambling the data nonlinearly. <strong>ShiftRows</strong> rotates bytes across the block so a change in one position spreads sideways. <strong>MixColumns</strong> blends the bytes within each column together, spreading a change vertically too. <strong>AddRoundKey</strong> XORs in a fresh slice of key material, unique to that round, derived from the original key by a process called key scheduling.</p>" +
    "<p>Repeat that spreading-and-keying cycle enough times and a single flipped input bit changes roughly half the output bits, unpredictably — the same avalanche property that makes hash functions useful, and the property that makes AES's output indistinguishable from random noise without the key.</p>",
  bullets: [
    "128-bit (16-byte) blocks; key sizes of 128, 192, or 256 bits — AES-256 is the same algorithm with the longest key",
    "10, 12, or 14 rounds depending on key size, each repeating the same four operations",
    "SubBytes: a fixed lookup table swaps each byte, adding nonlinearity",
    "ShiftRows + MixColumns: spread a change across the whole block, byte by byte and column by column",
    "AddRoundKey: XORs in a fresh, unique slice of key material each round, derived from the original key",
    "Selected by NIST in 2001 after an open, multi-year public competition — not designed in secret",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">SubBytes</div>
        <div class="node-sub">swap each byte via a fixed lookup table</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node">
        <div class="node-title">ShiftRows</div>
        <div class="node-sub">rotate bytes sideways across the block</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node">
        <div class="node-title">MixColumns</div>
        <div class="node-sub">blend bytes within each column</div>
      </div>
      <div class="link"><div class="arrow">→</div></div>
      <div class="node node-proxy">
        <div class="node-title">AddRoundKey</div>
        <div class="node-sub">XOR in this round's key material</div>
      </div>
    </div>
    <p class="diagram-note">
      One pass through all four steps is one round. AES-128 repeats this
      cycle 10 times per block; AES-256 repeats it 14 times, trading some
      speed for a larger key space.
    </p>
  `,
};
