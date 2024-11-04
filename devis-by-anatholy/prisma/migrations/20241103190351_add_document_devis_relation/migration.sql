/*
  Warnings:

  - Added the required column `userId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientId` on table `Devis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `documentId` on table `Devis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numDevis` on table `Devis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Devis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Devis" ALTER COLUMN "clientId" SET NOT NULL,
ALTER COLUMN "clientId" DROP DEFAULT,
ALTER COLUMN "documentId" SET NOT NULL,
ALTER COLUMN "documentId" DROP DEFAULT,
ALTER COLUMN "numDevis" SET NOT NULL,
ALTER COLUMN "numDevis" DROP DEFAULT,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
