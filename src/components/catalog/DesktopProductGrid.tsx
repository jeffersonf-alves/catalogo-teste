"use client";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useCartContext } from "@/lib/CartContext";
import QtyControl from "@/components/ui/QtyControl";
import { up } from "@/lib/breakpoints";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${up.lg} { grid-template-columns: repeat(3, 1fr); }
  ${up.xl} { grid-template-columns: repeat(4, 1fr); }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  transition: box-shadow .2s, transform .2s;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,.1); transform: translateY(-2px); }
`;

const ImgWrap = styled(Link)<{ $bg: string }>`
  display: flex; align-items: center; justify-content: center;
  height: 180px; background: ${({ $bg }) => $bg};
  font-size: 72px; position: relative;
  ${up.lg} { height: 200px; }
`;

const TagWrap = styled.div`position: absolute; top: 10px; left: 10px;`;

const Body = styled.div`padding: 1rem;`;

const Name = styled.p`
  font-size: 14px; font-weight: 500; margin-bottom: 4px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const Desc = styled.p`
  font-size: 12px; color: ${({ theme }) => theme.colors.muted};
  font-weight: 300; line-height: 1.5; margin-bottom: 8px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex; align-items: baseline; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: 18px; font-weight: 700;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const OldPrice = styled.span`
  font-size: 12px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`;

const Footer = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; margin-top: 4px;
`;

const AddBtn = styled.button`
  flex: 1; padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none; background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 13px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .88; }
  &:disabled { opacity: .38; cursor: not-allowed; }
`;

const statusVariant = { instock:"success", low:"warning", out:"danger" } as const;
const statusLabel   = { instock:"Em estoque", low:"Estoque baixo", out:"Esgotado" } as const;

interface Props { products: Product[]; slug: string; }

export default function DesktopProductGrid({ products, slug }: Props) {
  const { add, changeQty, items } = useCartContext();

  if (!products.length) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <Grid>
      {products.map((p) => {
        const cartItem = items.find((i) => i.product.id === p.id);
        const s = statusMap[p.status];
        return (
          <Card key={p.id}>
            <ImgWrap href={`/${slug}/${p.id}`} $bg={p.bg}>
              {p.emoji}
              {p.tag && <TagWrap><Badge $variant="ig">{p.tag}</Badge></TagWrap>}
            </ImgWrap>
            <Body>
              <n>{p.name}</n>
              <Desc>{p.description}</Desc>
              <PriceRow>
                <Price>R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Price>
                {p.oldPrice && <OldPrice>R$ {p.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</OldPrice>}
              </PriceRow>
              <div style={{ marginBottom: "10px" }}>
                <Badge $variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
              </div>
              <Footer>
                {cartItem ? (
                  <QtyControl
                    qty={cartItem.qty}
                    onInc={() => changeQty(p.id, cartItem.qty + 1)}
                    onDec={() => changeQty(p.id, cartItem.qty - 1)}
                  />
                ) : (
                  <AddBtn onClick={() => add(p)} disabled={p.status === "out"}>
                    {p.status === "out" ? "Esgotado" : "+ Adicionar"}
                  </AddBtn>
                )}
                <Link href={`/${slug}/${p.id}`} style={{ fontSize: "12px", color: "#aaa", whiteSpace: "nowrap" }}>
                  Ver detalhes
                </Link>
              </Footer>
            </Body>
          </Card>
        );
      })}
    </Grid>
  );
}

const statusMap = { instock:"success", low:"warning", out:"danger" } as const;
