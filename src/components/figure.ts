import type { Figure } from "../types";

function moveAuthoredCaption(body: HTMLElement): HTMLElement | undefined {
  const note = body.querySelector<HTMLElement>(".diagram-note");
  if (!note) return undefined;
  const caption = document.createElement("figcaption");
  caption.className = "figure-caption";
  while (note.firstChild) caption.appendChild(note.firstChild);
  note.remove();
  return caption.textContent?.trim() ? caption : undefined;
}

function normalizeAuthoredDiagram(body: HTMLElement): void {
  body.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    const style = el.getAttribute("style") ?? "";
    const normalized = style.replace(/\s+/g, " ").toLowerCase();

    if (el.classList.contains("flow")) {
      if (normalized.includes("align-items: stretch")) el.classList.add("stretch");
      if (normalized.includes("align-items: center")) el.classList.add("center");
      if (normalized.includes("margin-top: 16px")) el.classList.add("spaced");
    }

    if (el.classList.contains("node")) {
      if (normalized.includes("flex: 1")) el.classList.add("equal");
      if (normalized.includes("#b91c1c")) el.classList.add("warning");
      if (normalized.includes("#047857")) el.classList.add("trusted");
      if (normalized.includes("var(--accent)") || normalized.includes("rgba(37,99,235")) el.classList.add("trusted");
      if (normalized.includes("min-width: 0")) el.classList.add("compact");
      if (normalized.includes("padding: 8px")) el.classList.add("compact-padding");
    }

    if (el.classList.contains("node-title")) {
      if (normalized.includes("#b91c1c")) el.classList.add("text-warning");
      if (normalized.includes("#047857")) el.classList.add("text-trusted");
      if (normalized.includes("font-size: 12px")) el.classList.add("small");
    }

    if (el.classList.contains("node-sub")) {
      if (normalized.includes("text-align: left")) el.classList.add("left");
      if (normalized.includes("ui-monospace") || normalized.includes("monospace")) el.classList.add("mono");
      if (normalized.includes("font-size: 16px")) el.classList.add("large");
    }

    if (el.tagName === "P" && normalized.includes("text-align: center")) el.classList.add("centered");

    if (
      el.classList.contains("flow") ||
      el.classList.contains("node") ||
      el.classList.contains("node-title") ||
      el.classList.contains("node-sub") ||
      el.classList.contains("centered")
    ) {
      el.removeAttribute("style");
    }
  });
}

export function renderFigure(source: Figure | string, fallbackCaption?: string): HTMLElement {
  const figure = document.createElement("figure");
  figure.className = "lesson-figure";

  const body = document.createElement("div");
  body.className = "figure-body diagram";

  let captionText = fallbackCaption;
  let authoredCaption: HTMLElement | undefined;
  if (typeof source === "string") {
    body.innerHTML = source; // Static authored markup, no user data.
    normalizeAuthoredDiagram(body);
    authoredCaption = moveAuthoredCaption(body);
  } else {
    if (source.variant) figure.classList.add(`lesson-figure-${source.variant}`);
    body.innerHTML = source.body; // Static authored markup, no user data.
    normalizeAuthoredDiagram(body);
    authoredCaption = moveAuthoredCaption(body);
    captionText = source.caption ?? captionText;
  }

  figure.appendChild(body);

  if (captionText) {
    const caption = document.createElement("figcaption");
    caption.className = "figure-caption";
    caption.textContent = captionText;
    figure.appendChild(caption);
  } else if (authoredCaption) {
    figure.appendChild(authoredCaption);
  }

  return figure;
}
