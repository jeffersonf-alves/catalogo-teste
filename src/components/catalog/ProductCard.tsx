// src/components/catalog/ProductCard.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import QtyControl from "@/components/ui/QtyControl";
import { useCartContext } from "@/lib/CartContext";

const Item = styled.div`
  display: flex; gap: 12px;
  padding: .875rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background .15s;
  background: ${({ theme }) => theme.colors.surface};
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
  &:last-child { border-bottom: none; }
`;

const Info = styled.div`flex: 1; min-width: 0;`;

const Tag = styled.div`margin-bottom: 4px;`;

const Name = styled.p`font-size: 14px; font-weight: 500; margin-bottom: 3px;`;

const Desc = styled.p`
  font-size: 12px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5; font-weight: 300;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: 6px;
`;

const PriceRow = styled.div`display: flex; align-items: baseline; gap: 6px;`;

const Price = styled.span`
  font-size: 14px; font-weight: 500;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const OldPrice = styled.span`
  font-size: 12px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`;

const Right = styled.div`
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 8px; flex-shrink: 0;
`;

const Thumb = styled(Link)<{ $bg: string }>`
  width: 82px; height: 82px; border-radius: 10px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; flex-shrink: 0;
  text-decoration: none;
`;

const AddBtn = styled.button`
  width: 28px; height: 28px; border-radius: 50%; border: none;
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 18px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  transition: transform .1s, opacity .2s;
  &:active { transform: scale(.9); }
  &:disabled { opacity: .35; cursor: not-allowed; }
`;

const statusVariant = { instock: "success", low: "warning", out: "danger" } as const;
const statusLabel  = { instock: "Em estoque", low: "Estoque baixo", out: "Esgotado" } as const;

interface Props { product: Product; slug: string; }

export default function ProductCard({ product: p, slug }: Props) {
  const { add, changeQty, items } = useCartContext();
  const cartItem = items.find((i) => i.product.id === p.id);

  return (
    <Item>
      <Info>
        {p.tag && <Tag><Badge $variant="info">{p.tag}</Badge></Tag>}
        <Link href={`/${slug}/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Name>{p.name}</Name>
          <Desc>{p.description}</Desc>
        </Link>
        <PriceRow>
          <Price>R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Price>
          {p.oldPrice && <OldPrice>R$ {p.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</OldPrice>}
        </PriceRow>
        <div style={{ marginTop: "5px" }}>
          <Badge $variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
        </div>
      </Info>

      <Right>
        <Thumb href={`/${slug}/${p.id}`} $bg={p.bg}>{p.emoji}</Thumb>
        {cartItem ? (
          <QtyControl
            qty={cartItem.qty}
            onInc={() => changeQty(p.id, cartItem.qty + 1)}
            onDec={() => changeQty(p.id, cartItem.qty - 1)}
          />
        ) : (
          <AddBtn onClick={() => add(p)} disabled={p.status === "out"} aria-label="Adicionar ao carrinho">
            +
          </AddBtn>
        )}
      </Right>
    </Item>
  );
}
