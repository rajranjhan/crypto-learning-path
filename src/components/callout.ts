import type { Callout } from "../types";

export function renderCallouts(callouts: Callout[]): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "callouts";
  for (const c of callouts) {
    const box = document.createElement("div");
    box.className = "callout";

    // Build with textContent (not innerHTML) so authored content containing
    // characters like `<` or `&` renders literally rather than mis-parsing.
    const head = document.createElement("div");
    head.className = "callout-head";
    head.appendChild(document.createTextNode("🔒 "));
    const badge = document.createElement("span");
    badge.className = "callout-req";
    badge.textContent = c.requirementId;
    head.appendChild(badge);
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
