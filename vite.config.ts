/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the built assets resolve correctly whether the site is
  // served from a domain root (local preview) or a subpath (GitHub Pages
  // project sites are served from <user>.github.io/<repo>/).
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
  },
});
