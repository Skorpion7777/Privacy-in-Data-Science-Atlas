import { describe, expect, it } from 'vitest';
import { chapters, concepts, getConceptById, sources } from '../content';
import { guideChapters, parseGuide, sectionConcepts } from '../content/guide';
import editorialSource from '../../context/privacy_data_science_corrected_study_guide.txt?raw';

describe('Publication and editorial source alignment', () => {
  it('publishes every numbered subsection and each chapter connection summary', () => {
    const headings = editorialSource.split(/\r?\n/).filter((line) => /^\d+\.\d+ /.test(line));
    const publishedHeadings = chapters.flatMap((chapter) => chapter.sections.map((section) => section.title));
    for (const heading of headings) expect(publishedHeadings).toContain(heading);
    expect(publishedHeadings.filter((heading) => heading === 'Connections')).toHaveLength(7);
    expect(publishedHeadings).toContain('How the ideas fit together');
  });

  it('keeps the decision checklist together without treating numbered questions as new chapters', () => {
    const final = chapters[7];
    expect(chapters.slice(0, 8).map((chapter) => chapter.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(final.sections.map((section) => section.id)).toEqual(['ch8-framework', 'ch8-example', 'ch8-connections']);
    const checklist = final.sections[0].paragraphs.join('\n');
    expect(checklist).toContain('1. Purpose:');
    expect(checklist).toContain('7. Deployment:');
    expect(final.sections[1].paragraphs[0]).toContain('A retailer forecasts demand');
  });

  it('retains paragraph text exactly and does not publish the source key as chapter prose', () => {
    for (const chapter of chapters.slice(0, 8)) {
      for (const section of chapter.sections) {
        for (const paragraph of section.paragraphs) {
          expect(editorialSource.replace(/\r\n/g, '\n')).toContain(paragraph);
          expect(paragraph).not.toContain('SOURCE KEY');
        }
      }
    }
    expect(parseGuide(editorialSource.replace(/\r?\n/g, '\r\n'))).toEqual(guideChapters.slice(0, 8));
  });

  it('links every concept to a real section in its chapter', () => {
    for (const concept of concepts) {
      const chapter = chapters.find((item) => item.id === concept.chapterId)!;
      expect(chapter.sections.some((section) => section.highlightConceptIds?.includes(concept.id)), concept.id).toBe(true);
    }
    const sectionIds = new Set(chapters.flatMap((chapter) => chapter.sections.map((section) => section.id)));
    for (const [sectionId, ids] of Object.entries(sectionConcepts)) {
      expect(sectionIds.has(sectionId)).toBe(true);
      for (const id of ids) expect(getConceptById(id)).toBeDefined();
    }
  });

  it('resolves every inline reference and removes old editorial provenance from concept prose', () => {
    const sourceIds = new Set(sources.map((source) => source.id));
    for (const chapter of chapters) {
      for (const reference of JSON.stringify(chapter.sections).matchAll(/\[(S\d+)\]/g)) expect(sourceIds.has(reference[1])).toBe(true);
    }
    expect(JSON.stringify(concepts)).not.toMatch(/flashcard|original card|The note’s/);
    const chaptersJson = JSON.stringify(chapters);
    expect(chaptersJson).not.toMatch(/\[web:\d+\]/);
    expect(chaptersJson).not.toMatch(/Coverage of the original cards/i);
    expect(chaptersJson).not.toMatch(/flashcard|original card/i);
  });
});
