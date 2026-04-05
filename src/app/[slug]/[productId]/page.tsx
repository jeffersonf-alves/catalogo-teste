// src/app/[slug]/[productId]/page.tsx
"use client";
import { notFound } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import { getStore } from "@/lib/mockStores";
import { useCartContext } from "@/lib/CartContext";
import { Badge } from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import QtyControl from "@/components/ui/QtyControl";
import { mq } from "@/lib/breakpoints";

const Page = styled.div`
  max-width: 480px; margin: 0 auto; min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06);
`;

const TopBar = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: .875rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky; top: 0; z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
`;

const BackBtn = styled(Link)`
  display: flex; align-items: center; gap: 6px;
  font-size: 14px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.colors.ink}; }
`;

const Hero = styled.div<{ $bg: string }>`
  height: 260px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 96px;
  ${mq.sm} { height: 200px; font-size: 72px; }
`;

const Body = styled.div`padding: 1.5rem 1.25rem;`;

const TagRow = styled.div`margin-bottom: .75rem; display: flex; gap: 6px; flex-wrap: wrap;`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px; font-weight: 800; margin-bottom: .5rem;
`;

const PriceRow = styled.div`display: flex; align-items: baseline; gap: 8px; margin-bottom: 1rem;`;

const Price = styled.span`
  font-size: 26px; font-weight: 700;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const OldPrice = styled.span`
  font-size: 16px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`;

const Desc = styled.p`
  font-size: 15px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem;
`;

const Divider = styled.hr`border: none; border-top: 1px solid ${({ theme }) => theme.colors.border}; margin: 1.25rem 0;`;

const Actions = styled.div`display: flex; gap: 10px; align-items: center;`;

const AddBtn = styled.button`
  flex: 1; padding: 14px; border-radius: ${({ theme }) => theme.radii.full};
  border: none; background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 15px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .88; }
  &:disabled { opacity: .35; cursor: not-allowed; }
`;

const WaBtn = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 14px 20px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 15px; font-weight: 500;
  transition: opacity .2s; white-space: nowrap;
  &:hover { opacity: .9; }
`;

const statusMap = {
  instock: { v: "success" as const, l: "Em estoque" },
  low:     { v: "warning" as const, l: "Estoque baixo" },
  out:     { v: "danger"  as const, l: "Esgotado" },
};

interface Props { params: { slug: string; productId: string } }

export default function ProductPage({ params }: Props) {
  const store = getStore(params.slug);
  if (!store) notFound();

  const product = store.products.find((p) => p.id === params.productId);
  if (!product) notFound();

  const { add, changeQty, items } = useCartContext();
  const cartItem = items.find((i) => i.product.id === product.id);
  const s = statusMap[product.status];
  const waMsg = `Olá ${store.name}! Tenho interesse no produto: ${product.name} — R$ ${product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <Page>
      <TopBar>
        <BackBtn href={`/${params.slug}`}>
          <Icon name="arrow-left" size={16} />
          Voltar
        </BackBtn>
      </TopBar>

      <Hero $bg={product.bg}>{product.emoji}</Hero>

      <Body>
        <TagRow>
          {product.tag && <Badge $variant="info">{product.tag}</Badge>}
          <Badge $variant={s.v}>{s.l}</Badge>
        </TagRow>

        <n>{product.name}</n>
        <PriceRow>
          <Price>R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Price>
          {product.oldPrice && (
            <OldPrice>R$ {product.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</OldPrice>
          )}
        </PriceRow>
        <Desc>{product.description}</Desc>

        <Divider />

        <Actions>
          {cartItem ? (
            <>
              <QtyControl
                qty={cartItem.qty}
                onInc={() => changeQty(product.id, cartItem.qty + 1)}
                onDec={() => changeQty(product.id, cartItem.qty - 1)}
              />
              <AddBtn style={{ background: "none", border: "1px solid rgba(0,0,0,.15)", color: "inherit" }}
                onClick={() => add(product)}>
                + Mais um
              </AddBtn>
            </>
          ) : (
            <AddBtn onClick={() => add(product)} disabled={product.status === "out"}>
              {product.status === "out" ? "Produto esgotado" : "Adicionar ao carrinho"}
            </AddBtn>
          )}
          <WaBtn
            href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(waMsg)}`}
            target="_blank" rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </WaBtn>
        </Actions>
      </Body>
    </Page>
  );
}
