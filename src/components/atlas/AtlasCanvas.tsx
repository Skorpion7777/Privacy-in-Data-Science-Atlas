import React, { useMemo, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlow,
} from '@xyflow/react';
import { ArrowDown, ArrowRight, BookOpen, Check, Compass, Network, Search } from 'lucide-react';
import { clusters, concepts, relationships } from '../../content';
import { ConceptNode } from './ConceptNode';
import { RelationshipEdge } from './RelationshipEdge';

interface AtlasCanvasProps {
  selectedConceptId: string | null;
  onSelectConcept: (id: string) => void;
  clusterFilter: string | null;
  onFilterCluster: (clusterId: string | null) => void;
  onStartReading: () => void;
  isBookmarked: (id: string) => boolean;
}

type AtlasMode = 'browse' | 'map';

const nodeTypes = { conceptNode: ConceptNode };
const edgeTypes = { relationshipEdge: RelationshipEdge };

export const AtlasCanvas: React.FC<AtlasCanvasProps> = ({
  selectedConceptId,
  onSelectConcept,
  clusterFilter,
  onFilterCluster,
  onStartReading,
  isBookmarked,
}) => {
  const [mode, setMode] = useState<AtlasMode>('browse');
  const [query, setQuery] = useState('');
  const [expandedThemes, setExpandedThemes] = useState<string[]>([]);
  const [focusedConceptId, setFocusedConceptId] = useState<string | null>(null);
  const selectedCluster = clusters.find((cluster) => cluster.id === clusterFilter) ?? null;

  const filteredConcepts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return concepts.filter((concept) => {
      const matchesCluster = !clusterFilter || concept.clusterId === clusterFilter;
      const cluster = clusters.find((item) => item.id === concept.clusterId);
      const searchableText = [
        concept.title,
        concept.conciseDefinition,
        concept.expandedExplanation,
        concept.keywords.join(' '),
        cluster?.name,
      ].join(' ').toLocaleLowerCase();

      return matchesCluster && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [clusterFilter, query]);

  const visibleClusters = clusterFilter
    ? clusters.filter((cluster) => cluster.id === clusterFilter)
    : clusters;

  const themeConcepts = selectedCluster
    ? concepts.filter((concept) => concept.clusterId === selectedCluster.id)
    : [];

  const degree = (id: string) => relationships.filter((link) => link.sourceId === id || link.targetId === id).length;
  const focusConcept = themeConcepts.find((concept) => concept.id === focusedConceptId)
    ?? [...themeConcepts].sort((a, b) => degree(b.id) - degree(a.id))[0];
  const focusLinks = relationships.filter((link) => link.sourceId === focusConcept?.id || link.targetId === focusConcept?.id);
  const incomingIds = [...new Set(focusLinks.filter((link) => link.targetId === focusConcept?.id).map((link) => link.sourceId))];
  const outgoingIds = [...new Set(focusLinks.filter((link) => link.sourceId === focusConcept?.id).map((link) => link.targetId))].filter((id) => !incomingIds.includes(id));
  const mapConcepts = concepts.filter((concept) => concept.id === focusConcept?.id || incomingIds.includes(concept.id) || outgoingIds.includes(concept.id));
  const rows = Math.max(incomingIds.length, outgoingIds.length, 1);
  const nodePosition = (id: string) => {
    if (id === focusConcept?.id) return { x: 510, y: 40 + (rows - 1) * 115 };
    const incoming = incomingIds.includes(id);
    const ids = incoming ? incomingIds : outgoingIds;
    return { x: incoming ? 10 : 1010, y: 40 + (rows - ids.length) * 115 + ids.indexOf(id) * 230 };
  };

  const mapNodes: Node[] = mapConcepts.map((concept) => ({
    id: concept.id,
    type: 'conceptNode',
    position: nodePosition(concept.id),
    draggable: false,
    data: {
      concept,
      isSelected: selectedConceptId === concept.id || focusConcept?.id === concept.id,
      isConnected: false,
      isDimmed: false,
      isBookmarked: isBookmarked(concept.id),
      onSelect: onSelectConcept,
    },
  }));

  const mapEdges: Edge[] = focusLinks
    .map((relationship) => ({
      id: relationship.id,
      source: relationship.sourceId,
      target: relationship.targetId,
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'relationshipEdge',
      markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: '#8b9992' },
      data: { relationship, isHighlighted: false, isDimmed: false },
    }));

  const handleChooseCluster = (clusterId: string) => {
    setQuery('');
    onFilterCluster(clusterFilter === clusterId ? null : clusterId);
    document.getElementById('atlas-concepts')?.scrollIntoView({ block: 'start' });
  };

  const handleExplore = () => {
    setMode('browse');
    document.getElementById('atlas-concepts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="atlas-page">
      <section className="atlas-hero" aria-labelledby="atlas-title">
        <div className="atlas-hero-copy">
          <p className="eyebrow">Privacy · Fairness · Responsible Data Science</p>
            <h1 id="atlas-title" className="editorial-title">Understand the ideas.<br />Connect the dots.</h1>
          <p className="atlas-hero-description">
            Follow the connections between privacy, law, technical safeguards, fairness, and real-world decisions. Browse by theme, search a concept, or take the guided reading path.
          </p>
          <div className="hero-actions">
            <button className="button-primary" type="button" onClick={handleExplore}>
              <Compass size={17} /> Explore the themes <ArrowDown size={15} />
            </button>
            <button className="button-secondary" type="button" onClick={onStartReading}>
              <BookOpen size={17} /> Read the field guide
            </button>
          </div>
        </div>

        <aside className="atlas-hero-aside" aria-label="Atlas overview">
          <div className="hero-aside-card">
            <div className="hero-stat"><strong>{clusters.length}</strong><span>connected themes</span></div>
            <div className="hero-stat"><strong>{concepts.length}</strong><span>concepts to explore</span></div>
            <div className="hero-stat"><strong>{relationships.length}</strong><span>explained connections</span></div>
          </div>
        </aside>
      </section>

      <section className="atlas-section theme-picker" aria-labelledby="theme-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose a starting point</p>
            <h2 id="theme-heading">Explore by theme</h2>
            <p>Choose a theme to jump to its concepts.</p>
          </div>
          {clusterFilter && (
            <button className="button-secondary" type="button" onClick={() => onFilterCluster(null)}>
              <Check size={15} /> Clear theme
            </button>
          )}
        </div>

        <div className="atlas-theme-grid">
          {clusters.map((cluster, index) => {
            const count = concepts.filter((concept) => concept.clusterId === cluster.id).length;
            const isActive = clusterFilter === cluster.id;
            return (
              <button
                key={cluster.id}
                className="theme-card"
                type="button"
                style={{
                  '--theme-color': cluster.color,
                  '--theme-tint': cluster.accentBg,
                } as React.CSSProperties}
                aria-pressed={isActive}
                onClick={() => handleChooseCluster(cluster.id)}
              >
                <span className="theme-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="theme-card-copy">
                  <strong>{cluster.name}</strong>
                  <small>{count} concepts</small>
                </span>
                <ArrowRight className="theme-card-arrow" size={16} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      <section id="atlas-concepts" className="atlas-section" aria-labelledby="concept-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse the atlas</p>
            <h2 id="concept-heading">{selectedCluster ? selectedCluster.name : 'Concepts and connections'}</h2>
            <p>
              {selectedCluster
                ? selectedCluster.description
                : 'Start with a definition, then follow its clearly labeled connections to related ideas.'}
            </p>
          </div>
          {selectedCluster && <button type="button" className="button-secondary" onClick={() => { setQuery(''); onFilterCluster(null); }}>All themes</button>}
        </div>

        <div className="atlas-controls">
          {mode === 'browse' ? (
          <label className="atlas-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a concept, term, or topic…"
              aria-label="Filter atlas concepts"
            />
          </label>
          ) : <label className="map-theme-select">Map theme<select value={clusterFilter ?? ''} onChange={(event) => onFilterCluster(event.target.value || null)}>
            <option value="">Choose a theme</option>
            {clusters.map((cluster) => <option key={cluster.id} value={cluster.id}>{cluster.name}</option>)}
          </select></label>}
          <div className="atlas-view-switch" role="group" aria-label="Atlas layout">
            <button type="button" aria-pressed={mode === 'browse'} onClick={() => setMode('browse')}>
              <BookOpen size={15} /> Browse
            </button>
            <button type="button" aria-pressed={mode === 'map'} onClick={() => setMode('map')}>
              <Network size={15} /> Relationship map
            </button>
          </div>
        </div>

        {mode === 'browse' ? (
          filteredConcepts.length === 0 ? (
            <div className="empty-state" role="status">
              <strong>No concepts match “{query}”.</strong>
              <p>Try a broader term or clear the theme filter.</p>
            </div>
          ) : (
            <div className="atlas-results" aria-live="polite">
              {visibleClusters.map((cluster) => {
                const clusterConcepts = filteredConcepts.filter((concept) => concept.clusterId === cluster.id);
                if (clusterConcepts.length === 0) return null;

                return (
                  <section
                    key={cluster.id}
                    className="theme-results"
                    aria-labelledby={`theme-results-${cluster.id}`}
                    style={{ '--theme-color': cluster.color } as React.CSSProperties}
                  >
                    <div className="theme-results-heading">
                      <div>
                        <h3 id={`theme-results-${cluster.id}`}>{cluster.name}</h3>
                        <p>{cluster.tagline} · {clusterConcepts.length} concepts</p>
                      </div>
                    </div>
                    <div className="concept-grid">
                      {(clusterFilter || query.trim() || expandedThemes.includes(cluster.id) ? clusterConcepts : clusterConcepts.slice(0, 3)).map((concept) => {
                        const connectionCount = relationships.filter(
                          (relationship) => relationship.sourceId === concept.id || relationship.targetId === concept.id,
                        ).length;
                        return (
                          <button
                            key={concept.id}
                            className="concept-card"
                            type="button"
                            onClick={() => onSelectConcept(concept.id)}
                            aria-label={`Open ${concept.title}. ${connectionCount} connections.`}
                          >
                            <span className="concept-card-header">
                              <h4>{concept.title}</h4>
                              <ArrowRight size={16} color={cluster.color} aria-hidden="true" />
                            </span>
                            <p>{concept.conciseDefinition}</p>
                            <span className="concept-card-footer">
                              <span><Network size={13} /> {connectionCount} {connectionCount === 1 ? 'connection' : 'connections'}</span>
                              <span className="concept-open">Explore concept</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {!clusterFilter && !query.trim() && clusterConcepts.length > 3 && <button className="text-button theme-show-more" type="button" aria-expanded={expandedThemes.includes(cluster.id)} onClick={() => setExpandedThemes((items) => items.includes(cluster.id) ? items.filter((id) => id !== cluster.id) : [...items, cluster.id])}>
                      {expandedThemes.includes(cluster.id) ? 'Show fewer concepts' : `Show all ${clusterConcepts.length} concepts in ${cluster.name}`} <ArrowRight size={14} />
                    </button>}
                  </section>
                );
              })}
            </div>
          )
        ) : selectedCluster ? (
          <div className="atlas-map-panel">
            <div className="atlas-map-header">
              <label className="map-theme-select">Focus concept<select value={focusConcept?.id ?? ''} onChange={(event) => setFocusedConceptId(event.target.value)}>
                {themeConcepts.map((concept) => <option key={concept.id} value={concept.id}>{concept.title}</option>)}
              </select></label>
              <span className="badge">{mapEdges.length} direct connections</span>
            </div>
            <p className="map-help">Follow arrows from left to right. Connections can cross themes. Open a node for its explanation, or drag the map and use the zoom controls.</p>
            <div className="atlas-map-canvas" role="region" aria-label={`Relationship map for ${selectedCluster.name}`}>
              <ReactFlow
                key={focusConcept?.id}
                nodes={mapNodes}
                edges={mapEdges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 0.15 }}
                minZoom={0.2}
                maxZoom={1.5}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }}
              >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#e1e8e2" />
                <Controls showInteractive={false} />
              </ReactFlow>
            </div>
          </div>
        ) : (
          <div className="atlas-map-panel map-empty">
            <div>
              <Network size={25} color="var(--text-accent)" aria-hidden="true" />
              <h3>Choose a theme to see its map</h3>
              <p>Pick a theme above, then focus on a concept to see its direct connections—including links to other themes.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
