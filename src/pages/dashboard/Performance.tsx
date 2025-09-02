import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Target, Award, Calendar, Filter } from "lucide-react"

export default function Performance() {
  const monthlyPerformance = [
    { month: "1월", target: "8,000만", actual: "8,650만", achievement: "108%", status: "success" },
    { month: "12월", target: "7,500만", actual: "7,230만", achievement: "96%", status: "warning" },
    { month: "11월", target: "7,000만", actual: "7,450만", achievement: "106%", status: "success" },
    { month: "10월", target: "6,500만", actual: "6,890만", achievement: "106%", status: "success" },
  ]

  const sellerPerformance = [
    { seller: "팜투테이블", target: "2,000만", actual: "2,450만", growth: "+18%", trend: "up" },
    { seller: "그린팜", target: "1,500만", actual: "1,890만", growth: "+26%", trend: "up" },
    { seller: "애플팜", target: "1,200만", actual: "1,560만", growth: "+30%", trend: "up" },
    { seller: "친환경농장", target: "1,000만", actual: "1,230만", growth: "+23%", trend: "up" },
    { seller: "오가닉팜", target: "800만", actual: "650만", growth: "-18%", trend: "down" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">실적 분석</h1>
          <p className="text-muted-foreground">목표 대비 성과와 성장률을 분석합니다</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            기간 선택
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="목표 달성률"
          value="108%"
          description="이번 달 목표 초과 달성"
          icon={<Target />}
        />
        <StatCard
          title="전월 대비 성장"
          value="+19.6%"
          description="매출 증가율"
          icon={<TrendingUp />}
        />
        <StatCard
          title="평균 달성률"
          value="105%"
          description="최근 6개월"
          icon={<Award />}
        />
        <StatCard
          title="성장률 순위"
          value="2위"
          description="업계 내 순위"
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>월별 목표 달성 현황</CardTitle>
            <CardDescription>목표 대비 실제 성과</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>월</TableHead>
                  <TableHead>목표</TableHead>
                  <TableHead>실적</TableHead>
                  <TableHead>달성률</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyPerformance.map((month) => (
                  <TableRow key={month.month}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell>{month.target}</TableCell>
                    <TableCell className="font-semibold">{month.actual}</TableCell>
                    <TableCell>
                      <Badge variant={month.status === "success" ? "default" : "secondary"}>
                        {month.achievement}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>판매자별 성과</CardTitle>
            <CardDescription>목표 대비 판매자 실적</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sellerPerformance.map((seller) => (
                <div key={seller.seller} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{seller.seller}</p>
                    <p className="text-sm text-muted-foreground">
                      목표: {seller.target} → 실적: {seller.actual}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {seller.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <Badge variant={seller.trend === "up" ? "default" : "destructive"}>
                      {seller.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 성장률</CardTitle>
            <CardDescription>전월 대비 카테고리 성장</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>유기농 채소</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Badge variant="default">+24%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>친환경 과일</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Badge variant="default">+18%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>무농약 곡물</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Badge variant="default">+12%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>가공식품</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <Badge variant="destructive">-5%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>고객 만족도</CardTitle>
            <CardDescription>서비스 품질 지표</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>상품 만족도</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>배송 만족도</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">4.5/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>고객 서비스</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-17 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">4.7/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>전체 만족도</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-18 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">4.7/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주요 KPI</CardTitle>
            <CardDescription>핵심 성과 지표</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">12.5%</p>
                <p className="text-xs text-muted-foreground">고객 재구매율</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-blue-600">3.2일</p>
                <p className="text-xs text-muted-foreground">평균 배송일</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-purple-600">1.8%</p>
                <p className="text-xs text-muted-foreground">주문 취소율</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-orange-600">89%</p>
                <p className="text-xs text-muted-foreground">재고 회전율</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}