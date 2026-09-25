import { describe, it, expect } from 'vitest';
import { searchAtlas } from '../utils/search';

describe('Search Functionality', () => {
  it('should return empty results for empty query', () => {
    const res = searchAtlas('');
    expect(res.totalMatches).toBe(0);
    expect(res.concepts.length).toBe(0);
    expect(res.chapters.length).toBe(0);
  });

  it('should find differential privacy concepts and chapters', () => {
    const res = searchAtlas('differential privacy');
    expect(res.totalMatches).toBeGreaterThan(0);
    expect(res.concepts.some((c) => c.id === 'differential-privacy')).toBe(true);
    expect(res.chapters.some((ch) => ch.id === 'ch3')).toBe(true);
  });

  it('should find specific technical terms like epsilon and raw-data security', () => {
    const epsRes = searchAtlas('epsilon');
    expect(epsRes.concepts.some((c) => c.id === 'epsilon-and-delta')).toBe(true);

    const rawRes = searchAtlas('raw-data security');
    expect(rawRes.concepts.some((c) => c.id === 'raw-data-security')).toBe(true);
  });

  it('should find Dun & Bradstreet CJEU case and Article 22', () => {
    const caseRes = searchAtlas('Dun & Bradstreet');
    expect(caseRes.concepts.some((c) => c.id === 'cjeu-dun-and-bradstreet')).toBe(true);

    const art22Res = searchAtlas('Article 22');
    expect(art22Res.concepts.some((c) => c.id === 'automated-decisions-article-22')).toBe(true);
  });

  it('should distinguish concepts from chapters in results', () => {
    const res = searchAtlas('medicine');
    expect(res.concepts.length).toBeGreaterThan(0);
    expect(res.chapters.length).toBeGreaterThan(0);
    expect(res.concepts[0].type).toBe('concept');
    expect(res.chapters[0].type).toBe('chapter');
  });
});
