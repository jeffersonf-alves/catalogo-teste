// src/app/layout.tsx
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import ThemeProvider from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "meucatalogo.io",
  description: "Catálogos digitais para quem vende online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
