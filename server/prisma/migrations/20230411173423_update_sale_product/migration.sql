-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SaleProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_SaleProduct" ("created_at", "id", "productId", "quantity", "saleId", "updated_at") SELECT "created_at", "id", "productId", "quantity", "saleId", "updated_at" FROM "SaleProduct";
DROP TABLE "SaleProduct";
ALTER TABLE "new_SaleProduct" RENAME TO "SaleProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
