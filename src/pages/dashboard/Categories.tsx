import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FolderTree, Plus, Edit, Trash2, Package } from "lucide-react"

export default function Categories() {
  const categories = [
    { id: 1, name: "유기농 채소", parent: null, products: 45, status: "active" },
    { id: 2, name: "토마토", parent: "유기농 채소", products: 12, status: "active" },
    { id: 3, name: "상추", parent: "유기농 채소", products: 8, status: "active" },
    { id: 4, name: "친환경 과일", parent: null, products: 32, status: "active" },
    { id: 5, name: "사과", parent: "친환경 과일", products: 15, status: "active" },
    { id: 6, name: "배", parent: "친환경 과일", products: 7, status: "inactive" },
    { id: 7, name: "무농약 곡물", parent: null, products: 18, status: "active" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">카테고리 관리</h1>
        <p className="text-muted-foreground">상품 카테고리를 구성하고 관리합니다</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <FolderTree className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs text-muted-foreground">전체 카테고리</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Package className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">95</p>
              <p className="text-xs text-muted-foreground">등록된 상품</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Plus className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                새 카테고리
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>카테고리 구조</CardTitle>
          <CardDescription>계층형 카테고리 관리</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>카테고리명</TableHead>
                <TableHead>상위 카테고리</TableHead>
                <TableHead>상품 수</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {category.parent && <span className="text-muted-foreground">└</span>}
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {category.parent ? (
                      <Badge variant="outline">{category.parent}</Badge>
                    ) : (
                      <span className="text-muted-foreground">최상위</span>
                    )}
                  </TableCell>
                  <TableCell>{category.products}개</TableCell>
                  <TableCell>
                    <Badge variant={category.status === "active" ? "default" : "secondary"}>
                      {category.status === "active" ? "활성" : "비활성"}
                    </Badge>
                  </TableCell>
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