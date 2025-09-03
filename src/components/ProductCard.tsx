import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  farm: string;
  isOrganic?: boolean;
  discount?: number;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviewCount, 
  farm, 
  isOrganic = false,
  discount 
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card 
      className={`group cursor-pointer smooth-transition border-border hover:shadow-lg ${
        isHovered ? 'product-card-hover' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        {/* 상품 이미지 */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover smooth-transition group-hover:scale-105"
          />
          
          {/* 할인 배지 */}
          {discount && (
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
              {discount}% 할인
            </Badge>
          )}

          {/* 유기농 배지 */}
          {isOrganic && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              유기농
            </Badge>
          )}

          {/* 좋아요 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-12 w-8 h-8 rounded-full bg-white/80 hover:bg-white smooth-transition ${
              isLiked ? 'text-red-500' : 'text-muted-foreground'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          {/* 호버 시 장바구니 버튼 */}
          <div className={`absolute bottom-2 right-2 smooth-transition ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button 
              size="icon"
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                // 장바구니 추가 로직
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4 space-y-3">
          {/* 농장명 */}
          <p className="text-sm text-muted-foreground">{farm}</p>

          {/* 상품명 */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary smooth-transition">
            {name}
          </h3>

          {/* 평점 */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating} ({reviewCount})
            </span>
          </div>

          {/* 가격 */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">
                  {price.toLocaleString()}원
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {originalPrice.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
            
            {/* 데스크톱 장바구니 버튼 */}
            <Button 
              size="sm"
              className="hidden md:flex smooth-transition bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation();
                // 장바구니 추가 로직
              }}
            >
              담기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;