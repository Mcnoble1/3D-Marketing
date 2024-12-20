import React, { useState } from 'react';
import { Type, Orbit } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface MapControlsProps {
  showLabels: boolean;
  autoOrbit: boolean;
  onToggleOrbit: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  showLabels,
  autoOrbit,
  onToggleOrbit,
}) => {
  const [showLabelsState, setShowLabels] = useState(showLabels);

  const handleToggleLabels = () => {
    setShowLabels(!showLabelsState);
    const mapContainer = document.querySelector('gmp-map-3d');
    if (mapContainer) {
      if (showLabelsState) {
        mapContainer.setAttribute('default-labels-disabled', '');
      } else {
        mapContainer.removeAttribute('default-labels-disabled');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bottom-24 right-6 bg-white rounded-lg shadow-lg p-2 space-y-2 z-30"
    >
      <div className="group relative">
        <button
          onClick={handleToggleLabels}
          className={cn(
            "p-2 rounded-lg transition-colors",
            showLabelsState ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
          )}
          aria-label="Toggle labels"
        >
          <Type className="w-5 h-5" />
        </button>
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {showLabelsState ? 'Hide map labels' : 'Show map labels'}
        </div>
      </div>

      <div className="group relative">
        <button
          onClick={onToggleOrbit}
          className={cn(
            "p-2 rounded-lg transition-colors",
            autoOrbit ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
          )}
          aria-label="Toggle auto orbit"
        >
          <Orbit className="w-5 h-5" />
        </button>
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {autoOrbit ? 'Stop auto orbit' : 'Start auto orbit'}
        </div>
      </div>
    </motion.div>
  );
};