import type { TextBlock } from "../types";

/**
 * Render an annotated JWT/JSON/HTTP block: the formatted code on the left with
 * each annotated line color-coded, and hover-linked annotation cards on the
 * right. Mirrors the hexdump's byte<->annotation hover linkage, but keyed on
 * line index instead of byte offset.
 */
export function renderTextBlock(block: TextBlock): HTMLElement {
  const columns = document.createElement("div");
  columns.className = "step-columns";

  // Left: the code block, one span-wrapped line per source line.
  const left = document.createElement("div");
  left.className = "step-left";
  const pre = document.createElement("pre");
  pre.className = "text-block lang-" + block.lang;

  // Map line index -> annotation index for quick colorization/linkage.
  const lineToAnn = new Map<number, number>();
  block.annotations.forEach((a, i) => lineToAnn.set(a.line, i));

  block.lines.forEach((text, lineIdx) => {
    const line = document.createElement("span");
    line.className = "tb-line";
    line.dataset.line = String(lineIdx);
    line.textContent = text === "" ? " " : text; // keep blank lines visible
    const annIdx = lineToAnn.get(lineIdx);
    if (annIdx !== undefined) {
      line.classList.add(block.annotations[annIdx].colorClass);
      line.dataset.annotation = String(annIdx);
    }
    pre.appendChild(line);
    pre.appendChild(document.createTextNode("\n"));
  });
  left.appendChild(pre);

  // Right: annotation cards.
  const right = document.createElement("div");
  right.className = "step-right";
  block.annotations.forEach((a, i) => {
    const ann = document.createElement("div");
    ann.className = "annotation";
    ann.dataset.annotation = String(i);
    const label = document.createElement("strong");
    label.textContent = a.label;
    ann.appendChild(label);
    ann.appendChild(document.createTextNode(` — ${a.description}`));
    right.appendChild(ann);
  });

  // Hover linkage: line <-> annotation.
  const setActive = (annIndex: string | undefined, on: boolean) => {
    if (annIndex === undefined) return;
    left.querySelectorAll<HTMLElement>(`.tb-line[data-annotation="${annIndex}"]`).forEach((l) => l.classList.toggle("active", on));
    const ann = right.querySelector<HTMLElement>(`.annotation[data-annotation="${annIndex}"]`);
    ann?.classList.toggle("active", on);
  };
  left.querySelectorAll<HTMLElement>(".tb-line[data-annotation]").forEach((l) => {
    l.addEventListener("mouseenter", () => setActive(l.dataset.annotation, true));
    l.addEventListener("mouseleave", () => setActive(l.dataset.annotation, false));
  });
  right.querySelectorAll<HTMLElement>(".annotation").forEach((a) => {
    a.addEventListener("mouseenter", () => setActive(a.dataset.annotation, true));
    a.addEventListener("mouseleave", () => setActive(a.dataset.annotation, false));
  });

  columns.appendChild(left);
  columns.appendChild(right);
  return columns;
}
