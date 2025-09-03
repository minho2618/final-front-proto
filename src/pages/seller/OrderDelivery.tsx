import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Truck, Package, MapPin, Phone, Edit } from "lucide-react";

interface DeliveryOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  products: string[];
  totalAmount: number;
  trackingNumber: string;
  carrier: string;
  deliveryStatus: "준비중" | "픽업완료" | "배송중" | "배송완료";
  orderDate: string;
}

const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: "ORD-001",
    customerName: "김철수",
    customerPhone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123, 101동 501호",
    products: ["유기농 토마토 2kg", "친환경 사과 3kg"],
    totalAmount: 45000,
    trackingNumber: "1234567890",
    carrier: "한진택배",
    deliveryStatus: "배송중",
    orderDate: "2024-01-15"
  },
  {
    id: "ORD-002", 
    customerName: "박영희",
    customerPhone: "010-9876-5432",
    address: "부산시 해운대구 해운대로 456, 상가 2층",
    products: ["무농약 상추 1kg"],
    totalAmount: 12000,
    trackingNumber: "",
    carrier: "",
    deliveryStatus: "준비중",
    orderDate: "2024-01-15"
  },
  {
    id: "ORD-003",
    customerName: "이민수",
    customerPhone: "010-5555-7777", 
    address: "대구시 중구 중앙대로 789, 빌라 303호",
    products: ["천연 꿀 500g", "유기농 토마토 1kg"],
    totalAmount: 38000,
    trackingNumber: "9876543210",
    carrier: "CJ택배",
    deliveryStatus: "픽업완료",
    orderDate: "2024-01-14"
  }
];

const carriers = ["한진택배", "CJ택배", "로젠택배", "우체국택배", "롯데택배"];

export default function OrderDelivery() {
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockDeliveryOrders);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState<string>("");
  const [carrierInput, setCarrierInput] = useState<string>("");

  const getDeliveryBadge = (status: DeliveryOrder["deliveryStatus"]) => {
    switch (status) {
      case "준비중":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Package className="w-3 h-3 mr-1" />준비중</Badge>;
      case "픽업완료":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />픽업완료</Badge>;
      case "배송중":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800"><Truck className="w-3 h-3 mr-1" />배송중</Badge>;
      case "배송완료":
        return <Badge variant="default" className="bg-green-100 text-green-800"><Package className="w-3 h-3 mr-1" />배송완료</Badge>;
      default:
        return null;
    }
  };

  const handleEditTracking = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setEditingOrder(orderId);
      setTrackingInput(order.trackingNumber);
      setCarrierInput(order.carrier);
    }
  };

  const handleSaveTracking = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              trackingNumber: trackingInput, 
              carrier: carrierInput,
              deliveryStatus: trackingInput ? "픽업완료" : "준비중"
            }
          : order
      )
    );
    setEditingOrder(null);
    setTrackingInput("");
    setCarrierInput("");
  };

  const updateDeliveryStatus = (orderId: string, status: DeliveryOrder["deliveryStatus"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, deliveryStatus: status } : order
      )
    );
  };

  const getStatusCounts = () => {
    return {
      준비중: orders.filter(o => o.deliveryStatus === "준비중").length,
      픽업완료: orders.filter(o => o.deliveryStatus === "픽업완료").length,
      배송중: orders.filter(o => o.deliveryStatus === "배송중").length,
      배송완료: orders.filter(o => o.deliveryStatus === "배송완료").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">배송지 및 운송장 관리</h1>
          <p className="text-muted-foreground mt-2">주문별 배송 정보와 운송장 번호를 관리하세요</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">픽업완료</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.픽업완료}</div>
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
            <CardTitle className="text-sm font-medium">배송완료</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.배송완료}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>배송 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>고객정보</TableHead>
                <TableHead>배송지</TableHead>
                <TableHead>상품</TableHead>
                <TableHead>택배사</TableHead>
                <TableHead>운송장번호</TableHead>
                <TableHead>배송상태</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {order.customerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 flex items-start">
                      <MapPin className="w-3 h-3 mr-1 mt-1 flex-shrink-0" />
                      <span className="text-sm">{order.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-32">
                      {order.products.slice(0, 1).join(", ")}
                      {order.products.length > 1 && ` 외 ${order.products.length - 1}개`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingOrder === order.id ? (
                      <Select value={carrierInput} onValueChange={setCarrierInput}>
                        <SelectTrigger className="w-28">
                          <SelectValue placeholder="택배사" />
                        </SelectTrigger>
                        <SelectContent>
                          {carriers.map(carrier => (
                            <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-sm">{order.carrier || "-"}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingOrder === order.id ? (
                      <Input
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="운송장번호"
                        className="w-32"
                      />
                    ) : (
                      <span className="text-sm font-mono">{order.trackingNumber || "-"}</span>
                    )}
                  </TableCell>
                  <TableCell>{getDeliveryBadge(order.deliveryStatus)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editingOrder === order.id ? (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => handleSaveTracking(order.id)}
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingOrder(null)}
                          >
                            취소
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTracking(order.id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Select
                            value={order.deliveryStatus}
                            onValueChange={(value: DeliveryOrder["deliveryStatus"]) => 
                              updateDeliveryStatus(order.id, value)
                            }
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="준비중">준비중</SelectItem>
                              <SelectItem value="픽업완료">픽업완료</SelectItem>
                              <SelectItem value="배송중">배송중</SelectItem>
                              <SelectItem value="배송완료">배송완료</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
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