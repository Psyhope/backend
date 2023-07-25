/*
  Warnings:

  - You are about to drop the column `counselor_type` on the `Councelor` table. All the data in the column will be lost.
  - Added the required column `counselorType` to the `Councelor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Councelor" DROP COLUMN "counselor_type",
ADD COLUMN     "counselorType" "CounselorType" NOT NULL;
