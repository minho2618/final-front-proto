import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  Percent, 
  Tag, 
  Clock, 
  Edit, 
  Save,
  Calendar
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "유기농 토마토 1kg",
    currentPrice: 8500,
    category: "채소류",
    discount: 15,
    isDiscountActive: true,
    discountEndDate: "2024-12-31"
  },
  {
    id: 2,
    name: "신선한 당근 2kg", 
    currentPrice: 12000,
    category: "채소류",
    discount: 0,
    isDiscountActive: false,
    discountEndDate: null
  },
  {
    id: 3,
    name: "친환경 상추",
    currentPrice: 5500,
    category: "채소류", 
    discount: 10,
    isDiscountActive: true,
    discountEndDate: "2024-12-25"
  }
];

export default function ProductPricing() {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [priceData, setPriceData] = useState({
    price: "",
    discount: "",
    isDiscountActive: false,
    discountEndDate: ""
  });

  const handlePriceUpdate = (productId: number) => {
    toast({
      title: "가격 업데이트 완료",
      description: "상품 가격이 성공적으로 변경되었습니다.",
    });
    setSelectedProduct(null);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">가격 및 할인 설정</h1>
        <p className="text-muted-foreground mt-2">상품 가격과 할인을 관리하세요</p>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">상품별 가격 관리</TabsTrigger>
          <TabsTrigger value="bulk">일괄 할인 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {product.category}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setPriceData({
                          price: product.currentPrice.toString(),
                          discount: product.discount.toString(),
                          isDiscountActive: product.isDiscountActive,
                          discountEndDate: product.discountEndDate || ""
                        });
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedProduct === product.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`price-${product.id}`}>가격 (원)</Label>
                          <Input
                            id={`price-${product.id}`}
                            type="number"
                            value={priceData.price}
                            onChange={(e) => setPriceData(prev => ({
                              ...prev,
                              price: e.target.value
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`discount-${product.id}`}>할인율 (%)</Label>
                          <Input
                            id={`discount-${product.id}`}
                            type="number"
                            max="100"
                            value={priceData.discount}
                            onChange={(e) => setPriceData(prev => ({
                              ...prev,
                              discount: e.target.value
                            }))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={priceData.isDiscountActive}
                          onCheckedChange={(checked) => setPriceData(prev => ({
                            ...prev,
                            isDiscountActive: checked
                          }))}
                        />
                        <Label>할인 활성화</Label>
                      </div>

                      {priceData.isDiscountActive && (
                        <div>
                          <Label htmlFor={`endDate-${product.id}`}>할인 종료일</Label>
                          <Input
                            id={`endDate-${product.id}`}
                            type="date"
                            value={priceData.discountEndDate}
                            onChange={(e) => setPriceData(prev => ({
                              ...prev,
                              discountEndDate: e.target.value
                            }))}
                          />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handlePriceUpdate(product.id)}
                          className="bg-primary hover:bg-primary-hover"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          저장
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedProduct(null)}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">현재 가격</p>
                          <p className="font-bold">
                            ₩{product.currentPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">할인율</p>
                          <p className="font-bold">
                            {product.isDiscountActive ? `${product.discount}%` : "할인 없음"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-success" />
                        <div>
                          <p className="text-sm text-muted-foreground">판매 가격</p>
                          <p className="font-bold text-success">
                            ₩{calculateDiscountedPrice(product.currentPrice, product.isDiscountActive ? product.discount : 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {product.isDiscountActive && product.discountEndDate && (
                        <div className="flex items-center gap-2 md:col-span-3">
                          <Clock className="w-4 h-4 text-warning" />
                          <p className="text-sm">
                            할인 종료: {product.discountEndDate}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                일괄 할인 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>할인율 (%)</Label>
                  <Input type="number" placeholder="예: 20" max="100" />
                </div>
                <div>
                  <Label>할인 카테고리</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>전체 상품</option>
                    <option>채소류</option>
                    <option>과일류</option>
                    <option>곡물류</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>할인 시작일</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>할인 종료일</Label>
                  <Input type="date" />
                </div>
              </div>

              <Button className="bg-accent hover:bg-accent-hover">
                <Percent className="w-4 h-4 mr-2" />
                일괄 할인 적용
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}