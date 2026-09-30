import { clusters, sources } from '../../content';
import { ViewMode } from '../../hooks/useNavigation';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onFilterCluster: (id: string) => void;
}

export const Footer = ({ onNavigate, onFilterCluster }: FooterProps) => (
  <footer className="site-footer">
    <div className="footer-grid">
      <div>
        <h4 className="editorial-title">The Privacy Atlas</h4>
        <p>A guide to privacy, fairness, and the decisions that make data science responsible.</p>
        <p>For learning and reference.</p>
      </div>
      {[clusters.slice(0, Math.ceil(clusters.length / 2)), clusters.slice(Math.ceil(clusters.length / 2))].map((group, index) => <div key={index}>
        <h5>{index === 0 ? 'Privacy & understanding' : 'Responsibility & practice'}</h5>
        <nav className="footer-links" aria-label={index === 0 ? 'Privacy themes' : 'Practice themes'}>
          {group.map((cluster) => <button key={cluster.id} type="button" onClick={() => onFilterCluster(cluster.id)}>{cluster.name}</button>)}
        </nav>
      </div>)}
      <div>
        <h5>Keep exploring</h5>
        <nav className="footer-links" aria-label="More resources">
          <button type="button" onClick={() => onNavigate('guide')}>Read the field guide →</button>
          <button type="button" onClick={() => onNavigate('sources')}>Browse {sources.length} references →</button>
          <button type="button" onClick={() => onNavigate('bookmarks')}>Your saved concepts →</button>
        </nav>
      </div>
    </div>
    <div className="footer-bottom"><span>Built for curious, critical thinking.</span><span className="footer-shortcuts"><kbd>/</kbd> Search · <kbd>Esc</kbd> Close</span></div>
  </footer>
);
