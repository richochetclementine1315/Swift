import React from 'react';
import { calculateRouteStats } from '../utils/dijkstra';
import './RouteInfo.css';

const RouteInfo = ({ route }) => {
  if (!route) return null;

  const stats = calculateRouteStats(route, {});

  const formatTime = (time) => {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);
    return `${minutes}m ${seconds}s`;
  };

  const getEfficiencyRating = (efficiency) => {
    if (efficiency > 0.8) return { rating: 'Excellent', color: '#4CAF50', icon: '🌟' };
    if (efficiency > 0.6) return { rating: 'Good', color: '#8BC34A', icon: '✅' };
    if (efficiency > 0.4) return { rating: 'Average', color: '#FF9800', icon: '⚠️' };
    return { rating: 'Poor', color: '#F44336', icon: '🚨' };
  };

  const efficiencyInfo = getEfficiencyRating(stats?.efficiency || 0);

  return (
    <div className="route-info">
      <div className="route-header">
        <h3>📋 Route Analysis</h3>
        <div className="route-status">
          <span className="status-icon">✅</span>
          Route Found
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <span className="stat-label">Estimated Time</span>
            <span className="stat-value">{formatTime(route.distance)}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📏</div>
          <div className="stat-content">
            <span className="stat-label">Distance</span>
            <span className="stat-value">{route.path?.length || 0} blocks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚦</div>
          <div className="stat-content">
            <span className="stat-label">Intersections</span>
            <span className="stat-value">{route.path?.length - 1 || 0}</span>
          </div>
        </div>

        <div className="stat-card efficiency" style={{ borderColor: efficiencyInfo.color }}>
          <div className="stat-icon">{efficiencyInfo.icon}</div>
          <div className="stat-content">
            <span className="stat-label">Efficiency</span>
            <span className="stat-value" style={{ color: efficiencyInfo.color }}>
              {efficiencyInfo.rating}
            </span>
          </div>
        </div>
      </div>

      {stats && (
        <div className="detailed-stats">
          <div className="stats-section">
            <h4>🛣️ Road Composition</h4>
            <div className="progress-bars">
              <div className="progress-item">
                <span className="progress-label">Main Roads</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill main-road"
                    style={{ width: `${(stats.roadTypes.main / stats.totalBlocks) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-value">{stats.roadTypes.main}</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Secondary Roads</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill secondary-road"
                    style={{ width: `${(stats.roadTypes.secondary / stats.totalBlocks) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-value">{stats.roadTypes.secondary}</span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h4>🚦 Traffic Conditions</h4>
            <div className="traffic-conditions">
              <div className="condition-item">
                <span className="condition-icon" style={{ backgroundColor: '#4CAF50' }}></span>
                <span className="condition-label">Normal</span>
                <span className="condition-count">{stats.trafficConditions.normal}</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon" style={{ backgroundColor: '#FF9800' }}></span>
                <span className="condition-label">Heavy</span>
                <span className="condition-count">{stats.trafficConditions.heavy}</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon" style={{ backgroundColor: '#F44336' }}></span>
                <span className="condition-label">Blocked</span>
                <span className="condition-count">{stats.trafficConditions.blocked}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="route-path">
        <h4>🗺️ Route Path</h4>
        <div className="path-visualization">
          {route.path?.map((node, index) => (
            <React.Fragment key={node}>
              <div className="path-node">
                <span className="node-id">{node}</span>
                {index === 0 && <span className="node-label">START</span>}
                {index === route.path.length - 1 && <span className="node-label">END</span>}
              </div>
              {index < route.path.length - 1 && (
                <div className="path-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="algorithm-info">
        <div className="algorithm-card">
          <h4>🧠 Algorithm Details</h4>
          <div className="algorithm-details">
            <div className="detail-item">
              <span className="detail-label">Algorithm:</span>
              <span className="detail-value">Dijkstra's Shortest Path</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Data Structure:</span>
              <span className="detail-value">Priority Queue (Min-Heap)</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Nodes Explored:</span>
              <span className="detail-value">{route.visitedNodes?.length || 0}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Optimization:</span>
              <span className="detail-value">Real-time Traffic Weights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;