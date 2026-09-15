import type { ProtocolProgress } from "../types";

export function renderProtocolProgress(progress: ProtocolProgress): HTMLElement {
  const section = document.createElement("aside");
  section.className = "protocol-progress";
  section.setAttribute("aria-label", "Protocol progress");

  if (progress.goal) {
    const goal = document.createElement("div");
    goal.className = "progress-row";
    goal.innerHTML = "<span>Goal</span>";
    goal.appendChild(document.createTextNode(progress.goal));
    section.appendChild(goal);
  }

  if (progress.already?.length) {
    const already = document.createElement("div");
    already.className = "progress-row";
    already.innerHTML = "<span>Already happened</span>";
    already.appendChild(document.createTextNode(progress.already.join(" -> ")));
    section.appendChild(already);
  }

  const now = document.createElement("div");
  now.className = "progress-row progress-now";
  now.innerHTML = "<span>Now</span>";
  now.appendChild(document.createTextNode(progress.now));
  section.appendChild(now);

  if (progress.next) {
    const next = document.createElement("div");
    next.className = "progress-row";
    next.innerHTML = "<span>Next</span>";
    next.appendChild(document.createTextNode(progress.next));
    section.appendChild(next);
  }

  return section;
}
