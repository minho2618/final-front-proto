import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
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

import tomatoesImage from "@/assets/tomatoes.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: 1,
    name: "경북 안동 유기농 토마토 1kg",
    images: [tomatoesImage, tomatoesImage, tomatoesImage],
    price: 8500,
    originalPrice: 10000,
    discount: 15,
    rating: 4.8,
    reviewCount: 234,
    farmer: {
      name: "김농부",
      farm: "안동 햇살농장",
      location: "경북 안동시",
      experience: "15년차",
      rating: 4.9
    },
    description: "경북 안동의 청정한 자연환경에서 자란 100% 유기농 토마토입니다. 농약을 사용하지 않고 유기농 비료만을 사용하여 재배한 건강한 토마토로, 당도가 높고 과육이 단단합니다.",
    features: ["유기농 인증", "당일 수확", "무농약", "GAP 인증"],
    nutrition: "비타민C, 리코펜이 풍부하여 항산화 효과가 뛰어나며, 면역력 증진에 도움을 줍니다.",
    storage: "냉장보관 시 7~10일 보관 가능",
    origin: "국산 (경북 안동)",
    weight: "1kg (약 8~10개)",
    harvest: "2024년 3월 수확"
  };

  const reviews = [
    {
      id: 1,
      user: "김**",
      rating: 5,
      date: "2024.03.15",
      content: "정말 달고 맛있어요! 토마토 특유의 신맛도 적당하고 아이들도 잘 먹네요.",
      helpful: 12
    },
    {
      id: 2,
      user: "이**",
      rating: 4,
      date: "2024.03.12",
      content: "포장도 깔끔하고 배송도 빨랐습니다. 크기가 생각보다 큰 편이에요.",
      helpful: 8
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">홈</Link>
          <span>/</span>
          <Link to="/category/vegetable" className="hover:text-primary">채소</Link>
          <span>/</span>
          <span className="text-foreground">토마토</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
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
                        i < Math.floor(product.rating) 
                          ? 'text-accent fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount}개 리뷰)
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {product.discount && (
                  <Badge className="bg-accent text-accent-foreground">
                    {product.discount}% 할인
                  </Badge>
                )}
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()}원
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString()}원
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
                    <h3 className="font-semibold">{product.farmer.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.farmer.farm}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{product.farmer.location}</span>
                      <span>•</span>
                      <span>{product.farmer.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="font-medium">{product.farmer.rating}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    농장 보기
                  </Button>
                </div>
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
                <Button className="flex-1 bg-gradient-fresh hover:shadow-fresh h-12">
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
              <TabsTrigger value="reviews">리뷰 ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="qna">문의하기</TabsTrigger>
              <TabsTrigger value="delivery">배송/교환</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">상품 설명</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">상품 특징</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-sm">원산지: </span>
                      <span className="text-sm text-muted-foreground">{product.origin}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sm">중량: </span>
                      <span className="text-sm text-muted-foreground">{product.weight}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sm">수확일: </span>
                      <span className="text-sm text-muted-foreground">{product.harvest}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sm">보관방법: </span>
                      <span className="text-sm text-muted-foreground">{product.storage}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{review.user}</span>
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
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.content}</p>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    도움됨 {review.helpful}
                  </Button>
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