import React from 'react';
import { BookOpen, Bookmark, Compass, Library, Search } from 'lucide-react';
import { ViewMode } from '../../hooks/useNavigation';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenSearch, bookmarkCount }) => (
  <header className="site-header">
    <div className="header-inner">
      <button className="brand-button" type="button" onClick={() => onNavigate('atlas')} aria-label="The Privacy Atlas home">
        <span className="brand-mark"><Compass size={21} strokeWidth={1.8} /></span>
        <span>
          <span className="editorial-title" style={{ display: 'block', fontSize: '1.18rem', color: 'var(--text-primary)' }}>
            The Privacy Atlas
          </span>
          <span className="brand-subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
            Privacy, fairness & responsible data science
          </span>
        </span>
      </button>

      <button type="button" className="mobile-search-trigger tool-button" onClick={onOpenSearch} aria-label="Search concepts and chapters"><Search size={20} /></button>

      <nav className="header-nav" aria-label="Main navigation">
        <button className="nav-button" type="button" onClick={() => onNavigate('atlas')} aria-pressed={currentView === 'atlas'}>
          <Compass size={16} /><span>Atlas</span>
        </button>
        <button className="nav-button" type="button" onClick={() => onNavigate('guide')} aria-pressed={currentView === 'guide'}>
          <BookOpen size={16} /><span>Field guide</span>
        </button>
        <button className="nav-button" type="button" onClick={() => onNavigate('sources')} aria-pressed={currentView === 'sources'}>
          <Library size={16} /><span>Sources</span>
        </button>
        <button className="nav-button" type="button" onClick={() => onNavigate('bookmarks')} aria-pressed={currentView === 'bookmarks'}>
          <Bookmark size={16} /><span>Saved{bookmarkCount > 0 ? ` · ${bookmarkCount}` : ''}</span>
        </button>
        <button className="nav-button search-trigger" type="button" onClick={onOpenSearch} aria-label="Search concepts and chapters, press slash">
          <Search size={16} /><span>Search</span><kbd>/</kbd>
        </button>
      </nav>
    </div>
  </header>
);
