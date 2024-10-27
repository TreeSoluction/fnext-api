/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Owner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Owner_cpf_key";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "birth_date",
DROP COLUMN "cpf";
