import type { Step } from "../../../types";

export const passwordHashing: Step = {
  id: "password-hashing",
  title: "Why Passwords Need a Different Tool",
  prose:
    "<p>SHA-256 is fast — that's exactly the wrong property for storing a password. A fast hash lets an attacker who steals a password database try billions of guesses per second on ordinary hardware, checking each guess's hash against the stolen table. Adding a salt (a random value stored alongside each hash, mixed in before hashing) stops identical passwords from producing identical hashes, but an attacker can still brute-force each one individually, just as fast as before.</p>" +
    "<p>Password hashing functions solve this by being deliberately, tunably slow: <strong>bcrypt</strong>, <strong>scrypt</strong>, and <strong>Argon2</strong> (the current recommended default) all require a configurable amount of computation — and, for scrypt and Argon2, a configurable amount of memory — per hash. That cost is negligible for a server checking one login attempt, but it multiplies directly into the cost of trying billions of guesses, turning a stolen database from an instant compromise into a genuinely expensive one.</p>" +
    "<p>The rule of thumb: SHA-2 and HMAC are for fingerprinting and authenticating data that's already high-entropy — a handshake transcript, an API payload. A human-chosen password is comparatively low-entropy and needs a purpose-built, deliberately slow function instead.</p>",
  bullets: [
    "SHA-256 is fast by design — exactly the wrong property for hashing something an attacker will try to brute-force",
    "A salt (random, stored per-password) stops identical passwords from producing identical hashes, but doesn't slow down guessing on its own",
    "bcrypt, scrypt, and Argon2 (the current recommended default) are deliberately slow and tunable, making large-scale guessing expensive rather than instant",
    "scrypt and Argon2 also require a configurable amount of memory, which resists cheap parallel hardware (GPUs, ASICs) better than a CPU-time cost alone",
    "Rule of thumb: SHA-2/HMAC for fingerprinting and authenticating high-entropy data; bcrypt/scrypt/Argon2 specifically for low-entropy human-chosen passwords",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">❌ SHA-256(password)</div>
        <div class="node-sub">fast — billions of guesses/sec against a stolen database</div>
      </div>
      <div class="node" style="border-color:#047857;">
        <div class="node-title" style="color:#047857;">✅ Argon2(password)</div>
        <div class="node-sub">deliberately slow &amp; memory-hard — orders of magnitude more expensive to brute-force</div>
      </div>
    </div>
    <p class="diagram-note">
      Same input, wildly different attacker economics. The hash function
      isn't broken in either case — SHA-256 is simply the wrong tool for
      this particular job.
    </p>
  `,
};
