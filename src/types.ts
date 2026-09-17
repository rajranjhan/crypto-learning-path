export interface Annotation {
  offset: number;
  length: number;
  label: string;
  description: string;
  colorClass: string;
}

export interface Callout {
  type?: "key-idea" | "security-warning" | "dont-confuse" | "real-world" | "under-the-hood" | "legacy";
  requirementId: string;
  title: string;
  body: string;
}

export interface Figure {
  body: string;
  caption?: string;
  variant?: "default" | "wide" | "compact";
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface CheckYourUnderstanding {
  question: string;
  answer?: string;
}

export interface ProtocolProgress {
  goal?: string;
  already?: string[];
  now: string;
  next?: string;
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
  role?: "client" | "server" | "trusted" | "warning" | "attacker" | "neutral" | "encrypted" | "public";
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
  progress?: ProtocolProgress;
}

export interface WireContext {
  where: string;
  now: string;
  why: string;
}

export interface Step {
  id: string;
  title: string;
  /**
   * The raw record bytes for a wire walkthrough. Optional: concept steps that
   * explain an idea (rather than dissect a packet) omit bytes and annotations
   * and instead render prose, bullets, and an optional figure.
   */
  bytes?: number[];
  annotations?: Annotation[];
  /** Authored HTML: one or more `<p>` paragraphs, `<strong>` for emphasis. */
  prose: string;
  /** Optional short bullet points summarizing what the message contains/does. */
  bullets?: string[];
  /** One concise security or protocol consequence to remember from this step. */
  takeaway: string;
  figure?: Figure;
  /** Optional annotated JWT/JSON/HTTP block with hover-linked, per-line annotations. */
  textBlock?: TextBlock;
  /** Optional sequence diagram (actors + ordered messages). */
  sequence?: Sequence;
  protocolProgress?: ProtocolProgress;
  /** Brief orientation before bytes, annotated text, or a protocol sequence. */
  wireContext?: WireContext;
  glossary?: GlossaryTerm[];
  callouts?: Callout[];
  /**
   * Ids of other steps in the same lesson (e.g. concrete examples) to nest
   * under this one in the sidebar, indented beneath it. Referenced steps
   * still appear in `Lesson.steps` at their natural position — routing, the
   * stepper, and step numbering are unaffected; this only changes how the
   * sidebar groups them visually.
   */
  subSteps?: string[];
  /**
   * Short label shown as a small heading in the sidebar directly above this
   * step, when rendered as a nested sub-step (see `subSteps`) and its group
   * differs from the previous sibling's — e.g. separating "Classical
   * Ciphers" from "Modern Symmetric Ciphers" within Symmetric Encryption's
   * sub-steps. Has no effect on a step rendered at the top level.
   */
  sidebarGroup?: string;
}

export interface Lesson {
  slug: string;
  title: string;
  status: "available" | "coming-soon";
  summary: string;
  whyItMatters: string;
  objectives: string[];
  prerequisites?: string[];
  keyTakeaways: string[];
  estimatedMinutes?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  lessonType?: "concept" | "protocol" | "application";
  references?: { title: string; url: string }[];
  checkYourUnderstanding?: CheckYourUnderstanding[];
  transitionToNext?: string;
  steps: Step[];
  figure?: Figure;
}

export interface RegistryEntry {
  slug: string;
  title: string;
  shortTitle?: string;
  status: "available" | "coming-soon";
  /** Optional group name (e.g. "OAuth"). Entries sharing a category nest under one collapsible header in the sidebar. */
  category?: string;
}
