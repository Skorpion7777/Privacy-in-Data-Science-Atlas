export type ClusterId =
  | 'foundations-of-privacy'
  | 'gdpr-data-governance'
  | 'differential-privacy'
  | 'transparency-explanation'
  | 'responsibility-dual-use'
  | 'bias-measurement'
  | 'fairness-justice'
  | 'high-stakes-applications'
  | 'ethical-reasoning'
  | 'ethical-frameworks'
  | 'decision-making'
  | 'influence-and-nudging'
  | 'threat-modeling';

export interface Cluster {
  id: ClusterId;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accentBg: string;
  borderColor: string;
  centerPos: { x: number; y: number };
}

export type RelationshipType =
  | 'is-a-type-of'
  | 'protects'
  | 'depends-on'
  | 'can-conflict-with'
  | 'is-governed-by'
  | 'governs'
  | 'can-create'
  | 'does-not-guarantee'
  | 'is-often-confused-with'
  | 'is-an-example-of'
  | 'supports'
  | 'limits-disclosure-from'
  | 'differs-from'
  | 'can-distort'
  | 'complicates';

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  label: string;
  shortNote?: string;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  clusterId: ClusterId;
  conciseDefinition: string;
  expandedExplanation: string;
  whyItMatters: string;
  example?: string;
  limitationsOrMisconceptions?: string;
  keywords: string[];
  sourceIds: string[];
  chapterId: string;
  position: { x: number; y: number };
}

export interface ChapterSection {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: {
    type: 'distinction' | 'important' | 'warning' | 'note';
    title: string;
    text: string;
  };
  highlightConceptIds?: string[];
}

export interface Chapter {
  id: string;
  number: number;
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  clusterId: ClusterId;
  sections: ChapterSection[];
  conceptIds: string[];
}

export interface Source {
  id: string;
  title: string;
  authorOrInstitution: string;
  url: string;
  contextualNote: string;
}
