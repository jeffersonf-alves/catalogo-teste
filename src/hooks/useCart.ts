// src/hooks/useCart.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/lib/types";

const KEY = "mcat_cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  const update = (next: CartItem[]) => {
    setItems(next);
    save(next);
  };

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const next = existing
        ? prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { product, qty: 1 }];
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.product.id !== productId);
      save(next);
      return next;
    });
  }, []);

  const changeQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { remove(productId); return; }
    setItems((prev) => {
      const next = prev.map((i) => i.product.id === productId ? { ...i, qty } : i);
      save(next);
      return next;
    });
  }, [remove]);

  const clear = useCallback(() => update([]), []);

  const totalItems = items.reduce((a, i) => a + i.qty, 0);
  const totalPrice = items.reduce((a, i) => a + i.product.price * i.qty, 0);

  const buildWhatsAppMessage = (storeName: string, whatsapp: string) => {
    if (!items.length) return "";
    const lines = items
      .map((i) => `• ${i.qty}x ${i.product.name} — R$ ${(i.product.price * i.qty).toFixed(2).replace(".", ",")}`)
      .join("%0A");
    const total = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    const msg = `Olá ${storeName}! Gostaria de fazer um pedido:%0A%0A${lines}%0A%0A*Total: ${total}*%0A%0AObrigado!`;
    return `https://wa.me/${whatsapp}?text=${msg}`;
  };

  return { items, add, remove, changeQty, clear, totalItems, totalPrice, buildWhatsAppMessage };
}
