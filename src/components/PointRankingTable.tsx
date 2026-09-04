/**
 * Point Ranking Table Component
 * Displays all feasible points sorted by score
 */

import React from 'react';
import { CollectionPoint, ScoreResult } from '../types';

interface PointRankingTableProps {
  feasiblePoints: CollectionPoint[];
  scores: ScoreResult[];
  selectedPointId?: string | null;
  onSelectPoint?: (pointId: string) => void;
}

export const PointRankingTable: React.FC<PointRankingTableProps> = ({
  feasiblePoints,
  scores,
  selectedPointId,
  onSelectPoint,
}) => {
  if (feasiblePoints.length === 0) {
    return (
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
          Feasible Point Rankings
        </h2>
        <div className="text-center py-8 text-navy-600 dark:text-navy-400">
          No feasible points available
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Feasible Point Rankings
      </h2>
      
      {/* Desktop/Tablet Table */}
      <div className="hidden md:block overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-navy-200 dark:border-navy-700">
              <th className="text-left py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Rank
              </th>
              <th className="text-left py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Point
              </th>
              <th className="text-right py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Weight
              </th>
              <th className="text-right py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Volume
              </th>
              <th className="text-right py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Distance
              </th>
              <th className="text-right py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Time
              </th>
              <th className="text-right py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Score
              </th>
              <th className="text-center py-3 px-2 font-semibold text-navy-700 dark:text-navy-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {feasiblePoints.map((point, index) => {
              const scoreResult = scores.find((s) => s.pointId === point.id);
              const isSelected = point.id === selectedPointId;
              const isFirst = index === 0;
              
              return (
                <tr
                  key={point.id}
                  className={`border-b border-navy-100 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-700 cursor-pointer ${
                    isSelected ? 'bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                  onClick={() => onSelectPoint?.(point.id)}
                >
                  <td className="py-3 px-2">
                    <div className={`font-bold ${isFirst ? 'text-green-600' : 'text-navy-900 dark:text-white'}`}>
                      #{scoreResult?.rank || index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-semibold text-navy-900 dark:text-white">
                      {point.name}
                    </div>
                    <div className="text-xs text-navy-500 font-mono">{point.id}</div>
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-navy-900 dark:text-white">
                    {point.estimatedWeight} kg
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-navy-900 dark:text-white">
                    {point.estimatedVolume} m³
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-navy-900 dark:text-white">
                    {point.distance.toFixed(1)} km
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-navy-900 dark:text-white">
                    {point.travelTime.toFixed(0)} min
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className={`font-bold ${isFirst ? 'text-green-600 text-lg' : 'text-navy-900 dark:text-white'}`}>
                      {scoreResult?.score.toFixed(4) || '—'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {isFirst ? (
                      <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SELECTED
                      </span>
                    ) : (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">
                        FEASIBLE
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {feasiblePoints.map((point, index) => {
          const scoreResult = scores.find((s) => s.pointId === point.id);
          const isSelected = point.id === selectedPointId;
          const isFirst = index === 0;
          
          return (
            <div
              key={point.id}
              className={`border-2 rounded-lg p-4 ${
                isFirst
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-navy-200 dark:border-navy-700'
              }`}
              onClick={() => onSelectPoint?.(point.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-navy-900 dark:text-white">
                    #{scoreResult?.rank || index + 1} {point.name}
                  </div>
                  <div className="text-xs text-navy-500 font-mono">{point.id}</div>
                </div>
                {isFirst ? (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SELECTED
                  </span>
                ) : (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">
                    FEASIBLE
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-navy-600 dark:text-navy-400">Weight:</span>
                  <span className="ml-1 font-semibold text-navy-900 dark:text-white">
                    {point.estimatedWeight} kg
                  </span>
                </div>
                <div>
                  <span className="text-navy-600 dark:text-navy-400">Volume:</span>
                  <span className="ml-1 font-semibold text-navy-900 dark:text-white">
                    {point.estimatedVolume} m³
                  </span>
                </div>
                <div>
                  <span className="text-navy-600 dark:text-navy-400">Distance:</span>
                  <span className="ml-1 font-semibold text-navy-900 dark:text-white">
                    {point.distance.toFixed(1)} km
                  </span>
                </div>
                <div>
                  <span className="text-navy-600 dark:text-navy-400">Time:</span>
                  <span className="ml-1 font-semibold text-navy-900 dark:text-white">
                    {point.travelTime.toFixed(0)} min
                  </span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-navy-200 dark:border-navy-700">
                <div className="text-xs text-navy-600 dark:text-navy-400 mb-1">Score</div>
                <div className={`font-bold ${isFirst ? 'text-green-600 text-xl' : 'text-navy-900 dark:text-white text-lg'}`}>
                  {scoreResult?.score.toFixed(4) || '—'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
