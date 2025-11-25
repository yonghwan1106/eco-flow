"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Line,
} from "recharts";

interface CarbonChartProps {
  data: { month: string; emission: number; saved: number }[];
}

export function CarbonChart({ data }: CarbonChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11 }}
            label={{
              value: "배출량 (kgCO2eq)",
              angle: -90,
              position: "insideLeft",
              fontSize: 10,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            label={{
              value: "절감량 (kgCO2eq)",
              angle: 90,
              position: "insideRight",
              fontSize: 10,
            }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const emission = payload[0]?.value as number;
                const saved = payload[1]?.value as number;
                const trees = Math.round(saved / 22); // 나무 1그루 연간 22kg CO2 흡수
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium text-sm">{label}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">탄소 배출:</span>
                        <span className="font-medium text-red-600">
                          {emission?.toLocaleString()} kgCO2eq
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">절감량:</span>
                        <span className="font-medium text-green-600">
                          {saved?.toLocaleString()} kgCO2eq
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 pt-1 border-t">
                        <span className="text-gray-500">나무 환산:</span>
                        <span className="font-medium">🌳 {trees}그루</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            formatter={(value) =>
              value === "emission" ? "탄소 배출량" : "Eco-Flow 절감량"
            }
          />
          <Bar
            yAxisId="left"
            dataKey="emission"
            fill="#f87171"
            radius={[4, 4, 0, 0]}
            name="emission"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="saved"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: "#22c55e", r: 4 }}
            name="saved"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 경로별 탄소 배출 비교 차트
interface RouteComparisonChartProps {
  data: {
    routeType: string;
    routeName: string;
    time: number;
    carbonEmission: number;
    color: string;
  }[];
}

export function RouteComparisonChart({ data }: RouteComparisonChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            tick={{ fontSize: 11 }}
            label={{
              value: "탄소 배출량 (kgCO2eq)",
              position: "bottom",
              fontSize: 10,
            }}
          />
          <YAxis
            type="category"
            dataKey="routeName"
            tick={{ fontSize: 11 }}
            width={90}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0]?.payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium text-sm">{item.routeName}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">소요시간:</span>
                        <span className="font-medium">{item.time}분</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">탄소 배출:</span>
                        <span className="font-medium">
                          {item.carbonEmission.toFixed(2)} kgCO2eq
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {data.map((entry, index) => (
            <Bar
              key={index}
              dataKey="carbonEmission"
              radius={[0, 4, 4, 0]}
              fill={entry.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
