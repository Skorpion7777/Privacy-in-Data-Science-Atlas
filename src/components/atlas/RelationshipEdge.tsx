import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  EdgeProps,
} from '@xyflow/react';
import { Relationship } from '../../content/types';

export interface RelationshipEdgeData {
  relationship: Relationship;
  isHighlighted: boolean;
  isDimmed: boolean;
}

export const RelationshipEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const edgeData = data as unknown as RelationshipEdgeData | undefined;
  const relationship = edgeData?.relationship;
  const isHighlighted = edgeData?.isHighlighted ?? false;
  const isDimmed = edgeData?.isDimmed ?? false;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Color code based on relationship type
  let strokeColor = '#c2ccc5';
  let strokeWidth = 1.6;
  let strokeDasharray: string | undefined = undefined;

  if (relationship) {
    if (relationship.type === 'does-not-guarantee' || relationship.type === 'can-conflict-with' || relationship.type === 'can-distort') {
      strokeColor = isHighlighted ? '#a34b55' : 'rgba(161, 78, 88, 0.45)';
      strokeDasharray = '5 4';
    } else if (relationship.type === 'supports' || relationship.type === 'protects' || relationship.type === 'limits-disclosure-from') {
      strokeColor = isHighlighted ? '#176b87' : 'rgba(23, 107, 135, 0.45)';
    } else if (relationship.type === 'complicates') {
      strokeColor = isHighlighted ? '#95601d' : 'rgba(149, 96, 29, 0.45)';
      strokeDasharray = '4 3';
    } else if (relationship.type === 'is-often-confused-with' || relationship.type === 'differs-from') {
      strokeColor = isHighlighted ? '#704c9a' : 'rgba(112, 76, 154, 0.45)';
      strokeDasharray = '3 3';
    }
  }

  if (isHighlighted) {
    strokeWidth = 2.6;
  }

  const opacity = isDimmed ? 0.15 : 1;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray,
          opacity,
          transition: 'all 200ms ease',
        }}
      />
      {relationship && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              zIndex: isHighlighted ? 10 : 1,
              opacity,
              transition: 'opacity 200ms ease',
            }}
            className="nodrag nopan"
          >
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '2px 8px',
                borderRadius: '6px',
                background: '#ffffff',
                border: isHighlighted ? `1px solid ${strokeColor}` : '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                boxShadow: isHighlighted ? '0 2px 8px rgba(31,41,35,0.12)' : undefined,
                whiteSpace: 'normal',
                maxWidth: 170,
                textAlign: 'center',
                display: 'inline-block',
              }}
              title={relationship.shortNote}
            >
              {relationship.label}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
