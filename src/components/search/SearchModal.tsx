import React, { useEffect, useState } from 'react';
import { BookOpen, Compass, Search, X } from 'lucide-react';
import { searchAtlas } from '../../utils/search';
import { useDialog } from '../../hooks/useDialog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (id: string) => void;
  onSelectChapter: (id: string) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectConcept, onSelectChapter, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const dialogRef = useDialog(isOpen, onClose);
  useEffect(() => { if (isOpen) setQuery(initialQuery); }, [isOpen, initialQuery]);
  const results = searchAtlas(query);

  return (
    <dialog ref={dialogRef} className="search-dialog" aria-label="Search the Privacy Atlas" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="search-dialog-inner">
        <header className="search-dialog-header">
          <Search size={21} aria-hidden="true" />
          <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts and chapters…" aria-label="Search query" />
          <button type="button" className="tool-button" onClick={onClose} aria-label="Close search"><X size={20} /></button>
        </header>
        <div className="search-dialog-results">
          {!query.trim() ? <>
            <p className="eyebrow">Try a starting point</p>
            <div className="suggested-searches">{['Differential privacy', 'Article 22', 'Fairness', 'Rawls', 'Medicine', 'Predictive policing'].map((term) => <button className="button-secondary" type="button" key={term} onClick={() => setQuery(term)}>{term}</button>)}</div>
          </> : <>
            <p className="search-count" role="status">{results.totalMatches} results for “{query}”</p>
            {results.totalMatches === 0 && <p>Try a broader term, such as privacy, GDPR, bias, or explanation.</p>}
            {[{ name: 'Concepts', icon: Compass, items: results.concepts }, { name: 'Chapters', icon: BookOpen, items: results.chapters }].map((group) => group.items.length > 0 && <section key={group.name}>
              <h2 className="search-group-heading"><group.icon size={16} /> {group.name}</h2>
              <div className="search-result-list">{group.items.map((result) => <button key={result.id} type="button" className="search-result" onClick={() => result.type === 'concept' ? onSelectConcept(result.id) : onSelectChapter(result.id)}>
                <strong>{result.title}</strong><small>{result.subtitle}</small><span>{result.snippet}</span>
              </button>)}</div>
            </section>)}
          </>}
        </div>
        <footer className="search-dialog-footer">Tab to move between results · Enter to open · Esc to close</footer>
      </div>
    </dialog>
  );
};
