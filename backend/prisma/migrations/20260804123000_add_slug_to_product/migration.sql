UPDATE "Product" SET "slug" = LOWER(REPLACE(REPLACE(name, ' ', '-'), '.', '')) WHERE "slug" = '' OR "slug" IS NULL;
