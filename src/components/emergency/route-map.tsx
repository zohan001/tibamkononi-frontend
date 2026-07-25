'use client';

import dynamic from 'next/dynamic';

interface RouteMapProps {
  origin?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  hospitalName?: string;
}

const MapInner = dynamic(
  () => import('./route-map-inner').then((m) => m.RouteMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
);

export function RouteMap({
  origin = { lat: -4.0435, lng: 39.6682 },
  destination = { lat: -4.0583, lng: 39.6722 },
  hospitalName = 'Nearest Hospital',
}: RouteMapProps) {
  return <MapInner origin={origin} destination={destination} hospitalName={hospitalName} />;
}
