// src/api/axios.ts  (또는 .js)
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
    // const token = localStorage.getItem("Authorization");
    // if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
export type {Product};