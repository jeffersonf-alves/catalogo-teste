"use client";
import { notFound } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import { getStore } from "@/lib/mockStores";
import { useCartContext } from "@/lib/CartContext";
import { Badge } from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import QtyControl from "@/components/ui/QtyControl";
import LogoMark from "@/components/ui/LogoMark";
import { up, down } from "@/lib/breakpoints";

/* ── Shared ── */
const statusMap = {
  instock: { v: "success" as const, l: "Em estoque" },
  low:     { v: "warning" as const, l: "Estoque baixo" },
  out:     { v: "danger"  as const, l: "Esgotado" },
};

/* ── Desktop layout ── */
const DesktopWrap = styled.div`
  display: none;
  ${up.md} { display: block; }
  background: ${({ theme }) => theme.colors.bg}; min-height: 100vh;
`;

const DHeader = styled.header`
  position: sticky; top: 0; z-index: 50;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DHeaderInner = styled.div`
  max-width: 1280px; margin: 0 auto; padding: 0 2rem;
  height: 64px; display: flex; align-items: center; gap: 1.5rem;
`;

const BrandLink = styled(Link)`
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px; font-weight: 800;
`;

const IgSpan = styled.span`
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const StoreDivider = styled.div`
  width: 1px; height: 24px; background: ${({ theme }) => theme.colors.border};
`;

const StoreLinkTxt = styled(Link)`
  font-size: 14px; color: ${({ theme }) => theme.colors.muted};
  &:hover { color: ${({ theme }) => theme.colors.ink}; text-decoration: underline; }
`;

const DContent = styled.div`
  max-width: 1000px; margin: 0 auto; padding: 2.5rem 2rem;
`;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 2rem;

  a:hover { color: ${({ theme }) => theme.colors.ink}; text-decoration: underline; }
`;

const DGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  ${up.lg} { grid-template-columns: 1.1fr 1fr; }
`;

const DImgWrap = styled.div<{ $bg: string }>`
  aspect-ratio: 1; border-radius: 20px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 140px;
`;

const DInfo = styled.div``;

const DName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 28px; font-weight: 800; margin-bottom: .75rem; line-height: 1.15;
`;

const DTagRow = styled.div`display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1rem;`;

const DPriceRow = styled.div`
  display: flex; align-items: baseline; gap: 10px; margin-bottom: 1.25rem;
`;

const DPrice = styled.span`
  font-size: 32px; font-weight: 700;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const DOldPrice = styled.span`
  font-size: 18px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`;

const DDesc = styled.p`
  font-size: 15px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7; font-weight: 300; margin-bottom: 2rem;
`;

const DDivider = styled.hr`
  border: none; border-top: 1px solid ${({ theme }) => theme.colors.border}; margin: 1.5rem 0;
`;

const DActions = styled.div`display: flex; gap: 10px; align-items: center; flex-wrap: wrap;`;

const DAddBtn = styled.button`
  flex: 1; min-width: 160px; padding: 14px 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 15px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .88; }
  &:disabled { opacity: .35; cursor: not-allowed; }
`;

const DWaBtn = styled.a`
  display: flex; align-items: center; gap: 8px; padding: 14px 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 15px; font-weight: 500;
  transition: opacity .2s; white-space: nowrap;
  &:hover { opacity: .9; }
`;

/* ── Mobile layout ── */
const MobileWrap = styled.div`
  display: block;
  ${up.md} { display: none; }
  background: ${({ theme }) => theme.colors.surface}; min-height: 100vh;
`;

const MTopBar = styled.div`
  display: flex; align-items: center; gap: 8px; padding: .75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky; top: 0; z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
`;

const MBackBtn = styled(Link)`
  display: flex; align-items: center; gap: 6px; font-size: 14px;
  color: ${({ theme }) => theme.colors.muted}; min-height: 44px; padding: 0 4px;
  &:hover { color: ${({ theme }) => theme.colors.ink}; }
`;

const MHero = styled.div<{ $bg: string }>`
  height: 240px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center; font-size: 88px;
  ${up.sm} { height: 260px; font-size: 96px; }
`;

const MBody = styled.div`
  padding: 1.25rem 1rem;
  @media (min-width: 400px) { padding: 1.5rem 1.25rem; }
`;

const MName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px; font-weight: 800; margin-bottom: .5rem;
  ${up.sm} { font-size: 22px; }
`;

const MTagRow = styled.div`margin-bottom: .75rem; display: flex; gap: 6px; flex-wrap: wrap;`;

const MPriceRow = styled.div`
  display: flex; align-items: baseline; gap: 8px; margin-bottom: 1rem; flex-wrap: wrap;
`;

const MPrice = styled.span`
  font-size: 24px; font-weight: 700;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const MOldPrice = styled.span`
  font-size: 15px; color: ${({ theme }) => theme.colors.muted}; text-decoration: line-through;
`;

const MDesc = styled.p`
  font-size: 14px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem;
`;

const MDivider = styled.hr`border: none; border-top: 1px solid ${({ theme }) => theme.colors.border}; margin: 1.25rem 0;`;

