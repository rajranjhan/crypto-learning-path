import { describe, expect, it } from "vitest";
import { validateLesson, validateRegistry } from "../src/lessons/validate";
import type { Lesson, RegistryEntry, Step } from "../src/types";

function baseStep(overrides: Partial<Step> = {}): Step {
  return { id: "step-1", title: "A step", prose: "Some prose.", ...overrides };
}

describe("validateLesson", () => {
  it("accepts a well-formed concept step (no bytes)", () => {
    expect(validateLesson({ slug: "l", title: "L", status: "available", steps: [baseStep()] })).toEqual([]);
  });

  it("flags a step missing a title or prose", () => {
    const lesson: Lesson = {
      slug: "l",
      title: "L",
      status: "available",
      steps: [baseStep({ title: "" }), baseStep({ id: "step-2", prose: "" })],
    };
    const errors = validateLesson(lesson);
    expect(errors).toContain("step-1: missing required fields");
    expect(errors).toContain("step-2: missing required fields");
  });

  it("flags an annotation that exceeds the byte bounds", () => {
    const lesson: Lesson = {
      slug: "l",
      title: "L",
      status: "available",
      steps: [
        baseStep({
          bytes: [0x01, 0x02, 0x03],
          annotations: [{ offset: 1, length: 5, label: "Too long", description: "", colorClass: "" }],
        }),
      ],
    };
    expect(validateLesson(lesson)).toEqual(["step-1: annotation 'Too long' exceeds byte bounds"]);
  });

  it("flags overlapping annotations", () => {
    const lesson: Lesson = {
      slug: "l",
      title: "L",
      status: "available",
      steps: [
        baseStep({
          bytes: [0x01, 0x02, 0x03, 0x04],
          annotations: [
            { offset: 0, length: 2, label: "First", description: "", colorClass: "" },
            { offset: 1, length: 2, label: "Second", description: "", colorClass: "" },
          ],
        }),
      ],
    };
    expect(validateLesson(lesson)).toEqual(["step-1: annotations 'First' and 'Second' overlap"]);
  });

  it("flags a text annotation pointing at an out-of-range line", () => {
    const lesson: Lesson = {
      slug: "l",
      title: "L",
      status: "available",
      steps: [
        baseStep({
          textBlock: {
            lang: "json",
            lines: ['{"a": 1}'],
            annotations: [{ line: 3, label: "Bad", description: "", colorClass: "" }],
          },
        }),
      ],
    };
    expect(validateLesson(lesson)).toEqual(["step-1: text annotation 'Bad' references out-of-range line 3"]);
  });

  it("flags a sequence message referencing an unknown actor", () => {
    const lesson: Lesson = {
      slug: "l",
      title: "L",
      status: "available",
      steps: [
        baseStep({
          sequence: {
            actors: [{ id: "client", label: "Client" }],
            messages: [{ from: "client", to: "server", label: "Hello" }],
          },
        }),
      ],
    };
    expect(validateLesson(lesson)).toEqual(["step-1: sequence message 'Hello' references an unknown actor"]);
  });
});

describe("validateRegistry", () => {
  it("accepts unique slugs", () => {
    const entries: RegistryEntry[] = [
      { slug: "a", title: "A", status: "available" },
      { slug: "b", title: "B", status: "available" },
    ];
    expect(validateRegistry(entries)).toEqual([]);
  });

  it("flags duplicate slugs", () => {
    const entries: RegistryEntry[] = [
      { slug: "a", title: "A", status: "available" },
      { slug: "a", title: "A again", status: "coming-soon" },
    ];
    expect(validateRegistry(entries)).toEqual(["duplicate slug: a"]);
  });
});
