'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteMapInnerProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  hospitalName: string;
}

export function RouteMapInner({
  origin,
  destination,
  hospitalName,
}: RouteMapInnerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([origin.lat, origin.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    const accidentIcon = L.divIcon({
      className: '',
      html: `<div style="background:#ef4444;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;box-shadow:0 2px 6px rgba(0,0,0,0.3)">!</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const hospitalIcon = L.divIcon({
      className: '',
      html: `<div style="background:#3b82f6;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;box-shadow:0 2px 6px rgba(0,0,0,0.3)">H</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([origin.lat, origin.lng], { icon: accidentIcon })
      .addTo(map)
      .bindPopup('Accident Location');

    L.marker([destination.lat, destination.lng], { icon: hospitalIcon })
      .addTo(map)
      .bindPopup(hospitalName);

    const polyline = L.polyline(
      [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ],
      {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 6',
      }
    ).addTo(map);

    const bounds = polyline.getBounds().pad(0.2);
    map.fitBounds(bounds);

    instanceRef.current = map;

    return () => {
      map.remove();
      instanceRef.current = null;
    };
  }, [origin.lat, origin.lng, destination.lat, destination.lng, hospitalName]);

  return (
    <div
      ref={mapRef}
      className="h-64 w-full overflow-hidden rounded-lg"
      style={{ zIndex: 0 }}
    />
  );
}
