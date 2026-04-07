"use client";
// src/lib/ThemeProvider.tsx
import { ThemeProvider as SC } from "styled-components";
import { theme } from "./theme";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { CartProvider } from "./CartContext";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SC theme={theme}>
      <GlobalStyles />
      <CartProvider>{children}</CartProvider>
    </SC>
  );
}
