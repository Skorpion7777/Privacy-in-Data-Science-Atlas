import { BookOpen, Clock } from 'lucide-react';
import { Chapter, getConceptById } from '../../content';
import { EditorialText } from './EditorialText';

interface ChapterContentProps {
  chapter: Chapter;
  onSelectConcept: (id: string) => void;
  onNavigateToAtlasWithCluster: (id: string) => void;
}

export const ChapterContent = ({ chapter, onSelectConcept, onNavigateToAtlasWithCluster }: ChapterContentProps) => (
  <article className="guide-article">
    <header className="guide-chapter-header">
      <div className="guide-chapter-meta"><span className="eyebrow">Field guide · Chapter {chapter.number} of 8</span><span><Clock size={14} /> {chapter.estimatedMinutes} min read</span></div>
      <h1 className="editorial-title">{chapter.title}</h1>
      <p className="guide-summary">{chapter.summary}</p>
      {chapter.number !== 8 && <button className="text-button" type="button" onClick={() => onNavigateToAtlasWithCluster(chapter.clusterId)}><BookOpen size={16} /> Browse this theme in the atlas →</button>}
    </header>
    <nav className="on-this-page" aria-label="On this page">
      <p className="eyebrow">In this chapter</p>
      {chapter.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
    </nav>
    {chapter.sections.map((section) => <section key={section.id} id={section.id} className="guide-section">
      <h2 className="editorial-title">{section.title}</h2>
      <EditorialText paragraphs={section.paragraphs} />
      {!!section.highlightConceptIds?.length && <div className="guide-concept-links">
        <span>Explore further</span>
        {section.highlightConceptIds.map((id) => { const concept = getConceptById(id); return concept ? <button key={id} type="button" onClick={() => onSelectConcept(id)}>{concept.title} →</button> : null; })}
      </div>}
    </section>)}
  </article>
);
