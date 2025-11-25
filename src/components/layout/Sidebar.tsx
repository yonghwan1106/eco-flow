"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Route,
  AlertTriangle,
  Leaf,
  BookOpen,
  Info,
} from "lucide-react";

const navigation = [
  {
    name: "프로젝트 소개",
    href: "/about",
    icon: Info,
    description: "시스템 개요",
  },
  {
    name: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "물류 관제탑",
  },
  {
    name: "수요 예측",
    href: "/demand-forecast",
    icon: TrendingUp,
    description: "AI 기반 예측",
  },
  {
    name: "경로 최적화",
    href: "/eco-route",
    icon: Route,
    description: "친환경 라우팅",
  },
  {
    name: "트렌드 알림",
    href: "/trend-alert",
    icon: AlertTriangle,
    description: "한강 프로토콜",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Eco-Flow</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-green-600")} />
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>책이음 AI 챌린지 2025</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
