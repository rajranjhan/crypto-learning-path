import type { GlossaryTerm } from "../types";

export function renderGlossary(terms: GlossaryTerm[]): HTMLElement {
  const section = document.createElement("section");
  section.className = "glossary";
  section.setAttribute("aria-labelledby", "glossary-heading");

  const heading = document.createElement("h3");
  heading.id = "glossary-heading";
  heading.textContent = "Terms";
  section.appendChild(heading);

  const list = document.createElement("dl");
  for (const item of terms) {
    const term = document.createElement("dt");
    term.textContent = item.term;
    list.appendChild(term);

    const definition = document.createElement("dd");
    definition.textContent = item.definition;
    list.appendChild(definition);
  }
  section.appendChild(list);

  return section;
}
