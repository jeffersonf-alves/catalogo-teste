"use client";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import QtyControl from "@/components/ui/QtyControl";
import { useCartContext } from "@/lib/CartContext";
import { up, down } from "@/lib/breakpoints";

const Item = styled.div`
  display: flex; gap: 10px;
  padding: .8rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: background .15s;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
  &:last-child { border-bottom: none; }

  @media (min-width: 400px) { gap: 12px; padding: .875rem 1.25rem; }
`;

const Info = styled.div`flex: 1; min-width: 0;`;

const Tag = styled.div`margin-bottom: 4px;`;

const ProductLink = styled(Link)`
  display: block; color: inherit; text-decoration: none;
`;

const Name = styled.p`
  font-size: 13px; font-weight: 500; margin-bottom: 3px;
  /* clamp at 2 lines */
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;

  ${up.xs}  { font-size: 14px; }
`;

const Desc = styled.p`
  font-size: 11px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.45; font-weight: 300; margin-bottom: 6px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;

  ${up.xs}  { font-size: 12px; }
  /* hide on very small screens to save space */
  ${down.sm} { display: none; }
`;

const PriceRow = styled.div`
  display: flex; align-items: baseline; gap: 5px; flex-wrap: wrap;
  margin-bottom: 4px;
`;

const Price = styled.span`
  font-size: 13px; font-weight: 500;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  ${up.xs} { font-size: 14px; }
`;

const OldPrice = styled.span`
  font-size: 11px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
  ${up.xs} { font-size: 12px; }
`;

const Right = styled.div`
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 8px; flex-shrink: 0;
`;

const Thumb = styled(Link)<{ $bg: string }>`
  width: 72px; height: 72px; border-radius: 9px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; flex-shrink: 0; text-decoration: none;

  ${up.xs}  { width: 78px; height: 78px; font-size: 34px; }
  ${up.sm}  { width: 82px; height: 82px; font-size: 36px; }
`;

const AddBtn = styled.button`
  /* 44px tap target */
  width: 32px; height: 32px; border-radius: 50%; border: none;
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 20px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  transition: transform .1s, opacity .2s;
  &:active { transform: scale(.88); }
  &:disabled { opacity: .32; cursor: not-allowed; }

  ${up.xs} { width: 34px; height: 34px; }
`;

const statusVariant = { instock:"success", low:"warning", out:"danger" } as const;
const statusLabel   = { instock:"Em estoque", low:"Estoque baixo", out:"Esgotado" } as const;

interface Props { product: Product; slug: string; }

export default function ProductCard({ product: p, slug }: Props) {
  const { add, changeQty, items } = useCartContext();
  const cartItem = items.find((i) => i.product.id === p.id);

  return (
    <Item>
      <Info>
        {p.tag && <Tag><Badge $variant="info">{p.tag}</Badge></Tag>}
        <ProductLink href={`/${slug}/${p.id}`}>
          <Name>{p.name}</Name>
          <Desc>{p.description}</Desc>
        </ProductLink>
        <PriceRow>
          <Price>R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Price>
          {p.oldPrice && <OldPrice>R$ {p.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</OldPrice>}
        </PriceRow>
        <Badge $variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
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
          <AddBtn onClick={() => add(p)} disabled={p.status === "out"} aria-label="Adicionar">+</AddBtn>
        )}
      </Right>
    </Item>
  );
}
