import type { Lesson, RegistryEntry } from "../types";

const REQUIRED_LIST_LIMITS = {
  objectives: { min: 3, max: 5 },
  keyTakeaways: { min: 3, max: 6 },
};

export interface ValidationOptions {
  diagramAssets?: Set<string>;
}

function authoredMarkup(lesson: Lesson): { owner: string; html: string }[] {
  const chunks: { owner: string; html: string }[] = [];
  if (lesson.figure?.body) chunks.push({ owner: `${lesson.slug}: overview figure`, html: lesson.figure.body });
  for (const step of lesson.steps) {
    chunks.push({ owner: step.id, html: step.prose });
    if (step.figure?.body) chunks.push({ owner: `${step.id}: figure`, html: step.figure.body });
  }
  return chunks;
}

function imageTags(html: string): string[] {
  return html.match(/<img\b[^>]*>/gi) ?? [];
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m?.[1];
}

function normalizeAssetPath(src: string): string {
  return src.replace(/^\//, "");
}

export function validateLesson(lesson: Lesson, options: ValidationOptions = {}): string[] {
  const errors: string[] = [];
  const seenStepIds = new Set<string>();
  const duplicateStepIds = new Set<string>();
  for (const step of lesson.steps) {
    if (seenStepIds.has(step.id)) duplicateStepIds.add(step.id);
    seenStepIds.add(step.id);
  }
  for (const id of duplicateStepIds) errors.push(`${lesson.slug}: duplicate step id '${id}'`);

  const stepIds = new Set(lesson.steps.map((s) => s.id));
  for (const step of lesson.steps) {
    // Every step needs a title and prose. Bytes/annotations are only required
    // for wire walkthroughs; concept steps legitimately omit them.
    if (!step.title || !step.prose || !step.takeaway) {
      errors.push(`${step.id}: missing required fields`);
    }

    // Sidebar sub-step grouping: every referenced id must be a real step in
    // this lesson, and a step can't nest itself.
    for (const childId of step.subSteps ?? []) {
      if (childId === step.id) {
        errors.push(`${step.id}: subSteps references itself`);
      } else if (!stepIds.has(childId)) {
        errors.push(`${step.id}: subSteps references unknown step '${childId}'`);
      }
    }
    // Annotated-text steps: every annotation must point at a real line.
    if (step.textBlock) {
      for (const a of step.textBlock.annotations) {
        if (a.line < 0 || a.line >= step.textBlock.lines.length) {
          errors.push(`${step.id}: text annotation '${a.label}' references out-of-range line ${a.line}`);
        }
      }
    }

    // Sequence steps: every message must reference declared actors.
    if (step.sequence) {
      const ids = new Set(step.sequence.actors.map((a) => a.id));
      for (const m of step.sequence.messages) {
        if (!ids.has(m.from) || !ids.has(m.to)) {
          errors.push(`${step.id}: sequence message '${m.label}' references an unknown actor`);
        }
      }
    }

    // Byte/annotation rules only apply when the step actually carries bytes.
    if (!step.bytes) continue;
    const annotations = step.annotations ?? [];
    const sorted = [...annotations].sort((a, b) => a.offset - b.offset);
    for (const a of annotations) {
      if (a.length <= 0 || a.offset < 0 || a.offset + a.length > step.bytes.length) {
        errors.push(`${step.id}: annotation '${a.label}' exceeds byte bounds`);
      }
    }
    // Reports overlaps between adjacent sorted annotations: a real overlap is always detected, but with 3+ annotations not every offending pair is individually reported.
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const cur = sorted[i];
      if (cur.offset < prev.offset + prev.length) {
        errors.push(`${step.id}: annotations '${prev.label}' and '${cur.label}' overlap`);
      }
    }
  }

  for (const chunk of authoredMarkup(lesson)) {
    if (/\sstyle\s*=/i.test(chunk.html)) {
      errors.push(`${chunk.owner}: inline style attributes are not allowed in authored markup`);
    }
    for (const tag of imageTags(chunk.html)) {
      const src = attr(tag, "src");
      const alt = attr(tag, "alt");
      if (alt === undefined || alt.trim().length === 0) {
        errors.push(`${chunk.owner}: image is missing meaningful alt text`);
      }
      if (src && options.diagramAssets && (src.startsWith("diagrams/") || src.startsWith("/diagrams/"))) {
        const normalized = normalizeAssetPath(src);
        if (!options.diagramAssets?.has(normalized)) {
          errors.push(`${chunk.owner}: image asset '${src}' does not exist`);
        }
      }
    }
  }
  return errors;
}

