import type { Lesson } from "../types";

export function renderLessonEnding(lesson: Lesson, nextLesson?: Lesson): HTMLElement {
  const section = document.createElement("section");
  section.className = "lesson-ending";

  const heading = document.createElement("h3");
  heading.textContent = "What to Remember";
  section.appendChild(heading);

  const list = document.createElement("ul");
  list.className = "ending-takeaways";
  for (const item of lesson.keyTakeaways) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
  section.appendChild(list);

  if (lesson.checkYourUnderstanding?.length) {
    const quiz = document.createElement("div");
    quiz.className = "check-understanding";
    const quizHeading = document.createElement("h4");
    quizHeading.textContent = "Check Your Understanding";
    quiz.appendChild(quizHeading);
    lesson.checkYourUnderstanding.forEach((item) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = item.question;
      details.appendChild(summary);
      if (item.answer) {
        const answer = document.createElement("p");
        answer.textContent = item.answer;
        details.appendChild(answer);
      }
      quiz.appendChild(details);
    });
    section.appendChild(quiz);
  }

  if (nextLesson || lesson.transitionToNext) {
    const bridge = document.createElement("div");
    bridge.className = "lesson-transition";
    const bridgeHeading = document.createElement("h4");
    bridgeHeading.textContent = "Next";
    const bridgeCopy = document.createElement("p");
    bridgeCopy.textContent = lesson.transitionToNext ?? `Continue with ${nextLesson!.title}.`;
    bridge.appendChild(bridgeHeading);
    bridge.appendChild(bridgeCopy);
    section.appendChild(bridge);
  }

  if (nextLesson) {
    const next = document.createElement("a");
    next.className = "next-lesson-link";
    next.href = `#/lesson/${nextLesson.slug}/overview`;
    next.textContent = `Next Lesson: ${nextLesson.title}`;
    section.appendChild(next);
  }

  if (lesson.references?.length) {
    const refs = document.createElement("div");
    refs.className = "go-deeper";
    const refsHeading = document.createElement("h4");
    refsHeading.textContent = "Go Deeper";
    refs.appendChild(refsHeading);

    const list = document.createElement("ul");
    for (const ref of lesson.references) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = ref.url;
      link.textContent = ref.title;
      link.target = "_blank";
      link.rel = "noopener";
      item.appendChild(link);
      list.appendChild(item);
    }
    refs.appendChild(list);
    section.appendChild(refs);
  }

  return section;
}
