import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import noImage from "@/assets/no-image.png";

// ✅ imageId를 선택적으로 받으면 /stream/{imageId} 사용, 없으면 /proxy?src= 사용
interface ProductCardProps {
  productId: number; // ⭐️ string -> number로 수정
  name: string;
  price: number;
  originalPrice?: number;
  image: string;           // DB에서 내려온 원본 URL (GCS https://... 또는 기타 경로)
  imageId?: number | string; // 선택: 백엔드가 stream/{imageId} 제공할 때 사용
  rating?: number;
  reviewCount?: number;
  farm?: string;
  isOrganic?: boolean;
  discount?: number;
}

// .env에 API 베이스가 있으면 사용(없으면 상대경로)
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

// ✅ 항상 서버 프록시 경로로 변환
function toServerImageSrc(opts: { imageId?: number | string; raw?: string }) {
  const base = API_BASE ? `${API_BASE}` : "";
  if (opts.imageId !== undefined && opts.imageId !== null && `${opts.imageId}`.trim() !== "") {
    return `${base}/api/products/images/stream/${opts.imageId}`;
  }
  if (opts.raw && opts.raw.trim().length > 0) {
    return `${base}/api/products/images/proxy?src=${encodeURIComponent(opts.raw.trim())}`;
  }
  return "";
}

const ProductCard = ({
  productId,
  name,
  price,
  originalPrice,
  image,
  imageId,          // ✅ 추가된 props
  rating = 0,
  reviewCount = 0,
  farm = "정보 없음",
  isOrganic = false,
  discount,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(""); // 실제 표시 URL(항상 서버 경유)
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // ✅ 최초/변경 시 서버 프록시 URL로 고정
    setImgSrc(toServerImageSrc({ imageId, raw: image }));
  }, [image, imageId]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // ✅ 프록시 실패 시 기본 이미지로 폴백
    if (e.currentTarget.src !== noImage) {
      e.currentTarget.src = noImage;
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  // ⭐️ 비동기 함수로 수정하고 await 처리
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await addItem({
        productId, // number 타입 ID
        name,
        price,
        originalPrice,
        image,
        farm,
      });
      
      // 성공 시 토스트 메시지
      toast({
        title: "장바구니에 추가되었습니다",
        description: `${name}이(가) 장바구니에 담겼습니다.`,
      });
    } catch (error) {
      // 실패 시 에러 토스트 메시지
      toast({
        title: "장바구니 추가 실패",
        description: "서버 오류로 상품을 장바구니에 담지 못했습니다. 로그인 상태를 확인해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className={`group cursor-pointer smooth-transition border-border hover:shadow-lg ${isHovered ? "product-card-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        {/* 상품 이미지 */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imgSrc || noImage}      // ✅ 항상 서버 프록시 경로 사용
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />

          {/* 할인 배지 */}
          {discount && discount > 0 && (
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
            className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white smooth-transition ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          {/* 호버 시 장바구니 버튼 */}
          <div
            className={`absolute bottom-2 right-2 smooth-transition ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <Button
              size="icon"
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4 space-y-3">
          {farm && <p className="text-sm text-muted-foreground">{farm}</p>}

          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary smooth-transition">
            {name}
          </h3>

          {rating > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">
                  {price.toLocaleString()}원
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {originalPrice.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>

            <Button
              size="sm"
              className="hidden md:flex smooth-transition bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={handleAddToCart}
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
