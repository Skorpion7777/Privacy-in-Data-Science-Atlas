import { clusters } from './clusters';
import { concepts } from './concepts';
import { relationships } from './relationships';
import { chapters } from './chapters';
import { sources } from './sources';
import { Concept, Cluster, Relationship, Chapter, Source, ClusterId } from './types';

export * from './types';
export { clusters, concepts, relationships, chapters, sources };

const conceptMap = new Map<string, Concept>(concepts.map((c) => [c.id, c]));
const clusterMap = new Map<string, Cluster>(clusters.map((c) => [c.id, c]));
const sourceMap = new Map<string, Source>(sources.map((s) => [s.id, s]));
const chapterMap = new Map<string, Chapter>(chapters.map((ch) => [ch.id, ch]));

export function getConceptById(id: string): Concept | undefined {
  return conceptMap.get(id);
}

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getClusterById(id: ClusterId | string): Cluster | undefined {
  return clusterMap.get(id);
}

export function getSourceById(id: string): Source | undefined {
  return sourceMap.get(id);
}

export function getChapterById(id: string): Chapter | undefined {
  return chapterMap.get(id);
}

export function getChapterByNumber(num: number): Chapter | undefined {
  return chapters.find((ch) => ch.number === num);
}

export interface EnrichedRelationship {
  relationship: Relationship;
  relatedConcept: Concept;
  direction: 'incoming' | 'outgoing';
}

export function getRelationshipsForConcept(conceptId: string): {
  incoming: EnrichedRelationship[];
  outgoing: EnrichedRelationship[];
} {
  const incoming: EnrichedRelationship[] = [];
  const outgoing: EnrichedRelationship[] = [];

  for (const rel of relationships) {
    if (rel.targetId === conceptId) {
      const sourceConcept = conceptMap.get(rel.sourceId);
      if (sourceConcept) {
        incoming.push({
          relationship: rel,
          relatedConcept: sourceConcept,
          direction: 'incoming',
        });
      }
    } else if (rel.sourceId === conceptId) {
      const targetConcept = conceptMap.get(rel.targetId);
      if (targetConcept) {
        outgoing.push({
          relationship: rel,
          relatedConcept: targetConcept,
          direction: 'outgoing',
        });
      }
    }
  }

  return { incoming, outgoing };
}
