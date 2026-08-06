# Desafio 2 — Furniro (AWS FDE Node.js + React)

Este repositório contém o desafio 2 da Fase 2 do programa AWS FDE Node.js + React da Compass UOL AI/R. O projeto inclui duas partes principais:

- `backend/` — API RESTful em Node.js, Express, TypeScript e Prisma
- `frontend/` — aplicação React + TypeScript com Vite, Tailwind

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Backend](#backend) &nbsp;•&nbsp;
[Frontend](#frontend) &nbsp;•&nbsp;
[Arquitetura](#arquitetura) &nbsp;•&nbsp;
[Autores](#autores)

[Overview](#overview) &nbsp;•&nbsp;
[Backend](#backend-1) &nbsp;•&nbsp;
[Frontend](#frontend-1) &nbsp;•&nbsp;
[Architecture](#architecture) &nbsp;•&nbsp;
[Authors](#authors)

</div>

---

## Português

## Visão geral

O desafio consiste em uma API backend e um frontend conectado, construídos para um e-commerce de móveis. O backend usa SQLite via Prisma, e o frontend consome dados pela API.

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

- `GET /products`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

O endpoint `GET /products` suporta filtros e paginação por meio de query params como `category`, `_page`, `_limit`, `_sort` e `_order`.

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


### Como rodar os testes e observar a cobertura 

```bash
npm run test:coverage 
```

### Principais rotas

- `/` — Home
- `/shop` — Loja
- `/shop/:category` — Loja por categoria
- `/product/:id` — Produto por ID
- `/product/slug/:slug` — Produto por slug
- `/cart` — Carrinho

## Arquitetura

### Backend

Organizado em camadas para facilitar a manutenção:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/exceptions`

### Frontend

Principais pastas:

- `src/components`
- `src/hooks`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Autores

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)

---

## English

## Overview

This challenge consists of a backend API and a connected frontend built for a furniture e-commerce. The backend uses SQLite via Prisma, and the frontend consumes data either from the API.

## Backend

### How to run

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

The API will be available at:

```txt
http://localhost:3000
```

### Main endpoints

- `GET /products`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

The `GET /products` endpoint supports filtering and pagination through query params such as `category`, `_page`, `_limit`, `_sort`, and `_order`.

## Frontend

### How to run

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```



### How to run Tests and see coverage

```bash
npm run test:coverage 
```

### Main routes

- `/` — Home
- `/shop` — Shop
- `/shop/:category` — Shop by category
- `/product/:id` — Product by ID
- `/product/slug/:slug` — Product by slug
- `/cart` — Cart

## Architecture

### Backend

Organized in layers for maintainability:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/exceptions`

### Frontend

Main folders:

- `src/components`
- `src/hooks`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Authors

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)
