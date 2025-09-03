import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

const ModernSearchSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4 relative">
      <div className="w-full max-w-2xl">
        {/* 상단 로그인 */}
        <div className="flex justify-end mb-8">
          <Button variant="outline" className="rounded-full font-jua bg-white border-white text-foreground hover:bg-gray-50">
            로그인
          </Button>
        </div>
        {/* 로고 & 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-jua text-foreground mb-4">
                &nbsp;산지직송🌱
          </h1>
          <p className="text-lg text-muted-foreground font-jua">
            믿을 수 있는 농산물, 직접 만나보세요.
          </p>
        </div>

        {/* 검색 */}
        <div className="space-y-4">
          <div className="relative">
            <Input 
              placeholder="어떤 농산물을 찾고 계신가요?"
              className="w-full h-14 text-lg pl-12 pr-14 rounded-xl border-2 border-border hover:border-primary/20 focus:border-primary transition-colors"
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Button 
              size="sm"
              className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* 인기 농산물 키워드 */}
          <div className="flex flex-wrap gap-3 justify-start">
            {['감자', '고구마', '사과', '배추', '당근', '토마토', '딸기', '쌀', '양파', '무', '오이', '상추', '포도', '수박', '귤', '오렌지', '한라봉', '샤인머스켓'].map((keyword) => (
              <Button 
                key={keyword}
                variant="outline"
                size="sm"
                className="rounded-full bg-white border-white text-gray-600 hover:bg-gray-50 font-jua text-sm px-4 py-2"
              >
                {keyword}
              </Button>
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <div className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: "채소", emoji: "🥬", bgColor: "bg-green-50", hoverColor: "hover:bg-green-100", textColor: "text-green-700" },
              { name: "과일", emoji: "🍎", bgColor: "bg-red-50", hoverColor: "hover:bg-red-100", textColor: "text-red-700" },
              { name: "곡물", emoji: "🌾", bgColor: "bg-yellow-50", hoverColor: "hover:bg-yellow-100", textColor: "text-yellow-700" },
              { name: "체험", emoji: "🚜", bgColor: "bg-blue-50", hoverColor: "hover:bg-blue-100", textColor: "text-blue-700" }
            ].map((category) => (
              <button 
                key={category.name}
                className={`relative p-8 ${category.bgColor} ${category.hoverColor} rounded-2xl border-2 border-transparent hover:border-white hover:shadow-lg transition-all duration-300 group overflow-hidden`}
              >
                {/* 배경 패턴 */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
                </div>
                
                {/* 이모지 */}
                <div className="relative text-4xl mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {category.emoji}
                </div>
                
                {/* 텍스트 */}
                <div className={`relative font-jua text-lg ${category.textColor} group-hover:scale-105 transition-transform duration-300`}>
                  {category.name}
                </div>
                
                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            ))}
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground font-jua">
            관리자 승인을 통한 안전한 거래 🛡️
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModernSearchSection;