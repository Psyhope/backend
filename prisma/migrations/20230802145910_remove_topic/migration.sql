/*
  Warnings:

  - You are about to drop the column `bookingTopic` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingTopic";

-- DropEnum
DROP TYPE "Topic";
