/**
 * Decision Trace Component
 * Shows the mathematical reasoning behind the optimization decision
 */

import React from 'react';
import { OptimizationResult, Coefficients } from '../types';

interface DecisionTraceProps {
  optimizationResult: OptimizationResult | null;
  coefficients: Coefficients;
}

export const DecisionTrace: React.FC<DecisionTraceProps> = ({
  optimizationResult,
  coefficients,
}) => {
  if (!optimizationResult) {
    return (
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
          Decision Trace
        </h2>
        <div className="text-center py-8 text-navy-600 dark:text-navy-400">
          No optimization result yet
        </div>
      </div>
    );
  }
  
  const { vehicleState, feasiblePoints, selectedPoint, scores } = optimizationResult;
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Decision Trace
      </h2>
      
      <div className="space-y-4">
        {/* Current Vehicle State */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
            1. CURRENT VEHICLE STATE
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-navy-600 dark:text-navy-400">Location:</span>
              <div className="font-mono text-xs text-navy-900 dark:text-white">
                {vehicleState.currentLocation.latitude.toFixed(4)}°,{' '}
                {vehicleState.currentLocation.longitude.toFixed(4)}°
              </div>
            </div>
            <div>
              <span className="text-navy-600 dark:text-navy-400">Remaining Weight:</span>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicleState.remainingWeight.toFixed(0)} kg
              </div>
            </div>
            <div>
              <span className="text-navy-600 dark:text-navy-400">Remaining Volume:</span>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicleState.remainingVolume.toFixed(1)} m³
              </div>
            </div>
          </div>
        </div>
        
        {/* Feasible Set */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="text-sm font-semibold text-green-900 dark:text-green-300 mb-3">
            2. FEASIBLE SET
          </div>
          <div className="text-sm text-navy-900 dark:text-white">
            {feasiblePoints.length > 0 ? (
              <div className="font-mono">
                F = {'{'}{feasiblePoints.map((p) => p.id).join(', ')}{'}'}
              </div>
            ) : (
              <div className="text-red-600">Empty set - no feasible points</div>
            )}
          </div>
          <div className="text-xs text-navy-600 dark:text-navy-400 mt-2">
            Points passing all constraints: available, accessible, weight fit, volume fit
          </div>
        </div>
        
        {/* Scoring */}
        {feasiblePoints.length > 0 && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-3">
              3. OBJECTIVE FUNCTION
            </div>
            <div className="space-y-2 text-sm">
              {scores.slice(0, 3).map((scoreResult) => {
                const point = feasiblePoints.find((p) => p.id === scoreResult.pointId);
                if (!point) return null;
                
                return (
                  <div key={point.id} className="bg-white dark:bg-navy-800 rounded p-2">
                    <div className="font-bold text-navy-900 dark:text-white mb-1">
                      {point.id}: Score = {scoreResult.score.toFixed(4)}
                    </div>
                    <div className="text-xs text-navy-600 dark:text-navy-400 space-y-1 font-mono">
                      <div>
                        + Weight: {coefficients.alpha.toFixed(2)} × ({point.estimatedWeight}/{vehicleState.remainingWeight.toFixed(0)}) = {scoreResult.components.weightUtilization.toFixed(4)}
                      </div>
                      <div>
                        + Volume: {coefficients.beta.toFixed(2)} × ({point.estimatedVolume}/{vehicleState.remainingVolume.toFixed(1)}) = {scoreResult.components.volumeUtilization.toFixed(4)}
                      </div>
                      <div>
                        - Distance: {coefficients.gamma.toFixed(2)} × penalty = {scoreResult.components.distancePenalty.toFixed(4)}
                      </div>
                      <div>
                        - Time: {coefficients.delta.toFixed(2)} × penalty = {scoreResult.components.timePenalty.toFixed(4)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Decision */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
          <div className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-3">
            4. DECISION
          </div>
          {selectedPoint ? (
            <div>
              <div className="text-sm text-navy-900 dark:text-white mb-2">
                <span className="font-mono">
                  argmax(Score<sub>i</sub>) = {selectedPoint.id}
                </span>
              </div>
              <div className="bg-green-600 text-white font-bold px-4 py-2 rounded text-center">
                SELECTED: {selectedPoint.name}
              </div>
              <div className="text-xs text-navy-600 dark:text-navy-400 mt-2">
                Reason: Highest score among all feasible collection points
              </div>
            </div>
          ) : (
            <div className="text-red-600 font-semibold">
              No point selected - feasible set is empty
            </div>
          )}
        </div>
        
        {/* Algorithm Flow */}
        <div className="bg-navy-100 dark:bg-navy-700 rounded-lg p-4">
          <div className="text-sm font-semibold text-navy-900 dark:text-white mb-3">
            OPTIMIZATION CYCLE
          </div>
          <div className="flex flex-col gap-2 text-xs text-navy-700 dark:text-navy-300 font-mono">
            <div>FILTER → FEASIBLE SET</div>
            <div>↓</div>
            <div>OBJECTIVE FUNCTION → SCORES</div>
            <div>↓</div>
            <div>argmax → DECISION</div>
            <div>↓</div>
            <div>STATE UPDATE → RE-OPTIMIZE ↺</div>
          </div>
        </div>
      </div>
    </div>
  );
};
