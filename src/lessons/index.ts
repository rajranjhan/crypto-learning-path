import type { Lesson } from "../types";
import { asymmetricPrimitivesLesson } from "./asymmetric-primitives/lesson";
import { encryptionAtRestLesson } from "./encryption-at-rest/lesson";
import { encryptionBasicsLesson } from "./encryption-basics/lesson";
import { homomorphicEncryptionLesson } from "./homomorphic-encryption/lesson";
import { kerberosLesson } from "./kerberos/lesson";
import { mtlsLesson } from "./mtls/lesson";
import { oauthFlowsLesson } from "./oauth-flows/lesson";
import { oauthFurtherLearningLesson } from "./oauth-further-learning/lesson";
import { oauthLesson } from "./oauth/lesson";
import { pkiLesson } from "./pki/lesson";
import { quantumCryptographyLesson } from "./quantum-cryptography/lesson";
import { symmetricPrimitivesLesson } from "./symmetric-primitives/lesson";
import { tls12Lesson } from "./tls12/lesson";
import { tls13Lesson } from "./tls13/lesson";
import { zeroKnowledgeProofsLesson } from "./zero-knowledge-proofs/lesson";

export const lessons: Record<string, Lesson> = {
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
