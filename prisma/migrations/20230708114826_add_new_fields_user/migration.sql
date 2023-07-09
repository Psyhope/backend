-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "igAcc" TEXT,
ADD COLUMN     "lineAcc" TEXT;
