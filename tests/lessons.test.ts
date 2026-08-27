import { describe, expect, it } from "vitest";
import { registry } from "../src/lessons/registry";
import { encryptionBasicsLesson } from "../src/lessons/encryption-basics/lesson";
import { symmetricPrimitivesLesson } from "../src/lessons/symmetric-primitives/lesson";
import { asymmetricPrimitivesLesson } from "../src/lessons/asymmetric-primitives/lesson";
import { pkiLesson } from "../src/lessons/pki/lesson";
import { tls12Lesson } from "../src/lessons/tls12/lesson";
import { tls13Lesson } from "../src/lessons/tls13/lesson";
import { mtlsLesson } from "../src/lessons/mtls/lesson";
import { encryptionAtRestLesson } from "../src/lessons/encryption-at-rest/lesson";
import { homomorphicEncryptionLesson } from "../src/lessons/homomorphic-encryption/lesson";
import { zeroKnowledgeProofsLesson } from "../src/lessons/zero-knowledge-proofs/lesson";
import { oauthLesson } from "../src/lessons/oauth/lesson";
import { oauthFurtherLearningLesson } from "../src/lessons/oauth-further-learning/lesson";
import { oauthFlowsLesson } from "../src/lessons/oauth-flows/lesson";
import { kerberosLesson } from "../src/lessons/kerberos/lesson";
import { quantumCryptographyLesson } from "../src/lessons/quantum-cryptography/lesson";
import { validateLesson, validateRegistry } from "../src/lessons/validate";
import type { Lesson } from "../src/types";

const lessons: Record<string, Lesson> = {
  "encryption-basics": encryptionBasicsLesson,
  "symmetric-primitives": symmetricPrimitivesLesson,
  "asymmetric-primitives": asymmetricPrimitivesLesson,
  pki: pkiLesson,
  tls12: tls12Lesson,
  tls13: tls13Lesson,
  mtls: mtlsLesson,
  "encryption-at-rest": encryptionAtRestLesson,
  "homomorphic-encryption": homomorphicEncryptionLesson,
  "zero-knowledge-proofs": zeroKnowledgeProofsLesson,
  oauth: oauthLesson,
  "oauth-further-learning": oauthFurtherLearningLesson,
  "oauth-flows": oauthFlowsLesson,
  kerberos: kerberosLesson,
  "quantum-cryptography": quantumCryptographyLesson,
};

describe("registry", () => {
  it("has no duplicate or invalid slugs", () => {
    expect(validateRegistry(registry)).toEqual([]);
  });

  it("has a lesson module for every available registry entry", () => {
    for (const entry of registry) {
      if (entry.status === "available") {
        expect(lessons, `registry entry '${entry.slug}' has no matching lesson module`).toHaveProperty(entry.slug);
      }
    }
  });
});

describe.each(Object.entries(lessons))("%s lesson", (_slug, lesson) => {
  it("has no authoring/validation errors", () => {
    expect(validateLesson(lesson)).toEqual([]);
  });

  it("has at least one step", () => {
    expect(lesson.steps.length).toBeGreaterThan(0);
  });
});
