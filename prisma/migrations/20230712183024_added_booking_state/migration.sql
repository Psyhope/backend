-- CreateEnum
CREATE TYPE "BookingState" AS ENUM ('ACCEPTED', 'BOOKED', 'TERMINATED', 'NEED_RESCHEDULE', 'RESCHEDULED', 'FINISHED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "state" "BookingState" NOT NULL DEFAULT 'BOOKED';
