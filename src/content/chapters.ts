import { Chapter, ClusterId } from './types';
import { guideChapters, sectionConcepts } from './guide';

const metadata: { title: string; slug: string; clusterId: ClusterId; summary: string }[] = [
  { title: 'Why privacy matters', slug: 'why-privacy-matters', clusterId: 'foundations-of-privacy', summary: 'Start with personal boundaries, meaningful choice, and the contexts that make sharing appropriate.' },
  { title: 'Data protection law and practice', slug: 'data-protection-law-and-practice', clusterId: 'gdpr-data-governance', summary: 'Understand personal data, GDPR duties, automated decisions, and what these mean for system design.' },
  { title: 'Differential privacy', slug: 'differential-privacy', clusterId: 'differential-privacy', summary: 'Learn what the mathematical guarantee protects, how its parameters work, and where its limits lie.' },
  { title: 'Explanation, transparency, and accountability', slug: 'explanation-transparency-accountability', clusterId: 'transparency-explanation', summary: 'Distinguish understanding a model from explaining a decision and justifying its use.' },
  { title: 'Responsibility, foreseeability, and dual use', slug: 'responsibility-foreseeability-dual-use', clusterId: 'responsibility-dual-use', summary: 'Consider who should anticipate harm, who can act, and who must respond when something goes wrong.' },
  { title: 'Bias, fairness, and justice', slug: 'bias-fairness-and-justice', clusterId: 'fairness-justice', summary: 'Trace bias through data and decisions, compare fairness ideals, and examine the limits of metrics.' },
  { title: 'High-stakes applications', slug: 'high-stakes-applications', clusterId: 'high-stakes-applications', summary: 'Bring the ideas together in medicine and predictive policing, where decisions can change lives.' },
  { title: 'A practical decision framework', slug: 'practical-decision-framework', clusterId: 'responsibility-dual-use', summary: 'Use seven questions to connect purpose, data, rights, privacy, evaluation, oversight, and deployment.' },
];

export const chapters: Chapter[] = guideChapters.map((chapter, index) => {
  const sections = chapter.sections.map((section) => ({ ...section, highlightConceptIds: sectionConcepts[section.id] ?? [] }));
  const words = sections.reduce((sum, section) => sum + section.paragraphs.join(' ').split(/\s+/).length, 0);
  return {
    ...metadata[index],
    id: `ch${chapter.number}`,
    number: chapter.number,
    estimatedMinutes: Math.max(1, Math.ceil(words / 200)),
    sections,
    conceptIds: sections.flatMap((section) => section.highlightConceptIds),
  };
});
