"use client";
import styled from "styled-components";
import { Store } from "@/lib/types";
import LogoMark from "@/components/ui/LogoMark";
import Icon from "@/components/ui/Icon";
import { useCartContext } from "@/lib/CartContext";

const Header = styled.header`
  position: sticky; top: 0; z-index: 50;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: 1280px; margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex; align-items: center; gap: 2rem;
`;

const Brand = styled.a`
  display: flex; align-items: center; gap: 10px; flex-shrink: 0;
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px; font-weight: 800;
`;

const IgText = styled.span`
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const StoreName = styled.div`
  padding-left: 1.5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 15px; font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 220px;
`;

const SearchWrap = styled.div`
  flex: 1; max-width: 480px;
  display: flex; align-items: center; gap: 8px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0 14px; height: 40px;
  transition: border-color .2s;
  &:focus-within { border-color: ${({ theme }) => theme.colors.border2}; }
`;

const SearchInput = styled.input`
  flex: 1; border: none; background: none; outline: none;
  font-size: 14px; font-family: inherit;
  color: ${({ theme }) => theme.colors.ink};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
`;

const Actions = styled.div`
  margin-left: auto; display: flex; align-items: center; gap: 10px;
`;

const WaBtn = styled.a`
  display: flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 13px; font-weight: 500;
  transition: opacity .2s; white-space: nowrap;
  &:hover { opacity: .88; }
`;

const CartBtn = styled.button`
  display: flex; align-items: center; gap: 8px;
  padding: 8px 18px; border-radius: ${({ theme }) => theme.radii.full};
  border: none; background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 13px; font-weight: 500;
  transition: opacity .2s; white-space: nowrap;
  &:hover { opacity: .88; }
`;

const CartCount = styled.span`
  background: rgba(255,255,255,.25);
  border-radius: 999px; padding: 1px 7px; font-size: 12px;
`;

interface Props {
  store: Store;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCartOpen: () => void;
}

export default function DesktopHeader({ store, searchQuery, onSearchChange, onCartOpen }: Props) {
  const { totalItems } = useCartContext();

  return (
    <Header>
      <Inner>
        <Brand href="/">
          <LogoMark size={30} fs={18} r="8px" />
          <BrandName><IgText>meucatalogo</IgText>.io</BrandName>
        </Brand>

        <StoreName>{store.name}</StoreName>

        <SearchWrap>
          <Icon name="search" size={15} color="#aaa" />
          <SearchInput
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} style={{ color: "#aaa", lineHeight: 0 }}>
              <Icon name="x" size={14} />
            </button>
          )}
        </SearchWrap>

        <Actions>
          <WaBtn href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </WaBtn>

          {totalItems > 0 ? (
            <CartBtn onClick={onCartOpen}>
              <Icon name="shopping-cart" size={15} color="#fff" />
              Carrinho
              <CartCount>{totalItems}</CartCount>
            </CartBtn>
          ) : (
            <CartBtn onClick={onCartOpen} style={{ background: "transparent", color: "inherit", border: `1px solid rgba(0,0,0,.15)` }}>
              <Icon name="shopping-cart" size={15} />
              Carrinho
            </CartBtn>
          )}
        </Actions>
      </Inner>
    </Header>
  );
}
