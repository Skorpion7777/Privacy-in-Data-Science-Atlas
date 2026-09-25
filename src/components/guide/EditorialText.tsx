import { Fragment } from 'react';
import { getSourceById } from '../../content';

export function SourceText({ text }: { text: string }) {
  return <>{text.split(/(\[S\d+\])/g).map((part, index) => {
    const match = part.match(/^\[(S\d+)\]$/);
    const source = match && getSourceById(match[1]);
    return source
      ? <a key={index} className="inline-citation" href={source.url} target="_blank" rel="noreferrer" aria-label={`${source.title}, opens in a new tab`}>{part}</a>
      : <Fragment key={index}>{part}</Fragment>;
  })}</>;
}

export function EditorialText({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((paragraph, index) => {
    const lines = paragraph.split('\n');
    if (lines.every((line) => line.startsWith('- '))) return <ul key={index}>{lines.map((line, i) => <li key={i}><SourceText text={line.slice(2)} /></li>)}</ul>;
    if (lines.every((line) => /^\d+\. /.test(line))) return <ol key={index} start={Number(lines[0].split('.')[0])}>{lines.map((line, i) => <li key={i}><SourceText text={line.replace(/^\d+\. /, '')} /></li>)}</ol>;
    if (paragraph.startsWith('P[M(')) return <pre key={index} className="guide-formula"><code>{paragraph}</code></pre>;
    return <p key={index}><SourceText text={paragraph} /></p>;
  })}</>;
}
