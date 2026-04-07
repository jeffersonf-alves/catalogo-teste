"use client";
// src/components/catalog/ProductList.tsx
import styled from "styled-components";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const Section = styled.section`background: ${({ theme }) => theme.colors.surface};`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px; font-weight: 700;
  padding: 1.125rem 1.25rem .75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Empty = styled.div`
  padding: 2.5rem 1.25rem;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 300;
`;

interface Props {
  products: Product[];
  title: string;
  slug: string;
}

export default function ProductList({ products, title, slug }: Props) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {products.length === 0 ? (
        <Empty>Nenhum produto encontrado.</Empty>
      ) : (
        products.map((p) => <ProductCard key={p.id} product={p} slug={slug} />)
      )}
    </Section>
  );
}
