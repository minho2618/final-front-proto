import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import tomatoesImage from "@/assets/tomatoes.jpg";
import leafyGreensImage from "@/assets/leafy-greens.jpg";
import fruitsImage from "@/assets/seasonal-fruits.jpg";

// 카테고리별 상품 데이터
const categoryProducts = {
  vegetables: [
    {
      id: "v1", name: "유기농 상추", price: 4500, originalPrice: 5500, image: leafyGreensImage,
      rating: 4.6, reviewCount: 89, farm: "푸른들농장", isOrganic: true, discount: 18
    },
    {
      id: "v2", name: "신선 시금치", price: 3800, image: leafyGreensImage,
      rating: 4.4, reviewCount: 156, farm: "건강농장", isOrganic: true
    },
    {
      id: "v3", name: "당근 1kg", price: 2900, image: leafyGreensImage,
      rating: 4.3, reviewCount: 203, farm: "튼튼농장"
    },
    {
      id: "v4", name: "유기농 브로콜리", price: 6800, originalPrice: 8000, image: leafyGreensImage,
      rating: 4.7, reviewCount: 134, farm: "자연농장", isOrganic: true, discount: 15
    },
    {
      id: "v5", name: "신선 양배추", price: 3200, image: leafyGreensImage,
      rating: 4.2, reviewCount: 98, farm: "푸른들농장"
    },
    {
      id: "v6", name: "유기농 케일", price: 5600, image: leafyGreensImage,
      rating: 4.5, reviewCount: 76, farm: "건강농장", isOrganic: true
    }
  ],
  fruits: [
    {
      id: "f1", name: "달콤한 딸기 1팩", price: 8900, originalPrice: 10000, image: fruitsImage,
      rating: 4.8, reviewCount: 245, farm: "달콤농원", discount: 11
    },
    {
      id: "f2", name: "햇사과 5개", price: 12000, image: fruitsImage,
      rating: 4.6, reviewCount: 189, farm: "산골과수원"
    },
    {
      id: "f3", name: "유기농 배 3개", price: 15600, image: fruitsImage,
      rating: 4.9, reviewCount: 87, farm: "자연과수원", isOrganic: true
    },
    {
      id: "f4", name: "제철 복숭아", price: 18000, originalPrice: 20000, image: fruitsImage,
      rating: 4.7, reviewCount: 156, farm: "달콤농원", discount: 10
    }
  ],
  tomatoes: [
    {
      id: "t1", name: "유기농 방울토마토", price: 8900, originalPrice: 12000, image: tomatoesImage,
      rating: 4.8, reviewCount: 234, farm: "청정농장", isOrganic: true, discount: 26
    },
    {
      id: "t2", name: "친환경 토마토 1kg", price: 7200, image: tomatoesImage,
      rating: 4.7, reviewCount: 298, farm: "자연농장"
    },
    {
      id: "t3", name: "대저토마토 2kg", price: 14500, originalPrice: 16000, image: tomatoesImage,
      rating: 4.9, reviewCount: 167, farm: "부산농장", discount: 9
    }
  ]
};

const categoryInfo = {
  vegetables: { name: "신선채소", description: "매일 아침 수확한 신선한 채소들" },
  fruits: { name: "계절과일", description: "달콤하고 신선한 제철 과일" },
  tomatoes: { name: "토마토", description: "빨갛게 익은 신선한 토마토" },
  grains: { name: "곡물·견과", description: "건강한 곡물과 견과류" },
  special: { name: "지역특산품", description: "전국 각지의 특산품" },
  herbs: { name: "허브·양념", description: "요리에 필요한 신선한 허브와 양념" }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    organic: false,
    discount: false,
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const products = categoryProducts[categoryId as keyof typeof categoryProducts] || [];
  const category = categoryInfo[categoryId as keyof typeof categoryInfo];

  // 필터링 및 정렬된 상품
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.organic && !product.isOrganic) return false;
      if (filters.discount && !product.discount) return false;
      if (filters.rating > 0 && product.rating < filters.rating) return false;
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // 기본 순서
        break;
      default: // popular
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [products, filters, priceRange, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">카테고리를 찾을 수 없습니다</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            홈으로 돌아가기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-8">
        {/* 브레드크럼과 제목 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary smooth-transition">홈</Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground">{category.description}</p>
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
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()}원</span>
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
                  {/* 모바일용 필터 내용은 데스크톱과 동일 */}
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
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
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
                    setPriceRange([0, 50000]);
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

export default CategoryPage;