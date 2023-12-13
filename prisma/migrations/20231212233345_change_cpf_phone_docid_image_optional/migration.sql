/*
  Warnings:

  - Made the column `birth_date` on table `Owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Owner` MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `cpf` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `doc_id` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;