const MActions = styled.div`
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
  ${down.sm} { flex-direction: column; }
`;

const MAddBtn = styled.button`
  flex: 1; padding: 13px 16px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 14px; font-weight: 500; min-height: 48px;
  transition: opacity .2s; width: 100%;
  &:hover { opacity: .88; }
  &:disabled { opacity: .35; cursor: not-allowed; }
`;

const MWaBtn = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 13px 16px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 14px; font-weight: 500; min-height: 48px; width: 100%;
  transition: opacity .2s;
  &:hover { opacity: .9; }
`;

const WaSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface Props { params: { slug: string; productId: string } }

export default function ProductPage({ params }: Props) {
  const store   = getStore(params.slug);
  if (!store) notFound();

  const product = store.products.find((p) => p.id === params.productId);
  if (!product) notFound();

  const { add, changeQty, items } = useCartContext();
  const cartItem = items.find((i) => i.product.id === product.id);
  const s   = statusMap[product.status];
  const waMsg = encodeURIComponent(
    `Olá ${store.name}! Tenho interesse no produto: ${product.name} — R$ ${product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );
  const waUrl = `https://wa.me/${store.whatsapp}?text=${waMsg}`;
  const fmt = (n: number) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  /* ── Desktop ── */
  const desktopView = (
    <DesktopWrap>
      <DHeader>
        <DHeaderInner>
          <BrandLink href="/">
            <LogoMark size={30} fs={18} r="8px" />
            <BrandName><IgSpan>meucatalogo</IgSpan>.io</BrandName>
          </BrandLink>
          <StoreDivider />
          <StoreLinkTxt href={`/${params.slug}`}>{store.name}</StoreLinkTxt>
        </DHeaderInner>
      </DHeader>

      <DContent>
        <Breadcrumb>
          <Link href={`/${params.slug}`}>{store.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </Breadcrumb>

        <DGrid>
          <DImgWrap $bg={product.bg}>{product.emoji}</DImgWrap>

          <DInfo>
            <DTagRow>
              {product.tag && <Badge $variant="info">{product.tag}</Badge>}
              <Badge $variant={s.v}>{s.l}</Badge>
            </DTagRow>

            <n>{product.name}</n>
            <DPriceRow>
              <DPrice>{fmt(product.price)}</DPrice>
              {product.oldPrice && <DOldPrice>{fmt(product.oldPrice)}</DOldPrice>}
            </DPriceRow>
            <DDesc>{product.description}</DDesc>

            <DDivider />

            <DActions>
              {cartItem ? (
                <>
                  <QtyControl qty={cartItem.qty} onInc={() => changeQty(product.id, cartItem.qty+1)} onDec={() => changeQty(product.id, cartItem.qty-1)} />
                  <DAddBtn onClick={() => add(product)}>+ Mais um</DAddBtn>
                </>
              ) : (
                <DAddBtn onClick={() => add(product)} disabled={product.status === "out"}>
                  {product.status === "out" ? "Produto esgotado" : "Adicionar ao carrinho"}
                </DAddBtn>
              )}
              <DWaBtn href={waUrl} target="_blank" rel="noreferrer">
                <WaSvg /> Pedir via WhatsApp
              </DWaBtn>
            </DActions>
          </DInfo>
        </DGrid>
      </DContent>
    </DesktopWrap>
  );

  /* ── Mobile ── */
  const mobileView = (
    <MobileWrap>
      <MTopBar>
        <MBackBtn href={`/${params.slug}`}>
          <Icon name="arrow-left" size={16} /> Voltar
        </MBackBtn>
      </MTopBar>
      <MHero $bg={product.bg}>{product.emoji}</MHero>
      <MBody>
        <MTagRow>
          {product.tag && <Badge $variant="info">{product.tag}</Badge>}
          <Badge $variant={s.v}>{s.l}</Badge>
        </MTagRow>
        <n>{product.name}</n>
        <MPriceRow>
          <MPrice>{fmt(product.price)}</MPrice>
          {product.oldPrice && <MOldPrice>{fmt(product.oldPrice)}</MOldPrice>}
        </MPriceRow>
        <MDesc>{product.description}</MDesc>
        <MDivider />
        <MActions>
          {cartItem ? (
            <>
              <QtyControl qty={cartItem.qty} onInc={() => changeQty(product.id, cartItem.qty+1)} onDec={() => changeQty(product.id, cartItem.qty-1)} />
              <MAddBtn onClick={() => add(product)}>+ Mais um</MAddBtn>
            </>
          ) : (
            <MAddBtn onClick={() => add(product)} disabled={product.status === "out"}>
              {product.status === "out" ? "Produto esgotado" : "Adicionar ao carrinho"}
            </MAddBtn>
          )}
          <MWaBtn href={waUrl} target="_blank" rel="noreferrer">
            <WaSvg /> Pedir via WhatsApp
          </MWaBtn>
        </MActions>
      </MBody>
    </MobileWrap>
  );

  return <>{mobileView}{desktopView}</>;
}
