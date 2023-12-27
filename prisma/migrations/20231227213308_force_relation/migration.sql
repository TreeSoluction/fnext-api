/*
  Warnings:

  - Made the column `userId` on table `Investor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Startup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Investor` DROP FOREIGN KEY `Investor_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Startup` DROP FOREIGN KEY `Startup_userId_fkey`;

-- AlterTable
ALTER TABLE `Investor` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Startup` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Investor` ADD CONSTRAINT `Investor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Startup` ADD CONSTRAINT `Startup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
