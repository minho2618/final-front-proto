import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

// 매출 데이터
const salesData = {
  daily: [
    { name: "1일", sales: 45000, orders: 12 },
    { name: "2일", sales: 52000, orders: 15 },
    { name: "3일", sales: 38000, orders: 9 },
    { name: "4일", sales: 67000, orders: 18 },
    { name: "5일", sales: 71000, orders: 22 },
    { name: "6일", sales: 59000, orders: 16 },
    { name: "7일", sales: 83000, orders: 25 },
  ],
  weekly: [
    { name: "1주차", sales: 450000, orders: 120 },
    { name: "2주차", sales: 520000, orders: 145 },
    { name: "3주차", sales: 380000, orders: 98 },
    { name: "4주차", sales: 670000, orders: 180 },
  ],
  monthly: [
    { name: "1월", sales: 2450000, orders: 650 },
    { name: "2월", sales: 2800000, orders: 720 },
    { name: "3월", sales: 3200000, orders: 820 },
    { name: "4월", sales: 2900000, orders: 750 },
    { name: "5월", sales: 3500000, orders: 900 },
    { name: "6월", sales: 3100000, orders: 850 },
  ]
};

// 카테고리별 매출 데이터
const categoryData = [
  { name: "채소", value: 35, sales: 1225000 },
  { name: "과일", value: 28, sales: 980000 },
  { name: "곡물", value: 20, sales: 700000 },
  { name: "가공품", value: 12, sales: 420000 },
  { name: "기타", value: 5, sales: 175000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// 전년 동기 대비 데이터
const comparisonData = [
  { name: "1월", current: 2450000, previous: 2100000 },
  { name: "2월", current: 2800000, previous: 2300000 },
  { name: "3월", current: 3200000, previous: 2800000 },
  { name: "4월", current: 2900000, previous: 2500000 },
  { name: "5월", current: 3500000, previous: 2900000 },
  { name: "6월", current: 3100000, previous: 2700000 },
];

export default function AnalyticsSales() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const currentData = salesData[period];
  const totalSales = currentData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
  
  // 성장률 계산 (임시 데이터)
  const growthRate = 15.2;
  const customerRetention = 67.8;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">매출 통계 분석</h1>
          <p className="text-muted-foreground mt-2">상세한 매출 현황과 트렌드를 분석하세요</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(value: "daily" | "weekly" | "monthly") => setPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">일별</SelectItem>
              <SelectItem value="weekly">주별</SelectItem>
              <SelectItem value="monthly">월별</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출액</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              전기 대비 +{growthRate}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문수</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}건</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              전기 대비 +12.3%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 주문금액</CardTitle>
            <Package className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOrderValue.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              전기 대비 +2.8%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">고객 재방문율</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerRetention}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
              전기 대비 -1.2%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매출 트렌드 차트 */}
        <Card>
          <CardHeader>
            <CardTitle>{period === "daily" ? "일별" : period === "weekly" ? "주별" : "월별"} 매출 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === "sales" ? `${value.toLocaleString()}원` : `${value}건`,
                    name === "sales" ? "매출액" : "주문수"
                  ]}
                />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 카테고리별 매출 비중 */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 매출 비중</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string, props: any) => [
                  `${props.payload.sales.toLocaleString()}원 (${value}%)`,
                  name
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 전년 동기 대비 성장률 */}
      <Card>
        <CardHeader>
          <CardTitle>전년 동기 대비 매출 비교</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()}원`, ""]} />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="올해"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="작년"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 상세 통계 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 상세 매출</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{category.sales.toLocaleString()}원</div>
                  <div className="text-sm text-muted-foreground">{category.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}