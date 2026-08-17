import type { SequenceActor, Step } from "../../../types";

const DEVICE_ACTORS: SequenceActor[] = [
  { id: "device", label: "Device (Claw Machine)", icon: "🕹️" },
  { id: "user", label: "You", icon: "🧑" },
  { id: "as", label: "Authorization Server (Ticket Booth)", icon: "🎫" },
];

export const deviceCode: Step = {
  id: "device-code",
  title: "The Arcade Machine That Can't Type — Device Authorization Grant",
  prose:
    "<p>Some carnival machines can't type. The claw machine by the arcade wall has a screen barely big enough for a code, and no way to show you a login form at all.</p>" +
    "<p>So it does something clever: it displays a short code — say, WXYZ-4821 — and a simple instruction: \"Go to any kiosk and enter this code to link your wristband.\" That's the <strong>Device Authorization Grant</strong> (RFC 8628). The machine requested a device_code (for itself) and a user_code (the short one it shows you) from the booth.</p>" +
    "<p>You walk over to any kiosk — or just your phone — visit the address it showed you, type in the code, log in the normal way, and approve. Meanwhile the machine, which has no idea any of that just happened, keeps quietly asking the booth: \"Is WXYZ-4821 done yet? ... Is it done yet?\" Once you approve, the very next check comes back with a ride ticket.</p>" +
    "<p>This is the pattern behind smart TVs, streaming boxes, and command-line tools — anything with a screen too small, or a keyboard too absent, to run a real login itself. The device never sees your credentials; it just waits.</p>",
  bullets: [
    "device_code: a long code the device itself polls with; never shown to the user",
    "user_code: a short, human-typeable code shown on the device's screen",
    "verification_uri: a plain address the user visits on a different, capable device to enter the code and log in normally",
    "The device polls the token endpoint at an interval until the user finishes — no credentials ever touch the limited device",
  ],
  sequence: {
    actors: DEVICE_ACTORS,
    messages: [
      { from: "device", to: "as", label: "Request device_code + user_code" },
      { from: "as", to: "device", label: "user_code: WXYZ-4821 + verification_uri" },
      { from: "device", to: "user", label: "Displays: \"Enter WXYZ-4821 at example.com/device\"" },
      { from: "user", to: "as", label: "Visit verification_uri, log in, enter code, approve", highlight: true },
      { from: "device", to: "device", label: "Poll: \"Is WXYZ-4821 done yet?\" (repeats)" },
      { from: "as", to: "device", label: "access_token", highlight: true },
    ],
  },
};
