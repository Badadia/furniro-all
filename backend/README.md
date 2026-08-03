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

## Entidade `Product` (Schema)

- `id`: UUID (Chave primária)
- `sku`: Código SKU único
- `name`: Nome do produto
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
