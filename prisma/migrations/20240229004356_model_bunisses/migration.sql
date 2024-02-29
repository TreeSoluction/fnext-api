/*
  Warnings:

  - You are about to drop the column `modelBusiness` on the `Startup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "modelBusiness";

-- CreateTable
CREATE TABLE "ModelOfBusiness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capitalForInstallation" DOUBLE PRECISION NOT NULL,
    "franchiseFee" DOUBLE PRECISION NOT NULL,
    "workingCapital" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "startupId" INTEGER NOT NULL,

    CONSTRAINT "ModelOfBusiness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModelOfBusiness" ADD CONSTRAINT "ModelOfBusiness_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
