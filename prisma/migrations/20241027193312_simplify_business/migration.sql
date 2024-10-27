/*
  Warnings:

  - You are about to drop the column `description` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the `FavoriteFranchises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Models` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteFranchises" DROP CONSTRAINT "FavoriteFranchises_businessId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteFranchises" DROP CONSTRAINT "FavoriteFranchises_userId_fkey";

-- DropForeignKey
ALTER TABLE "Models" DROP CONSTRAINT "Models_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "sector",
DROP COLUMN "site",
DROP COLUMN "videos";

-- DropTable
DROP TABLE "FavoriteFranchises";

-- DropTable
DROP TABLE "Models";
