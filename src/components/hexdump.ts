import type { Step } from "../types";
import { renderCallouts } from "./callout";
import { renderSequence } from "./sequence";
import { renderTextBlock } from "./textblock";

/** Map each byte offset to the index of the annotation covering it (or undefined). */
function buildOffsetMap(step: Step): (number | undefined)[] {
  const bytes = step.bytes ?? [];
  const map: (number | undefined)[] = new Array(bytes.length).fill(undefined);
  (step.annotations ?? []).forEach((a, annIndex) => {
    for (let i = a.offset; i < a.offset + a.length; i++) map[i] = annIndex;
  });
  return map;
}

export function renderHexdump(step: Step): HTMLElement {
  const container = document.createElement("div");
  container.className = "hexdump";
  const offsetMap = buildOffsetMap(step);

  (step.bytes ?? []).forEach((byte, index) => {
    const span = document.createElement("span");
    span.className = "hex-byte";
    span.dataset.index = String(index);
    span.textContent = byte.toString(16).padStart(2, "0").toUpperCase();

    const annIndex = offsetMap[index];
    if (annIndex !== undefined) {
      const ann = step.annotations![annIndex];
      span.classList.add(ann.colorClass);
      span.dataset.annotation = String(annIndex);
    }
    container.appendChild(span);
    container.appendChild(document.createTextNode(" "));
  });

  return container;
}

export function renderStepView(step: Step): HTMLElement {
  const view = document.createElement("div");
  view.className = "step-view";

  const heading = document.createElement("h2");
  heading.textContent = step.title;
  view.appendChild(heading);

  const prose = document.createElement("div");
  prose.className = "prose";
  prose.innerHTML = step.prose; // Static authored markup, no user data.
  view.appendChild(prose);

  if (step.bullets?.length) {
    const list = document.createElement("ul");
    list.className = "step-bullets";
    for (const b of step.bullets) {
      const li = document.createElement("li");
      li.textContent = b; // textContent so authored `<`/`&` render literally
      list.appendChild(li);
    }
    view.appendChild(list);
  }

  // A sequence diagram, when present, always sits above the byte-level view —
  // it's the "who sent what to whom" context for the hexdump that follows.
  if (step.sequence) view.appendChild(renderSequence(step.sequence));

  // Concept steps carry no wire bytes: render their authored diagram and/or
  // annotated text block, and skip the hexdump columns entirely.
  if (!step.bytes?.length) {
    if (step.diagram) {
      const diagram = document.createElement("div");
      diagram.className = "diagram";
      diagram.innerHTML = step.diagram; // Static authored markup, no user data.
      view.appendChild(diagram);
    }
    if (step.textBlock) view.appendChild(renderTextBlock(step.textBlock));
    if (step.callouts?.length) view.appendChild(renderCallouts(step.callouts));
    return view;
  }

  const columns = document.createElement("div");
  columns.className = "step-columns";

  const left = document.createElement("div");
  left.className = "step-left";
  const hex = renderHexdump(step);
  left.appendChild(hex);

  const right = document.createElement("div");
  right.className = "step-right";
  (step.annotations ?? []).forEach((a, i) => {
    const ann = document.createElement("div");
    ann.className = "annotation";
    ann.dataset.annotation = String(i);
    // Build with textContent (not innerHTML) so authored labels/descriptions
    // containing characters like `<` or `&` render literally.
    const label = document.createElement("strong");
    label.textContent = a.label;
    ann.appendChild(label);
    ann.appendChild(document.createTextNode(` — ${a.description}`));
    right.appendChild(ann);
  });

  // Hover linkage: byte <-> annotation.
  const setActive = (annIndex: string | undefined, on: boolean) => {
    if (annIndex === undefined) return;
    hex.querySelectorAll<HTMLElement>(`.hex-byte[data-annotation="${annIndex}"]`).forEach((b) => b.classList.toggle("active", on));
    const ann = right.querySelector<HTMLElement>(`.annotation[data-annotation="${annIndex}"]`);
    ann?.classList.toggle("active", on);
  };
  hex.querySelectorAll<HTMLElement>(".hex-byte").forEach((b) => {
    b.addEventListener("mouseenter", () => setActive(b.dataset.annotation, true));
    b.addEventListener("mouseleave", () => setActive(b.dataset.annotation, false));
  });
  right.querySelectorAll<HTMLElement>(".annotation").forEach((a) => {
    a.addEventListener("mouseenter", () => setActive(a.dataset.annotation, true));
    a.addEventListener("mouseleave", () => setActive(a.dataset.annotation, false));
  });

  columns.appendChild(left);
  columns.appendChild(right);
  view.appendChild(columns);

  if (step.callouts?.length) view.appendChild(renderCallouts(step.callouts));

  return view;
}
