import type { CommunityStats } from '../services/stats';
import { formatNumber } from '../services/stats';

interface CommunityStatsProps {
  stats: CommunityStats;
}

const CommunityStats = ({ stats }: CommunityStatsProps) => {
  return (
    <div className="community-stats">
      <h3>Community Insights</h3>
      <div className="community-stats-subtitle">
        <span>Aggregated stats from all users</span>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{formatNumber(stats.totalWords)}</span>
          <span className="stat-label">Words Written</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatNumber(stats.totalReflections)}</span>
          <span className="stat-label">AI Reflections</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatNumber(stats.averageReflectionLength)}</span>
          <span className="stat-label">Avg. Words/Reflection</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatNumber(stats.activeUsers)}</span>
          <span className="stat-label">Active Thinkers</span>
        </div>
      </div>
      
      <div className="category-stats">
        <h4>Category Distribution</h4>
        <div className="category-bars">
          <div className="category-bar">
            <span className="category-label">💝 Emotional</span>
            <div className="bar-container">
              <div 
                className="bar emotional" 
                style={{ width: `${(stats.categoryDistribution.emotional / stats.totalReflections) * 100}%` }}
              />
            </div>
            <span className="category-value">{stats.categoryDistribution.emotional}</span>
          </div>
          <div className="category-bar">
            <span className="category-label">🎨 Creative</span>
            <div className="bar-container">
              <div 
                className="bar creative" 
                style={{ width: `${(stats.categoryDistribution.creative / stats.totalReflections) * 100}%` }}
              />
            </div>
            <span className="category-value">{stats.categoryDistribution.creative}</span>
          </div>
          <div className="category-bar">
            <span className="category-label">🤔 Philosophical</span>
            <div className="bar-container">
              <div 
                className="bar philosophical" 
                style={{ width: `${(stats.categoryDistribution.philosophical / stats.totalReflections) * 100}%` }}
              />
            </div>
            <span className="category-value">{stats.categoryDistribution.philosophical}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats; 