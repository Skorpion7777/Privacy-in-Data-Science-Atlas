import { describe, it, expect } from 'vitest';
import {
  concepts,
  clusters,
  relationships,
  chapters,
  sources,
  getConceptById,
  getClusterById,
  getSourceById,
  getChapterById,
} from '../content';

describe('Content Integrity & Referential Completeness', () => {
  it('should have all 8 defined clusters', () => {
    expect(clusters.length).toBe(8);
    const expectedClusters = [
      'foundations-of-privacy',
      'gdpr-data-governance',
      'differential-privacy',
      'transparency-explanation',
      'responsibility-dual-use',
      'bias-measurement',
      'fairness-justice',
      'high-stakes-applications',
    ];
    const actualClusterIds = clusters.map((c) => c.id);
    expect(actualClusterIds).toEqual(expect.arrayContaining(expectedClusters));
  });

  it('should have 30+ substantive concepts with unique IDs and slugs', () => {
    expect(concepts.length).toBeGreaterThanOrEqual(30);

    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const concept of concepts) {
      expect(ids.has(concept.id), `Duplicate concept id: ${concept.id}`).toBe(false);
      expect(slugs.has(concept.slug), `Duplicate concept slug: ${concept.slug}`).toBe(false);
      ids.add(concept.id);
      slugs.add(concept.slug);

      // Verify fields are not empty
      expect(concept.title.trim().length).toBeGreaterThan(0);
      expect(concept.conciseDefinition.trim().length).toBeGreaterThan(15);
      expect(concept.expandedExplanation.trim().length).toBeGreaterThan(40);
      expect(concept.whyItMatters.trim().length).toBeGreaterThan(20);

      // Verify valid cluster
      const cluster = getClusterById(concept.clusterId);
      expect(cluster, `Invalid clusterId ${concept.clusterId} for concept ${concept.id}`).toBeDefined();

      // Verify sources
      expect(concept.sourceIds.length, `Concept ${concept.id} has no sourceIds`).toBeGreaterThan(0);
      for (const sId of concept.sourceIds) {
        const source = getSourceById(sId);
        expect(source, `Source ${sId} in concept ${concept.id} does not exist`).toBeDefined();
      }

      // Verify chapter reference
      const chapter = getChapterById(concept.chapterId);
      expect(chapter, `Chapter ${concept.chapterId} in concept ${concept.id} does not exist`).toBeDefined();
    }
  });

  it('should have valid relationships with real source and target concepts', () => {
    expect(relationships.length).toBeGreaterThanOrEqual(30);

    const relIds = new Set<string>();

    for (const rel of relationships) {
      expect(relIds.has(rel.id), `Duplicate relationship ID: ${rel.id}`).toBe(false);
      relIds.add(rel.id);

      const source = getConceptById(rel.sourceId);
      const target = getConceptById(rel.targetId);

      expect(source, `Relationship ${rel.id} has invalid sourceId: ${rel.sourceId}`).toBeDefined();
      expect(target, `Relationship ${rel.id} has invalid targetId: ${rel.targetId}`).toBeDefined();
      expect(rel.sourceId, `Relationship ${rel.id} is a self-loop`).not.toBe(rel.targetId);
      expect(rel.label.trim().length).toBeGreaterThan(0);
    }
  });

  it('should have 8 ordered chapters matching the study guide structure', () => {
    expect(chapters.length).toBe(8);

    for (let i = 0; i < 8; i++) {
      const ch = chapters[i];
      expect(ch.number).toBe(i + 1);
      expect(ch.sections.length).toBeGreaterThan(0);

      for (const conceptId of ch.conceptIds) {
        const concept = getConceptById(conceptId);
        expect(concept, `Chapter ${ch.id} references non-existent concept: ${conceptId}`).toBeDefined();
      }
    }
  });

  it('should contain all 11 authoritative sources [S1] to [S11]', () => {
    expect(sources.length).toBe(11);
    for (let i = 1; i <= 11; i++) {
      const id = `S${i}`;
      const src = getSourceById(id);
      expect(src, `Source ${id} is missing`).toBeDefined();
      expect(src?.url.startsWith('https://')).toBe(true);
    }
  });
});
