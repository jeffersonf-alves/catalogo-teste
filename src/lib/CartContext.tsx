"use client";
// src/lib/CartContext.tsx

import { createContext, useContext } from "react";
import { useCart } from "@/hooks/useCart";

type CartCtx = ReturnType<typeof useCart>;
const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  return <Ctx.Provider value={cart}>{children}</Ctx.Provider>;
}

export function useCartContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCartContext must be inside CartProvider");
  return ctx;
}
