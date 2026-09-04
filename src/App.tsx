/**
 * Main Application Component
 * Smart Plastic Waste Collection Optimization Platform
 */

import React, { useEffect } from 'react';
import { useOptimizationStore } from './store/useOptimizationStore';
import { VehicleState } from './components/VehicleState';
import { NextPointRecommendation } from './components/NextPointRecommendation';
import { MapView } from './components/MapView';
import { FeasibilityPanel } from './components/FeasibilityPanel';
import { MathematicalScoring } from './components/MathematicalScoring';
import { PointRankingTable } from './components/PointRankingTable';
import { SimulationControls } from './components/SimulationControls';
import { EventLog } from './components/EventLog';
import { CheckpointVerification } from './components/CheckpointVerification';
import { DecisionTrace } from './components/DecisionTrace';

function App() {
  const {
    vehicle,
    collectionPoints,
    coefficients,
    optimizationResult,
    simulationState,
    eventLog,
    selectedPointId,
    checkpointVerification,
    initialize,
    runOptimization,
    updateCoefficients,
    arriveAtCheckpoint,
    verifyCollection,
    selectPoint,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetSimulation,
    simulateLiveUpdate,
  } = useOptimizationStore();
  
  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  const handleArriveAtCheckpoint = () => {
    if (optimizationResult?.selectedPoint) {
      arriveAtCheckpoint(optimizationResult.selectedPoint.id);
    }
  };
  
  const handleVerifyCollection = (actualWeight: number, actualVolume: number) => {
    if (checkpointVerification) {
      verifyCollection(checkpointVerification.pointId, actualWeight, actualVolume);
    }
  };
  
  return (
    <div className="min-h-screen bg-navy-50 dark:bg-navy-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                PolyRoute
              </h1>
              <p className="text-sm md:text-base opacity-90">
                Dynamic Collection Optimization Engine
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 text-sm">
                <div className="font-semibold">System Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-green"></div>
                  <span className="uppercase font-bold">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section: Vehicle State + Next Point + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <VehicleState vehicle={vehicle} />
          </div>
          
          <div className="lg:col-span-1">
            <NextPointRecommendation
              selectedPoint={optimizationResult?.selectedPoint || null}
              score={optimizationResult?.selectedPoint?.score}
              onArrive={handleArriveAtCheckpoint}
            />
          </div>
          
          <div className="lg:col-span-1">
            <MapView
              vehicle={vehicle}
              collectionPoints={collectionPoints}
              selectedPoint={optimizationResult?.selectedPoint || null}
              onSelectPoint={selectPoint}
            />
          </div>
        </div>
        
        {/* Simulation Controls */}
        <SimulationControls
          simulationState={simulationState}
          onStart={startSimulation}
          onPause={pauseSimulation}
          onStep={stepSimulation}
          onReset={resetSimulation}
        />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={simulateLiveUpdate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
          >
            <span>📡</span>
            <span>SIMULATE LIVE UPDATE (Add P6)</span>
          </button>
          
          <button
            onClick={runOptimization}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
          >
            <span>⚙️</span>
            <span>RE-OPTIMIZE ROUTE</span>
          </button>
        </div>
        
        {/* Mathematical Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeasibilityPanel
            collectionPoints={collectionPoints}
            remainingWeight={optimizationResult?.vehicleState.remainingWeight || 0}
            remainingVolume={optimizationResult?.vehicleState.remainingVolume || 0}
          />
          
          <MathematicalScoring
            coefficients={coefficients}
            onUpdateCoefficients={updateCoefficients}
          />
        </div>
        
        {/* Ranking Table */}
        {optimizationResult && (
          <PointRankingTable
            feasiblePoints={optimizationResult.feasiblePoints}
            scores={optimizationResult.scores}
            selectedPointId={selectedPointId}
            onSelectPoint={selectPoint}
          />
        )}
        
        {/* Decision Trace */}
        <DecisionTrace
          optimizationResult={optimizationResult}
          coefficients={coefficients}
        />
        
        {/* Event Log */}
        <EventLog events={eventLog} maxEvents={15} />
        
        {/* Footer */}
        <footer className="text-center text-sm text-navy-600 dark:text-navy-400 py-6">
          <div className="mb-2">
            SIH 2026 Project: PolyRoute - Plastic Waste Collection Optimization Platform
          </div>
          <div className="text-xs">
            Mathematical Decision Engine • Real-Time Route Optimization • Capacity-Aware Scheduling
          </div>
        </footer>
      </main>
      
      {/* Checkpoint Verification Modal */}
      {checkpointVerification && (
        <CheckpointVerification
          verification={checkpointVerification}
          onVerify={handleVerifyCollection}
          onCancel={() => verifyCollection(checkpointVerification.pointId, checkpointVerification.actualWeight, checkpointVerification.actualVolume)}
        />
      )}
    </div>
  );
}

export default App;
