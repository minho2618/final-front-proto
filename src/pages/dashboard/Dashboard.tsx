import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Eye,
  Clock,
  AlertTriangle
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"

export default function Dashboard() {
  const recentOrders = [
    { id: "ORD-001", customer: "김철수", amount: 125000, status: "processing" as const, time: "10분 전" },
    { id: "ORD-002", customer: "이영희", amount: 89000, status: "completed" as const, time: "25분 전" },
    { id: "ORD-003", customer: "박민수", amount: 156000, status: "pending" as const, time: "1시간 전" },
    { id: "ORD-004", customer: "최지영", amount: 67000, status: "approved" as const, time: "2시간 전" },
    { id: "ORD-005", customer: "정다혜", amount: 203000, status: "processing" as const, time: "3시간 전" },
  ]

  const pendingTasks = [
    { id: 1, task: "상품 승인 대기", count: 12, type: "products" },
    { id: 2, task: "고객 문의 답변", count: 8, type: "support" },
    { id: 3, task: "정산 처리", count: 5, type: "settlement" },
    { id: 4, task: "배송 확인", count: 3, type: "delivery" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">
          전체 현황을 한눈에 확인하고 관리하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="총 회원수"
          value={12543}
          change={{ value: 12.5, type: "increase" }}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="상품 수"
          value={1829}
          change={{ value: 8.2, type: "increase" }}
          icon={<Package className="w-4 h-4" />}
        />
        <StatCard
          title="월 주문 수"
          value={4672}
          change={{ value: 23.1, type: "increase" }}
          icon={<ShoppingCart className="w-4 h-4" />}
        />
        <StatCard
          title="월 매출"
          value="₩1,234,567,890"
          change={{ value: 15.3, type: "increase" }}
          icon={<DollarSign className="w-4 h-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              최근 주문
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                전체 보기
              </Button>
            </CardTitle>
            <CardDescription>
              최근 24시간 동안의 주문 현황입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객명</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>시간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>₩{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
              처리 대기 업무
            </CardTitle>
            <CardDescription>
              즉시 처리가 필요한 업무 목록입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{task.task}</span>
                </div>
                <Badge variant="destructive" className="bg-warning text-warning-foreground">
                  {task.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
          <CardDescription>
            자주 사용하는 기능에 빠르게 접근하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Package className="w-6 h-6" />
              <span>상품 등록</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>회원 관리</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ShoppingCart className="w-6 h-6" />
              <span>주문 확인</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span>통계 보기</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}