/*
  Warnings:

  - You are about to drop the column `state` on the `Booking` table. All the data in the column will be lost.
  - The `workTime` column on the `CouncelorSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bookingId` to the `CounselingLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `CounselingLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "state",
ADD COLUMN     "adminAcc" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bookingDay" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bookingTime2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isTerminated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "bookingTime" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CouncelorSchedule" DROP COLUMN "workTime",
ADD COLUMN     "workTime" TEXT[];

-- AlterTable
ALTER TABLE "CounselingLog" ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "BookingState";

-- AddForeignKey
ALTER TABLE "CounselingLog" ADD CONSTRAINT "CounselingLog_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
