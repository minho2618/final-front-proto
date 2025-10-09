import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '@/api/axios'; // ⭐️ 토큰 인터셉터가 설정된 api 인스턴스 임포트
import { createOrder } from '@/lib/api';

export interface CartItem {
productId: number;
name: string;
price: number;
originalPrice?: number;
image: string;
farm: string;
quantity: number;
}

interface CartState {
items: CartItem[];
total: number;
itemCount: number;
}

type CartAction =
| { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
| { type: 'REMOVE_ITEM'; payload: number }
| { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
| { type: 'CLEAR_CART' }
| { type: 'LOAD_CART'; payload: CartItem[] };


// 1. calculateCartTotals 함수 정의
const calculateCartTotals = (items: CartItem[] | undefined | null): { total: number; itemCount: number } => {
 if (!Array.isArray(items)) {
  return { total: 0, itemCount: 0 };
 }
 const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
 const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
 return { total, itemCount };
};


const CartContext = createContext<{
state: CartState;
dispatch: React.Dispatch<CartAction>;
addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>; 
removeItem: (id: number) => void; 
updateQuantity: (id: number, quantity: number) => void;
clearCart: () => Promise<void>;
checkout: (memberId: number, address: string) => Promise<any>;
setCartItems: (itemsFromServer: CartItem[]) => void;
} | null>(null);


// 2. Reducer 함수 정의
const cartReducer = (state: CartState, action: CartAction): CartState => {
switch (action.type) {
 case 'ADD_ITEM': {
 const existingItem = state.items.find(item => item.productId === action.payload.productId);
 let updatedItems: CartItem[];
 
 if (existingItem) {
  updatedItems = state.items.map(item =>
  item.productId === action.payload.productId
   ? { ...item, quantity: item.quantity + 1 }
   : item
  );
 	} else {
 	  const newItem = { ...action.payload, quantity: 1 };
 	  updatedItems = [...state.items, newItem];
 	}
 	
 	return { items: updatedItems, ...calculateCartTotals(updatedItems) };
 }
 
 case 'REMOVE_ITEM': {
 	const updatedItems = state.items.filter(item => item.productId !== action.payload);
 	return { items: updatedItems, ...calculateCartTotals(updatedItems) };
 }
 
 case 'UPDATE_QUANTITY': {
 	if (action.payload.quantity <= 0) {
 	  return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
 	}
 	
 	const updatedItems = state.items.map(item =>
 	  item.productId === action.payload.id
 	 ? { ...item, quantity: action.payload.quantity }
 	 : item
 	);
 	
 	return { items: updatedItems, ...calculateCartTotals(updatedItems) };
 }
 
 case 'CLEAR_CART':
 	return { items: [], total: 0, itemCount: 0 };
 
 case 'LOAD_CART': {
 	const itemsToLoad = Array.isArray(action.payload) ? action.payload : [];
 	return { 
 	  items: itemsToLoad, 
 	  ...calculateCartTotals(itemsToLoad) 
 	};
 }
 
 default:
 	return state;
}
};


// 3. 초기화 함수 정의
const initializeCartState = (initialState: CartState): CartState => {
 try {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
 	  const cartData = JSON.parse(savedCart);
 	  if (Array.isArray(cartData)) {
 	    return { items: cartData, ...calculateCartTotals(cartData) };
 	  }
 	}
 } catch (error) {
  console.error("Error loading cart from localStorage:", error);
 }
 return initialState;
};


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

const initialState: CartState = {
 items: [],
 total: 0,
 itemCount: 0,
};
 
const [state, dispatch] = useReducer(cartReducer, initialState, initializeCartState);

// localStorage 동기화는 state.items 변경 시에만 실행
useEffect(() => {
 localStorage.setItem('cart', JSON.stringify(state.items));
}, [state.items]);

// ⭐️ ADD_ITEM 함수 (Redis 동기화)
const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    // 상품 ID와 수량을 포함한 데이터를 JSON 본문으로 구성
    const cartRequest = {
        productId: item.productId,
        quantity: 1,
        name: item.name, 
        price: item.price, 
        farm: item.farm, 
        image: item.image, 
    };

    dispatch({ type: 'ADD_ITEM', payload: item }); 

    try {
        await api.post(
            '/carts',
            cartRequest,
        );
        // 성공 시 로직
    } catch (error) {
        console.error('장바구니 담기(Redis) 실패:', error);
        throw error; 
    }
};

// ⭐️ const 추가! (축약 속성 오류 해결)
const removeItem = (id: number) => { 
  dispatch({ type: 'REMOVE_ITEM', payload: id });
 };

// ⭐️ const 추가! (축약 속성 오류 해결)
const updateQuantity = (id: number, quantity: number) => { 
  dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
 };

// ⭐️ clearCart 함수
const clearCart = async () => {
 try {
 	await api.delete('/carts');
 	dispatch({ type: 'CLEAR_CART' });
 } catch (error) {
 	console.error('장바구니 비우기(Redis) 실패:', error);
 	throw error; 
 }
};

// ⭐️ const 추가!
const setCartItems = (itemsFromServer: CartItem[]) => {
 dispatch({ type: 'LOAD_CART', payload: itemsFromServer });
};


// ⭐️ const 추가!
const checkout = async (memberId: number, address: string) => {
 const orderItemList = state.items.map(item => ({
 	productId: item.productId, 
 	quantity: item.quantity,
 	unitPrice: item.price,
 	discountValue: item.originalPrice ? item.originalPrice - item.price : 0,
 	totalPrice: item.price * item.quantity,
 }));

 const orderData = {
 	memberId,
 	address,
 	status: 'PENDING',
 	orderItemList,
 };

 try {
 	const response = await createOrder(orderData);
 	dispatch({ type: 'CLEAR_CART' });
 	return response;
 } catch (error) {
 	console.error('Checkout failed:', error);
 	throw error;
 }
};

return (
 <CartContext.Provider value={{
 	state,
 	dispatch,
 	addItem,
 	removeItem,
 	updateQuantity,
 	clearCart,
 	checkout,
 	setCartItems,
 }}>
 	{children}
 </CartContext.Provider>
);
};

export const useCart = () => {
const context = useContext(CartContext);
if (!context) {
 throw new Error('useCart must be used within a CartProvider');
}
return context;
};