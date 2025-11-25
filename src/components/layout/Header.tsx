"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, TrendingUp, Truck, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  description?: string;
}

// 샘플 알림 데이터
const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "'채식주의자' 재고 부족 예상",
    message: "내일 예상 수요 15건 대비 현재 재고 2권",
    time: "5분 전",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "urgent",
    title: "한강 작가 도서 급발진 감지",
    message: "대출 속도 평소 대비 1,310% 증가",
    time: "12분 전",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "warning",
    title: "친환경 배송 경로 제안",
    message: "수원-성남 합배송 5건 가능",
    time: "28분 전",
    icon: Truck,
  },
];

export function Header({ title, description }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* 알림 버튼 및 드롭다운 */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {notifications.length}
            </Badge>
          </Button>

          {/* 알림 드롭다운 */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-white shadow-lg z-50">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-sm">알림</span>
                  <Badge variant="secondary" className="text-xs">
                    {notifications.length}건
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-l-4 hover:bg-gray-50 cursor-pointer transition-colors ${getTypeStyles(
                      notification.type
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      <notification.icon
                        className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getIconColor(
                          notification.type
                        )}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm truncate">
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  모든 알림 보기
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
          관
        </div>
      </div>
    </header>
  );
}
