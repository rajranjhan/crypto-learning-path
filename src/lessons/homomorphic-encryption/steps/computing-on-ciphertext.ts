import type { Step } from "../../../types";
import { HE_ACTORS } from "../../actors";

export const computingOnCiphertext: Step = {
  id: "computing-on-ciphertext",
  title: "Handing Your Data to a Cloud You Don't Trust",
  prose:
    "<p>Put the pieces together and the glovebox metaphor from the first step becomes an actual protocol. A data owner encrypts their data locally, using a key nobody else ever holds, and uploads only the ciphertext. An untrusted cloud — or an ML inference service, or an analytics platform — runs whatever computation it's meant to perform, using homomorphic addition and multiplication (with bootstrapping as needed) directly on that ciphertext. It produces a result, but that result is also ciphertext: the cloud computed a real answer without ever being able to read the question or the answer.</p>" +
    "<p>The encrypted result travels back to the data owner, and only there — the one place the private key ever exists — does it get decrypted into something readable. Every hop in between, including the machine that did the actual computing, only ever touched numbers that were cryptographically meaningless without that key.</p>" +
    "<p>This is the shape behind real deployments today: private machine learning inference (a hospital sends encrypted patient data to a cloud model and gets back an encrypted diagnosis), encrypted database queries (search or aggregate a dataset without the server learning the query or the results), and privacy-preserving analytics across organizations that don't trust each other with raw data.</p>",
  bullets: [
    "The data owner is the only party who ever holds the private key — before, during, and after the computation",
    "The computing party (cloud, ML service, analytics platform) never has access to plaintext data, the computation's intermediate values, or the final result",
    "Real deployments: private ML inference, encrypted database queries/search, cross-organization analytics on data nobody wants to expose to each other",
    "The protocol's security holds even if the computing party is fully compromised or malicious — it never had anything to leak",
  ],
  sequence: {
    actors: HE_ACTORS,
    messages: [
      { from: "owner", to: "cloud", label: "upload Encrypt(data)", note: "ciphertext only — the cloud never sees the plaintext", highlight: true },
      { from: "cloud", to: "cloud", label: "run the computation on ciphertext", note: "addition, multiplication, bootstrapping as needed — blind to the actual numbers", highlight: true },
      { from: "cloud", to: "owner", label: "return Encrypt(result)", note: "still ciphertext — the cloud can't read its own output either" },
      { from: "owner", to: "owner", label: "Decrypt(result) locally", note: "only the data owner ever holds the private key" },
    ],
  },
};
