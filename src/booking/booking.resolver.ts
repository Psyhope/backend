import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { RescheduleRequest } from './entities/recheduleRequest.entity';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService, private readonly userRepo: UserRepositories) { }

  @Mutation(() => Booking)
  @UseGuards(LoggedIn)
  createBooking(@CurrentUser() user: JwtPayload, @Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.create({
      ...createBookingInput,
      user: {
        connect: {
          id: user.sub
        }
      }
    });
  }

  @Query(() => [Booking], { name: 'booking' })
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

  // @Query(() => Booking, { name: 'booking' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookingService.findOne(id);
  // }

  @Mutation(() => Booking)
  updateBooking(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
    return this.bookingService.update(updateBookingInput.id, updateBookingInput);
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.remove(id);
  }

  @Mutation(() => RescheduleRequest)
  rescheduleBooking(@CurrentUser() user: JwtPayload, @Args('id', { type: () => Int }) id: number) {
    const booking = this.bookingService.findOne(id);
  }
}
