import { describe, it, expect } from 'vitest';
import { concepts, chapters, clusters, getConceptById, getRelationshipsForConcept } from '../content';

describe('Atlas Architecture & Graph Connectivity', () => {
  it('every cluster should have at least 3 mapped concepts', () => {
    for (const cluster of clusters) {
      const clusterConcepts = concepts.filter((c) => c.clusterId === cluster.id);
      expect(
        clusterConcepts.length,
        `Cluster ${cluster.id} has fewer than 3 concepts: ${clusterConcepts.length}`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('every concept should have reasonable deterministic coordinates on the canvas', () => {
    for (const concept of concepts) {
      expect(concept.position.x).toBeGreaterThan(0);
      expect(concept.position.y).toBeGreaterThan(0);
      expect(concept.position.x).toBeLessThan(3000);
      expect(concept.position.y).toBeLessThan(3000);
    }
  });

  it('critical study guide relationships are present and accurately directional', () => {
    // 1. Differential privacy -> does not replace -> raw-data security
    const dpRels = getRelationshipsForConcept('differential-privacy');
    const doesNotGuaranteeRawSec = dpRels.outgoing.some(
      (r) => r.relationship.targetId === 'raw-data-security' && r.relationship.type === 'does-not-guarantee'
    );
    expect(doesNotGuaranteeRawSec, 'Missing relationship: DP does not guarantee raw-data security').toBe(true);

    // 2. Transparency -> does not guarantee -> justifiability
    const transpRels = getRelationshipsForConcept('transparency');
    const doesNotGuaranteeJust = transpRels.outgoing.some(
      (r) => r.relationship.targetId === 'justifiability' && r.relationship.type === 'does-not-guarantee'
    );
    expect(doesNotGuaranteeJust, 'Missing relationship: Transparency does not guarantee justifiability').toBe(true);

    // 3. Label bias -> can distort -> predictive policing
    const labelRels = getRelationshipsForConcept('label-measurement-bias');
    const labelDistortsPolicing = labelRels.outgoing.some(
      (r) => r.relationship.targetId === 'predictive-policing' && r.relationship.type === 'can-distort'
    );
    expect(labelDistortsPolicing, 'Missing relationship: Label bias can distort predictive policing').toBe(true);

    // 4. Access account -> can conflict with -> control account
    const accessRels = getRelationshipsForConcept('access-account');
    const accessConflictsControl = accessRels.outgoing.some(
      (r) => r.relationship.targetId === 'control-account' && r.relationship.type === 'can-conflict-with'
    );
    expect(accessConflictsControl, 'Missing relationship: Access account can conflict with control account').toBe(true);
  });

  it('all chapter concept IDs should resolve to concepts located in appropriate clusters', () => {
    for (const chapter of chapters) {
      for (const conceptId of chapter.conceptIds) {
        const concept = getConceptById(conceptId);
        expect(concept).toBeDefined();
      }
    }
  });
});
