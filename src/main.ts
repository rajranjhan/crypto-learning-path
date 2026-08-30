import "./styles/main.css";
import { lessons } from "./lessons";
import { registry } from "./lessons/registry";
import { renderSidebar } from "./layout/sidebar";
import { renderStepView } from "./components/hexdump";
import { renderStepper } from "./components/stepper";
import { renderOverview } from "./components/overview";
import { renderSearch } from "./components/search";
import { buildSearchIndex } from "./search";
import { validateLesson, validateRegistry } from "./lessons/validate";

const searchIndex = buildSearchIndex(registry, lessons);

// In dev, surface authoring mistakes (bad annotation offsets, duplicate slugs)
// immediately in the console instead of letting them render as silent glitches.
if (import.meta.env.DEV) {
  const problems = [
    ...validateRegistry(registry),
    ...Object.values(lessons).flatMap((l) => validateLesson(l)),
  ];
  if (problems.length) console.error("Lesson data validation errors:\n" + problems.join("\n"));
}

/**
 * Parse the location hash. `step` is a numeric index, "overview", or null.
 * A lesson with no explicit step (`#/lesson/<slug>`) defaults to its overview.
 */
export function parseHash(hash: string = location.hash): {
  slug: string;
  step: number | "overview";
} {
  const m = hash.match(/^#\/lesson\/([^/]+)(?:\/(overview|\d+))?/);
  if (!m) return { slug: "encryption-basics", step: "overview" };
  const seg = m[2];
  if (seg === undefined || seg === "overview") return { slug: m[1], step: "overview" };
  return { slug: m[1], step: parseInt(seg, 10) };
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "";
  const { slug, step } = parseHash();

  const shell = document.createElement("div");
  shell.className = "shell";
  const active = registry.find((r) => r.slug === slug);
  const lesson = lessons[slug];
  const notFound = !lesson || active?.status !== "available";

  shell.appendChild(
    renderSidebar(registry, lessons, {
      activeSlug: active?.slug ?? "",
      activeStep: notFound ? null : step === "overview" ? "overview" : Math.max(0, Math.min(step, lesson.steps.length - 1)),
    }),
  );

  const main = document.createElement("main");
  main.className = "content";

  if (notFound) {
    main.innerHTML = `<h2>Lesson not found</h2><p><a href="#/lesson/encryption-basics">Go to the first lesson</a>.</p>`;
  } else {
    // Top bar of the content area: the stepper (on step pages only) on the
    // left, search pinned to the far right — present on every lesson page,
    // including the overview, where there's no stepper to sit next to.
    const toolbar = document.createElement("div");
    toolbar.className = "content-toolbar";

    let idx = -1;
    if (step !== "overview") {
      idx = Math.max(0, Math.min(step, lesson.steps.length - 1));
      toolbar.appendChild(renderStepper({
        index: idx,
        total: lesson.steps.length,
        onPrev: () => { location.hash = `#/lesson/${slug}/${idx - 1}`; },
        onNext: () => { location.hash = `#/lesson/${slug}/${idx + 1}`; },
      }));
    }
    toolbar.appendChild(renderSearch(searchIndex));
    main.appendChild(toolbar);

    main.appendChild(step === "overview" ? renderOverview(lesson) : renderStepView(lesson.steps[idx]));
  }
  shell.appendChild(main);
  app.appendChild(shell);
}

window.addEventListener("hashchange", render);
render();

// "/" focuses the content-area search box, unless the user is already
// typing somewhere. Registered once here (not inside render()) since the
// whole content area — and the search input within it — is torn down and
// rebuilt on every hashchange; this listener just looks up whichever
// instance is live.
window.addEventListener("keydown", (e) => {
  if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
  const input = document.querySelector<HTMLInputElement>(".search-input");
  if (input) {
    e.preventDefault();
    input.focus();
  }
});
