import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-vegetables.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="신선한 농산물" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-10"></div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-2xl">
          {/* 메인 헤딩 */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            신선한 농산물을
            <br />
            <span className="gradient-secondary bg-clip-text text-transparent">
              직접 농장에서
            </span>
          </h1>

          {/* 서브 텍스트 */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            농부가 직접 재배한 신선하고 건강한 농산물을 
            합리적인 가격에 만나보세요. 
            당일 수확한 신선함을 그대로 전달합니다.
          </p>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground smooth-transition"
            >
              지금 쇼핑하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary smooth-transition"
            >
              농장 소개보기
            </Button>
          </div>

          {/* 특징 아이콘들 */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">당일 배송</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">품질 보장</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">친환경 재배</span>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;