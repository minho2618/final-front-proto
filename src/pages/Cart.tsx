import React, { useState, useRef, useEffect, useCallback } from "react"; 
// import axios from 'axios'; // ❌ 기존 axios 대신
import api from "@/api/axios"; // ⭐️ 토큰 설정이 적용된 api 인스턴스 임포트
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk'; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
 Minus, Plus, Trash2, ShoppingCart,
 CreditCard, Truck, ArrowLeft, Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import Header from "@/components/Header";
// ⭐️ useCart 훅에서 필요한 모든 함수를 가져옵니다.
import { useCart } from "@/contexts/CartContext"; 
import { useToast } from "@/hooks/use-toast";

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; 

// 💡 JWT 토큰의 존재 여부로 로그인 상태를 판단하는 함수
const checkLoginStatus = () => {
     return !!localStorage.getItem('Authorization');
};

const Cart = () => {
  // ⭐️ setCartItems 함수를 useCart에서 가져옵니다.
  const { state, removeItem, updateQuantity, setCartItems } = useCart(); 
  const { items: cartItems } = state;
  const navigate = useNavigate();
  
  // ⭐️ 로그인 정보는 필요 시점에 localStorage에서 직접 가져옵니다.
  const isLoggedIn = checkLoginStatus(); 
  const memberIdForPayment = localStorage.getItem('memberId'); 
  const nameForPayment = localStorage.getItem('name');
  const usernameForPayment = localStorage.getItem('username');
  const addressForPayment = localStorage.getItem('address') || "";
  
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false); // 결제 버튼 로딩
  const [isLoadingCart, setIsLoadingCart] = useState(true); // 장바구니 데이터 로딩
  const { toast } = useToast();
  
  const paymentWidgetRef = useRef(null); 

  // 2. 장바구니 데이터 로드 로직 (API 호출 수정)
 const loadCartItemsFromRedis = useCallback(async () => {
    // ⭐️ 이 로그인은 프론트엔드 상태 체크일 뿐이므로 제거합니다.
    // if (!isLoggedIn) {
    //   setIsLoadingCart(false);
    //   return; 
    // }
    
    setIsLoadingCart(true);
    try {
      // ⭐️ 토큰이 있어도 서버에서 만료/무효 토큰이면 401/403 에러 발생!
      const response = await api.get('/carts'); 

      setCartItems(response.data);

    } catch (error) {
      console.error("Redis 장바구니 데이터 로드 실패:", error);
      
      // ⭐️ 서버가 401 Unauthorized를 응답할 경우에만 리다이렉트
      if (error.response && error.response.status === 401) {
        toast({
          title: "세션 만료",
          description: "인증 정보가 만료되었습니다. 다시 로그인해주세요.",
          variant: "destructive",
        });
        navigate('/login'); // 401 에러 시 리다이렉트
        return; // 리다이렉트 후 함수 종료
      }
      
      toast({
        title: "장바구니 로드 실패",
        description: "서버에서 최신 장바구니 정보를 불러오지 못했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCart(false);
    }
}, [toast, setCartItems, navigate]);

  useEffect(() => {
    // ⭐️ 단순히 컴포넌트 마운트 시 장바구니 로드 시도
    // 서버가 알아서 인증 여부를 판단하고 401을 줄 것입니다.
    loadCartItemsFromRedis();
}, []); 
  // ----------------------------------------------------

  // 3. 계산 로직
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 30000 ? 0 : 3000;
  const discount = 0;
  const total = subtotal + shipping - discount;

  // 4. 수량 변경 핸들러 (API 호출 수정)
  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    console.log(`[디버그] 수량 업데이트 시도. ID: ${productId}, 타입: ${typeof productId}`);
    
    // 이 시점에서는 productId는 2와 같은 유효한 숫자여야 합니다.
    console.log(`API 호출 시작: /carts/${productId}`); 
    if (newQuantity < 1) return;
    
    // 프론트엔드 상태 업데이트 (Context)
    updateQuantity(productId, newQuantity);

    try {
      // ⭐️ api.put('/carts/{productId}')로 수정
      await api.put(`/carts/${productId}?quantity=${newQuantity}`);
    } catch (error) {
      console.error("장바구니 수량 업데이트 실패:", error);
      toast({
        title: "업데이트 실패",
        description: "수량 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      // 에러 시 상태 롤백 또는 재로드 로직 추가 필요
    }
  };

  // 5. 상품 삭제 핸들러 (API 호출 수정)
  const handleRemoveItem = async (productId: number) => {
    // 프론트엔드 상태 업데이트 (Context)
    removeItem(productId);

    try {
      await api.delete(`/carts/${productId}`);
      toast({
        title: "삭제 완료",
        description: "장바구니에서 상품을 삭제했습니다.",
      });
    } catch (error) {
      console.error("장바구니 상품 삭제 실패:", error);
      toast({
        title: "삭제 실패",
        description: "상품 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      loadCartItemsFromRedis(); // 실패 시 상태 동기화를 위해 재로드
    }
  };

  // 6. 결제 핸들러 (API 호출 수정)
  const handleCheckout = async () => {
    if (!memberIdForPayment) {
      toast({title: "오류", description: "회원 정보가 유효하지 않아 결제를 진행할 수 없습니다.", variant: "destructive"});
      return;
    }
    
    setLoading(true);
    
    // ⭐️ 백엔드가 memberId를 JWT에서 추출하므로, 요청 본문에는 address만 포함
    const orderRequest = { address: addressForPayment }; 

    try {
      const finalCustomerKey = memberIdForPayment; // 토스 결제 위젯 초기화 시 memberId 사용

      // ⭐️ api.post('/carts/prepare-payment')로 수정
      const response = await api.post('/carts/prepare-payment', orderRequest);
      
      const { tossOrderId } = response.data; 

      const paymentWidget = await loadPaymentWidget(clientKey, finalCustomerKey);
      paymentWidgetRef.current = paymentWidget;

      await paymentWidget.requestPayment({
        orderId: tossOrderId,
        orderName: "KOSA 쇼핑몰 상품 외",
        customerName: nameForPayment || "인증된 사용자", 
        customerEmail: usernameForPayment || "user@kosa.com", 
        successUrl: window.location.origin + '/api/carts/success', // ⭐️ 컨트롤러에 맞게 경로 수정
        failUrl: window.location.origin + '/cart?status=fail',
      });

    } catch (error) {
     console.error("결제 준비 또는 요청 실패:", error);
     toast({
        title: "결제 오류",
        description: "결제 요청 중 문제가 발생했습니다. 다시 시도해 주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 7. 로딩 및 로그인 상태 UI
  if (isLoadingCart && isLoggedIn) { 
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <p className="text-lg font-medium text-muted-foreground">장바구니 정보 불러오는 중...</p>
      </div>
    );
  }
  
  // 8. 장바구니가 비어 있는 경우의 UI
  if (cartItems.length === 0 && isLoggedIn && !isLoadingCart) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <ShoppingCart className="w-7 h-7 mr-3" />
            장바구니
          </h1>
          <Card className="flex flex-col items-center justify-center p-12 space-y-4">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">장바구니가 비어 있습니다.</h2>
            <p className="text-muted-foreground">원하는 상품을 담아보세요!</p>
            <Link to="/">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                쇼핑 계속하기
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  // 9. 전체 UI 렌더링
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="w-7 h-7 mr-3" />
          장바구니 ({cartItems.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.productId} className="flex p-4">
                <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                  <img 
                    src={item.image || "placeholder.jpg"} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <Link to={`/products/${item.productId}`}>
                      <h2 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h2>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.farm}
                  </p>
                  <p className="text-xl font-bold mb-2">
                    {(item.price || 0).toLocaleString()} 원
                  </p>
                  
                  <div className="flex items-center space-x-2 w-32">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      readOnly 
                      className="text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 결제 요약 */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-xl font-bold">
                주문 요약
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">상품 금액</span>
                  <span>{subtotal.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center">
                    배송비 <Truck className="w-4 h-4 ml-1" />
                  </span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">무료</span>
                  ) : (
                    <span>{shipping.toLocaleString()} 원</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">할인 금액</span>
                  <span className="text-red-500">- {discount.toLocaleString()} 원</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>총 결제 금액</span>
                  <span className="text-primary">{total.toLocaleString()} 원</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-lg font-bold">
                쿠폰/포인트
              </CardHeader>
              <CardContent className="flex space-x-2">
                <Input 
                  placeholder="쿠폰 코드를 입력하세요"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button>적용</Button>
              </CardContent>
            </Card>

            <Button 
              className="w-full py-6 text-lg"
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="w-5 h-5 mr-2" />
              )}
              {total.toLocaleString()}원 결제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;