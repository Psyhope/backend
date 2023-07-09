/*
  Warnings:

  - Added the required column `closestKnown` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_1` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_10` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_11` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_12` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_2` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_3` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_4` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_5` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_6` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_7` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_8` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_9` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonApply` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "closestKnown" BOOLEAN NOT NULL,
ADD COLUMN     "number_1" INTEGER NOT NULL,
ADD COLUMN     "number_10" INTEGER NOT NULL,
ADD COLUMN     "number_11" INTEGER NOT NULL,
ADD COLUMN     "number_12" INTEGER NOT NULL,
ADD COLUMN     "number_2" INTEGER NOT NULL,
ADD COLUMN     "number_3" INTEGER NOT NULL,
ADD COLUMN     "number_4" INTEGER NOT NULL,
ADD COLUMN     "number_5" INTEGER NOT NULL,
ADD COLUMN     "number_6" INTEGER NOT NULL,
ADD COLUMN     "number_7" INTEGER NOT NULL,
ADD COLUMN     "number_8" INTEGER NOT NULL,
ADD COLUMN     "number_9" INTEGER NOT NULL,
ADD COLUMN     "reasonApply" TEXT NOT NULL;
