"use client";
// src/components/layout/StoreFooter.tsx
import styled from "styled-components";
import LogoMark from "@/components/ui/LogoMark";

const Footer = styled.footer`
  text-align: center;
  padding: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Text = styled.span`font-size: 12px; color: ${({ theme }) => theme.colors.hint};`;

const IgText = styled.span`
  font-weight: 500;
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

export default function StoreFooter() {
  return (
    <Footer>
      <LogoMark size={20} fs={13} r="5px" />
      <Text>Criado com <IgText>meucatalogo.io</IgText></Text>
    </Footer>
  );
}
