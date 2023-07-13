import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookingRepositories } from 'src/models/booking.repo';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { ForbiddenError } from '@nestjs/apollo';
import { DbService } from 'src/providers/database/db';
import { RescheduleRequestRepositories } from 'src/models/requestReschedule.repo';
import { RescheduleRequest } from './entities/recheduleRequest.entity';

@Injectable()
export class BookingService {
  constructor(
    private readonly db: DbService,
    private readonly bookingRepo: BookingRepositories,
    private readonly rescheduleRequestRepo: RescheduleRequestRepositories
  ) { }

  async create(user: JwtPayload, createBookingDto: Prisma.BookingCreateInput) {
    const userBooking = await this.bookingRepo.findMany({
      where: {
        userId: user.sub,
      }
    });
    if (userBooking.length > 0)
      throw new ForbiddenError("You already have a booking");
    return await this.bookingRepo.create(createBookingDto);
  }

  async findAll(args: Prisma.BookingFindManyArgs) {
    return await this.bookingRepo.findMany({
      where: {
        OR: [
          { time: { gte: new Date() } },
          { OR: [{ state: 'FINISHED' }, { state: 'TERMINATED' }] }
        ],
        ...args
      }
    });
  }

  async findById(id: number) {
    return await this.bookingRepo.findById(id);
  }

  async reschedule(id: number, time: Date) {
    const { state } = await this.findById(id);
    if (state === "FINISHED" || state === "TERMINATED" || state === "NEED_RESCHEDULE")
      throw new ForbiddenError("You can't update a finished or terminated booking or a booking that need reschedule");
    const [rescheduleRequest, _] = await this.db.$transaction([
      this.rescheduleRequestRepo.create({ booking: { connect: { id } }, time }),
      this.bookingRepo.update(id, { state: "NEED_RESCHEDULE" })
    ])
    return rescheduleRequest
  }

  async acceptReschedule(id: number) {
    const { state } = await this.findById(id);
    if (state !== "NEED_RESCHEDULE")
      throw new ForbiddenError("You can't accept a booking that doesn't need reschedule");
    const [_, booking] = await this.db.$transaction([
      this.rescheduleRequestRepo.delete(id),
      this.bookingRepo.update(id, { state: "BOOKED" })
    ])
    return booking
  }

  async terminate(id: string) {
    const { id: bookingId, state } = (await this.findAll({ where: { userId: id } }))[0];
    if (state === "FINISHED" || state === "TERMINATED")
      throw new ForbiddenError("You can't terminate a finished or terminated booking");
    return await this.bookingRepo.update(bookingId, {
      state: "TERMINATED"
    });
  }
}
