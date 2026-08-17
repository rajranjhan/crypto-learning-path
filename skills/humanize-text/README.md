# humanize-text

A Claude skill that removes signs of AI-generated writing from text so it reads as natural and human-written.

## What it does

Given text (pasted, in a file, or produced by another task), the skill scans for the common tells of AI-generated prose and rewrites to remove them while preserving every fact in the original. It covers 33 documented patterns across content, grammar, style, communication, and hedging — including inflated significance, promotional language, superficial "-ing" analyses, vague attributions, rule-of-three padding, AI vocabulary, passive voice, em/en dash overuse, and filler phrases. It also includes detection guidance so it doesn't over-edit genuine human writing.

## When it triggers

Ask it to "humanize", "de-slop", or "de-AI" text; to make writing "sound less like ChatGPT" or "more human"; to edit or review prose for AI tells; or paste text and ask why it reads as AI-generated.

## Usage

- **Pasted text (default):** provide the text in the conversation. Returns a draft, brief "still-AI" audit notes, and the final rewrite.
- **File mode:** point it at a file. It rewrites the prose in place (leaving code, frontmatter, data, and links untouched) and reports a summary of what changed.
- **Embedded mode:** when another task uses it as one step (a PR description, commit message, or doc), it returns only the final text.

If you provide a sample of your own past writing, the skill calibrates to your voice instead of applying its default style rules.

## Files

- `SKILL.md` — the skill definition and full pattern guide.

## Credit

Adapted near-verbatim from [github.com/blader/humanizer](https://github.com/blader/humanizer), which is based on [Wikipedia's "Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) guide maintained by WikiProject AI Cleanup.
