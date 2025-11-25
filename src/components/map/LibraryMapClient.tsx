"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { libraries } from "@/data/mock/libraries";

interface FlowLine {
  from: [number, number];
  to: [number, number];
  intensity: number; // 0-1
  type: "fast" | "standard" | "eco";
}

interface LibraryMapClientProps {
  showFlows?: boolean;
  flowLines?: FlowLine[];
  selectedLibrary?: string | null;
  onLibrarySelect?: (libraryId: string) => void;
  heatmapData?: { libraryId: string; intensity: number }[];
}

export default function LibraryMapClient({
  showFlows = false,
  flowLines = [],
  selectedLibrary = null,
  onLibrarySelect,
  heatmapData = [],
}: LibraryMapClientProps) {
  const [isClient, setIsClient] = useState(false);
  const iconInitialized = useRef(false);

  useEffect(() => {
    setIsClient(true);

    // Leaflet 아이콘 설정 (한 번만)
    if (!iconInitialized.current && typeof window !== 'undefined') {
      const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = defaultIcon;
      iconInitialized.current = true;
    }
  }, []);

  if (!isClient) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-gray-500 text-sm">지도를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 서울/경기 중심 좌표
  const center: [number, number] = [37.5, 127.0];

  // 히트맵 색상 계산
  const getHeatColor = (intensity: number): string => {
    if (intensity > 0.7) return "#ef4444"; // red (핫스팟)
    if (intensity > 0.4) return "#f97316"; // orange
    if (intensity > 0.2) return "#eab308"; // yellow
    return "#3b82f6"; // blue (콜드스팟)
  };

  // 플로우 라인 색상
  const getFlowColor = (type: "fast" | "standard" | "eco"): string => {
    switch (type) {
      case "fast":
        return "#ef4444";
      case "standard":
        return "#eab308";
      case "eco":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 히트맵 서클 마커 */}
      {heatmapData.map((data) => {
        const lib = libraries.find((l) => l.id === data.libraryId);
        if (!lib) return null;
        return (
          <CircleMarker
            key={`heat-${data.libraryId}`}
            center={lib.coordinates}
            radius={15 + data.intensity * 20}
            fillColor={getHeatColor(data.intensity)}
            fillOpacity={0.4}
            stroke={false}
          />
        );
      })}

      {/* 도서관 마커 */}
      {libraries.map((lib) => (
        <Marker
          key={lib.id}
          position={lib.coordinates}
          eventHandlers={{
            click: () => onLibrarySelect?.(lib.id),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-sm">{lib.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{lib.address}</p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>일일 대출:</span>
                  <span className="font-medium">{lib.dailyLoans.toLocaleString()}건</span>
                </div>
                <div className="flex justify-between">
                  <span>대기 상호대차:</span>
                  <span className="font-medium">{lib.pendingILL}건</span>
                </div>
                <div className="flex justify-between">
                  <span>책바다:</span>
                  <span className={lib.chaekbada ? "text-green-600" : "text-gray-400"}>
                    {lib.chaekbada ? "참여" : "미참여"}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* 물류 흐름 라인 */}
      {showFlows &&
        flowLines.map((flow, idx) => (
          <Polyline
            key={`flow-${idx}`}
            positions={[flow.from, flow.to]}
            color={getFlowColor(flow.type)}
            weight={2 + flow.intensity * 4}
            opacity={0.7}
            dashArray={flow.type === "eco" ? "10, 10" : undefined}
          />
        ))}
    </MapContainer>
  );
}
