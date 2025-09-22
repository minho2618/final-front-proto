import { useState, useEffect } from "react";
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
  Search,
  Filter,
  Download,
  Bell,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { getAllMembers, getAllProducts, getAllOrders } from "@/lib/api";

interface User {
    memberId: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface Product {
    productId: number;
    name: string;
    price: number;
    category: string;
    seller: {
        sellerName: string;
    }
}

interface Order {
    orderId: number;
    memberRes: {
        name: string;
    };
    status: string;
    createdAt: string;
    orderItemList: any[];
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);
  
  // Mock admin data (will be replaced gradually)
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [membersData, productsData, ordersData] = await Promise.all([
                getAllMembers(),
                getAllProducts(),
                getAllOrders()
            ]);

            if (membersData && Array.isArray(membersData.content)) {
                setUsers(membersData.content);
            } else {
                setUsers([]);
            }

            if (productsData && Array.isArray(productsData.content)) {
                setProducts(productsData.content);
            } else {
                setProducts([]);
            }

            if (ordersData && Array.isArray(ordersData.content)) {
                setOrders(ordersData.content);
            } else {
                setOrders([]);
            }
        } catch (error) {
            setErrorUsers("데이터를 불러오는 데 실패했습니다.");
            setErrorProducts("데이터를 불러오는 데 실패했습니다.");
            setErrorOrders("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoadingUsers(false);
            setLoadingProducts(false);
            setLoadingOrders(false);
        }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "활성":
      case "DONE":
        return "bg-green-100 text-green-700";
      case "대기":
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "정지": return "bg-red-100 text-red-700";
      case "검토중": return "bg-blue-100 text-blue-700";
      case "승인": return "bg-green-100 text-green-700";
      case "반려": return "bg-red-100 text-red-700";
      case "READY": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
            <p className="text-muted-foreground">산지직송 전체 현황 관리</p>
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">대시보드</TabsTrigger>
            <TabsTrigger value="users">회원 관리</TabsTrigger>
            <TabsTrigger value="products">상품 관리</TabsTrigger>
            <TabsTrigger value="orders">주문 관리</TabsTrigger>
            <TabsTrigger value="analytics">통계 분석</TabsTrigger>
            <TabsTrigger value="settings">시스템 설정</TabsTrigger>
          </TabsList>

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
                {loadingUsers ? (
                  <div className="text-center p-8">회원 목록을 불러오는 중...</div>
                ) : errorUsers ? (
                  <div className="text-center p-8 text-red-500">{errorUsers}</div>
                ) : (
                  <table className="w-full">
                    <thead className="border-b bg-secondary/50">
                      <tr className="text-left">
                        <th className="p-4 font-medium text-muted-foreground">이름</th>
                        <th className="p-4 font-medium text-muted-foreground">이메일</th>
                        <th className="p-4 font-medium text-muted-foreground">타입</th>
                        <th className="p-4 font-medium text-muted-foreground">가입일</th>
                        <th className="p-4 font-medium text-muted-foreground">상태</th>
                        <th className="p-4 font-medium text-muted-foreground">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.memberId} className="border-b">
                          <td className="p-4 font-medium">{user.name}</td>
                          <td className="p-4 text-muted-foreground">{user.email}</td>
                          <td className="p-4">
                            <Badge className={
                              user.role === 'ROLE_SELLER' 
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }>
                              {user.role === 'ROLE_SELLER' ? '판매자' : '구매자'}
                            </Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor("활성")}>
                              활성
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
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">전체 상품 관리</h3>
              {loadingProducts ? (
                  <div className="text-center p-8">상품 목록을 불러오는 중...</div>
                ) : errorProducts ? (
                  <div className="text-center p-8 text-red-500">{errorProducts}</div>
                ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.productId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{product.name}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>판매자: {product.seller.sellerName}</p>
                          <p>가격: {product.price.toLocaleString()}원</p>
                          <p>카테고리: {product.category}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          상세보기
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="w-4 h-4 mr-1" />
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
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
                {loadingOrders ? (
                    <div className="text-center p-8">주문 목록을 불러오는 중...</div>
                ) : errorOrders ? (
                    <div className="text-center p-8 text-red-500">{errorOrders}</div>
                ) : (
                <table className="w-full">
                  <thead className="border-b bg-secondary/50">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">주문번호</th>
                      <th className="p-4 font-medium text-muted-foreground">고객</th>
                      <th className="p-4 font-medium text-muted-foreground">총액</th>
                      <th className="p-4 font-medium text-muted-foreground">상태</th>
                      <th className="p-4 font-medium text-muted-foreground">주문일</th>
                      <th className="p-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} className="border-b">
                        <td className="p-4 font-medium">#{order.orderId}</td>
                        <td className="p-4">{order.memberRes.name}</td>
                        <td className="p-4 font-medium">{order.orderItemList.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString()}원</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
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
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;