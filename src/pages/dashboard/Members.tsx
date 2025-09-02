import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  UserPlus, 
  Download, 
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Mail,
  Phone,
  Calendar
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("")

  const members = [
    {
      id: 1,
      name: "김철수",
      email: "kim@example.com",
      phone: "010-1234-5678",
      role: "일반회원",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-03-10",
      orders: 12,
      totalSpent: 567000
    },
    {
      id: 2,
      name: "이영희",
      email: "lee@example.com",
      phone: "010-2345-6789",
      role: "VIP",
      status: "active",
      joinDate: "2023-12-08",
      lastLogin: "2024-03-09",
      orders: 24,
      totalSpent: 1234000
    },
    {
      id: 3,
      name: "박민수",
      email: "park@example.com",
      phone: "010-3456-7890",
      role: "일반회원",
      status: "inactive",
      joinDate: "2024-02-20",
      lastLogin: "2024-02-25",
      orders: 3,
      totalSpent: 89000
    },
    {
      id: 4,
      name: "최지영",
      email: "choi@example.com",
      phone: "010-4567-8901",
      role: "프리미엄",
      status: "active",
      joinDate: "2023-11-12",
      lastLogin: "2024-03-10",
      orders: 18,
      totalSpent: 890000
    }
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "VIP":
        return <Badge className="bg-gradient-primary text-white">VIP</Badge>
      case "프리미엄":
        return <Badge className="bg-status-processing text-accent-foreground">프리미엄</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">회원 관리</h1>
          <p className="text-muted-foreground">
            회원 정보를 조회하고 관리하세요
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          회원 추가
        </Button>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="이름, 이메일로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>회원정보</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>등급</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead>주문수</TableHead>
                <TableHead>총 구매액</TableHead>
                <TableHead className="w-[100px]">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatars/${member.id}.jpg`} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {member.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {member.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(member.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(member.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {member.joinDate}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      최근: {member.lastLogin}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{member.orders}</TableCell>
                  <TableCell>₩{member.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          상세보기
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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