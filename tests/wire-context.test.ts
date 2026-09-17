import { describe, expect, it } from "vitest";
import { lessons } from "../src/lessons";
import { renderStepView } from "../src/components/hexdump";
import type { Lesson } from "../src/types";

const technicalSteps = Object.values(lessons).flatMap((lesson) =>
  lesson.steps.flatMap((step, index) =>
    step.bytes?.length || step.textBlock || step.sequence ? [{ lesson, step, index }] : [],
  ),
);

describe("technical display context", () => {
  it.each(technicalSteps)("orients $lesson.slug/$step.id without dropping technical content", ({ lesson, step, index }) => {
    expect(step.wireContext?.where.trim()).toBeTruthy();
    expect(step.wireContext?.now.trim()).toBeTruthy();
    expect(step.wireContext?.why.trim()).toBeTruthy();
    const view = renderStepView(lesson, index);
    const context = view.querySelector(".wire-context")!;
    expect(Array.from(context.querySelectorAll("dt"), (el) => el.textContent)).toEqual([
      "Where we are", "What happens now", "Why",
    ]);
    for (const display of view.querySelectorAll(".hexdump, .text-block, .sequence")) {
      expect(context.compareDocumentPosition(display) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(Array.from(view.querySelectorAll(".hex-byte"), (el) => parseInt(el.textContent!, 16))).toEqual(step.bytes ?? []);
    expect(view.querySelectorAll(".annotation").length).toBe((step.annotations?.length ?? 0) + (step.textBlock?.annotations.length ?? 0));
    if (step.textBlock) {
      expect(Array.from(view.querySelectorAll(".tb-line"), (el) => el.textContent)).toEqual(
        step.textBlock.lines.map((line) => line || "\u00a0"),
      );
    }
    for (const message of step.sequence?.messages ?? []) {
      expect(view.querySelector(".sequence")?.textContent).toContain(message.label);
    }
    expect(view.querySelector(".protocol-progress")).toBeNull();
  });

  it("retains both annotated text and bytes when a step provides both", () => {
    const source = lessons.tls12;
    const step = {
      ...source.steps[0],
      textBlock: { lang: "http", lines: ["GET / HTTP/1.1"], annotations: [] },
    };
    const lesson: Lesson = { ...source, steps: [step] };
    const view = renderStepView(lesson, 0);
    expect(view.querySelector(".text-block")?.textContent).toContain("GET / HTTP/1.1");
    expect(view.querySelectorAll(".hex-byte").length).toBe(step.bytes!.length);
    const byte = view.querySelector<HTMLElement>(".hex-byte[data-annotation]")!;
    byte.dispatchEvent(new Event("focus"));
    expect(view.querySelector(".annotation.active")).not.toBeNull();
    byte.dispatchEvent(new Event("blur"));
    expect(view.querySelector(".annotation.active")).toBeNull();
  });
});
