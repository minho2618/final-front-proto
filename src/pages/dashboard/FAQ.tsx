import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      category: "주문/결제",
      question: "주문 취소는 어떻게 하나요?",
      answer: "마이페이지에서 주문 내역을 확인하여 취소할 수 있습니다...",
      status: "published",
      views: 245,
      helpful: 32,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      category: "배송",
      question: "배송비는 얼마인가요?",
      answer: "기본 배송비는 3,000원이며, 50,000원 이상 주문시 무료배송입니다...",
      status: "published",
      views: 189,
      helpful: 28,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-12"
    },
    {
      id: 3,
      category: "상품",
      question: "유기농 인증 확인 방법",
      answer: "모든 상품페이지에서 인증서를 확인할 수 있습니다...",
      status: "draft",
      views: 0,
      helpful: 0,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">FAQ 관리</h1>
        <p className="text-muted-foreground">자주 묻는 질문을 관리합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-xs text-muted-foreground">전체 FAQ</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">20</p>
              <p className="text-xs text-muted-foreground">게시 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">4</p>
              <p className="text-xs text-muted-foreground">임시 저장</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">1,456</p>
              <p className="text-xs text-muted-foreground">총 조회수</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="FAQ 검색..." className="pl-10" />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 FAQ 작성
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ 목록</CardTitle>
          <CardDescription>등록된 자주 묻는 질문들</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>카테고리</TableHead>
                <TableHead>질문</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>도움됨</TableHead>
                <TableHead>최종 수정</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>
                    <Badge variant="outline">{faq.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate font-medium">{faq.question}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {faq.answer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {faq.status === "published" ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      )}
                      <Badge variant={faq.status === "published" ? "default" : "secondary"}>
                        {faq.status === "published" ? "게시중" : "임시저장"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{faq.views}</TableCell>
                  <TableCell>{faq.helpful}</TableCell>
                  <TableCell>{faq.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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