import type { Lesson, RegistryEntry, Step } from "../types";

export interface SidebarState {
  /** Slug of the lesson currently being viewed. */
  activeSlug: string;
  /** Index of the active step, or "overview", or null when nothing is selected. */
  activeStep: number | "overview" | null;
}

/** Either a standalone registry entry, or several entries grouped under one category header. */
type SidebarRow =
  | { kind: "entry"; entry: RegistryEntry }
  | { kind: "category"; name: string; entries: RegistryEntry[] };

/**
 * Group entries by their (optional) `category`, preserving first-seen order.
 * Entries without a category stay standalone rows; consecutive or scattered
 * entries sharing a category name are collected into one category row.
 */
function groupByCategory(entries: RegistryEntry[]): SidebarRow[] {
  const rows: SidebarRow[] = [];
  const categoryRow = new Map<string, Extract<SidebarRow, { kind: "category" }>>();

  for (const entry of entries) {
    if (!entry.category) {
      rows.push({ kind: "entry", entry });
      continue;
    }
    const existing = categoryRow.get(entry.category);
    if (existing) {
      existing.entries.push(entry);
    } else {
      const row: SidebarRow = { kind: "category", name: entry.category, entries: [entry] };
      categoryRow.set(entry.category, row);
      rows.push(row);
    }
  }
  return rows;
}

/**
 * Render one top-level step that nests other steps beneath it in the sidebar
 * (see `Step.subSteps`) — a caret toggles the nested list, while the step's
 * own title stays a normal link so its content is still reachable. Expanded
 * by default whenever the active step is this step or one of its children.
 */
function renderStepGroup(
  parent: Step,
  parentIndex: number,
  displayNumber: number,
  slug: string,
  lesson: Lesson,
  stepIndexById: Map<string, number>,
  lessonActive: boolean,
  state: SidebarState,
): HTMLElement {
  const group = document.createElement("div");
  group.className = "step-group";

  const childIndexes = (parent.subSteps ?? [])
    .map((id) => stepIndexById.get(id) ?? -1)
    .filter((i) => i !== -1);

  const isParentActive = lessonActive && state.activeStep === parentIndex;
  const containsActiveChild = lessonActive && typeof state.activeStep === "number" && childIndexes.includes(state.activeStep);
  let expanded = isParentActive || containsActiveChild;

  const headerRow = document.createElement("div");
  headerRow.className = "step-group-header";

  const caret = document.createElement("button");
  caret.type = "button";
  caret.className = "step-caret";
  caret.setAttribute("aria-label", "Toggle sub-steps");
  caret.textContent = expanded ? "▾" : "▸";
  headerRow.appendChild(caret);

  const link = document.createElement("a");
  link.className = "step-item" + (isParentActive ? " active" : "");
  link.href = `#/lesson/${slug}/${parentIndex}`;
  link.textContent = `${displayNumber}. ${parent.title}`;
  headerRow.appendChild(link);

  group.appendChild(headerRow);

  const subList = document.createElement("div");
  subList.className = "sub-steps";
  subList.hidden = !expanded;
  let lastGroup: string | undefined;
  childIndexes.forEach((ci) => {
    const child = lesson.steps[ci];
    // A sub-step's `sidebarGroup` starts a new small heading whenever it
    // differs from the previous sibling's, so related sub-steps (e.g. every
    // "Classical Cipher") visually cluster without needing another level of
    // Step nesting.
    if (child.sidebarGroup && child.sidebarGroup !== lastGroup) {
      const heading = document.createElement("div");
      heading.className = "sub-steps-heading";
      heading.textContent = child.sidebarGroup;
      subList.appendChild(heading);
      lastGroup = child.sidebarGroup;
    }
    const childLink = document.createElement("a");
    childLink.className = "step-item" + (lessonActive && state.activeStep === ci ? " active" : "");
    childLink.href = `#/lesson/${slug}/${ci}`;
    childLink.textContent = `· ${child.title}`;
    subList.appendChild(childLink);
  });
  group.appendChild(subList);

  caret.addEventListener("click", () => {
    subList.hidden = !subList.hidden;
    caret.textContent = subList.hidden ? "▸" : "▾";
  });

  return group;
}

