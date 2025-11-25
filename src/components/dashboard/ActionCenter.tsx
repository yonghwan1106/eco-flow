"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  TrendingUp,
  Truck,
  BookOpen,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ActionItem {
  id: string;
  type: "shortage" | "trend" | "delivery" | "recommendation";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  library?: string;
  book?: string;
  timestamp: string;
}

interface ActionCenterProps {
  actions: ActionItem[];
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ActionCenter({ actions, onAccept, onReject }: ActionCenterProps) {
  const getIcon = (type: ActionItem["type"]) => {
    switch (type) {
      case "shortage":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "trend":
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case "delivery":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "recommendation":
        return <BookOpen className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityBadge = (priority: ActionItem["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            긴급
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
            주의
          </Badge>
        );
      case "low":
        return (
          <Badge variant="secondary" className="text-xs">
            정보
          </Badge>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">AI 추천 알림</CardTitle>
          <Badge variant="outline" className="text-xs">
            {actions.length}건
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-3 pb-4">
            {actions.map((action) => (
              <div
                key={action.id}
                className="rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(action.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityBadge(action.priority)}
                      <span className="text-xs text-muted-foreground">
                        {action.timestamp}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-tight">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                    {(action.library || action.book) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {action.library && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            📍 {action.library}
                          </span>
                        )}
                        {action.book && (
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                            📚 {action.book}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => onAccept?.(action.id)}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        수락
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-muted-foreground"
                        onClick={() => onReject?.(action.id)}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        무시
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// 샘플 알림 데이터 생성
export function generateSampleActions(): ActionItem[] {
  return [
    {
      id: "1",
      type: "shortage",
      priority: "high",
      title: "'채식주의자' 재고 부족 예상",
      description:
        "내일 예상 수요 15건 대비 현재 재고 2권. 인근 강남도서관에서 5권 이송을 권장합니다.",
      library: "서울도서관",
      book: "채식주의자 (한강)",
      timestamp: "5분 전",
    },
    {
      id: "2",
      type: "trend",
      priority: "high",
      title: "한강 작가 도서 급발진 감지",
      description:
        "지난 1시간 대출 속도가 평소 대비 1,310% 증가. '한강 프로토콜' 발동을 권장합니다.",
      book: "한강 작가 전 작품",
      timestamp: "12분 전",
    },
    {
      id: "3",
      type: "delivery",
      priority: "medium",
      title: "친환경 배송 경로 제안",
      description:
        "오후 3시 수원-성남 정기 배송에 여유 공간 발생. 대기 중인 상호대차 5건 합배송 가능.",
      library: "수원시중앙도서관",
      timestamp: "28분 전",
    },
    {
      id: "4",
      type: "recommendation",
      priority: "low",
      title: "대출 기간 단축 권장",
      description:
        "'소년이 온다' 대기자 47명. 대출 기간을 14일에서 7일로 단축하면 회전율 2배 향상 예상.",
      book: "소년이 온다 (한강)",
      timestamp: "1시간 전",
    },
    {
      id: "5",
      type: "shortage",
      priority: "medium",
      title: "'트렌드 코리아 2025' 재고 주의",
      description:
        "주말 예상 수요 증가. 현재 재고로 2일간 소진 예상. 추가 확보를 권장합니다.",
      library: "인천광역시중앙도서관",
      book: "트렌드 코리아 2025",
      timestamp: "2시간 전",
    },
  ];
}
