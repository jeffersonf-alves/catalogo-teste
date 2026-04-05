// src/components/cart/CartFab.tsx
"use client";
import styled, { keyframes } from "styled-components";
import { useCartContext } from "@/lib/CartContext";

const pop = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.18); }
  100% { transform: scale(1); }
`;

const Fab = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 1.5rem; right: 1.25rem;
  z-index: 100;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center; gap: 9px;
  padding: 11px 18px 11px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff;
  font-size: 13px; font-weight: 500;
  box-shadow: 0 4px 18px rgba(131,58,180,.38);
  transition: opacity .2s, transform .15s;
  animation: ${pop} .25s ease;
  &:hover { opacity: .9; transform: translateY(-1px); }
  &:active { transform: scale(.96); }
`;

const CartIcon = styled.svg`display: block; flex-shrink: 0;`;

const BadgeWrap = styled.div`
  background: #fff;
  color: #e1306c;
  border-radius: 50%;
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  flex-shrink: 0;
`;

interface Props { onOpen: () => void; }

export default function CartFab({ onOpen }: Props) {
  const { totalItems } = useCartContext();

  return (
    <Fab $visible={totalItems > 0} onClick={onOpen} aria-label="Ver carrinho">
      <CartIcon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
      </CartIcon>
      Ver carrinho
      <BadgeWrap>{totalItems}</BadgeWrap>
    </Fab>
  );
}
