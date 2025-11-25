"use client";

import { Header } from "@/components/layout/Header";
import { DemandChart } from "@/components/charts/DemandChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  generateDemandPredictions,
  generateLibraryDemands,
  generateTrendingKeywords,
} from "@/data/mock/predictions";
import { popularBooks } from "@/data/mock/transactions";
import { TrendingUp, TrendingDown, AlertTriangle, BookOpen } from "lucide-react";

export default function DemandForecastPage() {
  const predictions = generateDemandPredictions(120);
  const libraryDemands = generateLibraryDemands();
  const trendingKeywords = generateTrendingKeywords();

  return (
    <div className="min-h-screen">
      <Header
        title="AI 수요 예측"
        description="DeepAR 기반 도서 대출 수요 예측 시스템"
      />

      <div className="p-6">
        {/* 트렌드 키워드 */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              실시간 트렌드 키워드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {trendingKeywords.map((keyword) => (
                <div
                  key={keyword.keyword}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    keyword.isAlert
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {keyword.isAlert && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{keyword.keyword}</span>
                  <Badge
                    variant={keyword.isAlert ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {keyword.changePercent > 0 ? "+" : ""}
                    {keyword.changePercent.toFixed(1)}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {keyword.velocity.toFixed(1)}건/시간
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 수요 예측 차트 */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">전체 대출 수요 예측</CardTitle>
            </CardHeader>
            <CardContent>
              <DemandChart data={predictions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">인기 도서별 예측</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="채식주의자">
                <TabsList className="mb-4">
                  {popularBooks.slice(0, 4).map((book) => (
                    <TabsTrigger
                      key={book.isbn}
                      value={book.title}
                      className="text-xs"
                    >
                      {book.title.length > 6
                        ? book.title.slice(0, 6) + "..."
                        : book.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {popularBooks.slice(0, 4).map((book) => (
                  <TabsContent key={book.isbn} value={book.title}>
                    <DemandChart
                      data={generateDemandPredictions(
                        20 + Math.random() * 80
                      )}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 도서관별 재고 부족 예측 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                도서관별 재고 부족 예측
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {libraryDemands.filter((d) => d.urgency === "high").length}건 긴급
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>도서관</TableHead>
                  <TableHead>도서</TableHead>
                  <TableHead>저자</TableHead>
                  <TableHead className="text-right">현재 재고</TableHead>
                  <TableHead className="text-right">예측 수요</TableHead>
                  <TableHead className="text-right">차이</TableHead>
                  <TableHead>긴급도</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {libraryDemands.map((demand) => (
                  <TableRow key={`${demand.libraryId}-${demand.bookTitle}`}>
                    <TableCell className="font-medium">
                      {demand.libraryName}
                    </TableCell>
                    <TableCell>{demand.bookTitle}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {demand.author}
                    </TableCell>
                    <TableCell className="text-right">
                      {demand.currentStock}권
                    </TableCell>
                    <TableCell className="text-right">
                      {demand.predictedDemand}건
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          demand.gap < 0 ? "text-red-600 font-medium" : "text-green-600"
                        }
                      >
                        {demand.gap > 0 ? "+" : ""}
                        {demand.gap}
                      </span>
                    </TableCell>
                    <TableCell>
                      {demand.urgency === "high" && (
                        <Badge variant="destructive" className="text-xs">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          긴급
                        </Badge>
                      )}
                      {demand.urgency === "medium" && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-orange-100 text-orange-700"
                        >
                          주의
                        </Badge>
                      )}
                      {demand.urgency === "low" && (
                        <Badge variant="secondary" className="text-xs">
                          정상
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
