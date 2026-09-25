import React from 'react';
import { clusters, concepts } from '../../content';
import { RotateCcw } from 'lucide-react';

interface ClusterFiltersProps {
  selectedCluster: string | null;
  onSelectCluster: (clusterId: string | null) => void;
  onResetView: () => void;
}

export const ClusterFilters: React.FC<ClusterFiltersProps> = ({
  selectedCluster,
  onSelectCluster,
  onResetView,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem',
        scrollbarWidth: 'none',
      }}
      role="region"
      aria-label="Atlas cluster filters"
    >
      <button
        onClick={() => onSelectCluster(null)}
        className="glass-card"
        style={{
          padding: '0.35rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          background: selectedCluster === null ? 'var(--bg-glass-active)' : undefined,
          borderColor: selectedCluster === null ? 'var(--text-accent)' : undefined,
          color: selectedCluster === null ? 'var(--text-primary)' : 'var(--text-secondary)',
        }}
        aria-pressed={selectedCluster === null}
      >
        All Regions ({concepts.length})
      </button>

      {clusters.map((c) => {
        const count = concepts.filter((con) => con.clusterId === c.id).length;
        const isSelected = selectedCluster === c.id;

        return (
          <button
            key={c.id}
            onClick={() => onSelectCluster(isSelected ? null : c.id)}
            className="glass-card"
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isSelected ? 'var(--bg-glass-active)' : undefined,
              borderColor: isSelected ? c.color : undefined,
              color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
            aria-pressed={isSelected}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: c.color,
                boxShadow: isSelected ? `0 0 6px ${c.color}` : undefined,
              }}
            />
            <span>{c.name}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>({count})</span>
          </button>
        );
      })}

      <button
        onClick={onResetView}
        className="glass-card"
        style={{
          padding: '0.35rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: 'var(--text-muted)',
          marginLeft: 'auto',
        }}
        title="Reset camera and zoom to overview"
        aria-label="Reset overview"
      >
        <RotateCcw size={13} />
        <span>Reset Overview</span>
      </button>
    </div>
  );
};
