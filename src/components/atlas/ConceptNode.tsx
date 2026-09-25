import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bookmark } from 'lucide-react';
import { Concept } from '../../content/types';
import { clusters } from '../../content/clusters';

export interface ConceptNodeData {
  concept: Concept;
  isSelected: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  isBookmarked: boolean;
  onSelect: (id: string) => void;
}

export const ConceptNode = memo(({ data }: NodeProps) => {
  const { concept, isSelected, isConnected, isDimmed, isBookmarked, onSelect } = data as unknown as ConceptNodeData;
  const cluster = clusters.find((item) => item.id === concept.clusterId);
  const clusterColor = cluster?.color ?? 'var(--text-accent)';

  return (
    <button
      type="button"
      className="atlas-map-node"
      onClick={() => onSelect(concept.id)}
      aria-label={`Open ${concept.title}. ${cluster?.name ?? 'Concept'}.`}
      style={{
        width: 278,
        height: 175,
        padding: '0.9rem 1rem',
        border: `1px solid ${isSelected ? clusterColor : isConnected ? '#a8b8ae' : '#dce4dd'}`,
        borderTop: `3px solid ${clusterColor}`,
        borderRadius: 12,
        background: isSelected ? '#f1f8f4' : '#fff',
        color: 'var(--text-primary)',
        boxShadow: isSelected ? `0 0 0 2px color-mix(in srgb, ${clusterColor} 22%, transparent), var(--shadow-node)` : 'var(--shadow-node)',
        opacity: isDimmed ? 0.45 : 1,
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 7 }}>
        <span style={{ color: clusterColor, fontSize: 10, fontWeight: 750, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {cluster?.name ?? 'Concept'}
        </span>
        {isBookmarked && <Bookmark size={14} fill="#a87527" color="#a87527" aria-label="Saved" />}
      </span>
      <strong style={{ display: 'block', marginBottom: 5, fontSize: 14, lineHeight: 1.35 }}>{concept.title}</strong>
      <span style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.4 }}>
        {concept.conciseDefinition}
      </span>
    </button>
  );
});

ConceptNode.displayName = 'ConceptNode';
