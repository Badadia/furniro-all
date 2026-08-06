/*
  Warnings:

  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "additionalImages" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "sizes" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" (
    "additionalImages",
    "additionalInfo",
    "category",
    "colors",
    "createdAt",
    "description",
    "discount",
    "fullDescription",
    "id",
    "image",
    "isNew",
    "name",
    "price",
    "sizes",
    "sku",
    "slug",
    "updatedAt"
)
SELECT
    "additionalImages",
    "additionalInfo",
    "category",
    "colors",
    "createdAt",
    "description",
    "discount",
    "fullDescription",
    "id",
    "image",
    "isNew",
    "name",
    "price",
    "sizes",
    "sku",
    LOWER(REPLACE(REPLACE("name", ' ', '-'), '.', '')),
    "updatedAt"
FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
