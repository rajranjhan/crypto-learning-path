import type { Sequence } from "../types";

/**
 * Render a UML-style sequence diagram: each actor gets a head (icon + label) and
 * a vertical lifeline dropping beneath it. Messages read top-to-bottom:
 *
 *   - cross-actor messages are horizontal arrows drawn center-to-center between
 *     the two lifelines, with the label sitting above the line;
 *   - self-messages (`from === to`, i.e. an internal action) are dotted, rounded
 *     self-loops anchored on that actor's own lifeline.
 *
 * Every step in a lesson passes the SAME `actors` (see src/lessons/actors.ts), so
 * the lifelines line up identically across steps and the flow is easy to follow;
 * only the messages change. A message with `highlight: true` is emphasized as the
 * focus of the current step.
 *
 * Layout math: the message grid uses 2N half-columns so that each actor's center
 * falls exactly on an integer grid line (actor k's center is line 2k+2). An arrow
 * therefore spans `2*from+2 → 2*to+2`, and a self-loop occupies actor k's full
 * column `2k+1 → 2k+3`. The lifelines are drawn on a matching N-column layer.
 */
export function renderSequence(seq: Sequence): HTMLElement {
  const root = document.createElement("div");
  root.className = "sequence";

  const actorIndex = new Map(seq.actors.map((a, i) => [a.id, i]));
  const cols = seq.actors.length;

  // Actor heads: icon + label, one per column.
  const head = document.createElement("div");
  head.className = "seq-actors";
  head.style.setProperty("--seq-cols", String(cols));
  seq.actors.forEach((a) => {
    const cell = document.createElement("div");
    cell.className = "seq-actor";
    if (a.icon) {
      const icon = document.createElement("span");
      icon.className = "seq-actor-icon";
      icon.textContent = a.icon;
      cell.appendChild(icon);
    }
    const label = document.createElement("span");
    label.className = "seq-actor-label";
    label.textContent = a.label;
    cell.appendChild(label);
    head.appendChild(cell);
  });
  root.appendChild(head);

  // Message area: lifelines behind, message rows in front.
  const body = document.createElement("div");
  body.className = "seq-body";

  const lifelines = document.createElement("div");
  lifelines.className = "seq-lifelines";
  lifelines.style.setProperty("--seq-cols", String(cols));
  for (let i = 0; i < cols; i++) {
    const life = document.createElement("div");
    life.className = "seq-life";
    lifelines.appendChild(life);
  }
  body.appendChild(lifelines);

  const messages = document.createElement("div");
  messages.className = "seq-messages";

  seq.messages.forEach((m, i) => {
    const from = actorIndex.get(m.from);
    const to = actorIndex.get(m.to);
    if (from === undefined || to === undefined) return; // Skip messages referencing unknown actors.

    const row = document.createElement("div");
    row.className = "seq-row" + (m.highlight ? " seq-highlight" : "");
    row.style.setProperty("--seq-cols", String(cols));

    const num = document.createElement("span");
    num.className = "seq-num";
    num.textContent = String(i + 1);

    if (from === to) {
      // Internal action: dotted self-loop on this actor's own lifeline.
      const self = document.createElement("div");
      self.className = "seq-self";
      self.style.gridColumn = `${2 * from + 1} / ${2 * from + 3}`;
      self.appendChild(num);
      const label = document.createElement("span");
      label.className = "seq-label";
      label.textContent = m.label;
      self.appendChild(label);
      if (m.note) {
        const note = document.createElement("span");
        note.className = "seq-note";
        note.textContent = m.note;
        self.appendChild(note);
      }
      row.appendChild(self);
    } else {
      // Cross-actor message: horizontal arrow, center of `from` → center of `to`.
      const lo = Math.min(from, to);
      const hi = Math.max(from, to);
      const arrow = document.createElement("div");
      arrow.className = "seq-arrow " + (to > from ? "seq-arrow-right" : "seq-arrow-left");
      arrow.style.gridColumn = `${2 * lo + 2} / ${2 * hi + 2}`;

      const caption = document.createElement("span");
      caption.className = "seq-caption";
      caption.appendChild(num);
      const label = document.createElement("span");
      label.className = "seq-label";
      label.textContent = m.label;
      caption.appendChild(label);
      if (m.note) {
        const note = document.createElement("span");
        note.className = "seq-note";
        note.textContent = m.note;
        caption.appendChild(note);
      }
      arrow.appendChild(caption);
      row.appendChild(arrow);
    }

    messages.appendChild(row);
  });

  body.appendChild(messages);
  root.appendChild(body);

  return root;
}
