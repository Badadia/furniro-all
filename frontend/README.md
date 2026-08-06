# Frontend do Desafio 2 / Frontend of Challenge 2

Aplicação React + TypeScript criada com Vite para um e-commerce de móveis. Este é o Desafio 2 da Fase 2 do AWS FDE Node.js + React da Compass UOL AI/R. O frontend consome produtos via API.

This is Challenge 2 of Phase 2 of the AWS FDE Node.js + React program from Compass UOL AI/R. The frontend consumes product data from an API.

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Overview](#overview) &nbsp;•&nbsp;
[Setup](#setup) &nbsp;•&nbsp;
[Scripts](#scripts) &nbsp;•&nbsp;
[Routes](#routes) &nbsp;•&nbsp;
[Architecture](#architecture) &nbsp;•&nbsp;
[Directory structure](#directory-structure) &nbsp;•&nbsp;
[Notes](#notes)

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Como usar](#como-usar) &nbsp;•&nbsp;
[Scripts](#scripts-1) &nbsp;•&nbsp;
[Rotas](#rotas) &nbsp;•&nbsp;
[Arquitetura](#arquitetura) &nbsp;•&nbsp;
[Estrutura](#estrutura) &nbsp;•&nbsp;
[Observações](#observações)

[Authors / Autores](#authors--autores)

</div>

---

## English

### Overview

- React 19 + TypeScript
- Vite for development bundling
- Tailwind CSS for utility-first styling
- Zustand for persistent cart state
- React Router for navigation
- Zod for product data validation
- react-hot-toast for notifications

### Setup

1. Install dependencies:

```bash
cd desafio2/frontend
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Main variables:

- `VITE_API_URL`: backend API URL
- `VITE_CLOUDINARY_BASE_URL`: public image base URL

3. Run locally:

In terminal, start Vite:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

### Scripts

- `npm run dev` - start Vite development server
- `npm run build` - build production assets
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### Routes

- `/` - Home
- `/shop` - Shop main page
- `/shop/:category` - Shop filtered by category
- `/product/:id` - Product page by ID
- `/product/slug/:slug` - Product page by slug
- `/cart` - Cart

### Architecture

#### Hooks

- `src/hooks/useProducts.ts` - fetches products with pagination, filters, sorting, and total count
- `src/hooks/useProduct.ts` - fetches one product by `id` or `slug`

#### Cart state

- `src/stores/cart.store.ts` - Zustand-based persistent cart state, with add, remove, update, and total-calculation actions

#### API consumption

- `src/services/product.service.ts` - fetches product lists and single products from the API/mock, with error handling and Zod validation
- `src/config/env.ts` - defines base URLs and mock mode from `import.meta.env`

### Directory structure

```text
src/
├── App.tsx
├── main.tsx
├── layout.tsx
├── components/
│   ├── Benefits/
│   ├── BreadCrumb/
│   ├── Carousel/
│   ├── Cart/
│   ├── Categories/
│   ├── Container/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── Mosaic/
│   ├── Pagination/
│   ├── ProductDetails/
│   ├── ProductGallery.tsx
│   ├── ProductGrid/
│   ├── ProductInfo/
│   ├── RelatedProducts.tsx
│   ├── ScrollToTop/
│   ├── Shop/
│   ├── ShopToolBar/
│   └── Status/
├── config/
│   └── env.ts
├── hooks/
│   ├── useProduct.ts
│   └── useProducts.ts
├── services/
│   └── product.service.ts
├── stores/
│   └── cart.store.ts
├── types/
├── pages/
│   ├── Cart.tsx
│   ├── Home.tsx
│   ├── Shop.tsx
│   └── SingleProduct.tsx
└── utils/
```

### Notes

- Home uses `Hero`, `CategoriesGrid`, `ProductGrid`, `RoomCarousel`, and `Mosaic`.
- Shop page displays filters, sorting, and pagination using `useProducts`.
- Single product page combines gallery, info, details, and related products.
- Cart state is stored in `localStorage` via Zustand.

## Português

### Visão geral

- React 19 + TypeScript
- Vite para bundling de desenvolvimento
- Tailwind CSS para estilos utilitários
- Zustand para estado persistente do carrinho
- React Router para navegação
- Zod para validação dos dados de produto
- react-hot-toast para notificações

### Como usar

1. Instalar dependências:

```bash
cd desafio2/frontend
npm install
```

2. Configurar variáveis de ambiente:

```bash
cp .env.example .env
```

Variáveis principais:

- `VITE_API_URL`: URL da API backend
- `VITE_CLOUDINARY_BASE_URL`: base pública das imagens

3. Executar localmente:

No terminal, inicie a aplicação:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

### Scripts

- `npm run dev` - inicia o servidor Vite
- `npm run build` - compila para produção
- `npm run lint` - executa ESLint
- `npm run preview` - pré-visualiza o build

### Rotas

- `/` - Home
- `/shop` - Loja principal
- `/shop/:category` - Loja filtrada por categoria
- `/product/:id` - Produto por ID
- `/product/slug/:slug` - Produto por slug
- `/cart` - Carrinho

### Arquitetura

#### Hooks

- `src/hooks/useProducts.ts` - busca produtos com paginação, filtro, ordenação e total
- `src/hooks/useProduct.ts` - busca produto por `id` ou `slug`

#### Estado do carrinho

- `src/stores/cart.store.ts` - estado persistente do carrinho com Zustand, com ações para adicionar, remover, atualizar itens e calcular totais

#### Consumo de API

- `src/services/product.service.ts` - busca produtos e produto único com tratamento de erros e validação Zod
- `src/config/env.ts` - define URLs via `import.meta.env`

### Estrutura

```text
src/
├── App.tsx
├── main.tsx
├── layout.tsx
├── components/
│   ├── Benefits/
│   ├── BreadCrumb/
│   ├── Carousel/
│   ├── Cart/
│   ├── Categories/
│   ├── Container/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── Mosaic/
│   ├── Pagination/
│   ├── ProductDetails/
│   ├── ProductGallery.tsx
│   ├── ProductGrid/
│   ├── ProductInfo/
│   ├── RelatedProducts.tsx
│   ├── ScrollToTop/
│   ├── Shop/
│   ├── ShopToolBar/
│   └── Status/
├── config/
│   └── env.ts
├── hooks/
│   ├── useProduct.ts
│   └── useProducts.ts
├── services/
│   └── product.service.ts
├── stores/
│   └── cart.store.ts
├── types/
├── pages/
│   ├── Cart.tsx
│   ├── Home.tsx
│   ├── Shop.tsx
│   └── SingleProduct.tsx
└── utils/
```

### Observações

- A home usa `Hero`, `CategoriesGrid`, `ProductGrid`, `RoomCarousel` e `Mosaic`.
- A página de shop exibe filtros, ordenação e paginação usando `useProducts`.
- O produto único combina galeria, informações, detalhes e produtos relacionados.
- O carrinho fica salvo no `localStorage` via Zustand.

## Authors / Autores

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)