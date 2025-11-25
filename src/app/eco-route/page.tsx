"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LibraryMap } from "@/components/map/LibraryMap";
import { CarbonChart } from "@/components/charts/CarbonChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  generateRouteComparison,
  generateMonthlyCarbonData,
} from "@/data/mock/predictions";
import { libraries, calculateDistance } from "@/data/mock/libraries";
import {
  Leaf,
  Zap,
  Truck,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function EcoRoutePage() {
  const [selectedFrom, setSelectedFrom] = useState("LIB002"); // 서울도서관
  const [selectedTo, setSelectedTo] = useState("LIB011"); // 수원시중앙도서관
  const [selectedRoute, setSelectedRoute] = useState<"fast" | "standard" | "eco">("eco");

  const fromLib = libraries.find((l) => l.id === selectedFrom);
  const toLib = libraries.find((l) => l.id === selectedTo);

  const distance = fromLib && toLib
    ? calculateDistance(fromLib.coordinates, toLib.coordinates)
    : 30;

  const routes = generateRouteComparison(selectedFrom, selectedTo, distance);
  const monthlyCarbonData = generateMonthlyCarbonData();

  // 물류 흐름 라인 데이터 - 3가지 경로 모두 표시
  const flowLines = fromLib && toLib
    ? [
        {
          from: fromLib.coordinates,
          to: [fromLib.coordinates[0] + 0.05, fromLib.coordinates[1] + 0.02] as [number, number],
          intensity: selectedRoute === "fast" ? 1.0 : 0.3,
          type: "fast" as const,
        },
        {
          from: [fromLib.coordinates[0] + 0.05, fromLib.coordinates[1] + 0.02] as [number, number],
          to: toLib.coordinates,
          intensity: selectedRoute === "fast" ? 1.0 : 0.3,
          type: "fast" as const,
        },
        {
          from: fromLib.coordinates,
          to: [37.48, 127.02] as [number, number], // 허브 경유
          intensity: selectedRoute === "standard" ? 1.0 : 0.3,
          type: "standard" as const,
        },
        {
          from: [37.48, 127.02] as [number, number],
          to: toLib.coordinates,
          intensity: selectedRoute === "standard" ? 1.0 : 0.3,
          type: "standard" as const,
        },
        {
          from: fromLib.coordinates,
          to: [37.45, 126.95] as [number, number], // 친환경 중간점 1
          intensity: selectedRoute === "eco" ? 1.0 : 0.3,
          type: "eco" as const,
        },
        {
          from: [37.45, 126.95] as [number, number],
          to: [37.35, 127.0] as [number, number], // 친환경 중간점 2
          intensity: selectedRoute === "eco" ? 1.0 : 0.3,
          type: "eco" as const,
        },
        {
          from: [37.35, 127.0] as [number, number],
          to: toLib.coordinates,
          intensity: selectedRoute === "eco" ? 1.0 : 0.3,
          type: "eco" as const,
        },
      ]
    : [];

  return (
    <div className="min-h-screen">
      <Header
        title="친환경 경로 최적화"
        description="탄소 배출 최소화 물류 라우팅 시스템"
      />

      <div className="p-6">
        {/* 경로 선택 */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">배송 경로 비교</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">
                  출발 도서관
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedFrom}
                  onChange={(e) => setSelectedFrom(e.target.value)}
                >
                  {libraries.slice(0, 10).map((lib) => (
                    <option key={lib.id} value={lib.id}>
                      {lib.name}
                    </option>
                  ))}
                </select>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground mt-6" />
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">
                  도착 도서관
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedTo}
                  onChange={(e) => setSelectedTo(e.target.value)}
                >
                  {libraries.slice(10, 20).map((lib) => (
                    <option key={lib.id} value={lib.id}>
                      {lib.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3가지 경로 옵션 */}
            <div className="grid md:grid-cols-3 gap-4">
              {routes.map((route) => (
                <div
                  key={route.routeType}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRoute === route.routeType
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedRoute(route.routeType as "fast" | "standard" | "eco")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {route.routeType === "fast" && (
                        <Zap className="h-5 w-5 text-red-500" />
                      )}
                      {route.routeType === "standard" && (
                        <Truck className="h-5 w-5 text-yellow-500" />
                      )}
                      {route.routeType === "eco" && (
                        <Leaf className="h-5 w-5 text-green-500" />
                      )}
                      <span className="font-medium">{route.routeName}</span>
                    </div>
                    {selectedRoute === route.routeType && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        소요시간
                      </span>
                      <span className="font-medium">{route.time}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">거리</span>
                      <span className="font-medium">{route.distance.toFixed(1)}km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">탄소배출</span>
                      <span
                        className="font-medium"
                        style={{ color: route.color }}
                      >
                        {route.carbonEmission.toFixed(2)} kgCO2eq
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">예상비용</span>
                      <span className="font-medium">
                        {route.cost.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  {route.routeType === "eco" && (
                    <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-700">
                      🌳 탄소 64% 절감 (나무 {Math.round(routes[0].carbonEmission - route.carbonEmission) * 45}그루 효과)
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Leaf className="h-4 w-4 mr-2" />
                Eco-Choice로 배송 요청
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 지도 + 탄소 차트 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">경로 시각화</CardTitle>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-red-500" />
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-yellow-500" />
                    <span>Standard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-green-500 border-dashed" style={{borderStyle: 'dashed'}} />
                    <span>Eco</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] rounded-b-lg overflow-hidden">
                <LibraryMap showFlows={true} flowLines={flowLines} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">월별 탄소 배출 추이</CardTitle>
                <Badge variant="outline" className="text-xs text-green-600">
                  Eco-Flow 도입 효과
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CarbonChart data={monthlyCarbonData} />
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <Leaf className="h-4 w-4" />
                  올해 누적 탄소 절감량
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {monthlyCarbonData
                      .reduce((sum, d) => sum + d.saved, 0)
                      .toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">kgCO2eq</span>
                  <Badge className="ml-2 bg-green-600">
                    🌳 {Math.round(
                      monthlyCarbonData.reduce((sum, d) => sum + d.saved, 0) / 22
                    )}
                    그루 나무 효과
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
