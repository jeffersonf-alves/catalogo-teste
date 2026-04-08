// src/types/styled.d.ts
// Estende o DefaultTheme do styled-components com o nosso tema,
// eliminando os erros "Property 'colors' does not exist on type 'DefaultTheme'"

import type { Theme } from "@/lib/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
