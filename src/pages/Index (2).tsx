import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Truck, Shield, Heart, ArrowRight, Star } from "lucide-react";

import heroImage from "@/assets/fresh-produce-hero.jpg";
import tomatoesImage from "@/assets/tomatoes.jpg";
import lettuceImage from "@/assets/lettuce.jpg";
import applesImage from "@/assets/apples.jpg";
import carrotsImage from "@/assets/carrots.jpg";

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "경북 안동 유기농 토마토 1kg",
      image: tomatoesImage,
      price: 8500,
      originalPrice: 10000,
      rating: 4.8,
      reviews: 234,
      farmer: "김농부",
      location: "경북 안동",
      isOrganic: true,
      discount: 15
    },
    {
      id: 2,
      name: "제주도 신선 유기농 상추 300g",
      image: lettuceImage,
      price: 4500,
      rating: 4.9,
      reviews: 187,
      farmer: "이농장",
      location: "제주도",
      isOrganic: true
    },
    {
      id: 3,
      name: "충주 햇 사과 2kg (10-12개)",
      image: applesImage,
      price: 15000,
      originalPrice: 18000,
      rating: 4.7,
      reviews: 456,
      farmer: "박과수원",
      location: "충북 충주",
      discount: 17
    },
    {
      id: 4,
      name: "강원도 정선 당근 1kg",
      image: carrotsImage,
      price: 3500,
      rating: 4.6,
      reviews: 123,
      farmer: "최농가",
      location: "강원도 정선"
    }
  ];

  const categories = [
    { name: "과일", count: 156, color: "bg-red-100 text-red-700" },
    { name: "채소", count: 234, color: "bg-fresh-green/10 text-fresh-green" },
    { name: "곡물", count: 89, color: "bg-amber-100 text-amber-700" },
    { name: "축산", count: 67, color: "bg-pink-100 text-pink-700" },
    { name: "수산", count: 45, color: "bg-blue-100 text-blue-700" },
    { name: "가공식품", count: 123, color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                  <Leaf className="w-4 h-4 mr-2" />
                  100% 국내산 직거래
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  농가에서 바로,
                  <br />
                  <span className="text-primary">신선한 농산물</span>을
                  <br />
                  만나보세요
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  생산자와 소비자를 직접 연결하여 더 신선하고 합리적인 가격의 
                  농산물을 제공합니다. 지속가능한 농업을 지원하고 건강한 먹거리를 선택하세요.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-fresh hover:shadow-fresh text-white px-8 py-3 text-lg h-12"
                >
                  신선한 상품 둘러보기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg h-12">
                  농가 등록하기
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2,500+</div>
                  <div className="text-sm text-muted-foreground">등록 농가</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">만족한 고객</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">평균 평점</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="신선한 농산물" 
                className="w-full rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-card">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-fresh rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">평균 배송시간</div>
                    <div className="text-xs text-muted-foreground">당일~익일 배송</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-elevated transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">당일 배송</h3>
              <p className="text-sm text-muted-foreground">
                오전 주문시 당일 배송, 신선함을 그대로 전달합니다
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-elevated transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">품질 보증</h3>
              <p className="text-sm text-muted-foreground">
                엄격한 품질 검수를 통과한 안전하고 신선한 농산물만 판매합니다
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-elevated transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">농가 직거래</h3>
              <p className="text-sm text-muted-foreground">
                중간 유통업체 없이 농가와 직접 거래로 합리적인 가격을 제공합니다
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">카테고리별 상품</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              다양한 종류의 신선한 농산물을 카테고리별로 만나보세요
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="p-4 text-center hover:shadow-elevated transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.count}개 상품
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">추천 상품</h2>
              <p className="text-muted-foreground">신선함과 품질을 자랑하는 인기 상품들</p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              전체 상품 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-fresh rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-primary">신선마켓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                농가와 소비자를 직접 연결하는 신선한 농산물 직거래 플랫폼
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">고객센터</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1588-1234</p>
                <p>평일 09:00~18:00</p>
                <p>토요일 09:00~16:00</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">회사정보</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>회사소개</p>
                <p>이용약관</p>
                <p>개인정보처리방침</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">농가등록</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>판매자 신청</p>
                <p>판매자 가이드</p>
                <p>정산 안내</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 신선마켓. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;