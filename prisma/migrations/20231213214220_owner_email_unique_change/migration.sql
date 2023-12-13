/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Owner` ALTER COLUMN `email` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Company_cnpj_key` ON `Company`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `Owner_email_key` ON `Owner`(`email`);
