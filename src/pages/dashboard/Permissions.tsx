import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Shield, Users, Settings, Plus } from "lucide-react"

export default function Permissions() {
  const roles = [
    { id: 1, name: "슈퍼 관리자", users: 2, permissions: ["모든 권한"], color: "destructive" },
    { id: 2, name: "관리자", users: 5, permissions: ["회원 관리", "상품 관리", "주문 관리"], color: "default" },
    { id: 3, name: "운영자", users: 12, permissions: ["상품 관리", "고객 서비스"], color: "secondary" },
    { id: 4, name: "검수원", users: 8, permissions: ["상품 검수"], color: "outline" },
  ]

  const permissions = [
    { name: "회원 관리", admin: true, operator: true, inspector: false },
    { name: "상품 관리", admin: true, operator: true, inspector: false },
    { name: "상품 검수", admin: true, operator: false, inspector: true },
    { name: "주문 관리", admin: true, operator: false, inspector: false },
    { name: "정산 관리", admin: true, operator: false, inspector: false },
    { name: "시스템 설정", admin: true, operator: false, inspector: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">권한 설정</h1>
        <p className="text-muted-foreground">사용자 역할과 권한을 관리합니다</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>사용자 역할</CardTitle>
              <CardDescription>시스템의 모든 역할 목록</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              역할 추가
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{role.name}</span>
                        <Badge variant={role.color as any}>{role.users}명</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {role.permissions.join(", ")}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>권한 매트릭스</CardTitle>
            <CardDescription>역할별 세부 권한 설정</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>권한</TableHead>
                  <TableHead>관리자</TableHead>
                  <TableHead>운영자</TableHead>
                  <TableHead>검수원</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.name}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    <TableCell>
                      <Switch checked={permission.admin} disabled />
                    </TableCell>
                    <TableCell>
                      <Switch checked={permission.operator} />
                    </TableCell>
                    <TableCell>
                      <Switch checked={permission.inspector} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}