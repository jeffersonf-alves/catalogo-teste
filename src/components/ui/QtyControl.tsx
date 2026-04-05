// src/components/ui/QtyControl.tsx
"use client";
import styled from "styled-components";
import Icon from "./Icon";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Btn = styled.button<{ $primary?: boolean }>`
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: opacity .15s, transform .1s;
  background: ${({ $primary, theme }) => $primary ? theme.gradients.ig : theme.colors.surface2};
  color: ${({ $primary }) => $primary ? "#fff" : "inherit"};
  border: ${({ $primary, theme }) => $primary ? "none" : `1px solid ${theme.colors.border2}`};
  &:active { transform: scale(.9); }
`;

const Num = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 18px;
  text-align: center;
`;

interface Props {
  qty: number;
  onInc: () => void;
  onDec: () => void;
}

export default function QtyControl({ qty, onInc, onDec }: Props) {
  return (
    <Wrap>
      <Btn onClick={onDec}><Icon name="minus" size={14} /></Btn>
      <Num>{qty}</Num>
      <Btn $primary onClick={onInc}><Icon name="plus" size={14} color="#fff" /></Btn>
    </Wrap>
  );
}
