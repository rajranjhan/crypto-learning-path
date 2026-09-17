/** Public paths are independent of stable internal lesson slugs. */
export const lessonPaths: Record<string, string> = {
  "encryption-basics": "cryptography-basics",
  "symmetric-primitives": "symmetric-cryptography",
  "asymmetric-primitives": "asymmetric-cryptography",
  pki: "pki",
  tls12: "tls-12",
  tls13: "tls-13",
  mtls: "mutual-tls",
  "encryption-at-rest": "encryption-at-rest",
  kerberos: "kerberos",
  oauth: "oauth",
  "oauth-further-learning": "oauth-tokens-security",
  "oauth-flows": "oauth-flows-federation",
  "zero-knowledge-proofs": "zero-knowledge-proofs",
  "homomorphic-encryption": "homomorphic-encryption",
  "blockchain-cryptography": "blockchain-cryptography",
  "quantum-cryptography": "post-quantum-cryptography",
};

export const siteUrl = "https://rajranjhan.github.io/crypto-learning-path/";

export function lessonUrl(slug: string, base = siteUrl): string {
  const path = lessonPaths[slug];
  if (!path) throw new Error(`No public path for lesson: ${slug}`);
  return new URL(`${path}/`, base).href;
}

/** Rewrite only lesson overviews; individual steps retain their existing hash URLs. */
export function publicNavigation(root: ParentNode, base: string): void {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    const href = link.getAttribute("href")!;
    const match = href.match(/^#\/lesson\/([^/]+)(?:\/overview)?$/);
    if (match && lessonPaths[match[1]]) link.href = lessonUrl(match[1], base);
    else if (href === "#/home") link.href = base;
  });
}
