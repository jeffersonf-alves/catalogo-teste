// src/lib/types.ts

export type StockStatus = "instock" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  emoji: string;
  bg: string;
  category: string;
  tag?: string;        // "Recomendado" | "Novidade" | "Edição Limitada"
  status: StockStatus;
  featured?: boolean;
}

export interface Store {
  slug: string;
  name: string;
  location: string;
  whatsapp: string;   // número com DDI: "5511999999999"
  open: string;       // "Sempre aberto" | "Aberto até às 23h59"
  coverEmojis: string;
  logoEmoji: string;
  categories: string[];
  products: Product[];
}

export interface CartItem {
  product: Product;
  qty: number;
}
