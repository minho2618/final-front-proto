import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
 Search, 
 Plus, 
 Download, 
 Filter,
 MoreHorizontal,
 Edit,
 Eye,
 Trash2,
 CheckCircle,
 XCircle,
 Clock,
 Package,
 Loader2
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
import { StatusBadge } from "@/components/ui/status-badge"

// 백엔드 DTO 기반 타입 정의 (테이블에 필요한 필드 포함)
interface SellerRes {
    name: string;
}

interface ProductApiRes { 
 productId: number;
 name: string;
 price: number;
 category: string;
 discountValue: number;
 isActive: boolean;
 createdAt: string;
 seller: SellerRes | null; // null일 수 있음을 명시
}

interface TableProduct extends ProductApiRes { 
    stock: number;
    status: 'APPROVED' | 'PENDING' | 'REJECTED';
}


export default function Products() {
 const [searchQuery, setSearchQuery] = useState("")
 const [products, setProducts] = useState<TableProduct[]>([])
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)

 // API 호출 및 데이터 매핑 로직
 useEffect(() => {
  const fetchInactiveProducts = async () => {
   setIsLoading(true)
   setError(null)

   try {
    // 실제 API 경로에 맞게 수정이 필요할 수 있습니다.
    const response = await fetch('/api/products/inactive') 
    
    if (!response.ok) {
     throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: ProductApiRes[] = await response.json()
        
        // API 데이터 (ProductApiRes)를 테이블 렌더링에 필요한 형태 (TableProduct)로 매핑
        const mappedProducts: TableProduct[] = data.map(product => ({
            ...product,
            // 백엔드 DTO에 없는 필드 임시 추가 (실제 백엔드 DTO에 추가 필요)
            stock: 50, // 임시 재고 값
            // isActive: false 인 경우 'rejected'로 임시 매핑.
            status: product.isActive === false ? 'REJECTED' : 'APPROVED', 
        }));
        
    setProducts(mappedProducts)

   } catch (err) {
    console.error("상품 정보를 불러오는 데 실패했습니다:", err)
    setError("상품 정보를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.")
   } finally {
    setIsLoading(false)
   }
  }

  fetchInactiveProducts()
 }, []) 

 const getStockStatus = (stock: number) => {
  if (stock === 0) return <Badge variant="destructive">품절</Badge>
  if (stock < 10) return <Badge className="bg-warning text-warning-foreground">부족</Badge>
  return <Badge className="bg-status-approved text-success-foreground">충분</Badge>
 }

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <div>
     <h1 className="text-3xl font-bold tracking-tight">상품 관리</h1>
     <p className="text-muted-foreground">
      상품 승인, 수정, 삭제를 관리하세요
     </p>
    </div>
    <div className="flex space-x-2">
     <Button variant="outline">
      <Download className="w-4 h-4 mr-2" />
      내보내기
     </Button>
     <Button>
      <Plus className="w-4 h-4 mr-2" />
      상품 추가
     </Button>
    </div>
   </div>

   {/* Summary Cards (생략) */}
   <div className="grid gap-4 md:grid-cols-4">
        {/* ... (Summary Cards 내용) ... */}
   </div>

   {/* Products Table */}
   <Card>
    <CardHeader>
     <div className="flex items-center justify-between">
      <CardTitle>상품 목록</CardTitle>
      <div className="flex items-center space-x-2">
       <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
         placeholder="상품명, 판매자로 검색..."
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         className="pl-10 w-80"
        />
       </div>
       <Button variant="outline">
        <Filter className="w-4 h-4 mr-2" />
        필터
       </Button>
      </div>
     </div>
    </CardHeader>
    <CardContent>
     <Table>
      <TableHeader>
       <TableRow>
        <TableHead>상품정보</TableHead>
        <TableHead>카테고리</TableHead>
        <TableHead>판매자</TableHead>
        <TableHead>가격</TableHead>
        <TableHead>재고</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>등록일</TableHead>
        <TableHead className="w-[100px]">작업</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {isLoading ? (
        <TableRow>
         <TableCell colSpan={8} className="h-24 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
          <span>상품 목록을 불러오는 중...</span>
         </TableCell>
        </TableRow>
       ) : error ? (
        <TableRow>
         <TableCell colSpan={8} className="h-24 text-center text-destructive">
          {error}
         </TableCell>
        </TableRow>
       ) : products.length === 0 ? (
        <TableRow>
         <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
          등록된 비활성 상품이 없습니다.
         </TableCell>
        </TableRow>
       ) : 
        products.map((product) => (
         <TableRow key={product.productId}>
          <TableCell>
           <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
             <Package className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
             <div className="font-medium">{product.name}</div>
             <div className="text-sm text-muted-foreground">ID: {product.productId}</div>
            </div>
          </div>
          </TableCell>
          <TableCell>
           <Badge variant="outline">{product.category}</Badge>
          </TableCell>
          {/* seller 객체가 null일 경우를 대비해 Optional Chaining 사용 */}
          <TableCell>{product.seller?.name || '정보 없음'}</TableCell> 
          <TableCell>₩{(product.price).toLocaleString()}</TableCell>
          <TableCell>
           <div className="flex items-center space-x-2">
            <span>{product.stock}</span>
            {getStockStatus(product.stock)}
           </div>
          </TableCell>
          <TableCell>
           <StatusBadge status={product.status} />
          </TableCell>
          <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell> 
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
             {product.status === "PENDING" && (
              <>
               <DropdownMenuItem className="text-success">
                <CheckCircle className="mr-2 h-4 w-4" />
                승인
               </DropdownMenuItem>
               <DropdownMenuItem className="text-destructive">
                <XCircle className="mr-2 h-4 w-4" />
                반려
               </DropdownMenuItem>
              </>
            )}
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