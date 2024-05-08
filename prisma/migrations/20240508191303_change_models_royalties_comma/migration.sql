/*
  Warnings:

  - You are about to drop the column `royalties_IsFixed` on the `Models` table. All the data in the column will be lost.
  - Added the required column `royalties_isFixed` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Models" DROP COLUMN "royalties_IsFixed",
ADD COLUMN     "royalties_isFixed" DOUBLE PRECISION NOT NULL;
