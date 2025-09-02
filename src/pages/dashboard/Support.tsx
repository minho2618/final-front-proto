import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, MessageSquare, AlertTriangle, HelpCircle, CheckCircle } from "lucide-react"

export default function Support() {
  const inquiries = [
    {
      id: "SUP-001",
      customer: "김고객",
      email: "kim@example.com",
      type: "complaint",
      subject: "배송 지연 문의",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-15 14:30",
      assignee: "미배정"
    },
    {
      id: "SUP-002",
      customer: "이문의",
      email: "lee@example.com",
      type: "inquiry",
      subject: "상품 교환 요청",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-01-15 10:15",
      assignee: "김상담"
    },
    {
      id: "SUP-003",
      customer: "박질문",
      email: "park@example.com",
      type: "inquiry",
      subject: "결제 방법 문의",
      status: "resolved",
      priority: "low",
      createdAt: "2024-01-14 16:45",
      assignee: "이상담"
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "inquiry":
        return <HelpCircle className="w-4 h-4 text-blue-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">고객 지원</h1>
        <p className="text-muted-foreground">고객 문의와 불만사항을 처리합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-xs text-muted-foreground">신규 문의</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <HelpCircle className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-muted-foreground">처리 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">142</p>
              <p className="text-xs text-muted-foreground">해결 완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">긴급 처리</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="고객명, 제목 검색..." className="pl-10" />
        </div>
        <Button>담당자 배정</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>문의 목록</CardTitle>
          <CardDescription>고객 문의 및 불만사항</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>문의 ID</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>우선순위</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>등록일시</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{inquiry.customer}</div>
                      <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(inquiry.type)}
                      <span className="capitalize">{inquiry.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{inquiry.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(inquiry.priority) as any}>
                      {inquiry.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{inquiry.assignee}</TableCell>
                  <TableCell className="text-sm">{inquiry.createdAt}</TableCell>
                  <TableCell>
                    <StatusBadge status={inquiry.status as any} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">답변</Button>
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