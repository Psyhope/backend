/*
  Warnings:

  - Added the required column `counselor_type` to the `Councelor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Councelor" ADD COLUMN     "counselor_type" "CounselorType" NOT NULL;
