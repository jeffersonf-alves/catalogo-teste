// src/app/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStore, stores } from "@/lib/mockStores";
import StoreClient from "@/components/layout/StoreClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = getStore(params.slug);
  if (!store) return { title: "Loja não encontrada" };
  return {
    title: `${store.name} — meucatalogo.io`,
    description: `Confira o catálogo de ${store.name} em ${store.location}`,
  };
}

export default function StorePage({ params }: Props) {
  const store = getStore(params.slug);
  if (!store) notFound();
  return <StoreClient store={store} />;
}
