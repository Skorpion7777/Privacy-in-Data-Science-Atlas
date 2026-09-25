import React from 'react';
import { getConceptById, getRelationshipsForConcept } from '../../content';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

interface RelationshipTextListProps {
  selectedConceptId: string | null;
  onSelectConcept: (conceptId: string) => void;
  onClose: () => void;
}

export const RelationshipTextList: React.FC<RelationshipTextListProps> = ({
  selectedConceptId,
  onSelectConcept,
  onClose,
}) => {
  if (!selectedConceptId) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.25rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Select any node on the canvas to inspect its direct connections and readable relationship claims.</span>
      </div>
    );
  }

  const concept = getConceptById(selectedConceptId);
  if (!concept) return null;

  const { incoming, outgoing } = getRelationshipsForConcept(selectedConceptId);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      role="region"
      aria-label={`Connections for ${concept.title}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-accent)' }}>
            Active Node Connections
          </span>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {concept.title}
          </h4>
        </div>
        <button
          onClick={onClose}
          style={{ padding: '4px', borderRadius: '4px', color: 'var(--text-muted)' }}
          aria-label="Clear active connections"
        >
          <X size={16} />
        </button>
      </div>

      {incoming.length === 0 && outgoing.length === 0 ? (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          No direct mapped connections registered for this node.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {/* Outgoing */}
          {outgoing.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowRight size={13} color="var(--text-accent)" />
                <span>Outgoing Claims ({outgoing.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {outgoing.map(({ relationship, relatedConcept }) => (
                  <div
                    key={relationship.id}
                    onClick={() => onSelectConcept(relatedConcept.id)}
                    className="glass-card"
                    style={{
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectConcept(relatedConcept.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{concept.title}</span>
                      <span style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        fontSize: '0.72rem',
                        color: 'var(--text-accent)',
                      }}>
                        {relationship.label}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{relatedConcept.title}</span>
                    </div>
                    {relationship.shortNote && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {relationship.shortNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incoming */}
          {incoming.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={13} color="#a855f7" />
                <span>Incoming Claims ({incoming.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {incoming.map(({ relationship, relatedConcept }) => (
                  <div
                    key={relationship.id}
                    onClick={() => onSelectConcept(relatedConcept.id)}
                    className="glass-card"
                    style={{
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectConcept(relatedConcept.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{relatedConcept.title}</span>
                      <span style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        fontSize: '0.72rem',
                        color: '#c084fc',
                      }}>
                        {relationship.label}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{concept.title}</span>
                    </div>
                    {relationship.shortNote && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {relationship.shortNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
