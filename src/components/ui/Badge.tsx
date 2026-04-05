// src/components/ui/Badge.tsx
"use client";
import styled, { css } from "styled-components";

type Variant = "success" | "warning" | "danger" | "info" | "ig" | "neutral";

const variants: Record<Variant, ReturnType<typeof css>> = {
  success: css`background:${({ theme }) => theme.colors.successBg};color:${({ theme }) => theme.colors.success};`,
  warning: css`background:${({ theme }) => theme.colors.warningBg};color:${({ theme }) => theme.colors.warning};`,
  danger:  css`background:${({ theme }) => theme.colors.dangerBg};color:${({ theme }) => theme.colors.danger};`,
  info:    css`background:#E6F1FB;color:#185FA5;`,
  ig:      css`background:${({ theme }) => theme.gradients.ig};color:#fff;border:none;`,
  neutral: css`background:${({ theme }) => theme.colors.surface2};color:${({ theme }) => theme.colors.muted};`,
};

export const Badge = styled.span<{ $variant: Variant }>`
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 9px;
  border-radius: ${({ theme }) => theme.radii.full};
  white-space: nowrap;
  ${({ $variant }) => variants[$variant]}
`;
