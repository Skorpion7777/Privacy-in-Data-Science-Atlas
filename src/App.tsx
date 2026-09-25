import React from 'react';
import { useNavigation } from './hooks/useNavigation';
import { useBookmarks } from './hooks/useBookmarks';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AtlasCanvas } from './components/atlas/AtlasCanvas';
import { GuideView } from './components/guide/GuideView';
import { SourcesView } from './components/sources/SourcesView';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { ConceptDetail } from './components/concept/ConceptDetail';
import { SearchModal } from './components/search/SearchModal';

export const App: React.FC = () => {
  const {
    view,
    conceptId,
    chapterId,
    clusterFilter,
    searchOpen,
    searchQuery,
    setView,
    openConcept,
    closeConcept,
    openChapter,
    setClusterFilter,
    setSearchOpen,
  } = useNavigation();

  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  const handleStartReading = () => {
    openChapter('ch1');
  };

  const handleNavigateToAtlasWithCluster = (cId: string) => {
    setClusterFilter(cId);
  };

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isEditing = target.matches('input, textarea, select') || target.isContentEditable;
      if (!searchOpen && !isEditing && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'))) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, setSearchOpen]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view, chapterId]);

  return (
    <div className="app-shell">
      {/* Skip to Content for screen reader accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <Header
        currentView={view}
        onNavigate={setView}
        onOpenSearch={() => setSearchOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="main-shell"
      >
        {view === 'atlas' && (
          <AtlasCanvas
            selectedConceptId={conceptId}
            onSelectConcept={openConcept}
            clusterFilter={clusterFilter}
            onFilterCluster={setClusterFilter}
            onStartReading={handleStartReading}
            isBookmarked={isBookmarked}
          />
        )}

        {view === 'guide' && (
          <GuideView
            currentChapterId={chapterId}
            onSelectChapter={openChapter}
            onSelectConcept={openConcept}
            onNavigateToAtlas={() => setView('atlas')}
            onNavigateToAtlasWithCluster={handleNavigateToAtlasWithCluster}
          />
        )}

        {view === 'sources' && (
          <SourcesView onSelectConcept={openConcept} />
        )}

        {view === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            onSelectConcept={openConcept}
            onToggleBookmark={toggleBookmark}
            onNavigateToAtlas={() => setView('atlas')}
          />
        )}
      </main>

      {/* Concept Detail Drawer / Modal */}
      {conceptId && (
        <ConceptDetail
          conceptId={conceptId}
          onClose={closeConcept}
          onSelectConcept={openConcept}
          onOpenChapter={openChapter}
          isBookmarked={isBookmarked(conceptId)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectConcept={openConcept}
        onSelectChapter={openChapter}
        initialQuery={searchQuery}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={setView}
        onFilterCluster={setClusterFilter}
      />
    </div>
  );
};
