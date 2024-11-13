/*
  Warnings:

  - You are about to drop the column `votes` on the `Option` table. All the data in the column will be lost.
  - Added the required column `totalVotes` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "votes",
ADD COLUMN     "totalVotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "optionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
