// components/CourtMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: (markerIcon as any).src ?? (markerIcon as any),
  iconRetinaUrl: (markerIcon2x as any).src ?? (markerIcon2x as any),
  shadowUrl: (markerShadow as any).src ?? (markerShadow as any),
});
L.Marker.prototype.options.icon = DefaultIcon;

export type Court = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  link: string;
};

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 0.7 });
  }, [lat, lng, map]);
  return null;
}

export default function CourtMap({
  courts,
  focusId,
}: {
  courts: Court[];
  focusId?: string | null;
}) {
  const defaultCenter: [number, number] = [50.0614, 19.9372]; // Kraków
  const focused = courts.find((c) => c.id === focusId);

  return (
    <MapContainer
      center={focused ? [focused.lat, focused.lng] : defaultCenter}
      zoom={12}
      scrollWheelZoom
      className="h-[520px] w-full rounded-2xl shadow"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {focused && <FlyTo lat={focused.lat} lng={focused.lng} />}
      {courts.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-600">{c.address}</div>
              <a className="text-amber-700 underline text-sm" href={c.link} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
