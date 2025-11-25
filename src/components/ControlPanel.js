import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
  selectedIncident, 
  selectedEmergencyCenter, 
  onFindRoute, 
  isCalculating 
}) => {
  const canCalculateRoute = selectedIncident && selectedEmergencyCenter && !isCalculating;

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#FF5722',
      critical: '#D32F2F'
    };
    return colors[severity] || '#666';
  };

  const getEmergencyTypeColor = (type) => {
    const colors = {
      hospital: '#2196F3',
      fire: '#FF5722',
      police: '#9C27B0'
    };
    return colors[type] || '#666';
  };

  return (
    <div className="control-panel">
      <h3>🎛️ Emergency Response Control</h3>
      
      <div className="selection-section">
        <div className="selection-card">
          <h4>🚨 Selected Incident</h4>
          {selectedIncident ? (
            <div className="selected-item incident-card">
              <div className="item-header">
                <span className="item-icon">{selectedIncident.icon}</span>
                <span className="item-name">{selectedIncident.name}</span>
              </div>
              <div className="item-details">
                <span 
                  className="severity-badge"
                  style={{ backgroundColor: getSeverityColor(selectedIncident.severity) }}
                >
                  {selectedIncident.severity.toUpperCase()}
                </span>
                <span className="location-info">
                  📍 Grid: {selectedIncident.node}
                </span>
              </div>
              <div className="item-type">
                Type: {selectedIncident.type}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Click on a red pulsing circle on the map to select an incident</p>
              <div className="instruction-icons">
                🚗💥 🔥🏢 🚑 🏪💰
              </div>
            </div>
          )}
        </div>

        <div className="selection-card">
          <h4>🚒 Selected Emergency Center</h4>
          {selectedEmergencyCenter ? (
            <div className="selected-item center-card">
              <div className="item-header">
                <span className="item-icon">{selectedEmergencyCenter.icon}</span>
                <span className="item-name">{selectedEmergencyCenter.name}</span>
              </div>
              <div className="item-details">
                <span 
                  className="type-badge"
                  style={{ backgroundColor: getEmergencyTypeColor(selectedEmergencyCenter.type) }}
                >
                  {selectedEmergencyCenter.type.toUpperCase()}
                </span>
                <span className="location-info">
                  📍 Grid: {selectedEmergencyCenter.node}
                </span>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Click on a blue circle on the map to select an emergency center</p>
              <div className="instruction-icons">
                🏥 🚒 🚔
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="action-section">
        <button 
          className={`find-route-btn ${canCalculateRoute ? 'enabled' : 'disabled'}`}
          onClick={onFindRoute}
          disabled={!canCalculateRoute}
        >
          {isCalculating ? (
            <>
              <span className="spinner">🔄</span>
              Calculating Route...
            </>
          ) : (
            <>
              <span>🗺️</span>
              Find Fastest Route
            </>
          )}
        </button>
        
        {!canCalculateRoute && !isCalculating && (
          <p className="instruction-text">
            Select both an incident and an emergency center to calculate route
          </p>
        )}
      </div>

      <div className="info-section">
        <div className="info-card">
          <h4>ℹ️ How It Works</h4>
          <ul className="info-list">
            <li>🎯 Select an emergency incident (red circles)</li>
            <li>🏢 Choose an emergency response center (blue circles)</li>
            <li>⚡ Dijkstra's algorithm finds the optimal path</li>
            <li>🚦 Considers traffic, signals, and road conditions</li>
            <li>📊 View detailed route statistics below</li>
          </ul>
        </div>

        <div className="info-card">
          <h4>🚨 Emergency Types</h4>
          <div className="emergency-types">
            <div className="type-item">
              <span>🏥</span> Hospitals - Medical emergencies
            </div>
            <div className="type-item">
              <span>🚒</span> Fire Stations - Fire incidents
            </div>
            <div className="type-item">
              <span>🚔</span> Police - Crime & accidents
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;