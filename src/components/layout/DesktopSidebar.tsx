"use client";
import styled from "styled-components";

const Side = styled.aside`
  width: 220px; flex-shrink: 0;
`;

const Section = styled.div`margin-bottom: 1.5rem;`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: .75rem; padding-bottom: .5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CatBtn = styled.button<{ $active: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: .55rem .75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px; text-align: left;
  color: ${({ $active, theme }) => $active ? "#fff" : theme.colors.muted};
  font-weight: ${({ $active }) => $active ? 500 : 400};
  background: ${({ $active, theme }) => $active ? theme.gradients.igD : "transparent"};
  transition: background .15s, color .15s;
  margin-bottom: 2px;
  &:hover {
    background: ${({ $active, theme }) => $active ? theme.gradients.igD : theme.colors.surface2};
    color: ${({ $active, theme }) => $active ? "#fff" : theme.colors.ink};
  }
`;

const Count = styled.span<{ $active: boolean }>`
  font-size: 11px;
  color: ${({ $active }) => $active ? "rgba(255,255,255,.75)" : "inherit"};
  background: ${({ $active }) => $active ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.06)"};
  border-radius: 999px; padding: 1px 7px;
`;

const StoreInfo = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const InfoRow = styled.div`
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: ${({ theme }) => theme.colors.muted};
  font-weight: 300; margin-bottom: 8px;
  &:last-child { margin-bottom: 0; }
`;

const WaLink = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 7px;
  width: 100%; margin-top: 1rem; padding: 9px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 13px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .88; }
`;

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  store: { name: string; location: string; open: string; whatsapp: string };
  productCounts: Record<string, number>;
}

export default function DesktopSidebar({
  categories, activeCategory, onCategoryChange, store, productCounts,
}: Props) {
  return (
    <Side>
      <Section>
        <SectionTitle>Categorias</SectionTitle>
        {categories.map((c) => (
          <CatBtn key={c} $active={activeCategory === c} onClick={() => onCategoryChange(c)}>
            {c}
            <Count $active={activeCategory === c}>{productCounts[c] ?? 0}</Count>
          </CatBtn>
        ))}
      </Section>

      <Section>
        <SectionTitle>Sobre a loja</SectionTitle>
        <StoreInfo>
          <InfoRow>📍 {store.location}</InfoRow>
          <InfoRow>🕐 {store.open}</InfoRow>
          <WaLink href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </WaLink>
        </StoreInfo>
      </Section>
    </Side>
  );
}
