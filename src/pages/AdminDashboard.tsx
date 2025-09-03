import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Eye,
  Check,
  X,
  Edit3,
  Trash2,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  AlertTriangle
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Mock admin data
  const adminStats = {
    totalUsers: 15420,
    totalSellers: 2340,
    totalOrders: 8950,
    totalRevenue: 45600000,
    monthlyGrowth: 12.5,
    pendingOrders: 45,
    pendingProducts: 12,
    customerSupport: 8
  };

  const pendingProducts = [
    {
      id: 1,
      name: "제주 유기농 감귤 5kg",
      seller: "제주 햇살농장",
      price: 25000,
      category: "과일",
      date: "2024.03.15",
      status: "검토중"
    },
    {
      id: 2,
      name: "강원도 고냉지 배추 10포기",
      seller: "정선 청정농장", 
      price: 18000,
      category: "채소",
      date: "2024.03.14",
      status: "검토중"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "김**",
      seller: "안동 햇살농장",
      product: "유기농 토마토",
      amount: 8500,
      status: "배송완료",
      date: "2024.03.15"
    },
    {
      id: "ORD-1002",
      customer: "이**", 
      seller: "제주 농장",
      product: "신선 상추",
      amount: 4500,
      status: "배송중",
      date: "2024.03.15"
    }
  ];

  const users = [
    {
      id: 1,
      name: "김고객",
      email: "customer@example.com",
      type: "구매자",
      joinDate: "2024.01.15",
      orders: 12,
      status: "활성"
    },
    {
      id: 2,
      name: "이농부",
      email: "farmer@example.com", 
      type: "판매자",
      joinDate: "2024.02.20",
      products: 8,
      status: "활성"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "활성": return "bg-green-100 text-green-700";
      case "대기": return "bg-yellow-100 text-yellow-700";
      case "정지": return "bg-red-100 text-red-700";
      case "검토중": return "bg-blue-100 text-blue-700";
      case "승인": return "bg-green-100 text-green-700";
      case "반려": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
            <p className="text-muted-foreground">신선마켓 전체 현황 관리</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              리포트 다운로드
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              알림 {adminStats.pendingProducts + adminStats.customerSupport}
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">총 회원수</p>
                <p className="text-2xl font-bold text-primary">
                  {adminStats.totalUsers.toLocaleString()}명
                </p>
                <p className="text-xs text-green-600">+{adminStats.monthlyGrowth}% 이번 달</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">등록 판매자</p>
                <p className="text-2xl font-bold text-accent">
                  {adminStats.totalSellers.toLocaleString()}명
                </p>
                <p className="text-xs text-green-600">+8.3% 이번 달</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">총 주문수</p>
                <p className="text-2xl font-bold">
                  {adminStats.totalOrders.toLocaleString()}건
                </p>
                <p className="text-xs text-green-600">+15.2% 이번 달</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">총 매출</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.floor(adminStats.totalRevenue / 10000)}만원
                </p>
                <p className="text-xs text-green-600">+22.1% 이번 달</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 border-yellow-200 bg-yellow-50">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">승인 대기 상품</p>
                <p className="text-sm text-yellow-600">{adminStats.pendingProducts}개 상품이 승인을 기다리고 있습니다</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">처리 대기 주문</p>
                <p className="text-sm text-blue-600">{adminStats.pendingOrders}건 주문을 확인해주세요</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-red-200 bg-red-50">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">고객 지원 요청</p>
                <p className="text-sm text-red-600">{adminStats.customerSupport}건의 문의사항이 있습니다</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">대시보드</TabsTrigger>
            <TabsTrigger value="users">회원 관리</TabsTrigger>
            <TabsTrigger value="products">상품 관리</TabsTrigger>
            <TabsTrigger value="orders">주문 관리</TabsTrigger>
            <TabsTrigger value="analytics">통계 분석</TabsTrigger>
            <TabsTrigger value="settings">시스템 설정</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">최근 주문 현황</h3>
                </div>
                <div className="p-0">
                  <table className="w-full">
                    <thead className="border-b bg-secondary/50">
                      <tr className="text-left">
                        <th className="p-3 text-sm font-medium text-muted-foreground">주문번호</th>
                        <th className="p-3 text-sm font-medium text-muted-foreground">고객</th>
                        <th className="p-3 text-sm font-medium text-muted-foreground">금액</th>
                        <th className="p-3 text-sm font-medium text-muted-foreground">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-3 text-sm font-medium">{order.id}</td>
                          <td className="p-3 text-sm">{order.customer}</td>
                          <td className="p-3 text-sm font-medium">{order.amount.toLocaleString()}원</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Pending Products */}
              <Card>
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">승인 대기 상품</h3>
                </div>
                <div className="p-4 space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.seller}</p>
                        </div>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{product.price.toLocaleString()}원</span>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="w-3 h-3 mr-1" />
                            승인
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="w-3 h-3 mr-1" />
                            반려
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">회원 관리</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input className="pl-10 w-64" placeholder="회원 검색..." />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      필터
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-secondary/50">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">이름</th>
                      <th className="p-4 font-medium text-muted-foreground">이메일</th>
                      <th className="p-4 font-medium text-muted-foreground">타입</th>
                      <th className="p-4 font-medium text-muted-foreground">가입일</th>
                      <th className="p-4 font-medium text-muted-foreground">활동</th>
                      <th className="p-4 font-medium text-muted-foreground">상태</th>
                      <th className="p-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-muted-foreground">{user.email}</td>
                        <td className="p-4">
                          <Badge className={
                            user.type === '판매자' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }>
                            {user.type}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.joinDate}</td>
                        <td className="p-4">
                          {user.orders && `주문 ${user.orders}회`}
                          {user.products && `상품 ${user.products}개`}
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
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
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">상품 승인 관리</h3>
              <div className="space-y-4">
                {pendingProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{product.name}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>판매자: {product.seller}</p>
                          <p>가격: {product.price.toLocaleString()}원</p>
                          <p>카테고리: {product.category}</p>
                          <p>등록일: {product.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          상세보기
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="w-4 h-4 mr-1" />
                          승인
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="w-4 h-4 mr-1" />
                          반려
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">전체 주문 관리</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      기간 선택
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      엑셀 다운로드
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-secondary/50">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">주문번호</th>
                      <th className="p-4 font-medium text-muted-foreground">고객</th>
                      <th className="p-4 font-medium text-muted-foreground">판매자</th>
                      <th className="p-4 font-medium text-muted-foreground">상품</th>
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
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">{order.seller}</td>
                        <td className="p-4">{order.product}</td>
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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
                  <h3 className="text-lg font-semibold">회원 증가 현황</h3>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="h-64 bg-secondary/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">회원 증가 차트 영역</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">시스템 설정</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">사이트 정보</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">사이트명</label>
                      <Input defaultValue="신선마켓" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">고객센터 전화번호</label>
                      <Input defaultValue="1588-1234" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">배송 설정</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">기본 배송비</label>
                      <Input defaultValue="3000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">무료배송 최소금액</label>
                      <Input defaultValue="30000" />
                    </div>
                  </div>
                </div>
                
                <Button className="bg-gradient-fresh">
                  설정 저장
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;