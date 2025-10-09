import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import tomatoesImage from "@/assets/tomatoes.jpg";
import grainImage from "@/assets/grain.jpg";
import leafyGreensImage from "@/assets/leafy-greens.jpg";
import fruitsImage from "@/assets/seasonal-fruits.jpg";

interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
}

const categories: Category[] = [
  {
    id: "VEGETABLE",
    name: "채소",
    image: leafyGreensImage,
    color: "from-green-400 to-green-600"
  },
  {
    id: "FRUIT",
    name: "과일", 
    image: fruitsImage,
    color: "from-orange-400 to-red-500"
  },
  {
    id: "GRAIN",
    name: "곡물",
    image: grainImage,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "SEAFOOD",
    name: "수산물",
    image: fruitsImage, // 임시로 같은 이미지 사용  
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "ETC",
    name: "기타",
    image: leafyGreensImage, // 임시로 같은 이미지 사용
    color: "from-emerald-400 to-emerald-600"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-8">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card 
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
                  {/* <div className="absolute top-2 right-2">
                    <span className="bg-white/90 text-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {category.productCount}개
                    </span>
                  </div> */}
                </div>

                {/* 카테고리 정보 */}
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-semibold text-foreground group-hover:text-primary smooth-transition">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
            </Link>
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