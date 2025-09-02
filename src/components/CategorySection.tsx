import { Card, CardContent } from "@/components/ui/card";
import tomatoesImage from "@/assets/tomatoes.jpg";
import leafyGreensImage from "@/assets/leafy-greens.jpg";
import fruitsImage from "@/assets/seasonal-fruits.jpg";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "vegetables",
    name: "신선채소",
    image: leafyGreensImage,
    productCount: 156,
    color: "from-green-400 to-green-600"
  },
  {
    id: "fruits",
    name: "계절과일", 
    image: fruitsImage,
    productCount: 89,
    color: "from-orange-400 to-red-500"
  },
  {
    id: "tomatoes",
    name: "토마토",
    image: tomatoesImage,
    productCount: 34,
    color: "from-red-400 to-red-600"
  },
  {
    id: "grains",
    name: "곡물·견과",
    image: leafyGreensImage, // 임시로 같은 이미지 사용
    productCount: 67,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "special",
    name: "지역특산품",
    image: fruitsImage, // 임시로 같은 이미지 사용  
    productCount: 42,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "herbs",
    name: "허브·양념",
    image: leafyGreensImage, // 임시로 같은 이미지 사용
    productCount: 28,
    color: "from-emerald-400 to-emerald-600"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            카테고리별 농산물
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            다양한 종류의 신선한 농산물을 카테고리별로 만나보세요
          </p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer smooth-transition hover:shadow-lg border-border bg-card"
            >
              <CardContent className="p-0">
                {/* 카테고리 이미지 */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 md:h-40 object-cover smooth-transition group-hover:scale-110"
                  />
                  
                  {/* 그라디언트 오버레이 */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 smooth-transition`}></div>
                  
                  {/* 상품 개수 배지 */}
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/90 text-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {category.productCount}개
                    </span>
                  </div>
                </div>

                {/* 카테고리 정보 */}
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-semibold text-foreground group-hover:text-primary smooth-transition">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 모든 카테고리 보기 버튼 */}
        <div className="text-center mt-8">
          <button className="text-primary hover:text-primary-hover font-medium smooth-transition">
            모든 카테고리 보기 →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;