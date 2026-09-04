/**
 * Global state management for the optimization system
 * Uses Zustand for simple, effective state management
 */

import { create } from 'zustand';
import {
  Vehicle,
  CollectionPoint,
  Coefficients,
  EventLog,
  SimulationState,
  OptimizationResult,
  CheckpointVerification,
} from '../types';
import {
  optimizeRoute,
  reoptimizeRoute,
  updateVehicleState,
  normalizeCoefficients,
} from '../engine/optimizationEngine';
import {
  initialVehicle,
  initialCollectionPoints,
  defaultCoefficients,
  checkpointActuals,
  liveUpdatePoint,
} from '../data/demoData';

interface OptimizationStore {
  // Core state
  vehicle: Vehicle;
  collectionPoints: CollectionPoint[];
  coefficients: Coefficients;
  optimizationResult: OptimizationResult | null;
  
  // Simulation state
  simulationState: SimulationState;
  simulationStep: number;
  eventLog: EventLog[];
  
  // UI state
  selectedPointId: string | null;
  checkpointVerification: CheckpointVerification | null;
  showMathPanel: boolean;
  showDecisionTrace: boolean;
  
  // Actions
  initialize: () => void;
  runOptimization: () => void;
  updateCoefficients: (newCoefficients: Partial<Coefficients>) => void;
  arriveAtCheckpoint: (pointId: string) => void;
  verifyCollection: (pointId: string, actualWeight: number, actualVolume: number) => void;
  addCollectionPoint: (point: CollectionPoint) => void;
  updateCollectionPoint: (pointId: string, updates: Partial<CollectionPoint>) => void;
  simulateLiveUpdate: () => void;
  togglePointAvailability: (pointId: string) => void;
  updateVehicleCapacity: (maxWeight: number, maxVolume: number) => void;
  selectPoint: (pointId: string | null) => void;
  addEventLog: (type: EventLog['type'], message: string, details?: string) => void;
  clearEventLog: () => void;
  
  // Simulation controls
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: () => void;
  resetSimulation: () => void;
}

