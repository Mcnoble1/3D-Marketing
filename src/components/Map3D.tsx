import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Property } from '../types/campaign';

interface Map3DProps {
  properties: Property[];
  currentIndex: number;
  isPlaying: boolean;
}

export const Map3D = forwardRef<any, Map3DProps>(({ properties, currentIndex, isPlaying }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const orbitIntervalRef = useRef<number>();

  useImperativeHandle(ref, () => mapRef.current);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initMap = async () => {
      const mapElement = document.createElement('gmp-map-3d');
      mapElement.style.width = '100%';
      mapElement.style.height = '100%';
      
      // Set initial view to world view
      mapElement.setAttribute('center', '0,0,25000000');
      mapElement.setAttribute('tilt', '0');
      mapElement.setAttribute('heading', '0');

      containerRef.current?.appendChild(mapElement);
      mapRef.current = mapElement;

      // Create markers for all properties
      properties.forEach((property, index) => {
        const marker = document.createElement('gmp-marker-3d');
        marker.setAttribute('position', `${property.coordinates.lat},${property.coordinates.lng}`);
        marker.setAttribute('title', property.name);
        marker.setAttribute('altitude-mode', 'RELATIVE_TO_GROUND');
        
        // Add animation class based on current index
        marker.classList.add(index === currentIndex ? 'marker-active' : 'marker-inactive');
        
        mapElement.appendChild(marker);
        markersRef.current.push(marker);
      });
    };

    initMap();

    return () => {
      markersRef.current = [];
      mapRef.current = null;
    };
  }, [properties]);

  useEffect(() => {
    if (mapRef.current && properties[currentIndex]) {
      const property = properties[currentIndex];
      
      // Fly to the location
      mapRef.current.setAttribute('center', `${property.coordinates.lat},${property.coordinates.lng},300`);
      mapRef.current.setAttribute('tilt', '45');
      mapRef.current.setAttribute('heading', '0');

      // Update marker animations
      markersRef.current.forEach((marker, index) => {
        marker.classList.remove('marker-active', 'marker-inactive');
        marker.classList.add(index === currentIndex ? 'marker-active' : 'marker-inactive');
      });
    }
  }, [currentIndex, properties]);

  useEffect(() => {
    if (isPlaying && mapRef.current) {
      // Start orbiting when playing
      orbitIntervalRef.current = window.setInterval(() => {
        const currentHeading = parseFloat(mapRef.current.getAttribute('heading')) || 0;
        mapRef.current.setAttribute('heading', ((currentHeading + 1) % 360).toString());
      }, 100);
    } else if (orbitIntervalRef.current) {
      clearInterval(orbitIntervalRef.current);
    }

    return () => {
      if (orbitIntervalRef.current) {
        clearInterval(orbitIntervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <style>
        {`
          .marker-active {
            animation: bounce 1s infinite;
          }
          .marker-inactive {
            opacity: 0.6;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
});