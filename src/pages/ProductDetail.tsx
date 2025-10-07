import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Share2, 
  MapPin, 
  Calendar,
  Leaf,
  Truck,
  Shield
} from "lucide-react";
import Header from "@/components/Header";
import { getProductById, getAllReviewsByProduct } from "@/lib/api";

import tomatoesImage from "@/assets/tomatoes.jpg"; // Placeholder

// Based on ProductRes
interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  discountValue: number;
  isActive: boolean;
  seller: {
    sellerName: string;
  };
  // Add other potential fields for robustness
  images?: { url: string }[];
  rating?: number;
  reviewCount?: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("상품 ID가 없습니다.");
        setLoading(false);
        return;
      }
      try {
        const productId = parseInt(id, 10);
        const data = await getProductById(productId);
        setProduct(data);
        const reviews = await getAllReviewsByProduct(productId);
        setReviews(reviews);
      } catch (err) {
        setError("상품 정보를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: String(product.productId),
        name: product.name,
        price: product.price,
        image: tomatoesImage, // Placeholder
        farm: product.seller.sellerName
      });
    }
    toast({
      title: "장바구니에 추가되었습니다",
      description: `${product.name} ${quantity}개가 장바구니에 담겼습니다.`,
    });
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p>상품 정보를 불러오는 중...</p></div>;
  }

  if (error || !product) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-red-500">{error || "상품을 찾을 수 없습니다."}</p></div>;
  }

  const productImages = product.images?.length ? product.images.map(img => img.url) : [tomatoesImage, tomatoesImage, tomatoesImage];
  const rating = /*product.rating*/ reviews.length === 0 ? 0 : reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length || 4.5; // Placeholder
  const reviewCount = product.reviewCount || reviews.length; // Placeholder
  const discount = product.discountValue > 0 ? Math.round((product.discountValue / (product.price + product.discountValue)) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">홈</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-primary/10 text-primary">유기농</Badge>
                <Badge className="bg-accent/10 text-accent">당일배송</Badge>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(rating) 
                          ? 'text-accent fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">{rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviewCount}개 리뷰)
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {discount > 0 && (
                  <Badge className="bg-accent text-accent-foreground">
                    {discount}% 할인
                  </Badge>
                )}
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()}원
                </span>
                {product.discountValue > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    {(product.price + product.discountValue).toLocaleString()}원
                  </span>
                )}
              </div>
            </div>

            {/* Farmer Info */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-fresh rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    {/* <h3 className="font-semibold">{product.seller.sellerName}</h3> */}
                    <p className="text-sm text-muted-foreground">농장 정보</p> 
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  농장 보기
                </Button>
              </div>
            </Card>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">수량:</span>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-fresh hover:shadow-fresh h-12"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  장바구니 담기
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Button variant="outline" className="w-full h-12">
                바로 주문하기
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="space-y-2">
                <Truck className="w-8 h-8 mx-auto text-primary" />
                <div className="text-sm">
                  <div className="font-medium">당일배송</div>
                  <div className="text-muted-foreground">12시 이전 주문시</div>
                </div>
              </div>
              <div className="space-y-2">
                <Shield className="w-8 h-8 mx-auto text-primary" />
                <div className="text-sm">
                  <div className="font-medium">품질보증</div>
                  <div className="text-muted-foreground">신선도 100% 보장</div>
                </div>
              </div>
              <div className="space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-primary" />
                <div className="text-sm">
                  <div className="font-medium">당일수확</div>
                  <div className="text-muted-foreground">주문 당일 수확</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">상품정보</TabsTrigger>
              <TabsTrigger value="reviews">리뷰 ({reviewCount})</TabsTrigger>
              <TabsTrigger value="qna">문의하기</TabsTrigger>
              <TabsTrigger value="delivery">배송/교환</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">상품 설명</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{review.memberName}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating 
                                ? 'text-accent fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.createdAt}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.content}</p>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="qna">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">상품 문의</h3>
                <p className="text-muted-foreground mb-4">
                  상품에 대한 문의사항이 있으시면 언제든 연락해 주세요.
                </p>
                <Button className="bg-gradient-fresh">
                  농가에 문의하기
                </Button>
              </Card>
            </TabsContent>
            
            <TabsContent value="delivery">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">배송 정보</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium">배송비: </span>
                    <span>3만원 이상 주문시 무료배송</span>
                  </div>
                  <div>
                    <span className="font-medium">배송기간: </span>
                    <span>주문 후 1~2일 (당일배송 가능)</span>
                  </div>
                  <div>
                    <span className="font-medium">교환/반품: </span>
                    <span>신선식품 특성상 단순변심 교환/반품 불가</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;