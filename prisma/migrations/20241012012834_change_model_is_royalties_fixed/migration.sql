/*
  Warnings:

  - Changed the type of `royalties_isFixed` on the `Models` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Models" DROP COLUMN "royalties_isFixed",
ADD COLUMN     "royalties_isFixed" BOOLEAN NOT NULL;
