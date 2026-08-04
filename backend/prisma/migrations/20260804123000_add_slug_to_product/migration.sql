ALTER TABLE "Product" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';
UPDATE "Product" SET "slug" = LOWER(REPLACE(REPLACE(name, ' ', '-'), '.', '')) WHERE "slug" = '' OR "slug" IS NULL;
