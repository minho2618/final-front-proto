import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertTriangle, CheckCircle, XCircle, Plus, Minus } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  quality: "양호" | "주의" | "불량";
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  { id: "1", name: "유기농 토마토", category: "채소", stock: 150, minStock: 50, quality: "양호", lastUpdated: "2024-01-15" },
  { id: "2", name: "친환경 사과", category: "과일", stock: 25, minStock: 30, quality: "주의", lastUpdated: "2024-01-14" },
  { id: "3", name: "무농약 상추", category: "채소", stock: 80, minStock: 20, quality: "양호", lastUpdated: "2024-01-15" },
  { id: "4", name: "천연 꿀", category: "가공품", stock: 5, minStock: 10, quality: "불량", lastUpdated: "2024-01-13" },
];

export default function ProductInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [filter, setFilter] = useState<string>("전체");

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "양호":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />양호</Badge>;
      case "주의":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />주의</Badge>;
      case "불량":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />불량</Badge>;
      default:
        return null;
    }
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) {
      return <Badge variant="destructive">재고 부족</Badge>;
    } else if (stock <= minStock * 1.5) {
      return <Badge variant="secondary">재고 주의</Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">재고 충분</Badge>;
  };

  const adjustStock = (id: string, change: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + change), lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const filteredInventory = filter === "전체" 
    ? inventory 
    : inventory.filter(item => item.quality === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">재고 관리</h1>
          <p className="text-muted-foreground mt-2">상품별 재고 현황과 품질 상태를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="양호">양호</SelectItem>
              <SelectItem value="주의">주의</SelectItem>
              <SelectItem value="불량">불량</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 상품 수</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">재고 부족</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventory.filter(item => item.stock <= item.minStock).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">품질 주의</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {inventory.filter(item => item.quality === "주의").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">품질 불량</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventory.filter(item => item.quality === "불량").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>재고 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>현재 재고</TableHead>
                <TableHead>최소 재고</TableHead>
                <TableHead>재고 상태</TableHead>
                <TableHead>품질 상태</TableHead>
                <TableHead>최종 업데이트</TableHead>
                <TableHead>재고 조정</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.stock}개</TableCell>
                  <TableCell>{item.minStock}개</TableCell>
                  <TableCell>{getStockStatus(item.stock, item.minStock)}</TableCell>
                  <TableCell>{getQualityBadge(item.quality)}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adjustStock(item.id, -1)}
                        disabled={item.stock === 0}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.stock}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adjustStock(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
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
  );
}