import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { RescheduleRequest } from './entities/recheduleRequest.entity';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { ForbiddenError } from '@nestjs/apollo';
import { PsyhopeCounselor } from 'src/guards/psyhopeCounselor.guard';
import { PsyhopeAdmin } from 'src/guards/psyhopeAdmin.guard';
import { FacultyAdmin } from 'src/guards/facultyAdmin.guard';
import { PeerCounselor } from 'src/guards/peerCounselor.guard';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService, private readonly userRepo: UserRepositories) { }

  @Mutation(() => Booking)
  @UseGuards(LoggedIn)
  createBooking(@CurrentUser() user: JwtPayload, @Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.create(user, {
      ...createBookingInput,
      user: {
        connect: {
          id: user.sub
        }
      }
    });
  }

  @Query(() => [Booking],
    {
      description: `
      Get all bookings based on the user's role,
      CLIENT: Get all bookings made by the user.
      FACULTY_ADMIN: Get all bookings made by the user's faculty.
      FACULTY_COUNSELOR: Get all bookings made by the user's faculty.
      PSYHOPE_ADMIN: Get all bookings.
      PSYHOPE_COUNSELOR: Get all bookings.
      `
    })
  @UseGuards(LoggedIn)
  async bookings(@CurrentUser() user: JwtPayload) {
    const { role } = user;
    const _user = await this.userRepo.findById(user.sub);
    switch (role) {
      case "CLIENT":
        return await this.bookingService.findAll({
          where: { userId: user.sub }
        })
      case "FACULTY_ADMIN":
      case "FACULTY_COUNSELOR":
        return await this.bookingService.findAll({
          where: {
            user: {
              account: {
                faculty: _user.account.faculty
              }
            }
          }
        })
      case "PSYHOPE_ADMIN":
      case "PSYHOPE_COUNSELOR":
        return await this.bookingService.findAll({});
    }
  }

  @Mutation(() => RescheduleRequest)
  @UseGuards(LoggedIn)
  async rescheduleBooking(
    @CurrentUser() user: JwtPayload,
    @Args('id', { type: () => Int }) id: number,
    @Args('date', { type: () => String }) date: string,
    @Args('time', { type: () => String }) time: string
  ) {
    const [day, month, year] = date.split('-');
    const isoDate = new Date(`${year}-${month}-${day}T${time}:00.000Z`);
    const newDate = new Date(isoDate);
    const booking = await this.bookingService.findById(id);
    if (user.role !== "CLIENT")
      throw new ForbiddenError("Only client can reschedule a booking");
    if (booking.userId !== user.sub)
      throw new ForbiddenError("You can't reschedule other's booking");
    return await this.bookingService.reschedule(booking.id, newDate);
  }

  @Mutation(() => Booking)
  @UseGuards(LoggedIn, PsyhopeCounselor, PsyhopeAdmin, FacultyAdmin, PeerCounselor)
  async acceptRescheduleRequest(
    @Args('id', { type: () => Int }) id: number
  ) {
    const { state } = await this.bookingService.findById(id);
    if (state !== "NEED_RESCHEDULE")
      throw new ForbiddenError("Only reschedule request can be accepted");
    return await this.bookingService.acceptReschedule(id)
  }


  @Mutation(() => Booking)
  @UseGuards(LoggedIn)
  terminateBooking(@CurrentUser() user: JwtPayload, @Args('id', { type: () => String }) id: string) {
    if (user.role !== "CLIENT")
      throw new ForbiddenError("Only client can terminate a booking");
    if (user.sub !== id)
      throw new ForbiddenError("You can't terminate other's booking");
    return this.bookingService.terminate(id);
  }
}
