import React, { useEffect, useRef, useState } from 'react';
import { MapControls } from './MapControls';

interface MapProps {
  center?: { lat: number; lng: number };
  locationName?: string;
  onMapLoad?: (map: any) => void;
}

export const Map: React.FC<MapProps> = ({ center, locationName, onMapLoad }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map3DElementRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);
  const [autoOrbit, setAutoOrbit] = useState(false);
  const orbitIntervalRef = useRef<number>();

  const createPolygon = async (mapContainer: any, center: { lat: number; lng: number }) => {
    const polygon = document.createElement('gmp-polygon-3d');
    polygon.setAttribute('altitude-mode', 'clamp-to-ground');
    polygon.setAttribute('fill-color', 'rgba(99, 102, 241, 0.2)');
    polygon.setAttribute('stroke-color', 'rgb(99, 102, 241)');
    polygon.setAttribute('stroke-width', '4');
    polygon.setAttribute('draws-occluded-segments', '');

    await customElements.whenDefined(polygon.localName);
    
    const radius = 0.0005; // Adjust radius as needed
    const points = [];
    for (let i = 0; i <= 360; i += 45) {
      const angle = (i * Math.PI) / 180;
      points.push({
        lat: center.lat + radius * Math.cos(angle),
        lng: center.lng + radius * Math.sin(angle),
      });
    }
    points.push(points[0]); // Close the polygon
    
    polygon.outerCoordinates = points;
    mapContainer.appendChild(polygon);
    return polygon;
  };

  const flyTo = async (mapContainer: any, center: { lat: number; lng: number }) => {
    const elevatorService = new window.google.maps.ElevationService();
    const response = await elevatorService.getElevationForLocations({
      locations: [center],
    });
    
    const elevation = response.results?.[0]?.elevation || 300;
    const altitude = 500; // Closer view of the location

    // Smooth transition using requestAnimationFrame
    const startCenter = {
      lat: parseFloat(mapContainer.getAttribute('center').split(',')[0]),
      lng: parseFloat(mapContainer.getAttribute('center').split(',')[1]),
      alt: parseFloat(mapContainer.getAttribute('center').split(',')[2]),
    };

    const startTilt = parseFloat(mapContainer.getAttribute('tilt')) || 0;
    const duration = 1000; // 1 second transition
    const start = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease in-out function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const newLat = startCenter.lat + (center.lat - startCenter.lat) * easeProgress;
      const newLng = startCenter.lng + (center.lng - startCenter.lng) * easeProgress;
      const newAlt = startCenter.alt + (altitude - startCenter.alt) * easeProgress;
      const newTilt = startTilt + (45 - startTilt) * easeProgress;

      mapContainer.setAttribute('center', `${newLat},${newLng},${newAlt}`);
      mapContainer.setAttribute('tilt', newTilt.toString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        if (!mapRef.current || !isMounted || !window.google?.maps) return;

        let mapContainer = map3DElementRef.current;
        
        if (!mapContainer) {
          mapContainer = document.createElement('gmp-map-3d');
          mapContainer.style.width = '100%';
          mapContainer.style.height = '100%';
          mapContainer.style.position = 'absolute';
          mapContainer.style.inset = '0';
          
          // Set initial world view
          mapContainer.setAttribute('center', '0,0,25000000');
          mapContainer.setAttribute('tilt', '0');
          mapContainer.setAttribute('heading', '0');
          
          if (mapRef.current.firstChild) {
            mapRef.current.removeChild(mapRef.current.firstChild);
          }
          mapRef.current.appendChild(mapContainer);
          map3DElementRef.current = mapContainer;

          if (onMapLoad) {
            onMapLoad(mapContainer);
          }
        }

        // Update map view when center changes
        if (center) {
          await flyTo(mapContainer, center);

          // Update or create marker
          if (markerRef.current) {
            mapContainer.removeChild(markerRef.current);
          }
          if (polygonRef.current) {
            mapContainer.removeChild(polygonRef.current);
          }

          const marker = document.createElement('gmp-marker-3d');
          marker.setAttribute('position', `${center.lat},${center.lng},50`);
          marker.setAttribute('title', locationName || 'Selected Location');
          marker.setAttribute('altitude-mode', 'RELATIVE_TO_GROUND');
          marker.setAttribute('extruded', 'true');
          mapContainer.appendChild(marker);
          markerRef.current = marker;

          // Create polygon around the location
          polygonRef.current = await createPolygon(mapContainer, center);
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Wait for Google Maps API to load
    const checkGoogleMapsLoaded = setInterval(() => {
      if (window.google?.maps) {
        clearInterval(checkGoogleMapsLoaded);
        initMap();
      }
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(checkGoogleMapsLoaded);
      if (orbitIntervalRef.current) {
        clearInterval(orbitIntervalRef.current);
      }
    };
  }, [center, onMapLoad, locationName]);

  // Handle auto-orbit
  useEffect(() => {
    if (autoOrbit && map3DElementRef.current) {
      orbitIntervalRef.current = window.setInterval(() => {
        const currentHeading = parseFloat(map3DElementRef.current.getAttribute('heading')) || 0;
        map3DElementRef.current.setAttribute('heading', ((currentHeading + 1) % 360).toString());
      }, 100);
    } else if (orbitIntervalRef.current) {
      clearInterval(orbitIntervalRef.current);
    }

    return () => {
      if (orbitIntervalRef.current) {
        clearInterval(orbitIntervalRef.current);
      }
    };
  }, [autoOrbit]);

  return (
    <div ref={mapRef} className="w-full h-full relative">
      <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          <div className="pointer-events-auto">
            <MapControls
              showLabels={true}
              autoOrbit={autoOrbit}
              onToggleOrbit={() => setAutoOrbit(!autoOrbit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};