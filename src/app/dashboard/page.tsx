"use client";

import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActionCenter, generateSampleActions } from "@/components/dashboard/ActionCenter";
import { LibraryMap } from "@/components/map/LibraryMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateKPIData } from "@/data/mock/predictions";
import { libraries } from "@/data/mock/libraries";
import {
  Truck,
  Leaf,
  TrendingUp,
  AlertTriangle,
  Clock,
  Route,
} from "lucide-react";

export default function DashboardPage() {
  const kpi = generateKPIData();
  const actions = generateSampleActions();

  // 히트맵 데이터 생성 (도서관별 대출 밀도)
  const heatmapData = libraries.slice(0, 10).map((lib) => ({
    libraryId: lib.id,
    intensity: Math.random(), // 실제로는 대출 데이터 기반
  }));

  return (
    <div className="min-h-screen">
      <Header title="물류 관제탑" description="실시간 상호대차 현황 모니터링" />

      <div className="p-6">
        {/* KPI 카드 그리드 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <KPICard
            title="금일 상호대차"
            value={kpi.todayILL}
            unit="건"
            change={kpi.todayILLChange}
            icon={Truck}
            iconColor="text-blue-500"
            trend="up"
            trendPositive={true}
          />
          <KPICard
            title="탄소 배출량"
            value={kpi.carbonEmission}
            unit="kgCO2eq"
            change={kpi.carbonChange}
            icon={Leaf}
            iconColor="text-green-500"
            trend="down"
            trendPositive={true}
          />
          <KPICard
            title="한강 지수"
            value={kpi.hanKangIndex}
            unit="/100"
            icon={TrendingUp}
            iconColor="text-orange-500"
            trend="up"
            trendPositive={false}
            description="급발진 수요 위험도 (높을수록 주의)"
          />
          <KPICard
            title="활성 알림"
            value={kpi.activeAlerts}
            unit="건"
            icon={AlertTriangle}
            iconColor="text-red-500"
          />
        </div>

        {/* 보조 KPI */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 배송시간</p>
                  <p className="text-xl font-bold">{kpi.avgDeliveryTime}시간</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">친환경 경로 사용률</p>
                  <p className="text-xl font-bold">{kpi.ecoRouteRate}%</p>
                </div>
                <Route className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    현재 급상승 트렌드
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="destructive">한강 +1,310%</Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      채식주의자 +890%
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      소년이 온다 +720%
                    </Badge>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 콘텐츠: 지도 + 알림 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 지도 */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">도서관 현황 지도</CardTitle>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span>핫스팟</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span>콜드스팟</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] rounded-b-lg overflow-hidden">
                <LibraryMap heatmapData={heatmapData} />
              </div>
            </CardContent>
          </Card>

          {/* AI 추천 알림 */}
          <ActionCenter
            actions={actions}
            onAccept={(id) => console.log("Accepted:", id)}
            onReject={(id) => console.log("Rejected:", id)}
          />
        </div>
      </div>
    </div>
  );
}
