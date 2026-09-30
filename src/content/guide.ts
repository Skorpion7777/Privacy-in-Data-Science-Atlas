import guideText from '../../context/privacy_data_science_corrected_study_guide.txt?raw';
import additionalMaterialsText from '../../context/additional_materials.txt?raw';
import threatModelingText from '../../context/privacy_foundations_and_threat_modeling.txt?raw';
import { ChapterSection } from './types';

export interface GuideChapter {
  number: number;
  sections: ChapterSection[];
}

// 1. Original 8 chapters from privacy_data_science_corrected_study_guide.txt
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
  flush();
  return chapters;
}

// 2. Chapters 9–13 from additional_materials.txt
export function parseAdditionalMaterials(text: string): GuideChapter[] {
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
    if (/^[-=]+$/.test(line)) continue;

    const chapterMatch = line.match(/^([1-5])\. ([A-Z][A-Z ,.-]+)$/);
    if (chapterMatch) {
      flush();
      chapter = { number: Number(chapterMatch[1]) + 8, sections: [] };
      chapters.push(chapter);
      section = undefined;
      continue;
    }
    if (!chapter) continue;

    const sectionMatch = line.match(/^(\d+\.\d+) (.+)$/);
    if (sectionMatch) {
      flush();
      const secNum = sectionMatch[1].split('.')[1];
      section = {
        id: `section-${chapter.number}-${secNum}`,
        title: line,
        paragraphs: [],
      };
      chapter.sections.push(section);
    } else if (line || lines.length) {
      if (section) {
        lines.push(line.replace(/\s*\[web:\d+\]/g, ''));
      }
    }
  }
  flush();
  return chapters;
}

// 3. Chapter 14 from privacy_foundations_and_threat_modeling.txt
export function parseThreatModeling(text: string): GuideChapter {
  const chapter: GuideChapter = { number: 14, sections: [] };
  let section: ChapterSection | undefined;
  let lines: string[] = [];

  const flush = () => {
    if (section && lines.length) {
      section.paragraphs = lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean);
    }
    lines = [];
  };

  const sourceMapping: Record<string, string> = {
    '1': 'S12', '2': 'S13', '3': 'S2', '4': 'S1', '5': 'S15',
    '6': 'S16', '7': 'S4', '8': 'S18', '9': 'S19', '10': 'S20',
    '11': 'S21', '12': 'S22', '13': 'S23', '14': 'S24', '15': 'S25',
  };

  for (const rawLine of text.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('## Sources')) {
      flush();
      break;
    }
    const sectionMatch = line.match(/^## (\d+)\. (.+)$/);
    if (sectionMatch) {
      flush();
      section = {
        id: `section-14-${sectionMatch[1]}`,
        title: `${sectionMatch[1]}. ${sectionMatch[2]}`,
        paragraphs: [],
      };
      chapter.sections.push(section);
    } else if (section && (line || lines.length)) {
      const processedLine = line.replace(/\[([0-9, ]+)\]/g, (_, nums) => {
        const parts = nums.split(',').map((n: string) => n.trim());
        const mapped = parts.map((n: string) => sourceMapping[n] ? `[${sourceMapping[n]}]` : `[${n}]`);
        return mapped.join(' ');
      });
      lines.push(processedLine);
    }
  }
  flush();
  return chapter;
}

export const guideChapters: GuideChapter[] = [
  ...parseGuide(guideText),
  ...parseAdditionalMaterials(additionalMaterialsText),
  parseThreatModeling(threatModelingText),
];

