/*
  Warnings:

  - You are about to drop the column `workDay` on the `Councelor` table. All the data in the column will be lost.
  - You are about to drop the column `workTime` on the `Councelor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Councelor" DROP COLUMN "workDay",
DROP COLUMN "workTime";

-- CreateTable
CREATE TABLE "CouncelorSchedule" (
    "id" SERIAL NOT NULL,
    "councelorId" INTEGER,
    "workDay" TEXT NOT NULL,
    "workTime" TEXT[],

    CONSTRAINT "CouncelorSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CouncelorSchedule" ADD CONSTRAINT "CouncelorSchedule_councelorId_fkey" FOREIGN KEY ("councelorId") REFERENCES "Councelor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
