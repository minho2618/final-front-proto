import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge, StatusType } from "@/components/ui/status-badge"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"

export default function ProductInspection() {
  const inspections = [
    { 
      id: "IN001", 
      product: "유기농 토마토", 
      seller: "팜투테이블", 
      status: "pending", 
      submitDate: "2024-01-15",
      inspector: "미배정"
    },
    { 
      id: "IN002", 
      product: "친환경 쌀", 
      seller: "그린팜", 
      status: "in_progress", 
      submitDate: "2024-01-14",
      inspector: "김검수"
    },
    { 
      id: "IN003", 
      product: "무농약 사과", 
      seller: "애플팜", 
      status: "approved", 
      submitDate: "2024-01-13",
      inspector: "이검수"
    },
    { 
      id: "IN004", 
      product: "화학비료 채소", 
      seller: "케미팜", 
      status: "rejected", 
      submitDate: "2024-01-12",
      inspector: "박검수"
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
        <h1 className="text-3xl font-bold">상품 검사</h1>
        <p className="text-muted-foreground">등록된 상품의 품질과 인증을 검사합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">검사 대기</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Search className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">검사 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">승인 완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <XCircle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-xs text-muted-foreground">반려</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="상품명으로 검색..." className="pl-10" />
        </div>
        <Button>검사 배정</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>검사 대기 목록</CardTitle>
          <CardDescription>검사가 필요한 상품들</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>검사 ID</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead>판매자</TableHead>
                <TableHead>제출일</TableHead>
                <TableHead>검사자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.product}</TableCell>
                  <TableCell>{inspection.seller}</TableCell>
                  <TableCell>{inspection.submitDate}</TableCell>
                  <TableCell>{inspection.inspector}</TableCell>
                  <TableCell>
                  {getStatusBadge(inspection.status)}
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