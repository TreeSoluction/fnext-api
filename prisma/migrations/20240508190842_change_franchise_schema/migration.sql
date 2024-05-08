/*
  Warnings:

  - You are about to drop the column `brazilUnits` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `companyHeadquarters` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `completeRegister` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `haveAPlan` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `minimumInvestment` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyBilling` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `observationNotes` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `returnValue` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `royalty` on the `Business` table. All the data in the column will be lost.
  - Added the required column `ROI_max` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ROI_min` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `average_monthly_billing` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headquarters` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units_in_brazil` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videos` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "brazilUnits",
DROP COLUMN "cnpj",
DROP COLUMN "companyHeadquarters",
DROP COLUMN "completeRegister",
DROP COLUMN "creation_date",
DROP COLUMN "haveAPlan",
DROP COLUMN "minimumInvestment",
DROP COLUMN "monthlyBilling",
DROP COLUMN "observationNotes",
DROP COLUMN "phone",
DROP COLUMN "returnValue",
DROP COLUMN "royalty",
ADD COLUMN     "ROI_max" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ROI_min" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "average_monthly_billing" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "headquarters" TEXT NOT NULL,
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "site" TEXT NOT NULL,
ADD COLUMN     "units_in_brazil" INTEGER NOT NULL,
ADD COLUMN     "videos" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Models" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capital_for_instalation" DOUBLE PRECISION NOT NULL,
    "capital_for_instalation_isFixed" BOOLEAN NOT NULL,
    "working_capital" DOUBLE PRECISION NOT NULL,
    "working_capital_isFixed" BOOLEAN NOT NULL,
    "franchise_fee" DOUBLE PRECISION NOT NULL,
    "franchise_fee_isFixed" BOOLEAN NOT NULL,
    "marketing_fee" DOUBLE PRECISION NOT NULL,
    "marketing_fee_isFixed" BOOLEAN NOT NULL,
    "has_store_area" BOOLEAN NOT NULL,
    "store_area_min" DOUBLE PRECISION,
    "store_area_max" DOUBLE PRECISION,
    "royalties" DOUBLE PRECISION NOT NULL,
    "royalties_IsFixed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
