import type { Step } from "../../../types";

export const replayProtection: Step = {
  id: "replay-protection",
  title: "Why Every Slip Has a Timestamp — Stopping Replay",
  prose:
    "<p>Notice that every Authenticator in the last three steps was a timestamp, sealed fresh, every single time. That's not incidental — it's the entire defense against a specific attack: someone copying a slip as it goes by and reusing it later to walk through the same door. A Door Pass alone doesn't stop that; the pass is reusable within its lifetime, the same way a wristband is. What stops it is that the door (or desk) remembers every Authenticator it has seen recently and rejects an exact repeat, and it also rejects anything too old to still be \"right now.\"</p>" +
    "<p>That window — how old is too old — is the <strong>clock skew tolerance</strong>, usually a few minutes. It's why every machine in a Kerberos realm needs a reasonably synchronized clock (this is the actual, mundane reason Windows domains lean so hard on NTP): if your clock and the Staff House's clock disagree by more than the skew window, your perfectly genuine Authenticators start getting rejected as stale. This is a different tradeoff than OAuth's DPoP, which stops replay with a random, single-use ID (the <code>jti</code>) the server remembers instead of leaning on the clock — Kerberos chose time because in 1988, on a closed campus network, synchronized clocks were the cheaper thing to guarantee.</p>",
  bullets: [
    "An Authenticator is a timestamp, sealed fresh for this one exchange — never reused across requests",
    "Doors and desks remember recently-seen Authenticators and reject an exact repeat",
    "Anything older than the clock skew tolerance (typically a few minutes) is rejected as stale, even if never seen before",
    "This is why Kerberos realms depend on synchronized clocks (NTP) across every machine",
  ],
  diagram: `
    <div class="flow">
      <div class="node" style="border-color: #047857;">
        <div class="node-title" style="color: #047857;">✅ Fresh Authenticator</div>
        <div class="node-sub">"9:41:03am" — inside the skew window, never seen before — accepted</div>
      </div>
      <div class="node" style="border-color: #b91c1c;">
        <div class="node-title" style="color: #b91c1c;">❌ Replayed Authenticator</div>
        <div class="node-sub">the exact same sealed slip, shown again — rejected, already seen</div>
      </div>
      <div class="node" style="border-color: #b91c1c;">
        <div class="node-title" style="color: #b91c1c;">❌ Stale Authenticator</div>
        <div class="node-sub">"9:41:03am" shown at 10:15am — rejected, outside the skew window</div>
      </div>
    </div>
    <p class="diagram-note">
      Only the middle case is new business. A copied slip fails either because
      it's a repeat of one already logged, or because too much time has passed
      for it to plausibly be "right now" anymore — the same slip is worthless
      to an attacker a few minutes after they intercept it.
    </p>
  `,
};
