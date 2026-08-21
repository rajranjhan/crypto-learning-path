import { describe, expect, it } from "vitest";
import { buildSearchIndex, search } from "../src/search";
import { registry } from "../src/lessons/registry";
import { encryptionBasicsLesson } from "../src/lessons/encryption-basics/lesson";
import { kerberosLesson } from "../src/lessons/kerberos/lesson";
import type { Lesson } from "../src/types";

const lessons: Record<string, Lesson> = {
  "encryption-basics": encryptionBasicsLesson,
  kerberos: kerberosLesson,
};

describe("buildSearchIndex", () => {
  it("includes an overview entry plus one entry per step, for available lessons only", () => {
    const index = buildSearchIndex(registry, lessons);
    const kerberosEntries = index.filter((e) => e.slug === "kerberos");
    expect(kerberosEntries).toHaveLength(kerberosLesson.steps.length + 1);
    expect(kerberosEntries[0]).toMatchObject({ step: "overview", title: "Overview" });
  });

  it("strips HTML tags out of the indexed text", () => {
    const index = buildSearchIndex(registry, lessons);
    const entry = index.find((e) => e.slug === "kerberos" && e.step === 0)!;
    expect(entry.text).not.toContain("<");
    expect(entry.text).not.toContain(">");
  });

  it("skips lessons with no matching module even if registered", () => {
    const index = buildSearchIndex(registry, {});
    expect(index).toEqual([]);
  });
});

describe("search", () => {
  const index = buildSearchIndex(registry, lessons);

  it("returns nothing for an empty query", () => {
    expect(search("", index)).toEqual([]);
    expect(search("   ", index)).toEqual([]);
  });

  it("finds a step by a distinctive word in its title", () => {
    const results = search("golden", index);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe("kerberos");
    expect(results[0].title).toContain("Golden");
  });

  it("finds a step by a word only in its body text", () => {
    const results = search("avalanche", index);
    expect(results.some((r) => r.title.includes("Block Ciphers"))).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(search("KERBEROS", index).length).toBe(search("kerberos", index).length);
  });

  it("ranks a title match above a body-only match", () => {
    const results = search("caesar", index);
    const titleMatchIdx = results.findIndex((r) => r.title.toLowerCase().includes("caesar"));
    expect(titleMatchIdx).toBe(0);
  });

  it("produces an ellipsized snippet around a body match", () => {
    const results = search("avalanche", index);
    const hit = results.find((r) => r.title.includes("Block Ciphers"))!;
    expect(hit.snippet).toContain("avalanche");
    expect(hit.snippet.length).toBeLessThan(hit.text.length);
  });

  it("caps results at the given limit", () => {
    const results = search("the", index, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});
