import type { Lesson, RegistryEntry } from "./types";

/** One searchable unit: a lesson's overview, or one of its steps. */
export interface SearchEntry {
  slug: string;
  lessonTitle: string;
  /** "overview" for the lesson's own overview page, otherwise a step index. */
  step: number | "overview";
  title: string;
  /** Plain text (HTML stripped) — the step's prose + bullets, or the lesson overview. */
  text: string;
}

export interface SearchResult extends SearchEntry {
  /** Higher scores rank first: a title match beats a lesson-name match beats a body match. */
  score: number;
  /** A short excerpt around the match, for body matches; falls back to the title otherwise. */
  snippet: string;
}

/** Authored HTML is trusted (see hexdump.ts/overview.ts), so a plain regex strip is enough here. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Build a flat, searchable index of every available lesson's overview and steps. */
export function buildSearchIndex(registry: RegistryEntry[], lessons: Record<string, Lesson>): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const r of registry) {
    if (r.status !== "available") continue;
    const lesson = lessons[r.slug];
    if (!lesson) continue;

    entries.push({
      slug: lesson.slug,
      lessonTitle: lesson.title,
      step: "overview",
      title: "Overview",
      text: stripHtml(lesson.overview ?? ""),
    });

    lesson.steps.forEach((step, i) => {
      const bulletText = (step.bullets ?? []).join(" ");
      entries.push({
        slug: lesson.slug,
        lessonTitle: lesson.title,
        step: i,
        title: step.title,
        text: `${stripHtml(step.prose)} ${bulletText}`,
      });
    });
  }

  return entries;
}

function buildSnippet(text: string, matchIndex: number, matchLength: number, radius = 40): string {
  const start = Math.max(0, matchIndex - radius);
  const end = Math.min(text.length, matchIndex + matchLength + radius);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

/**
 * Case-insensitive substring search across every entry's lesson name, step
 * title, and body text. Title matches rank above lesson-name matches, which
 * rank above body-only matches; results are capped at `limit`.
 */
export function search(query: string, index: SearchEntry[], limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];
  for (const entry of index) {
    const titleIndex = entry.title.toLowerCase().indexOf(q);
    const lessonIndex = entry.lessonTitle.toLowerCase().indexOf(q);
    const textIndex = entry.text.toLowerCase().indexOf(q);
    if (titleIndex === -1 && lessonIndex === -1 && textIndex === -1) continue;

    const score = titleIndex !== -1 ? 3 : lessonIndex !== -1 ? 2 : 1;
    const snippet = textIndex !== -1 ? buildSnippet(entry.text, textIndex, q.length) : entry.title;
    results.push({ ...entry, score, snippet });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
