-- CreateTable
CREATE TABLE "FavoriteFranchises" (
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "FavoriteFranchises_pkey" PRIMARY KEY ("userId","businessId")
);

-- AddForeignKey
ALTER TABLE "FavoriteFranchises" ADD CONSTRAINT "FavoriteFranchises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteFranchises" ADD CONSTRAINT "FavoriteFranchises_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
