import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { chapters, concepts } from '../content';
import { EditorialText, SourceText } from '../components/EditorialText';

describe('Published guide rendering', () => {
  it('renders the threat-model tables, emphasis, lists and references as readable HTML', () => {
    const threatSections = chapters[13].sections;
    const html = renderToStaticMarkup(<EditorialText paragraphs={threatSections.flatMap((section) => section.paragraphs)} />);

    expect(html).toContain('<table');
    expect(html).toContain('<th scope="col">');
    expect(html).toContain('<strong>Security</strong>');
    expect(html).toContain('<em>Example:</em>');
    expect(html).toContain('<li>');
    expect(html).toContain('href="https://');
    expect(html).not.toContain('| --- |');
    expect(html).not.toContain('**Security**');
  });

  it('keeps introductory sentences separate from lists and links course materials locally', () => {
    const html = renderToStaticMarkup(<EditorialText paragraphs={['Consider these options:\n- One\n- Two']} />);
    expect(html).toContain('<p>Consider these options:</p><ul>');
    expect(renderToStaticMarkup(<SourceText text="[S-AM]" />)).toContain('href="?view=guide&amp;chapter=ch9"');
  });

  it('renders structured concept explanations without exposing formatting marks', () => {
    for (const concept of concepts) {
      const text = concept.expandedExplanation;
      const html = renderToStaticMarkup(<EditorialText paragraphs={text.split(/\n\s*\n/)} />);
      if (text.includes('\n- ')) expect(html, concept.id).toContain('<ul>');
      if (text.includes('\n1. ')) expect(html, concept.id).toContain('<ol');
      if (text.includes('**')) expect(html, concept.id).toContain('<strong>');
      expect(html, concept.id).not.toContain('**');
      expect(html, concept.id).not.toMatch(/(?:^|>)\s*[-\d]+\.?(?:\s+\*\*|\s+\w)/);
    }
  });
});
