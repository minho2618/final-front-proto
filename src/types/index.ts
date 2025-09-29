export interface Product {
  id: string;
  title: string;
  category: "veggies" | "fruits" | "grains" | "mushrooms" | "beans" | "nuts";
  price: number;
  unit: string;
  stock: number;
  image: string;
  tags: string[];
  description?: string;
}

export interface Recipe {
  id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  timeMinutes: number;
  difficulty: "쉬움" | "보통" | "어려움";
  ingredients: {
    name: string;
    qty?: string;
    productId?: string;
  }[];
  steps: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  recipes?: Recipe[];
  products?: Product[];
}