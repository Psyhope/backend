-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('TOPIC_1', 'TOPIC_2', 'TOPIC_3');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "blacklist" TEXT[],
ADD COLUMN     "bookingTopic" "Topic"[],
ADD COLUMN     "councelorId" INTEGER,
ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Councelor" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "workDay" TEXT[],
    "workTime" TEXT[],
    "isOn" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Councelor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Councelor_userId_key" ON "Councelor"("userId");

-- AddForeignKey
ALTER TABLE "Councelor" ADD CONSTRAINT "Councelor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_councelorId_fkey" FOREIGN KEY ("councelorId") REFERENCES "Councelor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
