'use client';

import { useEffect, useRef } from 'react';

const FRESNO_CENTER = { lat: 36.7378, lng: -119.7871 };
const RADIUS_MILES = 110;
const METERS_PER_MILE = 1609.34;

export default function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    // Avoid loading the script twice
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );

    const initMap = () => {
      const map = new google.maps.Map(mapRef.current!, {
        center: FRESNO_CENTER,
        zoom: 7,
        disableDefaultUI: true,
        zoomControl: true,
      });

      // 150-mile radius circle
      new google.maps.Circle({
        map,
        center: FRESNO_CENTER,
        radius: RADIUS_MILES * METERS_PER_MILE,
        fillColor: '#C8A951',
        fillOpacity: 0.12,
        strokeColor: '#C8A951',
        strokeOpacity: 0.6,
        strokeWeight: 2,
      });

      // Center marker
      new google.maps.Marker({
        map,
        position: FRESNO_CENTER,
        title: 'Fresno, CA – Upscale Outhouse',
      });
    };

    if (existingScript && typeof google !== 'undefined' && google.maps) {
      initMap();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      aria-label="Service area map showing 100-mile radius around Fresno, California"
      role="img"
    />
  );
}
