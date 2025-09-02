import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, RotateCcw } from "lucide-react"

export default function WithdrawnMembers() {
  const withdrawnMembers = [
    { id: "WD001", name: "김철수", email: "kim@example.com", withdrawDate: "2024-01-15", reason: "서비스 불만족" },
    { id: "WD002", name: "이영희", email: "lee@example.com", withdrawDate: "2024-01-12", reason: "개인사유" },
    { id: "WD003", name: "박민수", email: "park@example.com", withdrawDate: "2024-01-10", reason: "타 서비스 이용" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">탈퇴 회원 관리</h1>
        <p className="text-muted-foreground">탈퇴한 회원 정보를 관리합니다</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="회원 검색..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          내보내기
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>탈퇴 회원 목록</CardTitle>
          <CardDescription>총 3명의 탈퇴 회원이 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>회원 ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>탈퇴일</TableHead>
                <TableHead>탈퇴 사유</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawnMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.withdrawDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      복구
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