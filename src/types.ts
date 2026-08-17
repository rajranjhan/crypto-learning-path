export interface Annotation {
  offset: number;
  length: number;
  label: string;
  description: string;
  colorClass: string;
}

export interface Callout {
  requirementId: string;
  title: string;
  body: string;
}

/** One annotated line of a JWT/JSON/HTTP block, mirroring the hex annotation model for text. */
export interface TextAnnotation {
  /** Zero-based index into `TextBlock.lines`. */
  line: number;
  label: string;
  description: string;
  colorClass: string;
}

export interface TextBlock {
  /** Purely cosmetic hint for the code block (e.g. "json", "http", "jwt"). */
  lang: string;
  lines: string[];
  annotations: TextAnnotation[];
}

/** A participant in a sequence diagram (fixed column with a vertical lifeline). */
export interface SequenceActor {
  id: string;
  label: string;
  /** Optional glyph shown in the actor's head (e.g. an emoji for app/server). */
  icon?: string;
}

/** One ordered message arrow between two actors in a sequence diagram. */
export interface SequenceMessage {
  from: string;
  to: string;
  label: string;
  /** Optional sub-label rendered under the message (e.g. what it carries). */
  note?: string;
  /** When true, the message is emphasized as the focus of the current step. */
  highlight?: boolean;
}

export interface Sequence {
  actors: SequenceActor[];
  messages: SequenceMessage[];
}

export interface Step {
  id: string;
  title: string;
  /**
   * The raw record bytes for a wire walkthrough. Optional: concept steps that
   * explain an idea (rather than dissect a packet) omit bytes and annotations
   * and instead render prose, bullets, and an optional diagram.
   */
  bytes?: number[];
  annotations?: Annotation[];
  /** Authored HTML: one or more `<p>` paragraphs, `<strong>` for emphasis. */
  prose: string;
  /** Optional short bullet points summarizing what the message contains/does. */
  bullets?: string[];
  /** Optional authored HTML diagram, shown where the hexdump normally sits. */
  diagram?: string;
  /** Optional annotated JWT/JSON/HTTP block with hover-linked, per-line annotations. */
  textBlock?: TextBlock;
  /** Optional sequence diagram (actors + ordered messages). */
  sequence?: Sequence;
  callouts?: Callout[];
}

export interface Lesson {
  slug: string;
  title: string;
  status: "available" | "coming-soon";
  steps: Step[];
  /** Optional overview intro prose. Falls back to the default TLS copy when absent. */
  overview?: string;
  /** Optional authored HTML diagram shown on the overview page, below the intro prose. */
  diagram?: string;
}

export interface RegistryEntry {
  slug: string;
  title: string;
  status: "available" | "coming-soon";
  /** Optional group name (e.g. "OAuth"). Entries sharing a category nest under one collapsible header in the sidebar. */
  category?: string;
}
