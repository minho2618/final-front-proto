import axios from "axios";

// CORS 전역 처리하고 프록시 안 쓴다고 했으니 절대주소로 권장
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api";

interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  category: string;
  discountValue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  seller: {
    memberId: number;
    sellerName: string;
    sellerIntro: string;
  };
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use(
    (config) => {
        // 1. 토큰 가져오기 (키가 Authorization으로 확실하니 이대로 진행)
        const token = localStorage.getItem("Authorization"); 
        
        // ⭐️ 디버그 로그: 토큰을 읽었는지 여부와 값 확인
        console.log("DEBUG: Interceptor 실행됨. LocalStorage Token:", token); 

        if (token) {
            // Spring Security를 위해 Bearer 접두사를 보장하는 로직
            const bearerToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
            
            // 헤더에 할당
            config.headers.Authorization = bearerToken;
            
            // ⭐️ 디버그 로그: 헤더에 최종적으로 어떤 값이 설정되었는지 확인
            console.log("DEBUG: Assigned Auth Header Value:", config.headers.Authorization);
        } else {
            console.log("DEBUG: No token found. Skipping Authorization header assignment.");
        }

        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
export type {Product};