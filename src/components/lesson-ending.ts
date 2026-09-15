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

  if (nextLesson) {
    const next = document.createElement("a");
    next.className = "next-lesson-link";
    next.href = `#/lesson/${nextLesson.slug}/overview`;
    next.textContent = `Next Lesson: ${nextLesson.title}`;
    section.appendChild(next);
  }

  return section;
}
