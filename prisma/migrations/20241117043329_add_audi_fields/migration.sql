/*
  Warnings:

  - Added the required column `createdBy` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedDate` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedBy" TEXT,
ADD COLUMN     "modifiedDate" TIMESTAMP(3) NOT NULL;
