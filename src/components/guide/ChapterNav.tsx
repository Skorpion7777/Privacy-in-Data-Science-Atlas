import React from 'react';
import { Chapter } from '../../content/types';
import { chapters } from '../../content';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

interface ChapterNavProps {
  currentChapter: Chapter;
  onNavigateChapter: (chapterId: string) => void;
  onNavigateToAtlas: () => void;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  currentChapter,
  onNavigateChapter,
  onNavigateToAtlas,
}) => {
  const currentIndex = chapters.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <nav
      style={{
        maxWidth: '780px',
        margin: '2rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
      aria-label="Chapter navigation"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
        {prevChapter ? (
          <button
            onClick={() => onNavigateChapter(prevChapter.id)}
            className="glass-card"
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.25rem',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              <ArrowLeft size={13} />
              <span>Previous Chapter {prevChapter.number}</span>
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {prevChapter.title}
            </div>
          </button>
        ) : <div />}

        {nextChapter ? (
          <button
            onClick={() => onNavigateChapter(nextChapter.id)}
            className="glass-card"
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem',
              textAlign: 'right',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              <span>Next Chapter {nextChapter.number}</span>
              <ArrowRight size={13} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {nextChapter.title}
            </div>
          </button>
        ) : <div />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
        <button
          onClick={onNavigateToAtlas}
          className="glass-card"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            color: 'var(--text-accent)',
          }}
        >
          <Compass size={15} />
            <span>Explore the atlas</span>
        </button>
      </div>
    </nav>
  );
};
