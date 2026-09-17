import type { Lesson, RegistryEntry } from "../types";

export function renderHome(registry: RegistryEntry[], lessons: Record<string, Lesson>): HTMLElement {
  const root = document.createElement("div");
  root.className = "home";

  const header = document.createElement("header");
  header.className = "overview-header";
  const heading = document.createElement("h1");
  heading.textContent = "Practical Cryptography, Byte by Byte";
  header.appendChild(heading);

  const summary = document.createElement("p");
  summary.className = "overview-summary";
  summary.textContent =
    "Visual explanations of encryption, TLS, PKI, OAuth and modern cryptographic protocols.";
  header.appendChild(summary);
  root.appendChild(header);

  const about = document.createElement("section");
  about.className = "overview-section";
  const aboutHeading = document.createElement("h2");
  aboutHeading.textContent = "What This Is";
  about.appendChild(aboutHeading);
  const aboutCopy = document.createElement("p");
  aboutCopy.textContent =
    "This is for engineers, security learners, and technically curious builders who want to understand what cryptographic systems actually do, not just memorize names. Start at the beginning if the terms are new; otherwise jump to the section you need.";
  about.appendChild(aboutCopy);
  root.appendChild(about);

  const method = document.createElement("section");
  method.className = "overview-section";
  const methodHeading = document.createElement("h2");
  methodHeading.textContent = "How It Teaches";
  method.appendChild(methodHeading);
  const methodList = document.createElement("ul");
  [
    "Concept lessons build vocabulary and mental models.",
    "Protocol lessons walk through real messages, sequence diagrams, and byte-level annotations.",
    "Application lessons connect primitives to practical security decisions and failure modes.",
  ].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    methodList.appendChild(li);
  });
  method.appendChild(methodList);
  root.appendChild(method);

  const sections = document.createElement("section");
  sections.className = "overview-section";
  const sectionsHeading = document.createElement("h2");
  sectionsHeading.textContent = "Course Overview";
  sections.appendChild(sectionsHeading);

  const grouped = new Map<string, RegistryEntry[]>();
  for (const entry of registry) {
    if (entry.status !== "available") continue;
    const name = entry.category ?? "Lessons";
    grouped.set(name, [...(grouped.get(name) ?? []), entry]);
  }

  for (const [category, entries] of grouped) {
    const group = document.createElement("section");
    group.className = "course-section";
    const h3 = document.createElement("h3");
    h3.textContent = category;
    group.appendChild(h3);

    const list = document.createElement("ol");
    entries.forEach((entry) => {
      const lesson = lessons[entry.slug];
      if (!lesson) return;
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#/lesson/${entry.slug}/overview`;
      link.textContent = lesson.title;
      li.appendChild(link);
      const description = document.createElement("span");
      description.textContent = ` — ${lesson.summary}`;
      li.appendChild(description);
      list.appendChild(li);
    });
    group.appendChild(list);
    sections.appendChild(group);
  }
  root.appendChild(sections);

  const start = document.createElement("a");
  start.className = "start-link";
  start.href = "#/lesson/encryption-basics/overview";
  start.textContent = "Start with Encryption Basics";
  root.appendChild(start);

  return root;
}
