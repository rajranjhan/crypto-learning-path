import type { Lesson, RegistryEntry } from "../types";

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];
  const stepIds = new Set(lesson.steps.map((s) => s.id));
  for (const step of lesson.steps) {
    // Every step needs a title and prose. Bytes/annotations are only required
    // for wire walkthroughs; concept steps legitimately omit them.
    if (!step.title || !step.prose) {
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
