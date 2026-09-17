import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { staticPage } from "../scripts/static-pages";
import { lessons } from "../src/lessons";
import { registry } from "../src/lessons/registry";
import { lessonPaths, lessonUrl, publicNavigation, siteUrl } from "../src/lesson-urls";

const template = readFileSync("index.html", "utf8");
const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

describe("static lesson entry pages", () => {
  it("gives every available lesson a unique public path", () => {
    const entries = registry.filter((entry) => entry.status === "available");
    expect(new Set(entries.map((entry) => lessonPaths[entry.slug])).size).toBe(entries.length);
    for (const entry of entries) expect(lessonPaths[entry.slug]).toMatch(/^[a-z0-9-]+$/);
  });

  it.each(Object.values(lessons))("renders $slug without needing JavaScript", (lesson) => {
    const page = parse(staticPage(template, lesson.slug));
    expect(page.querySelector("h1")?.textContent).toBe(lesson.title);
    expect(page.title).toContain(lesson.title);
    expect(page.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(lesson.summary);
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(lessonUrl(lesson.slug));
    expect(page.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(lessonUrl(lesson.slug));
    expect(page.querySelector("#app")?.getAttribute("data-lesson")).toBe(lesson.slug);
    expect(page.querySelector("base")?.getAttribute("href")).toBe("../");
    expect(page.querySelector("main")?.textContent).toContain(lesson.whyItMatters);
    for (const goal of lesson.objectives) expect(page.querySelector("main")?.textContent).toContain(goal);
    expect(page.querySelectorAll(".overview-steps li").length).toBe(lesson.steps.length);
    expect(page.querySelector(`a[href="${lessonPaths.tls13}/"]`)).not.toBeNull();
    // Base resolution preserves assets and links at both root and GitHub project deployments.
    for (const base of ["https://example.test/", siteUrl]) {
      const documentUrl = lessonUrl(lesson.slug, base);
      const resolvedBase = new URL(page.querySelector("base")!.getAttribute("href")!, documentUrl);
      expect(resolvedBase.href).toBe(base);
      expect(new URL("diagrams/example.svg", resolvedBase).href).toBe(`${base}diagrams/example.svg`);
    }
  });

  it("provides a crawlable home page with all lesson links", () => {
    const page = parse(staticPage(template));
    expect(page.querySelector("h1")?.textContent).toBe("Practical Cryptography, Byte by Byte");
    for (const path of Object.values(lessonPaths)) expect(page.querySelector(`main a[href="${path}/"]`)).not.toBeNull();
  });

  it("keeps step links and converts overview navigation under the current deployment base", () => {
    const root = document.createElement("div");
    root.innerHTML = '<a href="#/lesson/tls13/overview">Overview</a><a href="#/lesson/tls13/2">Step</a><a href="#/home">Home</a>';
    publicNavigation(root, "https://example.test/project/");
    expect(Array.from(root.querySelectorAll("a"), (a) => a.getAttribute("href"))).toEqual([
      "https://example.test/project/tls-13/", "#/lesson/tls13/2", "https://example.test/project/",
    ]);
  });
});