export const useOptimizationStore = create<OptimizationStore>((set, get) => ({
  // Initial state
  vehicle: initialVehicle,
  collectionPoints: initialCollectionPoints,
  coefficients: defaultCoefficients,
  optimizationResult: null,
  simulationState: 'idle',
  simulationStep: 0,
  eventLog: [],
  selectedPointId: null,
  checkpointVerification: null,
  showMathPanel: true,
  showDecisionTrace: true,
  
  // Initialize and run first optimization
  initialize: () => {
    const { vehicle, collectionPoints, coefficients } = get();
    
    const result = optimizeRoute(vehicle, collectionPoints, coefficients);
    
    set({
      optimizationResult: result,
    });
    
    get().addEventLog(
      'OPTIMIZATION',
      'System initialized',
      'Initial optimization complete'
    );
  },
  
  // Run optimization
  runOptimization: () => {
    const { vehicle, collectionPoints, coefficients } = get();
    
    get().addEventLog(
      'OPTIMIZATION',
      'Running optimization...',
      'Filtering feasible set and calculating scores'
    );
    
    const result = optimizeRoute(vehicle, collectionPoints, coefficients);
    
    set({
      optimizationResult: result,
    });
    
    if (result.selectedPoint) {
      get().addEventLog(
        'OPTIMIZATION',
        `Best point selected: ${result.selectedPoint.name}`,
        `Score: ${result.selectedPoint.score.toFixed(4)}`
      );
    } else {
      get().addEventLog(
        'OPTIMIZATION',
        'No feasible points available',
        'Vehicle capacity exhausted or no points available'
      );
    }
  },
  
  // Update coefficients
  updateCoefficients: (newCoefficients) => {
    const currentCoefficients = get().coefficients;
    const updatedCoefficients = { ...currentCoefficients, ...newCoefficients };
    const normalizedCoefficients = normalizeCoefficients(updatedCoefficients);
    
    set({
      coefficients: normalizedCoefficients,
    });
    
    get().addEventLog(
      'OPTIMIZATION',
      'Coefficients updated',
      `α=${normalizedCoefficients.alpha.toFixed(2)} β=${normalizedCoefficients.beta.toFixed(2)} γ=${normalizedCoefficients.gamma.toFixed(2)} δ=${normalizedCoefficients.delta.toFixed(2)}`
    );
    
    // Re-optimize with new coefficients
    get().runOptimization();
  },
  
  // Arrive at checkpoint
  arriveAtCheckpoint: (pointId) => {
    const { collectionPoints } = get();
    const point = collectionPoints.find((p) => p.id === pointId);
    
    if (!point) return;
    
    get().addEventLog(
      'CHECKPOINT',
      `Vehicle arrived at ${point.name}`,
      `Estimated: ${point.estimatedWeight}kg / ${point.estimatedVolume}m³`
    );
    
    // Get actual values from checkpoint data or use estimates with small variance
    const actuals = checkpointActuals[pointId] || {
      weight: point.estimatedWeight * (0.9 + Math.random() * 0.2),
      volume: point.estimatedVolume * (0.9 + Math.random() * 0.2),
    };
    
    set({
      checkpointVerification: {
        pointId,
        estimatedWeight: point.estimatedWeight,
        estimatedVolume: point.estimatedVolume,
        actualWeight: actuals.weight,
        actualVolume: actuals.volume,
      },
    });
  },
  
  // Verify collection with actual data
  verifyCollection: (pointId, actualWeight, actualVolume) => {
    const { vehicle, collectionPoints } = get();
    const point = collectionPoints.find((p) => p.id === pointId);
    
    if (!point) return;
    
    get().addEventLog(
      'VEHICLE',
      'Collection verified',
      `Actual: ${actualWeight.toFixed(1)}kg / ${actualVolume.toFixed(2)}m³`
    );
    
    // Update vehicle state
    const updatedVehicle = updateVehicleState(
      vehicle,
      actualWeight,
      actualVolume,
      { latitude: point.latitude, longitude: point.longitude }
    );
    
    // Mark point as collected
    const updatedPoints = collectionPoints.map((p) =>
      p.id === pointId
        ? { ...p, collected: true, actualWeight, actualVolume }
        : p
    );
    
    set({
      vehicle: updatedVehicle,
      collectionPoints: updatedPoints,
      checkpointVerification: null,
    });
    
    get().addEventLog(
      'VEHICLE',
      'Vehicle state updated',
      `Current: ${updatedVehicle.currentWeight}kg / ${updatedVehicle.currentVolume}m³`
    );
    
    get().addEventLog(
      'OPTIMIZATION',
      'Re-optimizing route...',
      'Recalculating feasible set and scores'
    );
    
    // Re-optimize
    get().runOptimization();
  },
  
  // Add new collection point
  addCollectionPoint: (point) => {
    const { collectionPoints } = get();
    
    set({
      collectionPoints: [...collectionPoints, point],
    });
    
    get().addEventLog(
      'NETWORK',
      `New collection point: ${point.name}`,
      `${point.estimatedWeight}kg / ${point.estimatedVolume}m³`
    );
    
    // Re-optimize with new point
    get().runOptimization();
  },
  
  // Update collection point
  updateCollectionPoint: (pointId, updates) => {
    const { collectionPoints } = get();
    
    const updatedPoints = collectionPoints.map((p) =>
      p.id === pointId ? { ...p, ...updates } : p
    );
    
    set({
      collectionPoints: updatedPoints,
    });
    
    get().addEventLog(
      'NETWORK',
      `Collection point updated: ${pointId}`,
      'Point data modified'
    );
    
    // Re-optimize with updated point
    get().runOptimization();
  },
  
  // Simulate live update (add P6)
  simulateLiveUpdate: () => {
    const { collectionPoints } = get();
    
    // Check if P6 already exists
    if (collectionPoints.some((p) => p.id === 'P6')) {
      get().addEventLog(
        'NETWORK',
        'Live update already simulated',
        'Point P6 already exists'
      );
      return;
    }
    
    get().addEventLog(
      'NETWORK',
      'Live update detected',
      'New collection point became available during route'
    );
    
    get().addCollectionPoint(liveUpdatePoint);
  },
  
  // Toggle point availability
  togglePointAvailability: (pointId) => {
    const { collectionPoints } = get();
    const point = collectionPoints.find((p) => p.id === pointId);
    
    if (!point) return;
    
    get().updateCollectionPoint(pointId, { available: !point.available });
  },
  
  // Update vehicle capacity
  updateVehicleCapacity: (maxWeight, maxVolume) => {
    const { vehicle } = get();
    
    const updatedVehicle = {
      ...vehicle,
      maxWeight,
      maxVolume,
    };
    
    set({
      vehicle: updatedVehicle,
    });
    
    get().addEventLog(
      'VEHICLE',
      'Vehicle capacity updated',
      `Max: ${maxWeight}kg / ${maxVolume}m³`
    );
    
    // Re-optimize with new capacity
    get().runOptimization();
  },
  
  // Select point for detailed view
  selectPoint: (pointId) => {
    set({
      selectedPointId: pointId,
    });
  },
  
  // Add event to log
  addEventLog: (type, message, details) => {
    const { eventLog } = get();
    
    const newEvent: EventLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type,
      message,
      details,
    };
    
    set({
      eventLog: [newEvent, ...eventLog].slice(0, 50), // Keep last 50 events
    });
  },
  
  // Clear event log
  clearEventLog: () => {
    set({
      eventLog: [],
    });
  },
  
  // Start simulation
  startSimulation: () => {
    set({
      simulationState: 'running',
    });
    
    get().addEventLog(
      'OPTIMIZATION',
      'Simulation started',
      'Automatic optimization cycle running'
    );
  },
  
  // Pause simulation
  pauseSimulation: () => {
    set({
      simulationState: 'paused',
    });
    
    get().addEventLog(
      'OPTIMIZATION',
      'Simulation paused',
      ''
    );
  },
  
  // Step simulation
  stepSimulation: () => {
    const { simulationStep } = get();
    
    set({
      simulationStep: simulationStep + 1,
    });
    
    // Execute next step based on current step
    // This will be implemented in the simulation component
  },
  
  // Reset simulation
  resetSimulation: () => {
    set({
      vehicle: initialVehicle,
      collectionPoints: initialCollectionPoints,
      coefficients: defaultCoefficients,
      optimizationResult: null,
      simulationState: 'idle',
      simulationStep: 0,
      selectedPointId: null,
      checkpointVerification: null,
    });
    
    get().clearEventLog();
    
    get().addEventLog(
      'OPTIMIZATION',
      'Simulation reset',
      'All data restored to initial state'
    );
    
    // Re-initialize
    get().initialize();
  },
}));
