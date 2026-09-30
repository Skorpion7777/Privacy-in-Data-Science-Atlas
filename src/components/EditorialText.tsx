import { Fragment, ReactNode } from 'react';
import { getSourceById } from '../content';

function InlineText({ text }: { text: string }): ReactNode {
  return text.split(/(\[S(?:\d+|-AM)\]|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const citation = part.match(/^\[(S(?:\d+|-AM))\]$/);
    const source = citation && getSourceById(citation[1]);
    if (source?.url) return <a key={index} className="inline-citation" href={source.url} target="_blank" rel="noreferrer" aria-label={`${source.title}, opens in a new tab`}>{part}</a>;
    if (source) return <a key={index} className="inline-citation" href="?view=guide&chapter=ch9" aria-label="Read the course materials in the field guide">{part}</a>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function SourceText({ text }: { text: string }) {
  return <InlineText text={text} />;
}

export function EditorialText({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((paragraph, index) => {
    const lines = paragraph.split('\n');
    if (lines[0].startsWith('|') && lines.length > 2) {
      const cells = (line: string) => line.split('|').slice(1, -1).map((cell) => cell.trim());
      return <div key={index} className="guide-table-scroll"><table className="guide-table"><thead><tr>{cells(lines[0]).map((cell, i) => <th key={i} scope="col"><SourceText text={cell} /></th>)}</tr></thead><tbody>{lines.slice(2).map((line, i) => <tr key={i}>{cells(line).map((cell, j) => <td key={j}><SourceText text={cell} /></td>)}</tr>)}</tbody></table></div>;
    }
    const listStart = lines.findIndex((line) => /^(?:- |\d+\. )/.test(line));
    if (listStart >= 0 && lines.slice(listStart).every((line) => /^(?:- |\d+\. )/.test(line))) {
      const list = lines.slice(listStart);
      const items = list.map((line, i) => <li key={i}><SourceText text={line.replace(/^(?:- |\d+\. )/, '')} /></li>);
      return <Fragment key={index}>{listStart > 0 && <p><SourceText text={lines.slice(0, listStart).join(' ')} /></p>}{list[0].startsWith('- ') ? <ul>{items}</ul> : <ol start={Number(list[0].split('.')[0])}>{items}</ol>}</Fragment>;
    }
    if (paragraph.startsWith('P[M(')) return <pre key={index} className="guide-formula"><code>{paragraph}</code></pre>;
    return <p key={index}><SourceText text={lines.join(' ')} /></p>;
  })}</>;
}