/** Render one lesson's collapsible header + step list (used at any nesting depth). */
function renderLessonGroup(
  entry: RegistryEntry,
  label: string,
  lessons: Record<string, Lesson>,
  state: SidebarState,
): HTMLElement {
  const group = document.createElement("div");
  group.className = "lesson-group";

  const isActive = entry.slug === state.activeSlug;
  const available = entry.status === "available";
  const lesson = lessons[entry.slug];

  const header = document.createElement(available ? "button" : "span");
  header.className =
    "lesson-item lesson-header" +
    (isActive ? " active" : "") +
    (available ? "" : " coming-soon");

  if (available) {
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = isActive ? "▾" : "▸";
    header.appendChild(caret);
  }

  const labelEl = document.createElement("span");
  labelEl.className = "lesson-label";
  labelEl.textContent = available ? label : `${label} (coming soon)`;
  header.appendChild(labelEl);
  group.appendChild(header);

  if (available && lesson) {
    const sub = document.createElement("div");
    sub.className = "lesson-steps";
    if (!isActive) sub.hidden = true;

    const overview = document.createElement("a");
    overview.className =
      "step-item overview-item" +
      (isActive && state.activeStep === "overview" ? " active" : "");
    overview.href = `#/lesson/${entry.slug}/overview`;
    overview.textContent = "Overview";
    sub.appendChild(overview);

    // Steps referenced by another step's `subSteps` render nested under their
    // parent instead of as their own top-level entry; the visible "N." count
    // only advances for top-level entries, so numbering has no gaps.
    const childIds = new Set(lesson.steps.flatMap((s) => s.subSteps ?? []));
    const stepIndexById = new Map(lesson.steps.map((s, i) => [s.id, i]));
    let displayNumber = 0;
    lesson.steps.forEach((s, si) => {
      if (childIds.has(s.id)) return;
      displayNumber += 1;

      if (s.subSteps?.length) {
        sub.appendChild(renderStepGroup(s, si, displayNumber, entry.slug, lesson, stepIndexById, isActive, state));
        return;
      }

      const stepLink = document.createElement("a");
      stepLink.className =
        "step-item" + (isActive && state.activeStep === si ? " active" : "");
      stepLink.href = `#/lesson/${entry.slug}/${si}`;
      stepLink.textContent = `${displayNumber}. ${s.title}`;
      sub.appendChild(stepLink);
    });

    // Collapse/expand toggles visibility only; it does not navigate.
    (header as HTMLButtonElement).addEventListener("click", () => {
      sub.hidden = !sub.hidden;
      const caret = header.querySelector(".caret");
      if (caret) caret.textContent = sub.hidden ? "▸" : "▾";
    });

    group.appendChild(sub);
  }

  return group;
}

/** Render a category header wrapping several lessons (e.g. every OAuth lesson under one "OAuth" entry). */
function renderCategoryGroup(
  name: string,
  categoryEntries: RegistryEntry[],
  lessons: Record<string, Lesson>,
  state: SidebarState,
): HTMLElement {
  const group = document.createElement("div");
  group.className = "category-group";

  const containsActive = categoryEntries.some((e) => e.slug === state.activeSlug);

  const header = document.createElement("button");
  header.className = "lesson-item lesson-header category-header";

  const caret = document.createElement("span");
  caret.className = "caret";
  caret.textContent = containsActive ? "▾" : "▸";
  header.appendChild(caret);

  const labelEl = document.createElement("span");
  labelEl.className = "lesson-label";
  labelEl.textContent = name;
  header.appendChild(labelEl);
  group.appendChild(header);

  const sub = document.createElement("div");
  sub.className = "category-lessons";
  if (!containsActive) sub.hidden = true;

  categoryEntries.forEach((entry, i) => {
    sub.appendChild(renderLessonGroup(entry, `${i + 1}. ${entry.title}`, lessons, state));
  });

  header.addEventListener("click", () => {
    sub.hidden = !sub.hidden;
    caret.textContent = sub.hidden ? "▸" : "▾";
  });

  group.appendChild(sub);
  return group;
}

/**
 * Render the lesson menu. Each available lesson is a collapsible group whose
 * child steps (plus an Overview entry) are clickable; lessons sharing a
 * `category` (e.g. every OAuth lesson) nest under one collapsible category
 * header instead of appearing as separate top-level entries. The active
 * lesson (and its category, if any) is expanded by default; everything else
 * collapses. Clicking a header toggles expansion without navigating.
 */
export function renderSidebar(
  entries: RegistryEntry[],
  lessons: Record<string, Lesson>,
  state: SidebarState,
): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = "sidebar";

  const brand = document.createElement("a");
  brand.className = "sidebar-brand";
  brand.href = "#/lesson/encryption-basics";

  const brandIcon = document.createElement("img");
  brandIcon.className = "sidebar-brand-icon";
  brandIcon.src = "favicon.svg";
  brandIcon.width = 24;
  brandIcon.height = 24;
  brandIcon.alt = "";
  brand.appendChild(brandIcon);

  const brandName = document.createElement("span");
  brandName.className = "sidebar-brand-name";
  brandName.textContent = "Crypto Learning Path";
  brand.appendChild(brandName);

  nav.appendChild(brand);

  const title = document.createElement("div");
  title.className = "sidebar-title";
  title.textContent = "Lessons";
  nav.appendChild(title);

  groupByCategory(entries).forEach((row) => {
    if (row.kind === "entry") {
      nav.appendChild(renderLessonGroup(row.entry, row.entry.title, lessons, state));
    } else {
      nav.appendChild(renderCategoryGroup(row.name, row.entries, lessons, state));
    }
  });

  return nav;
}
