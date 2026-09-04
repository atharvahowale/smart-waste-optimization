/**
 * Checkpoint Verification Component
 * Shows estimated vs actual collection comparison
 */

import React, { useState } from 'react';
import { CheckpointVerification as CheckpointVerificationType } from '../types';

interface CheckpointVerificationProps {
  verification: CheckpointVerificationType;
  onVerify: (actualWeight: number, actualVolume: number) => void;
  onCancel: () => void;
}

export const CheckpointVerification: React.FC<CheckpointVerificationProps> = ({
  verification,
  onVerify,
  onCancel,
}) => {
  const [actualWeight, setActualWeight] = useState(verification.actualWeight);
  const [actualVolume, setActualVolume] = useState(verification.actualVolume);
  
  const weightDiff = actualWeight - verification.estimatedWeight;
  const volumeDiff = actualVolume - verification.estimatedVolume;
  
  const handleVerify = () => {
    onVerify(actualWeight, actualVolume);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-2xl max-w-lg w-full p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📍</div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
            Checkpoint Verification
          </h2>
          <p className="text-sm text-navy-600 dark:text-navy-400">
            Compare estimated vs actual collection data
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Weight Comparison */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-3">
              Plastic Weight (kg)
            </label>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-navy-50 dark:bg-navy-700 rounded-lg p-3">
                <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
                  Estimated
                </div>
                <div className="text-xl font-bold text-navy-900 dark:text-white">
                  {verification.estimatedWeight} kg
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
                  Actual
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {actualWeight.toFixed(1)} kg
                </div>
              </div>
            </div>
            
            <input
              type="range"
              min={verification.estimatedWeight * 0.5}
              max={verification.estimatedWeight * 1.5}
              step={0.1}
              value={actualWeight}
              onChange={(e) => setActualWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-xs text-navy-600 dark:text-navy-400 mt-1">
              <span>{(verification.estimatedWeight * 0.5).toFixed(0)} kg</span>
              <span>
                {weightDiff > 0 ? '+' : ''}
                {weightDiff.toFixed(1)} kg
              </span>
              <span>{(verification.estimatedWeight * 1.5).toFixed(0)} kg</span>
            </div>
          </div>
          
          {/* Volume Comparison */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-3">
              Plastic Volume (m³)
            </label>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-navy-50 dark:bg-navy-700 rounded-lg p-3">
                <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
                  Estimated
                </div>
                <div className="text-xl font-bold text-navy-900 dark:text-white">
                  {verification.estimatedVolume} m³
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">
                  Actual
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {actualVolume.toFixed(2)} m³
                </div>
              </div>
            </div>
            
            <input
              type="range"
              min={verification.estimatedVolume * 0.5}
              max={verification.estimatedVolume * 1.5}
              step={0.01}
              value={actualVolume}
              onChange={(e) => setActualVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-xs text-navy-600 dark:text-navy-400 mt-1">
              <span>{(verification.estimatedVolume * 0.5).toFixed(2)} m³</span>
              <span>
                {volumeDiff > 0 ? '+' : ''}
                {volumeDiff.toFixed(2)} m³
              </span>
              <span>{(verification.estimatedVolume * 1.5).toFixed(2)} m³</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 bg-navy-200 dark:bg-navy-700 hover:bg-navy-300 dark:hover:bg-navy-600 text-navy-900 dark:text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 touch-manipulation"
            >
              Verify Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
