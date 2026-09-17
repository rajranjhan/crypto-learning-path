import { describe, expect, it } from "vitest";
import { lessons } from "../src/lessons";
import { registry } from "../src/lessons/registry";
import { renderLessonEnding } from "../src/components/lesson-ending";

const course = registry.filter((entry) => entry.status === "available").map((entry) => lessons[entry.slug]);

describe.each(course.map((lesson, index) => [lesson.slug, lesson, index] as const))("%s ending", (_slug, lesson, index) => {
  it("provides concise takeaways, answerable questions, and a next step", () => {
    expect(lesson.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    expect(lesson.keyTakeaways.length).toBeLessThanOrEqual(6);
    expect(lesson.checkYourUnderstanding?.length).toBeGreaterThanOrEqual(2);
    expect(lesson.checkYourUnderstanding?.length).toBeLessThanOrEqual(4);
    for (const item of lesson.checkYourUnderstanding ?? []) {
      expect(item.question.trim()).not.toBe("");
      expect(item.answer?.trim()).toBeTruthy();
    }
    expect(lesson.transitionToNext?.trim()).toBeTruthy();
  });

  it("renders sections in order with hidden answers and the correct next lesson", () => {
    const nextLesson = course[index + 1];
    const ending = renderLessonEnding(lesson, nextLesson);
    const titles = Array.from(ending.querySelectorAll("h3, h4"), (heading) => heading.textContent);
    expect(titles).toEqual([
      "What to Remember", "Check Your Understanding", "Next",
      ...(lesson.references?.length ? ["Go Deeper"] : []),
    ]);
    const questions = ending.querySelectorAll("details");
    expect(questions.length).toBe(lesson.checkYourUnderstanding!.length);
    questions.forEach((question) => {
      expect(question.open).toBe(false);
      expect(question.querySelector("p")?.textContent).toBeTruthy();
    });
    const link = ending.querySelector(".next-lesson-link");
    if (nextLesson) {
      expect(link?.getAttribute("href")).toBe(`#/lesson/${nextLesson.slug}/overview`);
      if (lesson.references?.length) {
        expect(link!.compareDocumentPosition(ending.querySelector(".go-deeper")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      }
    } else {
      expect(link).toBeNull();
    }
    expect(ending.querySelectorAll(".go-deeper a").length).toBe(lesson.references?.length ?? 0);
  });
});
