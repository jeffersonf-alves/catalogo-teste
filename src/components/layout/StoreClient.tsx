"use client";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { Store } from "@/lib/types";
import { up, down } from "@/lib/breakpoints";

// Mobile components
import StoreCover    from "./StoreCover";
import StoreToolbar  from "./StoreToolbar";
import StoreFooter   from "./StoreFooter";
import FeaturedSlider from "@/components/catalog/FeaturedSlider";
import ProductList   from "@/components/catalog/ProductList";
import CartFab       from "@/components/cart/CartFab";
import CartDrawer    from "@/components/cart/CartDrawer";

// Desktop components
import DesktopHeader       from "./DesktopHeader";
import DesktopStoreBanner  from "./DesktopStoreBanner";
import DesktopSidebar      from "./DesktopSidebar";
import DesktopProductGrid  from "@/components/catalog/DesktopProductGrid";
import DesktopCartDrawer   from "./DesktopCartDrawer";

/* ─────────────────────────────────────────
   Mobile wrapper (hidden ≥ 768px)
───────────────────────────────────────── */
const MobileView = styled.div`
  display: block;
  ${up.md} { display: none; }
`;

const MobileCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  min-height: 100vh;
`;

/* ─────────────────────────────────────────
   Desktop wrapper (hidden < 768px)
───────────────────────────────────────── */
const DesktopView = styled.div`
  display: none;
  ${up.md} { display: block; }
  background: ${({ theme }) => theme.colors.bg};
  min-height: 100vh;
`;

const DesktopMain = styled.div`
  max-width: 1280px; margin: 0 auto; padding: 2rem;
`;

const DesktopBody = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  align-items: flex-start;
`;

const ContentArea = styled.div``;

const ContentHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap;
`;

const ContentTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px; font-weight: 700;
`;

const ResultCount = styled.span`
  font-size: 13px; color: ${({ theme }) => theme.colors.muted}; font-weight: 300;
`;

const SortSelect = styled.select`
  padding: 7px 32px 7px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px; font-family: inherit;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surface};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
`;

const DesktopFooter = styled.footer`
  max-width: 1280px; margin: 0 auto; padding: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem;
`;

const FooterBrand = styled.div`
  font-size: 13px; color: ${({ theme }) => theme.colors.muted}; font-weight: 300;
`;

const IgText = styled.span`
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-weight: 500;
`;

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
interface Props { store: Store; }

export default function StoreClient({ store }: Props) {
  const [category,  setCategory]  = useState("Todas");
  const [search,    setSearch]    = useState("");
  const [sort,      setSort]      = useState("default");
  const [cartOpen,  setCartOpen]  = useState(false);

  // Contagem por categoria para a sidebar
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { Todas: store.products.length };
    store.products.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [store.products]);

  // Produtos filtrados
  const filtered = useMemo(() => {
    let list = store.products;
    if (category !== "Todas") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [store.products, category, search, sort]);

  const listTitle = search
    ? `Resultados para "${search}"`
    : category !== "Todas" ? category : "Todos os produtos";

  /* ── MOBILE ── */
  const mobile = (
    <MobileView>
      <MobileCard>
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
        <ProductList
          products={filtered}
          title={search || category !== "Todas" ? listTitle : "Mais vendidos"}
          slug={store.slug}
        />
        <StoreFooter />
        <CartFab onOpen={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} store={store} />
      </MobileCard>
    </MobileView>
  );

  /* ── DESKTOP ── */
  const desktop = (
    <DesktopView>
      <DesktopHeader
        store={store}
        searchQuery={search}
        onSearchChange={setSearch}
        onCartOpen={() => setCartOpen(true)}
      />

      <DesktopStoreBanner store={store} />

      <DesktopMain>
        <DesktopBody>
          <DesktopSidebar
            categories={store.categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            store={store}
            productCounts={productCounts}
          />

          <ContentArea>
            <ContentHeader>
              <div>
                <ContentTitle>{listTitle}</ContentTitle>
                <ResultCount>
                  {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
                </ResultCount>
              </div>
              <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Mais relevantes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name">A–Z</option>
              </SortSelect>
            </ContentHeader>

            <DesktopProductGrid products={filtered} slug={store.slug} />
          </ContentArea>
        </DesktopBody>
      </DesktopMain>

      <DesktopFooter>
        <FooterBrand>© 2025 {store.name}</FooterBrand>
        <FooterBrand>Criado com <IgText>meucatalogo.io</IgText></FooterBrand>
      </DesktopFooter>

      <DesktopCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} store={store} />
    </DesktopView>
  );

  return <>{mobile}{desktop}</>;
}
