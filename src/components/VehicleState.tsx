/**
 * Vehicle State Component
 * Displays current vehicle capacity with progress bars
 */

import React from 'react';
import { Vehicle } from '../types';
import { calculateRemainingCapacity } from '../engine/optimizationEngine';

interface VehicleStateProps {
  vehicle: Vehicle;
}

export const VehicleState: React.FC<VehicleStateProps> = ({ vehicle }) => {
  const { remainingWeight, remainingVolume } = calculateRemainingCapacity(vehicle);
  
  const weightPercentage = (vehicle.currentWeight / vehicle.maxWeight) * 100;
  const volumePercentage = (vehicle.currentVolume / vehicle.maxVolume) * 100;
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white">
          Vehicle State
        </h2>
        <div className="text-sm font-mono text-navy-600 dark:text-navy-300">
          {vehicle.id}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Weight Capacity */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              Weight Capacity
            </span>
            <span className="text-xs text-navy-500">
              {vehicle.currentWeight.toFixed(0)} / {vehicle.maxWeight} kg
            </span>
          </div>
          
          <div className="relative h-8 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                weightPercentage > 90
                  ? 'bg-red-500'
                  : weightPercentage > 70
                  ? 'bg-amber-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(weightPercentage, 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-navy-900 dark:text-white mix-blend-difference">
                {weightPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Maximum</div>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicle.maxWeight} kg
              </div>
            </div>
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Current</div>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicle.currentWeight.toFixed(0)} kg
              </div>
            </div>
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Remaining</div>
              <div className="font-bold text-green-600 dark:text-green-400">
                {remainingWeight.toFixed(0)} kg
              </div>
            </div>
          </div>
        </div>
        
        {/* Volume Capacity */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-navy-700 dark:text-navy-300">
              Volume Capacity
            </span>
            <span className="text-xs text-navy-500">
              {vehicle.currentVolume.toFixed(1)} / {vehicle.maxVolume} m³
            </span>
          </div>
          
          <div className="relative h-8 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                volumePercentage > 90
                  ? 'bg-red-500'
                  : volumePercentage > 70
                  ? 'bg-amber-500'
                  : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(volumePercentage, 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-navy-900 dark:text-white mix-blend-difference">
                {volumePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Maximum</div>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicle.maxVolume} m³
              </div>
            </div>
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Current</div>
              <div className="font-bold text-navy-900 dark:text-white">
                {vehicle.currentVolume.toFixed(1)} m³
              </div>
            </div>
            <div className="text-center">
              <div className="text-navy-500 dark:text-navy-400">Remaining</div>
              <div className="font-bold text-blue-600 dark:text-blue-400">
                {remainingVolume.toFixed(1)} m³
              </div>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="pt-4 border-t border-navy-200 dark:border-navy-700">
          <div className="text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
            Current Location
          </div>
          <div className="font-mono text-xs text-navy-600 dark:text-navy-400">
            {vehicle.latitude.toFixed(4)}°, {vehicle.longitude.toFixed(4)}°
          </div>
        </div>
      </div>
    </div>
  );
};
