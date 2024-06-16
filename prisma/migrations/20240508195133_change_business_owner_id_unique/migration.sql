/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Business_ownerId_key" ON "Business"("ownerId");
