// src/components/catalog/FeaturedSlider.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useCartContext } from "@/lib/CartContext";
import { mq } from "@/lib/breakpoints";

const Section = styled.section`
  padding: 1.125rem 0 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px; font-weight: 700;
  padding: 0 1.25rem; margin-bottom: .75rem;
`;

const Scroll = styled.div`
  display: flex; gap: 10px;
  overflow-x: auto; padding: 0 1.25rem .875rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Card = styled.div`
  width: 155px; flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  scroll-snap-align: start;
  ${mq.sm} { width: 140px; }
`;

const CardImg = styled.div<{ $bg: string }>`
  height: 95px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 40px; position: relative;
`;

const TagWrap = styled.div`
  position: absolute; top: 8px; left: 8px;
`;

const CardBody = styled.div`padding: .6rem .75rem .75rem;`;

const CardName = styled.p`font-size: 13px; font-weight: 500; margin-bottom: 2px;`;

const CardDesc = styled.p`
  font-size: 11px; color: ${({ theme }) => theme.colors.muted};
  line-height: 1.4; margin-bottom: .4rem; font-weight: 300;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
`;

const PriceRow = styled.div`display: flex; align-items: baseline; gap: 5px;`;

const Price = styled.span`
  font-size: 14px; font-weight: 500;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const OldPrice = styled.span`
  font-size: 11px; color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`;

const AddBtn = styled.button`
  margin-top: .5rem; width: 100%; padding: 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 12px; font-weight: 500;
  border: none; transition: opacity .2s;
  &:hover { opacity: .88; }
  &:disabled { opacity: .4; cursor: not-allowed; }
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
                  {p.tag && (
                    <TagWrap>
                      <Badge $variant="ig">{p.tag}</Badge>
                    </TagWrap>
                  )}
                </CardImg>
              </Link>
              <CardBody>
                <CardName>{p.name}</CardName>
                <CardDesc>{p.description}</CardDesc>
                <PriceRow>
                  <Price>R$ {p.price.toLocaleString("pt-BR")}</Price>
                  {p.oldPrice && <OldPrice>R$ {p.oldPrice.toLocaleString("pt-BR")}</OldPrice>}
                </PriceRow>
                <AddBtn
                  onClick={() => add(p)}
                  disabled={p.status === "out"}
                >
                  {inCart ? `No carrinho (${inCart.qty})` : p.status === "out" ? "Esgotado" : "+ Adicionar"}
                </AddBtn>
              </CardBody>
            </Card>
          );
        })}
      </Scroll>
    </Section>
  );
}
