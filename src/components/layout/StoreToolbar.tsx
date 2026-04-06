"use client";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "@/components/ui/Icon";
import { down } from "@/lib/breakpoints";

const Bar = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: .7rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky; top: 0; z-index: 20;

  /* slightly more padding on larger phones */
  @media (min-width: 400px) { padding: .75rem 1.25rem; }
`;

const DropWrap = styled.div`position: relative; flex: 1; min-width: 0;`;

const DropBtn = styled.button`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 38px; padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 13px; color: ${({ theme }) => theme.colors.muted};
  gap: 6px;

  @media (min-width: 400px) { padding: 0 12px; }
  ${down.sm} { font-size: 12px; height: 36px; }
`;

const DropLabel = styled.span`
  flex: 1; text-align: left;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const DropMenu = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radii.lg};
  z-index: 50; overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,.1);
  /* max height so it doesn't go off screen on tiny phones */
  max-height: 55vh; overflow-y: auto;
`;

const DropItem = styled.button<{ $active: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: .7rem 1rem;
  font-size: 14px; text-align: left;
  color: ${({ $active, theme }) => $active ? theme.colors.ink : theme.colors.muted};
  font-weight: ${({ $active }) => $active ? 500 : 400};
  background: transparent;
  transition: background .12s;
  /* bigger tap target */
  min-height: 44px;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
`;

const ActiveDot = styled.span`
  width: 7px; height: 7px; border-radius: 50%;
  background: ${({ theme }) => theme.gradients.ig};
  display: inline-block; flex-shrink: 0;
`;

const SearchBtn = styled.button`
  width: 38px; height: 38px; flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  display: flex; align-items: center; justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  transition: background .15s;
  /* 44px tap target */
  min-width: 44px; min-height: 44px;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }

  ${down.sm} { width: 36px; height: 36px; }
`;

const SearchOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center; gap: 8px;
  padding: .6rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 400px) { padding: .6rem 1.25rem; }
`;

const SearchField = styled.div`
  flex: 1; display: flex; align-items: center; gap: 8px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0 12px; height: 38px;
`;

const Input = styled.input`
  flex: 1; border: none; background: none; outline: none;
  font-size: 14px; font-family: inherit;
  color: ${({ theme }) => theme.colors.ink};
  /* font-size 16px prevents iOS auto-zoom */
  @media (max-width: 767px) { font-size: 16px; }
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
`;

const ClearBtn = styled.button`
  color: ${({ theme }) => theme.colors.muted}; line-height: 0; padding: 4px;
  &:hover { color: ${({ theme }) => theme.colors.ink}; }
`;

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function StoreToolbar({ categories, activeCategory, onCategoryChange, searchQuery, onSearchChange }: Props) {
  const [dropOpen, setDropOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <Bar>
        <DropWrap ref={ref}>
          <DropBtn onClick={() => setDropOpen((v) => !v)}>
            <DropLabel>
              {activeCategory === "Todas" ? "Lista de categorias" : activeCategory}
            </DropLabel>
            <Icon name={dropOpen ? "chevron-up" : "chevron-down"} size={14} />
          </DropBtn>

          <DropMenu $open={dropOpen}>
            {categories.map((c) => (
              <DropItem key={c} $active={activeCategory === c}
                onClick={() => { onCategoryChange(c); setDropOpen(false); }}>
                {c}
                {activeCategory === c && <ActiveDot />}
              </DropItem>
            ))}
          </DropMenu>
        </DropWrap>

        <SearchBtn onClick={() => { setSearchOpen((v) => !v); if (searchOpen) onSearchChange(""); }}
          aria-label={searchOpen ? "Fechar busca" : "Buscar"}>
          <Icon name={searchOpen ? "x" : "search"} size={16} />
        </SearchBtn>
      </Bar>

      <SearchOverlay $open={searchOpen}>
        <SearchField>
          <Icon name="search" size={14} color="#aaa" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus={searchOpen}
          />
          {searchQuery && (
            <ClearBtn onClick={() => onSearchChange("")}>
              <Icon name="x" size={14} />
            </ClearBtn>
          )}
        </SearchField>
      </SearchOverlay>
    </>
  );
}
