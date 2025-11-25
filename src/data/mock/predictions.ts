// AI 수요 예측 및 KPI Mock 데이터

export interface DemandPrediction {
  date: string;
  p10: number; // 10% 확률
  p50: number; // 50% 확률 (중앙값)
  p90: number; // 90% 확률
  actual?: number; // 실제 값 (과거 데이터)
}

export interface LibraryDemand {
  libraryId: string;
  libraryName: string;
  bookTitle: string;
  author: string;
  currentStock: number;
  predictedDemand: number;
  gap: number; // 재고 - 예측수요 (음수면 부족)
  urgency: "high" | "medium" | "low";
}

export interface TrendingKeyword {
  keyword: string;
  category: "author" | "title" | "genre";
  velocity: number; // 대출 속도 (건/시간)
  changePercent: number; // 전일 대비 변화율
  isAlert: boolean; // 2σ 초과 여부
}

export interface KPIData {
  todayILL: number;
  todayILLChange: number;
  carbonEmission: number; // kgCO2eq
  carbonChange: number;
  hanKangIndex: number; // 한강 지수 (0-100)
  activeAlerts: number;
  avgDeliveryTime: number; // 평균 배송 시간 (시간)
  ecoRouteRate: number; // 친환경 경로 사용률 (%)
}

// 시계열 수요 예측 데이터 생성 (30일)
export function generateDemandPredictions(
  baseValue: number = 100
): DemandPrediction[] {
  const predictions: DemandPrediction[] = [];
  const today = new Date();

  // 과거 14일 (실제 데이터 포함)
  for (let i = -14; i < 0; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const seasonalFactor = 1 + 0.2 * Math.sin((date.getDay() / 7) * Math.PI * 2);
    const noise = (Math.random() - 0.5) * 0.3;
    const value = baseValue * seasonalFactor * (1 + noise);

    predictions.push({
      date: date.toISOString().split("T")[0],
      p10: Math.round(value * 0.8),
      p50: Math.round(value),
      p90: Math.round(value * 1.2),
      actual: Math.round(value * (0.9 + Math.random() * 0.2)),
    });
  }

  // 미래 14일 (예측만)
  for (let i = 0; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const seasonalFactor = 1 + 0.2 * Math.sin((date.getDay() / 7) * Math.PI * 2);
    const trend = 1 + 0.02 * i; // 약간의 상승 트렌드
    const value = baseValue * seasonalFactor * trend;

    // 불확실성은 미래로 갈수록 증가
    const uncertainty = 0.1 + 0.02 * i;

    predictions.push({
      date: date.toISOString().split("T")[0],
      p10: Math.round(value * (1 - uncertainty)),
      p50: Math.round(value),
      p90: Math.round(value * (1 + uncertainty)),
    });
  }

  return predictions;
}

// 도서관별 수요 예측 부족 리스트
export function generateLibraryDemands(): LibraryDemand[] {
  const demands: LibraryDemand[] = [
    {
      libraryId: "LIB002",
      libraryName: "서울도서관",
      bookTitle: "채식주의자",
      author: "한강",
      currentStock: 2,
      predictedDemand: 15,
      gap: -13,
      urgency: "high",
    },
    {
      libraryId: "LIB003",
      libraryName: "강남도서관",
      bookTitle: "소년이 온다",
      author: "한강",
      currentStock: 1,
      predictedDemand: 12,
      gap: -11,
      urgency: "high",
    },
    {
      libraryId: "LIB004",
      libraryName: "송파도서관",
      bookTitle: "작별하지 않는다",
      author: "한강",
      currentStock: 3,
      predictedDemand: 10,
      gap: -7,
      urgency: "high",
    },
    {
      libraryId: "LIB001",
      libraryName: "국립중앙도서관",
      bookTitle: "흰",
      author: "한강",
      currentStock: 5,
      predictedDemand: 8,
      gap: -3,
      urgency: "medium",
    },
    {
      libraryId: "LIB005",
      libraryName: "마포구립서강도서관",
      bookTitle: "불편한 편의점",
      author: "김호연",
      currentStock: 4,
      predictedDemand: 6,
      gap: -2,
      urgency: "medium",
    },
    {
      libraryId: "LIB011",
      libraryName: "수원시중앙도서관",
      bookTitle: "채식주의자",
      author: "한강",
      currentStock: 2,
      predictedDemand: 9,
      gap: -7,
      urgency: "high",
    },
    {
      libraryId: "LIB012",
      libraryName: "성남시중앙도서관",
      bookTitle: "아몬드",
      author: "손원평",
      currentStock: 3,
      predictedDemand: 5,
      gap: -2,
      urgency: "medium",
    },
    {
      libraryId: "LIB017",
      libraryName: "인천광역시중앙도서관",
      bookTitle: "트렌드 코리아 2025",
      author: "김난도",
      currentStock: 6,
      predictedDemand: 7,
      gap: -1,
      urgency: "low",
    },
  ];

  return demands.sort((a, b) => a.gap - b.gap);
}

