/**
 * Next Point Recommendation Component
 * Displays the selected best point and its score
 */

import React from 'react';
import { CollectionPoint } from '../types';

interface NextPointRecommendationProps {
  selectedPoint: CollectionPoint | null;
  score?: number;
  onArrive?: () => void;
}

export const NextPointRecommendation: React.FC<NextPointRecommendationProps> = ({
  selectedPoint,
  score,
  onArrive,
}) => {
  if (!selectedPoint) {
    return (
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
          Next Collection Point
        </h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
            No Feasible Points
          </div>
          <div className="text-sm text-navy-600 dark:text-navy-400">
            All collection points are either collected, unavailable, or exceed remaining capacity
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-navy-800 dark:to-navy-900 rounded-lg shadow-lg p-4 md:p-6 border-2 border-green-400">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white">
          Next Collection Point
        </h2>
        <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          SELECTED
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Point Info */}
        <div>
          <div className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white mb-1">
            {selectedPoint.name}
          </div>
          <div className="text-sm font-mono text-navy-600 dark:text-navy-400">
            {selectedPoint.id}
          </div>
        </div>
        
        {/* Score */}
        {score !== undefined && (
          <div className="bg-white dark:bg-navy-700 rounded-lg p-4">
            <div className="text-sm text-navy-600 dark:text-navy-400 mb-1">
              Optimization Score
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {score.toFixed(4)}
            </div>
            <div className="text-xs text-navy-500 dark:text-navy-400 mt-1">
              Highest among feasible points
            </div>
          </div>
        )}
        
        {/* Collection Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-navy-700 rounded-lg p-3">
            <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
              Estimated Weight
            </div>
            <div className="text-lg font-bold text-navy-900 dark:text-white">
              {selectedPoint.estimatedWeight} kg
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-700 rounded-lg p-3">
            <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
              Estimated Volume
            </div>
            <div className="text-lg font-bold text-navy-900 dark:text-white">
              {selectedPoint.estimatedVolume} m³
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-700 rounded-lg p-3">
            <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
              Distance
            </div>
            <div className="text-lg font-bold text-navy-900 dark:text-white">
              {selectedPoint.distance.toFixed(1)} km
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-700 rounded-lg p-3">
            <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
              Travel Time
            </div>
            <div className="text-lg font-bold text-navy-900 dark:text-white">
              {selectedPoint.travelTime.toFixed(0)} min
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        {onArrive && (
          <button
            onClick={onArrive}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
          >
            <span>🚚</span>
            <span>ARRIVE AT CHECKPOINT</span>
          </button>
        )}
      </div>
    </div>
  );
};
