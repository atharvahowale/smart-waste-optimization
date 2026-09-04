/**
 * Feasibility Panel Component
 * Shows constraint checking for each collection point
 */

import React from 'react';
import { CollectionPoint, FeasibilityResult } from '../types';
import { isFeasible } from '../engine/optimizationEngine';

interface FeasibilityPanelProps {
  collectionPoints: CollectionPoint[];
  remainingWeight: number;
  remainingVolume: number;
}

export const FeasibilityPanel: React.FC<FeasibilityPanelProps> = ({
  collectionPoints,
  remainingWeight,
  remainingVolume,
}) => {
  const feasibilityResults = collectionPoints.map((point) =>
    isFeasible(point, remainingWeight, remainingVolume)
  );
  
  const feasibleCount = feasibilityResults.filter((r) => r.feasible).length;
  const rejectedCount = feasibilityResults.filter((r) => !r.feasible).length;
  
  const CheckIcon = () => <span className="text-green-600">✓</span>;
  const CrossIcon = () => <span className="text-red-600">✕</span>;
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Feasibility Filtering
      </h2>
      
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{feasibleCount}</div>
          <div className="text-xs text-navy-600 dark:text-navy-400">Feasible</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          <div className="text-xs text-navy-600 dark:text-navy-400">Rejected</div>
        </div>
      </div>
      
      {/* Capacity Constraints */}
      <div className="bg-navy-50 dark:bg-navy-900 rounded-lg p-4 mb-4">
        <div className="text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
          Current Constraints
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-navy-600 dark:text-navy-400">Max Weight:</span>
            <span className="ml-2 font-bold text-navy-900 dark:text-white">
              {remainingWeight.toFixed(0)} kg
            </span>
          </div>
          <div>
            <span className="text-navy-600 dark:text-navy-400">Max Volume:</span>
            <span className="ml-2 font-bold text-navy-900 dark:text-white">
              {remainingVolume.toFixed(1)} m³
            </span>
          </div>
        </div>
      </div>
      
      {/* Point-by-Point Feasibility */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
        {collectionPoints.map((point) => {
          const result = feasibilityResults.find((r) => r.pointId === point.id);
          if (!result) return null;
          
          return (
            <div
              key={point.id}
              className={`border-2 rounded-lg p-3 ${
                result.feasible
                  ? 'border-green-300 bg-green-50 dark:bg-green-900/10'
                  : 'border-red-300 bg-red-50 dark:bg-red-900/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-navy-900 dark:text-white">
                    {point.name}
                  </div>
                  <div className="text-xs text-navy-500 font-mono">{point.id}</div>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    result.feasible
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {result.feasible ? 'FEASIBLE' : 'REJECTED'}
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-navy-700 dark:text-navy-300">Available:</span>
                  <span>{result.reasons.available ? <CheckIcon /> : <CrossIcon />}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-700 dark:text-navy-300">Accessible:</span>
                  <span>{result.reasons.accessible ? <CheckIcon /> : <CrossIcon />}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-700 dark:text-navy-300">
                    Weight: {point.estimatedWeight}kg ≤ {remainingWeight.toFixed(0)}kg
                  </span>
                  <span>{result.reasons.weightFit ? <CheckIcon /> : <CrossIcon />}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-700 dark:text-navy-300">
                    Volume: {point.estimatedVolume}m³ ≤ {remainingVolume.toFixed(1)}m³
                  </span>
                  <span>{result.reasons.volumeFit ? <CheckIcon /> : <CrossIcon />}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
