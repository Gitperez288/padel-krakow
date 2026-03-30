"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type Court = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  link: string;
};

interface CourtMapProps {
  courts: Court[];
  focusId?: string | null;
}

const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [14, 41],
});

export default function CourtMap({ courts, focusId }: CourtMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const defaultCenter: [number, number] = [50.0614, 19.9372];

  // Initialize map (only once)
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    try {
      // Create map instance
      mapInstance.current = L.map(mapContainer.current, {
        center: defaultCenter,
        zoom: 12,
        scrollWheelZoom: true,
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstance.current);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      // Don't destroy map on unmount - just clean up markers
      // This prevents re-initialization issues
    };
  }, []);

  // Add/update markers when courts change
  useEffect(() => {
    if (!mapInstance.current) return;

    try {
      // Remove old markers
      Object.values(markersRef.current).forEach((marker) => {
        mapInstance.current?.removeLayer(marker);
      });
      markersRef.current = {};

      // Add new markers
      courts.forEach((court) => {
        const marker = L.marker([court.lat, court.lng], { icon: defaultIcon })
          .addTo(mapInstance.current!)
          .bindPopup(
            `
            <div class="space-y-2">
              <div class="font-semibold text-gray-900">${court.name}</div>
              <div class="text-sm text-gray-600">${court.address}</div>
              <a href="${court.link}" target="_blank" rel="noopener noreferrer" class="text-amber-700 underline text-sm inline-block">
                Open in Google Maps →
              </a>
            </div>
          `
          );

        markersRef.current[court.id] = marker;
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  }, [courts]);

  // Handle focus (fly to court)
  useEffect(() => {
    if (!mapInstance.current || !focusId) return;

    try {
      const focused = courts.find((c) => c.id === focusId);
      if (focused) {
        mapInstance.current.flyTo([focused.lat, focused.lng], 13, {
          duration: 0.7,
        });
        // Open popup
        markersRef.current[focusId]?.openPopup();
      }
    } catch (error) {
      console.error("Error focusing on court:", error);
    }
  }, [focusId, courts]);

  return (
    <div
      ref={mapContainer}
      className="h-[520px] w-full rounded-2xl shadow bg-gray-100"
      style={{ position: "relative" }}
    />
  );
}
