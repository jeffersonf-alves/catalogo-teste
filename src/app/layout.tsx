import type { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import ThemeProvider from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "meucatalogo.io",
  description: "Catálogos digitais para quem vende online",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,   // allow user zoom (accessibility)
  userScalable: true,
  viewportFit: "cover", // safe area on notch phones
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
