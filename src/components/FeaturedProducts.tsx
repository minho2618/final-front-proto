import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import tomatoesImage from "@/assets/tomatoes.jpg";
import leafyGreensImage from "@/assets/leafy-greens.jpg";
import fruitsImage from "@/assets/seasonal-fruits.jpg";

// 샘플 상품 데이터
const featuredProducts = [
  {
    id: "1",
    name: "유기농 방울토마토",
    price: 8900,
    originalPrice: 12000,
    image: tomatoesImage,
    rating: 4.8,
    reviewCount: 234,
    farm: "청정농장",
    isOrganic: true,
    discount: 26
  },
  {
    id: "2", 
    name: "신선한 상추 모듬",
    price: 5500,
    image: leafyGreensImage,
    rating: 4.6,
    reviewCount: 189,
    farm: "푸른들농장",
    isOrganic: true
  },
  {
    id: "3",
    name: "계절 과일 혼합",
    price: 15600,
    originalPrice: 18000,
    image: fruitsImage,
    rating: 4.9,
    reviewCount: 156,
    farm: "행복과수원",
    discount: 13
  },
  {
    id: "4",
    name: "친환경 토마토 1kg",
    price: 7200,
    image: tomatoesImage,
    rating: 4.7,
    reviewCount: 298,
    farm: "자연농장"
  },
  {
    id: "5",
    name: "유기농 시금치",
    price: 4800,
    originalPrice: 6000,
    image: leafyGreensImage,
    rating: 4.5,
    reviewCount: 142,
    farm: "건강농장",
    isOrganic: true,
    discount: 20
  },
  {
    id: "6",
    name: "달콤한 딸기",
    price: 12000,
    image: fruitsImage,
    rating: 4.8,
    reviewCount: 176,
    farm: "달콤농원"
  },
  {
    id: "7",
    name: "신선 당근",
    price: 3600,
    image: leafyGreensImage,
    rating: 4.4,
    reviewCount: 89,
    farm: "튼튼농장"
  },
  {
    id: "8",
    name: "제철 사과",
    price: 9800,
    originalPrice: 11000,
    image: fruitsImage,
    rating: 4.7,
    reviewCount: 203,
    farm: "산골과수원",
    discount: 11
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              인기 농산물
            </h2>
            <p className="text-lg text-muted-foreground">
              고객들이 가장 많이 찾는 신선한 농산물들을 만나보세요
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground smooth-transition"
          >
            전체보기
          </Button>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        {/* 모바일 전체보기 버튼 */}
        <div className="text-center mt-8 md:hidden">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground smooth-transition"
          >
            더 많은 상품 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;