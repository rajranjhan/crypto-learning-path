import type { Lesson } from "../types";

/** Default overview copy for the TLS wire lessons. */
const DEFAULT_TLS_INTRO =
  "A TLS 1.2 handshake negotiates a protocol version and cipher suite, " +
  "authenticates the server (and optionally the client) with certificates, " +
  "and derives shared keys via ECDHE — after which application data flows " +
  "encrypted. Walk through each record byte by byte below.";

export function renderOverview(lesson: Lesson): HTMLElement {
  const root = document.createElement("div");
  root.className = "overview";

  const heading = document.createElement("h2");
  heading.textContent = `${lesson.title} — Overview`;
  root.appendChild(heading);

  const intro = document.createElement("p");
  intro.className = "prose";
  intro.textContent = lesson.overview ?? DEFAULT_TLS_INTRO;
  root.appendChild(intro);

  if (lesson.diagram) {
    const diagram = document.createElement("div");
    diagram.className = "diagram";
    diagram.innerHTML = lesson.diagram; // Static authored markup, no user data.
    root.appendChild(diagram);
  }

  // Clickable list of the handshake steps.
  const list = document.createElement("ol");
  list.className = "overview-steps";
  lesson.steps.forEach((s, i) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#/lesson/${lesson.slug}/${i}`;
    link.textContent = s.title;
    li.appendChild(link);
    list.appendChild(li);
  });
  root.appendChild(list);

  const start = document.createElement("a");
  start.className = "start-link";
  start.href = `#/lesson/${lesson.slug}/0`;
  start.textContent = "Start the walkthrough →";
  root.appendChild(start);

  return root;
}
