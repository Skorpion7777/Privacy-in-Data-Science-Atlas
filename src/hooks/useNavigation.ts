import { useState, useEffect, useCallback, useRef } from 'react';
import { chapters, clusters } from '../content';

export type ViewMode = 'atlas' | 'guide' | 'bookmarks' | 'sources';

export interface NavigationState {
  view: ViewMode;
  conceptId: string | null;
  chapterId: string | null;
  clusterFilter: string | null;
  searchOpen: boolean;
  searchQuery: string;
}

function parseUrlParams(): NavigationState {
  if (typeof window === 'undefined') {
    return {
      view: 'atlas',
      conceptId: null,
      chapterId: 'ch1',
      clusterFilter: null,
      searchOpen: false,
      searchQuery: '',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  let view: ViewMode = 'atlas';
  if (viewParam === 'guide' || viewParam === 'bookmarks' || viewParam === 'sources') {
    view = viewParam;
  }

  const conceptId = params.get('concept');
  const chapterId = chapters.find((chapter) => chapter.id === params.get('chapter'))?.id ?? 'ch1';
  const clusterFilter = clusters.find((cluster) => cluster.id === params.get('cluster'))?.id ?? null;
  const searchQuery = params.get('q') || '';
  const searchOpen = params.has('search') || Boolean(searchQuery);

  return {
    view,
    conceptId,
    chapterId,
    clusterFilter,
    searchOpen,
    searchQuery,
  };
}

export function useNavigation() {
  const [navState, setNavState] = useState<NavigationState>(parseUrlParams);
  const current = useRef(navState);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const next = parseUrlParams();
      current.current = next;
      setNavState(next);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateUrl = useCallback((nextState: NavigationState, replace = false) => {
    const params = new URLSearchParams();

    if (nextState.view !== 'atlas') {
      params.set('view', nextState.view);
    }
    if (nextState.conceptId) {
      params.set('concept', nextState.conceptId);
    }
    if (nextState.view === 'guide' && nextState.chapterId && nextState.chapterId !== 'ch1') {
      params.set('chapter', nextState.chapterId);
    }
    if (nextState.clusterFilter) {
      params.set('cluster', nextState.clusterFilter);
    }
    if (nextState.searchQuery) {
      params.set('q', nextState.searchQuery);
    }
    if (nextState.searchOpen && !nextState.searchQuery) {
      params.set('search', '1');
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    if (replace) {
      window.history.replaceState(nextState, '', newUrl);
    } else {
      window.history.pushState(nextState, '', newUrl);
    }

    current.current = nextState;
    setNavState(nextState);
  }, []);

  const setView = useCallback(
    (view: ViewMode) => {
      const next = { ...current.current, view, conceptId: null, searchOpen: false, searchQuery: '' };
      updateUrl(next);
    },
    [updateUrl]
  );

  const openConcept = useCallback(
    (conceptId: string) => {
      const next = { ...current.current, conceptId: conceptId || null, searchOpen: false, searchQuery: '' };
      updateUrl(next);
    },
    [updateUrl]
  );

  const closeConcept = useCallback(() => {
    const next = { ...current.current, conceptId: null };
    updateUrl(next);
  }, [updateUrl]);

  const openChapter = useCallback(
    (chapterId: string) => {
      const next = { ...current.current, view: 'guide' as ViewMode, chapterId, conceptId: null, searchOpen: false, searchQuery: '' };
      updateUrl(next);
    },
    [updateUrl]
  );

  const setClusterFilter = useCallback(
    (clusterFilter: string | null) => {
      const next = { ...current.current, view: 'atlas' as ViewMode, clusterFilter, conceptId: null, searchOpen: false, searchQuery: '' };
      updateUrl(next);
    },
    [updateUrl]
  );

  const setSearchOpen = useCallback(
    (open: boolean, query = '') => {
      const next = { ...current.current, searchOpen: open, searchQuery: query };
      updateUrl(next);
    },
    [updateUrl]
  );

  return {
    ...navState,
    setView,
    openConcept,
    closeConcept,
    openChapter,
    setClusterFilter,
    setSearchOpen,
  };
}
