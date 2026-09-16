/*
  Warnings:

  - You are about to drop the column `label` on the `product_categories` table. All the data in the column will be lost.
  - Added the required column `shortTitle` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "label";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "shortTitle" VARCHAR(25) NOT NULL;