// Explicit links from publication sections to concept explanations.
export const sectionConcepts: Record<string, string[]> = {
  // Chapter 1: Why Privacy Matters
  'section-1-1': ['spatial-privacy', 'informational-privacy', 'decisional-privacy'],
  'section-1-2': ['access-account', 'control-account'],
  'section-1-3': ['contextual-integrity'],
  'section-1-4': ['chilling-effect'],
  'section-1-5': ['information-asymmetry'],

  // Chapter 2: Data Protection Law and Practice
  'section-2-1': ['personal-data', 'anonymity-vs-pseudonymity'],
  'section-2-2': ['gdpr-baseline-principles', 'legal-bases-article-6-9'],
  'section-2-3': ['informing-people-articles-12-14'],
  'section-2-4': ['automated-decisions-article-22', 'cjeu-dun-and-bradstreet'],
  'section-2-5': ['engineering-governance-dpia'],
  'section-2-6': ['law-enforcement-caveat'],

  // Chapter 3: Differential Privacy
  'section-3-1': ['differential-privacy'],
  'section-3-2': ['dp-limits-and-interpretation'],
  'section-3-3': ['epsilon-and-delta', 'composition-and-sensitivity', 'central-vs-local-dp'],
  'section-3-4': ['raw-data-security'],

  // Chapter 4: Explanation, Transparency and Accountability
  'section-4-1': ['transparency', 'interpretability', 'explainability', 'justifiability', 'epistemic-accessibility'],
  'section-4-3': ['fat-fact-fast-acronyms'],

  // Chapter 5: Responsibility, Foreseeability and Dual Use
  'section-5-1': ['forward-looking-responsibility', 'backward-looking-responsibility', 'active-vs-passive-responsibility'],
  'section-5-2': ['conditions-for-moral-blame'],
  'section-5-3': ['dual-use-technology'],
  'section-5-4': ['precaution-and-dilemma-of-control'],
  'section-5-5': ['problem-of-many-hands'],

  // Chapter 6: Bias, Fairness and Justice
  'section-6-1': ['statistical-vs-social-bias', 'sampling-selection-bias', 'label-measurement-bias', 'algorithmic-optimization-bias', 'interaction-bias-and-feedback-loops'],
  'section-6-2': ['normative-ideals'],
  'section-6-3': ['rawls-justice-as-fairness'],
  'section-6-4': ['group-and-individual-fairness', 'fairness-impossibility'],
  'section-6-5': ['five-sociotechnical-traps'],

  // Chapter 7: High-Stakes Applications
  'section-7-1': ['precision-and-predictive-medicine'],
  'section-7-2': ['biomedical-ethics-principles'],
  'section-7-3': ['clinical-trust-and-explainability'],
  'section-7-4': ['predictive-policing', 'policing-oversight-and-ai-act'],

  // Chapter 9: Ethical Reasoning
  'section-9-1': ['ethics-morality-law'],
  'section-9-2': ['reasoning-and-reasons'],
  'section-9-3': ['facts-and-ethical-judgments'],
  'section-9-4': ['moral-intuitions-and-reflective-equilibrium'],
  'section-9-5': ['ethical-dilemmas'],

  // Chapter 10: Ethical Frameworks
  'section-10-1': ['consequentialism'],
  'section-10-2': ['utilitarianism-and-impartiality'],
  'section-10-4': ['deontological-ethics'],
  'section-10-5': ['categorical-imperative'],
  'section-10-6': ['virtue-ethics'],
  'section-10-7': ['social-contract-theories'],
  'section-10-8': ['veil-of-ignorance'],

  // Chapter 11: Human Decision-Making
  'section-11-1': ['bounded-rationality-and-satisficing'],
  'section-11-2': ['dual-process-judgment'],
  'section-11-3': ['heuristics-and-biases'],

  // Chapter 12: Data Systems, Influence and Privacy
  'section-12-3': ['automated-decision-and-guidance-systems'],
  'section-12-4': ['choice-architecture-and-nudging'],
  'section-12-5': ['hypernudging'],
  'section-12-6': ['nudging-critiques'],
  'section-12-7': ['digital-gerrymandering'],
  'section-12-8': ['privacy-self-management'],
  'section-12-9': ['situated-autonomy'],

  // Chapter 13: Responsibility and Project Review
  'section-13-3': ['accountability-for-data-systems'],

  // Chapter 14: Privacy Foundations and Threat Modeling
  'section-14-1': ['security-vs-privacy'],
  'section-14-2': ['data-protection-vs-privacy'],
  'section-14-3': ['privacy-enhancing-technologies'],
  'section-14-6': ['identity-management'],
  'section-14-7': ['threat-modeling-process'],
  'section-14-8': ['stride'],
  'section-14-9': ['repudiation-and-non-repudiation'],
  'section-14-10': ['linddun'],
  'section-14-11': ['linddun'],
  'section-14-12': ['hard-and-soft-privacy'],
  'section-14-13': ['unlinkability-and-anonymity-sets'],
};
