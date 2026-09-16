/*
  Warnings:

  - You are about to drop the column `product_id` on the `product_badges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_badges" DROP CONSTRAINT "product_badges_product_id_fkey";

-- AlterTable
ALTER TABLE "product_badges" DROP COLUMN "product_id";

-- CreateTable
CREATE TABLE "product_badges_on_products" (
    "product_id" TEXT NOT NULL,
    "badge_id" TEXT NOT NULL,

    CONSTRAINT "product_badges_on_products_pkey" PRIMARY KEY ("product_id","badge_id")
);

-- AddForeignKey
ALTER TABLE "product_badges_on_products" ADD CONSTRAINT "product_badges_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_badges_on_products" ADD CONSTRAINT "product_badges_on_products_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "product_badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
