import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-lg">
            <div className="w-8 h-8 bg-gradient-fresh rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-primary">신선마켓</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                className="pl-10 bg-muted/50" 
                placeholder="신선한 농산물을 찾아보세요..." 
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              홈
            </Link>
            <Link 
              to="/categories" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive('/categories') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              카테고리
            </Link>
            <Link 
              to="/farmers" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive('/farmers') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              농가소개
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="w-5 h-5" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-accent flex items-center justify-center">
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                로그인
              </Button>
            </Link>

            <Link to="/seller-dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                판매자센터
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input className="pl-10 bg-muted/50" placeholder="농산물 검색..." />
            </div>
            
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
              <Link 
                to="/categories" 
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                카테고리
              </Link>
              <Link 
                to="/farmers" 
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                농가소개
              </Link>
              <Link 
                to="/login" 
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
              <Link 
                to="/seller-dashboard" 
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                판매자센터
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};