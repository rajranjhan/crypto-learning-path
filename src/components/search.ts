import { search, type SearchEntry } from "../search";

/** Split `text` at the first case-insensitive match of `query` and append it as plain text + a <mark>, avoiding innerHTML entirely (text here can contain authored `<`/`&`). */
function appendHighlighted(container: HTMLElement, text: string, query: string): void {
  const idx = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (idx === -1) {
    container.appendChild(document.createTextNode(text));
    return;
  }
  container.appendChild(document.createTextNode(text.slice(0, idx)));
  const mark = document.createElement("mark");
  mark.textContent = text.slice(idx, idx + query.length);
  container.appendChild(mark);
  container.appendChild(document.createTextNode(text.slice(idx + query.length)));
}

/**
 * A search box (mounted top-right of the content area, next to the stepper —
 * see main.ts): typing filters an in-memory index of every lesson's overview
 * and steps (see ../search.ts) and shows a dropdown of matches; clicking one
 * navigates straight to that step. The dropdown closes on blur (with a short
 * delay so a click on a result registers first) rather than via a
 * document-level listener, so nothing needs cleaning up when the content
 * area is torn down and rebuilt on the next hash change.
 */
export function renderSearch(index: SearchEntry[]): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "search-box";

  const input = document.createElement("input");
  input.type = "search";
  input.className = "search-input";
  input.placeholder = "Search lessons… ( / )";
  input.setAttribute("aria-label", "Search lessons");
  wrap.appendChild(input);

  const results = document.createElement("div");
  results.className = "search-results";
  results.hidden = true;
  wrap.appendChild(results);

  function renderResults(query: string): void {
    results.innerHTML = "";
    if (!query.trim()) {
      results.hidden = true;
      return;
    }

    const matches = search(query, index);
    if (matches.length === 0) {
      const empty = document.createElement("div");
      empty.className = "search-no-results";
      empty.textContent = "No matches.";
      results.appendChild(empty);
      results.hidden = false;
      return;
    }

    matches.forEach((m) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = `#/lesson/${m.slug}/${m.step}`;

      const lessonLine = document.createElement("div");
      lessonLine.className = "search-result-lesson";
      lessonLine.textContent = m.lessonTitle;
      link.appendChild(lessonLine);

      const titleLine = document.createElement("div");
      titleLine.className = "search-result-title";
      appendHighlighted(titleLine, m.title, query);
      link.appendChild(titleLine);

      if (m.snippet && m.snippet !== m.title) {
        const snippetLine = document.createElement("div");
        snippetLine.className = "search-result-snippet";
        appendHighlighted(snippetLine, m.snippet, query);
        link.appendChild(snippetLine);
      }

      results.appendChild(link);
    });
    results.hidden = false;
  }

  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("focus", () => renderResults(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      results.hidden = true;
      input.blur();
    }
  });
  // Delay so a click on a result fires (and navigates) before the dropdown
  // is hidden — blur fires before click on the same mousedown/up sequence.
  input.addEventListener("blur", () => {
    setTimeout(() => { results.hidden = true; }, 150);
  });

  return wrap;
}
