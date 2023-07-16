-- CreateTable
CREATE TABLE "RescheduleRequest" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RescheduleRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounselingLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "CounselingLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RescheduleRequest" ADD CONSTRAINT "RescheduleRequest_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounselingLog" ADD CONSTRAINT "CounselingLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
