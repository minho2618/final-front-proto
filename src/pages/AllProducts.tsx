import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { getAllProducts } from "@/lib/api";
import tomatoesImage from "@/assets/tomatoes.jpg";
import noImage from "@/assets/no-image.png";


interface Product {
  productId: number;
  name: string;
  price: number;
  discountValue: number;
  category: string;
  farmName?: string;           // ⬅️ 추가
  imageUrl?: string;          // ✅ 추가
  rating?: number;
  reviewCount?: number;
  isOrganic?: boolean;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    organic: false,
    discount: false,
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        // Handle different response structures
        const productArray = Array.isArray(data) ? data : data.content || [];
        
        // Add mock data for fields not in ProductCardRes for filtering/sorting
        const productsWithMockData = productArray.map((p: any) => ({ 
            ...p, 
            isOrganic: Math.random() > 0.5, 
            rating: (Math.random() * (5 - 3.5) + 3.5), 
            reviewCount: Math.floor(Math.random() * 200) 
        }));
        setProducts(productsWithMockData);
      } catch (err) {
        setError("상품을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 필터링 및 정렬된 상품
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.organic && !product.isOrganic) return false;
      if (filters.discount && product.discountValue <= 0) return false;
      if (filters.rating > 0 && (product.rating || 0) < filters.rating) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });

    // 정렬
    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        // API doesn't provide creation date for ProductCardRes, so we can't sort by newest
        break;
      default: // popular
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return filtered;
  }, [products, filters, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-8">
        {/* 브레드크럼과 제목 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary smooth-transition">홈</Link>
            <span>/</span>
            <span className="text-foreground">전체 상품</span>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                전체 상품
              </h1>
              <p className="text-lg text-muted-foreground">신선한 농산품을 모두 만나보세요</p>
              <p className="text-sm text-muted-foreground mt-2">
                총 {filteredProducts.length}개 상품
              </p>
            </div>
            
            <Link to="/">
              <Button variant="outline" className="hidden md:flex">
                <ChevronLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 필터 - 데스크톱 */}
          <aside className="hidden lg:block lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  필터
                </h3>
                
                {/* 가격 범위 */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-foreground">가격 범위</h4>
                  <Slider
                    value={[priceRange[1]]}
                    onValueChange={([value]) => setPriceRange([0, value])}
                    max={50000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0원</span>
                    <span>{priceRange[1].toLocaleString()}원</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* 필터 옵션 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="organic"
                      checked={filters.organic}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, organic: !!checked }))
                      }
                    />
                    <label htmlFor="organic" className="text-sm font-medium">
                      유기농만 보기
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="discount"
                      checked={filters.discount}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, discount: !!checked }))
                      }
                    />
                    <label htmlFor="discount" className="text-sm font-medium">
                      할인 상품만
                    </label>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* 평점 필터 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">최소 평점</h4>
                  <Select 
                    value={filters.rating.toString()} 
                    onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, rating: Number(value) }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">모든 평점</SelectItem>
                      <SelectItem value="4">⭐ 4.0 이상</SelectItem>
                      <SelectItem value="4.5">⭐ 4.5 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            {/* 툴바 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  필터
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="newest">최신순</SelectItem>
                    <SelectItem value="price_low">가격 낮은순</SelectItem>
                    <SelectItem value="price_high">가격 높은순</SelectItem>
                    <SelectItem value="rating">평점순</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 모바일 필터 */}
            {showFilters && (
              <Card className="lg:hidden mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">필터</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-organic"
                        checked={filters.organic}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, organic: !!checked }))
                        }
                      />
                      <label htmlFor="mobile-organic" className="text-sm font-medium">
                        유기농만 보기
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-discount"
                        checked={filters.discount}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, discount: !!checked }))
                        }
                      />
                      <label htmlFor="mobile-discount" className="text-sm font-medium">
                        할인 상품만
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 상품 목록 */}
            {loading ? (
                <div className="text-center py-16">로딩 중...</div>
            ) : error ? (
                <div className="text-center py-16 text-red-500">{error}</div>
            ) : filteredProducts.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => {
                  const img =
                    product.imageUrl && product.imageUrl.trim().length > 0
                      ? product.imageUrl
                      : noImage; // ✅ 없으면 no-images.png

                  return (
                    <ProductCard
                      key={product.productId}
                      id={String(product.productId)}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.price + product.discountValue}
                      image={img}                               // ✅ 변경
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      farm={product.farmName ?? "농장 정보 없음"}
                      isOrganic={product.isOrganic}
                      discount={
                        product.discountValue > 0
                          ? Math.round(
                              (product.discountValue / (product.price + product.discountValue)) *
                                100
                            )
                          : undefined
                      }
                    />
                  );
                })}

              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  조건에 맞는 상품이 없습니다
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFilters({ organic: false, discount: false, rating: 0 });
                    setPriceRange([0, 1000000]);
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProducts;