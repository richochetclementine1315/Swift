# 🚨 Emergency Response Fast-Route System

A React-based emergency response system that uses **Dijkstra's algorithm** with a **priority queue** to find the fastest routes for emergency vehicles through a simulated city.

## 🎯 Problem Solved

**Real-life scenario:** When emergency calls come in, dispatchers need to quickly determine which emergency response center should respond and what the fastest route is, considering real-time traffic conditions, road blocks, and signal delays.

## 🛠️ Technologies & Concepts Used

- **React.js** - Interactive user interface
- **Dijkstra's Algorithm** - Shortest path algorithm for optimal routing
- **Priority Queue (Min-Heap)** - Efficient data structure for algorithm implementation
- **Weighted Graph** - City representation with realistic road weights
- **Real-time Simulation** - Dynamic traffic conditions and road weights

## ✨ Features

### 🗺️ Interactive City Map
- **8x8 grid simulation** representing city blocks and intersections
- **Visual representation** of roads with color-coded traffic conditions
- **Interactive selection** of emergency incidents and response centers
- **Real-time route visualization** with animated path drawing

### 🚨 Emergency Response Centers
- **🏥 Hospitals** - For medical emergencies
- **🚒 Fire Stations** - For fire incidents and rescue operations  
- **🚔 Police Stations** - For crimes and traffic accidents

### 🔥 Emergency Incidents
- **Car Accidents** 🚗💥 - High priority incidents
- **Building Fires** 🔥🏢 - Critical priority incidents
- **Medical Emergencies** 🚑 - Medium priority incidents
- **Crimes in Progress** 🏪💰 - High priority incidents

### ⚡ Smart Routing Algorithm
- **Dijkstra's Algorithm** implementation with priority queue
- **Real-time traffic weights** including:
  - **Traffic density** (higher in city center)
  - **Road types** (main roads vs secondary roads)
  - **Traffic signals** (additional delay at major intersections)
  - **Random traffic conditions** (construction, accidents, etc.)

### 📊 Detailed Analytics
- **Route statistics** including estimated time and distance
- **Road composition** analysis (main roads vs secondary roads)
- **Traffic condition** breakdown
- **Algorithm performance** metrics
- **Step-by-step route** visualization

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or download the project:**
   ```bash
   cd TomProj
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎮 How to Use

### Step 1: Select an Emergency Incident
- Look for **red pulsing circles** on the map
- Click on any incident to select it
- View incident details in the control panel

### Step 2: Choose an Emergency Response Center
- Look for **blue circles** on the map
- Click on an appropriate emergency center
- Consider the type of emergency when selecting

### Step 3: Calculate the Fastest Route
- Click the **"Find Fastest Route"** button
- Watch as the algorithm calculates the optimal path
- View the **golden route** drawn on the map

### Step 4: Analyze the Results
- Review detailed **route statistics**
- Check **traffic conditions** along the route
- View **algorithm performance** metrics

## 🧠 Algorithm Details

### Dijkstra's Algorithm Implementation
```javascript
// Priority Queue for efficient node selection
class PriorityQueue {
  enqueue(element, priority)  // Add node with priority
  dequeue()                   // Remove node with lowest cost
}

// Main algorithm
function dijkstra(graph, start, end) {
  // Initialize distances and priority queue
  // Process nodes in order of lowest cost
  // Return optimal path and statistics
}
```

### Weight Calculation Factors
1. **Base Weight:** Standard travel time between intersections
2. **Traffic Density:** Higher in city center, decreases towards edges
3. **Road Type:** Main roads (every 2nd road) are 30% faster
4. **Traffic Signals:** 0.3 unit delay at major intersections
5. **Random Conditions:** Simulates real-time traffic (±20% variation)

### Real-world Applications
- **Emergency Dispatch Systems**
- **GPS Navigation** (Google Maps, Waze)
- **Logistics and Delivery** optimization
- **Public Transportation** route planning
- **Network Routing** protocols

## 🎨 Visual Features

### Color-Coded Traffic System
- 🟢 **Green:** Light traffic (weight < 1.2)
- 🟠 **Orange:** Moderate traffic (weight 1.2-2.0)
- 🔴 **Red:** Heavy traffic (weight 2.0-3.0)  
- 🟣 **Purple:** Blocked/Very slow (weight > 3.0)

### Interactive Elements
- **Hover effects** on all map elements
- **Pulse animations** for incidents and selected items
- **Route animation** with step-by-step path drawing
- **Responsive design** for desktop and mobile

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CityMap.js          # Main map visualization
│   ├── ControlPanel.js     # User controls and selection
│   ├── RouteInfo.js        # Route statistics display
│   └── *.css              # Component styles
├── utils/
│   └── dijkstra.js         # Algorithm implementation
├── App.js                  # Main application
└── index.js               # React entry point
```

## 🔧 Customization Options

### Modify City Size
```javascript
// In dijkstra.js
const { graph, nodes } = generateCityGraph(10); // Change from 8 to 10 for larger city
```

### Add New Emergency Types
```javascript
// In dijkstra.js - generateEmergencyData()
const emergencyCenters = [
  { id: 'ambulance-1', name: 'Ambulance Station', type: 'ambulance', node: '3-3', icon: '🚑' }
  // Add more emergency centers
];
```

### Adjust Traffic Weights
```javascript
// In dijkstra.js - calculateRoadWeight()
const trafficMultiplier = Math.max(1, 4 - distanceFromCenter * 0.5); // Increase traffic impact
```

## 📚 Educational Value

This project demonstrates:
- **Graph Theory** concepts in practice
- **Algorithm optimization** with data structures
- **Real-world problem solving** with computer science
- **Interactive visualization** of complex algorithms
- **React.js development** patterns and best practices

## 🚀 Potential Enhancements

- **Real-time traffic API** integration
- **Multiple vehicle types** with different constraints
- **Historical traffic data** analysis
- **Machine learning** for traffic prediction
- **3D visualization** with WebGL
- **Multi-objective optimization** (time vs fuel vs distance)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:
- Additional emergency types
- New visualization features  
- Algorithm optimizations
- UI/UX enhancements

---

**Made with ❤️ using React.js and Dijkstra's Algorithm**

*Perfect for computer science education, algorithm visualization, and understanding real-world applications of graph theory.*