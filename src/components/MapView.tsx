/**
 * Map View Component
 * Interactive map showing vehicle, collection points, and routes using Leaflet
 */

import React, { useEffect, useRef } from 'react';
import { Vehicle, CollectionPoint } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  vehicle: Vehicle;
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint?: (pointId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  vehicle,
  collectionPoints,
  selectedPoint,
  onSelectPoint,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const vehicleMarkerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Dynamically import Leaflet to avoid SSR issues
      const L = (await import('leaflet')).default;

      // Fix default marker icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Initialize map
      const map = L.map(mapRef.current).setView([vehicle.latitude, vehicle.longitude], 12);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom icons
      const createCustomIcon = (color: string, isSelected: boolean) => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${isSelected ? '32px' : '24px'};
            height: ${isSelected ? '32px' : '24px'};
            background-color: ${color};
            border: ${isSelected ? '4px' : '3px'} solid ${isSelected ? '#fbbf24' : '#ffffff'};
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
          iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
        });
      };

      const vehicleIcon = L.divIcon({
        className: 'vehicle-marker',
        html: `<div style="
          width: 40px;
          height: 40px;
          background-color: #2563eb;
          border: 4px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        ">🚚</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      // Add vehicle marker
      const vehicleMarker = L.marker([vehicle.latitude, vehicle.longitude], { icon: vehicleIcon })
        .addTo(map)
        .bindPopup('<b>Vehicle</b><br>Current Location');
      vehicleMarkerRef.current = vehicleMarker;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();

      // Create icons helper
      const getColor = (point: CollectionPoint) => {
        if (point.collected) return '#94a3b8'; // gray
        if (point.feasible) return '#10b981'; // green
        return '#ef4444'; // red
      };

      const createCustomIcon = (color: string, isSelected: boolean) => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${isSelected ? '32px' : '24px'};
            height: ${isSelected ? '32px' : '24px'};
            background-color: ${color};
            border: ${isSelected ? '4px' : '3px'} solid ${isSelected ? '#fbbf24' : '#ffffff'};
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
          iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
        });
      };

      // Add collection point markers
      collectionPoints.forEach((point) => {
        const isSelected = selectedPoint?.id === point.id;
        const color = getColor(point);
        const icon = createCustomIcon(color, isSelected);

        const status = point.collected
          ? 'Collected'
          : point.feasible
          ? 'Feasible'
          : 'Rejected';

        const marker = L.marker([point.latitude, point.longitude], { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<b>${point.name}</b><br>
            <b>${point.id}</b><br>
            Weight: ${point.estimatedWeight}kg<br>
            Volume: ${point.estimatedVolume}m³<br>
            Status: <b>${status}</b>`
          )
          .on('click', () => {
            if (onSelectPoint) {
              onSelectPoint(point.id);
            }
          });

        markersRef.current.set(point.id, marker);
      });

      // Update route line
      if (routeLineRef.current) {
        routeLineRef.current.remove();
        routeLineRef.current = null;
      }

      if (selectedPoint) {
        const routeLine = L.polyline(
          [
            [vehicle.latitude, vehicle.longitude],
            [selectedPoint.latitude, selectedPoint.longitude],
          ],
          {
            color: '#3b82f6',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
          }
        ).addTo(mapInstanceRef.current);
        routeLineRef.current = routeLine;
      }
    };

    updateMarkers();
  }, [collectionPoints, selectedPoint, onSelectPoint]);

  useEffect(() => {
    const updateVehicle = async () => {
      if (!vehicleMarkerRef.current) return;

      const L = (await import('leaflet')).default;

      vehicleMarkerRef.current.setLatLng([vehicle.latitude, vehicle.longitude]);

      // Update route line if exists
      if (routeLineRef.current && selectedPoint) {
        routeLineRef.current.setLatLngs([
          [vehicle.latitude, vehicle.longitude],
          [selectedPoint.latitude, selectedPoint.longitude],
        ]);
      }

      // Re-center map on vehicle
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([vehicle.latitude, vehicle.longitude], mapInstanceRef.current.getZoom());
      }
    };

    updateVehicle();
  }, [vehicle.latitude, vehicle.longitude, selectedPoint]);

  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Route Visualization
      </h2>

      <div
        ref={mapRef}
        className="w-full rounded-lg overflow-hidden"
        style={{ height: '400px', minHeight: '300px' }}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          <span className="text-navy-700 dark:text-navy-300">Vehicle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-navy-700 dark:text-navy-300">Feasible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-navy-700 dark:text-navy-300">Rejected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          <span className="text-navy-700 dark:text-navy-300">Collected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500"></div>
          <span className="text-navy-700 dark:text-navy-300">Selected</span>
        </div>
      </div>

      <div className="mt-2 text-xs text-navy-600 dark:text-navy-400 text-center">
        Click on collection points for details • Blue line shows route to selected point
      </div>
    </div>
  );
};
