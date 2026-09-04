/**
 * Demo scenario data for simulation
 * 
 * This implements the exact demo story specified in the requirements
 */

import { Vehicle, CollectionPoint, Coefficients } from '../types';

/**
 * Initial vehicle state
 * Location: Mumbai coordinates (approximate city center)
 */
export const initialVehicle: Vehicle = {
  id: 'V1',
  maxWeight: 500, // kg
  maxVolume: 10, // m³
  currentWeight: 220, // kg
  currentVolume: 6, // m³
  latitude: 19.0760, // Mumbai
  longitude: 72.8777,
};

/**
 * Initial collection points
 * Distributed around Mumbai area with realistic distances
 */
export const initialCollectionPoints: CollectionPoint[] = [
  {
    id: 'P1',
    name: 'Bandra Collection Hub',
    latitude: 19.0596,
    longitude: 72.8295,
    available: true,
    accessible: true,
    estimatedWeight: 80, // kg
    estimatedVolume: 1.5, // m³
    distance: 0, // Will be calculated
    travelTime: 0, // Will be calculated
    score: 0,
    feasible: true,
    collected: false,
  },
  {
    id: 'P2',
    name: 'Andheri Recycling Center',
    latitude: 19.1136,
    longitude: 72.8697,
    available: true,
    accessible: true,
    estimatedWeight: 150, // kg
    estimatedVolume: 2.0, // m³
    distance: 0,
    travelTime: 0,
    score: 0,
    feasible: true,
    collected: false,
  },
  {
    id: 'P3',
    name: 'Churchgate Commercial',
    latitude: 18.9322,
    longitude: 72.8264,
    available: true,
    accessible: true,
    estimatedWeight: 300, // kg - EXCEEDS CAPACITY
    estimatedVolume: 4.5, // m³ - EXCEEDS CAPACITY
    distance: 0,
    travelTime: 0,
    score: 0,
    feasible: false,
    collected: false,
  },
  {
    id: 'P4',
    name: 'Dadar Junction Point',
    latitude: 19.0176,
    longitude: 72.8561,
    available: false, // UNAVAILABLE
    accessible: true,
    estimatedWeight: 50, // kg
    estimatedVolume: 0.8, // m³
    distance: 0,
    travelTime: 0,
    score: 0,
    feasible: false,
    collected: false,
  },
  {
    id: 'P5',
    name: 'Powai Lake Area',
    latitude: 19.1197,
    longitude: 72.9059,
    available: true,
    accessible: true,
    estimatedWeight: 100, // kg
    estimatedVolume: 1.2, // m³
    distance: 0,
    travelTime: 0,
    score: 0,
    feasible: true,
    collected: false,
  },
];

/**
 * Additional point that appears during simulation (live update)
 */
export const liveUpdatePoint: CollectionPoint = {
  id: 'P6',
  name: 'Malad Residential Complex',
  latitude: 19.1867,
  longitude: 72.8484,
  available: true,
  accessible: true,
  estimatedWeight: 120, // kg
  estimatedVolume: 1.5, // m³
  distance: 0,
  travelTime: 0,
  score: 0,
  feasible: true,
  collected: false,
};

/**
 * Default coefficient values
 * α + β + γ + δ = 1
 */
export const defaultCoefficients: Coefficients = {
  alpha: 0.30, // weight utilization priority
  beta: 0.30, // volume utilization priority
  gamma: 0.20, // distance penalty
  delta: 0.20, // travel time penalty
};

/**
 * Actual collection data for checkpoint verification
 * Shows difference between estimated and actual values
 */
export const checkpointActuals: Record<string, { weight: number; volume: number }> = {
  P1: {
    weight: 72, // 8 kg less than estimated
    volume: 1.4, // 0.1 m³ less than estimated
  },
  P2: {
    weight: 145, // 5 kg less than estimated
    volume: 1.9, // 0.1 m³ less than estimated
  },
  P5: {
    weight: 95, // 5 kg less than estimated
    volume: 1.1, // 0.1 m³ less than estimated
  },
  P6: {
    weight: 118, // 2 kg less than estimated
    volume: 1.5, // same as estimated
  },
};

/**
 * Preset scenarios for demonstration
 */
export const presetScenarios = {
  default: {
    name: 'Default Demo Scenario',
    description: 'Standard optimization with capacity constraints',
    vehicle: initialVehicle,
    points: initialCollectionPoints,
    coefficients: defaultCoefficients,
  },
  highCapacityUtilization: {
    name: 'High Capacity Utilization',
    description: 'Prioritize filling the vehicle capacity',
    vehicle: initialVehicle,
    points: initialCollectionPoints,
    coefficients: {
      alpha: 0.40,
      beta: 0.40,
      gamma: 0.10,
      delta: 0.10,
    },
  },
  nearestFirst: {
    name: 'Nearest Point Priority',
    description: 'Minimize travel distance and time',
    vehicle: initialVehicle,
    points: initialCollectionPoints,
    coefficients: {
      alpha: 0.15,
      beta: 0.15,
      gamma: 0.35,
      delta: 0.35,
    },
  },
  balanced: {
    name: 'Balanced Optimization',
    description: 'Equal weight on all factors',
    vehicle: initialVehicle,
    points: initialCollectionPoints,
    coefficients: {
      alpha: 0.25,
      beta: 0.25,
      gamma: 0.25,
      delta: 0.25,
    },
  },
};
