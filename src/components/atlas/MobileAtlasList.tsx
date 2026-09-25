import React, { useState } from 'react';
import { clusters, concepts, relationships } from '../../content';
import { ChevronDown, ChevronRight, ArrowUpRight } from 'lucide-react';

interface MobileAtlasListProps {
  onSelectConcept: (conceptId: string) => void;
  selectedConceptId: string | null;
  filterClusterId: string | null;
}

export const MobileAtlasList: React.FC<MobileAtlasListProps> = ({
  onSelectConcept,
  selectedConceptId,
  filterClusterId,
}) => {
  const [expandedClusters, setExpandedClusters] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    clusters.forEach((c, idx) => {
      init[c.id] = idx === 0 || c.id === filterClusterId;
    });
    return init;
  });

  const toggleCluster = (clusterId: string) => {
    setExpandedClusters((prev) => ({
      ...prev,
      [clusterId]: !prev[clusterId],
    }));
  };

  const visibleClusters = filterClusterId
    ? clusters.filter((c) => c.id === filterClusterId)
    : clusters;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
      <div style={{
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        background: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        Browsing view optimized for touch and mobile screens. Tap any concept to inspect its definitions, limits, and connections.
      </div>

      {visibleClusters.map((cluster) => {
        const clusterConcepts = concepts.filter((c) => c.clusterId === cluster.id);
        const isExpanded = expandedClusters[cluster.id] ?? false;

        return (
          <div
            key={cluster.id}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              borderColor: isExpanded ? cluster.borderColor : 'var(--border-subtle)',
            }}
          >
            {/* Cluster Header */}
            <button
              onClick={() => toggleCluster(cluster.id)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                background: isExpanded ? `color-mix(in srgb, ${cluster.color} 8%, transparent)` : undefined,
              }}
              aria-expanded={isExpanded}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: cluster.color,
                    boxShadow: `0 0 8px ${cluster.color}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {cluster.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {cluster.tagline} · {clusterConcepts.length} concepts
                  </div>
                </div>
              </div>

              {isExpanded ? (
                <ChevronDown size={18} color="var(--text-muted)" />
              ) : (
                <ChevronRight size={18} color="var(--text-muted)" />
              )}
            </button>

            {/* Expanded Concepts */}
            {isExpanded && (
              <div style={{ padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '0.25rem 0.5rem 0.5rem' }}>
                  {cluster.description}
                </p>

                {clusterConcepts.map((concept) => {
                  const isSelected = selectedConceptId === concept.id;
                  const relCount = relationships.filter(
                    (r) => r.sourceId === concept.id || r.targetId === concept.id
                  ).length;

                  return (
                    <div
                      key={concept.id}
                      onClick={() => onSelectConcept(concept.id)}
                      className="glass-card"
                      style={{
                        padding: '0.85rem 1rem',
                        cursor: 'pointer',
                        borderColor: isSelected ? cluster.color : undefined,
                        background: isSelected ? 'var(--bg-glass-active)' : undefined,
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onSelectConcept(concept.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {concept.title}
                        </h4>
                        <ArrowUpRight size={15} color="var(--text-accent)" style={{ flexShrink: 0, marginLeft: '0.5rem' }} />
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.4rem' }}>
                        {concept.conciseDefinition}
                      </p>

                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                        <span>{relCount} connections</span>
                        <span>•</span>
                        <span>Chapter {concept.chapterId.replace('ch', '')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
