import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Check, ExternalLink, Link, X } from 'lucide-react';
import { getChapterById, getClusterById, getConceptById, getRelationshipsForConcept, getSourceById } from '../../content';
import { useDialog } from '../../hooks/useDialog';
import { EditorialText } from '../EditorialText';

interface ConceptDetailProps {
  conceptId: string;
  onClose: () => void;
  onSelectConcept: (id: string) => void;
  onOpenChapter: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ConceptDetail: React.FC<ConceptDetailProps> = ({ conceptId, onClose, onSelectConcept, onOpenChapter, isBookmarked, onToggleBookmark }) => {
  const dialogRef = useDialog(true, onClose);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [trail, setTrail] = useState<string[]>([conceptId]);
  const [shareStatus, setShareStatus] = useState('');
  const concept = getConceptById(conceptId);
  const cluster = concept && getClusterById(concept.clusterId);
  const chapter = concept && getChapterById(concept.chapterId);
  const connections = getRelationshipsForConcept(conceptId);
  const related = [...connections.outgoing, ...connections.incoming];

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
    setShareStatus('');
    setTrail((items) => {
      const index = items.indexOf(conceptId);
      return index >= 0 ? items.slice(0, index + 1) : [...items, conceptId];
    });
  }, [conceptId]);

  const follow = (id: string) => {
    onSelectConcept(id);
  };
  const goBack = () => {
    const previous = trail[trail.length - 2];
    if (previous) {
      onSelectConcept(previous);
    }
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('Link copied');
    } catch {
      setShareStatus('Copy the address from your browser to share this concept.');
    }
  };

  return (
    <dialog ref={dialogRef} className="concept-dialog" aria-labelledby="concept-detail-title" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="concept-dialog-inner">
        <header className="dialog-toolbar">
          <span className="eyebrow">Concept explorer</span>
          <div className="dialog-actions">
            {concept && <>
              <button type="button" className="tool-button" onClick={() => onToggleBookmark(concept.id)} aria-pressed={isBookmarked} aria-label={isBookmarked ? 'Remove from saved concepts' : 'Save concept'}>
                <Bookmark size={17} fill={isBookmarked ? 'currentColor' : 'none'} /> <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
              <button type="button" className="tool-button" onClick={share} aria-label="Copy concept link">
                {shareStatus === 'Link copied' ? <Check size={17} /> : <Link size={17} />} <span>Share</span>
              </button>
            </>}
            <button type="button" className="tool-button" onClick={onClose} aria-label="Close concept view"><X size={20} /></button>
          </div>
        </header>
        <div ref={bodyRef} className="concept-dialog-body">
          {trail.length > 1 && <button type="button" className="text-button trail-back" onClick={goBack}><ArrowLeft size={16} /> Back to {getConceptById(trail[trail.length - 2])?.title}</button>}
          {concept ? <>
            <span className="badge" style={{ color: cluster?.color, background: cluster?.accentBg, borderColor: cluster?.borderColor }}>{cluster?.name}</span>
            <h2 ref={titleRef} tabIndex={-1} id="concept-detail-title" className="editorial-title">{concept.title}</h2>
            <p className="concept-lead">{concept.conciseDefinition}</p>
            {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
            <nav className="concept-jump-links" aria-label="On this concept">
              <a href="#concept-explanation">Explanation</a>
              <a href="#concept-connections">Connections ({related.length})</a>
              <a href="#concept-sources">Sources</a>
            </nav>
            <section id="concept-explanation">
               <h3>The idea</h3><EditorialText paragraphs={concept.expandedExplanation.split(/\n\s*\n/)} />
               <h3>Why it matters</h3><EditorialText paragraphs={[concept.whyItMatters]} />
             </section>
             {concept.example && <section className="concept-example"><h3>In practice</h3><EditorialText paragraphs={[concept.example]} /></section>}
             {concept.limitationsOrMisconceptions && <section className="callout-box callout-important"><h3>Keep in mind</h3><EditorialText paragraphs={[concept.limitationsOrMisconceptions]} /></section>}
            <section id="concept-connections">
              <div className="section-heading"><div><h3>Follow the connections</h3><p>Each link explains how the ideas connect.</p></div></div>
              <div className="connection-list">
                {related.map(({ relationship, relatedConcept, direction }) => (
                  <button type="button" key={relationship.id} className="connection-card" onClick={() => follow(relatedConcept.id)}>
                    <span className="connection-claim">
                      <strong>{direction === 'outgoing' ? concept.title : relatedConcept.title}</strong>
                      <span className="relationship-label">{relationship.label}</span>
                      <strong>{direction === 'outgoing' ? relatedConcept.title : concept.title}</strong>
                    </span>
                    <span className="connection-note">{relationship.shortNote}</span>
                    <span className="connection-follow">Explore {relatedConcept.title} <ArrowRight size={14} /></span>
                  </button>
                ))}
                {!related.length && <p>No direct connections mapped yet. Continue with the chapter below.</p>}
              </div>
            </section>
            {chapter && <button type="button" className="chapter-context-link" onClick={() => onOpenChapter(chapter.id)}>
              <BookOpen size={21} /><span><small>Read in context · Chapter {chapter.number}</small><strong>{chapter.title}</strong></span><ArrowRight size={18} />
            </button>}
            <section id="concept-sources">
              <h3>Sources & further reading</h3>
              <div className="source-links">
                {concept.sourceIds.map((id) => {
                  const source = getSourceById(id);
                  return source ? <a key={id} href={source.url || '?view=guide&chapter=ch9'} target={source.url ? '_blank' : undefined} rel={source.url ? 'noreferrer' : undefined}>[{id}] {source.title} {source.url && <ExternalLink size={13} aria-label="opens in a new tab" />}</a> : null;
                })}
              </div>
            </section>
          </> : <>
            <h2 id="concept-detail-title" ref={titleRef} tabIndex={-1}>Concept not found</h2>
            <p>This link does not point to a concept in the atlas.</p>
            <button type="button" className="button-primary" onClick={onClose}>Return to browsing</button>
          </>}
        </div>
      </div>
    </dialog>
  );
};
