import type { Lesson, RegistryEntry } from "../types";

export interface SidebarState {
  /** Slug of the lesson currently being viewed. */
  activeSlug: string;
  /** Index of the active step, or "overview", or null when nothing is selected. */
  activeStep: number | "overview" | null;
}

/**
 * Render the lesson menu. Each available lesson is a collapsible group whose
 * child steps (plus an Overview entry) are clickable. The active lesson is
 * expanded by default; other lessons collapse. Clicking a lesson header toggles
 * its expansion without navigating.
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
  brandIcon.src = "/favicon.svg";
  brandIcon.width = 24;
  brandIcon.height = 24;
  brandIcon.alt = "";
  brand.appendChild(brandIcon);

  const brandName = document.createElement("span");
  brandName.className = "sidebar-brand-name";
  brandName.textContent = "On The Wire";
  brand.appendChild(brandName);

  nav.appendChild(brand);

  const title = document.createElement("div");
  title.className = "sidebar-title";
  title.textContent = "Lessons";
  nav.appendChild(title);

  entries.forEach((e, i) => {
    const group = document.createElement("div");
    group.className = "lesson-group";

    const isActive = e.slug === state.activeSlug;
    const available = e.status === "available";
    const lesson = lessons[e.slug];

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

    const label = document.createElement("span");
    label.className = "lesson-label";
    label.textContent = available
      ? `${i + 1}. ${e.title}`
      : `${i + 1}. ${e.title} (coming soon)`;
    header.appendChild(label);
    group.appendChild(header);

    if (available && lesson) {
      const sub = document.createElement("div");
      sub.className = "lesson-steps";
      if (!isActive) sub.hidden = true;

      const overview = document.createElement("a");
      overview.className =
        "step-item overview-item" +
        (isActive && state.activeStep === "overview" ? " active" : "");
      overview.href = `#/lesson/${e.slug}/overview`;
      overview.textContent = "Overview";
      sub.appendChild(overview);

      lesson.steps.forEach((s, si) => {
        const stepLink = document.createElement("a");
        stepLink.className =
          "step-item" + (isActive && state.activeStep === si ? " active" : "");
        stepLink.href = `#/lesson/${e.slug}/${si}`;
        stepLink.textContent = `${si + 1}. ${s.title}`;
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

    nav.appendChild(group);
  });

  return nav;
}
