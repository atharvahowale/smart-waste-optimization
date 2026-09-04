/**
 * Mathematical Scoring Component
 * Displays the scoring formula and coefficient controls
 */

import React from 'react';
import { Coefficients } from '../types';

interface MathematicalScoringProps {
  coefficients: Coefficients;
  onUpdateCoefficients: (coefficients: Partial<Coefficients>) => void;
}

export const MathematicalScoring: React.FC<MathematicalScoringProps> = ({
  coefficients,
  onUpdateCoefficients,
}) => {
  const sum = coefficients.alpha + coefficients.beta + coefficients.gamma + coefficients.delta;
  const isValid = Math.abs(sum - 1.0) < 0.001;
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Mathematical Scoring Engine
      </h2>
      
      {/* Formula Display */}
      <div className="bg-navy-50 dark:bg-navy-900 rounded-lg p-4 md:p-6 mb-6 overflow-x-auto">
        <div className="text-center mb-4">
          <div className="text-sm font-semibold text-navy-700 dark:text-navy-300 mb-4">
            Optimization Formula
          </div>
          <div className="flex justify-center">
            <img 
              src="/images/formula.svg" 
              alt="Optimization Formula: Score_i = α(W_hat_i / W_rem) + β(V_hat_i / V_rem) - γ(D_i / D_max) - δ(T_i / T_max)"
              className="max-w-full h-auto dark:invert"
              style={{ maxHeight: '60px' }}
            />
          </div>
        </div>
        
        <div className="border-t border-navy-200 dark:border-navy-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-navy-600 dark:text-navy-400">
            <div>
              <strong>W&#x0302;<sub>i</sub>:</strong> Estimated weight at point i
            </div>
            <div>
              <strong>W<sub>rem</sub>:</strong> Remaining weight capacity
            </div>
            <div>
              <strong>V&#x0302;<sub>i</sub>:</strong> Estimated volume at point i
            </div>
            <div>
              <strong>V<sub>rem</sub>:</strong> Remaining volume capacity
            </div>
            <div>
              <strong>D<sub>i</sub>:</strong> Distance to point i
            </div>
            <div>
              <strong>D<sub>max</sub>:</strong> Maximum distance (normalization)
            </div>
            <div>
              <strong>T<sub>i</sub>:</strong> Travel time to point i
            </div>
            <div>
              <strong>T<sub>max</sub>:</strong> Maximum time (normalization)
            </div>
          </div>
        </div>
      </div>
      
      {/* Coefficient Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-300">
            Coefficient Weights
          </h3>
          <div className={`text-sm font-bold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            Σ = {sum.toFixed(3)} {isValid ? '✓' : '(must equal 1.0)'}
          </div>
        </div>
        
        {/* Alpha - Weight Utilization */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              α (Weight Utilization)
            </label>
            <span className="text-lg font-bold text-green-600">
              {coefficients.alpha.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={coefficients.alpha}
            onChange={(e) =>
              onUpdateCoefficients({ alpha: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="text-xs text-navy-600 dark:text-navy-400 mt-1">
            Higher = prioritize heavy loads
          </div>
        </div>
        
        {/* Beta - Volume Utilization */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              β (Volume Utilization)
            </label>
            <span className="text-lg font-bold text-blue-600">
              {coefficients.beta.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={coefficients.beta}
            onChange={(e) =>
              onUpdateCoefficients({ beta: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-xs text-navy-600 dark:text-navy-400 mt-1">
            Higher = prioritize large volume loads
          </div>
        </div>
        
        {/* Gamma - Distance Penalty */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              γ (Distance Penalty)
            </label>
            <span className="text-lg font-bold text-amber-600">
              {coefficients.gamma.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={coefficients.gamma}
            onChange={(e) =>
              onUpdateCoefficients({ gamma: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="text-xs text-navy-600 dark:text-navy-400 mt-1">
            Higher = avoid distant points
          </div>
        </div>
        
        {/* Delta - Time Penalty */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              δ (Travel Time Penalty)
            </label>
            <span className="text-lg font-bold text-red-600">
              {coefficients.delta.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={coefficients.delta}
            onChange={(e) =>
              onUpdateCoefficients({ delta: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="text-xs text-navy-600 dark:text-navy-400 mt-1">
            Higher = minimize travel time
          </div>
        </div>
      </div>
      
      {/* Scoring Explanation */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          How Scoring Works
        </div>
        <div className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
          <div><strong>Collection Benefit:</strong> Weight + Volume utilization (positive terms)</div>
          <div><strong>Travel Cost:</strong> Distance + Time penalties (negative terms)</div>
          <div><strong>Decision:</strong> Highest score = best next point</div>
        </div>
      </div>
    </div>
  );
};
