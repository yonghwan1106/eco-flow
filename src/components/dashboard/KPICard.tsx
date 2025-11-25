"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon, HelpCircle } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
  trendPositive?: boolean; // true면 증가가 긍정적, false면 감소가 긍정적
  description?: string; // 툴팁 설명
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel = "전일 대비",
  icon: Icon,
  iconColor = "text-gray-500",
  trend = "neutral",
  trendPositive = true,
  description,
}: KPICardProps) {
  const isPositive =
    trend === "neutral"
      ? null
      : trendPositive
      ? trend === "up"
      : trend === "down";

  return (
    <Card className="relative group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {description && (
            <div className="relative">
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/50 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                {description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          )}
        </div>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trend === "up" && (
              <ArrowUpRight
                className={cn(
                  "h-4 w-4",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              />
            )}
            {trend === "down" && (
              <ArrowDownRight
                className={cn(
                  "h-4 w-4",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isPositive === null
                  ? "text-gray-500"
                  : isPositive
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {change > 0 ? "+" : ""}
              {change}% {changeLabel}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
