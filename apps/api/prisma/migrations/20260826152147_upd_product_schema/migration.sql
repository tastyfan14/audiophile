/*
  Warnings:

  - You are about to drop the column `Desktop` on the `product_gallery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id,recommendation_id]` on the table `product_recommendations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `product_id` on table `product_badges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `product_features` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `desktop` to the `product_gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendation_id` to the `product_recommendations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_badges" DROP CONSTRAINT "product_badges_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_features" DROP CONSTRAINT "product_features_product_id_fkey";

-- AlterTable
ALTER TABLE "product_badges" ALTER COLUMN "product_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_features" ALTER COLUMN "product_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_gallery" DROP COLUMN "Desktop",
ADD COLUMN     "desktop" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_recommendations" ADD COLUMN     "recommendation_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "stock" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "product_recommendations_product_id_recommendation_id_key" ON "product_recommendations"("product_id", "recommendation_id");

-- AddForeignKey
ALTER TABLE "product_badges" ADD CONSTRAINT "product_badges_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_recommendations" ADD CONSTRAINT "product_recommendations_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
