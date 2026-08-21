import type { Step } from "../../../types";
import { REST_ACTORS } from "../../actors";

export const transparentDataEncryption: Step = {
  id: "transparent-data-encryption",
  title: "The Bank Encrypts Its Own Ledgers — Transparent Data Encryption (TDE)",
  prose:
    "<p>Full-disk encryption protects the whole drive, indiscriminately. <strong>Transparent Data Encryption</strong> moves the same idea up one layer, into the database engine itself — SQL Server, Oracle, MySQL/InnoDB, Postgres via extensions, and most managed cloud databases (RDS, Azure SQL, Cloud SQL) either ship it or turn it on by default. TDE encrypts the actual data files, indexes, and transaction logs on disk, at the page or block level.</p>" +
    "<p>\"Transparent\" is the operative word: nothing above the storage engine ever knows encryption is happening. An ordinary <code>SELECT</code>, an ORM, a report a business analyst runs — none of it changes. The engine decrypts a page the instant it's read into memory, and re-encrypts it the instant it's flushed back to disk. If someone copies the raw data files off disk, or restores a backup somewhere it doesn't belong, all they get is ciphertext.</p>" +
    "<p>Under the hood, TDE almost always uses a two-tier key model: a <strong>Database Encryption Key (DEK)</strong> does the actual page encryption, but the DEK itself doesn't sit on disk unprotected — it's wrapped by a separate master key or certificate, often held outside the database entirely, in a certificate store, an HSM, or a cloud KMS. That wrapping relationship — a small key protecting the big one — is exactly the pattern the next step generalizes.</p>",
  bullets: [
    "Built into the database engine — SQL Server, Oracle, MySQL/InnoDB, Postgres (via extensions), most managed cloud databases by default (RDS, Azure SQL, Cloud SQL)",
    "Encrypts data files, indexes, and transaction logs on disk at the page/block level — not individual columns",
    "'Transparent' means queries, ORMs, and application code never see ciphertext or touch a key — the engine decrypts on read and re-encrypts on write, entirely inside the storage engine",
    "Two-tier key model: a Database Encryption Key (DEK) does the actual page encryption; the DEK itself is wrapped by a separate master key or certificate — envelope encryption, covered next",
    "A backup or export taken off the database is still ciphertext, not just the live data files",
    "Anyone with a normal, authenticated connection to the running database sees ordinary plaintext rows — TDE doesn't touch access control at all",
  ],
  sequence: {
    actors: REST_ACTORS,
    messages: [
      { from: "app", to: "db", label: "SELECT * FROM accounts WHERE id = 42", note: "an ordinary, unmodified query" },
      { from: "db", to: "kms", label: "Unwrap the Database Encryption Key", note: "done once at startup and cached — not on every query", highlight: true },
      { from: "db", to: "db", label: "Decrypt the page in memory", note: "using the unwrapped DEK, entirely inside the storage engine", highlight: true },
      { from: "db", to: "app", label: "plaintext row", note: "the query never sees ciphertext or touches a key" },
    ],
  },
};
