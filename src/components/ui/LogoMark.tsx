// src/components/ui/LogoMark.tsx
"use client";
import styled from "styled-components";

const Mark = styled.span<{ $size: number; $fs: number; $r: string }>`
  display: inline-flex; align-items: center; justify-content: center;
  width: ${({ $size }) => $size}px; height: ${({ $size }) => $size}px;
  border-radius: ${({ $r }) => $r};
  background: ${({ theme }) => theme.gradients.igD};
  font-family: Georgia, serif; font-size: ${({ $fs }) => $fs}px;
  font-weight: 900; color: #fff; flex-shrink: 0;
`;

export default function LogoMark({ size = 36, fs = 22, r = "10px" }: { size?: number; fs?: number; r?: string }) {
  return <Mark $size={size} $fs={fs} $r={r}>m</Mark>;
}
