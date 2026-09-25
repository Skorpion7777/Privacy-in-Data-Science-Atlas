# The Privacy Atlas

An interactive, content-first guide to privacy, fairness, and responsible data science. The project turns a corrected university study guide into a visual knowledge atlas and a readable publication. It is **not** a gallery of flashcards: no photographs, scans, transcriptions, or original-card comparisons appear on the site.

## The idea

Readers can explore concepts and their relationships in a curated knowledge graph, follow a chapter-based learning path, or open individual concepts for definitions, examples, limitations, and sources. The emphasis is on useful distinctions—such as what differential privacy does *not* guarantee—and on connections between technical, legal, and ethical ideas.

## Core experiences

- **Atlas:** A searchable, topic-first overview. Each theme starts with a short selection of concepts and can expand to the full list. An optional focused React Flow map shows a concept's incoming and outgoing relationships, including cross-theme links.
- **Field guide:** Eight chapters with section navigation, previous/next controls, and links to concept explanations. Mobile readers use a compact chapter selector.
- **Concept explorer:** Shareable explanations with examples, caveats, labeled relationships, a back trail, sources, and a link to read the chapter in context.
- **Search and saved concepts:** Client-side discovery across concepts and chapters, with bookmarks stored in the browser. Press `/` or Ctrl/Cmd+K to search, and Escape to close a dialog.

The editorial source is `privacy_data_science_corrected_study_guide.txt` in the project root. `src/content/guide.ts` parses it at build time through Vite's raw import, and `src/content/chapters.ts` supplies chapter metadata. The reading text stays synchronized with the editorial source. Concept summaries and relationship labels are curated in `src/content/concepts.ts` and `src/content/relationships.ts`; review those when changing the source's meaning. `sectionConcepts` links each concept to its corresponding reading section.

## Design and technology

The design uses warm off-white backgrounds, white reading surfaces, deep green accents, serif headings, and restrained translucent panels. Themes have distinct, readable accent colors. Responsive layouts, visible keyboard focus, native modal focus management, and reduced-motion support are built in.

The stack is **React + TypeScript + Vite**, with **React Flow (`@xyflow/react`)** for the atlas. Concepts, chapters, relationships, and references live in local, typed content files. The site is static: no backend, database, login, API key, or runtime AI service is needed.

## Local development

```sh
npm ci
npm run dev
npm test
npm run build
```

The development server defaults to `http://localhost:3000`. `npm run preview` serves the production build. Tests cover content references, graph relationships, search, and publication alignment with the editorial text.

## Deployment

The site is configured for **GitHub Pages**, built and deployed by GitHub Actions. Vite defaults to the relative base `./`, supporting both a project site (`USERNAME.github.io/REPOSITORY/`) and a user site (`USERNAME.github.io/`). Set `VITE_BASE_PATH` to override it. Navigation uses query parameters so concept and chapter links work on a static host without rewrite rules.

## Project principles

1. **Accuracy before spectacle:** No fabricated citations or oversimplified legal and technical guarantees.
2. **Readable as well as explorable:** The graph complements, rather than replaces, a good reading experience.
3. **Meaningful relationships:** Connections should explain dependencies, tensions, examples, and limits.
4. **Content only:** No card imagery or archival interface.
5. **Static and maintainable:** Easy to edit, test, and deploy from a GitHub repository.
