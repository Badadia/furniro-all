# BACKEND do Furniro

API RESTful para a aplicação Furniro desenvolvida com Node.js, Express, TypeScript, Prisma ORM e SQLite.

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Como rodar](#como-rodar-o-backend-localmente) &nbsp;•&nbsp;
[Banco de dados](#banco-de-dados-e-prisma-orm-sqlite) &nbsp;•&nbsp;
[Modo dev](#executar-a-api-em-modo-de-desenvolvimento) &nbsp;•&nbsp;
[Docker](#executar-a-api-com-docker) &nbsp;•&nbsp;
[Endpoints](#endpoints-principais) &nbsp;•&nbsp;
[Arquitetura](#estrutura-de-arquitetura) &nbsp;•&nbsp;
[Entidade Product](#entidade-product-schema) &nbsp;•&nbsp;
[Autores](#autores--authors)

[How to run](#how-to-run-the-backend-locally) &nbsp;•&nbsp;
[Database](#database-and-prisma-orm-sqlite) &nbsp;•&nbsp;
[Dev mode](#running-the-api-in-development-mode) &nbsp;•&nbsp;
[Docker](#running-the-api-with-docker) &nbsp;•&nbsp;
[Endpoints](#main-endpoints) &nbsp;•&nbsp;
[Architecture](#architecture-overview) &nbsp;•&nbsp;
[Product entity](#product-entity-schema) &nbsp;•&nbsp;
[Authors](#authors--autores)

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
npx prisma migrate dev --name init
```

_ou utilize o script atalho:_

```bash
npm run db:migrate
```

### Executar o Seed (Carga Inicial de Dados com Cloudinary)

Para popular o banco SQLite com os produtos de demonstração do Figma e imagens hospedadas no Cloudinary:

```bash
npx prisma db seed
```

_ou utilize o script atalho:_

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

## Executar a API com Docker

### 1. Criar o arquivo de ambiente

Antes de subir o container, crie o arquivo `.env` com as variáveis necessárias, copiando o arquivo de exemplo:

```bash
cp .env.example .env
```

### 2. Construir a imagem Docker

No diretório do backend, execute:

```bash
docker build -t api-furniro .
```

### 3. Rodar o container

```bash
docker run -p 3000:3000 --name api-furniro --env-file .env -d api-furniro
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### 4. Verificar o container

```bash
docker ps -a
```

### 5. Parar e remover o container

```bash
docker stop api-furniro
docker rm api-furniro
```

---

## Endpoints principais

### Produtos

- `GET /products` — lista produtos com paginação, filtro por categoria e ordenação
- `GET /products/:id` — busca um produto por id
- `GET /products/slug/:slug` — busca um produto por slug
- `POST /products` — cria um produto
- `PUT /products/:id` — atualiza um produto
- `DELETE /products/:id` — remove um produto

### Query params suportados na listagem

A rota `GET /products` aceita os seguintes parâmetros:

- `category` — filtra por categoria, por exemplo: `?category=dining`
- `_page` — número da página para paginação, por exemplo: `?_page=2`
- `_limit` — quantidade de itens por página, por exemplo: `?_limit=12`
- `_sort=price` — ordenação por preço
- `_order=asc|desc` — direção da ordenação

Exemplos:

```text
/products?category=dining
/products?_page=2&_limit=12
/products?_sort=price&_order=asc
/products?category=living&_page=1&_limit=8&_sort=price&_order=desc
```

---

## Mudanças recentes

- Implementação da listagem paginada em `GET /products`
- Suporte a filtro por categoria
- Suporte a ordenação por preço com `_sort=price` e `_order=asc|desc`
- Adição do campo `slug` para melhor compatibilidade com URLs amigáveis
- Separação de rotas para detalhe por `id` e por `slug`

---

## Estrutura de arquitetura

O backend segue uma organização em camadas para facilitar manutenção e evolução:

- `src/controllers` — recebe as requisições HTTP e delega a lógica
- `src/services` — concentra a regra de negócio e validações
- `src/repositories` — implementa o acesso aos dados
- `src/routes` — define as rotas da API
- `src/factories` — cria as dependências entre controller, service e repository
- `src/model` — define os tipos e contratos usados no projeto
- `src/exceptions` — centraliza erros personalizados da aplicação

Essa separação permite trocar a implementação do repositório sem impactar o restante do sistema.

---

## Entidade `Product` (Schema)

- `id`: UUID (Chave primária)
- `sku`: Código SKU único
- `name`: Nome do produto
- `slug`: Identificador amigável para URLs
- `category`: Categoria (`"Dining"` | `"Living"` | `"Bedroom"`)
- `price`: Preço numérico
- `discount`: Porcentagem de desconto
- `description`: Descrição curta (para os cards)
- `fullDescription`: Descrição longa (para os detalhes)
- `additionalInfo`: Informações adicionais de especificações
- `image`: URL pública da foto principal no Cloudinary
- `additionalImages`: Array JSON serializado com URLs da galeria no Cloudinary
- `colors`: Array JSON serializado com opções de cores (ex: `["#816DFA", "#000000"]`)
- `sizes`: Array JSON serializado com opções de tamanhos (ex: `["L", "XL", "XS"]`)
- `isNew`: Indicador booleano de novidade

### Formato esperado para criação/atualização (exemplos)

OBS: os campos `additionalImages`, `colors` e `sizes` são armazenados no banco como *string* contendo um JSON serializado (veja `prisma/seed.ts`); por isso, o payload de exemplo abaixo exibe esses campos como strings JSON.

Exemplo de payload para `POST /products` (criação):

```json
{
	"sku": "SS010",
	"name": "Example Chair",
	"slug": "example-chair",
	"category": "Dining",
	"price": 129900.0,
	"discount": 10,
	"description": "Comfortable dining chair",
	"fullDescription": "Detailed description here...",
	"additionalInfo": "Dimensions: ...",
	"image": "ExampleChair.png",
	"additionalImages": "[\"ExampleChair1.png\", \"ExampleChair2.png\"]",
	"colors": "[\"#FFFFFF\", \"#000000\"]",
	"sizes": "[\"S\", \"M\"]",
	"isNew": false
}
```

Exemplo de payload para `PUT /products/:id` (atualização parcial):

```json
{
	"price": 119900.0,
	"discount": 5,
	"isNew": true
}
```

### Resposta de listagem paginada (`GET /products`)

O endpoint de listagem retorna um objeto com o formato abaixo:

```json
{
	"data": [ /* array de produtos (mesmo shape do schema) */ ],
	"total": 123,
	"page": 1,
	"totalPages": 11
}
```

### Filtros, paginação e ordenação (detalhes)

O endpoint `GET /products` aceita parâmetros via query string. O controller também aceita alguns sinônimos para conveniência:

- `category` — filtra por categoria (ex.: `?category=dining` ou `?category=Dining`). Valores esperados: `Dining`, `Living`, `Bedroom` (não é case-sensitive no match).
- `page` ou `_page` — número da página (default: `1`).
- `limit` ou `_limit` — itens por página (default: `12`, máximo permitido: `100`).
- `sort`, `sortBy` ou `_sort` — campo de ordenação. Atualmente a API suporta ordenação por preço usando `price`, `price_asc` ou `price_desc`.
- `order` ou `_order` — direção quando usado com `sort=price`: `asc` ou `desc`.

Exemplos válidos de uso para ordenação:

- `?_sort=price&_order=asc`
- `?sort=price&order=desc`
- `?sort=price_asc` (equivalente)
- `?sort=price_desc` (equivalente)

Observação: se `limit` for maior que `100`, a API retornará erro 400.

---

## Autores / Authors

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)

---

## English

## How to Run the Backend Locally

### 1. Clone the project and install dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a copy of the `.env.example` file named `.env`:

```bash
cp .env.example .env
```

---

## Database and Prisma ORM (SQLite)

### Run the Migrations

To apply the schema migrations and create the physical database `prisma/dev.db`:

```bash
npx prisma migrate dev --name init
```

_or use the shortcut script:_

```bash
npm run db:migrate
```

### Run the Seed (Initial Data Load with Cloudinary)

To populate the SQLite database with the demo products from Figma and images hosted on Cloudinary:

```bash
npx prisma db seed
```

_or use the shortcut script:_

```bash
npm run db:seed
```

---

## Running the API in Development Mode

```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

---

## Running the API with Docker

### 1. Create the environment file

Before starting the container, create the `.env` file with the required variables by copying the example file:

```bash
cp .env.example .env
```

### 2. Build the Docker image

From the backend directory, run:

```bash
docker build -t api-furniro .
```

### 3. Run the container

```bash
docker run -p 3000:3000 --name api-furniro --env-file .env -d api-furniro
```

The backend will be available at:

```text
http://localhost:3000
```

### 4. Check the container

```bash
docker ps -a
```

### 5. Stop and remove the container

```bash
docker stop api-furniro
docker rm api-furniro
```

---

## Main Endpoints

### Products

- `GET /products` — lists products with pagination, category filtering, and sorting
- `GET /products/:id` — fetches a product by id
- `GET /products/slug/:slug` — fetches a product by slug
- `POST /products` — creates a product
- `PUT /products/:id` — updates a product
- `DELETE /products/:id` — deletes a product

### Query params supported for listing

The `GET /products` route accepts the following parameters:

- `category` — filters by category, e.g.: `?category=dining`
- `_page` — page number for pagination, e.g.: `?_page=2`
- `_limit` — number of items per page, e.g.: `?_limit=12`
- `_sort=price` — sorting by price
- `_order=asc|desc` — sort direction

Examples:

```text
/products?category=dining
/products?_page=2&_limit=12
/products?_sort=price&_order=asc
/products?category=living&_page=1&_limit=8&_sort=price&_order=desc
```

---

## Recent Changes

- Implemented paginated listing on `GET /products`
- Added category filtering support
- Added price sorting support with `_sort=price` and `_order=asc|desc`
- Added the `slug` field for better compatibility with friendly URLs
- Split the routes for detail lookup by `id` and by `slug`

---

## Architecture Overview

The backend follows a layered organization to make maintenance and evolution easier:

- `src/controllers` — receives HTTP requests and delegates the logic
- `src/services` — holds the business rules and validations
- `src/repositories` — implements data access
- `src/routes` — defines the API routes
- `src/factories` — builds the dependencies between controller, service, and repository
- `src/model` — defines the types and contracts used in the project
- `src/exceptions` — centralizes the application's custom errors

This separation allows the repository implementation to be swapped without impacting the rest of the system.

---

## Product Entity (Schema)

- `id`: UUID (primary key)
- `sku`: Unique SKU code
- `name`: Product name
- `slug`: Friendly identifier for URLs
- `category`: Category (`"Dining"` | `"Living"` | `"Bedroom"`)
- `price`: Numeric price
- `discount`: Discount percentage
- `description`: Short description (for cards)
- `fullDescription`: Long description (for the detail page)
- `additionalInfo`: Additional specification info
- `image`: Public URL of the main photo on Cloudinary
- `additionalImages`: Serialized JSON array with gallery URLs on Cloudinary
- `colors`: Serialized JSON array with color options (e.g.: `["#816DFA", "#000000"]`)
- `sizes`: Serialized JSON array with size options (e.g.: `["L", "XL", "XS"]`)
- `isNew`: Boolean flag indicating a new product

### Expected format for creation/update (examples)

NOTE: the `additionalImages`, `colors`, and `sizes` fields are stored in the database as a *string* containing serialized JSON (see `prisma/seed.ts`); that's why the example payload below shows these fields as JSON strings.

Example payload for `POST /products` (creation):

```json
{
	"sku": "SS010",
	"name": "Example Chair",
	"slug": "example-chair",
	"category": "Dining",
	"price": 129900.0,
	"discount": 10,
	"description": "Comfortable dining chair",
	"fullDescription": "Detailed description here...",
	"additionalInfo": "Dimensions: ...",
	"image": "ExampleChair.png",
	"additionalImages": "[\"ExampleChair1.png\", \"ExampleChair2.png\"]",
	"colors": "[\"#FFFFFF\", \"#000000\"]",
	"sizes": "[\"S\", \"M\"]",
	"isNew": false
}
```

Example payload for `PUT /products/:id` (partial update):

```json
{
	"price": 119900.0,
	"discount": 5,
	"isNew": true
}
```

### Paginated listing response (`GET /products`)

The listing endpoint returns an object with the following shape:

```json
{
	"data": [ /* array of products (same shape as the schema) */ ],
	"total": 123,
	"page": 1,
	"totalPages": 11
}
```

### Filtering, pagination, and sorting (details)

The `GET /products` endpoint accepts parameters via the query string. The controller also accepts a few synonyms for convenience:

- `category` — filters by category (e.g.: `?category=dining` or `?category=Dining`). Expected values: `Dining`, `Living`, `Bedroom` (case-insensitive match).
- `page` or `_page` — page number (default: `1`).
- `limit` or `_limit` — items per page (default: `12`, maximum allowed: `100`).
- `sort`, `sortBy`, or `_sort` — sort field. Currently the API supports sorting by price using `price`, `price_asc`, or `price_desc`.
- `order` or `_order` — direction when used with `sort=price`: `asc` or `desc`.

Valid usage examples for sorting:

- `?_sort=price&_order=asc`
- `?sort=price&order=desc`
- `?sort=price_asc` (equivalent)
- `?sort=price_desc` (equivalent)

Note: if `limit` is greater than `100`, the API will return a 400 error.

---

## Authors / Autores

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)