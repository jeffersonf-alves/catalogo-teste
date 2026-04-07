// src/app/[slug]/[productId]/page.tsx  — Server Component puro
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStore, stores } from "@/lib/mockStores";
import ProductPageClient from "@/components/layout/ProductPageClient";

type Props = {
  params: { slug: string; productId: string };
};

export function generateStaticParams() {
  return stores.flatMap((s) =>
    s.products.map((p) => ({ slug: s.slug, productId: p.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store   = getStore(params.slug);
  const product = store?.products.find((p) => p.id === params.productId);
  if (!store || !product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} — ${store.name}`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const store   = getStore(params.slug);
  if (!store) notFound();

  const product = store!.products.find((p) => p.id === params.productId);
  if (!product) notFound();

  return (
    <ProductPageClient
      store={store!}
      product={product!}
      slug={params.slug}
    />
  );
}
