import { chapters, getChapterById } from '../../content';
import { ChapterContent } from './ChapterContent';
import { ChapterNav } from './ChapterNav';

interface GuideViewProps {
  currentChapterId: string | null;
  onSelectChapter: (id: string) => void;
  onSelectConcept: (id: string) => void;
  onNavigateToAtlas: () => void;
  onNavigateToAtlasWithCluster: (id: string) => void;
}

export const GuideView = ({ currentChapterId, onSelectChapter, onSelectConcept, onNavigateToAtlas, onNavigateToAtlasWithCluster }: GuideViewProps) => {
  const chapter = getChapterById(currentChapterId || 'ch1') ?? chapters[0];
  return <div className="guide-layout">
    <aside className="guide-sidebar">
      <p className="eyebrow">The reading path</p>
      <p className="guide-sidebar-intro">From personal boundaries to practical decisions.</p>
      <nav aria-label="Field guide chapters">
        {chapters.map((item) => <button key={item.id} className="chapter-nav-item" type="button" aria-current={item.id === chapter.id ? 'page' : undefined} onClick={() => onSelectChapter(item.id)}>
          <span>{String(item.number).padStart(2, '0')}</span><strong>{item.title}</strong>
        </button>)}
      </nav>
      <label className="mobile-chapter-select">Choose a chapter<select value={chapter.id} onChange={(event) => onSelectChapter(event.target.value)}>{chapters.map((item) => <option key={item.id} value={item.id}>{item.number}. {item.title}</option>)}</select></label>
    </aside>
    <div className="guide-reading-surface">
      <ChapterContent chapter={chapter} onSelectConcept={onSelectConcept} onNavigateToAtlasWithCluster={onNavigateToAtlasWithCluster} />
      <ChapterNav currentChapter={chapter} onNavigateChapter={onSelectChapter} onNavigateToAtlas={onNavigateToAtlas} />
    </div>
  </div>;
};
