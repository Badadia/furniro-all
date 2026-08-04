# BACKEND do Furniro

API RESTful para a aplicação Furniro desenvolvida com Node.js, Express, TypeScript, Prisma ORM e SQLite.

---

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
