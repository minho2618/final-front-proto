import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  BarChart3,
  Settings
} from "lucide-react";

const SellerDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Mock data
  const stats = {
    totalSales: 2450000,
    monthlyGrowth: 15.2,
    totalOrders: 156,
    activeProducts: 12
  };

  const recentOrders = [
    {
      id: "ORD-001",
      product: "유기농 토마토 1kg",
      customer: "김**",
      amount: 8500,
      status: "배송중",
      date: "2024.03.15"
    },
    {
      id: "ORD-002", 
      product: "신선 상추 300g",
      customer: "이**",
      amount: 4500,
      status: "배송완료",
      date: "2024.03.15"
    },
    {
      id: "ORD-003",
      product: "햇 사과 2kg",
      customer: "박**", 
      amount: 15000,
      status: "주문확인",
      date: "2024.03.14"
    }
  ];

  const products = [
    {
      id: 1,
      name: "유기농 토마토 1kg",
      price: 8500,
      stock: 50,
      sales: 156,
      status: "판매중",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "신선 상추 300g", 
      price: 4500,
      stock: 30,
      sales: 89,
      status: "판매중",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "햇 사과 2kg",
      price: 15000,
      stock: 0,
      sales: 234,
      status: "품절",
      image: "/api/placeholder/100/100"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "주문확인": return "bg-blue-100 text-blue-700";
      case "배송중": return "bg-yellow-100 text-yellow-700";  
      case "배송완료": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">판매자 대시보드</h1>
            <p className="text-muted-foreground">안동 햇살농장 • 김농부님</p>
          </div>
          <Button className="bg-gradient-fresh">
            <Plus className="w-4 h-4 mr-2" />
            상품 등록
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">총 매출</p>
                <p className="text-2xl font-bold text-primary">
                  {stats.totalSales.toLocaleString()}원
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">월간 성장률</p>
                <p className="text-2xl font-bold text-accent">
                  +{stats.monthlyGrowth}%
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">총 주문</p>
                <p className="text-2xl font-bold">
                  {stats.totalOrders}건
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">활성 상품</p>
                <p className="text-2xl font-bold">
                  {stats.activeProducts}개
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">주문 관리</TabsTrigger>
            <TabsTrigger value="products">상품 관리</TabsTrigger>
            <TabsTrigger value="analytics">매출 분석</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 관리</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">최근 주문</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">주문번호</th>
                      <th className="p-4 font-medium text-muted-foreground">상품</th>
                      <th className="p-4 font-medium text-muted-foreground">고객</th>
                      <th className="p-4 font-medium text-muted-foreground">금액</th>
                      <th className="p-4 font-medium text-muted-foreground">상태</th>
                      <th className="p-4 font-medium text-muted-foreground">주문일</th>
                      <th className="p-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{order.product}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4 font-medium">{order.amount.toLocaleString()}원</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{order.date}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">상품 관리</h3>
                <Button className="bg-gradient-fresh">
                  <Plus className="w-4 h-4 mr-2" />
                  새 상품 등록
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">상품</th>
                      <th className="p-4 font-medium text-muted-foreground">가격</th>
                      <th className="p-4 font-medium text-muted-foreground">재고</th>
                      <th className="p-4 font-medium text-muted-foreground">판매량</th>
                      <th className="p-4 font-medium text-muted-foreground">상태</th>
                      <th className="p-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover bg-secondary"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{product.price.toLocaleString()}원</td>
                        <td className="p-4">
                          <span className={product.stock === 0 ? 'text-red-600' : ''}>
                            {product.stock}개
                          </span>
                        </td>
                        <td className="p-4">{product.sales}개</td>
                        <td className="p-4">
                          <Badge className={
                            product.status === '판매중' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">월별 매출 현황</h3>
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="h-64 bg-secondary/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">매출 차트 영역</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">인기 상품 TOP 5</h3>
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {products.slice(0, 3).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm">{product.name}</span>
                      </div>
                      <span className="text-sm font-medium">{product.sales}개</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">최근 고객 리뷰</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">김**</span>
                      <div className="flex text-accent">★★★★★</div>
                    </div>
                    <span className="text-sm text-muted-foreground">2024.03.15</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">유기농 토마토 1kg</p>
                  <p className="text-sm">정말 달고 맛있어요! 토마토 특유의 신맛도 적당하고 아이들도 잘 먹네요.</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    답글 달기
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">농장 정보 설정</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">농장명</label>
                  <Input defaultValue="안동 햇살농장" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">농장 소개</label>
                  <Textarea 
                    defaultValue="경북 안동에서 15년간 유기농 농업에 전념하고 있습니다. 농약 없이 건강한 농산물을 재배합니다."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">연락처</label>
                  <Input defaultValue="010-1234-5678" />
                </div>
                <Button className="bg-gradient-fresh">
                  저장하기
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;