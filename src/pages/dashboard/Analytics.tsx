import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, PieChart, TrendingUp, Users, ShoppingBag, DollarSign, Download } from "lucide-react"

export default function Analytics() {
  const topProducts = [
    { name: "유기농 토마토", sales: 156, revenue: "780만원", growth: "+12%" },
    { name: "친환경 쌀", sales: 89, revenue: "445만원", growth: "+8%" },
    { name: "무농약 사과", sales: 134, revenue: "670만원", growth: "+15%" },
    { name: "유기농 채소세트", sales: 67, revenue: "335만원", growth: "+5%" },
  ]

  const topSellers = [
    { name: "팜투테이블", sales: "2,450만원", orders: 234, share: "28%" },
    { name: "그린팜", sales: "1,890만원", orders: 178, share: "22%" },
    { name: "애플팜", sales: "1,560만원", orders: 145, share: "18%" },
    { name: "친환경농장", sales: "1,230만원", orders: 123, share: "14%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">종합 분석</h1>
          <p className="text-muted-foreground">전체 비즈니스 성과를 종합적으로 분석합니다</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          리포트 다운로드
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="총 매출"
          value="₩8,650만"
          description="전월 대비 +18%"
          icon={<DollarSign />}
        />
        <StatCard
          title="총 주문"
          value="1,247"
          description="전월 대비 +23%"
          icon={<ShoppingBag />}
        />
        <StatCard
          title="신규 고객"
          value="324"
          description="전월 대비 +15%"
          icon={<Users />}
        />
        <StatCard
          title="평균 주문액"
          value="₩69,400"
          description="전월 대비 +5%"
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>인기 상품 TOP 4</span>
            </CardTitle>
            <CardDescription>이번 달 가장 많이 판매된 상품들</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales}개 판매</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{product.revenue}</p>
                    <Badge variant="default" className="text-xs">
                      {product.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>우수 판매자 TOP 4</span>
            </CardTitle>
            <CardDescription>매출 기준 상위 판매자</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellers.map((seller, index) => (
                <div key={seller.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/80 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">{seller.orders}건 주문</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{seller.sales}</p>
                    <Badge variant="outline" className="text-xs">
                      점유율 {seller.share}
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
            <CardTitle>카테고리별 매출</CardTitle>
            <CardDescription>상품 카테고리별 성과</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>유기농 채소</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-16 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>친환경 과일</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-12 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>무농약 곡물</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-8 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>기타</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-4 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>지역별 주문 현황</CardTitle>
            <CardDescription>배송지역별 주문량</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>서울/경기</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">523건</Badge>
                  <span className="text-sm text-muted-foreground">42%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>부산/경남</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">234건</Badge>
                  <span className="text-sm text-muted-foreground">19%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>대구/경북</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">187건</Badge>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>기타 지역</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">303건</Badge>
                  <span className="text-sm text-muted-foreground">24%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>고객 연령대</CardTitle>
            <CardDescription>구매 고객 연령 분포</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>20-29세</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-secondary rounded-full">
                    <div className="w-6 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>30-39세</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-secondary rounded-full">
                    <div className="w-14 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>40-49세</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-secondary rounded-full">
                    <div className="w-10 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>50세 이상</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-secondary rounded-full">
                    <div className="w-8 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm">22%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}