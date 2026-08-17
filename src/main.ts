import "./styles/main.css";
import { registry } from "./lessons/registry";
import { encryptionBasicsLesson } from "./lessons/encryption-basics/lesson";
import { tls12Lesson } from "./lessons/tls12/lesson";
import { tls13Lesson } from "./lessons/tls13/lesson";
import { mtlsLesson } from "./lessons/mtls/lesson";
import { oauthLesson } from "./lessons/oauth/lesson";
import { oauthFurtherLearningLesson } from "./lessons/oauth-further-learning/lesson";
import { oauthFlowsLesson } from "./lessons/oauth-flows/lesson";
import { renderSidebar } from "./layout/sidebar";
import { renderStepView } from "./components/hexdump";
import { renderStepper } from "./components/stepper";
import { renderOverview } from "./components/overview";
import { validateLesson, validateRegistry } from "./lessons/validate";
import type { Lesson } from "./types";

const lessons: Record<string, Lesson> = {
  "encryption-basics": encryptionBasicsLesson,
  tls12: tls12Lesson,
  tls13: tls13Lesson,
  mtls: mtlsLesson,
  oauth: oauthLesson,
  "oauth-further-learning": oauthFurtherLearningLesson,
  "oauth-flows": oauthFlowsLesson,
};

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
  } else if (step === "overview") {
    main.appendChild(renderOverview(lesson));
  } else {
    const idx = Math.max(0, Math.min(step, lesson.steps.length - 1));
    main.appendChild(renderStepper({
      index: idx,
      total: lesson.steps.length,
      onPrev: () => { location.hash = `#/lesson/${slug}/${idx - 1}`; },
      onNext: () => { location.hash = `#/lesson/${slug}/${idx + 1}`; },
    }));
    main.appendChild(renderStepView(lesson.steps[idx]));
  }
  shell.appendChild(main);
  app.appendChild(shell);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
render();
