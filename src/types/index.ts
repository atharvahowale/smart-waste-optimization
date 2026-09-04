// Core data structures for the optimization engine

export interface Vehicle {
  id: string;
  maxWeight: number; // kg
  maxVolume: number; // m³
  currentWeight: number; // kg
  currentVolume: number; // m³
  latitude: number;
  longitude: number;
}

export interface CollectionPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  available: boolean;
  accessible: boolean;
  estimatedWeight: number; // kg
  estimatedVolume: number; // m³
  actualWeight?: number; // kg - measured at checkpoint
  actualVolume?: number; // m³ - measured at checkpoint
  distance: number; // km from current vehicle position
  travelTime: number; // minutes
  score: number;
  feasible: boolean;
  collected: boolean;
}

export interface VehicleState {
  vehicle: Vehicle;
  remainingWeight: number; // kg
  remainingVolume: number; // m³
  currentLocation: { latitude: number; longitude: number };
}

export interface ScoreComponents {
  weightUtilization: number;
  volumeUtilization: number;
  distancePenalty: number;
  timePenalty: number;
  totalScore: number;
}

export interface ScoreResult {
  pointId: string;
  score: number;
  components: ScoreComponents;
  rank: number;
}

export interface FeasibilityResult {
  pointId: string;
  feasible: boolean;
  reasons: {
    available: boolean;
    accessible: boolean;
    weightFit: boolean;
    volumeFit: boolean;
  };
}

export interface OptimizationResult {
  selectedPoint: CollectionPoint | null;
  feasiblePoints: CollectionPoint[];
  rejectedPoints: CollectionPoint[];
  scores: ScoreResult[];
  vehicleState: VehicleState;
}

export interface Coefficients {
  alpha: number; // weight utilization priority
  beta: number; // volume utilization priority
  gamma: number; // distance penalty
  delta: number; // travel time penalty
}

export interface EventLog {
  id: string;
  timestamp: Date;
  type: 'VEHICLE' | 'NETWORK' | 'OPTIMIZATION' | 'CHECKPOINT';
  message: string;
  details?: string;
}

export interface CheckpointVerification {
  pointId: string;
  estimatedWeight: number;
  estimatedVolume: number;
  actualWeight: number;
  actualVolume: number;
}

export type SimulationState = 'idle' | 'running' | 'paused' | 'completed';

export interface SimulationStep {
  step: number;
  action: string;
  description: string;
  state: VehicleState;
  feasibleSet: string[];
  selectedPoint?: string;
}
