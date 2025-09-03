import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  BarChart3,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "총 상품 수",
    value: "156",
    change: "+12%",
    icon: Package,
    color: "text-primary",
  },
  {
    title: "오늘 주문",
    value: "23",
    change: "+5%",
    icon: ShoppingCart,
    color: "text-accent",
  },
  {
    title: "이번 달 매출",
    value: "₩2,450,000",
    change: "+18%",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "방문자 수",
    value: "1,234",
    change: "+7%",
    icon: Users,
    color: "text-warning",
  },
];

const recentOrders = [
  { id: "ORD-001", product: "유기농 토마토 1kg", amount: "₩8,500", status: "배송중" },
  { id: "ORD-002", product: "신선한 당근 2kg", amount: "₩12,000", status: "준비중" },
  { id: "ORD-003", product: "친환경 상추", amount: "₩5,500", status: "완료" },
  { id: "ORD-004", product: "달콤한 딸기 500g", amount: "₩15,000", status: "신규" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">판매자 대시보드</h1>
          <p className="text-muted-foreground mt-2">농산물 판매 현황을 확인하세요</p>
        </div>
        <Link to="/admin/products/register">
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            신규 상품 등록
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> 지난 달 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              최근 주문
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "완료" ? "default" :
                        order.status === "배송중" ? "secondary" :
                        order.status === "신규" ? "destructive" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/orders/notifications">
              <Button variant="outline" className="w-full mt-4">
                <Eye className="w-4 h-4 mr-2" />
                모든 주문 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              빠른 액션
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/admin/products/register">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  새 상품 등록
                </Button>
              </Link>
              <Link to="/admin/products/inventory">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  재고 관리
                </Button>
              </Link>
              <Link to="/admin/analytics/sales">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  매출 분석
                </Button>
              </Link>
              <Link to="/admin/orders/notifications">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  주문 확인
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}