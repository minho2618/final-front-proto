import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingCart,
  CreditCard,
  Truck,
  Check,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { state, removeItem, updateQuantity, checkout } = useCart();
  const { items: cartItems } = state;
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 30000 ? 0 : 3000;
  const discount = 0; // Coupon discount logic to be implemented
  const total = subtotal + shipping - discount;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Hardcoded memberId and address for now
      const memberId = 1;
      const address = "Default Shipping Address";
      await checkout(memberId, address);
      toast({
        title: "주문 완료",
        description: "주문이 성공적으로 접수되었습니다.",
      });
    } catch (error) {
      toast({
        title: "주문 실패",
        description: "주문 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-8 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">장바구니가 비어 있습니다</h2>
              <p className="text-muted-foreground">신선한 농산물을 장바구니에 담아보세요!</p>
            </div>
            <Link to="/">
              <Button className="bg-gradient-fresh">
                쇼핑 계속하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              계속 쇼핑하기
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">장바구니</h1>
          <Badge variant="secondary">{cartItems.length}개 상품</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">주문 상품 ({cartItems.length}개)</h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex space-x-4">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-medium hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.farm}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-primary">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex items-center border rounded-lg">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 h-8"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 h-8"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="text-sm font-medium">
                          {(item.price * item.quantity).toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Coupon Section */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">할인 쿠폰</h3>
              <div className="flex space-x-3">
                <Input 
                  placeholder="쿠폰 코드를 입력하세요"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">적용</Button>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">배송 정보</h3>
                  <p className="text-sm text-muted-foreground">당일~익일 배송</p>
                </div>
              </div>
              
              {shipping === 0 ? (
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">무료배송 적용!</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {(30000 - subtotal).toLocaleString()}원 더 주문시 무료배송
                </div>
              )}
            </Card>

            {/* Order Summary */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">결제 정보</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>상품금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "무료" : `${shipping.toLocaleString()}원`}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>쿠폰 할인</span>
                    <span>-{discount.toLocaleString()}원</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제금액</span>
                  <span className="text-primary">{total.toLocaleString()}원</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-gradient-fresh shadow-fresh h-12"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "주문 처리 중..." : <><CreditCard className="w-5 h-5 mr-2" />{total.toLocaleString()}원 결제하기</>}
                </Button>
                
                <Button variant="outline" className="w-full h-10">
                  선물하기
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;