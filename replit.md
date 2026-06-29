# Cleber Carrasco

Site oficial da marca de moda de luxo e alta-costura Cleber Carrasco — experiência cinematográfica com preloader animado, cursor customizado, animações GSAP e integração WhatsApp.

## Run & Operate

- `pnpm --filter @workspace/cleber-carrasco run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Wouter (routing)
- Animations: GSAP (ScrollTrigger, preloader) + Framer Motion (page transitions)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/cleber-carrasco/` — main frontend (React + Vite)
- `artifacts/cleber-carrasco/src/pages/` — Home, Colecao, Produto, Admin, AdminLogin
- `artifacts/cleber-carrasco/src/data/products.ts` — mock product catalog
- `artifacts/cleber-carrasco/src/components/` — Navbar, Footer, Preloader, CustomCursor
- `artifacts/cleber-carrasco/public/logo-cleber-carrasco.png` — brand logo
- `artifacts/api-server/` — Express API server
- `lib/api-spec/openapi.yaml` — API contract (OpenAPI 3.1)

## Product

- **Home** (`/`) — experiência cinematográfica completa com preloader, hero, grid editorial, categorias, manifesto da marca, galeria mosaico, FAQ e rodapé
- **Coleção** (`/colecao`) — catálogo de 12 produtos de luxo com hover premium
- **Produto** (`/produto/:id`) — detalhe com galeria, seletores de tamanho/cor, botão WhatsApp
- **Admin** (`/admin`) — painel administrativo dark com gestão de produtos (localStorage)
- **Admin Login** (`/admin/login`) — login mock: admin@clebercorrasco.com / admin123

## Architecture decisions

- Dados de produtos em localStorage para o admin (sem backend necessário para MVP)
- Autenticação mock via sessionStorage no admin
- Preloader GSAP exibido apenas na primeira visita por sessão (sessionStorage flag)
- WhatsApp integration via `wa.me/5514997182001` com mensagem pré-formatada
- Cursor customizado com GSAP lerp lag e mix-blend-mode: difference nos hover states

## User preferences

- Marca: Cleber Carrasco — moda de luxo brasileira, "Quiet Luxury"
- WhatsApp: +55 14 99718-2001 (wa.me/5514997182001)
- GitHub: https://github.com/llucaspro/cleber-carrasco
- Paleta: #FFFFFF / #0B0B0B / #F9F9F9 / #121212 — sem cores primárias ou neon
- Tipografia: Cormorant Garamond (serif) + Inter (sans-serif)
- Radius: 0rem (bordas retas — estética de luxo)

## Gotchas

- O preloader usa sessionStorage "preloader_shown" — para testar novamente, limpe o sessionStorage no devtools
- Admin mock auth: email=admin@clebercorrasco.com, senha=admin123, dados em localStorage
- Logo no preloader usa `filter: invert(1)` para aparecer branca sobre fundo preto

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
