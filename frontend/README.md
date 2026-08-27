# FRONTEND — Furniro (Desafio 3)

Aplicação React + TypeScript criada com Vite, Tailwind CSS, Zustand e React Hook Form para o e-commerce de móveis **Furniro** (Desafio 3 da Fase 2 — AWS FDE Node.js + React da Compass UOL AI/R).

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Como rodar](#como-rodar-o-frontend) &nbsp;•&nbsp;
[Funcionalidades](#funcionalidades-chave) &nbsp;•&nbsp;
[Rotas](#rotas-da-aplicação) &nbsp;•&nbsp;
[Testes e Cobertura](#testes-unitários-e-cobertura) &nbsp;•&nbsp;
[Autor](#autor--author)

[Overview](#overview) &nbsp;•&nbsp;
[How to run](#how-to-run-the-frontend) &nbsp;•&nbsp;
[Features](#key-features) &nbsp;•&nbsp;
[Routes](#application-routes) &nbsp;•&nbsp;
[Tests & Coverage](#tests-and-coverage) &nbsp;•&nbsp;
[Author](#author--autor)

</div>

---

## Português

## Visão Geral

- **React 19 + TypeScript**
- **Vite** para compilação rápida e hot module replacement
- **Tailwind CSS** para estilização utilitária fiel ao Figma
- **Zustand** para gerenciamento de estado global com persistência no `localStorage` (carrinho isolado por usuário e sessão de autenticação)
- **React Router** para roteamento com guardas de rotas protegidas (`ProtectedRoute`)
- **React Hook Form + Zod** para gerenciamento e validação estrita de formulários
- **Axios** com interceptor automático para injeção do token JWT Bearer
- **React Hot Toast** para notificações elegantes ao usuário

---

## Como Rodar o Frontend

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Variáveis principais:
- `VITE_API_URL`: URL da API backend (padrão: `http://localhost:3000`)
- `VITE_CLOUDINARY_BASE_URL`: URL base das imagens no Cloudinary

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse em: `http://localhost:5173`.

---

## Funcionalidades Chave (Etapa 3)

1. **🔐 Autenticação e Sessão**:
   - Tela de Login e Cadastro (`/login`) com validação de campos.
   - Persistência de token JWT e dados do usuário logado.
   - Header dinâmico com badge do usuário e menu de logout.
2. **🛡️ Rotas Protegidas**:
   - `/checkout` e `/contact` redirecionam usuários não autenticados para `/login` salvando o redirecionamento pós-login.
3. **🛍️ Cart Sidebar (Drawer Lateral)**:
   - Visualização rápida dos itens, exclusão com botão `x`, subtotal e atalhos para `/cart` e `/checkout`.
4. **📦 Checkout com ViaCEP**:
   - Autopreenchimento automático de endereço ao digitar o CEP no campo "ZIP code".
   - Seleção de forma de pagamento obrigatória e finalização com Toast.
5. **🛒 Carrinho Isolado por Usuário**:
   - Carrinho individual para cada conta logada, com migração automática dos itens adicionados em modo visitante ao realizar login.

---

## Rotas da Aplicação

- `/` — Home (Hero, Categorias, Destaques, Carrossel, Mosaico)
- `/shop` — Catálogo geral com ordenação e paginação
- `/shop/:category` — Catálogo filtrado por categoria
- `/product/:id` ou `/product/slug/:slug` — Detalhes do produto
- `/cart` — Página completa do carrinho
- `/login` — Login e Cadastro de usuários
- `/checkout` — Checkout e finalização de pedido (Protegida)
- `/contact` — Contato e suporte (Protegida)

---

## Testes Unitários e Cobertura

Para executar todos os testes automatizados:

```bash
npm test
```

Para gerar relatório de cobertura (> 90% de cobertura):

```bash
npm run test:coverage
```

---

## Autor / Author

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))

---

## English

## Overview

Furniro is a modern e-commerce web application built with React 19, TypeScript, Vite, Tailwind CSS, and Zustand.

### How to Run the Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Tests and Coverage

```bash
npm run test:coverage
```

---

## Author / Autor

- **Bryan Belo** ([@Badadia](https://github.com/Badadia))