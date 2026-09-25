import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { getConceptById, getClusterById } from '../../content';

interface BookmarksViewProps {
  bookmarks: string[];
  onSelectConcept: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onNavigateToAtlas: () => void;
}

export const BookmarksView = ({ bookmarks, onSelectConcept, onToggleBookmark, onNavigateToAtlas }: BookmarksViewProps) => {
  const saved = bookmarks.map(getConceptById).filter((concept) => concept !== undefined);
  return <section className="saved-page">
    <header className="saved-header">
      <p className="eyebrow">Your reading shelf</p>
      <h1 className="editorial-title">Saved concepts</h1>
      <p>Keep useful ideas close at hand. Saved concepts stay in this browser.</p>
    </header>
    {saved.length ? <div className="concept-grid">{saved.map((concept) => {
      const cluster = getClusterById(concept.clusterId);
      return <article key={concept.id} className="saved-card">
        <div className="saved-card-header"><span style={{ color: cluster?.color }}>{cluster?.name}</span><button type="button" className="tool-button" aria-label={`Remove ${concept.title} from saved concepts`} onClick={() => onToggleBookmark(concept.id)}><Trash2 size={16} /></button></div>
        <button type="button" className="saved-card-open" onClick={() => onSelectConcept(concept.id)}><h2>{concept.title}</h2><p>{concept.conciseDefinition}</p><span>Explore concept <ArrowRight size={14} /></span></button>
      </article>;
    })}</div> : <div className="empty-state"><Bookmark size={32} /><h2>No saved concepts yet</h2><p>Open a concept and select Save to find it here later.</p><button type="button" className="button-primary" onClick={onNavigateToAtlas}>Explore the atlas <ArrowRight size={16} /></button></div>}
  </section>;
};
