import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Megaphone, Pin } from "lucide-react"

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "새해 특별 할인 이벤트 안내",
      type: "event",
      status: "published",
      isPinned: true,
      views: 1243,
      createdAt: "2024-01-01",
      publishedAt: "2024-01-01",
      author: "관리자"
    },
    {
      id: 2,
      title: "배송 시스템 점검 안내",
      type: "notice",
      status: "published",
      isPinned: false,
      views: 856,
      createdAt: "2024-01-10",
      publishedAt: "2024-01-10",
      author: "관리자"
    },
    {
      id: 3,
      title: "신규 상품 카테고리 추가",
      type: "update",
      status: "draft",
      isPinned: false,
      views: 0,
      createdAt: "2024-01-15",
      publishedAt: null,
      author: "관리자"
    },
    {
      id: 4,
      title: "개인정보처리방침 변경 안내",
      type: "notice",
      status: "published",
      isPinned: true,
      views: 432,
      createdAt: "2024-01-05",
      publishedAt: "2024-01-05",
      author: "관리자"
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "event":
        return "default"
      case "notice":
        return "destructive"
      case "update":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "event":
        return "이벤트"
      case "notice":
        return "공지"
      case "update":
        return "업데이트"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">공지사항 관리</h1>
        <p className="text-muted-foreground">사이트 공지사항을 작성하고 관리합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Megaphone className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-muted-foreground">전체 공지</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">게시 중</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Pin className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">고정 공지</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-lg">👁</span>
            </div>
            <div>
              <p className="text-2xl font-bold">5.2K</p>
              <p className="text-xs text-muted-foreground">총 조회수</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="공지사항 검색..." className="pl-10" />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 공지사항 작성
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>공지사항 목록</CardTitle>
          <CardDescription>등록된 모든 공지사항</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead>게시일</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-medium">{announcement.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(announcement.type) as any}>
                      {getTypeLabel(announcement.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={announcement.status === "published" ? "default" : "secondary"}>
                      {announcement.status === "published" ? "게시중" : "임시저장"}
                    </Badge>
                  </TableCell>
                  <TableCell>{announcement.views.toLocaleString()}</TableCell>
                  <TableCell>{announcement.createdAt}</TableCell>
                  <TableCell>{announcement.publishedAt || "-"}</TableCell>
                  <TableCell>{announcement.author}</TableCell>
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