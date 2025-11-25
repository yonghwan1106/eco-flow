"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { DemandChart } from "@/components/charts/DemandChart";
import {
  generateTrendingKeywords,
  generateDemandPredictions,
} from "@/data/mock/predictions";
import { popularBooks } from "@/data/mock/transactions";
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  BookOpen,
  Pause,
  Truck,
  Users,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function TrendAlertPage() {
  const trendingKeywords = generateTrendingKeywords();
  const hanKangBooks = popularBooks.filter((b) => b.author === "한강");
  const alertKeywords = trendingKeywords.filter((k) => k.isAlert);

  // 한강 프로토콜 상태 (2025년 11월 - 노벨문학상 1주년 기념 재발동)
  const protocolStatus = {
    isActive: true,
    activatedAt: "2025-11-10 09:15",
    trigger: "한강 작가 도서 대출 속도 +2σ 초과",
    affectedBooks: hanKangBooks.length,
    waitingUsers: 523,
    estimatedNormalization: "5일",
  };

  const protocolActions = [
    {
      id: 1,
      action: "유동 장서 동결",
      description: "한강 작가 도서의 자유 유동 정책 즉시 중단",
      status: "active",
      icon: Pause,
    },
    {
      id: 2,
      action: "허브 회수 지시",
      description: "반납 도서를 거점 도서관으로 강제 이동",
      status: "active",
      icon: Truck,
    },
    {
      id: 3,
      action: "대출 기간 단축",
      description: "14일 → 7일로 한시적 단축 (관리자 승인 대기)",
      status: "pending",
      icon: Clock,
    },
    {
      id: 4,
      action: "지역 클러스터 매칭",
      description: "대기자를 인근 도서관 재고와 자동 매칭",
      status: "active",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="한강 프로토콜"
        description="급발진 수요 대응 메커니즘"
      />

      <div className="p-6">
        {/* 긴급 알림 배너 */}
        <Alert variant="destructive" className="mb-6 border-red-300 bg-red-50">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-red-800">
            🚨 한강 프로토콜 발동 중
          </AlertTitle>
          <AlertDescription className="text-red-700">
            2024년 한강 작가 노벨문학상 수상 1주년을 맞아 도서 대출 수요가
            다시 급증하고 있습니다. 현재 시스템이 자동으로 수요 분산 및
            재고 최적화를 수행 중입니다.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          {/* 프로토콜 상태 */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-500" />
                프로토콜 상태
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">상태</span>
                  <Badge variant="destructive" className="animate-pulse">
                    발동 중
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">발동 시각</span>
                  <span className="text-sm font-medium">
                    {protocolStatus.activatedAt}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">트리거</span>
                  <span className="text-sm font-medium text-red-600">+2σ 초과</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">영향 도서</span>
                  <span className="text-sm font-bold">
                    {protocolStatus.affectedBooks}종
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">대기 이용자</span>
                  <span className="text-sm font-bold text-orange-600">
                    {protocolStatus.waitingUsers}명
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">예상 정상화</span>
                  <span className="text-sm font-medium">
                    {protocolStatus.estimatedNormalization}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 급상승 키워드 */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                급상승 감지 키워드 (2σ 초과)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {alertKeywords.map((keyword) => (
                  <div
                    key={keyword.keyword}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-medium">{keyword.keyword}</div>
                        <div className="text-xs text-muted-foreground">
                          {keyword.category === "author" && "저자"}
                          {keyword.category === "title" && "도서"}
                          {keyword.category === "genre" && "장르"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        +{keyword.changePercent.toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {keyword.velocity.toFixed(1)}건/시간
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 자동 조치 현황 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">자동 대응 조치 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {protocolActions.map((action) => (
                <div
                  key={action.id}
                  className={`p-4 rounded-lg border ${
                    action.status === "active"
                      ? "bg-green-50 border-green-200"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <action.icon
                      className={`h-5 w-5 ${
                        action.status === "active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    />
                    <span className="font-medium text-sm">{action.action}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {action.description}
                  </p>
                  <Badge
                    variant={action.status === "active" ? "default" : "secondary"}
                    className={
                      action.status === "active"
                        ? "bg-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {action.status === "active" ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        실행 중
                      </>
                    ) : (
                      "승인 대기"
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 영향 도서 및 수요 추이 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                영향 도서 목록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hanKangBooks.map((book) => (
                  <div
                    key={book.isbn}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">{book.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {book.author} · {book.publisher}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">인기도 {book.popularity}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">한강 작가 도서 수요 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <DemandChart
                data={generateDemandPredictions(200)}
                title="노벨상 1주년 기념 대출 추이"
              />
            </CardContent>
          </Card>
        </div>

        {/* 수동 조치 버튼 */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">관리자 수동 조치</h3>
                <p className="text-sm text-muted-foreground">
                  자동 조치 외에 추가적인 수동 개입이 필요한 경우
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  대출기간 7일로 단축 승인
                </Button>
                <Button variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                  <Pause className="h-4 w-4 mr-2" />
                  프로토콜 일시 중지
                </Button>
                <Button variant="destructive">
                  프로토콜 해제
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