export function validateRegistry(entries: RegistryEntry[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const e of entries) {
    if (seen.has(e.slug)) errors.push(`duplicate slug: ${e.slug}`);
    seen.add(e.slug);
  }
  return errors;
}

function hasText(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function validateMetadata(lesson: Lesson): string[] {
  const errors: string[] = [];
  if (!hasText(lesson.title)) errors.push(`${lesson.slug}: missing lesson title`);
  if (!hasText(lesson.summary)) errors.push(`${lesson.slug}: missing metadata summary`);
  if (!hasText(lesson.whyItMatters)) errors.push(`${lesson.slug}: missing metadata whyItMatters`);

  const objectives = lesson.objectives ?? [];
  if (objectives.length < REQUIRED_LIST_LIMITS.objectives.min || objectives.length > REQUIRED_LIST_LIMITS.objectives.max) {
    errors.push(`${lesson.slug}: metadata objectives must have 3-5 items`);
  } else if (objectives.some((item) => !hasText(item))) {
    errors.push(`${lesson.slug}: metadata objectives contains an empty item`);
  }

  const keyTakeaways = lesson.keyTakeaways ?? [];
  if (keyTakeaways.length < REQUIRED_LIST_LIMITS.keyTakeaways.min || keyTakeaways.length > REQUIRED_LIST_LIMITS.keyTakeaways.max) {
    errors.push(`${lesson.slug}: metadata keyTakeaways must have 3-6 items`);
  } else if (keyTakeaways.some((item) => !hasText(item))) {
    errors.push(`${lesson.slug}: metadata keyTakeaways contains an empty item`);
  }

  return errors;
}

export function validateCourse(entries: RegistryEntry[], lessons: Record<string, Lesson>, options: ValidationOptions = {}): string[] {
  const errors = validateRegistry(entries);
  const registrySlugs = new Set(entries.map((entry) => entry.slug));
  const availableSlugs = new Set(entries.filter((entry) => entry.status === "available").map((entry) => entry.slug));
  const order = new Map(entries.map((entry, index) => [entry.slug, index]));

  for (const entry of entries) {
    const lesson = lessons[entry.slug];
    if (entry.status === "available" && !lesson) {
      errors.push(`registry entry '${entry.slug}' has no matching lesson module`);
      continue;
    }
    if (!lesson) continue;

    if (lesson.slug !== entry.slug) {
      errors.push(`${entry.slug}: lesson slug '${lesson.slug}' does not match registry slug`);
    }
    if (lesson.title !== entry.title) {
      errors.push(`${entry.slug}: registry title '${entry.title}' does not match lesson title '${lesson.title}'`);
    }
    if (entry.status === "available") {
      errors.push(...validateMetadata(lesson));
      errors.push(...validateLesson(lesson, options));
    }
  }

  for (const slug of Object.keys(lessons)) {
    if (!registrySlugs.has(slug)) errors.push(`lesson module '${slug}' has no matching registry entry`);
  }

  for (const lesson of Object.values(lessons)) {
    for (const prerequisite of lesson.prerequisites ?? []) {
      if (!availableSlugs.has(prerequisite)) {
        errors.push(`${lesson.slug}: prerequisite '${prerequisite}' is not an available lesson slug`);
      } else if ((order.get(prerequisite) ?? Infinity) >= (order.get(lesson.slug) ?? -1)) {
        errors.push(`${lesson.slug}: prerequisite '${prerequisite}' must appear earlier in the registry`);
      }
    }
    errors.push(...validateInternalLessonLinks(lesson, lessons));
  }

  return errors;
}

function validateInternalLessonLinks(lesson: Lesson, lessons: Record<string, Lesson>): string[] {
  const errors: string[] = [];
  for (const chunk of authoredMarkup(lesson)) {
    const links = chunk.html.match(/#\/lesson\/[^"' <)]+/g) ?? [];
    for (const link of links) {
      const m = link.match(/^#\/lesson\/([^/]+)(?:\/(overview|\d+))?/);
      if (!m) continue;
      const target = lessons[m[1]];
      if (!target) {
        errors.push(`${chunk.owner}: internal lesson link '${link}' references an unknown lesson`);
        continue;
      }
      if (m[2] && m[2] !== "overview") {
        const index = Number(m[2]);
        if (!Number.isInteger(index) || index < 0 || index >= target.steps.length) {
          errors.push(`${chunk.owner}: internal lesson link '${link}' references an unknown step`);
        }
      }
    }
  }
  return errors;
}
