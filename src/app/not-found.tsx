// src/app/not-found.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

const Page = styled.div`
  max-width: 480px; margin: 0 auto;
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 2rem; text-align: center;
  background: ${({ theme }) => theme.colors.surface};
`;

const Code = styled.p`
  font-size: 72px; font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.display};
  background: ${({ theme }) => theme.gradients.igH};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; margin-bottom: .5rem;
`;

const Title = styled.h1`font-size: 20px; font-weight: 700; margin-bottom: .5rem;`;
const Desc  = styled.p`font-size: 14px; color: ${({ theme }) => theme.colors.muted}; font-weight: 300; margin-bottom: 1.5rem;`;

const HomeBtn = styled(Link)`
  padding: 12px 28px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.ig};
  color: #fff; font-size: 14px; font-weight: 500;
  transition: opacity .2s;
  &:hover { opacity: .88; }
`;

export default function NotFound() {
  return (
    <Page>
      <LogoMark size={48} fs={30} r="12px" />
      <Code style={{ marginTop: "1.5rem" }}>404</Code>
      <Title>Loja não encontrada</Title>
      <Desc>O catálogo que você está procurando não existe ou foi removido.</Desc>
      <HomeBtn href="/">Ir para o início</HomeBtn>
    </Page>
  );
}
