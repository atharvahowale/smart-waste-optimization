/**
 * Mathematical Optimization Engine
 * 
 * Core algorithm implementation for dynamic capacity-aware route optimization
 * This module implements the exact scoring formula and optimization logic
 * specified in the requirements.
 */

import {
  Vehicle,
  CollectionPoint,
  VehicleState,
  ScoreResult,
  FeasibilityResult,
  OptimizationResult,
  Coefficients,
  ScoreComponents,
} from '../types';

/**
 * Calculate remaining capacity for the vehicle
 */
export function calculateRemainingCapacity(vehicle: Vehicle): {
  remainingWeight: number;
  remainingVolume: number;
} {
  const remainingWeight = vehicle.maxWeight - vehicle.currentWeight;
  const remainingVolume = vehicle.maxVolume - vehicle.currentVolume;
  
  return {
    remainingWeight: Math.max(0, remainingWeight),
    remainingVolume: Math.max(0, remainingVolume),
  };
}

/**
 * Calculate distance between two geographic points using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Estimate travel time based on distance (assumes average speed of 30 km/h)
 */
export function calculateTravelTime(distance: number): number {
  const averageSpeed = 30; // km/h
  const timeInHours = distance / averageSpeed;
  const timeInMinutes = timeInHours * 60;
  return timeInMinutes;
}

/**
 * Update collection point distances and travel times based on current vehicle location
 */
export function updatePointDistances(
  points: CollectionPoint[],
  vehicleLocation: { latitude: number; longitude: number }
): CollectionPoint[] {
  return points.map((point) => {
    const distance = calculateDistance(
      vehicleLocation.latitude,
      vehicleLocation.longitude,
      point.latitude,
      point.longitude
    );
    const travelTime = calculateTravelTime(distance);
    
    return {
      ...point,
      distance,
      travelTime,
    };
  });
}

/**
 * Check if a collection point is feasible
 * 
 * A point is feasible only if:
 * 1. Available (S_i = 1)
 * 2. Accessible (A_i = 1)
 * 3. Estimated weight fits (W_hat_i <= W_rem)
 * 4. Estimated volume fits (V_hat_i <= V_rem)
 */
export function isFeasible(
  point: CollectionPoint,
  remainingWeight: number,
  remainingVolume: number
): FeasibilityResult {
  const available = point.available && !point.collected;
  const accessible = point.accessible;
  const weightFit = point.estimatedWeight <= remainingWeight;
  const volumeFit = point.estimatedVolume <= remainingVolume;
  
  const feasible = available && accessible && weightFit && volumeFit;
  
  return {
    pointId: point.id,
    feasible,
    reasons: {
      available,
      accessible,
      weightFit,
      volumeFit,
    },
  };
}

/**
 * Filter collection points to get the feasible set
 */
export function filterFeasiblePoints(
  points: CollectionPoint[],
  remainingWeight: number,
  remainingVolume: number
): {
  feasiblePoints: CollectionPoint[];
  rejectedPoints: CollectionPoint[];
  feasibilityResults: FeasibilityResult[];
} {
  const feasiblePoints: CollectionPoint[] = [];
  const rejectedPoints: CollectionPoint[] = [];
  const feasibilityResults: FeasibilityResult[] = [];
  
  points.forEach((point) => {
    const result = isFeasible(point, remainingWeight, remainingVolume);
    feasibilityResults.push(result);
    
    const updatedPoint = { ...point, feasible: result.feasible };
    
    if (result.feasible) {
      feasiblePoints.push(updatedPoint);
    } else {
      rejectedPoints.push(updatedPoint);
    }
  });
  
  return { feasiblePoints, rejectedPoints, feasibilityResults };
}

/**
 * Calculate normalized score for a collection point
 * 
 * EXACT FORMULA (DO NOT MODIFY):
 * Score_i = α(W_hat_i / W_rem) + β(V_hat_i / V_rem) - γ(D_i / D_max) - δ(T_i / T_max)
 * 
 * Where:
 * - α: weight utilization priority
 * - β: volume utilization priority
 * - γ: distance penalty
 * - δ: travel time penalty
 * - W_hat_i: estimated weight at point i
 * - W_rem: remaining weight capacity
 * - V_hat_i: estimated volume at point i
 * - V_rem: remaining volume capacity
 * - D_i: distance to point i
 * - D_max: maximum distance for normalization
 * - T_i: travel time to point i
 * - T_max: maximum travel time for normalization
 */
export function calculateScore(
  point: CollectionPoint,
  remainingWeight: number,
  remainingVolume: number,
  coefficients: Coefficients,
  dMax: number,
  tMax: number
): ScoreComponents {
  const { alpha, beta, gamma, delta } = coefficients;
  
  // Avoid division by zero
  const safeRemainingWeight = Math.max(remainingWeight, 0.001);
  const safeRemainingVolume = Math.max(remainingVolume, 0.001);
  const safeDMax = Math.max(dMax, 0.001);
  const safeTMax = Math.max(tMax, 0.001);
  
  // Calculate each component
  const weightUtilization = alpha * (point.estimatedWeight / safeRemainingWeight);
  const volumeUtilization = beta * (point.estimatedVolume / safeRemainingVolume);
  const distancePenalty = gamma * (point.distance / safeDMax);
  const timePenalty = delta * (point.travelTime / safeTMax);
  
  // Calculate total score
  const totalScore =
    weightUtilization +
    volumeUtilization -
    distancePenalty -
    timePenalty;
  
  return {
    weightUtilization,
    volumeUtilization,
    distancePenalty,
    timePenalty,
    totalScore,
  };
}

