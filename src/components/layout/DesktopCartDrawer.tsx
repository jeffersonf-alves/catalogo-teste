"use client";
import styled, { keyframes } from "styled-components";
import { Store } from "@/lib/types";
import { useCartContext } from "@/lib/CartContext";
import QtyControl from "@/components/ui/QtyControl";
import Icon from "@/components/ui/Icon";

const slideIn = keyframes`from{transform:translateX(100%)}to{transform:translateX(0)}`;
const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;

const Overlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 200;
  animation: ${fadeIn} .18s ease;
`;

const Drawer = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 380px;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 201;
  animation: ${slideIn} .26s cubic-bezier(.32,.72,0,1);
`;

const Header = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 17px; font-weight: 700;
`;

const CloseBtn = styled.button`
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.muted};
  &:hover { background: ${({ theme }) => theme.colors.surface2}; color: ${({ theme }) => theme.colors.ink}; }
`;

const ItemsWrap = styled.div`flex: 1; overflow-y: auto; padding: .5rem 0;`;

const CartItem = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: .875rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
`;

const Emoji = styled.div<{ $bg: string }>`
  width: 50px; height: 50px; border-radius: 10px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; flex-shrink: 0;
`;

const ItemInfo = styled.div`flex: 1; min-width: 0;`;
const ItemName  = styled.p`font-size: 14px; font-weight: 500; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
const ItemPrice = styled.p`font-size: 13px; color: ${({ theme }) => theme.colors.muted}; font-weight: 300;`;

const Empty = styled.div`
  padding: 4rem 1.5rem; text-align: center;
  font-size: 14px; color: ${({ theme }) => theme.colors.muted}; font-weight: 300; line-height: 1.7;
`;

const Footer = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const TotalRow = styled.div`
  display: flex; justify-content: space-between; margin-bottom: 1rem;
`;

const TotalLabel = styled.span`font-size: 14px; color: ${({ theme }) => theme.colors.muted};`;
const TotalValue = styled.strong`font-size: 20px; font-weight: 500;`;

const WaBtn = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 9px;
  width: 100%; padding: 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 15px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .9; }
`;

const ClearBtn = styled.button`
  display: block; width: 100%; margin-top: 10px; padding: 11px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  font-size: 13px; color: ${({ theme }) => theme.colors.muted};
  transition: background .2s;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }
`;

interface Props { open: boolean; onClose: () => void; store: Store; }

export default function DesktopCartDrawer({ open, onClose, store }: Props) {
  const { items, changeQty, clear, totalPrice, buildWhatsAppMessage } = useCartContext();
  const waUrl = buildWhatsAppMessage(store.name, store.whatsapp);
  const fmt = (n: number) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        <Header>
          <Title>Carrinho {items.length > 0 && `(${items.reduce((a,i) => a+i.qty,0)})`}</Title>
          <CloseBtn onClick={onClose}><Icon name="x" size={18} /></CloseBtn>
        </Header>

        <ItemsWrap>
          {items.length === 0 ? (
            <Empty>Seu carrinho está vazio.<br />Adicione produtos para continuar.</Empty>
          ) : (
            items.map(({ product: p, qty }) => (
              <CartItem key={p.id}>
                <Emoji $bg={p.bg}>{p.emoji}</Emoji>
                <ItemInfo>
                  <ItemName>{p.name}</ItemName>
                  <ItemPrice>{fmt(p.price * qty)}</ItemPrice>
                </ItemInfo>
                <QtyControl qty={qty} onInc={() => changeQty(p.id, qty+1)} onDec={() => changeQty(p.id, qty-1)} />
              </CartItem>
            ))
          )}
        </ItemsWrap>

        {items.length > 0 && (
          <Footer>
            <TotalRow>
              <TotalLabel>Total do pedido</TotalLabel>
              <TotalValue>{fmt(totalPrice)}</TotalValue>
            </TotalRow>
            <WaBtn href={waUrl} target="_blank" rel="noreferrer" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Enviar pedido pelo WhatsApp
            </WaBtn>
            <ClearBtn onClick={clear}>Limpar carrinho</ClearBtn>
          </Footer>
        )}
      </Drawer>
    </>
  );
}
