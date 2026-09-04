/**
 * Event Log Component
 * Displays real-time events during optimization
 */

import React from 'react';
import { EventLog as EventLogType } from '../types';

interface EventLogProps {
  events: EventLogType[];
  maxEvents?: number;
}

export const EventLog: React.FC<EventLogProps> = ({ events, maxEvents = 10 }) => {
  const displayEvents = events.slice(0, maxEvents);
  
  const getEventIcon = (type: EventLogType['type']) => {
    switch (type) {
      case 'VEHICLE':
        return '🚚';
      case 'NETWORK':
        return '📡';
      case 'OPTIMIZATION':
        return '⚙️';
      case 'CHECKPOINT':
        return '📍';
      default:
        return '•';
    }
  };
  
  const getEventColor = (type: EventLogType['type']) => {
    switch (type) {
      case 'VEHICLE':
        return 'text-blue-600 dark:text-blue-400';
      case 'NETWORK':
        return 'text-purple-600 dark:text-purple-400';
      case 'OPTIMIZATION':
        return 'text-green-600 dark:text-green-400';
      case 'CHECKPOINT':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-navy-600 dark:text-navy-400';
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-4">
        Event Log
      </h2>
      
      {displayEvents.length === 0 ? (
        <div className="text-center py-8 text-navy-600 dark:text-navy-400 text-sm">
          No events yet
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="border-l-4 pl-3 py-2 border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-700 rounded-r event-enter"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{getEventIcon(event.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-xs text-navy-500 dark:text-navy-400">
                      {formatTime(event.timestamp)}
                    </span>
                    <span className={`text-xs font-bold ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-navy-900 dark:text-white mt-1">
                    {event.message}
                  </div>
                  {event.details && (
                    <div className="text-xs text-navy-600 dark:text-navy-400 mt-1">
                      {event.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
