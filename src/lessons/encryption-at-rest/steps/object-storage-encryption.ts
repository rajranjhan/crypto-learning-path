import type { Step } from "../../../types";

export const objectStorageEncryption: Step = {
  id: "object-storage-encryption",
  title: "Locking Boxes in Someone Else's Warehouse — Object Storage Encryption",
  prose:
    "<p>The same DEK/KEK ideas apply directly to cloud object storage — S3, Google Cloud Storage, Azure Blob — which is worth calling out on its own, since misconfigured public buckets are one of the most common sources of real-world data-at-rest breaches. The three server-side modes differ mainly in who holds and manages the key: with a provider-managed key, setup is zero-effort but you get little visibility into key access; with a customer-managed key in the provider's own KMS, you control access through your own key policy and every decrypt is individually logged and auditable; with a customer-supplied key, you send the key with every request and the provider uses it but never stores or retains it, so keeping it safe and getting it there securely is entirely on you.</p>" +
    "<p><strong>Client-side encryption</strong> goes one step further than all three: encrypt before upload, using the exact envelope-encryption pattern from earlier in this lesson, so the storage provider only ever receives and stores ciphertext and never sees a key at all.</p>" +
    "<p>None of this helps against the most common real failure mode, though: a bucket policy that grants public (or overly broad) read access. Encryption at the storage layer protects data from someone reading the raw bytes off disk — it does nothing against an authorized, or accidentally public, API call that gets back a completely normal decrypt.</p>",
  bullets: [
    "Provider-managed keys: zero setup, but little visibility into who at the provider could theoretically access the key",
    "Customer-managed keys (in the provider's KMS): you control access via your own key policy, and every decrypt is individually logged and auditable",
    "Customer-supplied keys: you send the key with every request; the provider uses it but never stores or retains it — you're fully responsible for keeping it safe",
    "Client-side encryption: encrypt before upload using the envelope-encryption pattern from earlier — the provider only ever stores ciphertext and never sees a key at all",
    "A misconfigured public bucket defeats all of the above: encryption at rest protects data from someone reading raw storage, not from an authorized (or accidentally public) API call that gets a normal decrypt",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Provider-managed</div>
        <div class="node-sub">key held & managed by the provider</div>
      </div>
      <div class="node">
        <div class="node-title">Customer-managed</div>
        <div class="node-sub">key held by the provider, access controlled by you</div>
      </div>
      <div class="node">
        <div class="node-title">Customer-supplied</div>
        <div class="node-sub">key held by you, sent per request</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Client-side</div>
        <div class="node-sub">key never leaves your application at all</div>
      </div>
    </div>
    <p class="diagram-note">
      Left to right, less trust is placed in the storage provider and more
      responsibility falls on you — the same tradeoff curve as TDE versus
      field-level encryption, just one layer further out.
    </p>
  `,
};
