import { sources, concepts } from '../../content';
import { Library, ExternalLink, Compass } from 'lucide-react';

interface SourcesViewProps {
  onSelectConcept: (conceptId: string) => void;
}

export const SourcesView: React.FC<SourcesViewProps> = ({ onSelectConcept }) => {
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem 1rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <header className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-accent)'
          }}>
            <Library size={20} />
          </div>
          <h1 className="editorial-title" style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>
            Sources & further reading
          </h1>
        </div>

        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          Follow the references behind the guide: European legislation, court summaries, technical guidance, philosophical overviews, and research on fairness.
        </p>

        <div style={{
          marginTop: '1.25rem',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          background: 'rgba(251, 113, 133, 0.08)',
          border: '1px solid rgba(251, 113, 133, 0.25)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}>
          This guide is educational. Applying legal or clinical guidance requires the specific facts, jurisdiction, and relevant professional judgment.
        </div>
      </header>

      {/* Sources Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sources.map((src) => {
          const citingConcepts = concepts.filter((c) => c.sourceIds.includes(src.id));

          return (
            <div
              key={src.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--text-accent)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'inline-block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    [{src.id}] {src.authorOrInstitution}
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {src.title}
                  </h2>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card"
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'var(--text-accent)',
                  }}
                  title="Open external verified link"
                >
                  <span>Read source</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                {src.contextualNote}
              </p>

              {/* Related Concepts */}
              {citingConcepts.length > 0 && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Referenced in {citingConcepts.length} Mapped Concepts:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {citingConcepts.map((con) => (
                      <button
                        key={con.id}
                        onClick={() => onSelectConcept(con.id)}
                        className="glass-card"
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          color: 'var(--text-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Compass size={12} color="var(--text-accent)" />
                        <span>{con.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
