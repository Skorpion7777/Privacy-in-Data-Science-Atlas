import guideText from '../../privacy_data_science_corrected_study_guide.txt?raw';
import { ChapterSection } from './types';

export interface GuideChapter {
  number: number;
  sections: ChapterSection[];
}

// The publication is derived from the editorial file, so edits do not drift
// between the reading experience and a second hand-copied version.
export function parseGuide(text: string): GuideChapter[] {
  const chapters: GuideChapter[] = [];
  let chapter: GuideChapter | undefined;
  let section: ChapterSection | undefined;
  let lines: string[] = [];

  const flush = () => {
    if (section && lines.length) {
      section.paragraphs = lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean);
    }
    lines = [];
  };

  for (const rawLine of text.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (line === 'SOURCE KEY') { flush(); break; }
    if (/^=+$/.test(line)) continue;
    const chapterMatch = line.match(/^([1-8])\. ([A-Z][A-Z ,.-]+)$/);
    if (chapterMatch) {
      flush();
      chapter = { number: Number(chapterMatch[1]), sections: [] };
      chapters.push(chapter);
      section = undefined;
      continue;
    }
    if (!chapter) continue;
    const sectionMatch = line.match(/^(\d+\.\d+) (.+)$/);
    const isConnections = line === 'Connections' || line === 'How the ideas fit together';
    const isExample = chapter.number === 8 && line.startsWith('Example:');
    if (sectionMatch || isConnections || isExample) {
      flush();
      section = {
        id: sectionMatch ? `section-${sectionMatch[1].replace('.', '-')}` : `ch${chapter.number}-${isExample ? 'example' : 'connections'}`,
        title: sectionMatch ? line : isExample ? 'A worked example' : line,
        paragraphs: [],
      };
      chapter.sections.push(section);
      if (isExample) lines.push(line);
    } else if (line || lines.length) {
      if (!section) {
        section = { id: `ch${chapter.number}-framework`, title: 'Seven questions for a project', paragraphs: [] };
        chapter.sections.push(section);
      }
      lines.push(line);
    }
  }
  return chapters;
}

export const guideChapters = parseGuide(guideText);

// Explicit links from publication sections to concept explanations.
export const sectionConcepts: Record<string, string[]> = {
  'section-1-1': ['spatial-privacy', 'informational-privacy', 'decisional-privacy'],
  'section-1-2': ['access-account', 'control-account'],
  'section-1-3': ['contextual-integrity'],
  'section-1-4': ['chilling-effect'],
  'section-1-5': ['information-asymmetry'],
  'section-2-1': ['personal-data', 'anonymity-vs-pseudonymity'],
  'section-2-2': ['gdpr-baseline-principles', 'legal-bases-article-6-9'],
  'section-2-3': ['informing-people-articles-12-14'],
  'section-2-4': ['automated-decisions-article-22', 'cjeu-dun-and-bradstreet'],
  'section-2-5': ['engineering-governance-dpia'],
  'section-2-6': ['law-enforcement-caveat'],
  'section-3-1': ['differential-privacy'],
  'section-3-2': ['dp-limits-and-interpretation'],
  'section-3-3': ['epsilon-and-delta', 'composition-and-sensitivity', 'central-vs-local-dp'],
  'section-3-4': ['raw-data-security'],
  'section-4-1': ['transparency', 'interpretability', 'explainability', 'justifiability', 'epistemic-accessibility'],
  'section-4-3': ['fat-fact-fast-acronyms'],
  'section-5-1': ['forward-looking-responsibility', 'backward-looking-responsibility', 'active-vs-passive-responsibility'],
  'section-5-2': ['conditions-for-moral-blame'],
  'section-5-3': ['dual-use-technology'],
  'section-5-4': ['precaution-and-dilemma-of-control'],
  'section-5-5': ['problem-of-many-hands'],
  'section-6-1': ['statistical-vs-social-bias', 'sampling-selection-bias', 'label-measurement-bias', 'algorithmic-optimization-bias', 'interaction-bias-and-feedback-loops'],
  'section-6-2': ['normative-ideals'],
  'section-6-3': ['rawls-justice-as-fairness'],
  'section-6-4': ['group-and-individual-fairness', 'fairness-impossibility'],
  'section-6-5': ['five-sociotechnical-traps'],
  'section-7-1': ['precision-and-predictive-medicine'],
  'section-7-2': ['biomedical-ethics-principles'],
  'section-7-3': ['clinical-trust-and-explainability'],
  'section-7-4': ['predictive-policing', 'policing-oversight-and-ai-act'],
};
