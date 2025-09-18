import { useState, useEffect } from "react";
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
  BarChart3,
} from "lucide-react";
import Header from "@/components/Header";
import { getAllProducts, getAllOrders } from "@/lib/api";

interface Product {
    productId: number;
    name: string;
    price: number;
    category: string;
    isActive: boolean;
    seller: {
        memberId: number;
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

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Hardcoded sellerId for now, will be replaced by auth context
  const sellerId = 1;
  
  // Mock data
  const stats = {
    totalSales: 2450000,
    monthlyGrowth: 15.2,
    totalOrders: 156,
    activeProducts: 12
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [productsData, ordersData] = await Promise.all([
                getAllProducts(),
                getAllOrders()
            ]);

            if (productsData && Array.isArray(productsData.content)) {
                const sellerProducts = productsData.content.filter((p: Product) => p.seller.memberId === sellerId);
                setProducts(sellerProducts);
            } else {
                setProducts([]);
            }

            if (ordersData && Array.isArray(ordersData.content)) {
                const sellerOrders = ordersData.content.filter((o: Order) => 
                    o.orderItemList.some(item => 
                        products.some(p => p.productId === item.productId)
                    )
                );
                setOrders(sellerOrders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            setErrorProducts("데이터를 불러오는 데 실패했습니다.");
            setErrorOrders("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoadingProducts(false);
            setLoadingOrders(false);
        }
    };
    fetchData();
  }, [sellerId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "주문확인":
      case "PENDING":
        return "bg-blue-100 text-blue-700";
      case "배송중":
      case "READY":
        return "bg-yellow-100 text-yellow-700";  
      case "배송완료":
      case "DONE":
        return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
                {loadingOrders ? (
                    <div className="text-center p-8">주문 목록을 불러오는 중...</div>
                ) : errorOrders ? (
                    <div className="text-center p-8 text-red-500">{errorOrders}</div>
                ) : (
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">주문번호</th>
                      <th className="p-4 font-medium text-muted-foreground">고객</th>
                      <th className="p-4 font-medium text-muted-foreground">금액</th>
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
                {loadingProducts ? (
                    <div className="text-center p-8">상품 목록을 불러오는 중...</div>
                ) : errorProducts ? (
                    <div className="text-center p-8 text-red-500">{errorProducts}</div>
                ) : (
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium text-muted-foreground">상품</th>
                      <th className="p-4 font-medium text-muted-foreground">가격</th>
                      <th className="p-4 font-medium text-muted-foreground">상태</th>
                      <th className="p-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.productId} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{product.price.toLocaleString()}원</td>
                        <td className="p-4">
                          <Badge className={
                            product.isActive 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }>
                            {product.isActive ? '판매중' : '품절'}
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
                )}
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
                    <div key={product.productId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm">{product.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;