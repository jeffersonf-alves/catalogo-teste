// src/components/layout/StoreToolbar.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "@/components/ui/Icon";

const Bar = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: .75rem 1.25rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky; top: 0; z-index: 20;
`;

/* ── Dropdown ── */
const DropWrap = styled.div`position: relative; flex: 1;`;

const DropBtn = styled.button`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 38px; padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 13px; color: ${({ theme }) => theme.colors.muted};
  gap: 8px;
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
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
`;

const DropItem = styled.button<{ $active: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: .65rem 1rem;
  font-size: 13px; text-align: left;
  color: ${({ $active, theme }) => $active ? theme.colors.ink : theme.colors.muted};
  font-weight: ${({ $active }) => $active ? 500 : 400};
  background: transparent;
  transition: background .12s;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
`;

const ActiveDot = styled.span`
  width: 7px; height: 7px; border-radius: 50%;
  background: ${({ theme }) => theme.gradients.ig};
  display: inline-block;
`;

/* ── Search ── */
const SearchBtn = styled.button`
  width: 38px; height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  display: flex; align-items: center; justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  flex-shrink: 0;
  transition: background .15s;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
`;

const SearchOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  padding: .6rem 1.25rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SearchInput = styled.div`
  display: flex; align-items: center; gap: 8px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0 14px; height: 38px;
`;

const Input = styled.input`
  flex: 1; border: none; background: none; outline: none;
  font-size: 14px; font-family: inherit;
  color: ${({ theme }) => theme.colors.ink};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
`;

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function StoreToolbar({
  categories, activeCategory, onCategoryChange, searchQuery, onSearchChange,
}: Props) {
  const [dropOpen, setDropOpen] = useState(false);
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
            <DropLabel>{activeCategory === "Todas" ? "Lista de categorias" : activeCategory}</DropLabel>
            <Icon name={dropOpen ? "chevron-up" : "chevron-down"} size={14} />
          </DropBtn>
          <DropMenu $open={dropOpen}>
            {categories.map((c) => (
              <DropItem
                key={c} $active={activeCategory === c}
                onClick={() => { onCategoryChange(c); setDropOpen(false); }}
              >
                {c}
                {activeCategory === c && <ActiveDot />}
              </DropItem>
            ))}
          </DropMenu>
        </DropWrap>

        <SearchBtn onClick={() => setSearchOpen((v) => !v)} aria-label="Buscar">
          <Icon name={searchOpen ? "x" : "search"} size={16} />
        </SearchBtn>
      </Bar>

      <SearchOverlay $open={searchOpen}>
        <SearchInput>
          <Icon name="search" size={14} color="#aaa" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus={searchOpen}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} style={{ color: "#aaa", lineHeight: 0 }}>
              <Icon name="x" size={14} />
            </button>
          )}
        </SearchInput>
      </SearchOverlay>
    </>
  );
}
