/**
 * Simulation Controls Component
 * RUN, PAUSE, STEP, RESET controls for the simulation
 */

import React from 'react';
import { SimulationState } from '../types';

interface SimulationControlsProps {
  simulationState: SimulationState;
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  simulationState,
  onStart,
  onPause,
  onStep,
  onReset,
}) => {
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Simulation Controls
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Run/Pause Button */}
        {simulationState === 'running' ? (
          <button
            onClick={onPause}
            className="flex flex-col items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-200 touch-manipulation"
          >
            <span className="text-2xl">⏸</span>
            <span className="text-sm">PAUSE</span>
          </button>
        ) : (
          <button
            onClick={onStart}
            className="flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-200 touch-manipulation"
          >
            <span className="text-2xl">▶</span>
            <span className="text-sm">RUN</span>
          </button>
        )}
        
        {/* Step Button */}
        <button
          onClick={onStep}
          className="flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-200 touch-manipulation"
          disabled={simulationState === 'running'}
        >
          <span className="text-2xl">⏭</span>
          <span className="text-sm">STEP</span>
        </button>
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex flex-col items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-200 touch-manipulation"
        >
          <span className="text-2xl">↻</span>
          <span className="text-sm">RESET</span>
        </button>
        
        {/* Status Indicator */}
        <div className="flex flex-col items-center justify-center gap-2 bg-navy-100 dark:bg-navy-700 rounded-lg py-4 px-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                simulationState === 'running'
                  ? 'bg-green-500 animate-pulse-green'
                  : simulationState === 'paused'
                  ? 'bg-amber-500'
                  : simulationState === 'completed'
                  ? 'bg-blue-500'
                  : 'bg-navy-400'
              }`}
            />
            <span className="text-xs font-semibold text-navy-900 dark:text-white uppercase">
              {simulationState}
            </span>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-4 p-3 bg-navy-50 dark:bg-navy-900 rounded-lg">
        <div className="text-xs text-navy-600 dark:text-navy-400 space-y-1">
          <div><strong>RUN:</strong> Execute automatic simulation cycle</div>
          <div><strong>PAUSE:</strong> Stop automatic execution</div>
          <div><strong>STEP:</strong> Advance one algorithm stage (for presentation)</div>
          <div><strong>RESET:</strong> Restore initial scenario</div>
        </div>
      </div>
    </div>
  );
};
