"use client";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useCartContext } from "@/lib/CartContext";
import { up, down } from "@/lib/breakpoints";

const Section = styled.section`
  padding: 1rem 0 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 14px; font-weight: 700;
  padding: 0 1rem; margin-bottom: .75rem;

  @media (min-width: 400px) { padding: 0 1.25rem; font-size: 15px; }
`;

const Scroll = styled.div`
  display: flex; gap: 8px;
  overflow-x: auto;
  padding: 0 1rem .875rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }

  @media (min-width: 400px) { padding: 0 1.25rem .875rem; gap: 10px; }
`;

/* Card widths scale with viewport: smaller on tiny screens */
const Card = styled.div`
  width: 130px; flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  scroll-snap-align: start;

  /* 360px+ */
  ${up.xl}  { width: 142px; }
  /* 480px+ */
  ${up.sm}  { width: 155px; }
`;

const CardImg = styled.div<{ $bg: string }>`
  height: 85px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; position: relative;

  ${up.xl}  { height: 90px; font-size: 38px; }
  ${up.sm}  { height: 95px; font-size: 40px; }
`;

const TagWrap = styled.div`position: absolute; top: 7px; left: 7px;`;

const CardBody = styled.div`
  padding: .5rem .65rem .65rem;
  @media (min-width: 400px) { padding: .6rem .75rem .75rem; }
`;

const CardName = styled.p`
  font-size: 12px; font-weight: 500; margin-bottom: 2px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  ${up.xl} { font-size: 13px; }
`;

const CardDesc = styled.p`
  font-size: 11px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.35; margin-bottom: .35rem; font-weight: 300;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const PriceRow = styled.div`display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap;`;

const Price = styled.span`
  font-size: 13px; font-weight: 500;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  ${up.xl} { font-size: 14px; }
`;

const OldPrice = styled.span`
  font-size: 10px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
  ${up.xl} { font-size: 11px; }
`;

const AddBtn = styled.button`
  margin-top: .45rem; width: 100%; padding: 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 11px; font-weight: 500;
  border: none; transition: opacity .2s;
  /* 44px min touch target — add padding to compensate for small button */
  min-height: 32px;
  &:hover { opacity: .88; }
  &:disabled { opacity: .38; cursor: not-allowed; }
  ${up.xl} { font-size: 12px; }
`;

interface Props { products: Product[]; slug: string; }

export default function FeaturedSlider({ products, slug }: Props) {
  const { add, items } = useCartContext();
  const featured = products.filter((p) => p.featured);
  if (!featured.length) return null;

  return (
    <Section>
      <Title>Destaques</Title>
      <Scroll>
        {featured.map((p) => {
          const inCart = items.find((i) => i.product.id === p.id);
          return (
            <Card key={p.id}>
              <Link href={`/${slug}/${p.id}`}>
                <CardImg $bg={p.bg}>
                  {p.emoji}
                  {p.tag && <TagWrap><Badge $variant="ig">{p.tag}</Badge></TagWrap>}
                </CardImg>
              </Link>
              <CardBody>
                <CardName>{p.name}</CardName>
                <CardDesc>{p.description}</CardDesc>
                <PriceRow>
                  <Price>R$ {p.price.toLocaleString("pt-BR")}</Price>
                  {p.oldPrice && <OldPrice>R$ {p.oldPrice.toLocaleString("pt-BR")}</OldPrice>}
                </PriceRow>
                <AddBtn onClick={() => add(p)} disabled={p.status === "out"}>
                  {inCart ? `Carrinho (${inCart.qty})` : p.status === "out" ? "Esgotado" : "+ Adicionar"}
                </AddBtn>
              </CardBody>
            </Card>
          );
        })}
      </Scroll>
    </Section>
  );
}
