import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Download, Calculator, CreditCard } from "lucide-react"

export default function Settlements() {
  const settlements = [
    {
      id: "SET-001",
      seller: "팜투테이블",
      period: "2024-01-01 ~ 2024-01-15",
      totalSales: "1,250,000원",
      commission: "125,000원",
      settlement: "1,125,000원",
      status: "pending",
      dueDate: "2024-01-20"
    },
    {
      id: "SET-002",
      seller: "그린팜",
      period: "2024-01-01 ~ 2024-01-15",
      totalSales: "850,000원",
      commission: "85,000원",
      settlement: "765,000원",
      status: "completed",
      dueDate: "2024-01-20"
    },
    {
      id: "SET-003",
      seller: "애플팜",
      period: "2023-12-16 ~ 2023-12-31",
      totalSales: "2,100,000원",
      commission: "210,000원",
      settlement: "1,890,000원",
      status: "in_progress",
      dueDate: "2024-01-05"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">판매자 정산 관리</h1>
        <p className="text-muted-foreground">판매자별 매출과 정산을 관리합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">정산 대기</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <CreditCard className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">처리 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">정산 완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-lg">₩</span>
            </div>
            <div>
              <p className="text-2xl font-bold">45.2M</p>
              <p className="text-xs text-muted-foreground">이번 달 정산액</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="판매자명 검색..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            정산 내역 다운로드
          </Button>
          <Button>일괄 정산 처리</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>정산 현황</CardTitle>
          <CardDescription>판매자별 정산 처리 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>정산 ID</TableHead>
                <TableHead>판매자</TableHead>
                <TableHead>정산 기간</TableHead>
                <TableHead>총 매출</TableHead>
                <TableHead>수수료</TableHead>
                <TableHead>정산 금액</TableHead>
                <TableHead>지급일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.id}</TableCell>
                  <TableCell>{settlement.seller}</TableCell>
                  <TableCell className="text-sm">{settlement.period}</TableCell>
                  <TableCell className="font-semibold">{settlement.totalSales}</TableCell>
                  <TableCell className="text-red-600">{settlement.commission}</TableCell>
                  <TableCell className="font-semibold text-green-600">{settlement.settlement}</TableCell>
                  <TableCell>{settlement.dueDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={settlement.status as any} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">상세보기</Button>
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