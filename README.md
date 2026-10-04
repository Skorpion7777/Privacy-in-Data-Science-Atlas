# The Privacy Atlas

An interactive knowledge map and guided reader covering privacy, fairness, and responsible data science. The project restructures corrected university study material into an explorable web application with 84 concepts, 80 labeled relationships, 14 chapters, and 24 cited sources.

## Goal

Present a dense academic topic in a way that is genuinely useful — not a flashcard deck, not a slide dump. Readers can follow a linear guide, jump into any concept, or browse the full knowledge graph. Every explanation includes why it matters, an example, common misconceptions, and source references.

## What it does

**Atlas** — A React Flow graph of all 84 concepts grouped into 13 thematic clusters (privacy foundations, GDPR, differential privacy, fairness, ethical reasoning, threat modeling, etc.). Nodes are filterable by cluster. Clicking a concept opens its detail view; edges show labeled relationships like *depends-on*, *can-conflict-with*, or *does-not-guarantee*.

**Guide** — 14 chapters parsed at build time from three curated source texts. Each chapter has section navigation, estimated reading time, and inline links to concept explanations. Chapters cover everything from privacy dimensions and GDPR articles through ethical frameworks, cognitive biases, and STRIDE/LINDDUN threat modeling.

**Concept detail** — Each concept shows a concise definition, expanded explanation with editorial markup (bold, italic, inline citations), the reason it matters, an example, limitations/misconceptions, related concepts, and cited sources.

**Bookmarks** — Concepts can be bookmarked. Persisted to localStorage. Accessible from a dedicated view.

**Sources** — A browsable list of all 24 cited academic papers, regulations, and institutional publications, each with a contextual note explaining how the source is used.

**Search** — Full-text client-side search across concept names, definitions, and explanations. Triggered with `/` or `Ctrl+K`. Results ranked by match quality (name → definition → body).

## Tech stack

| | |
|---|---|
| Framework | React 19, TypeScript |
| Atlas | React Flow (`@xyflow/react`) |
| Build | Vite 6 |
| Tests | Vitest |
| Icons | Lucide React |
| Styling | Plain CSS with design tokens |
| State | URL query parameters for navigation, localStorage for bookmarks |
| Backend | None — fully static |

## Content structure

All content lives in typed TypeScript files under `src/content/`:

- **`concepts.ts`** — 84 concepts, each with definition, explanation, examples, keywords, source references, and a position on the atlas canvas
- **`clusters.ts`** — 13 thematic clusters with colors and layout positions
- **`relationships.ts`** — 80 directed, labeled edges between concepts
- **`sources.ts`** — 24 cited sources (papers, regulations, standards)
- **`guide.ts`** — Parser that reads three raw `.txt` study guides from `context/` and outputs structured chapters and sections at build time
- **`chapters.ts`** — Chapter metadata (titles, slugs, cluster associations, reading-time estimates)

## Navigation

Query-parameter based (`?view=guide&chapter=ch3&concept=differential-privacy`). Supports browser back/forward. Works on static hosts without rewrite rules. Default view is the atlas.

## Tests

Five test suites covering:

- **Content integrity** — every concept has required fields, all relationship endpoints exist, cluster and source references resolve, guide atlas-links point to valid concepts
- **Editorial rendering** — markup parser handles bold, italic, code, citations, headings, and nested markup
- **Guide** — chapters have sections, atlas-links are valid, slugs are unique
- **Navigation** — URL parsing, view switching, edge cases
- **Search** — ranking correctness, case insensitivity

## Running locally

```sh
npm ci
npm run dev     # http://localhost:3000
npm test
npm run build
```

## Deployment

Configured for GitHub Pages via `vite build`. Base path defaults to `./` (works for both project and user sites). Override with `VITE_BASE_PATH` if needed.
