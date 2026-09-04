# Smart Plastic Waste Collection Optimization Platform

**SIH 2026 Project**

## Overview

This is a polished, interactive web prototype demonstrating a real-time mathematical route optimization system for plastic waste collection. The platform implements a **Dynamic Capacity-Aware Greedy Re-Optimization** algorithm that continuously adapts to changing conditions.

## Core Features

### Mathematical Decision Engine

The system implements the exact optimization formula:

```
Score_i = α(W_hat_i / W_rem) + β(V_hat_i / V_rem) - γ(D_i / D_max) - δ(T_i / T_max)
```

Where:
- **α, β**: Weight and volume utilization priorities
- **γ, δ**: Distance and time penalties
- All coefficients must sum to 1.0

### Key Capabilities

1. **Feasibility Filtering**: Automatically filters collection points based on:
   - Availability status
   - Accessibility
   - Remaining weight capacity
   - Remaining volume capacity

2. **Real-Time Scoring**: Calculates normalized scores for all feasible points using the mathematical formula

3. **Dynamic Re-Optimization**: Recalculates routes when:
   - Vehicle reaches a checkpoint (actual data replaces estimates)
   - New collection points become available during operation
   - Vehicle capacity changes

4. **Checkpoint Verification**: Compares estimated vs actual collection data

5. **Live Event Logging**: Tracks all vehicle, network, and optimization events

6. **Interactive Controls**: Adjust coefficients in real-time to see how decisions change

## Installation & Setup

### Prerequisites

You need Node.js and npm installed. If not available, install them:

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc

# Install Node.js LTS
nvm install --lts

# Verify installation
node --version
npm --version
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

### Demo Scenario

1. **Initial State**: Vehicle starts with 220kg/6m³ loaded, 280kg/4m³ remaining capacity
2. **Collection Points**: 5 points (P1-P5) with varying weights, volumes, and availability
3. **P3 is rejected**: Exceeds both weight and volume capacity
4. **P4 is rejected**: Currently unavailable
5. **Algorithm selects**: Highest scoring feasible point (P1, P2, or P5)

### Step-by-Step Operation

1. **View Initial Optimization**: System automatically calculates best next point
2. **Click "ARRIVE AT CHECKPOINT"**: Simulates vehicle reaching the selected point
3. **Verify Collection**: Adjust sliders to set actual weight/volume collected
4. **Watch Re-Optimization**: System recalculates with updated vehicle state
5. **Add Live Update**: Click "SIMULATE LIVE UPDATE" to add point P6 during route
6. **Adjust Coefficients**: Use sliders to change optimization priorities
7. **Use Simulation Controls**: 
   - **RUN**: Automatic cycle execution
   - **PAUSE**: Stop automatic execution
   - **STEP**: Advance one stage (for presentations)
   - **RESET**: Return to initial scenario

### Understanding the UI

- **Green points**: Feasible collection points
- **Red points**: Rejected (capacity exceeded or unavailable)
- **Gray points**: Already collected
- **Yellow border**: Currently selected next point
- **Blue line**: Route to selected point

## Architecture

### Mathematical Engine (`/src/engine`)

- Pure TypeScript implementation
- Zero dependencies on UI
- Implements exact formula from requirements
- Haversine distance calculation
- Complete feasibility checking
- Normalized scoring

### State Management (`/src/store`)

- Zustand for lightweight global state
- Centralized optimization logic
- Event logging system
- Simulation control

### Components (`/src/components`)

- **VehicleState**: Capacity visualization with progress bars
- **NextPointRecommendation**: Shows selected point and score
- **MapView**: Visual route representation
- **FeasibilityPanel**: Constraint checking display
- **MathematicalScoring**: Formula and coefficient controls
- **PointRankingTable**: Sorted list of feasible points
- **DecisionTrace**: Mathematical reasoning explanation
- **EventLog**: Real-time event history
- **CheckpointVerification**: Actual vs estimated comparison
- **SimulationControls**: Run/pause/step/reset buttons

## Mobile Support

The application is fully responsive with mobile-first design:

- Touch-friendly buttons (44px minimum)
- Vertical stacking on small screens
- Optimized for 320px-390px widths
- PWA-ready with manifest
- Works on iOS and Android

## Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **SVG-based map** (production version would use Leaflet + OpenStreetMap)

## Demo Data

All demo data uses real Mumbai coordinates:
- Vehicle starts near Mumbai city center (19.0760°, 72.8777°)
- Collection points distributed across the city
- Realistic distances and travel times
- Predefined actual collection values for simulation

## Key Differences from Generic Systems

This is **NOT** a generic recycling dashboard. Key differentiators:

1. **Real Mathematical Engine**: Actual optimization algorithm, not hardcoded recommendations
2. **Dynamic Re-Optimization**: Route changes based on real-time data
3. **Constraint Enforcement**: Points are genuinely filtered by capacity
4. **Mathematical Transparency**: Every decision is explainable
5. **Interactive Exploration**: Change parameters and see results immediately
6. **Simulation Mode**: Step-through execution for demonstrations

## Success Criteria

A judge should understand within 60 seconds:

1. Collection points are filtered using **real physical constraints**
2. Remaining points are **mathematically scored**
3. The **highest-scoring feasible point** is selected
4. **Actual pickup data** changes the vehicle state
5. **New information** can arrive during the journey
6. The system **recalculates** and dynamically chooses the next point

## Project Structure

```
/src
  /components     # UI components
  /engine         # Mathematical optimization engine
  /store          # State management
  /data           # Demo scenario data
  /types          # TypeScript interfaces
  /utils          # Helper functions
```

## License

SIH 2026 Project
