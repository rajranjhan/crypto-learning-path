import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import { lessons } from "../src/lessons";
import { registry } from "../src/lessons/registry";
import { lessonPaths, lessonUrl, publicNavigation, siteUrl } from "../src/lesson-urls";
import { renderHome } from "../src/components/home";
import { renderOverview } from "../src/components/overview";
import { renderSidebar } from "../src/layout/sidebar";

// jsdom is already a development dependency; it is used only at build time.
const { JSDOM } = createRequire(import.meta.url)("jsdom") as {
  JSDOM: new (html: string, options: { url: string }) => {
    window: { document: Document; close(): void };
    serialize(): string;
  };
};

export function staticPage(template: string, slug?: string): string {
  const url = slug ? lessonUrl(slug) : siteUrl;
  const dom = new JSDOM(template, { url });
  const doc = dom.window.document;
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "document", { configurable: true, value: doc });
  try {
    const base = doc.createElement("base");
    base.href = slug ? "../" : "./";
    doc.head.prepend(base);
    const app = doc.querySelector<HTMLElement>("#app")!;
    app.dataset.lesson = slug ?? "";
    const shell = doc.createElement("div");
    shell.className = "shell";
    shell.appendChild(renderSidebar(registry, lessons, { activeSlug: slug ?? "", activeStep: slug ? "overview" : null }));
    const main = doc.createElement("main");
    main.className = "content";
    main.appendChild(slug ? renderOverview(lessons[slug], lessons) : renderHome(registry, lessons));
    shell.appendChild(main);
    app.replaceChildren(shell);
    publicNavigation(app, siteUrl);
    // Keep navigation portable between a project subpath and a local preview.
    app.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = link.getAttribute("href")!;
      if (href.startsWith(siteUrl)) link.setAttribute("href", href.slice(siteUrl.length) || "./");
    });
    if (slug) {
      const lesson = lessons[slug];
      const title = `${lesson.title} — Practical Cryptography, Byte by Byte`;
      doc.title = title;
      for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
        doc.querySelector(selector)!.setAttribute("content", lesson.summary);
      }
      for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
        doc.querySelector(selector)!.setAttribute("content", title);
      }
      doc.querySelector('link[rel="canonical"]')!.setAttribute("href", url);
      doc.querySelector('meta[property="og:url"]')!.setAttribute("content", url);
    }
    return dom.serialize();
  } finally {
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else Reflect.deleteProperty(globalThis, "document");
    dom.window.close();
  }
}

export function staticLessonPages(): Plugin {
  return {
    name: "static-lesson-pages",
    enforce: "post",
    generateBundle(_options, bundle) {
      const entry = bundle["index.html"];
      if (!entry || entry.type !== "asset") throw new Error("Missing built index.html");
      const template = String(entry.source);
      entry.source = staticPage(template);
      const urls = [siteUrl];
      for (const entry of registry.filter((item) => item.status === "available")) {
        const path = lessonPaths[entry.slug];
        if (!path || !lessons[entry.slug]) throw new Error(`Missing public lesson: ${entry.slug}`);
        this.emitFile({ type: "asset", fileName: `${path}/index.html`, source: staticPage(template, entry.slug) });
        urls.push(lessonUrl(entry.slug));
      }
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source:
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n` });
      this.emitFile({ type: "asset", fileName: ".nojekyll", source: "" });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
        const entry = Object.entries(lessonPaths).find(([, path]) => pathname === `/${path}/` || pathname === `/${path}/index.html`);
        if (!entry) return next();
        try {
          const template = readFileSync("index.html", "utf8");
          const html = await server.transformIndexHtml(pathname, staticPage(template, entry[0]));
          res.setHeader("Content-Type", "text/html");
          res.end(html);
        } catch (error) { next(error); }
      });
    },
  };
}
