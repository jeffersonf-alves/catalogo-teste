// src/styles/GlobalStyles.ts
"use client";
import { createGlobalStyle } from "styled-components";
import { Theme } from "@/lib/theme";

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.bg};
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    line-height: 1.6;
    overscroll-behavior: none;
  }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; font-family: inherit; border: none; background: none; }
  img { max-width: 100%; display: block; }
`;
