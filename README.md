# Desafio 3 — Furniro (AWS FDE Node.js + React)

Este repositório contém o **Desafio 3 da Fase 2** do programa AWS FDE Node.js + React da Compass UOL AI/R. O projeto expande o e-commerce de móveis **Furniro** com autenticação JWT, rotas protegidas, gaveta lateral do carrinho (Cart Sidebar), integração com ViaCEP no Checkout, página de Contato e carrinho persistente com isolamento por usuário.

- `backend/` — API RESTful em Node.js, Express, TypeScript, Prisma ORM, SQLite e JWT
- `frontend/` — Aplicação React + TypeScript com Vite, Tailwind CSS, Zustand e React Hook Form

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Novas Funcionalidades](#novas-funcionalidades-etapa-3) &nbsp;•&nbsp;
[Backend](#backend) &nbsp;•&nbsp;
[Frontend](#frontend) &nbsp;•&nbsp;
[Testes Unitários](#testes-unitários-e-cobertura) &nbsp;•&nbsp;
[Autor](#autor--author)

[Overview](#overview) &nbsp;•&nbsp;
[New Features](#new-features-stage-3) &nbsp;•&nbsp;
[Backend](#backend-1) &nbsp;•&nbsp;
[Frontend](#frontend-1) &nbsp;•&nbsp;
[Tests & Coverage](#tests-and-coverage) &nbsp;•&nbsp;
[Author](#author--autor)

</div>

---

## Português

## Visão geral

O Furniro é uma plataforma completa de e-commerce de móveis desenvolvida com arquitetura moderna e escalável. O backend utiliza SQLite com Prisma ORM e autenticação via JWT, enquanto o frontend em React consome a API com rotas públicas e protegidas.

### Novas Funcionalidades (Etapa 3)

1. **🔐 Autenticação & JWT**:
   - Registro e Login de usuários com hash seguro de senhas via `bcryptjs`.
   - Emissão de tokens JWT com expiração de 7 dias e middleware de proteção (`authMiddleware`).
   - Gerenciamento de sessão persistida com Zustand (`useAuthStore`) e interceptor Axios automático.
2. **🛡️ Rotas Protegidas (`ProtectedRoute`)**:
   - As páginas `/checkout` e `/contact` são acessíveis apenas por usuários autenticados.
   - Redirecionamento automático para `/login` guardando a rota pretendida (`state.from`).
3. **🛍️ Cart Sidebar (Drawer Lateral)**:
   - Gaveta deslizante lateral acionada pelo ícone de carrinho no Header.
   - Scroll interno, exclusão rápida de itens, subtotal e atalhos para `/cart` e `/checkout`.
4. **📦 Checkout com ViaCEP**:
   - Validação com React Hook Form + Zod.
   - Autopreenchimento automático de endereço (Logradouro, Cidade, Estado e País) ao digitar o CEP.
   - Seleção de forma de pagamento obrigatória e finalização de pedido com Toast.
5. **📞 Página de Contato (`/contact`)**:
   - Dados de contato institucionais e formulário com validação de nome e e-mail.
6. **🛒 Carrinho Isolado por Usuário**:
   - Armazenamento individualizado para cada conta logada, com migração automática do carrinho de visitante ao realizar login e proteção de privacidade entre contas no mesmo navegador.

---

## Backend

### Como rodar

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

A API ficará disponível em:
```txt
http://localhost:3000
```

### Principais endpoints

- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login com retorno de token JWT
- `GET /auth/me` — Dados do usuário logado (requer `Authorization: Bearer <token>`)
- `GET /products` — Listagem paginada com filtros (`category`, `_page`, `_limit`, `_sort`, `_order`)
- `GET /products/:id` — Detalhes do produto por ID
- `GET /products/slug/:slug` — Detalhes do produto por slug

---

## Frontend

### Como rodar

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação ficará disponível em:
```txt
http://localhost:5173
```

### Principais rotas

- `/` — Home (Hero, Categorias, Destaques, Carrossel, Mosaico)
- `/shop` — Catálogo geral
- `/shop/:category` — Catálogo filtrado por categoria
- `/product/:id` ou `/product/slug/:slug` — Detalhes do produto
- `/cart` — Página do carrinho
- `/login` — Login e Cadastro
- `/checkout` — Checkout (Rota Protegida)
- `/contact` — Contato (Rota Protegida)

---

## Testes Unitários e Cobertura

Para rodar todos os testes automatizados com Vitest e Testing Library:

```bash
cd frontend
npm test
```

Para gerar o relatório de cobertura de código (**> 90% de cobertura**):

```bash
npm run test:coverage
```

---

## Autor / Author

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))

---

## English

## Overview

Furniro is a full-featured furniture e-commerce platform built with modern architecture. The backend uses SQLite with Prisma ORM and JWT authentication, while the React frontend consumes the API with public and protected routes.

### How to run Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

### How to run Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Running Tests & Coverage

```bash
cd frontend
npm run test:coverage
```

---

## Author / Autor

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))
