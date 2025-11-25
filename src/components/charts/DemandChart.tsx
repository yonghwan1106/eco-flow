"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { DemandPrediction } from "@/data/mock/predictions";

interface DemandChartProps {
  data: DemandPrediction[];
  title?: string;
}

export function DemandChart({ data, title }: DemandChartProps) {
  // 오늘 날짜 찾기
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length && label) {
                const labelStr = String(label);
                const date = new Date(labelStr);
                const isToday = labelStr === today;
                const isFuture = labelStr > today;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium text-sm">
                      {date.getMonth() + 1}월 {date.getDate()}일
                      {isToday && (
                        <span className="ml-2 text-xs text-green-600">오늘</span>
                      )}
                      {isFuture && (
                        <span className="ml-2 text-xs text-blue-600">예측</span>
                      )}
                    </p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">P90 (상한):</span>
                        <span className="font-medium">{payload[0]?.payload?.p90}건</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">P50 (중앙):</span>
                        <span className="font-medium text-green-600">{payload[0]?.payload?.p50}건</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">P10 (하한):</span>
                        <span className="font-medium">{payload[0]?.payload?.p10}건</span>
                      </div>
                      {payload[0]?.payload?.actual !== undefined && (
                        <div className="flex justify-between gap-4 pt-1 border-t">
                          <span className="text-gray-500">실제:</span>
                          <span className="font-medium text-blue-600">{payload[0]?.payload?.actual}건</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            x={today}
            stroke="#6b7280"
            strokeDasharray="5 5"
            label={{ value: "오늘", position: "top", fontSize: 10 }}
          />
          {/* P90 영역 (가장 넓은 범위) */}
          <Area
            type="monotone"
            dataKey="p90"
            stroke="transparent"
            fill="url(#colorP90)"
          />
          {/* P10-P90 사이 영역 */}
          <Area
            type="monotone"
            dataKey="p50"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#colorP50)"
          />
          {/* P10 하한선 */}
          <Area
            type="monotone"
            dataKey="p10"
            stroke="#22c55e"
            strokeWidth={1}
            strokeDasharray="3 3"
            fill="transparent"
          />
          {/* 실제 값 (있는 경우) */}
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="transparent"
            dot={{ fill: "#3b82f6", r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full opacity-50" />
          <span>예측 범위 (P10-P90)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-green-500" />
          <span>예측 중앙값 (P50)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-blue-500" />
          <span>실제 값</span>
        </div>
      </div>
    </div>
  );
}
