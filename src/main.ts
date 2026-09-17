import "./styles/main.css";
import { lessons } from "./lessons";
import { registry } from "./lessons/registry";
import { renderSidebar } from "./layout/sidebar";
import { renderStepView } from "./components/hexdump";
import { renderStepper } from "./components/stepper";
import { renderOverview } from "./components/overview";
import { renderSearch } from "./components/search";
import { renderHome } from "./components/home";
import { buildSearchIndex } from "./search";
import { validateCourse, validateLesson } from "./lessons/validate";

import { lessonUrl, publicNavigation, siteUrl } from "./lesson-urls";

const entryLesson = document.querySelector<HTMLElement>("#app")?.dataset.lesson;
const homeTitle = "Practical Cryptography: TLS, PKI, OAuth, Encryption & Security — Byte by Byte";
const homeDescription = "Learn practical cryptography through visual explanations, protocol diagrams and byte-level walkthroughs of encryption, TLS, PKI, OAuth, Kerberos, zero-knowledge proofs and post-quantum cryptography.";

const searchIndex = buildSearchIndex(registry, lessons);

const slugAliases: Record<string, string> = {
  "oauth-tokens-claims-security": "oauth-further-learning",
  "oauth-tokens-claims-and-security": "oauth-further-learning",
  "oauth-further-learning": "oauth-further-learning",
  "post-quantum-cryptography": "quantum-cryptography",
  "quantum-cryptography-threats": "quantum-cryptography",
  "quantum-cryptography-threats-to-todays-encryption": "quantum-cryptography",
  "quantum-cryptography-threats-to-today-s-encryption": "quantum-cryptography",
};

// In dev, surface authoring mistakes (bad annotation offsets, duplicate slugs)
// immediately in the console instead of letting them render as silent glitches.
if (import.meta.env.DEV) {
  const problems = [
    ...validateCourse(registry, lessons),
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
} | { slug: "home"; step: "home" } {
  if (!hash && entryLesson && lessons[entryLesson]) return { slug: entryLesson, step: "overview" };
  if (!hash || hash === "#" || hash === "#/" || hash === "#/home") return { slug: "home", step: "home" };
  const m = hash.match(/^#\/lesson\/([^/]+)(?:\/(overview|\d+))?/);
  if (!m) return { slug: "home", step: "home" };
  const rawSlug = m[1];
  const canonicalSlug = slugAliases[rawSlug] ?? rawSlug;
  const seg = m[2];
  if (canonicalSlug !== rawSlug) {
    const suffix = seg === undefined ? "/overview" : `/${seg}`;
    location.replace(`#/lesson/${canonicalSlug}${suffix}`);
  }
  if (seg === undefined || seg === "overview") return { slug: canonicalSlug, step: "overview" };
  return { slug: canonicalSlug, step: parseInt(seg, 10) };
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "";
  const route = parseHash();
  const { slug, step } = route;

  const shell = document.createElement("div");
  shell.className = "shell";
  const isHome = slug === "home";
  const active = isHome ? undefined : registry.find((r) => r.slug === slug);
  const lesson = isHome ? undefined : lessons[slug];
  const notFound = !isHome && (!lesson || active?.status !== "available");
  const activeStep = isHome || notFound || step === "home"
    ? null
    : step === "overview"
      ? "overview"
      : Math.max(0, Math.min(step, lesson!.steps.length - 1));

  shell.appendChild(
    renderSidebar(registry, lessons, {
      activeSlug: active?.slug ?? "",
      activeStep,
    }),
  );

  const main = document.createElement("main");
  main.className = "content";

  if (isHome) {
    const toolbar = document.createElement("div");
    toolbar.className = "content-toolbar";
    toolbar.appendChild(renderSearch(searchIndex));
    main.appendChild(toolbar);
    main.appendChild(renderHome(registry, lessons));
  } else if (notFound) {
    main.innerHTML = `<h2>Lesson not found</h2><p><a href="#/lesson/encryption-basics">Go to the first lesson</a>.</p>`;
  } else {
    const currentLesson = lesson!;
    const currentStep = step as number | "overview";
    // Top bar of the content area: the stepper (on step pages only) on the
    // left, search pinned to the far right — present on every lesson page,
    // including the overview, where there's no stepper to sit next to.
    const toolbar = document.createElement("div");
    toolbar.className = "content-toolbar";

    let idx = -1;
    if (currentStep !== "overview") {
      idx = Math.max(0, Math.min(currentStep, currentLesson.steps.length - 1));
      toolbar.appendChild(renderStepper({
        index: idx,
        total: currentLesson.steps.length,
        onPrev: () => { location.hash = `#/lesson/${slug}/${idx - 1}`; },
        onNext: () => { location.hash = `#/lesson/${slug}/${idx + 1}`; },
      }));
    }
    toolbar.appendChild(renderSearch(searchIndex));
    main.appendChild(toolbar);

    const nextEntry = registry.slice(registry.findIndex((r) => r.slug === slug) + 1).find((r) => r.status === "available" && lessons[r.slug]);
    const nextLesson = nextEntry ? lessons[nextEntry.slug] : undefined;
    main.appendChild(currentStep === "overview" ? renderOverview(currentLesson, lessons) : renderStepView(currentLesson, idx, nextLesson));
  }
  shell.appendChild(main);
  publicNavigation(shell, new URL("./", document.baseURI).href);
  app.appendChild(shell);

  const title = lesson ? `${lesson.title} — Practical Cryptography, Byte by Byte` : homeTitle;
  const description = lesson?.summary ?? homeDescription;
  document.title = title;
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    document.querySelector(selector)?.setAttribute("content", description);
  }
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    document.querySelector(selector)?.setAttribute("content", title);
  }
  const canonical = lesson ? lessonUrl(lesson.slug) : siteUrl;
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
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
