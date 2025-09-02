import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Truck, MapPin, Clock } from "lucide-react"

export default function Delivery() {
  const deliveries = [
    {
      id: "DEL-001",
      orderId: "ORD-001",
      customer: "김고객",
      address: "서울시 강남구",
      courier: "로젠택배",
      trackingNumber: "123456789",
      status: "in_transit",
      estimatedDelivery: "2024-01-16"
    },
    {
      id: "DEL-002",
      orderId: "ORD-002",
      customer: "이구매",
      address: "부산시 해운대구",
      courier: "CJ대한통운",
      trackingNumber: "987654321",
      status: "delivered",
      estimatedDelivery: "2024-01-15"
    },
    {
      id: "DEL-003",
      orderId: "ORD-003",
      customer: "박주문",
      address: "대구시 수성구",
      courier: "한진택배",
      trackingNumber: "456789123",
      status: "pending",
      estimatedDelivery: "2024-01-17"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">배송 관리</h1>
        <p className="text-muted-foreground">모든 배송을 추적하고 관리합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-muted-foreground">배송 준비</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Truck className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">28</p>
              <p className="text-xs text-muted-foreground">배송 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <MapPin className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">142</p>
              <p className="text-xs text-muted-foreground">배송 완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-600 text-sm font-bold">!</span>
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">배송 지연</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="운송장번호, 고객명 검색..." className="pl-10" />
        </div>
        <Button>배송업체 연동</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>배송 현황</CardTitle>
          <CardDescription>실시간 배송 추적</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>배송 ID</TableHead>
                <TableHead>주문번호</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>배송지</TableHead>
                <TableHead>택배사</TableHead>
                <TableHead>운송장번호</TableHead>
                <TableHead>예상 배송일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>추적</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{delivery.courier}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{delivery.trackingNumber}</TableCell>
                  <TableCell>{delivery.estimatedDelivery}</TableCell>
                  <TableCell>
                    <StatusBadge status={delivery.status as any} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">추적</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}