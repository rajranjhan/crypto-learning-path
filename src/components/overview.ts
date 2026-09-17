import type { Lesson } from "../types";
import { renderFigure } from "./figure";

function formatMeta(lesson: Lesson): string {
  return [
    lesson.lessonType?.toUpperCase(),
    lesson.difficulty?.toUpperCase(),
    lesson.estimatedMinutes ? `~${lesson.estimatedMinutes} MIN` : undefined,
  ].filter(Boolean).join(" · ");
}

function renderListSection(title: string, items: string[]): HTMLElement {
  const section = document.createElement("section");
  section.className = "overview-section";
  const heading = document.createElement("h3");
  heading.textContent = title;
  section.appendChild(heading);

  const list = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
  section.appendChild(list);
  return section;
}

export function renderOverview(lesson: Lesson, lessons: Record<string, Lesson>): HTMLElement {
  const root = document.createElement("div");
  root.className = "overview";

  const header = document.createElement("header");
  header.className = "overview-header";

  const heading = document.createElement("h1");
  heading.textContent = lesson.title;
  header.appendChild(heading);

  const metaText = formatMeta(lesson);
  if (metaText) {
    const meta = document.createElement("div");
    meta.className = "lesson-meta";
    meta.textContent = metaText;
    header.appendChild(meta);
  }

  const intro = document.createElement("p");
  intro.className = "overview-summary";
  intro.textContent = lesson.summary;
  header.appendChild(intro);
  root.appendChild(header);

  const why = document.createElement("section");
  why.className = "overview-section";
  const whyHeading = document.createElement("h3");
  whyHeading.textContent = "Why This Matters";
  why.appendChild(whyHeading);
  const whyCopy = document.createElement("p");
  whyCopy.textContent = lesson.whyItMatters;
  why.appendChild(whyCopy);
  root.appendChild(why);

  root.appendChild(renderListSection("What You'll Learn", lesson.objectives));

  if (lesson.prerequisites?.length) {
    const prereqs = document.createElement("section");
    prereqs.className = "overview-section";
    const prereqHeading = document.createElement("h3");
    prereqHeading.textContent = "Builds On";
    prereqs.appendChild(prereqHeading);

    const list = document.createElement("ul");
    for (const slug of lesson.prerequisites) {
      const item = document.createElement("li");
      const prereq = lessons[slug];
      if (prereq) {
        const link = document.createElement("a");
        link.href = `#/lesson/${slug}/overview`;
        link.textContent = prereq.title;
        item.appendChild(link);
      } else {
        item.textContent = slug;
      }
      list.appendChild(item);
    }
    prereqs.appendChild(list);
    root.appendChild(prereqs);
  }

  if (lesson.figure) {
    const mentalModel = document.createElement("section");
    mentalModel.className = "overview-section mental-model-section";
    const mentalModelHeading = document.createElement("h3");
    mentalModelHeading.textContent = "Mental Model";
    mentalModel.appendChild(mentalModelHeading);
    mentalModel.appendChild(renderFigure(lesson.figure));
    root.appendChild(mentalModel);
  }

  const roadmap = document.createElement("section");
  roadmap.className = "overview-section roadmap-section";
  const roadmapHeading = document.createElement("h3");
  roadmapHeading.textContent = "Lesson Roadmap";
  roadmap.appendChild(roadmapHeading);

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
  roadmap.appendChild(list);
  root.appendChild(roadmap);

  const start = document.createElement("a");
  start.className = "start-link";
  start.href = `#/lesson/${lesson.slug}/0`;
  start.textContent = "Start Lesson";
  root.appendChild(start);

  return root;
}
