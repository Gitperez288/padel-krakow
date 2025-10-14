// src/components/CourtMap.tsx
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const RL = dynamic(async () => {
  const mod = await import("react-leaflet");
  return {
    default: function InnerMap(props: any) {
      return <mod.MapContainer {...props} />;
    },
    TileLayer: mod.TileLayer,
    Marker: mod.Marker,
    Popup: mod.Popup,
    useMap: mod.useMap,
  } as any;
}, { ssr: false });

import L from "leaflet";
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
  const map = (RL as any).useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 0.7 });
  }, [lat, lng, map]);
  return null;
}

export function CourtLeafletMap({
  courts,
  focus,
}: {
  courts: Court[];
  focus?: Court | null;
}) {
  const center: [number, number] = focus ? [focus.lat, focus.lng] : [50.0614, 19.9372]; // Kraków

  const MapContainer = RL as any;
  const { TileLayer, Marker, Popup } = RL as any;

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      className="h-[520px] w-full rounded-2xl shadow"
    >
      {focus && <FlyTo lat={focus.lat} lng={focus.lng} />}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      />
      {courts.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-600">{c.address}</div>
              <a className="text-amber-700 underline text-sm" href={c.link} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
