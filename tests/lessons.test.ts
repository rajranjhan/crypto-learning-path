import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { lessons } from "../src/lessons";
import { registry } from "../src/lessons/registry";
import { validateCourse, validateLesson, validateRegistry } from "../src/lessons/validate";

function collectPublicAssets(dir = "public"): Set<string> {
  const assets = new Set<string>();
  const walk = (current: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        assets.add(relative("public", full).replace(/\\/g, "/"));
      }
    }
  };
  walk(dir);
  return assets;
}

const publicAssets = collectPublicAssets();

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

  it("has consistent lesson entries, titles, metadata, and prerequisites", () => {
    expect(validateCourse(registry, lessons, { diagramAssets: publicAssets })).toEqual([]);
  });
});

describe.each(Object.entries(lessons))("%s lesson", (_slug, lesson) => {
  it("has no authoring/validation errors", () => {
    expect(validateLesson(lesson, { diagramAssets: publicAssets })).toEqual([]);
  });

  it("has at least one step", () => {
    expect(lesson.steps.length).toBeGreaterThan(0);
  });
});
