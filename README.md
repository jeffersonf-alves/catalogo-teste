# meucatalogo.io — Storefront

Catálogo público do vendedor, construído com **Next.js 14** (App Router) + **Styled Components**. Mobile-first, sem dependências pesadas.

## Início rápido

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) — redireciona para `/moda-bella` (loja demo).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/[slug]` | Página pública da loja |
| `/[slug]/[productId]` | Detalhe do produto |

**Exemplo:** `http://localhost:3000/moda-bella`

## Estrutura

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (providers)
│   ├── page.tsx                      # Redirect → /moda-bella
│   ├── not-found.tsx                 # 404 customizado
│   └── [slug]/
│       ├── page.tsx                  # Página da loja (SSG)
│       └── [productId]/page.tsx      # Detalhe do produto
│
├── components/
│   ├── layout/
│   │   ├── StoreCover.tsx            # Capa + avatar + ações
│   │   ├── StoreToolbar.tsx          # Dropdown categorias + busca
│   │   ├── StoreFooter.tsx           # Rodapé com crédito
│   │   └── StoreClient.tsx           # Orquestrador client-side
│   ├── catalog/
│   │   ├── FeaturedSlider.tsx        # Carrossel de destaques
│   │   ├── ProductCard.tsx           # Card da listagem
│   │   └── ProductList.tsx           # Lista com título
│   ├── cart/
│   │   ├── CartFab.tsx               # Botão flutuante carrinho
│   │   └── CartDrawer.tsx            # Drawer com itens + WhatsApp
│   └── ui/
│       ├── Badge.tsx
│       ├── Icon.tsx
│       ├── LogoMark.tsx
│       └── QtyControl.tsx
│
├── hooks/
│   └── useCart.ts                    # Hook carrinho (localStorage)
│
└── lib/
    ├── types.ts                      # Interfaces TypeScript
    ├── theme.ts                      # Tokens de design
    ├── breakpoints.ts                # Breakpoints responsivos
    ├── mockStores.ts                 # Dados de exemplo
    ├── CartContext.tsx               # Context do carrinho
    ├── ThemeProvider.tsx
    └── StyledComponentsRegistry.tsx  # SSR fix
```

## Adicionar uma nova loja

Edite `src/lib/mockStores.ts` e adicione um objeto ao array `stores`:

```ts
{
  slug: "minha-loja",           // URL: /minha-loja
  name: "Minha Loja",
  location: "Cidade – UF",
  whatsapp: "5511999999999",    // DDI + DDD + número
  open: "Sempre aberto",
  coverEmojis: "🛒🎁💎",
  logoEmoji: "🏪",
  categories: ["Todas", "Categoria A", "Categoria B"],
  products: [ /* ... */ ],
}
```

## Funcionalidades

- Capa da loja com gradiente e avatar
- Dropdown de categorias com filtro instantâneo
- Busca por nome e descrição
- Carrossel de produtos em destaque
- Listagem com controle de quantidade inline
- Página de detalhe do produto
- Carrinho persistido em `localStorage`
- Drawer do carrinho com total calculado
- Envio do pedido para WhatsApp com mensagem formatada
- Botão de compartilhar (Web Share API + fallback clipboard)
- Página 404 customizada
- Mobile-first, max-width 480px centralizado
