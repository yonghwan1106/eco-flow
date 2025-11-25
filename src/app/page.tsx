import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  LayoutDashboard,
  TrendingUp,
  Route,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Truck,
  BarChart3,
  Info,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "물류 관제탑",
      description: "실시간 상호대차 현황을 한눈에 모니터링하고 AI 추천 알림을 받습니다.",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "bg-blue-500",
    },
    {
      title: "AI 수요 예측",
      description: "DeepAR 알고리즘으로 도서 대출 수요를 예측하고 선제적으로 대응합니다.",
      icon: TrendingUp,
      href: "/demand-forecast",
      color: "bg-orange-500",
    },
    {
      title: "친환경 경로 최적화",
      description: "탄소 배출을 최소화하는 Eco-Choice 경로를 추천받습니다.",
      icon: Route,
      href: "/eco-route",
      color: "bg-green-500",
    },
    {
      title: "한강 프로토콜",
      description: "급발진 수요 감지 및 자동 대응 메커니즘을 관리합니다.",
      icon: AlertTriangle,
      href: "/trend-alert",
      color: "bg-red-500",
    },
  ];

  const stats = [
    { label: "참여 도서관", value: "1,247", icon: BookOpen },
    { label: "일일 상호대차", value: "15,420", icon: Truck },
    { label: "탄소 절감", value: "32%", icon: Leaf },
    { label: "예측 정확도", value: "94.2%", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
            책이음서비스 공모전「AI 활용 아이디어 챌린지」
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <span className="text-green-600">Eco-Flow</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            AI 기반 초연결 상호대차 최적화 및 능동형 장서 순환 시스템
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
            책이음 상호대차 데이터와 AI를 결합하여 도서 수요를 예측하고,
            장서를 선제적으로 이동시키는 능동형 물류 시스템입니다.
            탄소 배출 최소화 경로를 제안하여 ESG 경영도 지원합니다.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Info className="mr-2 h-5 w-5" />
                프로젝트 소개
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Leaf className="mr-2 h-5 w-5" />
                대시보드 시작하기
              </Button>
            </Link>
            <Link href="/trend-alert">
              <Button size="lg" variant="outline">
                한강 프로토콜 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">핵심 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${feature.color} text-white`}
                      >
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">
            📚 책이음과 함께하는 AI 활용 아이디어 챌린지 출품작
          </p>
          <p>
            Eco-Flow: AI 기반 도서관 물류 최적화 시스템 | 주제 ③ 도서관 서비스 혁신
          </p>
        </div>
      </footer>
    </div>
  );
}
