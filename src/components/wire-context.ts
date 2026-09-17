import type { WireContext } from "../types";

export function renderWireContext(context: WireContext): HTMLElement {
  const section = document.createElement("section");
  section.className = "wire-context";
  section.setAttribute("aria-label", "Context for the technical display");
  const list = document.createElement("dl");
  const rows = [
    ["Where we are", context.where],
    ["What happens now", context.now],
    ["Why", context.why],
  ];
  for (const [label, copy] of rows) {
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = copy;
    list.append(term, description);
  }
  section.appendChild(list);
  return section;
}
