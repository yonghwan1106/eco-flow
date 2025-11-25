"use client";

import dynamic from "next/dynamic";

// SSR 비활성화하여 Leaflet 로드
const LibraryMapClient = dynamic(
  () => import("./LibraryMapClient"),
  {
    loading: () => (
      <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">
        <span className="text-gray-400">지도 로딩 중...</span>
      </div>
    ),
    ssr: false,
  }
);

interface FlowLine {
  from: [number, number];
  to: [number, number];
  intensity: number;
  type: "fast" | "standard" | "eco";
}

interface LibraryMapProps {
  showFlows?: boolean;
  flowLines?: FlowLine[];
  selectedLibrary?: string | null;
  onLibrarySelect?: (libraryId: string) => void;
  heatmapData?: { libraryId: string; intensity: number }[];
  className?: string;
}

export function LibraryMap({
  showFlows = false,
  flowLines = [],
  selectedLibrary = null,
  onLibrarySelect,
  heatmapData = [],
  className = "",
}: LibraryMapProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <LibraryMapClient
        showFlows={showFlows}
        flowLines={flowLines}
        selectedLibrary={selectedLibrary}
        onLibrarySelect={onLibrarySelect}
        heatmapData={heatmapData}
      />
    </div>
  );
}
