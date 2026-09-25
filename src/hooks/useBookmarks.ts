import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'privacy_atlas_bookmarks_v1';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Graceful fallback if localStorage is disabled or storage quota exceeded
    }
  }, [bookmarks]);

  const toggleBookmark = useCallback((conceptId: string) => {
    setBookmarks((prev) =>
      prev.includes(conceptId) ? prev.filter((id) => id !== conceptId) : [...prev, conceptId]
    );
  }, []);

  const isBookmarked = useCallback(
    (conceptId: string) => bookmarks.includes(conceptId),
    [bookmarks]
  );

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
}