/**
 * Calculate scores for all feasible points
 */
export function calculateScores(
  feasiblePoints: CollectionPoint[],
  remainingWeight: number,
  remainingVolume: number,
  coefficients: Coefficients
): ScoreResult[] {
  // Calculate normalization factors
  const dMax = Math.max(...feasiblePoints.map((p) => p.distance), 1);
  const tMax = Math.max(...feasiblePoints.map((p) => p.travelTime), 1);
  
  // Calculate scores for each point
  const scores = feasiblePoints.map((point) => {
    const components = calculateScore(
      point,
      remainingWeight,
      remainingVolume,
      coefficients,
      dMax,
      tMax
    );
    
    return {
      pointId: point.id,
      score: components.totalScore,
      components,
      rank: 0, // Will be set after sorting
    };
  });
  
  return scores;
}

/**
 * Rank feasible points by descending score
 */
export function rankFeasiblePoints(
  feasiblePoints: CollectionPoint[],
  scores: ScoreResult[]
): { rankedPoints: CollectionPoint[]; rankedScores: ScoreResult[] } {
  // Create array of point-score pairs
  const pairs = feasiblePoints.map((point, index) => ({
    point: { ...point, score: scores[index].score },
    score: scores[index],
  }));
  
  // Sort by descending score
  pairs.sort((a, b) => b.score.score - a.score.score);
  
  // Assign ranks
  const rankedPoints = pairs.map((pair, index) => pair.point);
  const rankedScores = pairs.map((pair, index) => ({
    ...pair.score,
    rank: index + 1,
  }));
  
  return { rankedPoints, rankedScores };
}

/**
 * Select the best feasible point (argmax Score_i)
 */
export function selectBestPoint(
  rankedPoints: CollectionPoint[]
): CollectionPoint | null {
  if (rankedPoints.length === 0) {
    return null;
  }
  
  return rankedPoints[0];
}

/**
 * Update vehicle state after collection
 */
export function updateVehicleState(
  vehicle: Vehicle,
  actualWeight: number,
  actualVolume: number,
  newLocation: { latitude: number; longitude: number }
): Vehicle {
  return {
    ...vehicle,
    currentWeight: vehicle.currentWeight + actualWeight,
    currentVolume: vehicle.currentVolume + actualVolume,
    latitude: newLocation.latitude,
    longitude: newLocation.longitude,
  };
}

/**
 * Main optimization function that executes the complete decision loop
 * 
 * FILTER → SCORE → SELECT → RANK
 */
export function optimizeRoute(
  vehicle: Vehicle,
  collectionPoints: CollectionPoint[],
  coefficients: Coefficients
): OptimizationResult {
  // Calculate remaining capacity
  const { remainingWeight, remainingVolume } = calculateRemainingCapacity(vehicle);
  
  // Update distances from current vehicle location
  const updatedPoints = updatePointDistances(collectionPoints, {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
  });
  
  // Filter to get feasible set
  const { feasiblePoints, rejectedPoints } = filterFeasiblePoints(
    updatedPoints,
    remainingWeight,
    remainingVolume
  );
  
  // Calculate scores for feasible points
  const scores = calculateScores(
    feasiblePoints,
    remainingWeight,
    remainingVolume,
    coefficients
  );
  
  // Rank points by score
  const { rankedPoints, rankedScores } = rankFeasiblePoints(feasiblePoints, scores);
  
  // Select best point
  const selectedPoint = selectBestPoint(rankedPoints);
  
  return {
    selectedPoint,
    feasiblePoints: rankedPoints,
    rejectedPoints,
    scores: rankedScores,
    vehicleState: {
      vehicle,
      remainingWeight,
      remainingVolume,
      currentLocation: {
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
      },
    },
  };
}

/**
 * Re-optimize route after a state change (checkpoint or live update)
 * This is the core dynamic re-optimization function
 */
export function reoptimizeRoute(
  vehicle: Vehicle,
  collectionPoints: CollectionPoint[],
  coefficients: Coefficients
): OptimizationResult {
  // Same as optimizeRoute - we recalculate everything from scratch
  return optimizeRoute(vehicle, collectionPoints, coefficients);
}

/**
 * Validate that coefficients sum to 1
 */
export function validateCoefficients(coefficients: Coefficients): boolean {
  const sum = coefficients.alpha + coefficients.beta + coefficients.gamma + coefficients.delta;
  return Math.abs(sum - 1.0) < 0.001; // Allow small floating-point errors
}

/**
 * Normalize coefficients to sum to 1
 */
export function normalizeCoefficients(coefficients: Coefficients): Coefficients {
  const sum = coefficients.alpha + coefficients.beta + coefficients.gamma + coefficients.delta;
  
  if (sum === 0) {
    return { alpha: 0.25, beta: 0.25, gamma: 0.25, delta: 0.25 };
  }
  
  return {
    alpha: coefficients.alpha / sum,
    beta: coefficients.beta / sum,
    gamma: coefficients.gamma / sum,
    delta: coefficients.delta / sum,
  };
}
