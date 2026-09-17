import type { GlossaryTerm } from "../types";

/** Shared course definitions; keep AUTHORING.md terminology in sync. */
export const terminology = {
  "plaintext": "Data before encryption or after decryption; it can be binary data, not just readable text.",
  "ciphertext": "The encrypted representation of plaintext, recoverable by decryption with the appropriate key.",
  "symmetric key": "A secret key shared by parties using a symmetric algorithm; encryption and decryption use the same key.",
  "private key": "The secret member of an asymmetric key pair, used to sign, decrypt, or contribute to key agreement, depending on the algorithm.",
  "public key": "The shareable member of an asymmetric key pair, used to verify signatures, encrypt, or contribute to key agreement; it does not establish identity by itself.",
  "session key": "A symmetric key generated or derived for a limited session or exchange. A protocol can use separate keys for each direction and purpose.",
  "key exchange": "A process for establishing shared key material. Key agreement, such as Diffie-Hellman, derives it jointly; key exchange alone does not authenticate the peer.",
  "encryption": "A keyed transformation from plaintext to ciphertext for confidentiality. Encryption alone does not necessarily detect tampering or authenticate a peer.",
  "encoding": "A reversible change of representation, such as Base64 or hex, that needs no secret to decode. Encoding is not encryption.",
  "hashing": "Computing a digest from data with a hash function. Cryptographic hashing is designed to resist inversion, but guessable inputs can be tested; hashing is not encryption.",
  "digest": "The output of a hash function: a data fingerprint, not ciphertext or proof of who supplied the data.",
  "MAC": "A message authentication code: a keyed tag used to check message integrity and authenticity among shared-key holders. Any holder can generate tags.",
  "HMAC": "A MAC construction that combines a cryptographic hash function with a shared secret key. It neither encrypts data nor provides a public-key signature.",
  "signature": "A digital signature is generated with a private key and verified with its public key. It binds a message to that key, not automatically to a person or permission.",
  "nonce": "A value whose reuse is restricted within a specified protocol or key context. Uniqueness, unpredictability, and secrecy requirements depend on its role; a nonce is not a salt.",
  "IV": "An initialization vector: an input that initializes an encryption mode. Requirements vary: CBC needs an unpredictable IV; GCM requires nonce uniqueness for each key.",
  "salt": "A normally public, per-input value used in password hashing or key derivation. Password salts separate repeated passwords and frustrate precomputation; they do not make guessing slow by themselves.",
  "certificate": "An issuer-signed binding between a public key and names or other attributes. Trust requires validation; a domain-validated certificate is not automatic proof of corporate identity or trustworthiness.",
  "trust anchor": "A public key and associated information accepted through local trust configuration as the starting point for certificate validation, commonly represented by a root CA certificate.",
  "authentication": "Verifying a claimed identity or message origin. Message authentication with a shared key does not distinguish individual holders of that key.",
  "authorization": "Deciding which actions a principal or client may perform on a resource. Successful authentication does not grant every permission.",
  "access token": "A credential representing granted access, presented to a resource server and validated under its policy. It may be opaque or structured; it is not an ID token.",
  "refresh token": "A credential presented to the authorization server to obtain new access tokens within the grant. It is not sent to the resource server as an access token.",
  "scope": "A named extent of access requested or granted in OAuth. Granted scopes limit token use but do not replace resource-specific authorization checks.",
  "claim": "An assertion about a subject or token, such as issuer, expiry, or audience. A claim is not a verified fact merely because it appears in a token.",
  "audience": "The intended recipient or recipients of a token. For an access token this is generally the resource server; for an OIDC ID token it includes the client.",
  "bearer token": "A token usable by whoever possesses it, without a separate proof of a bound key. Its validity and authorization limits still apply.",
  "proof of possession": "Cryptographic evidence that a party controls a particular key. Possessing a token or certificate alone is not proof of its associated private key.",
  "forward secrecy": "Protection of past session secrets against later compromise of long-term keys, assuming ephemeral secrets were erased and the protocol was used securely.",
} as const;

export function lessonTerms(...names: (keyof typeof terminology)[]): GlossaryTerm[] {
  return names.map((term) => ({ term, definition: terminology[term] }));
}
