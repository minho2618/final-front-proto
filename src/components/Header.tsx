import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/Logo.png";
import { jwtDecode } from "jwt-decode";

// --- JWT payload 타입 & 파서 ---
type Claims = {
  role?: string; // "AUTHENTICATED" or "UNAUTHENTICATED"
  exp?: number;  // 만료(초 단위)
};

function readRoleFromToken(): string | null {
  const bearer = localStorage.getItem("Authorization");
  if (!bearer) return null;
  const token = bearer.replace(/^Bearer\s+/i, "");
  try {
    const c = jwtDecode<Claims>(token);
    if (c.exp && c.exp * 1000 < Date.now()) return null; // 만료됨
    return c.role ?? null;
  } catch {
    return null;
  }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  // 로그인/권한 상태 초기화 & 스토리지 동기화
  useEffect(() => {
    const update = () => {
      const hasToken = !!localStorage.getItem("Authorization");
      setIsLoggedIn(hasToken);
      setIsSeller(readRoleFromToken() === "ROLE_SELLER");
    };
    update();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "Authorization") update();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleUserClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

const handleCartClick = () => {
  if (!isLoggedIn) {
    navigate("/login", { state: { from: "/cart" } });
  } else {
    navigate("/cart");
  }
};



  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    setIsLoggedIn(false);
    setIsSeller(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="산지직송 로고" className="h-10 w-auto" loading="eager" />
          </Link>

          {/* 검색바 - 데스크톱 */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="농산물을 검색해보세요..."
                className="pl-10 smooth-transition focus:ring-primary"
              />
            </div>
          </div>

          {/* 네비게이션 - 데스크톱 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary smooth-transition">홈</Link>
            <Link to="/category/VEGETABLE" className="text-foreground hover:text-primary smooth-transition">채소</Link>
            <Link to="/category/FRUIT" className="text-foreground hover:text-primary smooth-transition">과일</Link>
            <Link to="/category/GRAIN" className="text-foreground hover:text-primary smooth-transition">곡물</Link>
            {/* <Link to="/category/special" className="text-foreground hover:text-primary smooth-transition">특산품</Link> */}
            <Link to="/auction" className="text-foreground hover:text-primary smooth-transition">경매</Link>
            <Link to="/products" className="text-foreground hover:text-primary smooth-transition">전체 상품</Link>
            <Link to="/what-to-eat" className="text-foreground hover:text-primary smooth-transition">오늘 뭐 먹지?</Link>

            {/* isSeller 일 때만 보이게 */}
            {isLoggedIn && isSeller && (
              <Link to="/seller/dashboard" className="text-foreground hover:text-primary smooth-transition">
                상품 등록
              </Link>
            )}
          </nav>

          {/* 액션 버튼들 */}
          <div className="flex items-center space-x-2">
            {/* 모바일 검색 버튼 */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* 로그인/로그아웃 */}
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="smooth-transition hover:bg-muted"
                  onClick={handleUserClick}
                >
                  <User className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="smooth-transition hover:bg-muted"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="smooth-transition"
                onClick={() => navigate("/login")}
              >
                로그인
              </Button>
            )}

            {/* 장바구니 */}
            {isLoggedIn && ( 
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative smooth-transition hover:bg-muted"  
              onClick={handleCartClick}
              aria-label="장바구니로 이동"
            >
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
            )}
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="농산물을 검색해보세요..."
                  className="pl-10 smooth-transition focus:ring-primary"
                />
              </div>
              {/* 모바일 네비 */}
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-foreground hover:text-primary smooth-transition py-2">홈</Link>
                <Link to="/category/vegetables" className="text-foreground hover:text-primary smooth-transition py-2">채소</Link>
                <Link to="/category/fruits" className="text-foreground hover:text-primary smooth-transition py-2">과일</Link>
                <Link to="/category/grains" className="text-foreground hover:text-primary smooth-transition py-2">곡물</Link>
                <Link to="/auction" className="text-foreground hover:text-primary smooth-transition py-2">경매</Link>
                <Link to="/products" className="text-foreground hover:text-primary smooth-transition py-2">전체 상품</Link>

                {/* ✅ 모바일에서도 조건부로 */}
                {isLoggedIn && isSeller && (
                  <Link to="/seller/dashboard" className="text-foreground hover:text-primary smooth-transition py-2">
                    상품 등록
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
