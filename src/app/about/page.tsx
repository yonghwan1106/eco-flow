"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Leaf,
  TrendingUp,
  Truck,
  AlertTriangle,
  Target,
  Lightbulb,
  Users,
  Zap,
  BarChart3,
  Route,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const problemPoints = [
    {
      title: "유동 장서의 한계",
      description: "이용자 반납 패턴에 의존하는 수동적 모델로, 급격한 수요 변화에 대응 불가",
      icon: BookOpen,
    },
    {
      title: "풀링 효과",
      description: "교통 요지 대형 도서관으로 장서 쏠림, 외곽 도서관 인기 도서 고갈",
      icon: Users,
    },
    {
      title: "급발진 수요",
      description: "노벨상, 영화화 등 문화 이벤트 시 대출량 1,310% 폭증에 무방비",
      icon: AlertTriangle,
    },
  ];

  const solutions = [
    {
      title: "AI 수요 예측",
      description: "DeepAR 알고리즘으로 도서별 대출 수요를 확률적으로 예측 (P10-P50-P90)",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "능동형 장서 순환",
      description: "예측 기반 선제 이송으로 수요 발생 지점에 도서 사전 배치",
      icon: Truck,
      color: "bg-blue-500",
    },
    {
      title: "친환경 경로 최적화",
      description: "ISO 14083 기반 탄소 배출 산정, Eco-Choice 경로 우선 추천",
      icon: Route,
      color: "bg-green-500",
    },
    {
      title: "한강 프로토콜",
      description: "급발진 수요 자동 감지 및 4단계 대응 메커니즘 즉시 발동",
      icon: Zap,
      color: "bg-red-500",
    },
  ];

  const techStack = [
    { category: "프론트엔드", items: ["Next.js 14", "React", "Tailwind CSS", "Shadcn/UI"] },
    { category: "시각화", items: ["React-Leaflet", "Recharts", "지리적 히트맵"] },
    { category: "AI 모델", items: ["DeepAR", "AWS SageMaker", "확률적 시계열 예측"] },
    { category: "경로 계산", items: ["OSRM API", "실주행 거리 산정", "탄소 배출 계산"] },
  ];

  const expectedResults = [
    { label: "상호대차 처리 시간", before: "평균 5일", after: "평균 2일", improvement: "60% 단축" },
    { label: "탄소 배출량", before: "100% 기준", after: "68%", improvement: "32% 절감" },
    { label: "수요 예측 정확도", before: "-", after: "94.2%", improvement: "신규 도입" },
    { label: "급발진 수요 대응", before: "사후 대응", after: "선제 대응", improvement: "패러다임 전환" },
  ];

  const dataUsage = [
    { name: "도서 대출 현황 정보", usage: "실시간 재고 파악 및 수요 예측" },
    { name: "도서 대출 이력 정보", usage: "AI 학습용 시계열 데이터" },
    { name: "상호대차 타관도서 대여 정보", usage: "도서관 간 물류 흐름 분석" },
    { name: "타관반납 정보", usage: "자연적 장서 이동 패턴 학습" },
    { name: "도서관 정보", usage: "물류 네트워크 노드 구성" },
  ];

  return (
    <div className="min-h-screen">
      <Header title="프로젝트 소개" description="Eco-Flow 시스템 개요 및 기대 효과" />

      <div className="p-6 space-y-8">
        {/* 제안 개요 */}
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600 text-white">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <Badge className="mb-1 bg-green-100 text-green-700">책이음서비스 공모전「AI 활용 아이디어 챌린지」</Badge>
                <CardTitle className="text-xl">Eco-Flow: AI 기반 초연결 상호대차 최적화 시스템</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              책이음 상호대차 데이터와 DeepAR AI를 결합하여 도서 대출 수요를 예측하고,
              친환경 경로 최적화로 탄소 배출 32% 절감. 한강 프로토콜로 급발진 수요에 선제 대응하는
              <strong className="text-green-700"> 능동형 장서 순환 시스템</strong>입니다.
            </p>
          </CardContent>
        </Card>

        {/* 제안 배경 */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            제안 배경: 현행 시스템의 문제점
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {problemPoints.map((point) => (
              <Card key={point.title} className="border-red-100 bg-red-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600">
                      <point.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-4 border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
              <p className="text-sm text-orange-800">
                <strong>2024년 10월 한강 작가 노벨문학상 수상</strong> 직후 5일간 대출량
                <strong> 11,356건 (전주 대비 1,310.7% 폭증)</strong>.
                특정 도서관 도서 편중, 대기자 수백 명 '대출 절벽' 현상 발생.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 핵심 솔루션 */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            핵심 솔루션
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {solutions.map((solution) => (
              <Card key={solution.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${solution.color} text-white`}>
                      <solution.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{solution.title}</h3>
                      <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 책이음 데이터 활용 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              책이음 제공 데이터 활용 계획
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataUsage.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="font-medium text-sm">{data.name}</span>
                  <span className="text-sm text-muted-foreground">{data.usage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기술 스택 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              기술 스택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {techStack.map((stack) => (
                <div key={stack.category}>
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">{stack.category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {stack.items.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기대 효과 */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-500" />
            기대 효과
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">지표</th>
                      <th className="text-center py-2 font-medium">현행</th>
                      <th className="text-center py-2 font-medium">도입 후</th>
                      <th className="text-right py-2 font-medium">개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expectedResults.map((result) => (
                      <tr key={result.label} className="border-b last:border-0">
                        <td className="py-3">{result.label}</td>
                        <td className="text-center py-3 text-muted-foreground">{result.before}</td>
                        <td className="text-center py-3 font-medium text-green-600">{result.after}</td>
                        <td className="text-right py-3">
                          <Badge className="bg-green-100 text-green-700">{result.improvement}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 구축 로드맵 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" />
              구축 로드맵
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { phase: "Phase 1", title: "기반 구축", items: ["대시보드 프레임워크", "데이터 마이그레이션"] },
                { phase: "Phase 2", title: "AI 지능화", items: ["DeepAR 모델 학습", "한강 프로토콜 구현"] },
                { phase: "Phase 3", title: "시각화 고도화", items: ["물류 흐름 애니메이션", "탄소 산정 모듈"] },
                { phase: "Phase 4", title: "확장", items: ["드론/자율주행 연계", "전국 책이음 API 연동"] },
              ].map((roadmap, idx) => (
                <div key={roadmap.phase} className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      idx === 0 ? "bg-green-500" : "bg-gray-300"
                    }`}>
                      {idx === 0 ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{roadmap.phase}</div>
                      <div className="font-medium text-sm">{roadmap.title}</div>
                    </div>
                  </div>
                  <ul className="ml-10 text-xs text-muted-foreground space-y-1">
                    {roadmap.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 결론 */}
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold mb-3">결론</h2>
            <p className="text-green-100 leading-relaxed mb-4">
              <strong className="text-white">Eco-Flow</strong>는 도서관을 '책을 쌓아두는 곳'에서
              <strong className="text-white"> '책이 시민을 향해 흐르는 살아있는 혈관'</strong>으로 재정의합니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 text-white hover:bg-white/30">AI 예측으로 비효율성 극복</Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">한강 프로토콜로 유연한 대응</Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">2050 탄소중립 목표 기여</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
