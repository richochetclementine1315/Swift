import React, { useEffect, useState, useCallback } from 'react';
import { dijkstra, generateCityGraph, generateEmergencyData } from '../utils/dijkstra';
import './CityMap.css';

const CityMap = ({ 
  selectedIncident, 
  selectedEmergencyCenter, 
  route, 
  isCalculating,
  onIncidentSelect, 
  onEmergencyCenterSelect, 
  onRouteCalculated 
}) => {
  const [cityData, setCityData] = useState(null);
  const [animatingRoute, setAnimatingRoute] = useState([]);

  useEffect(() => {
    const { graph, nodes } = generateCityGraph(8);
    const { emergencyCenters, incidents } = generateEmergencyData(nodes);
    
    setCityData({
      graph,
      nodes,
      emergencyCenters,
      incidents
    });
  }, []);

  // Calculate route when both incident and emergency center are selected
  useEffect(() => {
    if (selectedIncident && selectedEmergencyCenter && cityData && isCalculating) {
      const startNode = selectedEmergencyCenter.node;
      const endNode = selectedIncident.node;
      
      // Simulate calculation delay for realism
      setTimeout(() => {
        const calculatedRoute = dijkstra(cityData.graph, startNode, endNode);
        onRouteCalculated(calculatedRoute);
        
        // Animate route drawing
        if (calculatedRoute) {
          setAnimatingRoute([]);
          animateRoute(calculatedRoute.path);
        }
      }, 1000);
    }
  }, [selectedIncident, selectedEmergencyCenter, cityData, isCalculating, onRouteCalculated]);

  const animateRoute = useCallback((path) => {
    let index = 0;
    const animationInterval = setInterval(() => {
      if (index < path.length) {
        setAnimatingRoute(prev => [...prev, path[index]]);
        index++;
      } else {
        clearInterval(animationInterval);
      }
    }, 200);
  }, []);

  const getNodePosition = (nodeId) => {
    const [x, y] = nodeId.split('-').map(Number);
    return {
      x: x * 80 + 60,
      y: y * 80 + 60
    };
  };

  const getRoadWeight = (node1, node2) => {
    if (!cityData?.graph[node1] || !cityData.graph[node1][node2]) return 0;
    return cityData.graph[node1][node2].weight;
  };

  const getRoadColor = (weight) => {
    if (weight < 1.2) return '#4CAF50'; // Green - light traffic
    if (weight < 2.0) return '#FF9800'; // Orange - moderate traffic
    if (weight < 3.0) return '#F44336'; // Red - heavy traffic
    return '#9C27B0'; // Purple - blocked/very slow
  };

  const isNodeInRoute = (nodeId) => {
    return route?.path?.includes(nodeId) || animatingRoute.includes(nodeId);
  };

  const isRoadInRoute = (node1, node2) => {
    if (!route?.path) return false;
    const path = route.path;
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === node1 && path[i + 1] === node2) || 
          (path[i] === node2 && path[i + 1] === node1)) {
        return true;
      }
    }
    return false;
  };

  if (!cityData) {
    return (
      <div className="city-map-loading">
        <div className="loading-spinner">🏗️</div>
        <p>Building city infrastructure...</p>
      </div>
    );
  }

  return (
    <div className="city-map">
      <div className="map-header">
        <h3>🗺️ City Emergency Response Map</h3>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: '#4CAF50'}}></span>
            Light Traffic
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: '#FF9800'}}></span>
            Moderate Traffic
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: '#F44336'}}></span>
            Heavy Traffic
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: '#9C27B0'}}></span>
            Blocked/Very Slow
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <svg width="700" height="700" viewBox="0 0 700 700" className="city-grid">
          {/* Draw roads */}
          {cityData.nodes.map(node => {
            const pos = getNodePosition(node.id);
            const roads = [];
            
            // Horizontal roads
            if (node.x < 7) {
              const rightNeighbor = `${node.x + 1}-${node.y}`;
              const rightPos = getNodePosition(rightNeighbor);
              const weight = getRoadWeight(node.id, rightNeighbor);
              const isInRoute = isRoadInRoute(node.id, rightNeighbor);
              
              roads.push(
                <line
                  key={`h-${node.id}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={rightPos.x}
                  y2={rightPos.y}
                  stroke={isInRoute ? '#FFD700' : getRoadColor(weight)}
                  strokeWidth={isInRoute ? 6 : 4}
                  className={isInRoute ? 'route-road pulse' : 'road'}
                />
              );
            }
            
            // Vertical roads
            if (node.y < 7) {
              const bottomNeighbor = `${node.x}-${node.y + 1}`;
              const bottomPos = getNodePosition(bottomNeighbor);
              const weight = getRoadWeight(node.id, bottomNeighbor);
              const isInRoute = isRoadInRoute(node.id, bottomNeighbor);
              
              roads.push(
                <line
                  key={`v-${node.id}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={bottomPos.x}
                  y2={bottomPos.y}
                  stroke={isInRoute ? '#FFD700' : getRoadColor(weight)}
                  strokeWidth={isInRoute ? 6 : 4}
                  className={isInRoute ? 'route-road pulse' : 'road'}
                />
              );
            }
            
            return roads;
          })}
          
          {/* Draw intersections */}
          {cityData.nodes.map(node => {
            const pos = getNodePosition(node.id);
            const isInRoute = isNodeInRoute(node.id);
            
            return (
              <circle
                key={node.id}
                cx={pos.x}
                cy={pos.y}
                r={isInRoute ? 8 : 5}
                fill={isInRoute ? '#FFD700' : '#333'}
                stroke={isInRoute ? '#FF6B35' : '#666'}
                strokeWidth={2}
                className={isInRoute ? 'route-intersection pulse' : 'intersection'}
              />
            );
          })}
          
          {/* Emergency Centers */}
          {cityData.emergencyCenters.map(center => {
            const pos = getNodePosition(center.node);
            const isSelected = selectedEmergencyCenter?.id === center.id;
            
            return (
              <g key={center.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={20}
                  fill={isSelected ? '#FF6B35' : '#2196F3'}
                  stroke={isSelected ? '#FF6B35' : '#1976D2'}
                  strokeWidth={3}
                  className={`emergency-center ${isSelected ? 'selected pulse' : ''}`}
                  onClick={() => onEmergencyCenterSelect(center)}
                />
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  className="emergency-icon"
                >
                  {center.icon}
                </text>
                <text
                  x={pos.x}
                  y={pos.y - 35}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  className="emergency-label"
                >
                  {center.name}
                </text>
              </g>
            );
          })}
          
          {/* Incidents */}
          {cityData.incidents.map(incident => {
            const pos = getNodePosition(incident.node);
            const isSelected = selectedIncident?.id === incident.id;
            const severityColor = {
              low: '#4CAF50',
              medium: '#FF9800',
              high: '#FF5722',
              critical: '#D32F2F'
            };
            
            return (
              <g key={incident.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={18}
                  fill={isSelected ? '#FF6B35' : severityColor[incident.severity]}
                  stroke={isSelected ? '#FF6B35' : '#fff'}
                  strokeWidth={3}
                  className={`incident ${isSelected ? 'selected pulse' : 'pulse'}`}
                  onClick={() => onIncidentSelect(incident)}
                />
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  className="incident-icon"
                >
                  {incident.icon}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 45}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  className="incident-label"
                >
                  {incident.name}
                </text>
              </g>
            );
          })}
          
          {/* Route animation */}
          {isCalculating && (
            <g>
              <circle cx="350" cy="350" r="30" fill="none" stroke="#FFD700" strokeWidth="3" className="calculating">
                <animate attributeName="r" values="20;40;20" dur="1s" repeatCount="indefinite"/>
              </circle>
              <text x="350" y="355" textAnchor="middle" fill="#FFD700" fontSize="16">
                🔄
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default CityMap;