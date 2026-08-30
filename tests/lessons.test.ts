import { describe, expect, it } from "vitest";
import { lessons } from "../src/lessons";
import { registry } from "../src/lessons/registry";
import { validateLesson, validateRegistry } from "../src/lessons/validate";

describe("registry", () => {
  it("has no duplicate or invalid slugs", () => {
    expect(validateRegistry(registry)).toEqual([]);
  });

  it("has a lesson module for every available registry entry", () => {
    for (const entry of registry) {
      if (entry.status === "available") {
        expect(lessons, `registry entry '${entry.slug}' has no matching lesson module`).toHaveProperty(entry.slug);
      }
    }
  });
});

describe.each(Object.entries(lessons))("%s lesson", (_slug, lesson) => {
  it("has no authoring/validation errors", () => {
    expect(validateLesson(lesson)).toEqual([]);
  });

  it("has at least one step", () => {
    expect(lesson.steps.length).toBeGreaterThan(0);
  });
});
