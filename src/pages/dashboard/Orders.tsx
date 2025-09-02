import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Download, Eye } from "lucide-react"

export default function Orders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "김고객",
      product: "유기농 토마토 5kg",
      amount: "25,000원",
      status: "pending",
      orderDate: "2024-01-15",
      paymentMethod: "카드"
    },
    {
      id: "ORD-002",
      customer: "이구매",
      product: "친환경 쌀 10kg",
      amount: "45,000원",
      status: "confirmed",
      orderDate: "2024-01-14",
      paymentMethod: "계좌이체"
    },
    {
      id: "ORD-003",
      customer: "박주문",
      product: "무농약 사과 3kg",
      amount: "18,000원",
      status: "shipped",
      orderDate: "2024-01-13",
      paymentMethod: "카드"
    },
    {
      id: "ORD-004",
      customer: "최완료",
      product: "유기농 채소 세트",
      amount: "35,000원",
      status: "delivered",
      orderDate: "2024-01-12",
      paymentMethod: "무통장입금"
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-status-approved text-success-foreground">활성</Badge>
      case "inactive":
        return <Badge className="bg-muted text-muted-foreground">비활성</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">주문 내역 관리</h1>
        <p className="text-muted-foreground">모든 주문을 관리하고 추적합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-xs text-muted-foreground">결제 대기</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">35</p>
              <p className="text-xs text-muted-foreground">주문 확인</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">28</p>
              <p className="text-xs text-muted-foreground">배송 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">142</p>
              <p className="text-xs text-muted-foreground">배송 완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-xs text-muted-foreground">취소/환불</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="주문번호, 고객명 검색..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          내보내기
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 주문</CardTitle>
          <CardDescription>최신 주문 내역</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>상품</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>결제방법</TableHead>
                <TableHead>주문일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      상세보기
                    </Button>
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