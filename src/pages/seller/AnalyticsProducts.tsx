import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Star, Package, AlertTriangle, Target } from "lucide-react";

interface ProductAnalytics {
  id: string;
  name: string;
  category: string;
  sales: number;
  quantity: number;
  revenue: number;
  profitMargin: number;
  stockTurnover: number;
  trend: "상승" | "하락" | "유지";
  rating: number;
  reviews: number;
}

const mockProductAnalytics: ProductAnalytics[] = [
  {
    id: "1",
    name: "유기농 토마토",
    category: "채소",
    sales: 450,
    quantity: 180,
    revenue: 1125000,
    profitMargin: 35,
    stockTurnover: 8.5,
    trend: "상승",
    rating: 4.8,
    reviews: 127
  },
  {
    id: "2", 
    name: "친환경 사과",
    category: "과일",
    sales: 320,
    quantity: 96,
    revenue: 960000,
    profitMargin: 42,
    stockTurnover: 6.2,
    trend: "상승",
    rating: 4.6,
    reviews: 89
  },
  {
    id: "3",
    name: "무농약 상추",
    category: "채소", 
    sales: 280,
    quantity: 140,
    revenue: 420000,
    profitMargin: 28,
    stockTurnover: 12.3,
    trend: "유지",
    rating: 4.3,
    reviews: 56
  },
  {
    id: "4",
    name: "천연 꿀",
    category: "가공품",
    sales: 120,
    quantity: 60,
    revenue: 780000,
    profitMargin: 55,
    stockTurnover: 3.8,
    trend: "하락",
    rating: 4.9,
    reviews: 234
  },
  {
    id: "5",
    name: "유기농 쌀",
    category: "곡물",
    sales: 200,
    quantity: 40,
    revenue: 800000,
    profitMargin: 25,
    stockTurnover: 4.2,
    trend: "상승",
    rating: 4.5,
    reviews: 98
  }
];

// 예측 데이터
const forecastData = [
  { name: "1주", actual: 450, predicted: 440 },
  { name: "2주", actual: 520, predicted: 510 },
  { name: "3주", actual: 380, predicted: 400 },
  { name: "4주", actual: null, predicted: 580 },
  { name: "다음주", actual: null, predicted: 620 },
];

export default function AnalyticsProducts() {
  const [products] = useState<ProductAnalytics[]>(mockProductAnalytics);
  const [sortBy, setSortBy] = useState<string>("revenue");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");

  const getTrendBadge = (trend: ProductAnalytics["trend"]) => {
    switch (trend) {
      case "상승":
        return <Badge variant="default" className="bg-green-100 text-green-800"><TrendingUp className="w-3 h-3 mr-1" />상승</Badge>;
      case "하락":
        return <Badge variant="destructive"><TrendingDown className="w-3 h-3 mr-1" />하락</Badge>;
      case "유지":
        return <Badge variant="secondary">유지</Badge>;
      default:
        return null;
    }
  };

  const getStockTurnoverBadge = (turnover: number) => {
    if (turnover >= 8) {
      return <Badge variant="default" className="bg-green-100 text-green-800">우수</Badge>;
    } else if (turnover >= 5) {
      return <Badge variant="secondary">보통</Badge>;
    } else {
      return <Badge variant="destructive">주의</Badge>;
    }
  };

  const filteredProducts = categoryFilter === "전체" 
    ? products 
    : products.filter(product => product.category === categoryFilter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "revenue":
        return b.revenue - a.revenue;
      case "sales":
        return b.sales - a.sales;
      case "profitMargin":
        return b.profitMargin - a.profitMargin;
      case "stockTurnover":
        return b.stockTurnover - a.stockTurnover;
      default:
        return 0;
    }
  });

  const topProducts = sortedProducts.slice(0, 5);
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const avgProfitMargin = products.reduce((sum, p) => sum + p.profitMargin, 0) / products.length;
  const avgStockTurnover = products.reduce((sum, p) => sum + p.stockTurnover, 0) / products.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">인기 상품/재고 분석</h1>
          <p className="text-muted-foreground mt-2">상품별 성과 분석과 재고 회전율을 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="채소">채소</SelectItem>
              <SelectItem value="과일">과일</SelectItem>
              <SelectItem value="곡물">곡물</SelectItem>
              <SelectItem value="가공품">가공품</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">매출순</SelectItem>
              <SelectItem value="sales">판매량순</SelectItem>
              <SelectItem value="profitMargin">수익률순</SelectItem>
              <SelectItem value="stockTurnover">회전율순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 상품 매출</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground">전체 상품</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 수익률</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProfitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">전체 상품 평균</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 재고회전율</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgStockTurnover.toFixed(1)}회</div>
            <p className="text-xs text-muted-foreground">월 평균</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">주의 상품</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.stockTurnover < 5).length}개
            </div>
            <p className="text-xs text-muted-foreground">낮은 회전율</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 인기 상품 랭킹 차트 */}
        <Card>
          <CardHeader>
            <CardTitle>인기 상품 TOP 5 (매출 기준)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()}원`, "매출"]} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 판매 예측 차트 */}
        <Card>
          <CardHeader>
            <CardTitle>판매량 예측 (주간)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="실제 판매량"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="예측 판매량"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 상품별 상세 분석 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>상품별 상세 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>판매건수</TableHead>
                <TableHead>판매량</TableHead>
                <TableHead>매출액</TableHead>
                <TableHead>수익률</TableHead>
                <TableHead>재고회전율</TableHead>
                <TableHead>평점</TableHead>
                <TableHead>트렌드</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sales}건</TableCell>
                  <TableCell>{product.quantity}개</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {product.revenue.toLocaleString()}원
                  </TableCell>
                  <TableCell>
                    <span className={product.profitMargin >= 40 ? "text-green-600 font-medium" : ""}>
                      {product.profitMargin}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.stockTurnover}회</span>
                      {getStockTurnoverBadge(product.stockTurnover)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>{getTrendBadge(product.trend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 분석 인사이트 */}
      <Card>
        <CardHeader>
          <CardTitle>분석 인사이트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">성과 우수 상품</h4>
                <p className="text-sm text-green-700">
                  유기농 토마토와 친환경 사과가 높은 수익률과 재고회전율을 보이고 있습니다. 
                  재고 확대를 고려해보세요.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">개선 필요 상품</h4>
                <p className="text-sm text-yellow-700">
                  천연 꿀의 재고회전율이 낮습니다. 마케팅 강화나 가격 조정을 고려해보세요.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">예측 분석</h4>
                <p className="text-sm text-blue-700">
                  다음 주 판매량이 20% 증가할 것으로 예측됩니다. 재고 준비를 점검하세요.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}