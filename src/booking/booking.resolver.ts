import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { RescheduleRequest } from './entities/rescheduleRequest.entity';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { PeerCounselor } from 'src/guards/peerCounselor.guard';
import { PsyhopeCounselor } from 'src/guards/psyhopeCounselor.guard';
import { Councelor } from './entities/counselor.entity';
import { GetScheduleDTO } from './dto/getSchedule.input';
import { CouncelorSchedule } from './entities/councelorSchedule.entity';
import { RejectBookingDTO } from './dto/rejectBooking.input';
import { use } from 'passport';
import { AcceptBooking } from './dto/accept-booking.input';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService, private readonly userRepo: UserRepositories) { }

  @Mutation(() => Booking, {nullable: true })
  @UseGuards(LoggedIn)
  async createBooking(@CurrentUser() user: JwtPayload, @Args('createBookingInput') createBookingInput: CreateBookingInput) {
    const _user = await this.userRepo.findById(user.sub);
    return this.bookingService.create({
      ...createBookingInput,
      user: {
        connect: {
          id: user.sub
        }
      }
    },
    _user.account.faculty );
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

  @Query(() => [CouncelorSchedule], { name: 'schedule', nullable: true })
  @UseGuards(LoggedIn)
  async getSchedule(@CurrentUser() user: JwtPayload, @Args('getScheduleDTO') getScheduleDTO: GetScheduleDTO) {
    const _user = await this.userRepo.findById(user.sub);
    return await this.bookingService.getSchedule(getScheduleDTO.day, getScheduleDTO.counselorType, _user.account.faculty, getScheduleDTO.dayTime);
  }

  // @Query(() => Booking, { name: 'booking' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookingService.findOne(id);
  // }

  @Mutation(() => Booking)
  @UseGuards(LoggedIn)
  async rejectBooking(@Args('rejectBookingInput') rejectBookingInput: RejectBookingDTO, @CurrentUser() user: JwtPayload) {
    const _user = await this.userRepo.findById(user.sub);
    return this.bookingService.reject(rejectBookingInput.id, _user.id, _user.account.faculty);
  }

  @Mutation(() => Booking, { nullable:true })
  @UseGuards(LoggedIn)
  async accpetBooking(@Args('accBookingInput') accBookingInput: AcceptBooking, @CurrentUser() user: JwtPayload) {
    const _user = await this.userRepo.findById(user.sub);
    if(_user.account.role == "CLIENT") return null;
    return this.bookingService.accept(accBookingInput.id);
  }


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
