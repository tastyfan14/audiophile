/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductBadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductGallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductInclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductRecommendation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductBadge" DROP CONSTRAINT "ProductBadge_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFeature" DROP CONSTRAINT "ProductFeature_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductGallery" DROP CONSTRAINT "ProductGallery_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInclude" DROP CONSTRAINT "ProductInclude_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRecommendation" DROP CONSTRAINT "ProductRecommendation_productId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductBadge";

-- DropTable
DROP TABLE "ProductFeature";

-- DropTable
DROP TABLE "ProductGallery";

-- DropTable
DROP TABLE "ProductInclude";

-- DropTable
DROP TABLE "ProductRecommendation";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "desc" VARCHAR(1000) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_badges" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "product_id" TEXT,

    CONSTRAINT "product_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_features" (
    "id" TEXT NOT NULL,
    "desc" VARCHAR(1000) NOT NULL,
    "product_id" TEXT,

    CONSTRAINT "product_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_includes" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_includes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_gallery" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "laptop" TEXT NOT NULL,
    "Desktop" TEXT NOT NULL,
    "alt" VARCHAR(100) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_recommendations" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_badges" ADD CONSTRAINT "product_badges_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_includes" ADD CONSTRAINT "product_includes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_gallery" ADD CONSTRAINT "product_gallery_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_recommendations" ADD CONSTRAINT "product_recommendations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
