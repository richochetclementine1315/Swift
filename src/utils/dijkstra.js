// Priority Queue implementation for Dijkstra's algorithm
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift().element;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Dijkstra's Algorithm implementation
export const dijkstra = (graph, start, end) => {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  
  // Initialize distances
  for (let vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    previous[vertex] = null;
    pq.enqueue(vertex, distances[vertex]);
  }

  while (!pq.isEmpty()) {
    const currentVertex = pq.dequeue();
    
    if (currentVertex === end) {
      // Build path
      const path = [];
      let current = end;
      while (current !== null) {
        path.unshift(current);
        current = previous[current];
      }
      
      return {
        path,
        distance: distances[end],
        visitedNodes: Object.keys(distances).filter(node => distances[node] !== Infinity)
      };
    }

    if (distances[currentVertex] === Infinity) {
      continue;
    }

    for (let neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor].weight;
      const altDistance = distances[currentVertex] + weight;

      if (altDistance < distances[neighbor]) {
        distances[neighbor] = altDistance;
        previous[neighbor] = currentVertex;
        pq.enqueue(neighbor, altDistance);
      }
    }
  }

  return null; // No path found
};

// Generate city graph with realistic weights
export const generateCityGraph = (gridSize = 8) => {
  const graph = {};
  const nodes = [];
  
  // Create grid of intersections
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const nodeId = `${x}-${y}`;
      nodes.push({ id: nodeId, x, y });
      graph[nodeId] = {};
    }
  }

  // Connect adjacent nodes with weighted edges
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const nodeId = `${x}-${y}`;
      
      // Connect to right neighbor
      if (x < gridSize - 1) {
        const rightNeighbor = `${x + 1}-${y}`;
        const weight = calculateRoadWeight(x, y, x + 1, y);
        graph[nodeId][rightNeighbor] = { weight, type: 'horizontal' };
        graph[rightNeighbor][nodeId] = { weight, type: 'horizontal' };
      }
      
      // Connect to bottom neighbor
      if (y < gridSize - 1) {
        const bottomNeighbor = `${x}-${y + 1}`;
        const weight = calculateRoadWeight(x, y, x, y + 1);
        graph[nodeId][bottomNeighbor] = { weight, type: 'vertical' };
        graph[bottomNeighbor][nodeId] = { weight, type: 'vertical' };
      }
    }
  }

  return { graph, nodes };
};

// Calculate realistic road weights based on various factors
const calculateRoadWeight = (x1, y1, x2, y2) => {
  let baseWeight = 1; // Base travel time
  
  // Traffic patterns - higher traffic in city center
  const centerX = 4, centerY = 4;
  const distanceFromCenter = Math.abs(x1 - centerX) + Math.abs(y1 - centerY) + 
                           Math.abs(x2 - centerX) + Math.abs(y2 - centerY);
  const trafficMultiplier = Math.max(1, 3 - distanceFromCenter * 0.3);
  
  // Main roads (every 2nd road) are faster
  const isMainRoad = (x1 % 2 === 0 && x2 % 2 === 0) || (y1 % 2 === 0 && y2 % 2 === 0);
  const roadTypeMultiplier = isMainRoad ? 0.7 : 1.0;
  
  // Random traffic conditions
  const randomTrafficMultiplier = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
  
  // Traffic signals - add delay at major intersections
  const hasTrafficSignal = (x1 % 2 === 0 && y1 % 2 === 0) || (x2 % 2 === 0 && y2 % 2 === 0);
  const signalDelay = hasTrafficSignal ? 0.3 : 0;
  
  // Calculate final weight
  const weight = baseWeight * trafficMultiplier * roadTypeMultiplier * randomTrafficMultiplier + signalDelay;
  
  return Math.round(weight * 10) / 10; // Round to 1 decimal place
};

// Generate emergency centers and incidents
export const generateEmergencyData = (nodes) => {
  const emergencyCenters = [
    { id: 'hospital-1', name: 'City General Hospital', type: 'hospital', node: '1-1', icon: '🏥' },
    { id: 'fire-1', name: 'Fire Station Alpha', type: 'fire', node: '6-2', icon: '🚒' },
    { id: 'police-1', name: 'Police HQ', type: 'police', node: '2-6', icon: '🚔' },
    { id: 'fire-2', name: 'Fire Station Beta', type: 'fire', node: '5-5', icon: '🚒' },
  ];

  const incidents = [
    { id: 'incident-1', name: 'Car Accident', type: 'accident', node: '4-3', severity: 'high', icon: '🚗💥' },
    { id: 'incident-2', name: 'Building Fire', type: 'fire', node: '7-1', severity: 'critical', icon: '🔥🏢' },
    { id: 'incident-3', name: 'Medical Emergency', type: 'medical', node: '1-4', severity: 'medium', icon: '🚑' },
    { id: 'incident-4', name: 'Robbery in Progress', type: 'crime', node: '6-6', severity: 'high', icon: '🏪💰' },
  ];

  return { emergencyCenters, incidents };
};

// Calculate route statistics
export const calculateRouteStats = (route, graph) => {
  if (!route || !route.path || route.path.length < 2) {
    return null;
  }

  let totalTime = 0;
  let totalDistance = 0;
  const roadTypes = { main: 0, secondary: 0 };
  const conditions = { normal: 0, heavy: 0, blocked: 0 };

  for (let i = 0; i < route.path.length - 1; i++) {
    const current = route.path[i];
    const next = route.path[i + 1];
    
    if (graph[current] && graph[current][next]) {
      const edge = graph[current][next];
      totalTime += edge.weight;
      totalDistance += 1; // Each edge represents 1 block
      
      // Categorize road types and conditions based on weight
      if (edge.weight < 1.0) {
        roadTypes.main++;
        conditions.normal++;
      } else if (edge.weight < 2.0) {
        roadTypes.secondary++;
        conditions.normal++;
      } else if (edge.weight < 3.0) {
        roadTypes.secondary++;
        conditions.heavy++;
      } else {
        roadTypes.secondary++;
        conditions.blocked++;
      }
    }
  }

  return {
    estimatedTime: Math.round(totalTime * 100) / 100,
    totalBlocks: totalDistance,
    roadTypes,
    trafficConditions: conditions,
    efficiency: Math.round((route.path.length / totalTime) * 100) / 100
  };
};