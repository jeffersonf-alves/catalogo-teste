// src/components/layout/StoreClient.tsx
"use client";
import { useState, useMemo } from "react";
import { Store } from "@/lib/types";
import StoreCover from "./StoreCover";
import StoreToolbar from "./StoreToolbar";
import StoreFooter from "./StoreFooter";
import FeaturedSlider from "@/components/catalog/FeaturedSlider";
import ProductList from "@/components/catalog/ProductList";
import CartFab from "@/components/cart/CartFab";
import CartDrawer from "@/components/cart/CartDrawer";
import styled from "styled-components";

const Page = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  /* shadow para distinguir do fundo em telas largas */
  box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06);
`;

interface Props { store: Store; }

export default function StoreClient({ store }: Props) {
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = store.products;
    if (category !== "Todas") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [store.products, category, search]);

  const listTitle = search
    ? `Resultados para "${search}"`
    : category !== "Todas"
    ? category
    : "Mais vendidos";

  return (
    <Page>
      <StoreCover store={store} />
      <StoreToolbar
        categories={store.categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        searchQuery={search}
        onSearchChange={setSearch}
      />

      {!search && category === "Todas" && (
        <FeaturedSlider products={store.products} slug={store.slug} />
      )}

      <ProductList products={filtered} title={listTitle} slug={store.slug} />
      <StoreFooter />

      <CartFab onOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} store={store} />
    </Page>
  );
}
