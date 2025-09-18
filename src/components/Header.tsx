import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  const handleUserClick = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">팜</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">팜투테이블</h1>
          </Link>

          {/* 검색바 - 데스크톱 */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="농산물을 검색해보세요..." 
                className="pl-10 smooth-transition focus:ring-primary"
              />
            </div>
          </div>

          {/* 네비게이션 - 데스크톱 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary smooth-transition">홈</Link>
            <Link to="/category/vegetables" className="text-foreground hover:text-primary smooth-transition">채소</Link>
            <Link to="/category/fruits" className="text-foreground hover:text-primary smooth-transition">과일</Link>
            <Link to="/category/grains" className="text-foreground hover:text-primary smooth-transition">곡물</Link>
            <Link to="/category/special" className="text-foreground hover:text-primary smooth-transition">특산품</Link>
            <Link to="/auction" className="text-foreground hover:text-primary smooth-transition">경매</Link>
          </nav>

          {/* 액션 버튼들 */}
          <div className="flex items-center space-x-2">
            {/* 모바일 검색 버튼 */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* 사용자 버튼 */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="smooth-transition hover:bg-muted"
              onClick={handleUserClick}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* 장바구니 버튼 */}
            <Button variant="ghost" size="icon" className="relative smooth-transition hover:bg-muted">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* 모바일 메뉴 버튼 */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              {/* 모바일 검색바 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="농산물을 검색해보세요..." 
                  className="pl-10 smooth-transition focus:ring-primary"
                />
              </div>
              
              {/* 모바일 네비게이션 */}
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-foreground hover:text-primary smooth-transition py-2">홈</Link>
                <Link to="/category/vegetables" className="text-foreground hover:text-primary smooth-transition py-2">채소</Link>
                <Link to="/category/fruits" className="text-foreground hover:text-primary smooth-transition py-2">과일</Link>
                <Link to="/category/grains" className="text-foreground hover:text-primary smooth-transition py-2">곡물</Link>
                <Link to="/category/special" className="text-foreground hover:text-primary smooth-transition py-2">특산품</Link>
                <Link to="/auction" className="text-foreground hover:text-primary smooth-transition py-2">경매</Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;