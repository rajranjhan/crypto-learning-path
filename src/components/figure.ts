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

export function renderFigure(source: Figure): HTMLElement {
  const figure = document.createElement("figure");
  figure.className = "lesson-figure";

  const body = document.createElement("div");
  body.className = "figure-body diagram";

  if (source.variant) figure.classList.add(`lesson-figure-${source.variant}`);
  body.innerHTML = source.body; // Static authored markup, no user data.
  const authoredCaption = moveAuthoredCaption(body);
  const captionText = source.caption;

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
