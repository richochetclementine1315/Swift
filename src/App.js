import React, { useState, useCallback } from 'react';
import CityMap from './components/CityMap';
import ControlPanel from './components/ControlPanel';
import RouteInfo from './components/RouteInfo';
import './App.css';

const App = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedEmergencyCenter, setSelectedEmergencyCenter] = useState(null);
  const [route, setRoute] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleIncidentSelect = useCallback((incident) => {
    setSelectedIncident(incident);
    setRoute(null);
  }, []);

  const handleEmergencyCenterSelect = useCallback((center) => {
    setSelectedEmergencyCenter(center);
    setRoute(null);
  }, []);

  const handleRouteCalculated = useCallback((calculatedRoute) => {
    setRoute(calculatedRoute);
    setIsCalculating(false);
  }, []);

  const handleFindRoute = useCallback(() => {
    if (selectedIncident && selectedEmergencyCenter) {
      setIsCalculating(true);
      setRoute(null);
    }
  }, [selectedIncident, selectedEmergencyCenter]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚨 Emergency Response Fast-Route System</h1>
        <p>Dijkstra's Algorithm for Emergency Vehicle Routing</p>
      </header>
      
      <div className="app-content">
        <div className="map-section">
          <CityMap
            selectedIncident={selectedIncident}
            selectedEmergencyCenter={selectedEmergencyCenter}
            route={route}
            isCalculating={isCalculating}
            onIncidentSelect={handleIncidentSelect}
            onEmergencyCenterSelect={handleEmergencyCenterSelect}
            onRouteCalculated={handleRouteCalculated}
          />
        </div>
        
        <div className="control-section">
          <ControlPanel
            selectedIncident={selectedIncident}
            selectedEmergencyCenter={selectedEmergencyCenter}
            onFindRoute={handleFindRoute}
            isCalculating={isCalculating}
          />
          
          {route && (
            <RouteInfo route={route} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;