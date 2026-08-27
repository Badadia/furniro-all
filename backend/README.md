# BACKEND — Furniro (Desafio 3)

API RESTful para a aplicação **Furniro** desenvolvida em Node.js, Express, TypeScript, Prisma ORM, SQLite e Autenticação JWT.

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Como rodar](#como-rodar-o-backend-localmente) &nbsp;•&nbsp;
[Banco de dados](#banco-de-dados-e-prisma-orm-sqlite) &nbsp;•&nbsp;
[Endpoints](#endpoints-principais) &nbsp;•&nbsp;
[Autenticação](#autenticação-jwt) &nbsp;•&nbsp;
[Arquitetura](#estrutura-de-arquitetura) &nbsp;•&nbsp;
[Autor](#autor--author)

[How to run](#how-to-run-the-backend-locally) &nbsp;•&nbsp;
[Database](#database-and-prisma-orm-sqlite) &nbsp;•&nbsp;
[Endpoints](#main-endpoints) &nbsp;•&nbsp;
[Authentication](#jwt-authentication) &nbsp;•&nbsp;
[Architecture](#architecture-overview) &nbsp;•&nbsp;
[Author](#author--autor)

</div>

---

## Português

## Como Rodar o Backend Localmente

### 1. Clonar o projeto e instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie uma cópia do arquivo `.env.example` nomeada como `.env`:

```bash
cp .env.example .env
```

---

## Banco de Dados e Prisma ORM (SQLite)

### Executar as Migrations

Para aplicar as migrações do schema e criar o banco físico `prisma/dev.db`:

```bash
npm run db:migrate
```

### Executar o Seed (Carga Inicial de Dados com Cloudinary)

Para popular o banco SQLite com os produtos de demonstração do Figma e imagens hospedadas no Cloudinary:

```bash
npm run db:seed
```

---

## Executar a API em Modo de Desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

---

## Endpoints Principais

### Autenticação (`/auth`)

- `POST /auth/register` — Cadastro de novo usuário (`name`, `email`, `password`)
- `POST /auth/login` — Autenticação de usuário com retorno de token JWT
- `GET /auth/me` — Dados do perfil do usuário autenticado (requer `Authorization: Bearer <token>`)

### Produtos (`/products`)

- `GET /products` — Lista produtos com paginação, filtro por categoria e ordenação por preço
- `GET /products/:id` — Busca um produto por ID
- `GET /products/slug/:slug` — Busca um produto por slug amigável
- `POST /products` — Cria um novo produto
- `PUT /products/:id` — Atualiza os dados de um produto
- `DELETE /products/:id` — Remove um produto

### Query params suportados na listagem

- `category` — filtra por categoria (ex.: `?category=dining`)
- `_page` ou `page` — número da página (default: `1`)
- `_limit` ou `limit` — quantidade de itens por página (default: `12`)
- `_sort=price` ou `sort=price` — ordenação por preço
- `_order=asc|desc` ou `order=asc|desc` — direção da ordenação

---

## Estrutura de Arquitetura

O backend segue o padrão em camadas (Layered Architecture):

- `src/controllers` — recebe as requisições HTTP e delega aos serviços
- `src/services` — concentra regras de negócio, criptografia de senhas e geração de tokens JWT
- `src/repositories` — implementa acesso aos dados via Prisma ORM
- `src/middlewares` — middleware de validação e proteção de token JWT (`authMiddleware`)
- `src/routes` — define as rotas da API (`authRouter`, `productRouter`)
- `src/factories` — instanciação e injeção de dependências
- `src/model` — contratos e DTOs de dados
- `src/exceptions` — tratamento centralizado de erros da aplicação

---

## Autor / Author

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))

---

## English

## How to Run the Backend Locally

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

The server will be running at `http://localhost:3000`.

### Main Endpoints

- `POST /auth/register` — User registration
- `POST /auth/login` — User login & JWT generation
- `GET /auth/me` — Current authenticated user profile
- `GET /products` — Paginated and filtered products list
- `GET /products/:id` — Product detail by ID
- `GET /products/slug/:slug` — Product detail by slug

---

## Author / Autor

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))