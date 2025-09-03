import { Heart, Star, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  farmer: string;
  location: string;
  isOrganic?: boolean;
  discount?: number;
}

export const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  farmer,
  location,
  isOrganic,
  discount
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              {discount}% 할인
            </Badge>
          )}
          {isOrganic && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              유기농
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div>
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{farmer} • {location}</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-accent fill-current" />
            <span className="text-xs font-medium ml-1">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-primary">{price.toLocaleString()}원</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="px-3 py-1 h-8 bg-gradient-fresh hover:shadow-fresh transition-all"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            담기
          </Button>
        </div>
      </div>
    </Card>
  );
};