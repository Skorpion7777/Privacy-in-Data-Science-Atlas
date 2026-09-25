import { concepts, chapters, clusters, Concept, Chapter } from '../content';

export interface SearchResult {
  type: 'concept' | 'chapter';
  id: string;
  title: string;
  subtitle: string;
  snippet: string;
  score: number;
  item: Concept | Chapter;
}

export interface GroupedSearchResults {
  concepts: SearchResult[];
  chapters: SearchResult[];
  totalMatches: number;
}

function cleanText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function searchAtlas(query: string): GroupedSearchResults {
  const q = cleanText(query.trim());
  if (!q) {
    return { concepts: [], chapters: [], totalMatches: 0 };
  }

  const terms = q.split(/\s+/).filter((t) => t.length > 0);

  const conceptResults: SearchResult[] = [];
  const chapterResults: SearchResult[] = [];

  // Search Concepts
  for (const c of concepts) {
    const cluster = clusters.find((cl) => cl.id === c.clusterId);
    const clusterName = cluster ? cluster.name : '';

    const titleNorm = cleanText(c.title);
    const defNorm = cleanText(c.conciseDefinition);
    const expNorm = cleanText(c.expandedExplanation);
    const whyNorm = cleanText(c.whyItMatters);
    const limitsNorm = cleanText(c.limitationsOrMisconceptions || '');
    const keywordsNorm = c.keywords.map(cleanText).join(' ');
    const clusterNorm = cleanText(clusterName);

    let score = 0;
    let snippet = c.conciseDefinition;

    // Check query as a whole
    if (titleNorm === q) score += 120;
    else if (titleNorm.includes(q)) score += 60;
    else if (keywordsNorm.includes(q)) score += 40;
    else if (defNorm.includes(q)) score += 30;

    // Check individual terms
    for (const term of terms) {
      if (titleNorm.includes(term)) score += 25;
      if (keywordsNorm.includes(term)) score += 15;
      if (defNorm.includes(term)) score += 10;
      if (whyNorm.includes(term)) score += 5;
      if (limitsNorm.includes(term)) score += 5;
      if (expNorm.includes(term)) score += 3;
      if (clusterNorm.includes(term)) score += 5;
    }

    if (score > 0) {
      // Find a good snippet containing one of the terms if possible
      for (const term of terms) {
        const idx = expNorm.indexOf(term);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(c.expandedExplanation.length, idx + term.length + 80);
          snippet = (start > 0 ? '…' : '') + c.expandedExplanation.slice(start, end) + (end < c.expandedExplanation.length ? '…' : '');
          break;
        }
      }

      conceptResults.push({
        type: 'concept',
        id: c.id,
        title: c.title,
        subtitle: clusterName,
        snippet,
        score,
        item: c,
      });
    }
  }

  // Search Chapters
  for (const ch of chapters) {
    const titleNorm = cleanText(ch.title);
    const summaryNorm = cleanText(ch.summary);
    const sectionsText = ch.sections.map((s) => s.title + ' ' + s.paragraphs.join(' ')).join(' ');
    const secNorm = cleanText(sectionsText);

    let score = 0;
    let snippet = ch.summary;

    if (titleNorm.includes(q)) score += 80;
    if (summaryNorm.includes(q)) score += 35;

    for (const term of terms) {
      if (titleNorm.includes(term)) score += 20;
      if (summaryNorm.includes(term)) score += 10;
      if (secNorm.includes(term)) score += 5;
    }

    if (score > 0) {
      for (const term of terms) {
        const idx = secNorm.indexOf(term);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(sectionsText.length, idx + term.length + 80);
          snippet = (start > 0 ? '…' : '') + sectionsText.slice(start, end) + (end < sectionsText.length ? '…' : '');
          break;
        }
      }

      chapterResults.push({
        type: 'chapter',
        id: ch.id,
        title: `Chapter ${ch.number}: ${ch.title}`,
        subtitle: `${ch.estimatedMinutes} min read`,
        snippet,
        score,
        item: ch,
      });
    }
  }

  conceptResults.sort((a, b) => b.score - a.score);
  chapterResults.sort((a, b) => b.score - a.score);

  return {
    concepts: conceptResults,
    chapters: chapterResults,
    totalMatches: conceptResults.length + chapterResults.length,
  };
}
