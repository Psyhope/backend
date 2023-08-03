/*
  Warnings:

  - The `infograficUrl` column on the `Infografic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Infografic" DROP COLUMN "infograficUrl",
ADD COLUMN     "infograficUrl" TEXT[];
