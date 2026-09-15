import type { Callout } from "../types";

const CALLOUT_LABELS: Record<NonNullable<Callout["type"]>, string> = {
  "key-idea": "Key Idea",
  "security-warning": "Security Warning",
  "dont-confuse": "Don't Confuse This With",
  "real-world": "Real-World Example",
  "under-the-hood": "Under the Hood",
  legacy: "Legacy",
};

export function renderCallouts(callouts: Callout[]): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "callouts";
  for (const c of callouts) {
    const box = document.createElement("div");
    const type = c.type ?? "key-idea";
    box.className = `callout callout-${type}`;

    // Build with textContent (not innerHTML) so authored content containing
    // characters like `<` or `&` renders literally rather than mis-parsing.
    const head = document.createElement("div");
    head.className = "callout-head";
    const badge = document.createElement("span");
    badge.className = "callout-req";
    badge.textContent = CALLOUT_LABELS[type];
    head.appendChild(badge);
    if (c.requirementId) {
      const req = document.createElement("span");
      req.className = "callout-id";
      req.textContent = c.requirementId;
      head.appendChild(req);
    }
    const title = document.createElement("strong");
    title.textContent = c.title;
    head.appendChild(title);
    box.appendChild(head);

    const body = document.createElement("p");
    body.textContent = c.body;
    box.appendChild(body);

    wrap.appendChild(box);
  }
  return wrap;
}
