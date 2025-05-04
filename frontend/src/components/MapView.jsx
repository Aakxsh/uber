import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapView = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi

  const circleRef = useRef(null);
  const mapRef = useRef(null);

  // Handle map load and add Circle to map
  const handleMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;

    // Create or update circle when the map is loaded or location changes
    if (mapInstance && !circleRef.current) {
      circleRef.current = new window.google.maps.Circle({
        strokeColor: '#2563EB',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3B82F6',
        fillOpacity: 0.2,
        map: mapInstance,
        center: location,
        radius: 100, // meters
      });
    } else if (circleRef.current) {
      circleRef.current.setCenter(location); // Update the circle position when location changes
    }
  };

  // Get current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-screen w-full touch-action-auto">
        <Map
          center={location}
          zoom={15}
          gestureHandling="greedy"  // Ensure gestures (drag, zoom) are enabled
          disableDefaultUI={false}
          mapId="DEMO_MAP_ID"  // Optional, you can remove this if not using custom map ID
          onLoad={handleMapLoad}
          style={{ width: '100%', height: '100%' }}  // Ensure map takes full height and width
        >
          {/* No need for additional markers as we're displaying the circle */}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
