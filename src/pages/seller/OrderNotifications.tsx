import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Eye, Clock, Package, Truck, CheckCircle } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  products: string[];
  totalAmount: number;
  status: "신규" | "준비중" | "배송중" | "완료";
  orderDate: string;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "김철수",
    customerPhone: "010-1234-5678",
    products: ["유기농 토마토 2kg", "친환경 사과 3kg"],
    totalAmount: 45000,
    status: "신규",
    orderDate: "2024-01-15 14:30",
    address: "서울시 강남구 테헤란로 123"
  },
  {
    id: "ORD-002", 
    customerName: "박영희",
    customerPhone: "010-9876-5432",
    products: ["무농약 상추 1kg"],
    totalAmount: 12000,
    status: "준비중",
    orderDate: "2024-01-15 13:15",
    address: "부산시 해운대구 해운대로 456"
  },
  {
    id: "ORD-003",
    customerName: "이민수",
    customerPhone: "010-5555-7777", 
    products: ["천연 꿀 500g", "유기농 토마토 1kg"],
    totalAmount: 38000,
    status: "배송중",
    orderDate: "2024-01-14 16:45",
    address: "대구시 중구 중앙대로 789"
  }
];

export default function OrderNotifications() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>("전체");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "신규":
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Bell className="w-3 h-3 mr-1" />신규</Badge>;
      case "준비중":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />준비중</Badge>;
      case "배송중":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800"><Truck className="w-3 h-3 mr-1" />배송중</Badge>;
      case "완료":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />완료</Badge>;
      default:
        return null;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = statusFilter === "전체" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusCounts = () => {
    return {
      신규: orders.filter(o => o.status === "신규").length,
      준비중: orders.filter(o => o.status === "준비중").length,
      배송중: orders.filter(o => o.status === "배송중").length,
      완료: orders.filter(o => o.status === "완료").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">신규 주문 알림</h1>
          <p className="text-muted-foreground mt-2">실시간 주문 현황을 확인하고 상태를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="신규">신규</SelectItem>
              <SelectItem value="준비중">준비중</SelectItem>
              <SelectItem value="배송중">배송중</SelectItem>
              <SelectItem value="완료">완료</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">신규 주문</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.신규}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">준비중</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{statusCounts.준비중}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">배송중</CardTitle>
            <Truck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{statusCounts.배송중}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.완료}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>주문 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>고객명</TableHead>
                <TableHead>상품</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>주문일시</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      {order.products.slice(0, 2).join(", ")}
                      {order.products.length > 2 && ` 외 ${order.products.length - 2}개`}
                    </div>
                  </TableCell>
                  <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>주문 상세 정보</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold">주문번호: {selectedOrder.id}</h4>
                                <p>고객명: {selectedOrder.customerName}</p>
                                <p>연락처: {selectedOrder.customerPhone}</p>
                                <p>배송지: {selectedOrder.address}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">주문 상품</h4>
                                <ul className="list-disc pl-5">
                                  {selectedOrder.products.map((product, index) => (
                                    <li key={index}>{product}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold">총 금액: {selectedOrder.totalAmount.toLocaleString()}원</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Select
                        value={order.status}
                        onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="신규">신규</SelectItem>
                          <SelectItem value="준비중">준비중</SelectItem>
                          <SelectItem value="배송중">배송중</SelectItem>
                          <SelectItem value="완료">완료</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}