// 트렌드 키워드 (한강 프로토콜)
export function generateTrendingKeywords(): TrendingKeyword[] {
  return [
    {
      keyword: "한강",
      category: "author",
      velocity: 45.2,
      changePercent: 1310.7,
      isAlert: true,
    },
    {
      keyword: "채식주의자",
      category: "title",
      velocity: 32.1,
      changePercent: 890.5,
      isAlert: true,
    },
    {
      keyword: "소년이 온다",
      category: "title",
      velocity: 28.7,
      changePercent: 720.3,
      isAlert: true,
    },
    {
      keyword: "노벨문학상",
      category: "genre",
      velocity: 18.4,
      changePercent: 450.2,
      isAlert: true,
    },
    {
      keyword: "불편한 편의점",
      category: "title",
      velocity: 8.2,
      changePercent: 15.3,
      isAlert: false,
    },
    {
      keyword: "트렌드 코리아",
      category: "title",
      velocity: 6.5,
      changePercent: 45.8,
      isAlert: false,
    },
    {
      keyword: "자기계발",
      category: "genre",
      velocity: 5.1,
      changePercent: 8.2,
      isAlert: false,
    },
  ];
}

// KPI 대시보드 데이터
export function generateKPIData(): KPIData {
  return {
    todayILL: 1247,
    todayILLChange: 23.5,
    carbonEmission: 156.8,
    carbonChange: -12.3,
    hanKangIndex: 94,
    activeAlerts: 3,
    avgDeliveryTime: 18.5,
    ecoRouteRate: 67.2,
  };
}

// 탄소 배출 비교 데이터 (경로별)
export interface RouteComparison {
  routeType: "fast" | "standard" | "eco";
  routeName: string;
  distance: number; // km
  time: number; // 분
  carbonEmission: number; // kgCO2eq
  cost: number; // 원
  color: string;
}

export function generateRouteComparison(
  fromLib: string,
  toLib: string,
  distance: number
): RouteComparison[] {
  return [
    {
      routeType: "fast",
      routeName: "직송 (Fast-Track)",
      distance: distance,
      time: Math.round(distance * 2.5),
      carbonEmission: distance * 0.25,
      cost: Math.round(distance * 500),
      color: "#ef4444", // red
    },
    {
      routeType: "standard",
      routeName: "허브 경유 (Standard)",
      distance: distance * 1.3,
      time: Math.round(distance * 4),
      carbonEmission: distance * 0.18,
      cost: Math.round(distance * 350),
      color: "#eab308", // yellow
    },
    {
      routeType: "eco",
      routeName: "친환경 (Eco-Choice)",
      distance: distance * 1.5,
      time: Math.round(distance * 6),
      carbonEmission: distance * 0.09,
      cost: Math.round(distance * 280),
      color: "#22c55e", // green
    },
  ];
}

// 월별 탄소 배출 추이
export function generateMonthlyCarbonData(): { month: string; emission: number; saved: number }[] {
  return [
    { month: "1월", emission: 2450, saved: 320 },
    { month: "2월", emission: 2380, saved: 410 },
    { month: "3월", emission: 2520, saved: 380 },
    { month: "4월", emission: 2280, saved: 520 },
    { month: "5월", emission: 2150, saved: 650 },
    { month: "6월", emission: 2080, saved: 720 },
    { month: "7월", emission: 1950, saved: 850 },
    { month: "8월", emission: 1820, saved: 980 },
    { month: "9월", emission: 1750, saved: 1050 },
    { month: "10월", emission: 1680, saved: 1120 },
    { month: "11월", emission: 1580, saved: 1220 },
  ];
}
