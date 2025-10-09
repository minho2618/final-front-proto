import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

// ⚠️ YOUR_CLIENT_KEY를 발급받은 실제 클라이언트 키로 변경하세요.
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; 

const selector = '#payment-widget';
const agreementSelector = '#agreement-widget';

function PaymentPage() {
    const paymentWidgetRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [tossOrderId, setTossOrderId] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    // 1. ✅ 백엔드와 통신하여 주문 정보를 준비하는 함수 (Axios 사용)
    const preparePayment = useCallback(async () => {
        setLoading(true);
        try {
            // 💡 실제로는 장바구니나 상품 ID 목록을 보냅니다. 여기서는 예시 데이터입니다.
            const orderDetails = { cartId: 'USER_CART_ID', memberId: 1 };
            
            // 1) 주문 준비 API 호출 (Java 백엔드의 /api/orders/prepare 엔드포인트)
            const response = await axios.post('/api/orders/prepare-payment', orderDetails);
            
            const { tossOrderId: serverOrderId, totalAmount: serverAmount, customerKey } = response.data;

            // 2) 상태 저장 및 위젯 초기화에 사용할 정보
            setTossOrderId(serverOrderId);
            setTotalAmount(serverAmount);
            
            // 3) 토스 결제 위젯 SDK 로드 및 초기화
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
            paymentWidgetRef.current = paymentWidget;

            // 4) 🖼️ 결제 수단 및 약관 위젯 렌더링 (화면에 결제 창을 띄우는 핵심)
            paymentWidget.renderPaymentMethods(selector, serverAmount);
            paymentWidget.renderAgreement(agreementSelector);

        } catch (error) {
            console.error('결제 준비 중 오류 발생:', error);
            alert('주문 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    }, []);


    // 2. 🚀 결제 요청 함수 (버튼 클릭 시 호출)
    const handlePayment = async () => {
        const paymentWidget = paymentWidgetRef.current;
        if (!paymentWidget) return;

        try {
            // requestPayment 호출 시 결제창이 팝업되거나 리다이렉트됩니다.
            await paymentWidget.requestPayment({
                orderId: tossOrderId, // 백엔드에서 받은 tossOrderId 사용
                orderName: 'KOSA 쇼핑몰 상품 외 ' + (totalAmount > 0 ? '1건' : ''),
                successUrl: window.location.origin + '/success', // 결제 성공 시 이동할 백엔드 주소
                failUrl: window.location.origin + '/fail',     // 결제 실패 시 이동할 백엔드 주소
            });
        } catch (error) {
            console.error('결제 요청 에러:', error);
        }
    };

    // 3. 🏁 컴포넌트 마운트 시 주문 준비 시작
    useEffect(() => {
        preparePayment();
    }, [preparePayment]);

    if (loading) {
        return <div>결제 정보를 준비 중입니다...</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>주문 상품 결제</h2>
            <p>최종 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong></p>
            
            {/* 👈 결제 수단 위젯이 그려질 영역 */}
            <div id="payment-widget" />
            
            {/* 👈 이용 약관 위젯이 그려질 영역 */}
            <div id="agreement-widget" />

            <button 
                onClick={handlePayment} 
                disabled={loading || totalAmount <= 0}
                style={{
                    width: '100%', 
                    padding: '15px', 
                    fontSize: '18px', 
                    backgroundColor: '#525FE1', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer'
                }}
            >
                {totalAmount.toLocaleString()}원 결제하기
            </button>
        </div>
    );
}

export default PaymentPage;